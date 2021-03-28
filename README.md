# VueStep Progress Indicator

This is a simple, very customizable step progress indicator, which can be used to indicate available steps in situations where the user has to fill
a multi step form.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Vue Step Progress Indicator.

```bash
npm install --save vue-step-progress-indicator
```

## Usage

```js
import VueStepProgressIndicator from "vue-step-progress-indicator.vue";

// register as component
components: {
    VueStepProgressIndicator,
},
// use the component
<vue-step-progress-indicator
    :steps="[
    'Add invites',
    'Set Up',
    'Select Template',
    'Send Invitations',
    'Done',
    ]"
    :activeStep="0"
    :is-reactive="true"
    @onStepChange="onStepChange"
    @onStepCompleted="onStepCompleted"
    @on="onStepChanged"
/>

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
