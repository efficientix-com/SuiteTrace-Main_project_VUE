
<script>
export default {
  props: ["item", "collapsed"],
  data() {
    return {
      item1: this.item,
      collapsed1: this.collapsed,
      subMenuOpen: false,
    };
  },
  //   const props = defineProps(["item", "collapsed"]);
};
</script>



<template>
  <a
    class="subMenuOpen"
    
    @mouseover="subMenuOpen = true"
    @mouseleave="subMenuOpen = false"
  >
    <div class="menuItemHeader" v-if="item1.displayHeader">
      <span v-if="!this.collapsed">{{ item1.header }}</span>
    </div>
    <a :href="item1.path" v-if="item1.hasChildren == false">
    <div class="item">
      <div class="icon mx-1">
        <font-awesome-icon :icon="['fa-solid', item1.icon]" size="1x" />
      </div>
      <div class="title" v-if="!this.collapsed">
         {{
          item1.title
        }}
        <a v-if="item1.hasChildren == true">{{ item1.title }}</a>
      </div>
    </div>
  </a>
    <div v-if="!this.collapsed && subMenuOpen">
      <div class="subtitle" v-for="child in item1.children" :key="child.id">
        <a :href="child.path">{{ child.name }}</a>
      </div>
    </div>
  </a>
</template>
<style scoped>
a{
  text-decoration: none !important;
  color: white !important;
}
.subMenuOpen {
  color: white !important;
  text-decoration: none !important;
  display: block;
  position: relative;
  border-radius: 3px;
  cursor: pointer;
}
.subMenuOpen:hover {
  border-color: white;
  background-color: rgb(59, 59, 59);
}
.subMenuOpen:hover .item .title a {
  color: whitesmoke;
}
.subtitle {
  padding-bottom: 10px;
  font-size: 16px;
}
.subtitle a {
  text-decoration: none;
  color: #009f6d;
}
.subtitle a:hover {
  color: #1a1a1a;
}
.menuItemHeader {
  margin-left: 0px;
}
.item {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-left: 5px;
  padding-right: 5px;
  gap: 2px;
  margin-bottom: 10px;
  font-size: 16px;
}
.item .icon {
  margin-left: 20px;
  display: flex;
  justify-content: center;
}
.collapsed .item .icon {
  margin: auto;
  display: flex;
  justify-content: center;
}
.title a {
  text-decoration: none;
  color: white;
}
</style>