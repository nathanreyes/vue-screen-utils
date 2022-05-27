export type Screens = Record<any, string>;
export type ScreensConfig = Record<any, any>;
export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window;
}

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
export interface ScreensOptions extends ConfigurableWindow {}

export type MediaQueryCallback = (ev?: MediaQueryListEvent) => void;
export interface MediaQueryOptions extends ConfigurableWindow {}
