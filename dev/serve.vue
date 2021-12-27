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
        progress__bubble: {
          borderRadius: "10%",
        },
      },
      colorData: {
        progress__bubble: {
          active: {
            color: "#fff",
            backgroundColor: "#e74c3c",
            borderColor: "#e74c3c",
          },
          inactive: {
            color: "#fff",
            backgroundColor: "#34495e",
            borderColor: "#34495e",
          },
          completed: {
            color: "#fff",
            borderColor: "#27ae60",
            backgroundColor: "#27ae60",
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
      :active-step="3"
      :reactivity-type="'single-step'"
      :is-reactive="true"
      :styles="styleData"
      :colors="colorData"
    />
  </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  font-family: "Poppins", sans-serif;
}
</style>