export interface IWindow {
  window?: Window;
}

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
export interface ScreensOptions extends IWindow {
  injectKey?: string;
}
export const defaultInjectKey = '$screens';

export type MediaQueryCallback = (ev?: MediaQueryListEvent) => void;
export interface MediaQueryOptions extends IWindow {}

export type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;
export interface ResizeObserverOptions extends IWindow {
  box?: 'content-box' | 'border-box';
}
