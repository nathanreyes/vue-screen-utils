import type { NormalizedScreenValue } from './normalizeScreens';

// This function gratuitously borrowed from TailwindCSS
// https://github.com/tailwindcss/tailwindcss/blob/master/src/util/buildMediaQuery.js
export default function buildMediaQuery(screenValues: NormalizedScreenValue[]) {
  return screenValues
    .map((sv) => {
      if (sv.raw !== undefined) return sv.raw;
      return [sv.min && `(min-width: ${sv.min})`, sv.max && `(max-width: ${sv.max})`].filter(Boolean).join(' and ');
    })
    .join(', ');
}
