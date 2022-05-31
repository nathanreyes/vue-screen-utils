import { onUnmounted, provide } from 'vue';
import type { Screens, ScreensOptions } from '../types';
import { defaultInjectKey } from '../types';
import initScreens from '../utils/initScreens';

export function useScreens(screens?: Screens, opts?: ScreensOptions) {
  const s = initScreens(screens);
  provide(opts?.injectKey || defaultInjectKey, s);
  onUnmounted(() => s!.cleanup());
}
