<script setup>
import { useMediaQuery } from '@vmq';
const isHighDPI = useMediaQuery(`@media only screen and (-moz-min-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2)`);
const isTablet = useMediaQuery('(min-width: 576px)', (ev) => console.log('CALLBACK happened', ev));
function clear() {
  isHighDPI.value = undefined;
  isTablet.value = undefined;
}
</script>
<template>
  <div>
    <h3>Media Query</h3>
    <p v-if="isHighDPI">This must look really sharp to you!</p>
    <p v-else>Can you even read this?</p>
    <p>{{ isTablet ? 'tablet or higher' : 'mobile' }}</p>
    <button @click="clear">Clear</button>
  </div>
</template>
<style scoped>
p {
  color: red;
}
@media only screen and (-moz-min-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
  /*use CSS to swap out your low res images with high res ones here*/
  p {
    color: blue;
  }
}
</style>
