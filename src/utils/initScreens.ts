import { ComputedRef, computed, reactive, watch, watchEffect } from 'vue';
import { has, isUndefined } from 'lodash-es';
import { ScreensState, Screens, ScreensConfig } from '../types';
import buildMediaQuery from './buildMediaQuery';
import defaultScreens from './defaultScreens';
import extendReactive from './extendReactive';

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

  function resolve(config?: ScreensConfig, def?: any) {
    return computed(() => {
      const arr = list(config);
      if (arr.value.length) return arr.value[arr.value.length - 1];
      return def;
    });
  }

  function list(config?: ScreensConfig): ComputedRef<any[]> {
    return computed(() =>
      Object.keys(state.matches)
        .filter((key) => state.matches[key] === true)
        .map((key) => (config && has(config, key) ? config[key] : key))
    );
  }

  function cleanup() {
    Object.values(state.queries).forEach((query) => query.removeEventListener('change', refreshMatches));
    state.queries = {};
    state.matches = {};
  }

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

  return extendReactive(state.matches, { list, listMap, min, minMap, max, maxMap, cleanup });
}
