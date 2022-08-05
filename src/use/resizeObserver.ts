import { ref, watch, onUnmounted } from 'vue';
import type { Ref, ComponentPublicInstance } from 'vue';
import type { ResizeObserverCallback, ResizeObserverOptions } from '../types';

export function useResizeObserver(
  target: Ref<ComponentPublicInstance | HTMLElement | SVGElement | undefined | null>,
  callback?: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) {
  let observer: ResizeObserver | undefined;
  const rect = ref<DOMRectReadOnly | undefined>();

  const listener: ResizeObserverCallback = (...args) => {
    if (callback) callback(...args);
    const entry = args[0][0];
    rect.value = entry.contentRect;
  };

  const stopObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const stopWatch = watch(
    () => target.value,
    (elOrComp) => {
      stopObserver();
      if (window && 'ResizeObserver' in window && elOrComp) {
        observer = new ResizeObserver(listener);
        observer.observe((elOrComp as ComponentPublicInstance).$el ?? elOrComp, options);
      }
    },
    { immediate: true, flush: 'post' }
  );

  const cleanup = () => {
    stopObserver();
    stopWatch();
  };

  onUnmounted(() => cleanup());

  return { rect, cleanup };
}
