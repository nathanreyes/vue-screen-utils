<script setup lang="ts">
import { ref, computed } from 'vue';
import Screens from './components/Screens.vue';
import MediaQuery from './components/MediaQuery.vue';
const view = ref('screens');
const isScreens = computed(() => view.value === 'screens');
const isMedia = computed(() => view.value === 'media');
</script>

<template>
  <nav class="menu">
    <div class="menu-item" :class="{ selected: isScreens }" @click="view = 'screens'">Screens</div>
    <div class="menu-item" :class="{ selected: isMedia }" @click="view = 'media'">Media Query</div>
  </nav>
  <main>
    <Screens v-if="isScreens" />
    <MediaQuery v-if="isMedia" />
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
