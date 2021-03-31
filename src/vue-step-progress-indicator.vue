<template>
  <div class="progress__wrapper" :style="styleData['progress__wrapper']">
    <span
      v-for="(step, index) in steps"
      :key="'step_' + step"
      class="progress__block"
      :style="styleData['progress__block']"
      ><div
        @click="callPageChange(index)"
        class="progress__bubble"
        :style="{
          ...styleData['progress__bubble'],
          ...getColors('progress__bubble', index),
        }"
        v-bind:class="{
          clickable: isReactive && checkIfStepIsReactive(index),
        }"
      >
        {{ index + 1 }}
      </div>
      <span
        @click="callPageChange(index)"
        :style="{
          ...styleData['progress__label'],
          ...getColors('progress__label', index),
        }"
        v-bind:class="{
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
          'hide-on-large': !showBridge,
          'display-on-small': showBridgeOnSmallDevices,
        }"
        :style="{
          ...styleData['progress__bridge'],
          ...getColors('progress__bridge', index),
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
    colors: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
    styles: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },

  data() {
    return {
      currentStep: this.activeStep < this.steps.length ? this.activeStep : 0,
      styleData: {
        progress__wrapper: {
          display: "-ms-flexbox",
          display: "flex",
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "flex-start",
          margin: "1rem 0",
        },
        progress__block: {
          display: "flex",
          alignItems: "center",
        },
        progress__bridge: {
          backgroundColor: "grey",
          height: "2px",
          flexGrow: "1",
          width: "20px",
        },
        progress__bubble: {
          margin: "0",
          padding: "0",
          lineHeight: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30px",
          width: "30px",
          borderRadius: "100%",
          backgroundColor: "transparent",
          border: "2px grey solid",
          textAlign: "center",
        },
        progress__label: {
          margin: "0 0.8rem",
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
        progress__label: {
          active: {
            color: "#e74c3c",
          },
          inactive: {
            color: "#34495e",
          },
          completed: {
            color: "#27ae60",
          },
        },
        progress__bridge: {
          active: {
            backgroundColor: "#e74c3c",
          },
          inactive: {
            backgroundColor: "#34495e",
          },
          completed: {
            backgroundColor: "#27ae60",
          },
        },
      },
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
    getColors: function (className, index) {
      let styles = {};
      if (index < this.currentStep) {
        styles["color"] = this.colorData[className]["completed"]["color"];
        styles["backgroundColor"] = this.inactiveColor
          ? this.inactiveColor
          : this.colorData[className]["completed"]["backgroundColor"];
        styles["borderColor"] = this.colorData[className]["completed"][
          "borderColor"
        ];
      } else if (index == this.currentStep) {
        styles["color"] = this.colorData[className]["active"]["color"];
        styles["backgroundColor"] = this.colorData[className]["active"][
          "backgroundColor"
        ];
        styles["borderColor"] = this.colorData[className]["active"][
          "borderColor"
        ];
      } else {
        styles["color"] = this.colorData[className]["inactive"]["color"];
        styles["backgroundColor"] = this.colorData[className]["inactive"][
          "backgroundColor"
        ];
        styles["borderColor"] = this.colorData[className]["inactive"][
          "borderColor"
        ];
      }
      return styles;
    },
    overwriteStyle: function (style1, style2) {
      for (const property in style1) {
        if (Object.hasOwnProperty.call(style1, property)) {
          const element = style1[property];
          for (const value in element) {
            if (Object.hasOwnProperty.call(element, value)) {
              style2[property][value] = element[value];
            }
          }
        }
      }
      return style2;
    },
  },
  watch: {
    activeStep: function (newVal) {
      if (this.activeStep < this.steps.length) this.currentStep = newVal;
    },
  },

  mounted() {
    this.styleData = this.overwriteStyle(this.styles, this.styleData);
    this.colorData = this.overwriteStyle(this.colors, this.colorData);
  },
};
</script>



<style scoped>
.clickable {
  cursor: pointer;
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
    display: inline-block;
  }
  .progress__block {
    margin: 0;
  }
}
</style>
