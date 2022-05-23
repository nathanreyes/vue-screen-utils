export type Screens = Record<any, string>;
export type ScreensConfig = Record<any, any>;
export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window;
}
export interface ScreenState {
  screens: Record<string, string>;
  hasSetup: boolean;
  matches: Array<any>;
  queries: MediaQueryList[];
}
export interface ScreensOptions extends ConfigurableWindow {}

export type MediaQueryCallback = (ev?: MediaQueryListEvent) => void;
export interface MediaQueryOptions extends ConfigurableWindow {}
