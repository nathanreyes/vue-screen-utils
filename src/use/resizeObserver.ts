import { ref, watch, onUnmounted, computed } from 'vue';
import type { Ref, ComputedRef, ComponentPublicInstance } from 'vue';
import type { ResizeObserverCallback, ResizeObserverOptions } from '../types';

export const isClient = typeof window !== 'undefined';
export const defaultWindow = isClient ? window : undefined;

type RectKey = 'width' | 'height' | 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y';

export function useResizeObserver(
  target: Ref<ComponentPublicInstance | HTMLElement | SVGElement | undefined | null>,
  callback?: ResizeObserverCallback,
  options: ResizeObserverOptions = {}
) {
  const { window = defaultWindow, ...resizeOptions } = options;
  let observer: ResizeObserver | undefined;
  const isSupported = window && 'ResizeObserver' in window;
  const rect = ref<DOMRectReadOnly>();

  // Computed properties from rect
  const rectKeys: RectKey[] = ['width', 'height', 'top', 'right', 'bottom', 'left', 'x', 'y'];
  const props = rectKeys.reduce((res, key) => {
    res[key] = computed(() => {
      if (rect.value == null) return NaN;
      return rect.value[key];
    });
    return res;
  }, {} as Record<RectKey, ComputedRef<number>>);

  const _callback: ResizeObserverCallback = (...args) => {
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
      if (isSupported && elOrComp) {
        observer = new ResizeObserver(_callback);
        observer.observe((elOrComp as ComponentPublicInstance).$el ?? elOrComp, resizeOptions);
      }
    },
    { immediate: true, flush: 'post' }
  );

  const cleanup = () => {
    stopObserver();
    stopWatch();
  };

  onUnmounted(() => cleanup());

  return { rect, ...props, cleanup };
}
