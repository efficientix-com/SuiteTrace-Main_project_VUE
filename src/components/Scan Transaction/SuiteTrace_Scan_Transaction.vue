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
                <h2 class="blue-text">Scan Items From Purchase Order {{tranid}}</h2>
                <div class="btn btn--green-1" >Create Receipt</div>
                <h4>Code</h4>
                <input v-model="barcode" placeholder="Scan barcode" style="width: 20%">
                <table class="table mt-3 px-2" id="datatable_purchase_receipts">
                    <thead>
                        <tr>
                            <th>NDC</th>
                            <th>Description</th>
                            <th>UOM</th>
                            <th>PO quantity</th>
                            <th>Scanned quantity</th>
                            <th>Missing</th>
                        </tr>
                    </thead>
                    <tr v-for="line_data in obj_data" :key="line_data.item">
                        <td>{{ line_data.item_ndc }}</td>
                        <td>{{ line_data.item_name }}</td>
                        <td>{{ line_data.unit }}</td>
                        <td>{{ line_data.quantityuom }}</td>
                        <td>0</td>
                        <td>{{ line_data.quantityuom }}</td>
                    </tr>
                </table>
                <!-- <p v-if="idTransaction">El id de la transaccion es: {{ idTransaction }}</p>
                <p v-else>No se tiene id de transaccion</p> -->
            </div>
            <FooterFreebug />
        </div>
  </div>
</template>

<script>
import FooterFreebug from '@/template/Commons/FooterFreebug.vue';
import SideNavBar from '@/template/SideNavBar.vue';
import TopNavBar from '@/template/TopNavBar.vue';
import axios from "axios";
export default {
    name: 'SuiteTrace_scan',
    components: {FooterFreebug, SideNavBar, TopNavBar},
    data: ()=>({
        idTransaction: '',
        tranid: '',
        barcode: '',
        // obj_data: [{
        //     item: '10693',
        //     item_name: 'TEZEPELUMAB-EKKO (TEZSPIRE) 210MG/1.91ML SYR 1EA',
        //     item_ndc: "55513011201",
        //     quantityuom: '2'
        // }]
        obj_data: []
    }),
    mounted (){
        let paramsUrl = this.$route.query;
        this.searchTransaction(paramsUrl);
    },
    methods: {
        searchTransaction (paramsUrl){
            try {
                console.log('Params', paramsUrl);
                if (paramsUrl.transaction) {
                    this.idTransaction = paramsUrl.transaction;
                    this.getSearchData();
                }else{
                    throw '"transaction" not found in url'
                }
            } catch (error) {
                console.error('searchTransaction', error);
            }
        },
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
                        params:{action:"searchTransaction", transaction: self.idTransaction}
                    });
                    self.getSearchResponse(url)
                    });
                `;
                console.log('AfterRequest');
                eval(str);
                console.log('AfterEval');
            } catch (err) {
                console.error("getSearchData", err);
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
                .request(t).then((b) => {
                    console.log("RESP full search: ", b.data);
                    this.obj_data=b.data;
                    console.log("OBJ_DATA:", this.obj_data);
                    this.tranid=b.data[0].tranid;
                    console.log('tranid:', this.tranid);
                }).catch((err) => {
                    console.log("Hubo errores: ", err);
                });
        },
    }
}
</script>