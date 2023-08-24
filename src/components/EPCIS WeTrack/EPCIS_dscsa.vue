<template>
  <div id="global">
    <div class="topNavBarC">
      <TopNavBar />
    </div>
    <div class="sideNavBarC">
      <SideNavBar />
    </div>
    <div class="moduleComponent">
      <div class="card">
        <h2 class="blue-text">WeTrack 3T's</h2>
        <p style="font-style: italic">Get information per EPCIS Upload</p>
        <DataTable_EPCISVue :data="obj_data" />
      </div>
      <FooterFreebugVue />
    </div>
  </div>
</template>
<script>
import SideNavBar from "@/template/SideNavBar.vue";
import TopNavBar from "@/template/TopNavBar.vue";
import FooterFreebugVue from "@/template/Commons/FooterFreebug.vue";
import DataTable_EPCISVue from "./DataTable_EPCIS.vue";
// import { data_test_summary } from "./data_test_summary";
import axios from "axios";
export default {
  name: "EPCIS_dscsa",
  components: { SideNavBar, TopNavBar, FooterFreebugVue, DataTable_EPCISVue },
  data: function () {
    return {
      obj_data: [],
    };
  },
  mounted() {},
  created() {
    // this.obj_data = data_test_summary();
    this.getEPCISData();
  },
  methods: {
    getEPCISData() {
      try {
        let self = this;
        console.log("getEPCISData -self:", self);
        let str = `
        var urlMode=null;
      
        require(['N/url'],function(urlMode){
          var url=urlMode.resolveScript({
            scriptId:'customscript_tkio_wetrack_validatexml_sl',
            deploymentId:"customdeploy_tkio_wetrack_validatexml_sl",
            returnExternalUrl:false,
            params:{getEPCISUploads:true}
          });
          self.getSearchResponse(url)
        });
        `;
        eval(str);
      } catch (err) {
        console.error("An error occurred getEPCISData: ", err);
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
          this.obj_data = b.data;
          console.log("OBJ_DATA getEPCISData:", this.obj_data);
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
    },
  },
};
</script>