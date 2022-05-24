import { onUnmounted, provide } from 'vue';
import { Screens, ScreensOptions } from '../types';
import initScreens from '../utils/initScreens';

export function useScreens(screens: Screens, opts: ScreensOptions) {
  const s = initScreens(screens);
  provide('$screens', s);
  onUnmounted(() => s.cleanup());
}
