<template>
  <div
    :class="this.$store.state.toggleSideBar === true ? 'collapsed' : 'hide_bar'"
  >
    <b-row>
      <b-col
        class="d-flex justify-content-center align-items-center mt-4"
        md="12"
        sm="12"
      >
        <b-img
          class="align-items-center"
          width="70px"
          height="70px"
          :src="this.$store.state.user_data.image_url"
          rounded="circle"
          alt="Circle image"
        ></b-img>
      </b-col>
      <b-col class="d-flex justify-content-center mt-2" md="12" sm="12">
        <h4 class="userName mb-0">{{this.$store.state.user_data.user_name}}</h4>
      </b-col>
      <b-col class="d-flex justify-content-center py-0 my-0" md="12" sm="12">
        <p class="userRole">{{this.$store.state.user_data.role}}</p>
      </b-col>
    </b-row>
    <b-row
      @mouseover="toggleSubMenu(item)"
      @mouseleave="toggleSubMenuLeave(item)"
      class="mb-2"
      v-for="item in menuItemsAr"
      v-bind:key="item.id"
    >
      <a :href="item.path">
        <b-col md="12" class="menuItem d-flex align-items-center py-2">
          <span class="mx-3"
            ><font-awesome-icon :icon="item.icon" size="1x" /></span
          ><span>{{ item.title }}</span>
        </b-col>
      </a>
      <div v-if="item.hasChildren === true && item.toggled === true">
        <ul
          class="menuSubItem py-2"
          style="list-style-type: none"
          v-for="subItem in item.children"
          v-bind:key="subItem.id"
        >
          <a :href="subItem.path">
            <li>
              <span class="mx-3"
                ><font-awesome-icon :icon="subItem.icon" size="1x" /></span
              ><span>{{ subItem.subtitle }}</span>
            </li>
          </a>
        </ul>
      </div>
    </b-row>
    <!-- <p style="color:black !important;" v-for="item in menuItemsAr" v-bind:key="item.id">
        {{ item.title }}
    </p> -->
  </div>
</template>
<script>
import menuItems from "./menuItems";

export default {
  name: "SideNavBar",
  data: function () {
    return {
      isToggle: null,
      menuItemsAr: [],
      
    };
  },
  mounted() {
    this.isToggle = this.$store.state.toggleSideBar;
    console.log("val of store:", this.$store.state.toggleSideBar);
    this.menuItemsAr = menuItems();
    console.log(this.menuItemsAr);
  },
  methods: {
    toggleSubMenu(item) {
      item.toggled = true;
    },
    toggleSubMenuLeave(item) {
      item.toggled = false;
    },
  },
};
</script>