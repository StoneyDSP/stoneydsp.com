<!--
  Copyright 2023 Comcast Cable Communications Management, LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  SPDX-License-Identifier: Apache-2.0
-->

# Lightning Component Vitest Utils

This utility has been created to assist with writing Vitest tests for applications utilizing [@lightningjs/sdk](https://www.npmjs.com/package/@lightningjs/sdk).

## Installation

Install from NPM:

```bash
npm install --save @lightningjs/ui-components-vitest-utils
```

`@lightningjs/ui-components-vitest-utils` has a peer dependency on the [Lightning SDK package](https://www.npmjs.com/package/@lightningjs/sdk).

```sh
npm install -S @lightningjs/sdk
```

---

## create

Generate a `testRenderer` object with built in utilities for unit testing Lightning Components.

`TestRenderer.create` generates a `testRenderer` object. The `testRenderer` includes various functions to assist with unit testing Lightning components. Those functions and their usages are documented below.

Rather than use `TestRenderer.create` directly, it is recommended to instead generate a `createComponent` function using the [makeCreateComponent](#makecreatecomponent) function that is also available from the `@lightning/ui-components-test-utils` package. `makeCreateComponent` allows for more reusability by returning a function that takes into account default options and configuration, as well as additional utilities (such as spyOnMethods). The documentation on this page will outline all the utilities that are available with a `testRenderer` object, either returned from `TestRenderer.create` or the second element in the array returned by `makeCreateComponent`.

## `create()` Arguments

`create(Component, options = {})`

| argument  | type                | default | description                                                                                            |
| --------- | ------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| Component | Lightning.Component | -       | component for which to create a test renderer object for                                               |
| options   | object              | {}      | configuration object for the Lightning Application created in test renderer, see further details below |

### options

The `options` argument is passed to a Lightning Application in `create` and accepts all Application configuration options (see [Lightning's documentation](https://lightningjs.io/docs/#/lightning-core-reference/RuntimeConfig/index?id=application-configuration-options) for further details). Below are all the properties that `create` has default values for.

| argument     | type                   | default   | description                                                                                 |
| ------------ | ---------------------- | --------- | ------------------------------------------------------------------------------------------- |
| focused      | boolean                | true      | determines whether or not the test component is rendered with focus                         |
| applicationW | number                 | 1920      | width of the Lightning Application that the test component is rendered within               |
| applicationH | number                 | 1080      | height of the Lightning Application that the test component is rendered within              |
| stage        | Lightning stage object | see below | stage object passed to the Lightning Application that the test component is rendered within |

**Default `stage` object:**

```js
const stage = {
  w: 1280,
  h: 720,
  precision: 2 / 3,
  fontSharp: {
    precision: 2 / 3,
    fontSize: 12
  },
  useImageWorker: false
};
```

#### Example: Creating a testRenderer to test a component

```js
import lng from '@lightningjs/core';
import { TestRenderer } from '@lightningjs/ui-components-test-utils';

it('should render the component with text', () => {
  const testRenderer = TestRenderer.create({
    Component: { type: TestComp }
  });
  const testCompInstance = testRenderer.getInstance();

  expect(testCompInstance.tag('TextElement').text.text).toBe('foo');
});
```

## `testRenderer` functions

For any examples on this page that do not define a new component, the following simple Lightning Component, and [Jest beforeEach function](https://jestjs.io/docs/api#beforeeachfn-timeout), will be referenced.

```js
// TestComp.js
import lng from '@lightningjs/core';

class TestComp extends lng.Component {
  static _template() {
    return {
      TextElement: {
        text: { text: 'foo' }
      }
    };
  }
}

// TestComp.test.js
import TestComp from './TestComp';
import { TestRenderer } from '@lightningjs/ui-components-test-utils';

let testRenderer, testCompInstance;
beforeEach(() => {
  testRenderer = TestRenderer.create({ Component: { type: TestComp } });
  testCompInstance = testRenderer.getInstance();
});
```

Alternatively, `makeCreateComponent` can be used, and is the recommended method:

```js
import { makeCreateComponent } from '@lightningjs/ui-components-test-utils';

const createTestComp = makeCreateComponent(TestComp);
let testCompInstance, testRenderer;
beforeEach(() => {
  [testCompInstance, testRenderer] = createTestComp();
});
```

---

### toJSON

`(children = 1) => toJSON(app.childList.first, { children })`

Invokes the `toJSON` TestRenderer function, defaulting the number of levels deep into the component's to generate JSON for to 1. This is generally used for generating JSON for [snapshot testing with Jest](https://jestjs.io/docs/snapshot-testing).

```js
it('should match the snapshot for the component', () => {
  const renderTree = testRenderer.toJSON();
  expect(renderTree).toMatchSnapshot();
});
```

### update

Invokes the `stage.drawFrame()` on the Lightning Application the test component is rendered in. This can be useful in cases where a value is transitioning and the render tree needs to be updated with a newer value.
See the documentation for the [fastForward](#fastforward) test util for an example utilizing this.

### forceAllUpdates

Forces all debounced updates to run immediately. All components from the `@lightningjs-ui-components` package (and any subclasses of them) debounce calls to `_update`. While this improves performance by reducing updates to the components, it can pose timing challenges in unit tests when writing assertions after all expected updates have completed. `forceAllUpdates` will force any queued updates to run immediately.

```js
import { Card } from '@lightningjs/ui-components';
import { makeCreateComponent } from '@lightningjs/ui-components-test-utils';

const createCardComponent = makeCreateComponent(Card);

it('sets the announce string to the card title', () => {
  [card, testRenderer] = createCardComponent();

  const title = 'Title';
  card.title = title;
  testRenderer.forceAllUpdates();

  expect(card.announce).toBe(title);
});
```

### focus

Invokes the `_focus` method on the component being tested. [See Lightning's documentation for more details on the `_focus` and `_unfocus` methods](https://lightningjs.io/docs/#/lightning-core-reference/HandlingInput/RemoteControl/Focus?id=using-the-focus-and-unfocus-methods).

### unfocus

Invokes the `_unfocus` method on the component being tested. [See Lightning's documentation for more details on the `_focus` and `_unfocus` methods](https://lightningjs.io/docs/#/lightning-core-reference/HandlingInput/RemoteControl/Focus?id=using-the-focus-and-unfocus-methods).

### getFocused

Returns the component which is currently focused in the test. [See Lightning's documentation for more details on focus in Lightning applications](https://lightningjs.io/docs/#/lightning-core-reference/HandlingInput/RemoteControl/Focus?id=focus).

#### Example: Unit testing focus

```js
class FocusExample extends lng.Component {
  static _template() {
    return {
      FocusText: {
        text: { text: 'unfocused' }
      }
    };
  }

  _focus() {
    this.tag('FocusText').text.text = 'focused';
  }

  _unfocus() {
    this.tag('FocusText').text.text = 'unfocused';
  }
}

const createFocusExample = makeCreateComponent(
  FocusExample,
  {},
  { focused: false }
);

it('should update the text when focused or unfocused', () => {
  const [focusExampleInstance, testRenderer] = createFocusExample();

  expect(focusExampleInstance.tag('FocusText').text.text).toBe('unfocused');
  expect(testRenderer.getFocused()).not.toBe(focusExampleInstance);

  testRenderer.focus();

  expect(focusExampleInstance.tag('FocusText').text.text).toBe('focused');
  expect(testRenderer.getFocused()).toBe(focusExampleInstance);

  testRenderer.unfocus();

  expect(focusExampleInstance.tag('FocusText').text.text).toBe('unfocused');
  expect(testRenderer.getFocused()).not.toBe(focusExampleInstance);
});
```

### getInstance

Returns an instance of the component being tested. If using a `createComponent` function generated from [makeCreateComponent](#makecreatecomponent), `testRenderer.getInstance()` is the first value in the returned array (the second value is the `testRenderer` object).

```js
import lng from '@lightningjs/core';
import { create } from '@lightningjs/ui-components-test-utils';

it('should render the component with text', () => {
  const testRenderer = TestRenderer.create({
    Component: { type: TestComp }
  });
  const testCompInstance = testRenderer.getInstance();

  expect(testCompInstance.tag('TextElement').text.text).toBe('foo');
});
```

### getApp

Returns the Lightning Application in which the test component is rendered.

```js
it('should render the component using the defined application dimensions', () => {
  const applicationW = 1280;
  const applicationH = 720;
  const createComponent = makeCreateComponent(
    TestComp,
    {},
    { applicationW, applicationH }
  );
  const [exampleInstance, testRenderer] = createComponent();

  expect(testRenderer.getApp()).toMatchObject({
    w: applicationW,
    h: applicationH
  });
});
```

### keyPress

```s
keyPress(key)
```

#### `keyPress(key)` Arguments

| name | type           | default | description               |
| ---- | -------------- | ------- | ------------------------- |
| key  | string\|object | -       | name of key to be pressed |

- the `key` string is expected to be capitalized (ex. `testRenderer.keyPress('Enter')`)
- if an object is passed to the key argument, it must at least contain a `key` field of which key should be pressed

### keyRelease

```js
keyRelease(key)
```

#### `keyRelease(key)` Arguments

| name | type           | default | description               |
| ---- | -------------- | ------- | ------------------------- |
| key  | string\|object | -       | name of key to be pressed |

- the `key` string is expected to be capitalized (ex. `testRenderer.keyPress('Enter')`)
- if an object is passed to the key argument, it must at least contain a `key` field of which key should be released

### Example: Unit Testing Key Handling

```js
class KeyPressExample extends lng.Component {
  static _template() {
    return {
      EnterPressTracker: {
        text: { text: 0 }
      },
      EnterReleaseTracker: {
        text: { text: 0 }
      }
    };
  }

  _handleEnter() {
    this.tag('EnterPressTracker').text.text++;
  }

  _handleEnterRelease() {
    this.tag('EnterReleaseTracker').text.text++;
  }
}

it('should display the number of times enter has been pressed and released', () => {
  const createComponent = makeCreateComponent(KeyPressExample);
  const [keyPressComponent, testRenderer] = createComponent();

  expect(keyPressComponent.tag('EnterPressTracker').text.text).toBe('0');
  expect(keyPressComponent.tag('EnterReleaseTracker').text.text).toBe('0');

  testRenderer.keyPress('Enter');

  expect(keyPressComponent.tag('EnterPressTracker').text.text).toBe('1');
  expect(keyPressComponent.tag('EnterReleaseTracker').text.text).toBe('0');

  testRenderer.keyRelease('Enter');

  expect(keyPressComponent.tag('EnterPressTracker').text.text).toBe('1');
  expect(keyPressComponent.tag('EnterReleaseTracker').text.text).toBe('1');
});
```

---

### makeCreateComponent

Returns a function, referred to as a `createComponent` function, which is used to generate an instance of a component to run unit test cases against.

```js
makeCreateComponent(component, defaultConfig, defaultOptions)
```

#### `makeCreateComponent(component, defaultConfig, defaultOptions)` Arguments

| argument       | type          | default   | description                                                                                                                |
| -------------- | ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| component      | lng.Component | undefined | component to render an instance of                                                                                         |
| defaultConfig  | object        | {}        | properties that should be applied to the component by default                                                              |
| defaultOptions | object        | {}        | default options used when creating the component instance (these options are passed to the `TestRenderer.create` function) |

---

### `createComponent`

Returns an array of 2 elements:

1. an instance of the component to be tested against (generated by `testRenderer.getInstance()`)
2. a [testRenderer](#testrenderer-functions) object generated using the `component` argument and a merged object created from `defaultOptions` and `options`

#### `createComponent()` Arguments

| argument | type   | default | description                                                                                                                                                                |
| -------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config   | object | {}      | properties that should be applied to the component. This object is spread over the `defaultConfig` object.                                                                 |
| options  | object | {}      | options used when creating the component instance (these options are passed to the `TestRenderer.create` function). This object is spread over the `defaultOptions` object |

##### Example: Generating a `makeComponent` function and test component

```js
import lng from '@lightningjs/core';
import { makeCreateComponent } from '@lightningjs/ui-components-test-utils';

// Lightning component to write unit tests for
class Example extends lng.Component {
  static _template() {
    return {
      Example: {
        text: { text: '' }
      }
    };
  }

  set exampleProp(value) {
    this._exampleProp = value;
    this.tag('Example').text.text = value;
  }

  get exampleProp() {
    return this._exampleProp;
  }
}

// unit tests for Example component

// generate a createComponent function to use in tests
const defaultConfig = { exampleProp: 'foo' };
const defaultOptions = { focused: false };
const createExampleComponent = makeCreateComponent(
  Example,
  defaultConfig,
  defaultOptions
);

// Ex. An instance of the component rendered with the properties defined in the defaultConfig and defaultOptions object
it('should render the exampleProp value as text', () => {
  const [example] = createExampleComponent();

  expect(example.exampleProp).toBe('foo');
  expect(example.tag('Example').text.text).toBe('foo');
  expect(example.hasFocus()).toBe(false);
});

// Ex. An instance of the component rendered with the properties defined in the config object
it('should support updating the text', () => {
  // overwrite the value of exampleProp defined in defaultConfig
  const [example] = createExampleComponent({
    exampleProp: 'bar'
  });

  expect(example.exampleProp).toBe('bar');
  expect(example.tag('Example').text.text).toBe('bar');
});

// Ex. An instance of the component rendered with options defined in the options object
it('should support rendering the component in a focused state', () => {
  // overwrite the value of focused defined in defaultOptions
  const [example] = createExampleComponent({}, { focused: true });

  expect(example.hasFocus()).toBe(true);
});

// Ex. Using a function provided by the testRenderer object (focus)
it('should allow focusing on the component', () => {
  const [example, testRenderer] = createExampleComponent();

  // focused was set to false in defaultOptions, so the componet will initially render without focus
  expect(example.hasFocus()).toBe(false);

  testRenderer.focus();

  expect(example.hasFocus()).toBe(true);
});
```

### spyOnMethods

A utility which enables running component methods asynchronously.

The `options` argument passed to the `createComponent` function accepts a field called `spyOnMethods`.
The value for `spyOnMethods` can be an array of method names to generate promises from. When one of those methods is invoked in the component it's associated promise will resolve, then the actual method will be invoked. The promises generated from the passed in methods are given the name `_${methodName}SpyPromise`.

#### Example: Spying on component methods and awaiting their execution before making assertions on their side effects

```js
class MethodSpiesExample extends Base {
  static get __componentName() {
    return 'MethodSpiesExample';
  }

  static _template() {
    return {
      Title: {
        type: TextBox
      },
      Subtitle: {
        type: TextBox,
        y: 100
      }
    };
  }

  static get tags() {
    return ['Title', 'Subtitle'];
  }

  static get properties() {
    return ['title', 'subtitle'];
  }

  _construct() {
    super._construct();
    this._title = 'title';
    this._subtitle = 'subtitle';
  }

  _update() {
    this._updateTitle();
    this._updateSubtitle();
  }

  _updateTitle() {
    this._Title.content = this.title;
  }
  _updateSubtitle() {
    this._Subtitle.content = this.subtitle;
  }
}

const createComponent = makeCreateComponent(MethodSpies);

it('should update the title and subtitle', async () => {
  const [methodSpiesComponent, testRenderer] = createComponent(
    {},
    { spyOnMethods: ['_update'] }
  );

  // wait for _update to be called on the initial render before proceeding
  await methodSpiesComponent.__updateSpyPromise;

  expect(methodSpiesComponent._Title.content).toBe('title');
  expect(methodSpiesComponent._Subtitle.content).toBe('subtitle');

  const newTitle = 'new title';
  const newSubtitle = 'new subtitle';
  methodSpiesComponent.patch({
    title: newTitle,
    subtitle: newSubtitle
  });

  // wait for _update to be called in response to values in the properties array changing
  await methodSpiesComponent.__updateSpyPromise;

  expect(methodSpiesComponent._Title.content).toBe(newTitle);
  expect(methodSpiesComponent._Subtitle.content).toBe(newSubtitle);
});
```

**Note: `spyOnMethods` can only be set in in the `options` object of `createComponent`. It can not be assigned to the `defaultOptions` object in `makeCreateComponent`**

---

### fastForward

Force all running Lightning Transitions on one or more Lightning Elements to finish and update the transitioning property to its target value immediately.

This function is similar to [completeAnimation](#completeanimation) in that it allows testing transitioning properties. Unlike `completeAnimation`, `fastForward` is not asynchronous, and does result in all running transitions to complete. If a test requires awaiting specific properties to finish transitioning, `completeAnimation` is the recommended utility function. The `fastForward` function forces transitions to finish, but does not wait for the template to update before proceeding through the test function. To ensure the template has updated following a call to `fastForward`, invoke [`testRenderer.update()`](#testrenderer-functions).

#### fastForward Arguments

`fastForward(elements)`

| argument | type                                            | default | description                                   |
| -------- | ----------------------------------------------- | ------- | --------------------------------------------- |
| elements | Array\<Lightning.Element\> \| Lightning.Element | -       | element(s) with transitioning property values |

##### Example: Forcing running Transitions to finish before testing the result

```js
import lng from '@lightningjs/core';
import {
  makeCreateComponent,
  fastForward
} from '@lightningjs/ui-components-test-utils';

class Example extends lng.Component {
  static _template() {
    const square = {
      rect: true,
      w: 100,
      h: 100,
      x: 0,
      y: 0,
      color: 0xeeeeeeee
    };
    return {
      TransitioningRectA: square,
      TransitioningRectB: square
    };
  }

  set axisPosition(value) {
    this._axisPosition = value;
    this.tag('TransitioningRectA').setSmooth('x', value);
    this.tag('TransitioningRectB').setSmooth('y', value);
  }

  get axisPosition() {
    return this._axisPosition;
  }
}

// generate a createComponent function to use in tests
const createExampleComponent = makeCreateComponent(Example);

// Ex. force all running transitions to complete, then test the result
it('should transition the x value of the component', () => {
  const [example, testRenderer] = createExampleComponent();
  expect(example.tag('TransitioningRectA').x).toBe(0);
  expect(example.tag('TransitioningRectB').y).toBe(0);

  //
  example.axisPosition = 50;
  const rectA = example.tag('TransitioningRectA');
  const rectB = example.tag('TransitioningRectB');
  fastForward([rectA, rectB]);
  testRenderer.update();

  expect(example.tag('TransitioningRectA').x).toBe(50);
  expect(example.tag('TransitioningRectB').y).toBe(50);
});
```

---

### completeAnimation

Returns a Promise that resolves once all animating properties have updated to their target value(s).

```js
completeAnimation(element, transitionProperties = [])
```

#### `completeAnimation` Arguments

| argument             | type              | default | description                                                 |
| -------------------- | ----------------- | ------- | ----------------------------------------------------------- |
| element              | Lightning.Element | -       | element with properties that transition value changes       |
| transitionProperties | array\|string     | []      | property name(s) that transition value changes on component |

##### Example: Testing element properties before and after their values have transitioned

```js
import lng from '@lightningjs/core';
import { makeCreateComponent } from '@lightningjs/ui-components-test-utils';

class Example extends lng.Component {
  static _template() {
    return {
      TransitioningRect: {
        rect: true,
        color: 0xffffffff,
        w: 100,
        h: 100,
        x: 0,
        y: 0
      }
    };
  }

  _updatePosition() {
    this.tag('TransitioningRect').setSmooth('x', this.axisPosition);
    this.tag('TransitioningRect').setSmooth('y', this.axisPosition);
  }

  set axisPosition(value) {
    this._axisPosition = value;
    this._updatePosition();
  }

  get axisPosition() {
    return this._axisPosition;
  }
}

// generate a createComponent function to use in tests
const createExampleComponent = makeCreateComponent(Example);

// Ex. await the transitions of x and y values to finish before testing the result
it('should transition the x value of the component', async () => {
  const [example] = createExampleComponent();
  expect(example.tag('TransitioningRect').x).toBe(0);
  expect(example.tag('TransitioningRect').y).toBe(0);

  example.axisPosition = 50;
  await completeAnimation(example.tag('TransitioningRect'), ['x', 'y']);

  expect(example.tag('TransitioningRect').x).toBe(50);
  expect(example.tag('TransitioningRect').y).toBe(50);
});
```

---

### nextTick

Creates a Promise that resolves after a defined amount of time. If no amount of time is specified, the Promise will resolve immediately.

#### `nextTick(wait)` Arguments

`nextTick(wait = 0)`

| argument | type   | default | description                                                           |
| -------- | ------ | ------- | --------------------------------------------------------------------- |
| wait     | number | 0       | amount of time (in milliseconds) before the returned Promise resolves |

---
