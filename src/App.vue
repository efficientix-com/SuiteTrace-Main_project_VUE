<template>
  <div id="app">
    <router-view>
      <LotTrace/>
    </router-view>
  </div>
</template>

<script>
import LotTrace from './components/Lot Trace/LotTrace.vue';
import axios from "axios";

export default {
  name: "App",
  components: {LotTrace},
  methods: {
    getUserInformation(){
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
            params:{action:"getUserInfo"}
          });
          self.getSearchResponse(url)
        });
        `;
        eval(str);
      } catch (error) {
        console.error('getUserInformation Error', error);
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
          const respuesta = b.data;
          console.log("RESP full search: ", respuesta);
          this.$store.commit("setUser_data", respuesta);
        })
        .catch((err) => {
          console.log("Hubo errores: ", err);
        });
    },
  },
  created(){
    this.getUserInformation();
  }
};
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
@import './assets/scss/Datatable.scss';
</style>
