Vue plugin and use functions for easily using media queries.

### Screens Plugin

Use the `screens` plugin to map screen size keys to media query values and derive computed props from the screen sizes.

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

2. Inject `$screens` function in nested components

```html
<!-- MyComponent.vue -->
<script setup>
  import { inject } from 'vue';

  const screens = inject('$screens');

  // Create computed prop that will update any time the specified key boundaries have been crossed
  const columnCount = screens({
    default: 1,
    md: 2,
    xl: 3,
  });
</script>
```

Queries are evaluated using a mobile-first approach, so `columnCount.value` will evaluate to 1 (the `default`) until the screen size crosses the `md` boundary, at which point it will evaluate to 2 until it crosses the `xl` boundary, at which point it will evaluate to 3.

### Use Screens Function

1. Import and use the `useScreens` function within parent components that will provide the `$screens` function to nested components.

Note: This is much like the plugin, but scopes the screen config to a parent component instead of the entire application.

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

2. Repeat step 2 from the plugin method above.

### Use Media Query
