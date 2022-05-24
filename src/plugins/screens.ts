import { App, Plugin } from 'vue';
import createScreens from '../utils/createScreens';
import { Screens } from '../types';

const plugin: Plugin = {
  install: (app: App, screens?: Screens) => {
    // Inject a globally available $screens() method
    // app.config.globalProperties.$screens = (config) => {
    //   setupQueries();
    // };

    app.provide('$screens', createScreens(screens));
  },
};

export default plugin;
