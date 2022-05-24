export default function extendReactive<O extends Record<string, any>, E extends Record<string, any>>(obj: O, ext: E) {
  return new Proxy(obj, {
    get(...args) {
      const [, prop] = args;
      if (prop in ext) return ext[<string>prop];
      return Reflect.get(...args);
    },
    set(...args) {
      const [, prop, value] = args;
      if (prop in ext) {
        (ext as Record<string, any>)[<string>prop] = value;
        return true;
      }
      Reflect.set(...args);
      return true;
    },
  });
}
