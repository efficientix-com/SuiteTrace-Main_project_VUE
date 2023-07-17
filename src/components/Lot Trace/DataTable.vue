<template>
  <div id="Datatable-component">
    <div>
      <!-- Filters -->
      <div class="btn btn-light mb-3 aligned-left" @click="toggleFilters">
        <font-awesome-icon icon="fa-solid fa-filter" size="1x" /> Filters
      </div>
      <b-collapse v-model="toggleCollapseFilters">
        <div class="row mt-3 mb-1">
          <div class="col-md-3 col-sm-6">
            <label class="mr-sm-2" for="select-subsidiary">Subsidiary</label>
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedSubsidiary"
              :options="optionsSubsidiary"
              filter
            ></b-form-select>
          </div>
          <div class="col-md-3 col-sm-6">
            <label class="mr-sm-2" for="select-lot-number">Shipment Date</label>
            <b-form-datepicker
              id="datepicker-start"
              class="mb-2"
              @input="filterDatatable"
              v-model="selectedDate_start"
            ></b-form-datepicker>
          </div>
          <div class="col-md-3 col-sm-6">
            <label class="mr-sm-2" for="select-lot-number"
              >Transaction ID</label
            >
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedTransactionID"
              :options="options_transactionID"
              filter
            ></b-form-select>
          </div>
          <b-col md="3">
            <label class="mr-sm-2" for="select-lot-number">NDC</label>
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedNDC"
              :options="options_NDC"
              filter
            ></b-form-select>
          </b-col>
          
        </div>
        <b-row class="mb-3">
          <b-col md="3">
            <label class="mr-sm-2" for="select-lot-number">Sender</label>
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedSender"
              :options="options_Sender"
              filter
            ></b-form-select>
          </b-col>
          <b-col md="3">
            <label class="mr-sm-2" for="select-lot-number">Location</label>
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedLocation"
              :options="options_location"
              filter
            ></b-form-select>
          </b-col>
          <div class="col-md-3 col-sm-6">
            <label class="mr-sm-2" for="select-lot-number"
              >Lot/Serial number</label
            >
            <b-form-select
              id="select-subsidiary"
              @change="filterDatatable"
              class="form-select"
              v-model="selectedLotNumber"
              :options="options_lot_number"
              filter
            ></b-form-select>
          </div>
          
        </b-row>
      </b-collapse>

      <!-- datatable -->
      <table class="table mt-3" id="datatableComp"></table>

      <!-- Modal for viewing lot details -->
      <b-modal
        @hidden="hideModal"
        size="xl"
        ref="modal_lot_details"
        hide-footer
        scrollable
      >
        <template #modal-header="{ close }">
          <h5>Transaction Exchange Details</h5>
          <div size="sm" class="close" @click="close()">
            <font-awesome-icon icon="fa-solid fa-x" size="1x" />
          </div>
        </template>
        <div>
          <p class="blue-text mt-0"><strong>Transaction information</strong></p>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Service publisher</p>
              <p class="mt-0">{{ lot_view_details.entity }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Lot/Serial number</p>
              <p class="mt-0">{{ lot_view_details.delivery_number }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Location</p>
              <p class="mt-0">{{ lot_view_details.address_vendor }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Type</p>
              <p class="mt-0">Receipt</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">From business</p>
              <p class="mt-0">{{ lot_view_details.address_vendor }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">To business</p>
              <p class="mt-0">
                ({{ lot_view_details.location }})
                {{ lot_view_details.ship_to_location }}
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="mb-0 blue-text">Shipment date</p>
              <p class="mt-0">{{ lot_view_details.trandate }}</p>
            </div>
            <div class="col">
              <p class="mb-0 blue-text">Transaction ID</p>
              <p class="mt-0">{{ lot_view_details.transaction_id }}</p>
            </div>
          </div>
          <div></div>
        </div>
        <div class="row">
          <div class="col">
            <p class="blue-text headline">Purchase Receipts</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <!-- Datatable that has general item info of the lot -->
            <table
              class="table mt-3 px-2"
              id="datatable_purchase_receipts"
            ></table>
          </div>
        </div>
        <div class="row p-2">
          <div class="col">
            <!-- Collapse for item information -->
            <b-collapse class="mt-3" v-model="toggleCollapse">
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
                      v-if="dataHist.recordType === 'itemreceipt'"
                    >
                      <strong
                        >{{ dataHist.vendor }}
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-right"
                          size="1x"
                        />
                        {{ dataHist.subsidiary }} ({{
                          dataHist.location
                        }})</strong
                      >
                    </div>
                    <div
                      class="col text-center"
                      v-else-if="dataHist.recordType === 'inventoryadjustment'"
                    >
                      <strong
                        >{{ dataHist.subsidiary }} ({{
                          dataHist.location
                        }})</strong
                      >
                    </div>
                    <div class="col text-center" v-else>
                      <strong
                        >{{ dataHist.subsidiary }} ({{ dataHist.location }})
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-right"
                          size="1x"
                        />
                        {{ dataHist.vendor }}</strong
                      >
                    </div>
                  </div>
                  <!-- Record type of data history-->
                  <div>
                    <div class="cheto">
                      {{
                        dataHist.recordType === "itemreceipt"
                          ? "Receipt"
                          : dataHist.recordType === "inventoryadjustment"
                          ? "Inventory Adjustment"
                          : dataHist.recordType === "itemfulfillment"
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
                  <div
                    class="row"
                    v-if="dataHist.recordType === 'inventoryadjustment'"
                  >
                    <div class="col">
                      <p class="mb-0 blue-text">Address</p>
                      <p class="mt-0">{{ dataHist.address }}</p>
                    </div>
                    <div class="col">
                      <p class="mb-0 blue-text">Delivery number</p>
                      <p class="mt-0">{{ dataHist.delivery_number }}</p>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-else-if="dataHist.recordType === 'itemreceipt'"
                  >
                    <div class="col">
                      <p class="mb-0 blue-text">From business</p>
                      <p class="mt-0">{{ dataHist.address_vendor }}</p>
                    </div>
                    <div class="col">
                      <p class="mb-0 blue-text">To business</p>
                      <p class="mt-0">
                        ({{ dataHist.location }})
                        {{ dataHist.destination_address }}
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
                  <div class="row" v-if="dataHist.recordType === 'itemreceipt'">
                    <div class="col">
                      <p class="mb-0 blue-text">Lot/Serial number</p>
                      <p class="mt-0">{{ dataHist.delivery_number }}</p>
                    </div>
                  </div>
                  <div
                    class="row"
                    v-if="dataHist.recordType === 'inventoryadjustment'"
                  >
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
            </b-collapse>
          </div>
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
  name: "DatatableComponent",
  data: function () {
    return {
      datatable: null,
      modalShown: false,
      toggleCollapse: false,
      toggleCollapseFilters: false,
      datatable_purchase_receipts: null,
      datatable_allRecordTypes_perItem: [],
      datatable_content: [],
      datatable_row_content: [],
      formattedDates: [],
      lot_view_details: {
        lot_number: "",
        subsidiary: "",
        location: "",
        start_date: "",
        end_date: "",
        lot_expiry_date: "",
      },
      selectedDate_start: null,
      selectedDate_end: "",
      selectedDate_expiry: "",
      selectedSubsidiary: "",
      // To be filled by Netsuite
      optionsSubsidiary: [
        { value: "All", text: "All" },
        // { value: "Healix LLC", text: "Healix LLC" },
        // {
        //   value: "Healix LLC : Complete Infusion Solutions",
        //   text: "Healix LLC : Complete Infusion Solutions",
        // },
        // {
        //   value: "Healix LLC : Healix Infusion Therapy",
        //   text: "Healix LLC : Healix Infusion Therapy",
        // },
      ],
      selectedLotNumber: "",
      // To be filled by Netsuite
      options_lot_number: [
        { value: "All", text: "All" },
        // { value: "Lot1", text: "Lot1" },
        // { value: "987654", text: "987654" },
        // { value: "7477688", text: "7477688" },
      ],
      selectedLocation: "",
      // To be filled by Netsuite
      options_location: [
        { value: "All", text: "All" },
        // { value: "CORP", text: "CORP" },
        // { value: "HCPS", text: "HCPS" },
        // { value: "HCPS2", text: "HCPS2" },
        // { value: "HPG", text: "HPG" },
        // { value: "N004", text: "N004" },
        // { value: "N007", text: "N007" },
      ],
      selectedTransactionID: "",
      options_transactionID: [
        { value: "All", text: "All" },
        // { value: "PO-180", text: "PO-180" },
        // { value: "PO-000153", text: "PO-000153" },
        // { value: "PO-000138", text: "PO-000138" },
        // { value: "PO-000039", text: "PO-000039" },
      ],
      selectedSender: "",
      options_Sender: [
        { value: "All", text: "All" },
        // { value: "McKesson Supply", text: "McKesson Supply" },
        // {
        //   value: "Amerisource Bergen Drug Corp.",
        //   text: "Amerisource Bergen Drug Corp.",
        // },
        // { value: "Curascript", text: "Curascript" },
        // { value: "Sam's Club", text: "Sam's Club" },
      ],
      selectedNDC: "",
      options_NDC: [
        { value: "All", text: "All" },
        // { value: "00143998303", text: "00143998303" },
        // { value: "00003218713", text: "00003218713" },
        // { value: "00143992490", text: "00143992490" },
        // { value: "50242004062", text: "50242004062" },
        // { value: "55150011720", text: "55150011720" },
      ],
    };
  },
  props: {
    data: { type: Array, required: true },
    dataAllRecordTypes: { type: Array, required: true },
  },
  watch: {
    datatable_content(newData) {
      if (this.datatable) {
        this.datatable.clear();
        this.datatable.rows.add(newData);
        this.datatable.draw();
      }
      if (this.datatable_purchase_receipts) {
        this.datatable_purchase_receipts.clear();
        this.datatable_purchase_receipts.rows.add(newData);
        this.datatable_purchase_receipts.draw();
      }
    },
    data(newData) {
      this.getOptionsFilled();
      if (this.datatable) {
        this.datatable.clear();
        this.datatable.rows.add(newData);
        this.datatable.draw();
      }
      if (this.datatable_purchase_receipts) {
        this.datatable_purchase_receipts.clear();
        this.datatable_purchase_receipts.rows.add(newData);
        this.datatable_purchase_receipts.draw();
      }
    },
    modalShown(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showPurchaseReceiptDatatable();
        }, 100);
      }
    },
  },
  mounted() {
    this.datatable_content = this.data;
    this.getOptionsFilled();
    console.log("data on datatable received:", this.data);
    this.datatable = new DataTable(`#datatableComp`, {
      responsive: true,
      data: this.datatable_content,
      columnDefs: [
        { targets: [0, 2], width: "1rem" },
        { targets: [7], width: "0.8rem" },
      ],
      columns: [
        {
          data: "shipment_date",
          title: "Shipment date",
        },
        {
          data: "transaction_id",
          title: "Transaction ID",
        },
        {
          data: "delivery_number",
          title: "Lot/Serial number",
        },
        { data: "sender_info", title: "Sender" },
        { data: "address_vendor", title: "From location" },
        { data: "recipient_info", title: "Receiver" },
        { data: "ship_to_location", title: "To location" },
        {
          data: "delivery_number",
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
      order: [[1, "desc"]],
    });

    const self = this;
    $("#datatableComp").on("click", ".option-btn", function () {
      // Get the data associated with the row
      const rowData = self.datatable.row($(this).closest("tr")).data();
      // Open the modal
      self.$refs["modal_lot_details"].show();
      self.modalShown = true;
      // Pass the row data to the modal component
      // console.log(rowData);
      self.$data.lot_view_details = rowData;
      self.datatable_row_content = [];
      self.datatable_row_content.push(rowData);
      console.log("self. datatable_row_content:", self.datatable_row_content);
    });
  },
  methods: {
    hasValue(array, value) {
      return array.some((obj) => obj.value === value);
    },
    getOptionsFilled() {
      try {
        console.log("Entra");
        let temp_data = this.data;
        let subsidiary_arr = [{ value: "All", text: "All" }];
        let transactionId_arr = [{ value: "All", text: "All" }];
        let lot_serial_arr = [{ value: "All", text: "All" }];
        let sender_arr = [{ value: "All", text: "All" }];
        let location_arr = [{ value: "All", text: "All" }];
        let ndc_arr = [{ value: "All", text: "All" }];

        temp_data.forEach((element) => {
          if (
            element.subsidiary !== "" &&
            this.hasValue(subsidiary_arr, element.subsidiary) === false
          ) {
            subsidiary_arr.push({
              value: element.subsidiary,
              text: element.subsidiary,
            });
          }
          if (
            element.tranid_createdfrom !== "" &&
            element.tranid_createdfrom &&
            this.hasValue(transactionId_arr, element.tranid_createdfrom) ===
              false
          ) {
            transactionId_arr.push({
              value: element.tranid_createdfrom,
              text: element.tranid_createdfrom,
            });
          }
          if (
            element.inventorynumber_inventorydetail !== "" &&
            element.inventorynumber_inventorydetail &&
            this.hasValue(
              lot_serial_arr,
              element.inventorynumber_inventorydetail
            ) === false
          ) {
            lot_serial_arr.push({
              value: element.inventorynumber_inventorydetail,
              text: element.inventorynumber_inventorydetail,
            });
          }
          if (
            element.entity !== "" &&
            element.entity &&
            this.hasValue(sender_arr, element.entity) === false
          ) {
            sender_arr.push({
              value: element.entity,
              text: element.entity,
            });
          }
          if (
            element.location !== "" &&
            element.location &&
            this.hasValue(location_arr, element.location) === false
          ) {
            location_arr.push({
              value: element.location,
              text: element.location,
            });
          }
          if (
            element.item !== "" &&
            element.item &&
            this.hasValue(ndc_arr, element.item) === false
          ) {
            ndc_arr.push({
              value: element.item,
              text: element.item,
            });
          }
        });
        this.optionsSubsidiary = subsidiary_arr;
        this.options_transactionID = transactionId_arr;
        this.options_lot_number = lot_serial_arr;
        this.options_Sender = sender_arr;
        this.options_location = location_arr;
        this.options_NDC = ndc_arr;
        this.$store.commit("setLot_serial_numbers", lot_serial_arr);
        this.$store.commit("setItems_ndc", ndc_arr);
      } catch (err) {
        console.error("Error occurred in getOptionsFilled:", err);
      }
    },
    showModal() {
      this.$refs["modal_lot_details"].show();
    },
    hideModal() {
      this.modalShown = false;
      this.toggleCollapse = false;
    },
    toggleFilters() {
      this.toggleCollapseFilters = !this.toggleCollapseFilters;
    },
    showPurchaseReceiptDatatable() {
      // Modal datatable
      // const datatable_modal=$(self.$refs.modal_lot_details).find('#datatable_purchase_receipts');
      // console.log("found:",datatable_modal);
      this.datatable_purchase_receipts = new DataTable(
        `#datatable_purchase_receipts`,
        {
          responsive: true,
          data: this.datatable_row_content,
          searching: false,
          columns: [
            {
              data: "item",
              title: "Item NDC",
            },
            {
              data: "displayname_item",
              title: "Item Description",
            },
            {
              data: "delivery_number",
              title: "Lot/Serial number",
            },
            {
              data: "quantity",
              title: "Quantity",
            },
            {
              data: "unit",
              title: "Unit",
            },
            {
              data: "delivery_number",
              title: "Options",
              render: function () {
                return `
            <div class="d-flex justify-content-center">
            <div class="option-item-btn btn btn-light text-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="1.1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>              </div>

              </div>
            </div>
            `;
              },
            },
            // { data: "lot_expiry_date", title: "Lot Expiry Date" },
          ],
        }
      );
      const self = this;
      // click event for item details
      $("#datatable_purchase_receipts").on(
        "click",
        ".option-item-btn",
        function () {
          // Get the data associated with the row
          const rowData = self.datatable_purchase_receipts
            .row($(this).closest("tr"))
            .data();
          const item = rowData.item;
          const currentLot = rowData.inventorynumber_inventorydetail;
          self.toggleCollapse = !self.toggleCollapse;
          console.log("ROWDATA:", rowData);
          console.log("CURRENTLOT:", currentLot);
          console.log("ITEM:", item);
          // console.log(self.dataAllRecordTypes);
          const transactionInfo_of_current_item =
            self.dataAllRecordTypes.filter(
              (element) =>
                element.item === item &&
                element.inventorynumber_inventorydetail === currentLot
            );
          console.log(
            "Transaction information filtered:",
            transactionInfo_of_current_item
          );
          // Order dates in descending order
          transactionInfo_of_current_item.sort((a, b) => {
            const dateA = new Date(a.trandate);
            const dateB = new Date(b.trandate);
            console.log("DateA:", dateA);
            console.log("DateB:", dateB);
            return dateB - dateA;
          });

          let arr_item_history = [];
          transactionInfo_of_current_item.forEach((element) => {
            let obj_recordIs_itemReceipt = {
              recordType: "",
              subsidiary: "",
              location: "",
              vendor: "",
              trandate: "",
              quantity: "",
              address_vendor: "",
              destination_address: "",
              delivery_number: "",
            };
            let obj_recordIs_inventoryAdjustment = {
              subsidiary: "",
              location: "",
              recordType: "",
              trandate: "",
              quantity: "",
              address: "",
              delivery_number: "",
            };
            let obj_recordIs_itemFulfillment = {
              recordType: "",
              subsidiary: "",
              location: "",
              vendor: "",
              trandate: "",
              quantity: "",
              address: "",
              delivery_number: "",
            };
            // console.log(element);
            switch (element.recordtype) {
              case "itemreceipt":
                obj_recordIs_itemReceipt.recordType = element.recordtype;
                obj_recordIs_itemReceipt.trandate = element.trandate;
                obj_recordIs_itemReceipt.vendor = element.entity;
                obj_recordIs_itemReceipt.quantity = element.quantity;
                obj_recordIs_itemReceipt.address_vendor =
                  element.address_vendor;
                obj_recordIs_itemReceipt.destination_address =
                  element.formulatext;
                obj_recordIs_itemReceipt.delivery_number =
                  element.inventorynumber_inventorydetail;
                obj_recordIs_itemReceipt.subsidiary = element.subsidiary;
                obj_recordIs_itemReceipt.location = element.location;
                arr_item_history.push(obj_recordIs_itemReceipt);
                break;
              case "inventoryadjustment":
                obj_recordIs_inventoryAdjustment.recordType =
                  element.recordtype;
                obj_recordIs_inventoryAdjustment.subsidiary =
                  element.subsidiary;
                obj_recordIs_inventoryAdjustment.location = element.location;
                obj_recordIs_inventoryAdjustment.trandate = element.trandate;
                obj_recordIs_inventoryAdjustment.quantity = element.quantity;
                obj_recordIs_inventoryAdjustment.address = element.formulatext;
                obj_recordIs_inventoryAdjustment.delivery_number =
                  element.inventorynumber_inventorydetail;
                arr_item_history.push(obj_recordIs_inventoryAdjustment);
                break;
              case "itemfulfillment":
                obj_recordIs_itemFulfillment.recordType = element.recordtype;
                obj_recordIs_itemFulfillment.subsidiary = element.subsidiary;
                obj_recordIs_itemFulfillment.location = element.location;
                obj_recordIs_itemFulfillment.vendor = element.entity;
                obj_recordIs_itemFulfillment.trandate = element.trandate;
                obj_recordIs_itemFulfillment.quantity = element.quantity;
                obj_recordIs_itemFulfillment.address = element.formulatext;
                obj_recordIs_itemFulfillment.delivery_number =
                  element.inventorynumber_inventorydetail;
                arr_item_history.push(obj_recordIs_itemFulfillment);
                break;
            }
            console.log(arr_item_history);
          });
          self.datatable_allRecordTypes_perItem = arr_item_history;
        }
      );
    },
    filterDatatable() {
      this.datatable_content = this.data;
      const filtered = this.datatable_content.filter((item) => {
        const formattedDate_start = this.formatDate(this.selectedDate_start);
        // const formattedDate_end = this.formatDate(this.selectedDate_end);
        // const formattedDate_expiry = this.formatDate(this.selectedDate_expiry);
        return (
          (this.selectedSubsidiary === "" ||
            this.selectedSubsidiary === "All" ||
            item.subsidiary === this.selectedSubsidiary) &&
          (this.selectedLotNumber === "" ||
            this.selectedLotNumber === "All" ||
            item.delivery_number === this.selectedLotNumber) &&
          (this.selectedLocation === "" ||
            this.selectedLocation === "All" ||
            item.location === this.selectedLocation) &&
          (this.selectedTransactionID === "" ||
            this.selectedTransactionID === "All" ||
            item.tranid_createdfrom === this.selectedTransactionID) &&
          (this.selectedSender === "" ||
            this.selectedSender === "All" ||
            item.entity === this.selectedSender) &&
          (this.selectedNDC === "" ||
            this.selectedNDC === "All" ||
            item.item === this.selectedNDC) &&
          (formattedDate_start === null ||
            item.trandate === formattedDate_start)
          // &&
          // (formattedDate_end === null || item.end_date <= formattedDate_end) &&
          // (formattedDate_expiry === null ||
          //   item.lot_expiry_date === formattedDate_expiry)
        );
      });
      this.datatable_content = filtered;
      console.log("filtered: ", filtered);
    },
    formatDate(date) {
      if (date !== "" && date !== null) {
        const parts = date.split("-");
        const year = parts[0];
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
      } else {
        return null;
      }
    },
  },
};
</script>