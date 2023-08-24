<template>
  <div>
    <b-navbar toggleable="sm">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand class="pl-1">
        <img height="65px" src="https://7076975-sb1.app.netsuite.com/core/media/media.nl?id=44579&c=7076975_SB1&h=kSm8fxd41gQWxjE9osFgVK9OuF3OhXxBPI-tmF96sAXI4LFy" alt="Logo healix">
      </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-button class="btn_removeBKColor" @click="handleToggleSideBar"><font-awesome-icon icon="fa-solid fa-bars" size="1x" /></b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "TopNavBar",
  components: {},
  data:function(){
    return{
    }
  },
  methods:{
    handleToggleSideBar(){
        this.$store.commit("setToggleSideBar", !this.$store.state.toggleSideBar);

    }
  }
};
</script>