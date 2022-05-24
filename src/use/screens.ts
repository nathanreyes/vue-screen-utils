import { onUnmounted, provide } from 'vue';
import { Screens, ScreensOptions } from '../types';
import createScreens from '../utils/createScreens';

export function useScreens(screens: Screens, opts: ScreensOptions) {
  const s = createScreens(screens);
  provide('$screens', s);
  onUnmounted(() => s.cleanup());
}
