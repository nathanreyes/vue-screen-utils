<script setup>
import { useMediaQuery } from '@vsu';
const isHighDPI = useMediaQuery(`@media only screen and (-moz-min-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2)`);
const isTablet = useMediaQuery('(min-width: 576px)');
function cleanup() {
  isHighDPI.cleanup();
  isTablet.cleanup();
}
</script>
<template>
  <div>
    <h3>Media Query</h3>
    <p class="high-dpi"><strong>High-DPI</strong>: {{ isHighDPI.matches }}</p>
    <p class="tablet"><strong>Tablet</strong>: {{ isTablet.matches }}</p>
    <button @click="cleanup">Cleanup</button>
  </div>
</template>
<style scoped>
.high-dpi,
.tablet {
  color: red;
}
@media only screen and (-moz-min-device-pixel-ratio: 2),
  only screen and (-o-min-device-pixel-ratio: 2/1),
  only screen and (-webkit-min-device-pixel-ratio: 2),
  only screen and (min-device-pixel-ratio: 2) {
  /*use CSS to swap out your low res images with high res ones here*/
  .high-dpi {
    color: green;
  }
}
@media (min-width: 576px) {
  .tablet {
    color: green;
  }
}
</style>
