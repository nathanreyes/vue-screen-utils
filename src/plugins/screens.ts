import { App, Plugin } from 'vue';
import initScreens from '../utils/initScreens';
import { Screens } from '../types';

const plugin: Plugin = {
  install: (app: App, screens?: Screens) => {
    // Inject a globally available $screens() method
    // app.config.globalProperties.$screens = (config) => {
    //   setupQueries();
    // };
    const s = initScreens(screens);
    app.provide('$screens', s);
  },
};

export default plugin;
