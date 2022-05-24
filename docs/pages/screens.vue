<script setup>
import { inject } from 'vue';
const screens = inject('$screens');
let resolve = '';
let mappedResolve = null;
let array = [];
let mappedArray = [];
if (screens) {
  resolve = screens.resolve();
  mappedResolve = screens.resolve({
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });
  array = screens.list();
  mappedArray = screens.list({
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });
}
</script>
<template>
  <div>
    <h3>Screens</h3>
    <p>
      <strong>{{ screens }}</strong>
    </p>
    <p>
      Resolve: <strong>{{ resolve }}</strong>
    </p>
    <p>
      Mapped Resolve: <strong>{{ mappedResolve }}</strong>
    </p>
    <p>
      List: <strong>{{ array }}</strong>
    </p>
    <p>
      Mapped List: <strong>{{ mappedArray }}</strong>
    </p>
  </div>
</template>
