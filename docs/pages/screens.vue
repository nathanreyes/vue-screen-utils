<script setup>
import { inject } from 'vue';
const screens = inject('$screens');
let list = [];
let mappedList = [];
let current = '';
let mappedCurrent = 0;
if (screens) {
  list = screens.list;
  mappedList = screens.mapList({
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });
  current = screens.current;
  console.log('current', current);
  mappedCurrent = screens.mapCurrent(
    {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    0
  );
}
</script>
<template>
  <div>
    <h3>Screens</h3>
    <p>
      <strong>{{ screens }}</strong>
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
      Mapped Current: <strong>{{ mappedCurrent }}</strong>
    </p>
  </div>
</template>
