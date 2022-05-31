import { ref, onUnmounted } from 'vue';
import type { MediaQueryCallback, MediaQueryOptions } from '../types';

export const isClient = typeof window !== 'undefined';
export const defaultWindow = isClient ? window : undefined;

export function useMediaQuery(query: string, callback: MediaQueryCallback, options: MediaQueryOptions = {}) {
  const { window = defaultWindow } = options;
  let mediaQuery: MediaQueryList | undefined;
  const isSupported = window && 'matchMedia' in window;
  const matches = ref(false);

  const _callback = (ev: MediaQueryListEvent) => {
    if (callback) callback(ev);
    matches.value = ev.matches;
  };

  const cleanup = () => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', _callback);
      mediaQuery = undefined;
    }
  };

  cleanup();
  if (isSupported && query) {
    mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', _callback);
    matches.value = mediaQuery.matches;
  }

  onUnmounted(() => cleanup());

  return { matches, cleanup };
}
