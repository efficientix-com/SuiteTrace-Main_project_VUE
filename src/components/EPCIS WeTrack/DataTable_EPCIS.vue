<template>
  <div id="Datatable-component">
    <div>
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
          <div>

          </div>
          

          <div size="sm" class="close" @click="close()">
            <font-awesome-icon icon="fa-solid fa-x" size="1x" />
          </div>
        </template>
        <div>
          <p class="blue-text mt-0 headline">
            <strong>Transaction information</strong>
          </p>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Sender Company Name</p>
              <p class="mt-0">
                {{ transaction_information_details.sender_name }}
              </p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Sender SGLN</p>
              <p class="mt-0">
                {{ transaction_information_details.sender_sgln }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Sender Owning Party Location</p>
              <p class="mt-0">
                {{ transaction_information_details.sender_address }}
              </p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Type</p>
              <p class="mt-0">Receipt</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">From Business</p>
              <p class="mt-0">
                {{ transaction_information_details.sender_location }}
              </p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">To Business</p>
              <p class="mt-0">
                {{ transaction_information_details.receiver_location }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Shipment Date</p>
              <p class="mt-0">
                {{ transaction_information_details.shipment_date }}
              </p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Purchase Orders</p>
              <p class="mt-0">
                {{ transaction_information_details.purchase_orders }}
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div v-for="item in items_sgtin" v-bind:key="item.id">
          <div class="row">
            <div class="col">
              <p class="blue-text headline" style="font-weight: 600">
                Purchase Order: #{{ item.po }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <!-- Datatable that has general item info of the lot -->
              <table class="table mt-3 px-2" :id="item.po"></table>
            </div>
          </div>
        </div>
        <div class="row p-2">
          <div class="col">
            <!-- Collapse for item information -->
            <b-collapse class="mt-3" v-model="toggleCollapse"> </b-collapse>
          </div>
        </div>
        <b-button href="https://www.fda.gov/media/99185/download?attachment" style="border-color:rgb(157, 0, 0) !important;background-color: rgb(157, 0, 0) !important;color:white;margin-right: 10px !important;" type="button">Form 3911</b-button>
          <b-button style="background-color: #ffcc00 !important;color:white;" type="button">Mark as suspicious</b-button>
      </b-modal>
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
                        {{ th.sender_info.sender.name }} ({{
                          th.sender_info.sender.senderId
                        }})
                      </p>
                    </b-col>
                    <b-col>
                      <p class="mb-0 blue-text">Receiver Name (SGLN)</p>
                      <p class="mt-0">
                        {{ th.receiver_info.receiver.name }} ({{
                          th.receiver_info.receiver.receiverId
                        }})
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class="mb-0 blue-text">Sender Address</p>
                      <p class="mt-0">
                        {{ th.sender_info.sender.streetAddressOne }},
                        {{ th.sender_info.sender.streetAddressTwo }},
                        {{ th.sender_info.sender.postalCode }},
                        {{ th.sender_info.sender.city }},
                        {{ th.sender_info.sender.state }},
                        {{ th.sender_info.sender.countryCode }}.
                      </p>
                    </b-col>
                    <b-col>
                      <p class="mb-0 blue-text">Receiver Address</p>
                      <p class="mt-0">
                        {{ th.receiver_info.receiver.streetAddressOne }},
                        {{ th.receiver_info.receiver.streetAddressTwo }},
                        {{ th.receiver_info.receiver.postalCode }},
                        {{ th.receiver_info.receiver.city }},
                        {{ th.receiver_info.receiver.state }},
                        {{ th.receiver_info.receiver.countryCode }}.
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class="mb-0 blue-text">From Location</p>
                      <p class="mt-0">
                        {{
                          th.sender_info.senderOfLocationOrigin
                            .streetAddressOne
                        }},
                        {{
                          th.sender_info.senderOfLocationOrigin
                            .streetAddressTwo
                        }},
                        {{ th.sender_info.senderOfLocationOrigin.postalCode }},
                        {{ th.sender_info.senderOfLocationOrigin.city }},
                        {{ th.sender_info.senderOfLocationOrigin.state }},
                        {{ th.sender_info.senderOfLocationOrigin.countryCode }}.
                      </p>
                    </b-col>
                    <b-col>
                      <p class="mb-0 blue-text">To Location</p>
                      <p class="mt-0">
                        {{
                          th.receiver_info.receiverOfLocationOrigin
                            .streetAddressOne
                        }},
                        {{
                          th.receiver_info.receiverOfLocationOrigin
                            .streetAddressTwo
                        }},
                        {{
                          th.receiver_info.receiverOfLocationOrigin.postalCode
                        }},
                        {{ th.receiver_info.receiverOfLocationOrigin.city }},
                        {{ th.receiver_info.receiverOfLocationOrigin.state }},
                        {{
                          th.receiver_info.receiverOfLocationOrigin.countryCode
                        }}.
                      </p>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <p class="mb-0 blue-text">Purchase Orders</p>
                      <p class="mt-0">
                        {{ th.purchaseOrders }}
                      </p>
                    </b-col>
                    <b-col>
                      <p class="mb-0 blue-text">Shipment Date</p>
                      <p class="mt-0">
                        {{ th.timeTransaction }}
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
      </b-modal>
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
            <b-col md="3" v-if="modal_pack_item_info.parent_1 !== ''">
              <img
                width="200px"
                src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
                alt="Package"
              />
              <p style="text-align: center;margin-bottom: 0px !important;">
                SSCC/SGTIN: {{ modal_pack_item_info.parent_1 }}
              </p>
              <p style="text-align: center" class="blue-text">Level 1</p>
            </b-col>
            <b-col md="3" v-if="modal_pack_item_info.parent_2 !== ''">
              <img
                width="200px"
                src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
                alt="Package"
              />
              <p style="text-align: center;margin-bottom: 0px !important;">
                SGTIN: {{ modal_pack_item_info.parent_2 }}
              </p>
              <p style="text-align: center" class="blue-text">Level 2</p>
            </b-col>
            <b-col md="3" v-if="modal_pack_item_info.parent_3 !== ''">
              <img
                width="200px"
                src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackImage.png?alt=media&token=8afe3df6-0819-45b2-99a8-972065a83d07"
                alt="Package"
              />

              <p style="text-align: center;margin-bottom: 0px !important;">
                SGTIN: {{ modal_pack_item_info.parent_3 }}
              </p>
              <p style="text-align: center" class="blue-text">Level 3</p>
            </b-col>
            <b-col md="3" v-if="modal_pack_item_info.item !== ''">
            
              <img width="200px" src="https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/PackItemImage.png?alt=media&token=022af416-b315-4a43-ad9f-32810dbf1ab9" alt="item">
              <p style="text-align: center;margin-bottom: 0px !important;">SGTIN:{{ modal_pack_item_info.item }}</p>
              <p style="text-align: center" class="blue-text">Item</p>
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt";
import "datatables.net-dt/js/dataTables.dataTables";
import DataTable from "datatables.net-dt";
import $ from "jquery";
export default {
  name: "Datatable_EPCIS",
  data: function () {
    return {
      datatable: null,
      datatable_content: [],
      datatable_purchase_order: [],
      modalShown: false,
      toggleCollapse: false,
      transaction_details: {},
      transaction_information_details: {},
      items_sgtin: [],
      items_product_information: [],
      modalShown_th: false,
      modalShown_pack: false,
      modal_th_item_info: {},
      modal_pack_item_info: {},
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
          this.showPurchaseOrderDatatable();
        }, 100);
      }
    },
  },
  mounted() {
    this.datatable_content = this.data;
    this.datatable = new DataTable("#datatableComp", {
      responsive: true,
      data: this.datatable_content,
      columns: [
        {
          data: "date",
          title: "Date",
        },
        {
          data: "purchaseOrders",
          title: "Purchase Orders",
          render: function (data) {
            let arr = data.split(",");
            let resp=''
           arr.forEach((element,index,array)=>{
            if(index!==array.length-1){

              let trimmed=element.split(':')[5];
              resp+='#'+trimmed+','
            }else{
              let trimmed=element.split(':')[5];
              resp+='#'+trimmed
            }
           });
            return resp;
          },
        },
        {
          data: "isSuspicious",
          title: "Suspicious",
          render:function(data){
            if(data===true){
              return `<div class='cheto' style='background-color:rgb(157, 0, 0) !important;border-color:rgb(157, 0, 0) !important;'>Yes</div>`
            }else{
              return `<div class='cheto' style='background-color:#077cab !important;'>No</div>`
            }
          }
        },
        {
          data: "id",
          title: "Options",
          render: function () {
            return `
            <div class="d-flex justify-content-center">
              <div class="option-btn btn btn-light text-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>              
              </div>
            </div>
            `;
          },
        },
      ],
      order: [],
    });
    const self = this;
    $("#datatableComp").on("click", ".option-btn", function () {
      // Get the data associated with the row
      const rowData = self.datatable.row($(this).closest("tr")).data();
      // Open the modal
      self.$refs["modal_transaction_details"].show();
      self.modalShown = true;
      // Pass the row data to the modal component
      //   // console.log(rowData);
      self.$data.transaction_details = rowData;
      self.arrange_data_for_first_datatable();
      self.getPurchaseOrderItems();
      //   self.datatable_row_content = [];
      //   self.datatable_row_content.push(rowData);
      console.log("rowData:", rowData);
    });
  },
  methods: {
    arrange_data_for_first_datatable() {
      try {
        let data_to_return = {
          sender_sgln: "",
          sender_name: "",
          sender_address: "",
          sender_location: "",
          shipment_date: "",
          purchase_orders: "",
          receiver_location: "",
        };
        let transaction_information =
          this.transaction_details.three_ts.transaction_information;
        let trimmed_sgln =
          transaction_information.sender_info.sender.senderId.split(":sgln:");
        data_to_return.sender_sgln = trimmed_sgln[1];

        data_to_return.sender_name =
          transaction_information.sender_info.sender.name;
        data_to_return.sender_address =
          transaction_information.sender_info.sender.streetAddressOne +
          " " +
          transaction_information.sender_info.sender.streetAddressTwo +
          "," +
          transaction_information.sender_info.sender.city +
          ", " +
          transaction_information.sender_info.sender.state +
          ", " +
          transaction_information.sender_info.sender.postalCode +
          ", " +
          transaction_information.sender_info.sender.countryCode;
        data_to_return.sender_location =
          transaction_information.sender_info.senderOfLocationOrigin
            .streetAddressOne +
          " " +
          transaction_information.sender_info.senderOfLocationOrigin
            .streetAddressTwo +
          "," +
          transaction_information.sender_info.senderOfLocationOrigin.city +
          ", " +
          transaction_information.sender_info.senderOfLocationOrigin.state +
          ", " +
          transaction_information.sender_info.senderOfLocationOrigin
            .postalCode +
          ", " +
          transaction_information.sender_info.senderOfLocationOrigin
            .countryCode;
        data_to_return.shipment_date = transaction_information.timeTransaction;
        transaction_information.purchaseOrders.forEach((item, index, arr) => {
          let trimmed_po = item.split(":");
          if (index !== arr.length - 1) {
            data_to_return.purchase_orders += "#" + trimmed_po[5] + ", ";
          } else {
            data_to_return.purchase_orders += "#" + trimmed_po[5];
          }
        });
        data_to_return.receiver_location =
          transaction_information.receiver_info.receiverOfLocationOrigin
            .streetAddressOne +
          " " +
          transaction_information.receiver_info.receiverOfLocationOrigin
            .streetAddressTwo +
          "," +
          transaction_information.receiver_info.receiverOfLocationOrigin.city +
          ", " +
          transaction_information.receiver_info.receiverOfLocationOrigin.state +
          ", " +
          transaction_information.receiver_info.receiverOfLocationOrigin
            .postalCode +
          ", " +
          transaction_information.receiver_info.receiverOfLocationOrigin
            .countryCode;
        console.log({ data_to_return });
        this.transaction_information_details = data_to_return;
      } catch (err) {
        console.error(
          "Error occurred in arrange_data_for_first_datatable",
          err
        );
      }
    },
    getPurchaseOrderItems() {
      try {
        let transaction_event =
          this.transaction_details.three_ts.transaction_information
            .transactionEvent;
        let products_information =
          this.transaction_details.three_ts.transaction_information
            .products_information;
        let transaction_history =
          this.transaction_details.three_ts.transaction_history;
        console.log(transaction_history.length);
        let data_to_return = [];

        transaction_event.forEach((element) => {
          let aux = {
            po: "",
            items: [],
            dataTable: null,
          };

          if (element.outermost.single_items.length !== 0) {
            element.outermost.single_items.forEach((item) => {
              let item_info = {
                itemIdentification: "-",
                itemIdentificationTypeCode: "-",
                productName: "-",
                nameManufacturerOrTrader: "-",
                dosage: "-",
                strength: "-",
                containerSize: "-",
                lotNumber: "-",
                expirationDate: "-",
              };
              let aux_th = [];
              products_information.forEach((info) => {
                if (info.sgtin === item) {
                  item_info.itemIdentification = info.itemIdentification || "-";
                  item_info.itemIdentificationTypeCode =
                    info.itemIdentificationTypeCode || "-";
                  item_info.productName = info.productName || "-";
                  item_info.nameManufacturerOrTrader =
                    info.nameManufacturerOrTrader || "-";
                  item_info.dosage = info.dosage || "-";
                  item_info.strength = info.strength || "-";
                  item_info.containerSize = info.containerSize || "-";
                  item_info.lotNumber = info.lotNumber || "-";
                  item_info.expirationDate = info.expirationDate || "-";
                }
              });
              transaction_history.forEach((history) => {
                let item_history = {
                  receiver_info: {
                    receiver: {
                      city: "",
                      countryCode: "",
                      name: "",
                      postalCode: "",
                      receiverId: "",
                      state: "",
                      streetAddressOne: "",
                      streetAddressTwo: "",
                    },
                    receiverOfLocationOrigin: {
                      city: "",
                      countryCode: "",
                      name: "",
                      postalCode: "",
                      receiverId: "",
                      state: "",
                      streetAddressOne: "",
                      streetAddressTwo: "",
                    },
                  },
                  timeTransaction: "",
                  purchaseOrders: [],
                  sender_info: {
                    sender: {
                      city: "",
                      countryCode: "",
                      name: "",
                      postalCode: "",
                      senderId: "",
                      state: "",
                      streetAddressOne: "",
                      streetAddressTwo: "",
                    },
                    senderOfLocationOrigin: {
                      city: "",
                      countryCode: "",
                      name: "",
                      postalCode: "",
                      senderId: "",
                      state: "",
                      streetAddressOne: "",
                      streetAddressTwo: "",
                    },
                  },
                };
                if (history.commissioning) {
                  history.commissioning.forEach((commissioning_item) => {
                    if (item === commissioning_item) {
                      item_history.sender_info.sender.city =
                        history.sender_info.sender.city;
                      item_history.sender_info.sender.countryCode =
                        history.sender_info.sender.countryCode;
                      item_history.sender_info.sender.name =
                        history.sender_info.sender.name;
                      item_history.sender_info.sender.postalCode =
                        history.sender_info.sender.postalCode;
                      item_history.sender_info.sender.senderId =
                        history.sender_info.sender.senderId.split(":")[4];
                      item_history.sender_info.sender.state =
                        history.sender_info.sender.state;
                      item_history.sender_info.sender.streetAddressOne =
                        history.sender_info.sender.streetAddressOne;
                      item_history.sender_info.sender.streetAddressTwo =
                        history.sender_info.sender.streetAddressTwo;
                      // Sender location
                      item_history.sender_info.senderOfLocationOrigin.city =
                        history.sender_info.senderOfLocationOrigin.city;
                      item_history.sender_info.senderOfLocationOrigin.countryCode =
                        history.sender_info.senderOfLocationOrigin.countryCode;
                      item_history.sender_info.senderOfLocationOrigin.name =
                        history.sender_info.senderOfLocationOrigin.name;
                      item_history.sender_info.senderOfLocationOrigin.postalCode =
                        history.sender_info.senderOfLocationOrigin.postalCode;
                      item_history.sender_info.senderOfLocationOrigin.senderId =
                        history.sender_info.senderOfLocationOrigin.senderId;
                      item_history.sender_info.senderOfLocationOrigin.state =
                        history.sender_info.senderOfLocationOrigin.state;
                      item_history.sender_info.senderOfLocationOrigin.streetAddressOne =
                        history.sender_info.senderOfLocationOrigin.streetAddressOne;
                      item_history.sender_info.senderOfLocationOrigin.streetAddressTwo =
                        history.sender_info.senderOfLocationOrigin.streetAddressTwo;
                      // Receiver
                      item_history.receiver_info.receiver.city =
                        history.receiver_info.receiver.city;
                      item_history.receiver_info.receiver.countryCode =
                        history.receiver_info.receiver.countryCode;
                      item_history.receiver_info.receiver.name =
                        history.receiver_info.receiver.name;
                      item_history.receiver_info.receiver.postalCode =
                        history.receiver_info.receiver.postalCode;
                      item_history.receiver_info.receiver.receiverId =
                        history.receiver_info.receiver.receiverId.split(":")[4];
                      item_history.receiver_info.receiver.state =
                        history.receiver_info.receiver.state;
                      item_history.receiver_info.receiver.streetAddressOne =
                        history.receiver_info.receiver.streetAddressOne;
                      item_history.receiver_info.receiver.streetAddressTwo =
                        history.receiver_info.receiver.streetAddressTwo;
                      // Receiver Location
                      item_history.receiver_info.receiverOfLocationOrigin =
                        history.receiver_info.receiverOfLocationOrigin;
                      item_history.timeTransaction = history.timeTransaction;
                      history.purchaseOrders.forEach((item, index, arr) => {
                        let trimmed_po = item.split(":");
                        if (index !== arr.length - 1) {
                          item_history.purchaseOrders +=
                            "#" + trimmed_po[5] + ", ";
                        } else {
                          item_history.purchaseOrders += "#" + trimmed_po[5];
                        }
                      });
                    }
                  });
                  aux_th.push(item_history);
                }
              });
              aux.items.push({
                item: item,
                parent_1: element.outermost.id,
                parent_2: null,
                parent_3: null,
                item_info: item_info,
                item_history: aux_th,
              });
            });
          }
          if (element.outermost.items_with_children.length !== 0) {
            element.outermost.items_with_children.forEach((item) => {
              if (item.parent_item) {
                if (item.parent_item.children_items.length !== 0) {
                  item.parent_item.children_items.forEach((child) => {
                    let item_info = {
                      itemIdentification: "-",
                      itemIdentificationTypeCode: "-",
                      productName: "-",
                      nameManufacturerOrTrader: "-",
                      dosage: "-",
                      strength: "-",
                      containerSize: "-",
                      lotNumber: "-",
                      expirationDate: "-",
                    };
                    let aux_th = [];
                    products_information.forEach((info) => {
                      if (info.sgtin === child) {
                        item_info.itemIdentification =
                          info.itemIdentification || "-";
                        item_info.itemIdentificationTypeCode =
                          info.itemIdentificationTypeCode || "-";
                        item_info.productName = info.productName || "-";
                        item_info.nameManufacturerOrTrader =
                          info.nameManufacturerOrTrader || "-";
                        item_info.dosage = info.dosage || "-";
                        item_info.strength = info.strength || "-";
                        item_info.containerSize = info.containerSize || "-";
                        item_info.lotNumber = info.lotNumber || "-";
                        item_info.expirationDate = info.expirationDate || "-";
                      }
                    });
                    transaction_history.forEach((history) => {
                      let item_history = {
                        receiver_info: {
                          receiver: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            receiverId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                          receiverOfLocationOrigin: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            receiverId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                        },
                        timeTransaction: "",
                        purchaseOrders: [],
                        sender_info: {
                          sender: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            senderId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                          senderOfLocationOrigin: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            senderId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                        },
                      };
                      if (history.commissioning) {
                        history.commissioning.forEach((commissioning_item) => {
                          if (child === commissioning_item) {
                            item_history.sender_info.sender.city =
                              history.sender_info.sender.city;
                            item_history.sender_info.sender.countryCode =
                              history.sender_info.sender.countryCode;
                            item_history.sender_info.sender.name =
                              history.sender_info.sender.name;
                            item_history.sender_info.sender.postalCode =
                              history.sender_info.sender.postalCode;
                            item_history.sender_info.sender.senderId =
                              history.sender_info.sender.senderId.split(":")[4];
                            item_history.sender_info.sender.state =
                              history.sender_info.sender.state;
                            item_history.sender_info.sender.streetAddressOne =
                              history.sender_info.sender.streetAddressOne;
                            item_history.sender_info.sender.streetAddressTwo =
                              history.sender_info.sender.streetAddressTwo;
                            // Sender location
                            item_history.sender_info.senderOfLocationOrigin.city =
                              history.sender_info.senderOfLocationOrigin.city;
                            item_history.sender_info.senderOfLocationOrigin.countryCode =
                              history.sender_info.senderOfLocationOrigin.countryCode;
                            item_history.sender_info.senderOfLocationOrigin.name =
                              history.sender_info.senderOfLocationOrigin.name;
                            item_history.sender_info.senderOfLocationOrigin.postalCode =
                              history.sender_info.senderOfLocationOrigin.postalCode;
                            item_history.sender_info.senderOfLocationOrigin.senderId =
                              history.sender_info.senderOfLocationOrigin.senderId;
                            item_history.sender_info.senderOfLocationOrigin.state =
                              history.sender_info.senderOfLocationOrigin.state;
                            item_history.sender_info.senderOfLocationOrigin.streetAddressOne =
                              history.sender_info.senderOfLocationOrigin.streetAddressOne;
                            item_history.sender_info.senderOfLocationOrigin.streetAddressTwo =
                              history.sender_info.senderOfLocationOrigin.streetAddressTwo;
                            // Receiver
                            item_history.receiver_info.receiver.city =
                              history.receiver_info.receiver.city;
                            item_history.receiver_info.receiver.countryCode =
                              history.receiver_info.receiver.countryCode;
                            item_history.receiver_info.receiver.name =
                              history.receiver_info.receiver.name;
                            item_history.receiver_info.receiver.postalCode =
                              history.receiver_info.receiver.postalCode;
                            item_history.receiver_info.receiver.receiverId =
                              history.receiver_info.receiver.receiverId.split(
                                ":"
                              )[4];
                            item_history.receiver_info.receiver.state =
                              history.receiver_info.receiver.state;
                            item_history.receiver_info.receiver.streetAddressOne =
                              history.receiver_info.receiver.streetAddressOne;
                            item_history.receiver_info.receiver.streetAddressTwo =
                              history.receiver_info.receiver.streetAddressTwo;
                            // Receiver Location
                            item_history.receiver_info.receiverOfLocationOrigin =
                              history.receiver_info.receiverOfLocationOrigin;
                            item_history.timeTransaction =
                              history.timeTransaction;
                            history.purchaseOrders.forEach(
                              (item, index, arr) => {
                                let trimmed_po = item.split(":");
                                if (index !== arr.length - 1) {
                                  item_history.purchaseOrders +=
                                    "#" + trimmed_po[5] + ", ";
                                } else {
                                  item_history.purchaseOrders +=
                                    "#" + trimmed_po[5];
                                }
                              }
                            );
                          }
                        });
                        aux_th.push(item_history);
                      }
                    });
                    aux.items.push({
                      item: child,
                      parent_1: element.outermost.id,
                      parent_2: item.parent_item.id,
                      parent_3: null,
                      item_info: item_info,
                      item_history: aux_th,
                    });
                  });
                }
              }
              if (item.upper_parent) {
                if (item.upper_parent.single_items.length !== 0) {
                  item.upper_parent.single_items.forEach((child) => {
                    let item_info = {
                      itemIdentification: "-",
                      itemIdentificationTypeCode: "-",
                      productName: "-",
                      nameManufacturerOrTrader: "-",
                      dosage: "-",
                      strength: "-",
                      containerSize: "-",
                      lotNumber: "-",
                      expirationDate: "-",
                    };
                    let aux_th = [];
                    products_information.forEach((info) => {
                      if (info.sgtin === child) {
                        item_info.itemIdentification =
                          info.itemIdentification || "-";
                        item_info.itemIdentificationTypeCode =
                          info.itemIdentificationTypeCode || "-";
                        item_info.productName = info.productName || "-";
                        item_info.nameManufacturerOrTrader =
                          info.nameManufacturerOrTrader || "-";
                        item_info.dosage = info.dosage || "-";
                        item_info.strength = info.strength || "-";
                        item_info.containerSize = info.containerSize || "-";
                        item_info.lotNumber = info.lotNumber || "-";
                        item_info.expirationDate = info.expirationDate || "-";
                      }
                    });
                    transaction_history.forEach((history) => {
                      let item_history = {
                        receiver_info: {
                          receiver: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            receiverId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                          receiverOfLocationOrigin: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            receiverId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                        },
                        timeTransaction: "",
                        purchaseOrders: [],
                        sender_info: {
                          sender: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            senderId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                          senderOfLocationOrigin: {
                            city: "",
                            countryCode: "",
                            name: "",
                            postalCode: "",
                            senderId: "",
                            state: "",
                            streetAddressOne: "",
                            streetAddressTwo: "",
                          },
                        },
                      };
                      if (history.commissioning) {
                        history.commissioning.forEach((commissioning_item) => {
                          if (child === commissioning_item) {
                            item_history.sender_info.sender.city =
                              history.sender_info.sender.city;
                            item_history.sender_info.sender.countryCode =
                              history.sender_info.sender.countryCode;
                            item_history.sender_info.sender.name =
                              history.sender_info.sender.name;
                            item_history.sender_info.sender.postalCode =
                              history.sender_info.sender.postalCode;
                            item_history.sender_info.sender.senderId =
                              history.sender_info.sender.senderId.split(":")[4];
                            item_history.sender_info.sender.state =
                              history.sender_info.sender.state;
                            item_history.sender_info.sender.streetAddressOne =
                              history.sender_info.sender.streetAddressOne;
                            item_history.sender_info.sender.streetAddressTwo =
                              history.sender_info.sender.streetAddressTwo;
                            // Sender location
                            item_history.sender_info.senderOfLocationOrigin.city =
                              history.sender_info.senderOfLocationOrigin.city;
                            item_history.sender_info.senderOfLocationOrigin.countryCode =
                              history.sender_info.senderOfLocationOrigin.countryCode;
                            item_history.sender_info.senderOfLocationOrigin.name =
                              history.sender_info.senderOfLocationOrigin.name;
                            item_history.sender_info.senderOfLocationOrigin.postalCode =
                              history.sender_info.senderOfLocationOrigin.postalCode;
                            item_history.sender_info.senderOfLocationOrigin.senderId =
                              history.sender_info.senderOfLocationOrigin.senderId;
                            item_history.sender_info.senderOfLocationOrigin.state =
                              history.sender_info.senderOfLocationOrigin.state;
                            item_history.sender_info.senderOfLocationOrigin.streetAddressOne =
                              history.sender_info.senderOfLocationOrigin.streetAddressOne;
                            item_history.sender_info.senderOfLocationOrigin.streetAddressTwo =
                              history.sender_info.senderOfLocationOrigin.streetAddressTwo;
                            // Receiver
                            item_history.receiver_info.receiver.city =
                              history.receiver_info.receiver.city;
                            item_history.receiver_info.receiver.countryCode =
                              history.receiver_info.receiver.countryCode;
                            item_history.receiver_info.receiver.name =
                              history.receiver_info.receiver.name;
                            item_history.receiver_info.receiver.postalCode =
                              history.receiver_info.receiver.postalCode;
                            item_history.receiver_info.receiver.receiverId =
                              history.receiver_info.receiver.receiverId.split(
                                ":"
                              )[4];
                            item_history.receiver_info.receiver.state =
                              history.receiver_info.receiver.state;
                            item_history.receiver_info.receiver.streetAddressOne =
                              history.receiver_info.receiver.streetAddressOne;
                            item_history.receiver_info.receiver.streetAddressTwo =
                              history.receiver_info.receiver.streetAddressTwo;
                            // Receiver Location
                            item_history.receiver_info.receiverOfLocationOrigin =
                              history.receiver_info.receiverOfLocationOrigin;
                            item_history.timeTransaction =
                              history.timeTransaction;
                            history.purchaseOrders.forEach(
                              (item, index, arr) => {
                                let trimmed_po = item.split(":");
                                if (index !== arr.length - 1) {
                                  item_history.purchaseOrders +=
                                    "#" + trimmed_po[5] + ", ";
                                } else {
                                  item_history.purchaseOrders +=
                                    "#" + trimmed_po[5];
                                }
                              }
                            );
                          }
                        });
                        aux_th.push(item_history);
                      }
                    });
                    aux.items.push({
                      item: child,
                      parent_1: element.outermost.id,
                      parent_2: item.upper_parent.id,
                      parent_3: null,
                      item_info: item_info,
                      item_history: aux_th,
                    });
                  });
                }
                if (item.upper_parent.parent_item.length !== 0) {
                  item.upper_parent.parent_item.forEach((parent) => {
                    if (parent.children_items.length !== 0) {
                      parent.children_items.forEach((child) => {
                        let item_info = {
                          itemIdentification: "-",
                          itemIdentificationTypeCode: "-",
                          productName: "-",
                          nameManufacturerOrTrader: "-",
                          dosage: "-",
                          strength: "-",
                          containerSize: "-",
                          lotNumber: "-",
                          expirationDate: "-",
                        };
                        let aux_th = [];
                        products_information.forEach((info) => {
                          if (info.sgtin === child) {
                            item_info.itemIdentification =
                              info.itemIdentification || "-";
                            item_info.itemIdentificationTypeCode =
                              info.itemIdentificationTypeCode || "-";
                            item_info.productName = info.productName || "-";
                            item_info.nameManufacturerOrTrader =
                              info.nameManufacturerOrTrader || "-";
                            item_info.dosage = info.dosage || "-";
                            item_info.strength = info.strength || "-";
                            item_info.containerSize = info.containerSize || "-";
                            item_info.lotNumber = info.lotNumber || "-";
                            item_info.expirationDate =
                              info.expirationDate || "-";
                          }
                        });
                        transaction_history.forEach((history) => {
                          let item_history = {
                            receiver_info: {
                              receiver: {
                                city: "",
                                countryCode: "",
                                name: "",
                                postalCode: "",
                                receiverId: "",
                                state: "",
                                streetAddressOne: "",
                                streetAddressTwo: "",
                              },
                              receiverOfLocationOrigin: {
                                city: "",
                                countryCode: "",
                                name: "",
                                postalCode: "",
                                receiverId: "",
                                state: "",
                                streetAddressOne: "",
                                streetAddressTwo: "",
                              },
                            },
                            timeTransaction: "",
                            purchaseOrders: [],
                            sender_info: {
                              sender: {
                                city: "",
                                countryCode: "",
                                name: "",
                                postalCode: "",
                                senderId: "",
                                state: "",
                                streetAddressOne: "",
                                streetAddressTwo: "",
                              },
                              senderOfLocationOrigin: {
                                city: "",
                                countryCode: "",
                                name: "",
                                postalCode: "",
                                senderId: "",
                                state: "",
                                streetAddressOne: "",
                                streetAddressTwo: "",
                              },
                            },
                          };
                          if (history.commissioning) {
                            history.commissioning.forEach(
                              (commissioning_item) => {
                                if (child === commissioning_item) {
                                  item_history.sender_info.sender.city =
                                    history.sender_info.sender.city;
                                  item_history.sender_info.sender.countryCode =
                                    history.sender_info.sender.countryCode;
                                  item_history.sender_info.sender.name =
                                    history.sender_info.sender.name;
                                  item_history.sender_info.sender.postalCode =
                                    history.sender_info.sender.postalCode;
                                  item_history.sender_info.sender.senderId =
                                    history.sender_info.sender.senderId.split(
                                      ":"
                                    )[4];
                                  item_history.sender_info.sender.state =
                                    history.sender_info.sender.state;
                                  item_history.sender_info.sender.streetAddressOne =
                                    history.sender_info.sender.streetAddressOne;
                                  item_history.sender_info.sender.streetAddressTwo =
                                    history.sender_info.sender.streetAddressTwo;
                                  // Sender location
                                  item_history.sender_info.senderOfLocationOrigin.city =
                                    history.sender_info.senderOfLocationOrigin.city;
                                  item_history.sender_info.senderOfLocationOrigin.countryCode =
                                    history.sender_info.senderOfLocationOrigin.countryCode;
                                  item_history.sender_info.senderOfLocationOrigin.name =
                                    history.sender_info.senderOfLocationOrigin.name;
                                  item_history.sender_info.senderOfLocationOrigin.postalCode =
                                    history.sender_info.senderOfLocationOrigin.postalCode;
                                  item_history.sender_info.senderOfLocationOrigin.senderId =
                                    history.sender_info.senderOfLocationOrigin.senderId.split(
                                      ":"
                                    )[4];
                                  item_history.sender_info.senderOfLocationOrigin.state =
                                    history.sender_info.senderOfLocationOrigin.state;
                                  item_history.sender_info.senderOfLocationOrigin.streetAddressOne =
                                    history.sender_info.senderOfLocationOrigin.streetAddressOne;
                                  item_history.sender_info.senderOfLocationOrigin.streetAddressTwo =
                                    history.sender_info.senderOfLocationOrigin.streetAddressTwo;
                                  // Receiver
                                  item_history.receiver_info.receiver.city =
                                    history.receiver_info.receiver.city;
                                  item_history.receiver_info.receiver.countryCode =
                                    history.receiver_info.receiver.countryCode;
                                  item_history.receiver_info.receiver.name =
                                    history.receiver_info.receiver.name;
                                  item_history.receiver_info.receiver.postalCode =
                                    history.receiver_info.receiver.postalCode;
                                  item_history.receiver_info.receiver.receiverId =
                                    history.receiver_info.receiver.receiverId.split(
                                      ":"
                                    )[4];
                                  item_history.receiver_info.receiver.state =
                                    history.receiver_info.receiver.state;
                                  item_history.receiver_info.receiver.streetAddressOne =
                                    history.receiver_info.receiver.streetAddressOne;
                                  item_history.receiver_info.receiver.streetAddressTwo =
                                    history.receiver_info.receiver.streetAddressTwo;
                                  // Receiver Location
                                  item_history.receiver_info.receiverOfLocationOrigin =
                                    history.receiver_info.receiverOfLocationOrigin;
                                  item_history.timeTransaction =
                                    history.timeTransaction;
                                  history.purchaseOrders.forEach(
                                    (item, index, arr) => {
                                      let trimmed_po = item.split(":");
                                      if (index !== arr.length - 1) {
                                        item_history.purchaseOrders +=
                                          "#" + trimmed_po[5] + ", ";
                                      } else {
                                        item_history.purchaseOrders +=
                                          "#" + trimmed_po[5];
                                      }
                                    }
                                  );
                                }
                              }
                            );
                            aux_th.push(item_history);
                          }
                        });
                        aux.items.push({
                          item: child,
                          parent_1: element.outermost.id,
                          parent_2: item.upper_parent.id,
                          parent_3: parent.id,
                          item_info: item_info,
                          item_history: aux_th,
                        });
                      });
                    }
                  });
                }
              }
            });
          }
          let trimmed_po = element.purchase_order.split(":");

          aux.po = trimmed_po[5];
          data_to_return.push(aux);
        });
        // Create an empty array to store the grouped data
        const groupedArray = [];

        // Create a map to store the indexes of the POs in the groupedArray
        const poIndexMap = {};

        data_to_return.forEach((item) => {
          // if (typeof poIndexMap[item.po] === "undefined") {
          //   const newGroup = { po: item.po, items: [...new Set(item.items)] };
          //   groupedArray.push(newGroup);
          //   poIndexMap[item.po] = groupedArray.length - 1;
          // } else {
          //   const currentItemsSet = new Set(
          //     groupedArray[poIndexMap[item.po]].items
          //   );
          //   item.items.forEach((newItem) => currentItemsSet.add(newItem));
          //   groupedArray[poIndexMap[item.po]].items = [...currentItemsSet];
          // }
          if (typeof poIndexMap[item.po] === "undefined") {
            const newGroup = { po: item.po, items: item.items };
            groupedArray.push(newGroup);
            poIndexMap[item.po] = groupedArray.length - 1;
          } else {
            groupedArray[poIndexMap[item.po]].items = groupedArray[
              poIndexMap[item.po]
            ].items.concat(item.items);
          }
        });
        this.items_sgtin = groupedArray;
        this.items_product_information =
          this.transaction_details.three_ts.transaction_information.products_information;
        console.log("data_to_return getPurchaseOrderItems:", data_to_return);
        console.log("getPurchaseOrderItems:", groupedArray);
      } catch (err) {
        console.error("Error occurred in getPurchaseOrderItems", err);
      }
    },
    showModal() {
      this.$refs["modal_transaction_details"].show();
    },
    hideModal() {
      this.modalShown = false;
      this.toggleCollapse = false;
    },
    hideModal_th() {
      this.modalShown_th = false;
    },
    hideModal_pack() {
      this.modalShown_pack = false;
    },
    showPurchaseOrderDatatable() {
      console.log("showPurchaseOrderDatatable", this.items_sgtin[0].items);
      this.items_sgtin.forEach((item_element) => {
        item_element.dataTable = new DataTable("#" + item_element.po, {
          responsive: true,
          data: item_element.items,
          searching: true,
          columnDefs: [
            { targets: [0], width: "3rem" },
            { targets: [8], width: "1rem" },
          ],
          columns: [
            {
              data: "item",
              title: "SGTIN",
              render: function (data) {
                let trimmed_sgtin = data.split(":");
                return trimmed_sgtin[4];
              },
            },
            {
              data: "item_info.itemIdentification",
              title: "NDC",
            },
            {
              data: "item_info.productName",
              title: "Product Name",
            },
            {
              data: "item_info.dosage",
              title: "Dosage",
            },
            {
              data: "item_info.strength",
              title: "Strength",
            },
            {
              data: "item_info.containerSize",
              title: "Container Size",
            },
            {
              data: "item_info.lotNumber",
              title: "Lot Number",
            },
            {
              data: "item_info.expirationDate",
              title: "Expiration Date",
            },
            {
              data: "item",
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
            </div>
            `;
              },
            },
          ],
        });

        const self = this;
        $("#" + item_element.po).on(
          "click",
          ".option-item-th-btn",
          function () {
            const rowData = item_element.dataTable
              .row($(this).closest("tr"))
              .data();
            console.log("ROWDATA TH:", rowData);
            // Open the modal
            self.$refs["modal_th"].show();
            self.modalShown_th = true;
            self.modal_th_item_info = rowData.item_history;
          }
        );
        $("#" + item_element.po).on(
          "click",
          ".option-item-hierarchy-btn",
          function () {
            const rowData = item_element.dataTable
              .row($(this).closest("tr"))
              .data();
            console.log("ROWDATA PACK:", rowData);
            // Open the modal
            self.$refs["modal_pack"].show();
            self.modalShown_pack = true;
            self.modal_pack_item_info = {
              item: rowData.item.split(":")[4],
              parent_1:
                rowData.parent_1 !== null ? rowData.parent_1.split(":")[4] : "",
              parent_2:
                rowData.parent_2 !== null ? rowData.parent_2.split(":")[4] : "",
              parent_3:
                rowData.parent_3 !== null ? rowData.parent_3.split(":")[4] : "",
            };
          }
        );
      });
    },
  },
};
</script>