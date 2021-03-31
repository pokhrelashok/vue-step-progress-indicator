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
| styles                       | Object  | Provide custom style for various UI components                                                                                                                                                                                                                                                                                                                                       |
| colors                       | Object  | Provide colrs for various UI components                                                                                                                                                                                                                                                                                                                                              |

### Events

| Name             | Usage                                                       |
| ---------------- | ----------------------------------------------------------- |
| onStepChanged    | Fired if is-reactive is true, and user clicks on some step  |
| onEnterFinalStep | Fired if is-reactive is true, and user is on the final step |

### Customization

This package has been created by taking your customization needs in mind. You can not only provide colors for components for different states (active, inactive and completed), you can do custom styling for each component in the UI. Here is an example.

```js
// this is the default style being used in the package
// set this as data in the parent component
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
}

// use above data as prop
<vue-step-progress-indicator
    :styles="styleData"
/>
```

You may also want to customize the colors of components. The progress bubbles can have one of three states, `active`, `inactive` & `completed`. You can set `color`, `backgroundColor`, `borderColor` for each component. You can pass colors for each component as:

```js
// this is the default colors being used in the package
// set this as data in the parent component
colorData: {
    progress__bubble: {
        active: {
            color: "#fff",
            backgroundColor: "red",
            borderColor: "red",
        },
        inactive: {
            color: "black",
        },
        completed: {
            color: "#fff",
            borderColor: "#1e7e34",
            backgroundColor: "#1e7e34",
        },
    },
    progress__label: {
        active: {
            color: "red",
        },
        inactive: {
            color: "black",
        },
        completed: {
            color: "#1e7e34",
        },
    },
    progress__bridge: {
        active: {
            backgroundColor: "black",
            borderColor: "black",
        },
        inactive: {
            backgroundColor: "black",
            borderColor: "black",
        },
        completed: {
            backgroundColor: "#1e7e34",
            borderColor: "#1e7e34",
        },
    },
},

// use above data as prop
<vue-step-progress-indicator
    :colors="colorData"
/>

```

### Screenshots

On large devices, the labels are shown and the bridges are hidden by default.<br/>

![On Large Device](https://i.imgur.com/9vxaPPh.png)

<br/>On smaller devices, the labels are hidden and the bridges are shown by default.

![On Small Device](https://i.imgur.com/HSV70kS.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
