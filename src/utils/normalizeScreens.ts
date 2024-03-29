export interface NormalizedScreenValue {
  min: string;
  max: string | undefined;
  raw?: string | undefined;
}

export interface NormalizedScreen {
  name: string;
  values: NormalizedScreenValue[];
}

function resolveValue({ 'min-width': _minWidth, min = _minWidth, max, raw }: any = {}): NormalizedScreenValue {
  return { min, max, raw };
}

/**
 * A function that normalizes the various forms that the screens object can be
 * provided in.
 *
 * Input(s):
 *   - ['100px', '200px'] // Raw strings
 *   - { sm: '100px', md: '200px' } // Object with string values
 *   - { sm: { min: '100px' }, md: { max: '100px' } } // Object with object values
 *   - { sm: [{ min: '100px' }, { max: '200px' }] } // Object with object array (multiple values)
 *
 * Output(s):
 *   - [{ name: 'sm', values: [{ min: '100px', max: '200px' }] }] // List of objects, that contains multiple values
 */
export function normalizeScreens(screens: any, root = true): NormalizedScreen[] {
  if (Array.isArray(screens)) {
    return screens.map((screen) => {
      if (root && Array.isArray(screen)) {
        throw new Error('The tuple syntax is not supported for `screens`.');
      }

      if (typeof screen === 'string') {
        return { name: screen.toString(), values: [{ min: screen, max: undefined }] };
      }

      let [name, options] = screen;
      name = name.toString();

      if (typeof options === 'string') {
        return { name, values: [{ min: options, max: undefined }] };
      }

      if (Array.isArray(options)) {
        return { name, values: options.map((option) => resolveValue(option)) };
      }

      return { name, values: [resolveValue(options)] };
    });
  }
  return normalizeScreens(Object.entries(screens ?? {}), false);
}
