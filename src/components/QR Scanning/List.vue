<template>
  <div class="list">
    <h4>{{ title }}</h4>
    <draggable
      v-model="cards2"
      class="card-list"
      group="kanban"
      @end="handleCardDragEnd"
    >
      <Card v-for="card in cards2" :key="card.id" :card="card" />
    </draggable>
    <div v-if="showNestedList">
      <NestedList :title="nestedListTitle" :cards="nestedListCards" />
    </div>
  </div>
</template>
  
  <script>
import draggable from "vuedraggable";
import Card from "./Card.vue";
import NestedList from './NestedList.vue';


export default {
  name: "ListComponent",
  components: {
    draggable,
    Card,
    NestedList
  },
  props: ["title", "cards"],
  data: function () {
    return {
      cards2: this.cards,
      showNestedList: false,
      nestedListTitle: 'Nested List',
      nestedListCards: [{ title: 'Nested Task 1' }, { title: 'Nested Task 2' }],
    };
  },
  methods: {
    handleCardDragEnd(event) {
      const card = event.item;
      const newIndex = event.newIndex;
      const oldIndex = event.oldIndex;

      // Emit event to parent board component
      this.$emit('card-moved', this.title, card, oldIndex, newIndex);
    // this.cards2.splice(newIndex, 0, this.cards2.splice(oldIndex, 1)[0]);

    },
    
  },
};
</script>
  
  <style>
.list {
  background-color: #e0e0e0;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
}

.card-list {
  min-height: 50px;
}
</style>
  