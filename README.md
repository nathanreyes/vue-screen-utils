# vue-screen-utils

A dependency-free collection of utility functions and plugins for using media queries in Vue 3.

## Install package

```console
npm install vue-screen-utils
```

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
<!--ParentComponent.vue-->
<script setup>
  import { useScreens } from 'vue-screen-utils';

  useScreens(
    // Order from smallest to largest
    {
      xs: '0px', // (min-width: 0px)
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    }
    // {
    //   injectKey: $sq, (Optional custom inject key)
    // }
  );
</script>
```

The `useScreens` function accepts a config object with screen size keys mapped to query values. A simple pixel value of '640px' will get mapped to 'min-width: 640px'. It is recommended to map a mobile-first key with a '0px' value followed by larger sizes.

The query value may be in a variety of formats.

```js
useScreens(['0px', '100px', '200px']); // Raw strings
useScreens({ xs: '0px', sm: '100px', md: '200px' }); // Object with string values
useScreens({ xs: { min: '0px' }, sm: { min: '100px' }, md: { min: '100px' } }); // Object with object values
useScreens({ xs: [{ min: '0px' }, { max: '100px' }] }); // Object with object array (multiple values)
```

The `useScreens` function will return an [object](#screens-object) with a collection of utility properties and functions. This object will also get injected into the parent's child components as `$screens` (or custom `injectKey`).

See notes about [cleanup](#cleanup).

### Step 2. Inject the `$screens` object into nested components.

```html
<!--ChildComponent.vue-->
<script setup>
  import { inject } from 'vue';
  // Desctructure utilities needed
  const { matches, list, mapList, current, mapCurrent } = inject('$screens');
</script>
```

#### Matches Object

The value of `matches` in the example above is a reactive object of size keys mapped to the match status of their respective media query.

```js
// Viewport is 800px wide
console.log(matches.value); // { xs: true, sm: true, md: true, lg: false, xl: false }
```

#### List Matching Screens

The `list` computed property returns a list of media-matched screen size keys.

```js
console.log(list.value); // ['xs', 'sm', 'md']
```

The `mapList()` function returns a computed property list of custom values mapped to the current matched size keys.

```js
const value = mapList({ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 });
console.log(value.value); // [0, 1, 2]
```

#### Current Screen

The `current` computed property returns the current max screen size key.

```js
console.log(current.value); // 'md'
```

The `mapCurrent()` function returns a computed value mapped to the `current` key.

```js
const current = mapCurrent({ xs: 0, sm: 1, md: 2, lg: 3, xl: 4 });
console.log(current.value); // 2
```

Pass an optional default value that gets returned when no screen sizes are matched.

```js
const current = mapCurrent({ lg: 3 }, 0);
console.log(current.value); // 0
```

#### Cleanup

Event cleanup happens automatically when the parent component is unmounted, but can be manually called if needed.

```js
// <!--ParentComponent.vue-->
const { cleanup } = useScreens({...});
cleanup();
```

## Screens Plugin

The `screens` plugin is exactly like the `useScreens` method above, but allows for a screen configuration to be used application-wide. Also, a global property will be created for easy access to `$screens` within templates.

### Step 1. Import the plugin.

```js
// main.js
import { screens } from 'vue-screen-utils';

// Use plugin with optional config
app.use(screens, {
  mobile: '0px',
  tablet: '640px',
  laptop: '1024px',
  desktop: '1280px',
});
```

### Step 2. Repeat step 2 from the [_Use Screens_](#use-screens) method above.

### Step 3. Quick reference from component templates

```html
<template>
  <GridComponent :columns="$screens.mapCurrent({ md: 2 }, 1)" />
</template>
```
