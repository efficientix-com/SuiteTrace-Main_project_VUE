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
      let fields_aux=this.fields;
      if(fields_aux.length){
        let isFull=fields_aux.every(field => field.serialNumber.length > 0);
        if(isFull ){
          fields_aux.push({
              gtin: "",
              serialNumber: this.res,
            });
        }
        for (let i = 0; i < fields_aux.length; i++) {
          const field = fields_aux[i];
          if (field.serialNumber==='') {
            field.gtin=this.res;
            field.serialNumber=this.res
            break;
          }
        }
        
      }else{
        fields_aux.push({
              gtin: this.res,
              serialNumber: this.res,
            });
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
    onScanSuccess(decodedText) {
      try {
        var audio = new Audio(
          "https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/Barcode%20scanner%20beep%20sound%20(sound%20effect).mp3?alt=media&token=5e1a9ce9-07bf-494b-85ff-46278ec0ab2a"
        );
        audio.play();
        this.res = decodedText;
        // this.$emit("result", decodedText, decodedResult);
      } catch (err) {
        console.error("An error occurred in onScanSuccess", err);
      }

      //   this.scannedData = qrCodeMessage;
    },
  },
};
</script>