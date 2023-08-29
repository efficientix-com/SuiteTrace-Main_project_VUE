<template>
    <div class="nested-list">
      <h3>{{ title }}</h3>
      <draggable v-model="cards2" group="kanban">
        <div v-for="(card, index) in cards" :key="index" class="card">{{ card.title }}</div>
      </draggable>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  
  export default {
    name:'NestedList',
    components: {
      draggable,
    },
    props: ['title', 'cards'],
    data:function(){
        return{
            cards2:this.cards
        }
    }
  };
  </script>
  
  <style>
  /* Styles for nested list */
  </style>
  