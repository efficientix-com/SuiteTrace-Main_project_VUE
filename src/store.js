import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        lot_serial_numbers:[{}],
        items_ndc:[{}]
      },
      mutations: {
        setLot_serial_numbers(state,data){
            state.lot_serial_numbers=data
        },
        setItems_ndc(state,data){
            state.items_ndc=data
        }
      }
    
    });

export default store;