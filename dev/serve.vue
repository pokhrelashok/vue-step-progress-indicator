<script>
import Vue from "vue";
import VueStepProgressIndicator from "@/vue-step-progress-indicator.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueStepProgressIndicator,
  },
  methods: {
    onPageChanged: function (page) {
      console.log(page);
    },
  },
  data() {
    return {
      styleData: {
        progress__wrapper: {
          margin: "10rem 0",
        },
        progress__bubble: {
          borderRadius: 0,
        },
      },
      colorData: {
        progress__bubble: {
          active: {
            color: "yello",
            backgroundColor: "red",
            borderColor: "red",
          },
          inactive: {
            color: "black",
          },
          completed: {
            color: "maroon",
            borderColor: "#1e7e34",
            backgroundColor: "#1e7e34",
          },
        },
      },
    };
  },
});
</script>

<template>
  <div id="app">
    <vue-step-progress-indicator
      :steps="[
        'Add invites',
        'Set Up',
        'Select Template',
        'Send Invitations',
        'Done',
      ]"
      :active-step="0"
      :reactivity-type="'single-step'"
      :is-reactive="true"
      :styles="styleData"
      :colors="colorData"
    />
  </div>
</template>
