<script>
import Vue from "vue";
import VueCircularStepProgressIndicator from "@/vue-circular-step-progress-indicator.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueCircularStepProgressIndicator,
  },
});
</script>

<template>
  <div id="app">
    <vue-circular-step-progress-indicator
      :steps="['1', '2', '3', '4']"
      activeStep="0"
    />
  </div>
</template>
