import { screens } from '../../src/main';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(screens);
});
