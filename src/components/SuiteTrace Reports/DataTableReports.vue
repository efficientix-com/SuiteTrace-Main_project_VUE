<template>
  <div id="DataTableReports">
    <table class="table mt-3" id="datatableComp"></table>
    <!-- Modal for viewing details of TI TH and Ts -->
    <b-modal
      @hidden="hideModal"
      size="xl"
      ref="modal_transaction_details"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Transaction Exchange Details</h5>
        <div></div>

        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>
      <div>
        <p class="blue-text mt-0 headline">
          <strong>Transaction Statement</strong>
        </p>
        <b-row>
          <b-col>
            <p class="mb-0 blue-text">Legal Notice</p>
            <p class="mt-0">
              {{ transaction_statement }}
            </p>
          </b-col>
        </b-row>
        <p class="blue-text mt-0 headline">
          <strong>Transaction information</strong>
        </p>
        <div class="row">
          <div class="col">
            <p class="mb-0 blue-text">Sender Company Name</p>
            <p class="mt-0">
              {{ transaction_information.sender_name }}
            </p>
          </div>
          <div class="col">
            <p class="mb-0 blue-text">Sender SGLN</p>
            <p class="mt-0">
              {{ transaction_information.sender_SGLN }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="mb-0 blue-text">Sender Owning Party Location</p>
            <p class="mt-0">
              {{ transaction_information.sender_location_name }}
            </p>
          </div>
          <div class="col">
            <p class="mb-0 blue-text">Receiver Location Name</p>
            <p class="mt-0">
              {{ transaction_information.receiver_location_name }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="mb-0 blue-text">From Business</p>
            <p class="mt-0">
              {{ transaction_information.sender_location_address }}
            </p>
          </div>
          <div class="col">
            <p class="mb-0 blue-text">To Business</p>
            <p class="mt-0">
              {{ transaction_information.receiver_location_address }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="mb-0 blue-text">Shipment Date</p>
            <p class="mt-0">
              {{ transaction_information.shipment_date }}
            </p>
          </div>
          <div class="col">
            <p class="mb-0 blue-text">Purchase Orders</p>
            <p class="mt-0">
              {{ transaction_information.purchase_orders }}
            </p>
          </div>
        </div>
        <div></div>
      </div>
      <div class="row">
        <div class="col">
          <p class="blue-text headline" style="font-weight: 600">
            {{ data_purchase_orders.purchase_orders }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <!-- Datatable that has general item info of the lot -->
          <table
            class="table mt-3 px-2"
            :id="data_purchase_orders.purchase_order_id"
          ></table>
        </div>
      </div>

      <b-button
        href="https://www.fda.gov/media/99185/download?attachment"
        style="
          border-color: rgb(157, 0, 0) !important;
          background-color: rgb(157, 0, 0) !important;
          color: white;
          margin-right: 10px !important;
        "
        type="button"
        >Form 3911</b-button
      >
    </b-modal>
    <!-- Modal for viewing packing information -->
    <b-modal
      @hidden="hideModal_pack"
      size="xl"
      ref="modal_pack"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Packaging</h5>
        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>
      <div>
        <b-row class="d-flex justify-content-center">
          <b-col md="3" v-if="modal_pack_item_info.level_1 !== ''">
            <img
              width="200px"
              src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
              alt="Package"
            />
            <p style="text-align: center; margin-bottom: 0px !important">
              SSCC/SGTIN: {{ modal_pack_item_info.level_1 }}
            </p>
            <p style="text-align: center" class="blue-text">Level 1</p>
          </b-col>
          <b-col md="3" v-if="modal_pack_item_info.level_2 !== ''">
            <img
              width="200px"
              src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
              alt="Package"
            />
            <p style="text-align: center; margin-bottom: 0px !important">
              SGTIN: {{ modal_pack_item_info.level_2 }}
            </p>
            <p style="text-align: center" class="blue-text">Level 2</p>
          </b-col>
          <b-col md="3" v-if="modal_pack_item_info.level_3 !== ''">
            <img
              width="200px"
              src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
              alt="Package"
            />

            <p style="text-align: center; margin-bottom: 0px !important">
              SGTIN: {{ modal_pack_item_info.level_3 }}
            </p>
            <p style="text-align: center" class="blue-text">Level 3</p>
          </b-col>
          <b-col md="3" v-if="modal_pack_item_info.sgtin !== ''">
            <img
              width="200px"
              src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackItemImage.png?alt=media&token=022af416-b315-4a43-ad9f-32810dbf1ab9"
              alt="item"
            />
            <p style="text-align: center; margin-bottom: 0px !important">
              SGTIN:{{ modal_pack_item_info.sgtin }}
            </p>
            <p style="text-align: center" class="blue-text">Item</p>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <!-- Modal for viewing item History from EPCIS-->
    <b-modal
      @hidden="hideModal_th"
      size="xl"
      ref="modal_th"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Transaction History of Item</h5>
        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>

      <div>
        <b-row>
          <b-col
            md="1"
            style="
              background-color: #077cab;
              width: 10px !important;
              padding: 0px !important;
            "
          >
          </b-col>
          <b-col>
            <b-row
              v-for="th in modal_th_item_info"
              v-bind:key="th.id"
              style="
                background-color: #ededed;
                margin-bottom: 20px;
                border-radius: 3px solid #ededed;
              "
            >
              <b-col
                md="1"
                style="
                  width: 14px !important;
                  background-color: white !important;
                  padding: 0px !important;
                "
                class="d-flex justify-content-center align-items-center"
              >
                <font-awesome-icon
                  icon="fa-solid fa-caret-right"
                  style="color: #077cab; font-size: 1.3rem"
                />
              </b-col>
              <b-col>
                <b-row>
                  <b-col>
                    <p class="mb-0 blue-text">Sender Name (SGLN)</p>
                    <p class="mt-0">
                      {{ th.sender_name }} ({{ th.sender_SGLN }})
                    </p>
                  </b-col>
                  <b-col>
                    <p class="mb-0 blue-text">Receiver Name (SGLN)</p>
                    <p class="mt-0">
                      {{ th.receiver_name }} ({{ th.receiver_SGLN }})
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="mb-0 blue-text">Sender Address</p>
                    <p class="mt-0">
                      {{ th.sender_street_addr1 }},
                      {{ th.sender_street_addr2 }}, {{ th.sender_postalCode }},
                      {{ th.sender_city }}, {{ th.sender_state }},
                      {{ th.sender_countryCode }}.
                    </p>
                  </b-col>
                  <b-col>
                    <p class="mb-0 blue-text">Receiver Address</p>
                    <p class="mt-0">
                      {{ th.receiver_street_addr1 }},
                      {{ th.receiver_street_addr2 }},
                      {{ th.receiver_postalCode }}, {{ th.receiver_city }},
                      {{ th.receiver_state }}, {{ th.receiver_countryCode }}.
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="mb-0 blue-text">From Location</p>
                    <p class="mt-0">
                      {{ th.sender_loc_street_addr1 }},
                      {{ th.sender_loc_street_addr2 }},
                      {{ th.sender_loc_postalCode }}, {{ th.sender_loc_city }},
                      {{ th.sender_loc_state }},
                      {{ th.sender_loc_countryCode }}.
                    </p>
                  </b-col>
                  <b-col>
                    <p class="mb-0 blue-text">To Location</p>
                    <p class="mt-0">
                      {{ th.receiver_loc_street_addr1 }},
                      {{ th.receiver_loc_street_addr2 }},
                      {{ th.receiver_loc_postalCode }},
                      {{ th.receiver_loc_city }}, {{ th.receiver_loc_state }},
                      {{ th.receiver_loc_countryCode }}.
                    </p>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <p class="mb-0 blue-text">Purchase Orders</p>
                    <p class="mt-0">
                      {{ th.purchase_orders_th }}
                    </p>
                  </b-col>
                  <b-col>
                    <p class="mb-0 blue-text">Shipment Date</p>
                    <p class="mt-0">
                      {{ th.shipment_date }}
                    </p>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <!-- Modal for form of Suspect Item -->
    <b-modal
      @hidden="hideModal_suspect"
      size="xl"
      ref="modal_suspect"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Mark Item As Suspicious</h5>
        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>

      <div>
        <b-row>
          <b-col>
            <b-form @submit="submitForm">
              <b-row>
                <b-col>
                  <b-form-group
                    class="blue-text"
                    label="Serial Number:"
                    label-for="serialNumber"
                  >
                    <b-form-input
                      id="serialNumber"
                      v-model="serialNumber"
                      required
                      placeholder="Enter Serial Number"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    class="blue-text"
                    label="Item NDC:"
                    label-for="item_ndc"
                  >
                    <b-form-input
                      id="item_ndc"
                      v-model="item_ndc"
                      required
                      placeholder="Enter Item NDC"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    class="blue-text"
                    label="Lot Number:"
                    label-for="lot_number"
                  >
                    <b-form-input
                      id="lot_number"
                      v-model="lot_number"
                      required
                      placeholder="Enter Lot Number"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    class="blue-text"
                    label="Quantity:"
                    label-for="quantity"
                  >
                    <b-form-input
                      id="quantity"
                      v-model="quantity"
                      required
                      placeholder="Enter quantity"
                      disabled
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group
                class="blue-text"
                label="Reason:"
                label-for="reason"
              >
                <b-form-textarea
                  id="reason"
                  v-model="reason"
                  rows="5"
                  required
                  placeholder="Enter Reason"
                ></b-form-textarea>
              </b-form-group>

              <b-button
                style="
                  background-color: #077cab !important;
                  border-radius: 3px !important;
                  margin-top: 10px !important;
                "
                type="submit"
                >Submit</b-button
              >
            </b-form>
          </b-col>
        </b-row>
      </div>
    </b-modal>
    <!-- Modal for viewing Internal Movements detail of items -->
    <b-modal
      @hidden="hideModal_internal_movements"
      size="xl"
      ref="modal_internal_movements"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Internal Movements</h5>

        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>
      <div>
        <small
          >Displays the internal movements of the items related to the items
          described in the EPCIS file.</small
        >
      </div>
        <div class="row">
          <div class="col">
            <p class="blue-text headline" style="font-weight: 600">
              {{ data_purchase_orders.purchase_orders }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <!-- Datatable that has general item info of the lot -->
            <table class="table mt-3 px-2" :id="data_purchase_orders.purchase_order_id"></table>
          </div>
        </div>
    </b-modal>
    <!-- Modal for viewing lot trace of the internal movements -->
    <b-modal
      @hidden="hideModal_internal_movements_lot"
      size="xl"
      ref="modal_internal_movements_lot"
      hide-footer
      scrollable
    >
      <template #modal-header="{ close }">
        <h5>Item Internal Movements</h5>

        <div size="sm" class="close" @click="close()">
          <font-awesome-icon icon="fa-solid fa-x" size="1x" />
        </div>
      </template>

      <div v-if="datatable_allRecordTypes_perItem.length > 0">
        <div
          class="row mt-4 headline"
          v-for="dataHist in datatable_allRecordTypes_perItem"
          :key="dataHist.id"
        >
          <!-- Header of data history card -->
          <div class="row mt-2">
            <div
              class="col text-center"
              v-if="dataHist.recordtype === 'Item Receipt' || dataHist.recordtype === 'Item Fulfillment'"
            >
              <strong
                >{{ dataHist.sender_name }}
                <font-awesome-icon icon="fa-solid fa-arrow-right" size="1x" />
                {{ dataHist.receiver_name }}</strong
              >
            </div>
            <div
              class="col text-center"
              v-else-if="dataHist.recordtype === 'inventoryadjustment'"
            >
              <strong
                >{{ dataHist.subsidiary }} ({{ dataHist.location }})</strong
              >
            </div>
            <div class="col text-center" v-else>
              <strong
                >{{ dataHist.subsidiary }} ({{ dataHist.location }})
                <font-awesome-icon icon="fa-solid fa-arrow-right" size="1x" />
                {{ dataHist.vendor }}</strong
              >
            </div>
          </div>
          <!-- Record type of data history-->
          <div>
            <div class="cheto">
              {{
                dataHist.recordtype === "Item Receipt"
                  ? "Receipt"
                  : dataHist.recordtype === "inventoryadjustment"
                  ? "Inventory Adjustment"
                  : dataHist.recordtype === "Item Fulfillment"
                  ? "Item fulfillment"
                  : ""
              }}
            </div>
          </div>
          <!-- Content of data history DATE OF TRANSACTION and QUANTITY-->
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Transaction date</p>
              <p class="mt-0">{{ dataHist.trandate }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Quantity</p>
              <p class="mt-0">{{ dataHist.quantity }}</p>
            </div>
          </div>
          <!-- Content of data history ADDRESSES INVOLVED OR DELIVERY NUMBER (LOT) -->
          <div class="row" v-if="dataHist.recordtype === 'inventoryadjustment'">
            <div class="col">
              <p class="mb-0 blue-text">Address</p>
              <p class="mt-0">{{ dataHist.address }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Delivery number</p>
              <p class="mt-0">{{ dataHist.delivery_number }}</p>
            </div>
          </div>
          <div class="row" v-else-if="dataHist.recordtype === 'Item Receipt' || dataHist.recordtype === 'Item Fulfillment'">
            <div class="col">
              <p class="mb-0 blue-text">From business</p>
              <p class="mt-0">{{ dataHist.sender_location_address }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">To business</p>
              <p class="mt-0">
                ({{ dataHist.location }})
                {{ dataHist.receiver_location_address }}
              </p>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col">
              <p class="mb-0 blue-text">Address</p>
              <p class="mt-0">{{ dataHist.address }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Lot/Serial number</p>
              <p class="mt-0">{{ dataHist.delivery_number }}</p>
            </div>
          </div>
          <!-- Last row only applies to record type as itemreceipt -->
          <!-- <div class="row" v-if="dataHist.recordType === 'Item Receipt'">
            <div class="col">
              <p class="mb-0 blue-text">Lot/Serial number</p>
              <p class="mt-0">{{ dataHist.delivery_number }}</p>
            </div>
          </div> -->
          <div class="row" v-if="dataHist.recordtype === 'inventoryadjustment'">
            <div class="col">
              <p class="mb-0 blue-text">Reason</p>
              <p class="mt-0">
                {{ dataHist.custbody_atlas_inv_adj_reason }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p style="font-style: italic">No data to display</p>
      </div>
    </b-modal>
  </div>
</template>
<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt";
import "datatables.net-dt/js/dataTables.dataTables";
import DataTable from "datatables.net-dt";
// import pdfmake from "pdfmake";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-scroller-dt";
import $ from "jquery";
// import JSZip from "jszip";

export default {
  name: "DataTableReports",
  data: function () {
    return {
      datatable_content: null,
      datatable: null,
      transaction_statement: null,
      transaction_information: {},
      data_purchase_orders: [],
      modalShown: false,
      modal_pack: false,
      modal_pack_item_info: {},
      modal_th: false,
      modal_th_item_info: [],
      modal_suspect: false,
      modal_internal_movements: false,
      modal_internal_movements_lot: false,
      datatable_allRecordTypes_perItem: [],
      // Variables of form
      serialNumber: "",
      reason: "",
      item_ndc: "",
      lot_number: "",
      quantity: "",
    };
  },
  props: {
    data: { type: Array, required: true },
  },
  watch: {
    datatable_content(newData) {
      if (this.datatable) {
        this.datatable.clear();
        this.datatable.rows.add(newData);
        this.datatable.draw();
      }
    },
    data(newData) {
      if (this.datatable) {
        this.datatable.clear();
        this.datatable.rows.add(newData);
        this.datatable.draw();
      }
    },
    modalShown(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showDatatablePurchaseOrder();
        }, 100);
      }
    },
    modal_internal_movements(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showDatatableInternalMovements();
        }, 100);
      }
    },
  },
  mounted() {
    this.datatable_content = this.data;
    // window.JSZip = JSZip;
    // window.pdfmake = pdfmake;
    // pdfmake.fonts = {
    //   Roboto: {
    //     normal:
    //       "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    //     bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    //     italics:
    //       "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    //     bolditalics:
    //       "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
    //   },
    // };
    this.datatable = new DataTable("#datatableComp", {
      responsive: true,
      order: [],
      // dom: "Bfrtip",
      // buttons: ["excel", "pdf", "csv"],
      searching: true,
      columns: [
        {
          data: "date_upload",
          title: "Date Of Upload",
        },
        {
          data: "purchase_orders",
          title: "Purchase Orders",
        },
        {
          data: "sender_name",
          title: "Vendor",
        },
        {
          data: "status_error",
          title: "Status Errors",
          render:function(data){
            if(data===true){
              return `<div class='cheto' style='background-color:rgb(157, 0, 0) !important;border-color:rgb(157, 0, 0) !important;'>Yes</div>`
            }else{
              return `<div class='cheto' style='background-color:#077cab !important;'>No</div>`
            }
          }
        },
        {
          data: "date_upload",
          title: "Options",
          render: function () {
            return `
            <div class="d-flex justify-content-center">
              <div class="option-btn btn btn-light text-center" style="margin-right:10px;">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>              </div>
              <div class="option-btn-internal-movements btn btn-light text-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M232 0c-39.8 0-72 32.2-72 72v8H72C32.2 80 0 112.2 0 152V440c0 39.8 32.2 72 72 72h.2 .2 .2 .2 .2H73h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2H75h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2H77h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2H79h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2H82h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2H85h.2 .2 .2 .2H86h.2 .2 .2 .2H87h.2 .2 .2 .2H88h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2H98h.2 .2 .2 .2H99h.2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2 .2v0H456h8v0H568c39.8 0 72-32.2 72-72V152c0-39.8-32.2-72-72-72H480V72c0-39.8-32.2-72-72-72H232zM480 128h88c13.3 0 24 10.7 24 24v40H536c-13.3 0-24 10.7-24 24s10.7 24 24 24h56v48H536c-13.3 0-24 10.7-24 24s10.7 24 24 24h56V440c0 13.3-10.7 24-24 24H480V336 128zM72 128h88V464h-.1-.2-.2-.2H159h-.2-.2-.2H158h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H154h-.2-.2-.2H153h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H150h-.2-.2-.2H149h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H146h-.2-.2-.2H145h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H142h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H139h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H136h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H133h-.2-.2-.2-.2-.2-.2-.2-.2H131h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H128h-.2-.2-.2-.2-.2-.2-.2-.2H126h-.2-.2-.2-.2-.2-.2-.2-.2H124h-.2-.2-.2-.2-.2-.2-.2-.2H122h-.2-.2-.2-.2-.2-.2-.2-.2H120h-.2-.2-.2-.2-.2-.2-.2-.2H118h-.2-.2-.2-.2-.2-.2-.2-.2H116h-.2-.2-.2-.2-.2-.2-.2-.2H114h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H111h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H108h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H105h-.2-.2-.2-.2H104h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H100h-.2-.2-.2-.2H99h-.2-.2-.2-.2H98h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H88h-.2-.2-.2-.2H87h-.2-.2-.2-.2H86h-.2-.2-.2-.2H85h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H82h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H79h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H77h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H75h-.2-.2-.2-.2-.2-.2-.2-.2-.2-.2H73h-.2-.2-.2-.2-.2H72c-13.2 0-24-10.7-24-24V336h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H48V240h56c13.3 0 24-10.7 24-24s-10.7-24-24-24H48V152c0-13.3 10.7-24 24-24zM208 72c0-13.3 10.7-24 24-24H408c13.3 0 24 10.7 24 24V336 464H368V400c0-26.5-21.5-48-48-48s-48 21.5-48 48v64H208V72zm88 24v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V168h24c8.8 0 16-7.2 16-16V136c0-8.8-7.2-16-16-16H344V96c0-8.8-7.2-16-16-16H312c-8.8 0-16 7.2-16 16z"/></svg>              
              </div>
            </div>
            `;
          },
        },
      ],
    });
    const self = this;
    $("#datatableComp").on("click", ".option-btn", function () {
      // Get the data associated with the row
      const rowData = self.datatable.row($(this).closest("tr")).data();
      // Open the modal
      self.$refs["modal_transaction_details"].show();
      self.modalShown = true;
      self.transaction_statement = rowData.transaction_statement;
      self.transaction_information.purchase_orders = rowData.purchase_orders;
      self.transaction_information.sender_name = rowData.sender_name;
      self.transaction_information.sender_SGLN = rowData.sender_SGLN;
      self.transaction_information.sender_location_name =
        rowData.sender_location_name;
      self.transaction_information.sender_location_address =
        rowData.sender_location_address;
      self.transaction_information.receiver_location_name =
        rowData.receiver_location_name;
      self.transaction_information.receiver_location_address =
        rowData.receiver_location_address;
      self.transaction_information.shipment_date = rowData.shipment_date;
      self.data_purchase_orders = rowData;
      // Pass the row data to the modal component
      // console.log(rowData);
      // self.$data.transaction_details = rowData;
      // self.arrange_data_for_first_datatable();
      // self.getPurchaseOrderItems();
      //   self.datatable_row_content = [];
      //   self.datatable_row_content.push(rowData);
      console.log("rowData:", rowData);
    });
    $("#datatableComp").on(
      "click",
      ".option-btn-internal-movements",
      function () {
        const rowData = self.datatable.row($(this).closest("tr")).data();
        console.log("INTERNAL MOVEMENTS ROWDATA:", rowData);
        self.$refs["modal_internal_movements"].show();
        self.modal_internal_movements = true;
        self.data_purchase_orders = rowData;
      }
    );
  },
  methods: {
    hideModal() {
      this.modalShown = false;
    },
    hideModal_pack() {
      this.modal_pack = false;
    },
    hideModal_th() {
      this.modal_th = false;
    },
    hideModal_suspect() {
      this.modal_suspect = false;
    },
    hideModal_internal_movements() {
      this.modal_internal_movements = false;
    },
    hideModal_internal_movements_lot() {
      this.modal_internal_movements_lot = false;
    },
    submitForm() {
      try {
        console.log("Serial Number:", this.serialNumber);
        console.log("Reason:", this.reason);
      } catch (err) {
        console.error("Error occurred in submitForm", err);
      }
    },
    showDatatablePurchaseOrder() {
      try {
        // this.data_purchase_orders.forEach((item_element) => {
        let aux = this.data_purchase_orders.items_info;
        console.log({ aux });
        this.data_purchase_orders.dataTable = new DataTable(
          "#" + this.data_purchase_orders.purchase_order_id,
          {
            responsive: true,
            data: this.data_purchase_orders.items_info,
            searching: true,
            order: [],
            columns: [
              {
                data: "sgtin",
                title: "SGTIN",
              },
              {
                data: "ndc",
                title: "NDC",
              },
              {
                data: "product_name",
                title: "Product Name",
              },
              {
                data: "dosage",
                title: "Dosage",
              },
              {
                data: "strength",
                title: "Strength",
              },
              {
                data: "container_size",
                title: "Container Size",
              },
              {
                data: "lot_number",
                title: "Lot Number",
              },
              {
                data: "ndc",
                title: "Options",
                render: function () {
                  return `
            <div class="d-flex justify-content-center">
            <div class="option-item-hierarchy-btn btn btn-light text-center" title='Packaging information'>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/></svg>
              </div>
            <div class="option-item-th-btn btn btn-light text-center" title='Transaction History of item'>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 72a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm32 97.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80S48 51.8 48 96c0 32.8 19.7 61 48 73.3V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H288v54.7c-28.3 12.3-48 40.5-48 73.3c0 44.2 35.8 80 80 80s80-35.8 80-80c0-32.8-19.7-61-48-73.3V288H608c17.7 0 32-14.3 32-32s-14.3-32-32-32H544V169.3c28.3-12.3 48-40.5 48-73.3c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 32.8 19.7 61 48 73.3V224H160V169.3zM488 96a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM320 392a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
              </div>
              <div class="option-item-suspect-btn btn btn-light text-center" title='Mark as Suspect'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>              </div>
            </div>
            `;
                },
              },
            ],
          }
        );
        const self = this;
        $("#" + self.data_purchase_orders.purchase_order_id).on(
          "click",
          ".option-item-hierarchy-btn",
          function () {
            const rowData = self.data_purchase_orders.dataTable
              .row($(this).closest("tr"))
              .data();
            console.log("ROWDATA TH:", rowData);
            self.$refs["modal_pack"].show();
            self.modalShown = true;
            self.modal_pack_item_info = {
              sgtin: rowData.sgtin,
              level_1: rowData.level_1,
              level_2: rowData.level_2,
              level_3: rowData.level_3,
            };
          }
        );
        $("#" + self.data_purchase_orders.purchase_order_id).on(
          "click",
          ".option-item-th-btn",
          function () {
            const rowData = self.data_purchase_orders.dataTable
              .row($(this).closest("tr"))
              .data();
            console.log("ROWDATA OF HISTORY", rowData);
            self.$refs["modal_th"].show();
            self.modal_th = true;
            self.modal_th_item_info = rowData.trans_hist;
          }
        );
        $("#" + self.data_purchase_orders.purchase_order_id).on(
          "click",
          ".option-item-suspect-btn",
          function () {
            const rowData = self.data_purchase_orders.dataTable
              .row($(this).closest("tr"))
              .data();
            self.$refs["modal_suspect"].show();
            self.modal_suspect = true;
            self.serialNumber = rowData.sgtin;
            self.lot_number = rowData.lot_number;
            self.item_ndc = rowData.ndc;
            self.quantity = 1;
          }
        );
        // });
      } catch (err) {
        console.error("Error occurred in showDatatablePurchaseOrder", err);
      }
    },
    showDatatableInternalMovements() {
      try {
        // this.data_purchase_orders.forEach((item_element) => {
        let aux = this.data_purchase_orders.items_info;
        console.log({ aux });
        this.data_purchase_orders.dataTable = new DataTable(
          "#" + this.data_purchase_orders.purchase_order_id,
          {
            responsive: true,
            data: this.data_purchase_orders.items_info,
            searching: true,
            order: [],
            columns: [
              {
                data: "ndc",
                title: "NDC",
              },
              {
                data: "product_name",
                title: "Product Name",
              },
              {
                data: "dosage",
                title: "Dosage",
              },
              {
                data: "strength",
                title: "Strength",
              },
              {
                data: "container_size",
                title: "Container Size",
              },
              {
                data: "lot_number",
                title: "Lot Number",
              },

              {
                data: "ndc",
                title: "Options",
                render: function () {
                  return `
            <div class="d-flex justify-content-center">
            <div class="option-item-movements-btn btn btn-light text-center" title='Packaging information'>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>            
            </div>
            `;
                },
              },
            ],
          }
        );
        const self = this;
        $("#" + self.data_purchase_orders.purchase_order_id).on(
          "click",
          ".option-item-movements-btn",
          function () {
            const rowData = self.data_purchase_orders.dataTable
              .row($(this).closest("tr"))
              .data();
            console.log("ROWDATA PURCHASE ORDER INTERNAL MOVEMENTS:", rowData);
            self.datatable_allRecordTypes_perItem =
              rowData.receipts;
            self.$refs["modal_internal_movements_lot"].show();
            self.modal_internal_movements_lot = true;
          }
        );

        // });
      } catch (err) {
        console.error("Error occurred in showDatatableInternalMovements", err);
      }
    },
  },
};
</script>