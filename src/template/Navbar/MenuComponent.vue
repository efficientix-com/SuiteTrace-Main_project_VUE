<script setup>
import { ref } from "vue";
import menuItem from "./MenuItem";
import MenuItemComponent from "./MenuItemComponent.vue";

const collapsed = ref(false);
</script>
<template>
  <div :class="['menu', collapsed ? 'collapsed' : 'expanded']">
    <!-- <div class="header">
      <div class="menu-button" @click="collapsed = !collapsed">
        <font-awesome-icon icon="fa-solid fa-bars" size="1x" />
      </div>
    </div> -->

    <div class="profile" @click="collapsed = !collapsed">
      <!-- <font-awesome-icon icon="fa-solid fa-filter" size="1x" /> -->
      <img src="https://7076975-sb1.app.netsuite.com/core/media/media.nl?id=43847&c=7076975_SB1&h=9Ddyka_qeJTgG6wqER3v_099hRV0hKPPTqr9sAxRrW_Jp8aR" alt="Logo healix">
      <!-- <div class="profile-name" v-if="!collapsed">
        {{ menuItem.profile.name }}
      </div> -->
    </div>

    <div class="menu-items">
      <ul>
        <MenuItemComponent
          v-for="menuItemElement in menuItem.items"
          v-bind:key="menuItemElement.id"
          :item="menuItemElement"
          :collapsed="collapsed"
        />
      </ul>
    </div>
  </div>
</template>