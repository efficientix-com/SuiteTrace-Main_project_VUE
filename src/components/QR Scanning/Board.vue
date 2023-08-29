<template>
  <div class="board">
    <List
      v-for="(list, index) in lists"
      :key="index"
      :title="list.title"
      :cards="list.cards"
      @card-moved="handleCardMoved"
    />
  </div>
</template>
  
  <script>
import List from "./List.vue";
import { mapState } from "vuex";
export default {
  name: "BoardComponent",
  components: {
    List,
  },
  computed:{
    ...mapState({
        lists:'lists'
    })
  },
  methods: {
    handleCardMoved(sourceListTitle, card, oldIndex, newIndex) {
      const sourceList = this.lists.find(
        (list) => list.title === sourceListTitle
      );

      if (sourceList) {
        // Remove the card from the source list
        sourceList.cards.splice(oldIndex, 1);

        // Determine the target list index
        const targetListIndex =
          newIndex >= this.lists.length ? this.lists.length - 1 : newIndex;

        // Add the card to the target list
        this.lists[targetListIndex].cards.splice(newIndex, 0, card);
      }
    },
    //     handleCardMoved(sourceListIndex, { card, oldIndex, newIndex }) {
    //       // Remove the card from the source list
    //       this.lists[sourceListIndex].cards.splice(oldIndex, 1);

    //       // Determine the target list index
    //       const targetListIndex = newIndex >= this.lists.length ? this.lists.length - 1 : newIndex;

    //       // Add the card to the target list
    //       this.lists[targetListIndex].cards.splice(newIndex, 0, card);
    //     },
  },
  data() {
    return {
    //   lists: [
    //     { title: "No Case", cards: [{ title: "holi" }, { title: "hol2" }] },
    //     { title: "GTIN: 121546", cards: [{ title: "ahhh" }] },
    //     { title: "GTIN: 25487945465", cards: [{ title: "ehhhhh" }] },
    //     { title: "GTIN: 47895566", cards: [{ title: "lalalalaa" }] },
    //   ],
    };
  },
};
</script>
  
  <style>
.board {
  display: flex;
}
</style>
  