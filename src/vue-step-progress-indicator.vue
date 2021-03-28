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
          clickable: isReactive,
        }"
      >
        {{ index + 1 }}
      </div>
      <span
        @click="callPageChange(index)"
        v-bind:class="{
          'progress__label-completed': index <= currentStep,
          'progress__label-active': isActive(index),
          clickable: isReactive,
        }"
        v-if="showLabel"
        class="progress__label"
        >{{ step }}</span
      >
      <div
        v-if="
          (showBridge || showBridgeOnSmallDevice) && index != steps.length - 1
        "
        v-bind:class="{
          'progress__bridge-completed': index < currentStep,
          'hide-on-large': !showBridge,
          'display-on-small': showBridgeOnSmallDevice,
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
    showBridgeOnSmallDevice: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      currentStep: this.activeStep,
    };
  },

  methods: {
    callPageChange: function (step) {
      if (this.isReactive) {
        this.currentStep = step;
        this.$emit("onStepChange", step);
        if (step == this.steps.length - 1) this.$emit("onStepCompleted", step);
      }
    },
    isActive: function (index) {
      return index === this.currentStep;
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
}
.progress__bridge {
  display: inline-block;
  background: grey;
  height: 2px;
  flex-grow: 1;
  width: 20px;
}
.progress__bubble {
  display: inline-block;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background: transparent;
  border: 5px grey solid;
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
  border-color: red;
  background: red;
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
