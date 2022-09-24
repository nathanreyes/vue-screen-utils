import { Ref } from 'vue';

export type Screens = Record<any, string>;
export type ScreensConfig = Record<any, any>;
export interface NormalizedScreenValue {
  min: string;
  max: string | undefined;
  raw?: string | undefined;
}
export interface NormalizedScreen {
  name: string;
  values: NormalizedScreenValue[];
}
export interface ScreensState {
  screens: NormalizedScreen[];
  queries: Record<string, MediaQueryList>;
  matches: any;
  hasSetup: boolean;
}
export interface ScreensOptions {
  injectKey?: string;
}
export const defaultInjectKey = '$screens';

export type MediaQueryCallback = (ev?: MediaQueryListEvent) => void;

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;
export interface ResizeObserverOptions {
  box?: 'content-box' | 'border-box';
}

export interface DarkModeClassConfig {
  selector: string;
  darkClass: string;
}

export type DarkModeConfig = Ref<boolean | 'system' | DarkModeClassConfig>;
