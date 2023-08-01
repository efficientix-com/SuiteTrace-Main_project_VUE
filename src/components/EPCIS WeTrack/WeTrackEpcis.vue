<template>
    <div id="module-component">
      <MenuComp></MenuComp>
      <div class="card">
        <h3 class="blue-text">EPCIS Master Sandbox</h3>
        <small
          >1. Pasar un archivo XML EPCIS y hacer validaciones en Netsuite</small
        >
        <hr />
        <input type="file" @change="uploadFile" />
      </div>
      <FooterFreebugComponent />
    </div>
  </template>
        <script>
  import MenuComp from "@/template/Navbar/MenuComponent.vue";
  import FooterFreebugComponent from "@/template/Commons/FooterFreebug.vue";
  import axios from "axios";
  
  export default {
    name: "WeTrackEpcis",
    components: { MenuComp, FooterFreebugComponent },
  
    data: function () {
      return {
        fileContent: "",
        startTime:0
      };
    },
    created(){
      this.startTime=new Date();
    },
    mounted() {
    //   const endTime=new Date();
    //   const loadingTime=endTime-this.startTime;
    //   const loadingTimeSeconds=loadingTime/1000;
    //   console.log("LOADING TIME: ",loadingTime);
    //   console.log("LOADING TIME Seconds: ",loadingTimeSeconds);
    },
    methods: {
      getPageLoadTime() {
        console.log("Inicio")
        let start = performance.now();
        window.addEventListener("unload", function () {
          console.log("LOADING TIME: ",this.performance.now()-start)
        });
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        console.log("Selected file:", file);
        // Send file to Netsuite. Note: Netsuite validates the extension and file content against schema.
        this.sendFile(file);
      },
      async uploadFile(event) {
        try {
          // Se obtiene el archivo del input
          const file = event.target.files[0];
          var reader = new FileReader();
          // Esencial especificar este this para poder setear la variable con el contenido del documento en string
          var vm = this;
          // Se usa promise para que una vez leído el documento, se pueda acceder a la variable con el then()
          var promise = new Promise(function (resolve, reject) {
            reader.onload = function (event) {
              vm.fileContent = event.target.result;
              resolve(event.target.result);
            };
            reader.onerror = function (event) {
              reject(event);
            };
          });
          // Indicación de leer archivo como texto
          reader.readAsText(file);
          promise.then(function (fileContent) {
            console.log("Contenido archivo2: ", fileContent);
            // Se define para poder usar una función en VUE después de realizar el POST
            let self = vm;
            console.log("self val:", self);
            let script = "";
            script += "var https=null;";
            script += "require(['N/https'],function(https){";
            // Especificación de tratar el body como XML
            script += " var headerObj={'Content-Type':'application/xml'};";
            script += "var response=https.post({";
            script +=
              "url:'https://7076975-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2591&deploy=1&compid=7076975_SB1&h=749c277a496ff54f2eeb',";
            // Se dejan esas comillas porque hay saltos de linea en el documento y no las detecta con comillas normales
            script += "body:`" + fileContent + "`,";
            script += "headers:headerObj";
            script += "});";
            // Funcion VUE que maneja la respuesta de Netsuite después de un POST
            script += "self.getResponse(response);";
            script += "});";
            eval(script);
          });
        } catch (err) {
          console.log("An error occured:", err);
        }
      },
      getResponse(msg) {
        console.log("Received this from NS:", msg);
      },
      getConfigAxios() {
        const t = {
          method: "POST",
          url: "https://7076975-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2591&deploy=1&compid=7076975_SB1&h=749c277a496ff54f2eeb",
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
            console.log("RESPONSE FROM VALIDATE XML: ", b.data);
          })
          .catch((err) => {
            console.log("Hubo errores: ", err);
          });
      },
    },
  };
  </script>