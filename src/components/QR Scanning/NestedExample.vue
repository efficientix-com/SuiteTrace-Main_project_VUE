<template>
  <div class="row">
    <div class="col-12">
      <small style="margin-bottom: 20px !important;">Drag and drop for packaging hierarchy</small>
      <b-row style="margin-top:20px !important">
        <b-col>
            <nestedDraggable :tasks="this.$store.state.lists" />

        </b-col>
      </b-row>
    </div>

    <!-- <RawDisplayer class="col-3" :value="this.$store.state.lists" title="List" /> -->
  </div>
</template>
  
  <script>
import nestedDraggable from "./Nested.vue";
// import RawDisplayer from "./RawDisplayer.vue";
export default {
  name: "nested-example",
  display: "Nested",
  order: 15,
  components: {
    nestedDraggable,
    // RawDisplayer
  },
  data() {
    return {
      list: [
        {
          name: "task 1",
          tasks: [
            {
              name: "task 2",
              tasks: [],
            },
          ],
        },
        {
          name: "task 3",
          tasks: [
            {
              name: "task 4",
              tasks: [],
            },
          ],
        },
        {
          name: "task 5",
          tasks: [],
        },
      ],
    };
  },
};
</script>
  <style scoped></style>