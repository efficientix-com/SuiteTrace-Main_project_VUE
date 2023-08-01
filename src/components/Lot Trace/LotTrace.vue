<template>
  <div id="module-component">
    <MenuComp />
    <div class="card">
      <SpinnerVue v-show="isLoading===true"/>

        <h2 v-show="!isLoading" class="blue-text">We Track</h2>
        <p v-show="!isLoading" style="font-style: italic">View details per lot</p>
        <DataTableVue v-show="!isLoading"
          :data="obj_data"
          :dataAllRecordTypes="obj_data_allTypeRecords"
        />
    </div>
    <FooterFreebugVue />
  </div>
</template>
<script>
import FooterFreebugVue from "@/template/Commons/FooterFreebug.vue";
import MenuComp from "../../template/Navbar/MenuComponent.vue";
import DataTableVue from "./DataTable.vue";
import axios from "axios";
import { data_test } from "./data_test_trace";
import SpinnerVue from '@/template/Commons/Spinner.vue';

export default {
  name: "LotTraceComponent",
  components: { MenuComp, FooterFreebugVue, DataTableVue,SpinnerVue },
  created() {
    // this.isLoading=true;
    this.obj_data = data_test();
    this.filterObjData();

    this.getSearchData();
  },
  data: function () {
    return {
      obj_data_allTypeRecords: [],
      obj_data: [],
      isLoading:true
    };
  },
  methods: {
    getSearchData() {
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
            params:{getSearchTracing:true}
          });
          self.getSearchResponse(url)
        });
        `;
        eval(str);
      } catch (err) {
        console.error("An error occurred: ", err);
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
          this.obj_data=b.data;
          this.filterObjData();
          console.log("OBJ_DATA:", this.obj_data);
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
    },
    filterObjData() {
      try{
        let obj_newData = [];
      this.obj_data_allTypeRecords = this.obj_data;
      console.log("obj_data first entrance:",this.obj_data);
      this.obj_data.forEach((element) => {
        console.log("recordtype:",element.recordtype);
        if (element.recordtype === "itemreceipt") {
          let obj_aux = {};
          let obj_original = {};
          obj_aux.shipment_date = element.trandate || "-";
          obj_aux.transaction_id = element.tranid_createdfrom || "-";
          obj_aux.delivery_number =
            element.inventorynumber_inventorydetail || "-";
          obj_aux.sender_info =
            "SENDER ID MISSING <br>" + element.entity || "-";
          obj_aux.recipient_info =
            element.location + "<br>" + element.subsidiary || "-";
          obj_aux.ship_to_location = element.formulatext || "-";
          // remaining object
          obj_original = element;
          const concatenated = Object.assign({}, obj_aux, obj_original);
          console.log(concatenated);
          obj_newData.push(concatenated);
        }
      });
      this.obj_data = obj_newData;
      this.isLoading=false;
      }catch(err){
        console.error('Error occurred in filterObjData',err);
      }
     
    },
  },
};
</script>