<template>
  <div id="global">
    <!-- <MenuComp></MenuComp> -->
    <div class="topNavBarC">
      <TopNavBar />
    </div>
    <div class="sideNavBarC">
      <SideNavBar />
    </div>
    <div class="moduleComponent">
      <div class="card">
        <h1 class="blue-text text-left">
          <font-awesome-icon icon="fa-solid fa-file" size="1x" /> SuiteTrace |
          EPCIS Uploads
        </h1>
        <small class="text-left"
          >Displays SuiteTrace reports from EPCIS file receptions</small
        >
        <DataTableReportsVue :data="datos_datatable" />
      </div>
      <FooterFreebugComponent />
    </div>
  </div>
</template>
<script>
import SideNavBar from "@/template/SideNavBar.vue";
import TopNavBar from "@/template/TopNavBar.vue";
import FooterFreebugComponent from "@/template/Commons/FooterFreebug.vue";
// import { data_test_reports_3 } from "./data_test_reports_3";
import axios from "axios";

import DataTableReportsVue from "./DataTableReports.vue";
export default {
  name: "SuiteTraceReports",
  components: {
    FooterFreebugComponent: FooterFreebugComponent,
    SideNavBar: SideNavBar,
    TopNavBar: TopNavBar,
    DataTableReportsVue: DataTableReportsVue,
  },
  data: function () {
    return {
      datos_datatable: null,
    };
  },
  mounted() {
    // this.datos_datatable = data_test_reports_3();
    this.getTrackSearch();
  },
  methods: {
    getTrackSearch() {
      try {
        let self = this;
        console.log("getTrackSearch -self:", self);
        let str = `
        var urlMode=null;
      
        require(['N/url'],function(urlMode){
          var url=urlMode.resolveScript({
            scriptId:'customscript_tkio_wetrackntrace_serv_sl',
            deploymentId:"customdeploy_tkio_wetrackntrace_serv_sl",
            returnExternalUrl:false,
            params:{getTrackSearch:true}
          });
          self.getSearchResponse(url)
        });
        `;
        eval(str);
      } catch (err) {
        console.error("An error occurred in getTrackSearch:", err);
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
          this.datos_datatable=b.data;
          // this.obj_data=b.data;
          // this.filterObjData();
          // console.log("OBJ_DATA:", this.obj_data);
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
    },
  },
};
</script>