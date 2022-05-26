import { ComputedRef, computed, reactive } from 'vue';
import { has } from 'lodash-es';
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

  function mapList(config?: ScreensConfig): ComputedRef<any[]> {
    return computed(() =>
      Object.keys(state.matches)
        .filter((key) => state.matches[key] === true)
        .map((key) => (config && has(config, key) ? config[key] : key))
    );
  }

  const list = mapList();

  function mapCurrent(config?: ScreensConfig, def?: any) {
    return computed(() => {
      const arr = mapList(config);
      if (arr.value.length) return arr.value[arr.value.length - 1];
      return def;
    });
  }

  const current = mapCurrent(undefined, '');

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

  return extendReactive(state.matches, { list, mapList, current, mapCurrent, cleanup });
}
