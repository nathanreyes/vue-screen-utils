import { App, Plugin, reactive, computed } from 'vue';
import { has, isUndefined } from 'lodash-es';

import buildMediaQuery from '../utils/buildMediaQuery';
import defaultScreens from '../utils/defaultScreens';
import { ScreensState, Screens, ScreensConfig } from '../types';

declare const window: Window;

const state = reactive<ScreensState>({
  screens: {},
  hasSetup: false,
  matches: [],
  queries: {},
});

function refreshMatches() {
  state.matches = Object.entries(state.queries)
    .filter((p: Array<any>) => p[1].matches)
    .map((p: Array<any>) => p[0]);
}

function cleanupQueries() {
  Object.values(state.queries).forEach((query) => query.removeEventListener('change', refreshMatches));
  state.queries = {};
}

function setupQueries() {
  if (state.hasSetup || !window || !('matchMedia' in window)) return;
  cleanupQueries();
  state.queries = Object.entries(state.screens).reduce((result, kv) => {
    const mediaQuery = window.matchMedia(buildMediaQuery(kv[1]));
    mediaQuery.addEventListener('change', refreshMatches);
    result[kv[0]] = mediaQuery;
    return result;
  }, {} as Record<string, MediaQueryList>);
  state.hasSetup = true;
  refreshMatches();
}

function getScreensComputed(config: ScreensConfig, def?: any) {
  setupQueries();
  return computed(() =>
    state.matches.reduce(
      (prev, curr) => (has(config, curr) ? config[curr] : prev),
      isUndefined(def) ? config.default : def
    )
  );
}

const plugin: Plugin = {
  install: (app: App, screens?: Screens) => {
    state.screens = screens || defaultScreens;
    // Inject a globally available $screens() method
    // app.config.globalProperties.$screens = (config) => {
    //   setupQueries();
    // };

    app.provide('$screens', getScreensComputed);
  },
};

export default plugin;
