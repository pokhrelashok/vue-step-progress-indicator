<template>
  <div class="progress__wrapper">
    <span
      v-for="(step, index) in steps"
      :key="'step_' + step"
      class="progress__block"
      ><div
        @click="callPageChange(index)"
        class="progress__bubble"
        v-bind:class="{
          'progress__bubble-completed': index <= currentStep,
          'progress__bubble-active': isActive(index),
          clickable: isReactive && checkIfStepIsReactive(index),
        }"
      >
        {{ index + 1 }}
      </div>
      <span
        @click="callPageChange(index)"
        v-bind:class="{
          'progress__label-completed': index <= currentStep,
          'progress__label-active': isActive(index),
          clickable: isReactive && checkIfStepIsReactive(index),
        }"
        v-if="showLabel"
        class="progress__label"
        >{{ step }}</span
      >
      <div
        v-if="
          (showBridge || showBridgeOnSmallDevices) && index != steps.length - 1
        "
        v-bind:class="{
          'progress__bridge-completed': index < currentStep,
          'hide-on-large': !showBridge,
          'display-on-small': showBridgeOnSmallDevices,
        }"
        class="progress__bridge"
      ></div>
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
    isReactive: {
      type: Boolean,
      required: false,
      default: false,
    },
    reactivityType: {
      type: String,
      required: false,
      default: "all",
      validator: (propValue) => {
        const types = ["all", "backward", "forward", "single-step"];
        return types.includes(propValue);
      },
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: true,
    },
    showBridge: {
      type: Boolean,
      required: false,
      default: false,
    },
    showBridgeOnSmallDevices: {
      type: Boolean,
      required: false,
      default: true,
    },
    showBridgeOnSmallDevices: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      currentStep: this.activeStep < this.steps.length ? this.activeStep : 0,
    };
  },

  methods: {
    callPageChange: function (step) {
      if (!this.isReactive) return;
      if (!this.checkIfStepIsReactive(step)) return;
      this.currentStep = step;
      this.$emit("onStepChanged", step);
      if (step == this.steps.length - 1) this.$emit("onEnterFinalStep", step);
    },
    isActive: function (index) {
      return index === this.currentStep;
    },
    checkIfStepIsReactive: function (index) {
      switch (this.reactivityType) {
        case "all":
          return true;
        case "backward":
          return index < this.currentStep;
        case "forward":
          return index > this.currentStep;
        case "single-step":
          return index == this.currentStep - 1 || index == this.currentStep + 1;
        default:
          return false;
      }
    },
  },
  watch: {
    activeStep: function (newVal) {
      if (this.activeStep < this.steps.length) this.currentStep = newVal;
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
  margin: 1rem 0;
}
.clickable {
  cursor: pointer;
}
.progress__block {
  display: flex;
  align-items: center;
}
.progress__bridge {
  display: inline-block;
  background: grey;
  height: 2px;
  flex-grow: 1;
  width: 20px;
}
.progress__bubble {
  margin: 0;
  padding: 0;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background: transparent;
  border: 2px grey solid;
  text-align: center;
}
.progress__label {
  margin: 0 0.8rem;
}
.progress__bubble-completed {
  border-color: #1e7e34;
  background: #1e7e34;
  color: white;
}
.progress__bubble-active {
  border-color: #1e7e34;
  background: #1e7e34;
  color: white;
}
.progress__label-completed {
  color: #1e7e34;
}
.progress__label-active {
  color: #1e7e34;
}
.progress__bridge-completed {
  background: #1e7e34;
}
.hide-on-large {
  display: none;
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
  .progress__block:not(:last-of-type) {
    flex-grow: 1;
    margin-right: 0;
  }
  .display-on-small {
    display: block;
  }
  .progress__block {
    margin: 0;
  }
}
</style>
