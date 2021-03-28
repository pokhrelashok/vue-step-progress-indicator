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
      :activeStep="0"
      :is-clickable="true"
    />
  </div>
</template>
