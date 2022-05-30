<script setup>
import { inject } from 'vue';
const s = inject('$screens');
const { matches, list, mapList, current, mapCurrent } = inject('$screens');
const mappedList = mapList({
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
});
const mappedCurrent = mapCurrent({
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
});
</script>
<template>
  <div>
    <h3>Screens</h3>
    <p>
      Matches: <strong>{{ matches }}</strong>
    </p>
    <p>
      List: <strong>{{ list }}</strong>
    </p>
    <p>
      Mapped List: <strong>{{ mappedList }}</strong>
    </p>
    <p>
      Current: <strong>{{ current }}</strong>
    </p>
    <p>
      Mapped Current: <strong>{{ mappedCurrent }}</strong> Mapped Current:
      <strong>{{ $screens.mapCurrent({ sm: 't', md: 's' }, 'b') }}</strong>
    </p>
  </div>
</template>
