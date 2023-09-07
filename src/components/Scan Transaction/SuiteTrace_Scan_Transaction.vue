<template>
  <div id="global">
    <div class="topNavBarC">
            <TopNavBar />
        </div>
        <div class="sideNavBarC">
            <SideNavBar />
        </div>
        <div class="moduleComponent">
            <div class="card" v-if="obj_data.length>0">
                <h2 class="blue-text">Scan Items From Purchase Order {{tranid}}</h2>
                <div class="controls">
                    <b-button type="button" class="btn btn--continue" @click="CreateReceipt()">Create Receipt</b-button>
                    <b-button type="button" class="btn btn--backpo" @click="BackToPO()">Back to PO</b-button>
                </div>
                <h4 class="messageError">{{ error }}</h4>
                <div class="groupLine">
                    <h4 style="width: 9%;">BarCode:</h4>
                    <input v-model="barcode_prev" placeholder="Scan item" style="width: 20%" v-on:keyup.enter="ValidateNDC()" ref="ref_barcode">
                    <h4 style="width: 8%; padding-left: 30px;" v-if="barcode">Lot:</h4>
                    <input v-model="scanLot_prev" placeholder="Scan lot" style="width: 20%" v-on:keyup.enter="AddLot()" ref="ref_lot" v-if="barcode">
                    <h4 style="width: 12%; padding-left: 30px;" v-if="scanLot && barcode">Quantity:</h4>
                    <input type="number" v-model="scanquantity" placeholder="Enter quantity" style="width: 20%" v-on:keyup.enter="AddQuantity()" ref="ref_qua" v-if="scanLot && barcode">
                </div>
                <table class="table mt-3 px-2" id="datatable_purchase_receipts">
                    <thead>
                        <tr>
                            <th>NDC</th>
                            <th>Description</th>
                            <th>UOM</th>
                            <th>PO quantity</th>
                            <th>Lot</th>
                            <th>Scanned quantity</th>
                            <th>Missing</th>
                            <th>Clean</th>
                        </tr>
                    </thead>
                    <tr v-for="line_data in obj_data" :key="line_data.item">
                        <td>{{ line_data.item_ndc }}</td>
                        <td>{{ line_data.item_name }}</td>
                        <td>{{ line_data.unit }}</td>
                        <td>{{ line_data.quantityuom }}</td>
                        <td v-html="line_data.lot"></td>
                        <td v-html="line_data.scanned_quantity"></td>
                        <td>{{ line_data.missing }}</td>
                        <td>
                            <div class="d-flex justify-content-center" v-if=" line_data.scanned_quantity!=0 ">
                                <div class="option-item-btn btn btn-light text-center" @click="CleanLine(line_data)">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="card" v-else>
                <h2 v-if="loadingData == true">Loading data...</h2>
                <h2 class="noLoadPage" v-else>No transaction to load was detected, please try again</h2>
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
        loadingData: true,
        barcode: '',
        barcode_prev: '',
        error: '',
        scanLot: '',
        scanLot_prev: '',
        scanquantity: '',
        indexItemfound: '',
        obj_data: [
            {
                item: '10693',
                item_name: 'Splash',
                item_ndc: "750101135068",
                quantityuom: '2',
                unit: 'Syringe',
                missing: '2',
                scanned_quantity: '0',
                lot: ''
            },
            {
                item: '10694',
                item_name: 'Lechuga',
                item_ndc: "7502246460226",
                quantityuom: '3',
                unit: 'Syringe',
                missing: '3',
                scanned_quantity: '0',
                lot: ''
            }
        ]
        // obj_data: []
    }),
    mounted (){
        let paramsUrl = this.$route.query;
        this.searchTransaction(paramsUrl);
        if(this.obj_data.length>0){
            this.$refs.ref_barcode.focus();
        }
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
                    if (this.obj_data) {
                        this.tranid=b.data[0].tranid;
                        console.log('tranid:', this.tranid);
                    }
                    this.loadingData = false;
                }).catch((err) => {
                    console.log("Hubo errores: ", err);
                });
        },
        ValidateNDC(){
            try {
                if (this.barcode_prev) {
                    this.barcode = this.barcode_prev;
                    let foundItem = this.obj_data.find((element) => element.item_ndc == this.barcode);
                    if (foundItem) {
                        let indexObj = this.obj_data.findIndex((element) => element.item_ndc == this.barcode);
                        console.log('Se encontro item en po line: ' + indexObj, foundItem);
                        console.log('condicion ', this.obj_data[indexObj]);
                        this.indexItemfound = indexObj;
                        if (0 < ((this.obj_data[indexObj].missing)*1)) {
                            setTimeout(() => {
                                this.$refs.ref_lot.focus();
                            }, 1000);
                        }else{
                            this.barcode = '';
                            this.barcode_prev='';
                            this.error = 'You cannot capture more than the quantity in the Purchase Order, expected: ' + this.obj_data[this.indexItemfound].missing;
                            setTimeout(() => {
                                this.error = '';
                            }, 3000);
                        }
                    }else{
                        this.barcode = '';
                        this.barcode_prev='';
                        this.error = 'Item not found in the Purchase Order';
                        setTimeout(() => {
                            this.error = '';
                        }, 3000);
                    }
                }else{
                    this.error = 'Please scan an item value';
                    setTimeout(() => {
                        this.error = '';
                    }, 3000);
                }
                this.scanLot = '';
                this.scanLot_prev='';
                this.scanquantity = '';
            } catch (error) {
                console.error('ValidateNDC ', error);
            }
        },
        AddLot(){
            try {
                if (this.scanLot_prev) {
                    this.scanLot = this.scanLot_prev;
                    if (this.obj_data[this.indexItemfound].lot) {
                        this.obj_data[this.indexItemfound].lot = this.obj_data[this.indexItemfound].lot +'<br/>'+ this.scanLot;
                    }else{
                        this.obj_data[this.indexItemfound].lot = this.scanLot;
                    }
                    setTimeout(() => {
                        this.$refs.ref_qua.focus();
                    }, 1000);
                }else{
                    this.error= 'Please enter a lot value'
                }
            } catch (error) {
                console.error('addLot', error);
            }
        },
        AddQuantity(){
            try {
                if (this.scanquantity <= (this.obj_data[this.indexItemfound].missing)*1) {
                    let missingItems = ((this.obj_data[this.indexItemfound].missing)*1) - this.scanquantity;
                    
                    this.obj_data[this.indexItemfound].missing = missingItems;

                    if (this.obj_data[this.indexItemfound].lot) {
                        if (this.obj_data[this.indexItemfound].scanned_quantity != '0') {
                            this.obj_data[this.indexItemfound].scanned_quantity = this.obj_data[this.indexItemfound].scanned_quantity +'<br/>'+ this.scanquantity;
                        }else{
                            let scanquantity = ((this.obj_data[this.indexItemfound].scanned_quantity)*1) + (this.scanquantity*1);
                            this.obj_data[this.indexItemfound].scanned_quantity = scanquantity;
                        }
                    }else{
                        let scanquantity = ((this.obj_data[this.indexItemfound].scanned_quantity)*1) + (this.scanquantity*1);
                        this.obj_data[this.indexItemfound].scanned_quantity = scanquantity;
                    }

                    this.barcode ='';
                    this.barcode_prev = '';
                    this.scanquantity = '';
                    this.scanLot = '';
                    this.scanLot_prev='';
                    this.indexItemfound ='';
                    this.error = '';
                    this.$refs.ref_barcode.focus();
                }else{
                    this.error = 'You cannot capture more than the quantity in the Purchase Order, expected: ' + this.obj_data[this.indexItemfound].missing;
                }
            } catch (error) {
                console.error('AddQuantity', error);
            }
        },
        CleanLine(lineData){
            try {
                console.log('A limpiar: ', lineData);
                let indexObj = this.obj_data.findIndex((element) => element.item_ndc == lineData.item_ndc);
                console.log('indexObj: ' + indexObj);
                this.obj_data[indexObj].lot = '';
                this.obj_data[indexObj].missing = this.obj_data[indexObj].quantityuom;
                this.obj_data[indexObj].scanned_quantity = 0;
                this.barcode ='';
                this.barcode_prev = '';
                this.scanquantity = '';
                this.scanLot = '';
                this.scanLot_prev='';
                this.indexItemfound ='';
                this.error = '';
                this.$refs.ref_barcode.focus();
            } catch (error) {
                console.error('CleanLine', error);
            }
        },
        CreateReceipt(){
            try {
                console.log('Datos send: ', this.obj_data);
            } catch (error) {
                console.error('CreateReceipt', error);
            }
        },
        BackToPO(){
            try {
                console.log('transaction to send: ' + this.idTransaction);
                let self = this;
                console.log("getSearchData -self:", self);
                let str = `
                    var urlMode=null;
                
                    require(['N/url'],function(urlMode){
                        var protocol = 'https://'
                        var domain = urlMode.resolveDomain({
                            hostType: urlMode.HostType.APPLICATION
                        });
                        var url=urlMode.resolveRecord({
                            recordType: 'purchaseorder',
                            recordId: self.idTransaction
                        });
                        var completeUrl = protocol+domain+url;
                        self.getPoURL(completeUrl)
                    });
                `;
                console.log('AfterRequest');
                eval(str);
                console.log('AfterEval');
            } catch (error) {
                console.error('BackToPO', error);
            }
        },
        getPoURL(e){
            try {
                console.log('url: ' + e);
                window.location.href= e;
            } catch (error) {
                console.error('getPoUrl', error);
            }
        }
    }
}
</script>