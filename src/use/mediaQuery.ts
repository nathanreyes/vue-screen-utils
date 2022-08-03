import { ref, onMounted, onUnmounted } from 'vue';
import type { MediaQueryCallback, MediaQueryOptions } from '../types';

export const isClient = typeof window !== 'undefined';
export const defaultWindow = isClient ? window : undefined;

export function useMediaQuery(query: string, callback: MediaQueryCallback, options: MediaQueryOptions = {}) {
  const { window = defaultWindow } = options;
  let mediaQuery: MediaQueryList | undefined;
  const matches = ref(false);

  function listener(ev: MediaQueryListEvent) {
    if (callback) callback(ev);
    matches.value = ev.matches;
  }

  function cleanup() {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', listener);
      mediaQuery = undefined;
    }
  }

  function setup(newQuery = query) {
    cleanup();
    if (window && 'matchMedia' in window && newQuery) {
      mediaQuery = window.matchMedia(newQuery);
      mediaQuery.addEventListener('change', listener);
      matches.value = mediaQuery.matches;
    }
  }

  onMounted(() => setup());

  onUnmounted(() => cleanup());

  return { matches, setup, cleanup };
}
