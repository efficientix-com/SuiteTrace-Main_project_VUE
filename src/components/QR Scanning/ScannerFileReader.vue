<template>
  <div>
    <div class="cursor-pointer mb-3">
      <!-- <div id="qr-code-full-region"></div> -->
      <b-row>
        <b-col class="d-flex justify-content-center">
          <b-button
            class="d-flex justify-content-center"
            @mousedown="activateCamera"
            @mouseup="deactivateCamera"
            @mouseleave="deactivateCamera"
            @touchstart="activateCamera"
            @touchend="deactivateCamera"
          >
            <font-awesome-icon
              style="margin-right: 10px !important"
              icon="fa-solid fa-camera"
              class="btnPlus"
              size="1x"
            />
            Scan
            <!-- <h3 id="h3_msg" class="blue-2">Use camera</h3> -->
          </b-button>
        </b-col>
        <b-col v-if="showStop === true" class="d-flex justify-content-center">
          <b-button
            class="d-flex justify-content-center"
            @click="deactivateCamera"
          >
            <font-awesome-icon
              style="margin-right: 10px !important"
              icon="fa-solid fa-camera"
              class="btnPlus"
              size="1x"
            />
            Stop
            <!-- <h3 id="h3_msg" class="blue-2">Use camera</h3> -->
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <div
          id="qr-code-camera"
          style="height: auto !important; width: 70vw !important"
        ></div>
      </b-col>
    </b-row>
  </div>
</template>
  <script>
import { Html5Qrcode } from "html5-qrcode";

export default {
  name: "CameraScanner",

  data() {
    return {
      showStop: false,
      camera: [],
      lastTapTime: 0,
      doubleTapInterval: 300,
      showDiv: false,
      total_fields: this.fields.length,
      res: "",
      res_gtin:''
    };
  },
  props: {
    fields: {
      type: Array,
    },
  },
  methods: {
    deactivateCamera() {
      console.log("DEACTIVATED");
      // this.showStop = false;
      if (this.camera) {
        this.camera.stop();
      }
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.scanned < field.quantity) {
          field.serialNumber.push(this.res);
          field.gtin.push(this.res_gtin);
          field.scanned++;

          if (field.scanned >= field.quantity) {
            // You can perform any action when all items are scanned
            // For example, move to the next item, etc.
            i++;
          }

          break; // Exit the loop after updating one field
        }
      }
    },

    activateCamera() {
      console.log("ACTIVATED");
      // this.showStop = true;
      const html5QrCode = new Html5Qrcode("qr-code-camera");
      this.camera = html5QrCode;
      let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
        let minEdgePercentage = 0.85; // 70%
        let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
        return {
          width: qrboxSize + 10,
          height: qrboxSize,
        };
      };
      const config = { fps: 10, qrbox: qrboxFunction };

      html5QrCode.start(
        { facingMode: { exact: "user" } },
        config,
        this.onScanSuccess
      );
      console.log("Estado activado:", html5QrCode.getState());
    },
    onScanSuccess(decodedText, decodedResult) {
      try {
        var audio = new Audio(
          "https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/Barcode%20scanner%20beep%20sound%20(sound%20effect).mp3?alt=media&token=5e1a9ce9-07bf-494b-85ff-46278ec0ab2a"
        );
        audio.play();
        if (decodedText.includes("01")) {
          // GTIN DATAMATRIX
          const indexOf01 = decodedText.indexOf("01");
          let datamatrix_01 = [];
          if (indexOf01 !== -1) {
            datamatrix_01 = [
              decodedText.substring(0, indexOf01),
              decodedText.substring(indexOf01+2),
            ];
          } else {
            datamatrix_01 = [decodedText];
          }
          let datamatrix_17=datamatrix_01[1].split('17');
          let datamatrix_21=datamatrix_17[1].split('21');
          let length_21=datamatrix_21.length-1;

          console.log({datamatrix_01});
          console.log({datamatrix_17});
          console.log(datamatrix_21[length_21]);
          this.res_gtin=datamatrix_17[0]
          this.res=datamatrix_21[length_21];
        } else {
          // UPC
          let zerosConcatenate = "";
          if (
            decodedText.length === 8 ||
            decodedText.length === 12 ||
            decodedText.length === 13
          ) {
            for (let zeros = 1; zeros <= 14 - decodedText.length; zeros++) {
              zerosConcatenate += "0";
            }
          } else {
            console.log("Error, GTIN is invalid");
          }

          let gtin14 = zerosConcatenate + decodedText;
          decodedText = gtin14;
          this.res_gtin = decodedText;
          this.res='';
        }
        console.log({ decodedText });
        this.$emit("result", decodedText, decodedResult);
      } catch (err) {
        console.error("An error occurred in onScanSuccess", err);
      }

      //   this.scannedData = qrCodeMessage;
    },
  },
};
</script>