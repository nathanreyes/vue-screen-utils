# vue-screen-utils

A dependency-free collection of screen utility functions in Vue 3, written completely in TypeScript.

- [**Use Screens**](#use-screens): Use function for mapping screen sizes to media query strings, arrays and custom values
- [**Screens Plugin**](#screens-plugin): Same `useScreens` goodness but applied application-wide in a Vue plugin.
- [**Use Media Query**](#use-media-query): Use function for evaluating simple media query strings.
- [**Use Resize Observer**](#use-resize-observer): Use function for evaluating changes made to an ref element's content rect.
- [**Use Dark Mode**](#use-dark-mode): Use function for observing dark mode using manual, class or system preference strategies.

## Install package

```console
npm install vue-screen-utils
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
  <GridComponent :columns="$screens.mapCurrent({ tablet: 2 }, 1)" />
</template>
```

## Use Media Query

Import and use the `useMediaQuery` function to evaluate simple media query strings. The function returns a `matches` computed property with the media query match status and an optional `cleanup()` function.

If you wish to receive a callback of the raw media query event, provide the callback function as the second argument.

Event cleanup happens automatically when the component is unmounted, but can be manually called via the `cleanup()` function.

```html
<template>
  <div>
    <p class="high-dpi"><strong>High-DPI</strong>: {{ matches }}</p>
    <button @click="cleanup">Cleanup</button>
  </div>
</template>
<script setup>
  import { useMediaQuery } from 'vue-screen-utils';

  const { matches, cleanup } = useMediaQuery(`@media only screen and (-moz-min-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2)`);
</script>
```

## Use Resize Observer

Import and use the `useResizeObserver` function to evaluate changes made to an ref element's content rect. The function returns a reactive content `rect` object. It also returns an optional `cleanup()` function.

If you wish to receive a callback of the raw resize observer event, provide the callback function as the second argument.

The backing event is cleaned up when the component is unmounted, but `cleanup()` can be called manually.

```html
<template>
  <div>
    <!-- Resizable text area element -->
    <textarea ref="textRef">{{ rect }}</textarea>
    <!-- Component refs also supported -->
    <!-- <MyComponent ref="componentRef" /> -->
    <button @click="cleanup">Cleanup</button>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import { useResizeObserver } from 'vue-screen-utils';

  const textRef = ref(null);
  const { rect, cleanup } = useResizeObserver(textRef);
</script>
```

## Use Dark Mode

Import and use the `useDarkMode` function to evaluate dark mode using a variety of strategies, based on the argument provided.

```ts
declare function useDarkMode(config: Ref<boolean | 'system' | Partial<DarkModeClassConfig>>): {
  isDark: Ref<boolean>;
  displayMode: ComputedRef<'dark' | 'light'>;
  cleanup: () => void;
};
```

### Manual Strategy

Pass a boolean value for `isDark` to set the dark mode manually.

```html
<template>
  <div>Dark Mode Active: {{ isDark ? 'Yes' : 'No' }}</div>
</template>

<script setup>
  import { useDarkMode } from 'vue-screen-utils';

  const configRef = ref(false);
  const isDark = useDarkMode(configRef);
</script>
```

### System Preference Strategy

Pass the `system` string to use the `Window.matchMedia()` API to read the user's system preference. This setting is continually watched to detect future changes made by the user.

For example, to view the effect on the Mac, you can navigate to **System Preferences &#8250; General** and switch the **Appearance** setting between `Light`, `Dark` and `Auto`.

```html
<template>
  <div>Dark Mode Active: {{ isDark ? 'Yes' : 'No' }}</div>
</template>

<script setup>
  import { useDarkMode } from 'vue-screen-utils';

  const configRef = ref('system');
  const isDark = useDarkMode(configRef);
</script>
```

### Class Strategy

To use the class strategy, pass an object with the element `selector` and `darkClass` to check against.

```ts
interface DarkModeClassConfig {
  selector: string;
  darkClass: string;
}
```

Any class updates made on the element are watched with a `MutationObserver` to detect future changes made by the user.

```html
<template>
  <div>Dark Mode Active: {{ isDark ? 'Yes' : 'No' }}</div>
</template>

<script setup>
  import { useDarkMode } from 'vue-screen-utils';

  const configRef = ref({ selector: ':root', darkClass: 'dark' });
  const isDark = useDarkMode(configRef);
</script>
```

Because `:root` and `dark` are the default `selector` and `darkClass`, respectively, a simple object could be passed to achieve the same effect.

```html
<script setup>
  import { useDarkMode } from 'vue-screen-utils';

  const configRef = ref({});
  const isDark = useDarkMode(configRef);
</script>
```
