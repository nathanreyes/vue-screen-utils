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

The `list()` function returns a computed property of matching screen size keys.

```js
const list = screens.list();
console.log(list.value); // ['sm', 'md']
```

Pass a configuration object to map the matching keys to custom values.

```js
const mappedList = screens.list({ sm: 1, md: 2, lg: 3, xl: 4 });
console.log(mappedList.value); // [1, 2]
```

### Resolve Max Screen

The `resolve()` function will resolve the max matched screen. Pass a default value that will get returned if none of the sizes match.

```js
const screen = screens.resolve('');
console.log(screen.value); // ['md']
```

Pass a configuration object to map the resolved key to a custom value.

```js
const mappedScreen = screens.resolve({ sm: 1, md: 2, lg: 3, xl: 4 }, 0);
console.log(mappedScreen.value); // [2]
```

Queries are resolved using a mobile-first approach, so `mappedScreen.value` will evaluate to 0 (the default argument) until the screen size crosses the `sm` boundary, at which point it will evaluate to 1 until it crosses the `md` boundary, at which point it will evaluate to 2, and so on.

### Screens Plugin

The `screens` plugin is exactly like the `useMethod`, but allows for a screen configuration to be used application-wide.

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
