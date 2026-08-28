import { mount, type ComponentMountingOptions } from '@vue/test-utils';
import type { Component } from 'vue';
import { installLocale } from '../../src/locales';
import { installTheme } from '../../src/theme';

/** Mounts a component with the same locale/theme providers main.ts installs on the real app, since most components read text/theme via useLocale/useTheme. */
export function mountComponent<T extends Component>(component: T, options: ComponentMountingOptions<T> = {}) {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      plugins: [installLocale, installTheme, ...(options.global?.plugins ?? [])],
    },
  });
}
