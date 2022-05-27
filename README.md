# vue-screen-utils

A dependency-free collection of utility functions and plugins for using media queries in Vue 3.

## Use Media Query

Import and use the `useMediaQuery` function to evaluate a raw media query and return a boolean ref that will update with the media query.

If you wish to receive a callback of the raw media query event, provide the callback function as the second argument.

Event cleanup happens automatically when the component is unmounted, but can be manually triggered by setting the ref value to `undefined`.

```html
<template>
  <div>
    <h3 v-if="isHighDPI">This must look really sharp to you!</h3>
    <h3 v-else>Can you even read this?</h3>
  </div>
</template>
<script setup>
  import { useMediaQuery } from 'vue-screen-utils';

  // Use a media query that returns a boolean ref
  const isHighDPI = useMediaQuery(
    `@media only screen and (-moz-min-device-pixel-ratio: 2), 
    only screen and (-o-min-device-pixel-ratio: 2/1), 
    only screen and (-webkit-min-device-pixel-ratio: 2), 
    only screen and (min-device-pixel-ratio: 2)`,
    // Optional callback with raw event
    (ev) => console.log(`Callback: ${ev}`)
  );

  // Cleanup manually if needed (auto-cleaned when component is unmounted)
  isHighDPI.value = undefined;
</script>
```

## Use Screens

### Step 1. Import and call `useScreens`

Import and call the `useScreens` function within a parent component, passing a config object that maps custom screen size keys to media query values.

```html
<!--Parent.vue-->
<script setup>
  import { useScreens } from 'vue-screen-utils';

  useScreens(
    // Order from smallest to largest
    {
      sm: '640px', // (min-width: 640px)
      md: '768px', // (min-width: 768px)
      lg: '1024px', // (min-width: 1024px)
      xl: '1280px', // (min-width: 1280px)
    },
    {
      // injectKey: $sq, (Optional custom inject key)
    }
  );
</script>
```

The `useScreens` function accepts a variety of formats.

```js
useScreens(['100px', '200px']); // Raw strings
useScreens({ sm: '100px', md: '200px' }); // Object with string values
useScreens({ sm: { min: '100px' }, md: { max: '100px' } }); // Object with object values
useScreens({ sm: [{ min: '100px' }, { max: '200px' }] }); // Object with object array (multiple values)
```

The `useScreens` function will return a reactive [object](#screens-object). This object will also get injected into the parent's child components as `$screens` (or custom `injectKey`).

See notes about [cleanup](#cleanup).

### Step 2. Inject the `$screens` reactive object into nested components.

```html
<!-- MyComponent.vue -->
<script setup>
  import { inject } from 'vue';

  const screens = inject('$screens');
</script>
```

#### Screens Object

The value of `screens` in the example above is a reactive object of size keys mapped to the match status of their respective media query.

In the example above, if the viewport is '800px', then the `screens` value would be

```js
{
  sm: true,
  md: true,
  lg: false,
  xl: false
}
```

This object also provides the following reserved properties and functions (`list`, `listMap()`, `current`, `currentMap()` and `cleanup()`).

#### List Matching Screens

The `list` computed property returns a list of media-matched screen size keys.

```js
console.log(screens.list.value); // ['sm', 'md']
```

The `listMap()` function returns a computed property list of custom values mapped to the current matched size keys.

```js
const mappedList = screens.listMap({ sm: 1, md: 2, lg: 3, xl: 4 });
console.log(mappedList.value); // [1, 2]
```

#### Current Screen

The `current` computed property returns the current max screen size key.

```js
console.log(screens.current.value); // 'md'
```

The `currentMap()` function returns a computed value mapped to the `current` key. The default value (2nd argument) will return if no screen sizes are matched.

```js
const currentMap = screens.currentMap({ sm: 1, md: 2, lg: 3, xl: 4 }, 0);
console.log(currentMap.value); // 2
```

#### Cleanup

Event cleanup happens automatically when the parent component is unmounted, but can be manually called if needed.

```js
const screens = useScreens({...});
screens.cleanup();
```

## Screens Plugin

The `screens` plugin is exactly like the `useScreens` method above, but allows for a screen configuration to be used application-wide.

### Step 1. Import the plugin.

```js
// main.js
import { screens } from 'vue-screen-utils';

// Use plugin with optional config
app.use(screens, {
  sm: '640px', // (min-width: 640px)
  md: '768px', // (min-width: 768px)
  lg: '1024px', // (min-width: 1024px)
  xl: '1280px', // (min-width: 1280px)
});
```

### Step 2. Repeat step 2 from the [_Use Screens_](#use-screens) method above.
