import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lot_serial_numbers: [{}],
    items_ndc: [{}],
    toggleSideBar: true,

    user_data: {
      user_name: 'John Doe',
      role: 'Administrator',
      image_url: 'https://firebasestorage.googleapis.com/v0/b/bloona-55051.appspot.com/o/alexander-hipp-iEEBWgY_6lA-unsplash.jpg?alt=media&token=00f5cae5-004a-49e6-a3bb-bda977ee0121'
    },
    lists:[]
    // lists: [
    //   {
    //     name: "task 1",
    //     gtin: '',
    //     item:'',
    //     serialNumber: '',
    //     tasks: [
    //       {
    //         name: "task 2",
    //         gtin: '',
    //         item:'',
    //         serialNumber: '',
    //         tasks: [],
    //       },
    //     ],
    //   },
    //   {
    //     name: "task 3",
    //     gtin: '',
    //     item:'',
    //     serialNumber: '',
    //     tasks: [
    //       {
    //         name: "task 4",
    //         gtin: '',
    //         item:'',
    //         serialNumber: '',
    //         tasks: [],
    //       },
    //     ],
    //   },
    //   {
    //     name: "task 5",
    //     gtin:'',
    //     item:'',
    //     serialNumber:'',
    //     tasks: [],
    //   },
    // ]
  },
  mutations: {
    setLot_serial_numbers(state, data) {
      state.lot_serial_numbers = data
    },
    setItems_ndc(state, data) {
      state.items_ndc = data
    },
    setToggleSideBar(state, data) {
      state.toggleSideBar = data
    },
    setUser_data(state, data) {
      state.user_data = data
    },
    setLists(state, data) {
      state.lists = data
    }
  }

});

export default store;