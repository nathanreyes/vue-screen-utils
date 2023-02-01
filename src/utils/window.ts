export function windowExists() {
  return typeof window !== 'undefined';
}

export function windowHasFeature(feature: string) {
  return windowExists() && feature in window;
}
