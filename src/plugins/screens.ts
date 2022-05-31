import { App, Plugin } from 'vue';
import type { Screens, ScreensOptions } from '../types';
import initScreens from '../utils/initScreens';
import { defaultInjectKey } from '../types';

const plugin: Plugin = {
  install: (app: App, screens?: Screens, opts?: ScreensOptions) => {
    const s = initScreens(screens);
    const key = opts?.injectKey || defaultInjectKey;
    // Inject a globally available screens object method
    app.config.globalProperties[key] = s;
    // Provide screens object
    app.provide(key, s);
  },
};

export default plugin;
