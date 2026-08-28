import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ElementSidebar from '../../../src/components/element/ElementSidebar.vue';
import type { Element } from '../../../src/types/element/element';
import type { DetailSection } from '../../../src/types/element/section';
import type { ElementDetail } from '../../../src/types/element/detail';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';

// buildElementSections/isSectionEmpty/parseOxidationStates are fully covered by their own dedicated
// test file (tests/utils/element/detailSections.test.ts) - mocked here with fully-controlled synthetic
// sections so this file can focus on ElementSidebar's own composition/routing/interaction logic.
const { MOCK_SECTIONS, isSectionEmptyMock } = vi.hoisted(() => {
  const sections = [
    { id: 'collection', sectionKey: 'collection', title: 'Collection', color: '#111111', items: [] },
    { id: 'overview', title: 'Overview', color: '#222222', items: [] },
    { id: 'grid', title: 'Grid', color: '#333333', items: [], structureCode: 5 },
    { id: 'nfpa', title: 'NFPA', color: '#444444', items: [] },
    { id: 'ghs', title: 'GHS', color: '#555555', items: [] },
    { id: 'mining', title: 'Mining', color: '#666666', items: [] },
    { id: 'applications', title: 'Applications', color: '#777777', items: [{ label: 'Uses', value: 'Steel' }] },
  ];
  const isEmptyMock = vi.fn((_section: DetailSection) => false);
  return { MOCK_SECTIONS: sections, isSectionEmptyMock: isEmptyMock };
});

vi.mock('../../../src/utils/element/detailSections', () => ({
  buildElementSections: vi.fn(() => MOCK_SECTIONS),
  isSectionEmpty: isSectionEmptyMock,
  parseOxidationStates: vi.fn(() => null),
}));

vi.mock('../../../src/data/collection', () => ({
  siteTitle: 'Periodic Table',
  siteUrl: 'https://test.example',
}));

vi.mock('../../../src/data', () => ({
  getElementImageUrl: (number: number) => (number === 26 ? '/fe.jpg' : null),
  getElementRouteSymbol: (symbol: string) => symbol.toLowerCase(),
  getGridStructureImageUrlByNum: () => null,
  hasElementImage: (number: number) => number === 26,
  isElementRadioactive: (number: number) => number === 84 || number === 75,
  isElementWeaklyRadioactive: (number: number) => number === 75,
  getElementDetail: (number: number) => {
    if (number === 26) {
      return {
        number: 26,
        symbol: 'Fe',
        name: 'Iron',
        overview: { electronShellConfig: '2-8-14-2', electronCount: '26', protonCount: '26', neutronCount: '30' },
        properties: { atomicMass: '55.845' },
        nucleus: { nfpaCube: '1,0,0,' },
        atomic: { oxidationState: '2,3' },
      } as ElementDetail;
    }
    if (number === 2) {
      return {
        number: 2,
        symbol: 'He',
        name: 'Helium',
        overview: {},
        properties: {},
        atomic: {},
      } as ElementDetail;
    }
    return null;
  },
  getSymbolByNumber: (number: number) => (number === 26 ? 'Fe' : number === 2 ? 'He' : null),
  storedElementDetails: {},
  getElementDecayMode: () => undefined,
  getElementGhsPictograms: () => [],
  getCollectionSpectrum: vi.fn(),
  mainElements: [],
  lanthanides: [],
  actinides: [],
}));

class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  root = null;
  rootMargin = '';
  scrollMargin = '';
  thresholds: number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const FE: Element = {
  number: 26,
  symbol: 'Fe',
  mass: '55.845',
  group: 8,
  oldGroup: 'VIIIB',
  row: 4,
  col: 8,
  periodEnd: false,
  color: '#8d6e63',
  category: 'transition',
  inCollection: true,
};

const PO = { ...FE, number: 84, symbol: 'Po', inCollection: false };
const RE = { ...FE, number: 75, symbol: 'Re', inCollection: false };
const UNKNOWN = { ...FE, number: 999, symbol: 'Xx' };

function mountSidebar(element: typeof FE | null) {
  return mountComponent(ElementSidebar, { props: { element } });
}

/** Defines navigator.share/clipboard directly on the real navigator (rather than replacing the whole
 * object, which would drop prototype-inherited properties like navigator.language that installLocale() needs). */
function stubShare(options: { share?: typeof navigator.share; clipboard?: { writeText: typeof vi.fn } }) {
  if ('share' in options) {
    Object.defineProperty(navigator, 'share', { value: options.share, configurable: true });
  }
  if (options.clipboard) {
    Object.defineProperty(navigator, 'clipboard', { value: options.clipboard, configurable: true });
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  document.body.innerHTML = '';
  delete (navigator as { share?: unknown }).share;
  delete (navigator as { clipboard?: unknown }).clipboard;
});

describe('ElementSidebar', () => {
  it('renders nothing inside the drawer when element is null', () => {
    mountSidebar(null);
    expect(document.body.querySelector('.element-sidebar__shell')).toBeNull();
    expect(document.body.querySelector('.drawer-shell')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('opens the drawer and shows the header once an element is set', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const panel = document.body.querySelector('.drawer-shell');
    expect(panel?.getAttribute('aria-hidden')).toBe('false');
    expect(document.body.querySelector('.element-sidebar__name')?.textContent).toBe(localeMessages.en.elements.Fe);
    expect(document.body.querySelector('.element-sidebar__symbol')?.textContent).toBe('Fe');
  });

  it('shows an image header when the element has one, and the no-image modifier otherwise', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-sidebar__image')).not.toBeNull();
    expect(
      document.body.querySelector('.element-sidebar__header')?.classList.contains('element-sidebar__header--no-image'),
    ).toBe(false);

    mountSidebar(PO);
    await new Promise((r) => setTimeout(r, 0));
    const headers = document.body.querySelectorAll('.element-sidebar__header');
    expect(headers[headers.length - 1]!.classList.contains('element-sidebar__header--no-image')).toBe(true);
  });

  it('shows the radioactive badge only for a radioactive element, weak-styled for a weak one', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelectorAll('.badge').length).toBeLessThan(3);

    document.body.innerHTML = '';
    mountSidebar(PO);
    await new Promise((r) => setTimeout(r, 0));
    const badgeTexts = Array.from(document.body.querySelectorAll('.badge')).map((b) => b.textContent);
    expect(badgeTexts.some((t) => t === localeMessages.en.sidebar.radioactiveBadge)).toBe(true);

    document.body.innerHTML = '';
    mountSidebar(RE);
    await new Promise((r) => setTimeout(r, 0));
    const weakBadgeTexts = Array.from(document.body.querySelectorAll('.badge')).map((b) => b.textContent);
    expect(weakBadgeTexts.some((t) => t === localeMessages.en.sidebar.weakRadioactiveBadge)).toBe(true);
  });

  it('shows the collection badge only when the element is owned', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));
    const badgeTexts = Array.from(document.body.querySelectorAll('.badge')).map((b) => b.textContent);
    expect(badgeTexts.some((t) => t === localeMessages.en.sidebar.collectionBadge)).toBe(true);

    document.body.innerHTML = '';
    mountSidebar(PO);
    await new Promise((r) => setTimeout(r, 0));
    const badgeTexts2 = Array.from(document.body.querySelectorAll('.badge')).map((b) => b.textContent);
    expect(badgeTexts2.some((t) => t === localeMessages.en.sidebar.collectionBadge)).toBe(false);
  });

  it('shows an error message when the detail lookup fails for a known element number', async () => {
    mountSidebar(UNKNOWN);
    await new Promise((r) => setTimeout(r, 0));
    expect(document.body.querySelector('.element-sidebar__error')?.textContent).toBe(localeMessages.en.sidebar.error);
    expect(document.body.querySelector('.element-sidebar__body')).toBeNull();
  });

  it('renders one CollapsibleSection per section, and routes each to its matching child component', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const sections = document.body.querySelectorAll('.element-sidebar__section');
    expect(sections).toHaveLength(MOCK_SECTIONS.length);

    const body = document.body.querySelector('.element-sidebar__body')!;
    expect(body.querySelector('.element-collection-history-trigger')).not.toBeNull();
    expect(body.querySelector('.electron-shell, .element-sidebar__particles')).not.toBeNull();
    expect(body.querySelector('.element-sidebar__grid-layout')).not.toBeNull();
    expect(body.querySelector('.element-sidebar__diamond-wrap, .element-sidebar__prop--nfpa')).not.toBeNull();
    expect(body.querySelector('.element-sidebar__mining')).not.toBeNull();
    const propValues = Array.from(body.querySelectorAll('.element-sidebar__prop-value')).map((el) => el.textContent);
    expect(propValues).toContain('Steel');
  });

  it('toggles a section collapsed state via CollapsibleSection, in both directions', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const titles = document.body.querySelectorAll<HTMLButtonElement>('.collapsible-section__title');
    // Section 0 ('collection') has a sectionKey; section 1 ('overview') falls back to plain id -
    // exercises both `section.sectionKey ?? section.id` branches used to key the collapse toggle.
    const withSectionKey = titles[0]!;
    const withoutSectionKey = titles[1]!;

    expect(withSectionKey.getAttribute('aria-expanded')).toBe('true');
    withSectionKey.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(withSectionKey.getAttribute('aria-expanded')).toBe('false');
    withSectionKey.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(withSectionKey.getAttribute('aria-expanded')).toBe('true');

    withoutSectionKey.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(withoutSectionKey.getAttribute('aria-expanded')).toBe('false');
  });

  it('starts a section collapsed when isSectionEmpty reports it empty', async () => {
    isSectionEmptyMock.mockImplementation((section: DetailSection) => section.id === 'ghs');
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const titles = document.body.querySelectorAll<HTMLButtonElement>('.collapsible-section__title');
    const ghsIndex = MOCK_SECTIONS.findIndex((s) => s.id === 'ghs');
    expect(titles[ghsIndex]!.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the drawer via the sticky-nav back button, emitting close', async () => {
    const wrapper = mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__back')?.click();
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('closes the drawer via the on-image back button, emitting close', async () => {
    const wrapper = mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__back--on-image')?.click();
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('emits close when DrawerShell itself closes (e.g. Escape via its focus trap)', async () => {
    const wrapper = mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await new Promise((r) => setTimeout(r, 0));
    expect(wrapper.emitted('close')).toHaveLength(1);
  });

  it('shows the sticky nav once the header sentinel scrolls out of view, and does nothing for an entry-less callback', async () => {
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const observer = MockIntersectionObserver.instances.at(-1)!;
    observer.callback([], observer);
    await new Promise((r) => setTimeout(r, 0));
    expect(
      document.body
        .querySelector('.element-sidebar__sticky-nav')
        ?.classList.contains('element-sidebar__sticky-nav--visible'),
    ).toBe(false);

    observer.callback([{ isIntersecting: false } as IntersectionObserverEntry], observer);
    await new Promise((r) => setTimeout(r, 0));

    expect(
      document.body
        .querySelector('.element-sidebar__sticky-nav')
        ?.classList.contains('element-sidebar__sticky-nav--visible'),
    ).toBe(true);
  });

  it('resets to the closed/no-element state when the element prop is cleared, and disconnects the observer', async () => {
    const wrapper = mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));
    const observer = MockIntersectionObserver.instances.at(-1)!;

    await wrapper.setProps({ element: null });
    await new Promise((r) => setTimeout(r, 0));

    expect(document.body.querySelector('.element-sidebar__shell')).toBeNull();
    expect(document.body.querySelector('.drawer-shell')?.getAttribute('aria-hidden')).toBe('true');
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('re-derives default collapsed sections when the same element re-renders with fresh section data', async () => {
    const wrapper = mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const firstTitle = document.body.querySelector<HTMLButtonElement>('.collapsible-section__title')!;
    firstTitle.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(firstTitle.getAttribute('aria-expanded')).toBe('false');

    // Same element.number, new object identity - re-triggers the sections watcher without changing
    // elements, exercising the "already applied defaults for this element" skip branch.
    await wrapper.setProps({ element: { ...FE } });
    await new Promise((r) => setTimeout(r, 0));

    expect(
      document.body
        .querySelectorAll<HTMLButtonElement>('.collapsible-section__title')[0]!
        .getAttribute('aria-expanded'),
    ).toBe('false');
  });

  it('clears pending timers and disconnects the observer on unmount', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubShare({ share: undefined, clipboard: { writeText } });

    const wrapper = mountSidebar(FE);
    await vi.advanceTimersByTimeAsync(0);
    const observer = MockIntersectionObserver.instances.at(-1)!;

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__header-link--share')?.click();
    await vi.advanceTimersByTimeAsync(0);

    wrapper.unmount();
    expect(observer.disconnect).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('shares via the Web Share API when available', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);
    stubShare({ share: shareMock });

    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__header-link--share')?.click();
    await new Promise((r) => setTimeout(r, 0));

    expect(shareMock).toHaveBeenCalledWith(expect.objectContaining({ url: 'https://test.example/element/fe' }));
  });

  it('silently ignores a dismissed native share sheet', async () => {
    const shareMock = vi.fn().mockRejectedValue(new Error('dismissed'));
    stubShare({ share: shareMock });

    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__header-link--share')?.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(shareMock).toHaveBeenCalled();
  });

  it('falls back to the clipboard and shows a temporary "copied" state when Web Share is unavailable', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubShare({ share: undefined, clipboard: { writeText } });

    mountSidebar(FE);
    await vi.advanceTimersByTimeAsync(0);

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__header-link--share')?.click();
    await vi.advanceTimersByTimeAsync(0);

    expect(writeText).toHaveBeenCalledWith('https://test.example/element/fe');
    expect(document.body.querySelector('.element-sidebar__header-link--share')?.getAttribute('aria-label')).toBe(
      localeMessages.en.sidebar.shareCopied,
    );

    await vi.advanceTimersByTimeAsync(1500);
    expect(document.body.querySelector('.element-sidebar__header-link--share')?.getAttribute('aria-label')).toBe(
      localeMessages.en.sidebar.share,
    );

    vi.useRealTimers();
  });

  it('does nothing when both the Web Share API and clipboard access fail', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    stubShare({ share: undefined, clipboard: { writeText } });

    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    document.body.querySelector<HTMLButtonElement>('.element-sidebar__header-link--share')?.click();
    await new Promise((r) => setTimeout(r, 0));

    expect(document.body.querySelector('.element-sidebar__header-link--share')?.getAttribute('aria-label')).toBe(
      localeMessages.en.sidebar.share,
    );
  });

  it('uses the dark-theme header icons/share color when the theme is dark', async () => {
    localStorage.setItem('periodic-table-theme', 'dark');
    mountSidebar(FE);
    await new Promise((r) => setTimeout(r, 0));

    const shareIcon = document.body.querySelector<HTMLElement>(
      '.element-sidebar__header-media .element-sidebar__header-link-icon--share',
    );
    expect(shareIcon?.style.color).toBe('rgb(255, 255, 255)');
  });

  it('falls back to the "----" NFPA labels when the element has no valid NFPA cube data', async () => {
    const HE = { ...FE, number: 2, symbol: 'He' };
    mountSidebar(HE);
    await new Promise((r) => setTimeout(r, 0));

    const nfpaFacts = Array.from(document.body.querySelectorAll('.element-sidebar__prop--nfpa'));
    expect(nfpaFacts.some((el) => el.textContent?.includes('----'))).toBe(true);
  });

  it('does not set up the sticky-nav observer if the drawer closes before its setup nextTick resolves', async () => {
    // No awaits between mount and the prop change, so the pending `setupHeaderObserver()` from the
    // immediate watch invocation runs after containerRef/headerSentinelRef have already been torn down.
    const wrapper = mountSidebar(FE);
    await wrapper.setProps({ element: null });
    await new Promise((r) => setTimeout(r, 0));

    expect(document.body.querySelector('.element-sidebar__shell')).toBeNull();
  });
});
