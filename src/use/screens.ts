import { onUnmounted, provide } from 'vue';
import { Screens, ScreensOptions, defaultInjectKey } from '../types';
import initScreens from '../utils/initScreens';

export function useScreens(screens?: Screens, opts?: ScreensOptions) {
  const s = initScreens(screens);
  provide(opts?.injectKey || defaultInjectKey, s);
  onUnmounted(() => s.cleanup());
}
