export function windowHasFeature(feature: string) {
  return typeof window !== 'undefined' && feature in window;
}
