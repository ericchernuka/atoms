import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

type AnyFunction<T = any> = (...args: T[]) => any;

export function callAllHandlers<T extends (event: any) => void>(
  ...fns: (T | undefined)[]
) {
  return function func(event: Args<T>[0]) {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
}

export function callAll<T extends AnyFunction>(...fns: (T | undefined)[]) {
  return function mergedFn(arg: Args<T>[0]) {
    fns.forEach((fn) => {
      fn?.(arg);
    });
  };
}
