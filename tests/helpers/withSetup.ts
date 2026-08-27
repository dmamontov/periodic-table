import { mount, type VueWrapper } from '@vue/test-utils';
import type { Plugin } from 'vue';

/** Runs `composable` inside a real component's setup() so onMounted/onBeforeUnmount/inject actually fire. Call `wrapper.unmount()` to trigger teardown. */
export function withSetup<T>(composable: () => T, plugins: Plugin[] = []): [T, VueWrapper] {
  let result!: T;
  const wrapper = mount(
    {
      setup() {
        result = composable();
        return () => null;
      },
    },
    { global: { plugins } },
  );
  return [result, wrapper];
}
