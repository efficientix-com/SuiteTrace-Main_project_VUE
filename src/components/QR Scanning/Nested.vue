<template>
    <draggable class="dragArea" tag="ul" :list="tasks" :group="{ name: 'g1' }">
      <li v-for="el in tasks" :key="el.name">
        <p>{{ el.name }}</p>
        <NestedDraggable :tasks="el.tasks" />
      </li>
    </draggable>
  </template>
  <script>
  import draggable from "vuedraggable";
  
  export default {
    props: {
      tasks: {
        required: true,
        type: Array
      }
    },
    components: {
      draggable
    },
    name: "NestedDraggable"
  };
  </script>
  <style scoped>
  .dragArea {
    min-height: 50px;
    box-shadow: 0px 0.5px 1px 1px rgba(0, 0, 0, 0.1) !important;
    /* border: 0px !important; */
    transition: 0.3s !important;

    border-radius: 3px !important;
    border: 2px !important;
    border-color: red !important;
  }
  </style>