//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "ProgressBar",
  props: {
    steps: {
      type: Array,
      required: true
    },
    activeStep: {
      type: Number,
      required: true
    },
    isReactive: {
      type: Boolean,
      required: false,
      default: false
    },
    reactivityType: {
      type: String,
      required: false,
      default: "all",
      validator: propValue => {
        const types = ["all", "backward", "forward", "single-step"];
        return types.includes(propValue);
      }
    },
    showLabel: {
      type: Boolean,
      required: false,
      default: true
    },
    showBridge: {
      type: Boolean,
      required: false,
      default: false
    },
    showBridgeOnSmallDevices: {
      type: Boolean,
      required: false,
      default: true
    },
    colors: {
      type: Object,
      required: false,
      default: function () {
        return {};
      }
    },
    styles: {
      type: Object,
      required: false,
      default: function () {
        return {};
      }
    }
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
          margin: "1rem 0"
        },
        progress__block: {
          display: "flex",
          alignItems: "center"
        },
        progress__bridge: {
          backgroundColor: "grey",
          height: "2px",
          flexGrow: "1",
          width: "20px"
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
          textAlign: "center"
        },
        progress__label: {
          margin: "0 0.8rem"
        }
      },
      colorData: {
        progress__bubble: {
          active: {
            color: "#fff",
            backgroundColor: "#e74c3c",
            borderColor: "#e74c3c"
          },
          inactive: {
            color: "#fff",
            backgroundColor: "#34495e",
            borderColor: "#34495e"
          },
          completed: {
            color: "#fff",
            borderColor: "#27ae60",
            backgroundColor: "#27ae60"
          }
        },
        progress__label: {
          active: {
            color: "#e74c3c"
          },
          inactive: {
            color: "#34495e"
          },
          completed: {
            color: "#27ae60"
          }
        },
        progress__bridge: {
          active: {
            backgroundColor: "#e74c3c"
          },
          inactive: {
            backgroundColor: "#34495e"
          },
          completed: {
            backgroundColor: "#27ae60"
          }
        }
      }
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
        styles["backgroundColor"] = this.inactiveColor ? this.inactiveColor : this.colorData[className]["completed"]["backgroundColor"];
        styles["borderColor"] = this.colorData[className]["completed"]["borderColor"];
      } else if (index == this.currentStep) {
        styles["color"] = this.colorData[className]["active"]["color"];
        styles["backgroundColor"] = this.colorData[className]["active"]["backgroundColor"];
        styles["borderColor"] = this.colorData[className]["active"]["borderColor"];
      } else {
        styles["color"] = this.colorData[className]["inactive"]["color"];
        styles["backgroundColor"] = this.colorData[className]["inactive"]["backgroundColor"];
        styles["borderColor"] = this.colorData[className]["inactive"]["borderColor"];
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
    }
  },
  watch: {
    activeStep: function (newVal) {
      if (this.activeStep < this.steps.length) this.currentStep = newVal;
    }
  },

  mounted() {
    this.styleData = this.overwriteStyle(this.styles, this.styleData);
    this.colorData = this.overwriteStyle(this.colors, this.colorData);
  }

};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "progress__wrapper",
    style: _vm.styleData['progress__wrapper']
  }, _vm._l(_vm.steps, function (step, index) {
    return _c('span', {
      key: 'step_' + step,
      staticClass: "progress__block",
      style: _vm.styleData['progress__block']
    }, [_c('div', {
      staticClass: "progress__bubble",
      class: {
        clickable: _vm.isReactive && _vm.checkIfStepIsReactive(index)
      },
      style: Object.assign({}, _vm.styleData['progress__bubble'], _vm.getColors('progress__bubble', index)),
      on: {
        "click": function ($event) {
          return _vm.callPageChange(index);
        }
      }
    }, [_vm._v("\n      " + _vm._s(index + 1) + "\n    ")]), _vm._v(" "), _vm.showLabel ? _c('span', {
      staticClass: "progress__label",
      class: {
        clickable: _vm.isReactive && _vm.checkIfStepIsReactive(index)
      },
      style: Object.assign({}, _vm.styleData['progress__label'], _vm.getColors('progress__label', index)),
      on: {
        "click": function ($event) {
          return _vm.callPageChange(index);
        }
      }
    }, [_vm._v(_vm._s(step))]) : _vm._e(), _vm._v(" "), (_vm.showBridge || _vm.showBridgeOnSmallDevices) && index != _vm.steps.length - 1 ? _c('div', {
      staticClass: "progress__bridge",
      class: {
        'hide-on-large': !_vm.showBridge,
        'display-on-small': _vm.showBridgeOnSmallDevices
      },
      style: Object.assign({}, _vm.styleData['progress__bridge'], _vm.getColors('progress__bridge', index))
    }) : _vm._e()]);
  }), 0);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-b50ced38_0", {
    source: ".clickable[data-v-b50ced38]{cursor:pointer}.hide-on-large[data-v-b50ced38]{display:none}@media (max-width:768px){.progress__wrapper[data-v-b50ced38]{justify-content:space-around}.progress__label[data-v-b50ced38]{display:none}.progress__bubble[data-v-b50ced38]{margin:0}.progress__block[data-v-b50ced38]:not(:last-of-type){flex-grow:1;margin-right:0}.display-on-small[data-v-b50ced38]{display:inline-block}.progress__block[data-v-b50ced38]{margin:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-b50ced38";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = Vue => {
    Vue.component("VueStepProgressIndicator", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export default entry_esm;
