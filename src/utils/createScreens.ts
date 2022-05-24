import { reactive } from 'vue';
import { has, isUndefined } from 'lodash-es';
import { ScreensState, Screens, ScreensConfig } from '../types';
import buildMediaQuery from '../utils/buildMediaQuery';
import defaultScreens from '../utils/defaultScreens';

export default function (screens?: Screens) {
  const state = reactive<ScreensState>({
    screens: screens || defaultScreens,
    queries: {},
    matches: {},
    hasSetup: false,
  });

  function refreshMatches() {
    Object.entries(state.queries).forEach(([key, query]) => {
      state.matches[key] = query.matches;
    });
  }

  function resolve(config: ScreensConfig, def?: any) {
    return Object.entries(state.matches).reduce(
      (prev, [key, matches]) => (matches && has(config, key) ? config[key] : prev),
      isUndefined(def) ? config.default : def
    );
  }

  function cleanup() {
    Object.values(state.queries).forEach((query) => query.removeEventListener('change', refreshMatches));
    state.queries = {};
    state.matches = {};
  }

  function setup() {
    if (state.hasSetup || !window || !('matchMedia' in window)) return;
    cleanup();
    state.queries = Object.entries(state.screens).reduce((result, kv) => {
      const mediaQuery = window.matchMedia(buildMediaQuery(kv[1]));
      mediaQuery.addEventListener('change', refreshMatches);
      result[kv[0]] = mediaQuery;
      return result;
    }, {} as Record<string, MediaQueryList>);
    state.hasSetup = true;
    refreshMatches();
  }

  return reactive(
    {
      setup,
      resolve,
      cleanup,
      ...state.matches,
    }
    // new Proxy(
    //   {
    //     setup,
    //     resolve,
    //     cleanup,
    //   },
    //   {
    //     get(target, prop, receiver) {
    //       setup();
    //       if (prop === 'resolve' || prop === 'cleanup') {
    //         return target[prop];
    //       }
    //       return state.matches[prop];
    //     },
    //   }
    // )
  );
}
