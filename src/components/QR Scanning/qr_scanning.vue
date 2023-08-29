<template>
  <div id="global">
    <div class="topNavBarC">
      <TopNavBarVue />
    </div>
    <div class="sideNavBarC">
      <SideNavBarVue />
    </div>
    <div class="moduleComponent">
      <b-card>
        <h1 class="blue-text text-left">
          <font-awesome-icon icon="fa-solid fa-qrcode" size="1x" /> SuiteTrace |
          QR Scanning
        </h1>
        <small class="text-left"
          >Scan the items to ship to generate EPCIS file</small
        >
        <!-- Stepper  -->
        <div class="wrapper-stepper">
          <!-- Barra de progreso -->
          <div class="stepper">
            <div class="stepper-progress">
              <div
                class="stepper-progress-bar"
                :style="'width:' + stepperProgress"
              ></div>
            </div>
            <div
              class="stepper-item"
              :class="{ current: step == item, success: step > item }"
              v-for="item in 5"
              :key="item"
            >
              <div class="stepper-item-counter">
                <img
                  class="icon-success"
                  src="https://tstdrv2220309.app.netsuite.com/core/media/media.nl?id=42020&c=TSTDRV2220309&h=9G6kn8LO3RrsVXPtyTQ1zGdwHg7e22xBa-AZKIBVg3ePAJT-&_xt=.svg"
                  alt="iconSucess"
                />
                <span class="number">
                  {{ item }}
                </span>
              </div>
              <span class="stepper-item-title" v-if="item == 1"> Items </span>
              <span class="stepper-item-title" v-if="item == 2">
                Item Serialization
              </span>
              <span class="stepper-item-title" v-if="item == 3">
                Package Serialization
              </span>
              <span class="stepper-item-title" v-if="item == 4">
                Aggregation
              </span>
              <span class="stepper-item-title" v-if="item == 5">
                Shipping
              </span>
            </div>
          </div>
          <!-- Contenido del stepper -->
          <div class="stepper-content" v-for="item in 5" :key="item">
            <!-- Contenido PASO 1 -->
            <div class="stepper-pane" v-if="step == 1 && step == item">
              <b-row style="margin-top: 50px !important">
                <b-col>
                  <b-row v-for="(field, index) in fields" :key="index">
                    <b-col md="5">
                      <label class="blue-text" for="quantity">Item</label>
                      <b-form-select
                        class="form-select"
                        v-model="field.item"
                        :options="options"
                        @change="updateFields"
                      ></b-form-select>
                    </b-col>
                    <b-col md="5">
                      <label class="blue-text" for="quantity">Quantity</label>
                      <input
                        class="form-control"
                        v-model.number="field.quantity"
                        type="number"
                        placeholder="Quantity"
                        @input="updateFields"
                      />
                    </b-col>
                    <b-col md="2" class="d-flex align-items-end">
                      <b-button
                        type="button"
                        @click="removeField(index)"
                        v-if="fields.length > 1"
                      >
                        Remove
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-button class="mt-3" type="button" @click="addField">
                    Add Field
                  </b-button>
                </b-col>
              </b-row>
            </div>

            <!-- Contenido PASO 2 -->
            <div class="stepper-pane" v-if="step == 2 && step == item">
              <b-row style="margin-top: 50px">
                <b-col>
                  <!-- <b-row
                    class="mt-2"
                    v-for="(newField, index) in newFields"
                    :key="index"
                  >
                    <b-col sm="3">
                      <b-form-select
                        class="form-select"
                        v-model="newField.item"
                        :options="getAvailableOptions(index)"
                      >
                      </b-form-select>
                    </b-col>
                    <b-col sm="3">
                      <input
                        class="form-control"
                        type="text"
                        v-model="newField.serialNumber"
                        placeholder="Serial Number"
                      />
                    </b-col>
                    <b-col sm="3">
                      <input
                        class="form-control"
                        type="text"
                        v-model="newField.gtin14"
                        placeholder="GTIN-14"
                      />
                    </b-col>
                   
                  </b-row> -->
                  <!-- Scanner -->
                  <b-row>
                    <b-col class="d-flex align-items-start">
                      <ScannerFileReaderVue
                        :qrbox="100"
                        :fps="10"
                        :fields="fields"
                        @result="onScan"
                      />
                    </b-col>
                  </b-row>
                  <!-- Collapsible Sections -->
                  <b-row
                    class="mt-3"
                    v-for="(field, index) in fields"
                    :key="index"
                  >
                    <b-button
                      :class="
                        field.scanned === field.quantity
                          ? 'green-btn'
                          : 'gray-button'
                      "
                      type="button"
                      @click="toggleCollapsible(index)"
                    >
                      {{ field.item }} (scanned: {{ field.scanned }}/
                      {{ field.quantity }})
                    </b-button>

                    <b-collapse v-model="field.showCollapsible">
                      <div v-for="(i, indexF) in field.quantity" :key="indexF">
                        <b-row class="mt-2">
                          <b-col>
                            <b-input
                              placeholder="Serial Number"
                              type="text"
                              v-model="field.serialNumber[indexF]"
                            ></b-input>
                          </b-col>
                          <b-col>
                            <b-input
                              placeholder="GTIN-14"
                              type="text"
                              v-model="field.gtin[indexF]"
                            ></b-input>
                          </b-col>
                        </b-row>
                      </div>
                    </b-collapse>
                  </b-row>
                </b-col>
              </b-row>
            </div>

            <!-- Contenido PASO 3 -->
            <div class="stepper-pane" v-if="step == 3 && step == item">
              <b-row style="margin-top: 50px !important">
                <b-col>
                  <b-row>
                    <b-col class="d-flex align-items-start">
                      <CameraScanner
                        :qrbox="100"
                        :fps="10"
                        :fields="fields_step3"
                      />
                    </b-col>
                  </b-row>
                  <b-row
                    class="mt-2"
                    v-for="(pack, index3) in fields_step3"
                    :key="index3"
                  >
                    <b-col md="5">
                      <b-input
                        placeholder="GTIN"
                        type="text"
                        v-model="pack.gtin"
                      ></b-input>
                    </b-col>
                    <b-col md="5">
                      <b-input
                        placeholder="Serial Number"
                        type="text"
                        v-model="pack.serialNumber"
                      ></b-input>
                    </b-col>
                    <b-col md="2" class="d-flex align-items-end">
                      <b-button
                        type="button"
                        @click="removeFieldPack(index3)"
                        v-if="fields_step3.length > 1"
                      >
                        Remove
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-button class="mt-3" type="button" @click="addFieldPackage">
                    Add Field
                  </b-button>
                </b-col>
              </b-row>
            </div>
            <!-- Contenido PASO 4 -->
            <div class="stepper-pane" v-if="step == 4 && step == item">
              <div class="container mt-5 mb-5">
                <NestedExample />
              </div>
            </div>
            <!-- Contenido PASO 5 -->
            <div class="stepper-pane" v-if="step === 5 && step === item">
              <div class="container mt-5 mb-5">
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity">Sender SGLN</label>
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver SGLN</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Sender Address 1</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver Address 1</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Sender Address 2</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver Address 2</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity">Sender City </label>
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity">Sender State</label>
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver City</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver State</label
                    >
                    <input class="form-control" type="text" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Sender Country Code
                    </label>
                    <input class="form-control" type="text" />
                  </b-col>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Receiver Country Code
                    </label>
                    <input class="form-control" type="text" />
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <label class="blue-text" for="quantity"
                      >Shipping Date</label
                    >
                    <input class="form-control" type="date" />
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <div class="controls">
            <div class="btn" v-on:click="step--" :disabled="step === 1">
              Previous
            </div>
            <div
              class="btn btn--green-1"
              @click="step++"
              :disabled="step === 4"
            >
              Next
            </div>
          </div>
        </div>

        <!-- <div class="resultBox">
          <div id="result">
            {{ result }}
          </div>
        </div> -->
      </b-card>
      <FooterFreebugVue />
    </div>
  </div>
</template>
<script>
import SideNavBarVue from "@/template/SideNavBar.vue";
import TopNavBarVue from "@/template/TopNavBar.vue";
import FooterFreebugVue from "@/template/Commons/FooterFreebug.vue";
import ScannerFileReaderVue from "./ScannerFileReader.vue";
import CameraScanner from "./CameraScanner.vue";
import NestedExample from "./NestedExample.vue";
import axios from "axios";
// import BoardC from "./Board.vue";
export default {
  name: "QrScanning",
  components: {
    SideNavBarVue,
    TopNavBarVue,
    FooterFreebugVue,
    ScannerFileReaderVue,
    CameraScanner,
    NestedExample,
    // BoardC,
  },
  data: function () {
    return {
      result: [],
      step: 1,
      index_batch: 0,
      fields_step3: [],
      fields: [
        // Initial data for fields
        {
          index: 0,
          item: "",
          quantity: 1,
          showCollapsible: false,
          scanned: 0,
          serialNumber: [],
          gtin: [],
        },
      ],
      options: [""], // Replace with your item options with NS
      newFields: [],
    };
  },
  watch: {
    step(newValue) {
      if (newValue === 4) {
        this.setNewList();
      }
    },
  },
  created(){
    this.getItems();
  },
  mounted() {},
  computed: {
    stepperProgress() {
      return (100 / 4) * (this.step - 1) + "%";
    },
  },
  methods: {
    getItems() {
      try {
        let self = this;
        console.log("getSearchData -self:", self);
        let str = `
        var urlMode=null;
      
        require(['N/url'],function(urlMode){
          var url=urlMode.resolveScript({
            scriptId:'customscript_tkio_wetrackntrace_serv_sl',
            deploymentId:"customdeploy_tkio_wetrackntrace_serv_sl",
            returnExternalUrl:false,
            params:{getItems:true}
          });
          self.getSearchResponse(url)
        });
        `;
        eval(str);
      } catch (err) {
        console.error("Error occurred in getItems", err);
      }
    },
    getSearchResponse(e) {
      const t = {
        method: "GET",
        url: e,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
          "Access-Control-Allow-Headers": "authorization",
        },
      };
      axios
        .request(t)
        .then((b) => {
          console.log("RESP full search: ", b.data);
          this.options=b.data;
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
      },
    setNewList() {
      try {
        console.log("ITEM SERIALIZATION", this.fields);
        let rearranged = [];
        this.fields.forEach((field) => {
          if (field.gtin.length) {
            field.gtin.forEach((GTIN, index) => {
              let obj_aux = {};
              console.log({ GTIN });
              obj_aux.item = field.item;
              obj_aux.gtin = GTIN;
              obj_aux.serialNumber = field.serialNumber[index];
              obj_aux.name = GTIN + "." + field.serialNumber[index];
              obj_aux.tasks = [];
              console.log({ obj_aux });
              rearranged.push(obj_aux);
            });
          }
        });
        let arr_Items_noHierarchy = {
          name: "Items",
          gtin: "",
          item: "",
          serialNumber: "",
          tasks: rearranged,
        };
        this.fields_step3.forEach((element) => {
          let obj_aux = {
            gtin: "",
            serialNumber: "",
            name: "",
            tasks: [],
          };
          obj_aux.gtin = element.gtin;
          obj_aux.serialNumber = element.serialNumber;
          obj_aux.name =
            "CASE/PALLET: " + element.gtin + "." + element.serialNumber;
          this.$store.state.lists.push(obj_aux);
        });

        this.$store.state.lists.push(arr_Items_noHierarchy);
        console.log("ITEM REARRANGED", rearranged);
        console.log("arr_Items_noHierarchy", arr_Items_noHierarchy);
        console.log("PACKAGE SERIALIZATION", this.fields_step3);
      } catch (err) {
        console.error("Error occurred in setNewList", err);
      }
    },
    toggleCollapsible(index) {
      this.fields[index].showCollapsible = !this.fields[index].showCollapsible;

      // Close other collapsible sections
      for (let i = 0; i < this.fields.length; i++) {
        if (i !== index) {
          this.fields[i].showCollapsible = false;
        }
      }
    },
    addFieldPackage() {
      this.fields_step3.push({
        gtin: "",
        serialNumber: "",
      });
    },
    addField() {
      this.fields.push({
        item: "",
        quantity: 1,
        showCollapsible: false,
        serialNumber: [],
        gtin: [],
        scanned: 0,
        index: 0,
      });
    },
    getAvailableOptions(index) {
      const selectedItems = this.fields.map((field) => field.item);
      return this.options.filter(
        (item) =>
          !selectedItems.includes(item) || item === this.newFields[index].item
      );
    },
    removeField(index) {
      this.fields.splice(index, 1);
      this.updateFields();
    },
    removeFieldPack(index) {
      this.fields_step3.splice(index, 1);
    },
    updateFields() {
      this.newFields = [];

      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.item && field.quantity > 0) {
          field.index = i;
          for (let j = 0; j < field.quantity; j++) {
            // this.newFields.push({
            //   item: field.item,
            //   serialNumber: "",
            //   gtin14: "",
            // });
            console.log("FIELD", field.serialNumber);
            // field.serialNumber.push('');
            // field.gtin.push('');
          }
        }
      }
      // console.log("NEWFIELDS:   ",this.newFields)
    },
    onScan(decodedText, decodedResult, id) {
      console.log("ID:", id);
      console.log(`Code matched = ${decodedText}`, decodedResult);
      if (decodedText && decodedText != "") {
        this.gotResult = true;
      }
      // this.result.push(decodedText);

      this.result = decodedText;
      // this.fields[id].serialNumber[0]=decodedText;
      // let ndc=decodedText.split('003');
      // console.log(ndc)
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/scss/stepper.scss";
</style>