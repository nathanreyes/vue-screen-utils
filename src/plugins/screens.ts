import { App, reactive, computed } from 'vue';
import buildMediaQuery from '../utils/buildMediaQuery';
import defaultScreens from '../utils/defaultScreens';
import { ScreenState, Screens, ScreensConfig } from '../types';

declare const window: Window;

const state = reactive<ScreenState>({
  screens: {},
  hasSetup: false,
  matches: [],
  queries: [],
});

function refreshMatches() {
  state.matches = Object.entries(state.queries)
    .filter((p: Array<any>) => p[1].matches)
    .map((p: Array<any>) => p[0]);
  console.log('matches', state.matches);
}

function cleanupQueries() {
  state.queries.forEach((query) => query.removeEventListener('change', refreshMatches));
}

function setupQueries() {
  if (state.hasSetup || !window || !('matchMedia' in window)) return;
  cleanupQueries();
  state.queries = Object.values(state.screens).map((query: string) => {
    const mediaQuery = window.matchMedia(buildMediaQuery(query));
    mediaQuery.addEventListener('change', refreshMatches);
    return mediaQuery;
  });
  state.hasSetup = true;
  refreshMatches();
}

function getScreensComputed(config: ScreensConfig, def?: any) {
  setupQueries();
  return computed(() => {
    return 5;
  });
}

export default {
  install: (app: App, screens?: Screens) => {
    state.screens = screens || defaultScreens;
    // Inject a globally available $screens() method
    // app.config.globalProperties.$screens = (config) => {
    //   setupQueries();
    // };

    app.provide('$screens', getScreensComputed);
  },
};
