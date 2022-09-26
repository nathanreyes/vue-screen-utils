import { onUnmounted, provide } from 'vue';
import { Screens, ScreensOptions, initScreens, defaultInjectKey } from '../utils/initScreens';

export function useScreens(screens?: Screens, opts?: ScreensOptions) {
  const s = initScreens(screens);
  provide(opts?.injectKey || defaultInjectKey, s);
  onUnmounted(() => s!.cleanup());
  return s;
}
