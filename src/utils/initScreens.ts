import type { ComputedRef } from 'vue';
import { computed, reactive } from 'vue';
import type { ScreensState, Screens, ScreensConfig } from '../types';
import { normalizeScreens } from './normalizeScreens';
import buildMediaQuery from './buildMediaQuery';
import defaultScreens from './defaultScreens';

export default function (screens?: Screens) {
  const state = reactive<ScreensState>({
    screens: normalizeScreens(screens || defaultScreens),
    queries: {},
    matches: {},
    hasSetup: false,
  });

  function refreshMatches() {
    Object.entries(state.queries).forEach(([key, query]) => {
      state.matches[key] = query.matches;
    });
  }

  function mapList(config: ScreensConfig): ComputedRef<any[]> {
    return computed(() =>
      Object.keys(state.matches)
        .filter((key) => state.matches[key] === true && config.hasOwnProperty(key))
        .map((key) => config[key])
    );
  }

  const list = computed(() => Object.keys(state.matches).filter((k) => state.matches[k]));

  function mapCurrent(config: ScreensConfig, def?: any) {
    return computed(() => {
      const curr = current.value;
      if (curr && config.hasOwnProperty(curr)) return config[curr];
      return def;
    });
  }

  const current = computed(() => {
    const arr = list.value;
    if (arr.length) return arr[arr.length - 1];
    return '';
  });

  function cleanup() {
    Object.values(state.queries).forEach((query) => query.removeEventListener('change', refreshMatches));
    state.queries = {};
    state.matches = {};
  }

  if (state.hasSetup || !window || !('matchMedia' in window)) return;
  cleanup();
  state.queries = state.screens.reduce((result, { name, values }) => {
    const mediaQuery = window.matchMedia(buildMediaQuery(values));
    mediaQuery.addEventListener('change', refreshMatches);
    result[name] = mediaQuery;
    return result;
  }, {} as Record<string, MediaQueryList>);
  state.hasSetup = true;
  refreshMatches();

  return { matches: state.matches, list, mapList, current, mapCurrent, cleanup };
}
