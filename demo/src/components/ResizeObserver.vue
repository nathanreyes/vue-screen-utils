<script setup>
import { ref } from 'vue';
import { useResizeObserver } from '@vsu';
import Resizer from './Resizer.vue';

const textEl = ref(null);
const { width, height, top, right, bottom, left, x, y, rect, cleanup } = useResizeObserver(textEl);
</script>
<template>
  <div>
    <div><strong>Width</strong>: {{ width }}</div>
    <div><strong>Height</strong>: {{ height }}</div>
    <div><strong>Top</strong>: {{ top }}</div>
    <div><strong>Right</strong>: {{ right }}</div>
    <div><strong>Bottom</strong>: {{ bottom }}</div>
    <div><strong>Left</strong>: {{ left }}</div>
    <div><strong>X</strong>: {{ x }}</div>
    <div><strong>Y</strong>: {{ y }}</div>
    <button @click="cleanup">Cleanup</button>
  </div>
  <div>
    <!-- <textarea ref="textEl">{{ rect }}</textarea> -->
    <Resizer ref="textEl">{{ rect }}</Resizer>
  </div>
</template>
<style>
textarea {
  min-width: 200px;
}
</style>
