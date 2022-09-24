import { ref, computed, onUnmounted, watch } from 'vue';

import type { DarkModeConfig, DarkModeClassConfig } from '../types';

export function useDarkMode(config: DarkModeConfig) {
  const isDark = ref(false);
  const displayMode = computed(() => (isDark.value ? 'dark' : 'light'));

  let mediaQuery: MediaQueryList | undefined;
  let mutationObserver: MutationObserver | undefined;

  function mqListener(ev: MediaQueryListEvent) {
    isDark.value = ev.matches;
  }

  function setupSystem() {
    if (window && 'matchMedia' in window) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', mqListener);
      isDark.value = mediaQuery.matches;
    }
  }

  function moListener() {
    const { selector = ':root', darkClass = 'dark' } = config.value as DarkModeClassConfig;
    const el = document.querySelector(selector);
    isDark.value = (el as HTMLElement).classList.contains(darkClass);
  }

  function setupClass(config: DarkModeClassConfig) {
    const { selector = ':root', darkClass = 'dark' } = config;
    if (document && selector && darkClass) {
      const el = document.querySelector(selector);
      if (el) {
        mutationObserver = new MutationObserver(moListener);
        mutationObserver.observe(el, {
          attributes: true,
          attributeFilter: ['class'],
        });
        isDark.value = (el as HTMLElement).classList.contains(darkClass);
      }
    }
  }

  function setup() {
    stopObservers();
    const type = typeof config.value;
    if (type === 'string' && (config.value as string).toLowerCase() === 'system') {
      setupSystem();
    } else if (type === 'object') {
      setupClass(config.value as DarkModeClassConfig);
    } else {
      isDark.value = !!config.value;
    }
  }

  const stopWatch = watch(
    () => config.value,
    () => setup(),
    {
      immediate: true,
    }
  );

  function stopObservers() {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', mqListener);
      mediaQuery = undefined;
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = undefined;
    }
  }

  function cleanup() {
    stopObservers();
    stopWatch();
  }

  onUnmounted(() => cleanup());

  return {
    isDark,
    displayMode,
    cleanup,
  };
}
