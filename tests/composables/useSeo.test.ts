import { describe, expect, it, vi } from 'vitest';
import { nextTick, ref } from 'vue';
import { createHead } from '@unhead/vue/client';
import type { Element } from '../../src/types/element/element';
import type { LocaleMessages } from '../../src/locales/types';
import { withSetup } from '../helpers/withSetup';

vi.mock('../../src/data/collection', () => ({
  siteTitle: 'Periodic Table',
  siteUrl: 'https://periodic.example',
}));

const { useSeo } = await import('../../src/composables/useSeo');

const MESSAGES = {
  elements: { H: 'Hydrogen' },
  seo: {
    description: 'Personal periodic table',
    elementDescription: '%name% (%symbol%, #%number%) details',
  },
} as unknown as LocaleMessages;

const HYDROGEN = { number: 1, symbol: 'H' } as Element;

/** unhead's DOM renderer is debounced behind a Vue watcher (microtask) plus a `setTimeout(0)` macrotask. */
async function flushHead() {
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 0));
}

function setupSeo(element: Element | null, routeSymbol: string | undefined) {
  return withSetup(() => useSeo(ref(element), ref(routeSymbol), ref(MESSAGES), ref('en')), [createHead()]);
}

describe('useSeo', () => {
  it('sets the site title/description/canonical url when there is no element', async () => {
    const [, app] = setupSeo(null, undefined);
    await flushHead();

    expect(document.title).toBe('Periodic Table');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe('Personal periodic table');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://periodic.example/');

    app.unmount();
  });

  it('sets the element title/description/canonical url when an element is active', async () => {
    const [, app] = setupSeo(HYDROGEN, 'H');
    await flushHead();

    expect(document.title).toBe('Hydrogen (H) — Periodic Table');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Hydrogen (H, #1) details',
    );
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://periodic.example/element/H',
    );

    app.unmount();
  });

  it('falls back to an empty element name when the element has no translated name', async () => {
    const untranslated = { number: 999, symbol: 'Xx' } as Element;
    const [, app] = setupSeo(untranslated, 'Xx');
    await flushHead();

    expect(document.title).toBe('(Xx) — Periodic Table');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(' (Xx, #999) details');

    app.unmount();
  });
});
