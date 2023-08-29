<template>
    <div class="modal-overlay shown z-indexFix" @click="closeDialog">
      <div :class="type=='error'?'modal-sm errorModal':'modal-sm'" @click.stop>
        <div class="p-2 pl-1 pr-1">
          <div class="rowM align-items-center align-middle w-100">
            <div class="column align-middle w-100">
              <div class="rowM mb-0 w-100 align-top">
                <div class="column mt-0">
                  
                  <font-awesome-icon
                    class="errorIcon align-top"
                    icon="fa-solid fa-circle-xmark"
                    size="2x"
                  />
                </div>
                <div class="column">
                  <h4 class="mt-1 mb-0 pl-1 text-center"><strong class="text-center">{{ title }}</strong></h4>
                  <h5 class="text-center mt-0 mb-0">{{message}}</h5>
                </div>
                <div class="column">
                  <div
                    class="iconClose cursor-pointer"
                    @click="closeDialog"
                  >
                    <svg
                      fill="#c4c4c4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path
                        d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "AlertDialog",
    props: {
      type: String,
      title:String,
      message:String
    },
    data() {
      return {};
    },
    methods:{
      closeDialog(){
          let changeClose=false;
          this.$emit("changeCloseVal",changeClose);
      }
    }
  };
  </script>