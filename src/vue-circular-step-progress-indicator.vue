<template>
  <div class="progress__wrapper">
    <span
      @click="callPageChange(index)"
      v-for="(step, index) in steps"
      :key="'step_' + step"
      class="progress__block"
      v-bind:class="{
        clickable: isClickable,
      }"
      ><div
        class="progress__bubble"
        v-bind:class="{
          'progress__active-bubble': index == currentStep,
        }"
      >
        {{ index + 1 }}
      </div>
      <span v-if="showLabel" class="progress__label">{{ step }}</span>
      <div v-if="index != steps.length - 1" class="progress__bridge"></div>
    </span>
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
    isClickable: {
      type: Boolean,
      required: false,
      default: false,
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      currentStep: this.activeStep,
    };
  },

  methods: {
    callPageChange: function (page) {
      if (this.isClickable) {
        this.currentStep = page;
        this.$emit("onPageChanged", page);
      }
    },
  },
};
</script>



<style scoped>
.progress__wrapper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  display: flex;
  justify-content: flex-start;
  line-height: 30px;
  margin-top: 1rem;
}
.clickable {
  cursor: pointer;
}
.progress__block {
  display: flex;
  align-items: center;
  /* margin-right: 1rem; */
}
.progress__bridge {
  display: inline-block;
  background: red;
  height: 2px;
  flex-grow: 1;
  width: 20px;
  /* width: 100%; */
}
.progress__bubble {
  /* margin-right: 0.5rem; */
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background: transparent;
  border: 5px grey solid;
  text-align: center;
}
.progress__active-bubble {
  border-color: #1e7e34;
}

@media (max-width: 768px) {
  .progress__wrapper {
    justify-content: space-around;
  }
  .progress__label {
    display: none;
  }
  .progress__bubble {
    margin: 0;
  }
  .progress__block {
    flex-grow: 1;
    margin-right: 0;
  }
  .progress__block {
    margin: 0;
  }
}
</style>
