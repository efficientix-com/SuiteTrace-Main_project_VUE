<template>
  <div id="module-component">
    <MenuComp />

    <div class="card">
      <SpinnerVue v-show="isLoading === true" />

      <!-- Heading -->
      <h2 v-show="!isLoading" class="blue-text">Register Track</h2>
      <p v-show="!isLoading" style="font-style: italic">
        Fill out the form to register the track from an item
      </p>
      <!-- Form content -->
      <b-form id="register_track_form" v-show="!isLoading">
        <!-- first row -->
        <b-row>
          <b-col class="text-left">
            <label class="blue-text" for="shipment-date">Shipment Date</label>
            <b-form-datepicker
              id="datepicker-shipment_date"
              v-model="date_input"
              required
              @input="resetErrorsInput"
            ></b-form-datepicker>
            <small v-show="error_inputs.shipment_date===true" class="error-color">Enter a valid date</small>
          </b-col>
          <b-col class="text-left">
            <label class="blue-text" for="lot-number"
              >Associated Lot/Serial number</label
            >
            <b-form-select
              id="select_lot_serial_number_associated"
              class="form-select"
              filter
              v-model="lot_serial_number_input"
              :options="options_LotSerialNumbers"
              required
              @change="resetErrorsInput"
            ></b-form-select>
            <small v-show="error_inputs.lot_serial_number===true" class="error-color">Select a Lot/serial number</small>
          </b-col>
          <b-col class="text-left">
            <label class="blue-text" for="item-ndc">Item NDC</label>
            <b-form-select
              id="select_item_ndc"
              class="form-select"
              filter
              v-model="item_ndc_input"
              :options="options_items_ndc"
              required
              @change="resetErrorsInput"
            ></b-form-select>
            <small v-show="error_inputs.item_ndc===true" class="error-color">Select an Item NDC</small>
          </b-col>
        </b-row>
        <!-- Second row -->
        <b-row class="mt-1">
          <b-col md="4" class="text-left">
            <label class="blue-text" for="source-name">Source name</label>
            <b-form-select
              id="select_source_name"
              class="form-select"
              filter
              v-model="source_name_input"
              :options="optionsVendorNames"
              required
              @change="resetErrorsInput"
            ></b-form-select>
            <small v-show="error_inputs.source_name===true" class="error-color">Select Source name</small>
          </b-col>
          <b-col md="8" class="text-left">
            <label class="blue-text" for="source-address">Source Address</label>
            <b-form-input
              type="text"
              v-model="source_address_input"
              id="source-address"
              required
              @keydown="resetErrorsInput"
            ></b-form-input>
            <small v-show="error_inputs.source_address===true" class="error-color">Field cannot be empty</small>
          </b-col>
        </b-row>
        <!-- Third row -->
        <b-row class="mt-1">
          <b-col md="4" class="text-left">
            <label class="blue-text" for="destination-name"
              >Destination name</label
            >
            <b-form-select
              id="select_destination_name"
              class="form-select"
              filter
              v-model="destination_name_input"
              :options="optionsVendorNames"
              required
              @change="resetErrorsInput"
            ></b-form-select>
            <small v-show="error_inputs.destination_name===true" class="error-color">Select Destination name</small>
          </b-col>
          <b-col md="8" class="text-left">
            <label class="blue-text" for="destination-address"
              >Destination Address</label
            >
            <b-form-input
              type="text"
              v-model="destination_address_input"
              id="destination-address"
              required
              @keydown="resetErrorsInput"
            ></b-form-input>
            <small v-show="error_inputs.destination_address===true" class="error-color">Field cannot be empty</small>
          </b-col>
        </b-row>
        <!-- Fourth row -->
        <b-row class="mt-1">
          <b-col md="4" class="text-left">
            <label class="blue-text" for="quantity">Quantity</label>
            <b-form-input
              type="number"
              v-model="quantity_input"
              id="quantity"
              required
              @keydown="resetErrorsInput"
            ></b-form-input>
            <small v-show="error_inputs.quantity===true" class="error-color">Enter quantity</small>
          </b-col>
          <b-col class="text-left">
            <label class="blue-text" for="ack-message"
              >Acknowledgment Message</label
            >
            <b-form-textarea
              id="textarea"
              v-model="acknowledgment_msg_input"
              rows="3"
              max-rows="6"
              @keydown="resetErrorsInput"
            ></b-form-textarea>
            <small v-show="error_inputs.acknowlegment_msg===true" class="error-color">Field cannot be empty</small>
          </b-col>
        </b-row>
        <b-row class="d-flex justify-content-end">
          <b-col md="1" style="margin-right: 20px !important">
            <div class="mt-3 btn submit-button" @click="handleSubmit">
              Submit
            </div>
          </b-col>
        </b-row>
      </b-form>
      <b-modal id="bv-modal-example" hide-footer v-model="showToast" size="xs">
        <template #modal-header="{ close }">
          <div size="sm" class="close" @click="close()">
            <font-awesome-icon icon="fa-solid fa-x" size="1x" />
          </div>
        </template>
        <div class="d-block text-center">
          <font-awesome-icon
            v-show="hasError === false"
            :class="
              hasError === true ? 'error-color mb-3' : 'success-color mb-3'
            "
            icon="fa-solid fa-check"
            size="3x"
          />
          <font-awesome-icon
            v-show="hasError === true"
            :class="
              hasError === true ? 'error-color mb-3' : 'success-color mb-3'
            "
            icon="fa-solid fa-circle-exclamation"
            size="3x"
          />
          <h4 :class="hasError === true ? 'error-color' : 'success-color'">
            {{ msgToast }}
          </h4>
        </div>
      </b-modal>
    </div>
    <FooterFreebugVue />
  </div>
</template>
<script>
import FooterFreebugVue from "@/template/Commons/FooterFreebug.vue";
import MenuComp from "../../template/Navbar/MenuComponent.vue";
import axios from "axios";
import SpinnerVue from "@/template/Commons/Spinner.vue";

export default {
  name: "RegisterTrack",
  components: { MenuComp, FooterFreebugVue, SpinnerVue },
  data: function () {
    return {
      // Variables for shwoing other components
      isLoading: false,
      // Variables for select inputs
      optionsVendorNames: [],
      options_LotSerialNumbers: [],
      options_items_ndc: [],
      // Variables for form
      date_input: "",
      lot_serial_number_input: "",
      item_ndc_input: "",
      source_name_input: "",
      source_address_input: "",
      destination_name_input: "",
      destination_address_input: "",
      acknowledgment_msg_input: "",
      quantity_input: "",
      showToast: false,
      hasError: false,
      msgToast: "Succesfully registered",
      error_inputs: {
        shipment_date: false,
        lot_serial_number: false,
        item_ndc: false,
        source_name: false,
        source_address: false,
        destination_name: false,
        destination_address: false,
        quantity: false,
        acknowlegment_msg: false,
      },
    };
  },
  watch: {},
  mounted() {
    let remove_AllOption = this.$store.state.lot_serial_numbers.filter(
      (element) => element.value !== "All"
    );
    let remove_AllOption_Items = this.$store.state.items_ndc.filter(
      (element) => element.value !== "All"
    );
    this.options_LotSerialNumbers = remove_AllOption;
    this.options_items_ndc = remove_AllOption_Items;
    // console.log(
    //   "Lot numbers from store:",
    //   this.$store.state.lot_serial_numbers
    // );

    this.getVendorsSearch();
  },
  methods: {
    getVendorsSearch() {
      try {
        let self = this;
        console.log("handleSubmit -self: ", self);
        let str = `
        var urlMode=null;
                require(["N/url"],function(urlMode){
                    var url=urlMode.resolveScript({
                        scriptId:'customscript_tkio_wetrackntrace_serv_sl',
                        deploymentId:"customdeploy_tkio_wetrackntrace_serv_sl",
                        returnExternalUrl:false,
                        params:{getSearchVendors:true}
                    });
                    self.getVendorsSearchResponse(url)
                });
        
        `;
        eval(str);
      } catch (err) {
        console.error("Error occurred in GetVendorsSearch", err);
      }
    },
    getVendorsSearchResponse(e) {
      try {
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
            b.data.forEach((element) => {
              this.optionsVendorNames.push({
                value: element.entityid,
                text: element.entityid,
              });
            });
            this.isLoading = false;
            console.log("RESP vendors: ", b.data);
          })
          .catch((err) => {
            console.log("Hubo errores en getVendorsSearchResponse app: ", err);
          });
      } catch (err) {
        console.error("Error occurred in getVendorsSearchResponse", err);
      }
    },
    resetErrorsInput(){
      this.error_inputs.shipment_date = false;
      this.error_inputs.lot_serial_number = false;
      this.error_inputs.item_ndc = false;
      this.error_inputs.source_name=false;
      this.error_inputs.source_address=false;
      this.error_inputs.destination_name=false;
      this.error_inputs.destination_address=false;
      this.error_inputs.quantity=false;
      this.error_inputs.acknowlegment_msg=false;

    },
    handleSubmit() {
      if (this.date_input.length===0|| this.date_input === null) {
        this.error_inputs.shipment_date = true;
      }
      if (this.lot_serial_number_input === "") {
        this.error_inputs.lot_serial_number = true;
      }
      if (this.item_ndc_input === "") {
        this.error_inputs.item_ndc = true;
      }
      if(this.source_name_input===''){
        this.error_inputs.source_name=true;
      }
      if(this.source_address_input===''){
        this.error_inputs.source_address=true;
      }
      if(this.destination_name_input===''){
        this.error_inputs.destination_name=true;
      }
      if(this.destination_address_input===''){
        this.error_inputs.destination_address=true;
      }
      if(this.quantity_input===''){
        this.error_inputs.quantity=true;
      }
      if(this.acknowledgment_msg_input===''){
        this.error_inputs.acknowlegment_msg=true;
      }
      if (
        this.date_input !== "" &&
        this.lot_serial_number_input !== "" &&
        this.item_ndc_input !== "" &&
        this.source_name_input !== "" &&
        this.source_address_input !== "" &&
        this.destination_name_input !== "" &&
        this.destination_address_input !== "" &&
        this.quantity_input !== "" &&
        this.acknowledgment_msg_input !== ""
      ) {
        let date_parts = this.date_input.split("-");
        let day = "";
        let month = "";
        if (date_parts[1].charAt(0) === "0") {
          month = date_parts[1].charAt(1);
        } else {
          month = date_parts[1];
        }
        if (date_parts[2].charAt(0) === "0") {
          day = date_parts[2].charAt(1);
        } else {
          day = date_parts[2];
        }
        const formattedDate = month + "/" + day + "/" + date_parts[0];

        console.log("Date no format:", this.date_input);
        console.log("Date with format:", formattedDate);

        let objRequest = {
          custrecord_tkio_transaction_date: formattedDate,
          custrecord_tkio_source_address: this.source_address_input,
          custrecord_tkio_destination_address: this.destination_address_input,
          custrecord_tkio_assoc_lot_number: this.lot_serial_number_input,
          custrecord_tkio_item_ndc: this.item_ndc_input,
          custrecord_tkio_quantity: this.quantity_input,
          custrecord_tkio_src_name: this.source_name_input,
          custrecord_tkio_destination_name: this.destination_name_input,
          custrecord_tkio_ack_msg: this.acknowledgment_msg_input,
        };
        let str_objRequest = JSON.stringify(objRequest);
        let self = this;
        console.log("handleSubmit -self: ", self);
        let str = `
        var urlMode=null;
                require(["N/url"],function(urlMode){
                    var url=urlMode.resolveScript({
                        scriptId:'customscript_tkio_wetrackntrace_serv_sl',
                        deploymentId:"customdeploy_tkio_wetrackntrace_serv_sl",
                        returnExternalUrl:false,
                        params:{sendTrack:'${str_objRequest}'}
                    });
                    self.getSendTrackRegistryResponse(url)
                });
        
        `;
        eval(str);
        console.log("Submit form triggered", objRequest);
      }
    },
    getSendTrackRegistryResponse(e) {
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
          this.msgToast = b.data;
          this.showToast = true;
          if (b.data.includes("Error")) {
            this.hasError = true;
          } else {
            this.hasError = false;
            setTimeout(() => {
              this.showToast = false;
            }, 2500);
            this.date_input = "";
            this.lot_serial_number_input = "";
            this.item_ndc_input = "";
            this.source_name_input = "";
            this.source_address_input = "";
            this.destination_name_input = "";
            this.destination_address_input = "";
            this.quantity_input = "";
            this.acknowledgment_msg_input = "";
          }
          console.log("RESP track: ", b.data);
        })
        .catch((err) => {
          console.log("Hubo errores en getSendTimeResponse app: ", err);
        });
    },
  },
};
</script>