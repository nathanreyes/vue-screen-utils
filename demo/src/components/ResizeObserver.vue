<script setup lang="ts">
import { ref } from 'vue';
import { useResizeObserver } from '@vsu';

const textEl = ref(null);
const { rect, cleanup } = useResizeObserver(textEl);
</script>
<template>
  <div>
    <textarea ref="textEl">{{ rect }}</textarea>
  </div>
  <div>
    <button @click="cleanup">Cleanup</button>
  </div>
</template>
<style>
textarea {
  min-width: 200px;
}
</style>
