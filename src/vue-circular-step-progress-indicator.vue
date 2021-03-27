<template>
  <div class="row ml-1">
    <div class="mb-4 progress-holder">
      <span v-for="(step, index) in steps" :key="'step_' + step"
        ><div
          :class="
            'progress-bubble ' + (index == activeStep ? 'active-step' : '')
          "
        >
          {{ index + 1 }}
        </div>
        <span class="progress-label ml-1 mr-4">{{ step }}</span></span
      >
    </div>
  </div>
</template>


<script>
export default {
  name: "ProgressBar",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    activeStep: {
      type: Number,
      required: true,
    },
  },
};
</script>



<style scoped>
.ml-1 {
  margin-left: 0.25rem !important;
}
.mr-4 {
  margin-right: 1.5rem !important;
}
.mb-4 {
  margin-bottom: 1.5rem !important;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.progress-holder {
  line-height: 30px;
}
.progress-bubble {
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background: transparent;
  border: 1px grey solid;
  text-align: center;
}
.active-step {
  border: 1px solid #1e7e34;
}
</style>
