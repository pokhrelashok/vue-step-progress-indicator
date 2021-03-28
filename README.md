# Vue Step Progress Indicator

This is a simple, very customizable step progress indicator, which can be used to indicate available steps in situations where the user has to fill
a multi step form.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Vue Step Progress Indicator.

```bash
npm install --save vue-step-progress-indicator
```

## Usage

### Installation

Import the component, register the component and you are good to go!

```js
import VueStepProgressIndicator from "vue-step-progress-indicator";

// register as component
components: {
    VueStepProgressIndicator,
},
```

### Using component

```js
<vue-step-progress-indicator
    :steps="[
        'Add invites',
        'Set Up',
        'Select Template',
        'Send Invitations',
        'Done',
    ]"
    :active-step="0"
    :is-reactive="true"
    @onStepChanged="onStepChanged"
    @onEnterFinalStep="onEnterFinalStep"
/>


```

### Props

| Name                         | Type    | Usage                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| steps                        | Array   | Indicates a list of labels to be displayed for each step                                                                                                                                                                                                                                                                                                                             |
| active-step                  | Number  | Indicates the currently active step                                                                                                                                                                                                                                                                                                                                                  |
| is-reactive                  | Boolean | If true, the progress bubbles will be clickable, and events will be emitted on user click                                                                                                                                                                                                                                                                                            |
| reactivity-type              | String  | If is-reactive is true, this can be used to define which step indicators the user can click. Values that can be passed are: all, backward, forward, single-step. All will make all the indicators clickable, backward will be only clicking previous steps possible, forward will make only forward buttons clickable, single-step will make one step backward and forward clickable |
| show-label                   | Boolean | If true, labels will be displayed                                                                                                                                                                                                                                                                                                                                                    |
| show-bridge                  | Boolean | If true, the bridges will be displayed (bridges will be displayed on small devices, irrespective of this)                                                                                                                                                                                                                                                                            |
| show-bridge-on-small-devices | Boolean | If false, the bridges will be hidden even on smaller devices                                                                                                                                                                                                                                                                                                                         |

### Events

| Name             | Usage                                                       |
| ---------------- | ----------------------------------------------------------- |
| onStepChanged    | Fired if is-reactive is true, and user clicks on some step  |
| onEnterFinalStep | Fired if is-reactive is true, and user is on the final step |

### Customization

Since customization can vary hugely for each use case, i thought it would be too much hassle to pass colors, width and height as props.
Instead overwriting the style in the parent component would be way simpler. Just make sure to use
`css !important`
on every style you want to overwrite.
Here is a complete set of css classes used in the project

```css
.progress__wrapper {
}
.progress__block {
}
.progress__bridge {
}
.progress__bubble {
}
.progress__label {
}
.progress__bubble-completed {
}
.progress__bubble-active {
}
.progress__label-completed {
}
.progress__label-active {
}
.progress__bridge-completed {
}
```

The style also include one simple media query to hide labels on smaller devices. Labels are hidden and bridges are shown on smaller devices by default. You can change the
behaviour by using above listed props, or by changing the styles.

```css
@media (max-width: 768px) {
}
```

### Screenshots

![On Large Device](./assets/device-lg.png?raw=true)
![On Small Device](./assets/device-sm.png?raw=true)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
