<script setup>
import { inject } from 'vue';
const screens = inject('$screens');
let columns = 2;
if (screens) {
  columns = screens({
    default: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  });
}
// const columns = 5;
</script>
<template>
  <div>
    <h3>Screens</h3>
    <p>
      Columns: <strong>{{ columns }}</strong>
    </p>
  </div>
</template>
