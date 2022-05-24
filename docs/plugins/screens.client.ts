import { screens } from '@vmq';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(screens);
});
