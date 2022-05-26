A collection of utility plugins and functions when using media queries in Vue.

### Use Media Query

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
  import { useMediaQuery } from 'vue-media-query';

  // Use a media query that returns a boolean ref
  const isHighDPI = useMediaQuery(
    `@media only screen and (-moz-min-device-pixel-ratio: 2), 
    only screen and (-o-min-device-pixel-ratio: 2/1), 
    only screen and (-webkit-min-device-pixel-ratio: 2), 
    only screen and (min-device-pixel-ratio: 2)`,
    // Optional callback with raw event
    (ev) => console.log(`Callback: ${ev}`)
  );

  // Cleanup manually if needed
  isHighDPI.value = undefined;
</script>
```

### Use Screens

1. Import and use the `useScreens` function within parent components that will provide a `$screens` object to nested components. Pass a config object that maps custom screen size keys to media query values.

Note: The configuration object should order the keys from smallest size to largest.

```html
<!--Parent.vue-->
<script setup>
  import { useScreens } from 'vue-media-query';

  useScreens({
    sm: '640px', // (min-width: 640px)
    md: '768px', // (min-width: 768px)
    lg: '1024px', // (min-width: 1024px)
    xl: '1280px', // (min-width: 1280px)
  });
</script>
```

A `$screens` object will be inject into child components. Cleanup will happen automatically when the parent component is unmounted, but can be manually called if needed.

```js
const screens = useScreens({...});
screens.cleanup();
```

2. Inject the `$screens` reactive object into nested components.

```html
<!-- MyComponent.vue -->
<script setup>
  import { inject } from 'vue';

  const screens = inject('$screens');
</script>
```

The value of `screens` is a reactive object of size keys mapped to the matched status of their respective media query.

In the example above, if the viewport is '800px', then the `screens` value would be

```js
{
  sm: true,
  md: true,
  lg: false,
  xl: false
}
```

#### List Matching Screens

The `list` computed property returns a list of media-matched screen size keys.

```js
console.log(screens.list.value); // ['sm', 'md']
```

The `listMap()` function returns a reactive `list` mapped to custom values.

```js
const mappedList = screens.listMap({ sm: 1, md: 2, lg: 3, xl: 4 });
console.log(mappedList.value); // [1, 2]
```

### Current Screen

The `current` computed property returns the current max screen size key.

```js
console.log(screens.current.value); // 'md'
```

The `currentMap()` function returns a computed property with the `current` size key mapped to a custom value. The default value (2nd argument) will return if no screen sizes are matched.

```js
const currentMap = screens.currentMap({ sm: 1, md: 2, lg: 3, xl: 4 }, 0);
console.log(currentMap.value); // 2
```

### Screens Plugin

The `screens` plugin is exactly like the `useScreens` method, but allows for a screen configuration to be used application-wide.

1. Import the plugin.

```js
// main.js
import { screens } from 'vue-media-query';

// Use plugin with optional config
app.use(screens, {
  sm: '640px', // (min-width: 640px)
  md: '768px', // (min-width: 768px)
  lg: '1024px', // (min-width: 1024px)
  xl: '1280px', // (min-width: 1280px)
});
```

2. Repeat step 2 from the _Use Screens_ method above.
