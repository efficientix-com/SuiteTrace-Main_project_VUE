import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueRouter from 'vue-router'
import routes from './router';
import store from './store';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
  faUserSecret, faBars, faFire, faHomeUser, faScrewdriverWrench, faCircleExclamation, faGears, faUserGraduate, faTruckField, faRectangleXmark, faCircleChevronDown, faCircleXmark, faCircleCheck, faHome,
  faCartFlatbed,faQrcode, faEllipsisVertical,faX, faArrowRight, faFilter, faTruckFast, faCheck, faCaretRight, faFile, faVideoSlash, faCamera
} from '@fortawesome/free-solid-svg-icons'
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons'
/* add icons to the library */
library.add(faUserSecret)
library.add(faBars)
library.add(faFire)
library.add(faHomeUser)
library.add(faScrewdriverWrench)
library.add(faCircleExclamation)
library.add(faUserGraduate)
library.add(faGears)
library.add(faTruckField)
library.add(faRectangleXmark)
library.add(faCircleChevronDown)
library.add(faCircleXmark)
library.add(faCircleCheck)
library.add(faXmarkCircle)
library.add(faHome)
library.add(faCartFlatbed)
library.add(faQrcode)
library.add(faEllipsisVertical)
library.add(faX);
library.add(faArrowRight);
library.add(faFilter);
library.add(faTruckFast);
library.add(faCheck);
library.add(faCaretRight);
library.add(faFile);
library.add(faQrcode);
library.add(faVideoSlash);
library.add(faCamera);

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.config.productionTip = false
const router = new VueRouter({
  routes: routes
});

new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')
