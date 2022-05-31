<script setup lang="ts">
import { ref, computed } from 'vue';
import Screens from './components/Screens.vue';
import MediaQuery from './components/MediaQuery.vue';
import ResizeObserver from './components/ResizeObserver.vue';

const view = ref('screens');
const isScreens = computed(() => view.value === 'screens');
const isMedia = computed(() => view.value === 'media');
const isResize = computed(() => view.value === 'resize');
</script>

<template>
  <nav class="menu">
    <div class="menu-item" :class="{ selected: isScreens }" @click="view = 'screens'">Screens</div>
    <div class="menu-item" :class="{ selected: isMedia }" @click="view = 'media'">Media Query</div>
    <div class="menu-item" :class="{ selected: isResize }" @click="view = 'resize'">ResizeObserver</div>
  </nav>
  <main>
    <Screens v-if="isScreens" />
    <MediaQuery v-if="isMedia" />
    <ResizeObserver v-if="isResize" />
  </main>
</template>
<style>
.menu {
  display: flex;
}
.menu > * + * {
  margin-left: 12px;
}
.menu-item {
  padding: 8px;
  appearance: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.menu-item.selected {
  background-color: gray;
}
.menu-item:hover {
  background-color: gray;
}
</style>
