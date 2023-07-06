<template>
  <div id="app">
    <router-view>
      <LotTrace/>
    </router-view>
  </div>
</template>

<script>
import LotTrace from './components/Lot Trace/LotTrace.vue';

export default {
  name: "App",
  components: {LotTrace},
};
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
@import './assets/scss/Datatable.scss';
</style>
