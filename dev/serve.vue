<script>
import Vue from "vue";
import VueCircularStepProgressIndicator from "@/vue-circular-step-progress-indicator.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueCircularStepProgressIndicator,
  },
  methods: {
    onPageChanged: function (page) {
      console.log(page);
    },
  },
});
</script>

<template>
  <div id="app">
    <vue-circular-step-progress-indicator
      :steps="[
        'Add invites',
        'Set Up',
        'Select Template',
        'Send Invitations',
        'Done',
      ]"
      :activeStep="0"
      :is-clickable="true"
      @onPageChanged="onPageChanged"
    />
  </div>
</template>
