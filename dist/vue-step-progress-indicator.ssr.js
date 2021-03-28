'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
    isClickable: {
      type: Boolean,
      required: false,
      default: false
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
    showBridgeOnSmallDevice: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data: function data() {
    return {
      currentStep: this.activeStep
    };
  },
  methods: {
    callPageChange: function callPageChange(step) {
      if (this.isClickable) {
        this.currentStep = step;
        this.$emit("onStepChanged", step);
        if (step == this.steps.length - 1) this.$emit("onProgressCompleted", step);
      }
    },
    isActive: function isActive(index) {
      return index === this.currentStep;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "progress__wrapper"
  }, [_vm._ssrNode(_vm._ssrList(_vm.steps, function (step, index) {
    return "<span class=\"progress__block\" data-v-95109d56><div" + _vm._ssrClass("progress__bubble", {
      'progress__bubble-completed': index <= _vm.currentStep,
      'progress__bubble-active': _vm.isActive(index),
      clickable: _vm.isClickable
    }) + " data-v-95109d56>" + _vm._ssrEscape("\n      " + _vm._s(index + 1) + "\n    ") + "</div> " + (_vm.showLabel ? "<span" + _vm._ssrClass("progress__label", {
      'progress__label-completed': index <= _vm.currentStep,
      'progress__label-active': _vm.isActive(index),
      clickable: _vm.isClickable
    }) + " data-v-95109d56>" + _vm._ssrEscape(_vm._s(step)) + "</span>" : "<!---->") + " " + ((_vm.showBridge || _vm.showBridgeOnSmallDevice) && index != _vm.steps.length - 1 ? "<div" + _vm._ssrClass("progress__bridge", {
      'progress__bridge-completed': index < _vm.currentStep,
      'hide-on-large': !_vm.showBridge,
      'display-on-small': _vm.showBridgeOnSmallDevice
    }) + " data-v-95109d56></div>" : "<!---->") + "</span>";
  }))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-95109d56_0", {
    source: ".progress__wrapper[data-v-95109d56]{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;display:flex;justify-content:flex-start;line-height:30px;margin-top:1rem}.clickable[data-v-95109d56]{cursor:pointer}.progress__block[data-v-95109d56]{display:flex;align-items:center}.progress__bridge[data-v-95109d56]{display:inline-block;background:grey;height:2px;flex-grow:1;width:20px}.progress__bubble[data-v-95109d56]{display:inline-block;height:30px;width:30px;border-radius:100%;background:0 0;border:5px grey solid;text-align:center}.progress__label[data-v-95109d56]{margin:0 .8rem}.progress__bubble-completed[data-v-95109d56]{border-color:#1e7e34;background:#1e7e34;color:#fff}.progress__bubble-active[data-v-95109d56]{border-color:red;background:red;color:#fff}.progress__label-completed[data-v-95109d56]{color:#1e7e34}.progress__label-active[data-v-95109d56]{color:#1e7e34}.progress__bridge-completed[data-v-95109d56]{background:#1e7e34}.hide-on-large[data-v-95109d56]{display:none}@media (max-width:768px){.progress__wrapper[data-v-95109d56]{justify-content:space-around}.progress__label[data-v-95109d56]{display:none}.progress__bubble[data-v-95109d56]{margin:0}.progress__block[data-v-95109d56]:not(:last-of-type){flex-grow:1;margin-right:0}.display-on-small[data-v-95109d56]{display:block}.progress__block[data-v-95109d56]{margin:0}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-95109d56";
/* module identifier */

var __vue_module_identifier__ = "data-v-95109d56";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),

var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = __vue_component__; // Attach install function executed by Vue.use()

  installable.install = function (Vue) {
    Vue.component("VueStepProgressIndicator", installable);
  };

  return installable;
})(); // It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default': component});// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)

Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      exportName = _ref2[0],
      exported = _ref2[1];

  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;