import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DOMWrapper, type VueWrapper } from '@vue/test-utils';
import CollectionPanel from '../../../src/components/collection/CollectionPanel.vue';
import CollectionGammaSpectrum from '../../../src/components/collection/CollectionGammaSpectrum.vue';
import CollectionHistoryRow from '../../../src/components/collection/CollectionHistoryRow.vue';
import type { Element } from '../../../src/types/element/element';
import type { WishlistEntry } from '../../../src/types/collection/collection';
import { localeMessages } from '../../../src/locales';
import { mountComponent } from '../../helpers/mountComponent';
import { createTestRouter } from '../../helpers/testRouter';

// CollectionPanel eagerly imports CollectionGammaSpectrum.vue / CollectionHistoryRow.vue (which itself
// pulls in ElementCollectionHistoryModal.vue) at module load time, all of which touch src/data and
// src/data/collection - mocked out with a synthetic, mutable fixture set so no test here ever touches
// the real personal collection. `elements`/`wishlist` are mutated in place (not reassigned) between
// tests so CollectionPanel's own setup(), which re-derives everything from them on every mount, sees
// the right scenario per test.
const { ELEMENTS, WISHLIST } = vi.hoisted(() => {
  const elements: Element[] = [];
  const wishlist: Record<string, WishlistEntry[]> = {};
  return { ELEMENTS: elements, WISHLIST: wishlist };
});

vi.mock('../../../src/data', () => ({
  allCategories: [
    { id: 'nonmetal', color: '#00ccff' },
    { id: 'transition', color: '#ffcc00' },
    { id: 'alkaline-earth', color: '#ff6666' },
    { id: 'noble-gas', color: '#8800ff' },
  ],
  elements: ELEMENTS,
  getElementRouteSymbol: (symbol: string) => symbol.toLowerCase(),
  isElementRadioactive: (number: number) => number === 88 || number === 999,
  isElementWeaklyRadioactive: () => false,
  getCollectionSpectrum: vi.fn(),
  collectionSpectrumFilenames: {},
  getCollectionSpectrumXmlHref: () => null,
  getElementDecayMode: () => undefined,
  storedElementDetails: {},
  getSymbolByNumber: (number: number) => ELEMENTS.find((el) => el.number === number)?.symbol ?? null,
}));

vi.mock('../../../src/data/collection', () => ({
  collectionName: 'Test Collection',
  siteTitle: 'Test Site',
  siteUrl: 'https://test.example',
  wishlist: WISHLIST,
}));

function fullElements(): Element[] {
  return [
    {
      number: 1,
      symbol: 'H',
      mass: '1.008',
      group: 1,
      oldGroup: 'IA',
      row: 1,
      col: 1,
      periodEnd: false,
      color: '#00ccff',
      category: 'nonmetal',
      inCollection: false,
    },
    {
      number: 26,
      symbol: 'Fe',
      mass: '55.85',
      group: 8,
      oldGroup: 'VIII',
      row: 4,
      col: 8,
      periodEnd: false,
      color: '#ffcc00',
      category: 'transition',
      inCollection: true,
      collection: {
        physical: { acquiredDate: '2024-01-01' },
        spectrum: { id: 'fe-current', annotations: [], leadShielded: false },
        history: [
          {
            physical: { acquiredDate: '2023-01-01' },
            spectrum: { id: 'fe-past' },
            retained: false,
            reason: 'betterSample',
          },
        ],
        alternates: [{ spectrum: { id: 'fe-alt' }, retained: false }, { physical: {} }],
      },
    },
    {
      number: 88,
      symbol: 'Ra',
      mass: '226',
      group: 2,
      oldGroup: 'IIA',
      row: 7,
      col: 2,
      periodEnd: false,
      color: '#ff6666',
      category: 'alkaline-earth',
      inCollection: true,
      collection: {
        physical: { acquiredDate: '2024-01-01' },
        history: [{ physical: { acquiredDate: '2021-01-01' }, retained: true }],
      },
    },
    {
      number: 93,
      symbol: 'Np',
      mass: '237',
      group: 3,
      oldGroup: 'IIIB',
      row: 7,
      col: 3,
      periodEnd: false,
      color: '#ffcc00',
      category: 'transition',
      inCollection: false,
    },
    {
      number: 84,
      symbol: 'Po',
      mass: '209',
      group: 16,
      oldGroup: 'VIA',
      row: 6,
      col: 16,
      periodEnd: false,
      color: '#ff6666',
      category: 'alkaline-earth',
      inCollection: true,
      collection: {},
    },
    {
      number: 999,
      symbol: 'Xx',
      mass: '0',
      group: null,
      oldGroup: '',
      row: 1,
      col: 1,
      periodEnd: false,
      color: '#00ccff',
      category: 'nonmetal',
      inCollection: true,
      collection: {
        physical: { acquiredDate: '2020-05-05' },
        spectrum: { id: 'xx-current' },
        history: [{ physical: { acquiredDate: '2019-01-01' }, spectrum: { id: 'xx-past' } }],
      },
    },
  ];
}

function fullWishlist(): Record<string, WishlistEntry[]> {
  return {
    Np: [
      { isotope: '237', sampleState: 'ampoule' },
      {
        isotope: '237b',
        sampleState: 'ampoule',
        container: 'glassVial',
        link: 'https://example.com/np',
        status: 'ordered',
      },
    ],
    Po: [{ isotope: '210', status: 'shipping' }],
    Xx: [{ isotope: '1', description: 'Custom desc' }],
  };
}

function resetFixtures() {
  ELEMENTS.splice(0, ELEMENTS.length, ...fullElements());
  for (const key of Object.keys(WISHLIST)) delete WISHLIST[key];
  Object.assign(WISHLIST, fullWishlist());
}

beforeEach(() => {
  resetFixtures();
});

afterEach(() => {
  document.body.innerHTML = '';
});

async function mountPanel(path = '/collection') {
  const router = createTestRouter();
  await router.push(path);
  await router.isReady();
  const wrapper = mountComponent(CollectionPanel, {
    global: {
      plugins: [router],
      stubs: { CollectionGammaSpectrum: true, CollectionHistoryRow: true },
    },
  });
  await wrapper.vm.$nextTick();
  return { wrapper, router };
}

// DrawerShell teleports its content to document.body, so wrapper.find()/findAll() (which only search
// the component's own render tree) can't see it - a DOMWrapper over document.body can. Component
// lookups (findComponent/findAllComponents) work fine on `wrapper` regardless, since Teleport doesn't
// remove a component from Vue's instance tree, only its DOM output.
function body(): DOMWrapper<HTMLElement> {
  return new DOMWrapper(document.body);
}

describe('CollectionPanel', () => {
  it('renders nothing when the route is not /collection', async () => {
    const { wrapper } = await mountPanel('/');
    expect(wrapper.find('.collection-panel__shell').exists()).toBe(false);
  });

  it('renders the collection name as the title', async () => {
    await mountPanel();
    expect(body().find('.collection-panel__title').text()).toBe('Test Collection');
  });

  it('renders the collected/collectible/total stat rows and category rows, with a 0% fill for an empty category', async () => {
    await mountPanel();
    const rows = body().findAll('.collection-panel__row');
    // collected, radioactive, + 4 categories (nonmetal, transition, alkaline-earth, noble-gas)
    expect(rows).toHaveLength(6);

    const collectedRow = rows[0]!;
    expect(collectedRow.find('.collection-panel__row-value').text()).toBe('4/5/6');
    const fill = collectedRow.find('.collection-panel__row-fill');
    expect((fill.element as HTMLElement).style.width).toBe(`${Math.round((4 / 6) * 100)}%`);

    const radioactiveRow = rows[1]!;
    expect(radioactiveRow.find('.collection-panel__row-value').text()).toBe('2/1/2');

    const nobleGasRow = rows.find((r) => r.find('.collection-panel__row-value').text() === '0/0/0')!;
    expect(nobleGasRow.find('.collection-panel__row-fill').element).toHaveProperty('style');
    expect((nobleGasRow.find('.collection-panel__row-fill').element as HTMLElement).style.width).toBe('0%');
  });

  it('closes via the close button and via the drawer backdrop', async () => {
    const { router } = await mountPanel();
    const pushSpy = vi.spyOn(router, 'push');

    await body().find('.close-button').trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' });

    pushSpy.mockClear();
    await body().find('.drawer-shell__backdrop').trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' });
  });

  it('builds one spectrum card per live/history/alternate entry with an id, skipping entries without one', async () => {
    const { wrapper } = await mountPanel();
    const cards = wrapper.findAllComponents(CollectionGammaSpectrum);
    // fe-current, fe-past, fe-alt (Fe's second alternate has no spectrum and is skipped),
    // xx-current, xx-past (Ra's history entry has no spectrum id and contributes nothing)
    expect(cards).toHaveLength(5);
    expect(cards.map((c) => c.props('spectrumId'))).toEqual([
      'fe-current',
      'fe-past',
      'fe-alt',
      'xx-current',
      'xx-past',
    ]);

    const first = cards[0]!;
    expect(first.props('elementSymbol')).toBe('Fe');
    expect(first.props('accentColor')).toBe('#ffcc00');
    expect(first.props('annotations')).toEqual([]);
    expect(first.props('leadShielded')).toBe(false);
    expect(first.props('siblings')).toHaveLength(5);
    expect(first.props('siblingIndex')).toBe(0);

    // no fallback on this prop - an untranslated symbol simply passes undefined through
    const xxCard = cards.find((c) => c.props('spectrumId') === 'xx-current')!;
    expect(xxCard.props('elementName')).toBeUndefined();
  });

  it('navigates to the element route when a spectrum card header is clicked', async () => {
    const { router } = await mountPanel();
    const pushSpy = vi.spyOn(router, 'push');
    await body().findAll('.collection-panel__spectrum-header')[0]!.trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'fe' } });
  });

  it('hides the spectra section when no element has a spectrum entry', async () => {
    ELEMENTS.splice(0, ELEMENTS.length, {
      number: 1,
      symbol: 'H',
      mass: '1.008',
      group: 1,
      oldGroup: 'IA',
      row: 1,
      col: 1,
      periodEnd: false,
      color: '#00ccff',
      category: 'nonmetal',
      inCollection: false,
    });
    const { wrapper } = await mountPanel();
    expect(wrapper.findComponent(CollectionGammaSpectrum).exists()).toBe(false);
  });

  it('renders one wishlist row per entry with the upgrade flag reflecting whether the element is already owned', async () => {
    await mountPanel();
    const rows = body().findAll('.collection-wishlist-row');
    expect(rows).toHaveLength(4);

    const npRows = rows.filter((r) => r.find('.element-spectrum-heading__symbol').text() === 'Np');
    expect(npRows).toHaveLength(2);
    expect(npRows[0]!.find('.collection-wishlist-row__sample').text()).toBe('ampoule');
    expect(npRows[0]!.findAll('.collection-wishlist-row__icon')).toHaveLength(1); // no upgrade icon, Np not owned
    expect(npRows[1]!.find('.collection-wishlist-row__sample').text()).toBe('ampoule (glassVial) ↗');

    const poRow = rows.find((r) => r.find('.element-spectrum-heading__symbol').text() === 'Po')!;
    expect(poRow.find('.collection-wishlist-row__sample').text()).toBe(''); // stateLabel/description both absent
    expect(poRow.findAll('.collection-wishlist-row__icon')).toHaveLength(2); // upgrade icon shown, Po already owned

    const xxRow = rows.find((r) => r.find('.element-spectrum-heading__symbol').text() === 'Xx')!;
    expect(xxRow.find('.element-spectrum-heading__name').text()).toBe(''); // untranslated symbol falls back to empty name
  });

  it('opens the element route when a wishlist row is clicked', async () => {
    const { router } = await mountPanel();
    const pushSpy = vi.spyOn(router, 'push');
    await body().findAll('.collection-wishlist-row')[0]!.find('.collection-wishlist-row__element').trigger('click');
    expect(pushSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'np' } });
  });

  it('hides the wishlist section when nothing is on it', async () => {
    for (const key of Object.keys(WISHLIST)) delete WISHLIST[key];
    await mountPanel();
    expect(body().find('.collection-wishlist-row').exists()).toBe(false);
  });

  it('groups history timeline entries by date, newest first, marking upgrades and retained/not-retained past versions', async () => {
    const { wrapper } = await mountPanel();
    const groups = body().findAll('.collection-panel__timeline-group');
    // dates: 2024-01-01 (Fe current, Ra current, Xx none), 2023-01-01 (Fe past), 2021-01-01 (Ra past), 2020-05-05 (Xx current), 2019-01-01 (Xx past)
    expect(groups).toHaveLength(5);

    const newestGroup = groups[0]!;
    const rowsInNewest = newestGroup.findAllComponents(CollectionHistoryRow) as VueWrapper<
      InstanceType<typeof CollectionHistoryRow>
    >[];
    expect(rowsInNewest).toHaveLength(2); // Fe + Ra share 2024-01-01

    const feRow = rowsInNewest.find((r) => r.props('color') === '#ffcc00')!;
    expect(feRow.props('upgrade')).toBe(true); // Fe's past entry had reason: betterSample
    expect(feRow.props('name')).toBe(localeMessages.en.elements.Fe);

    const raRow = rowsInNewest.find((r) => r.props('color') === '#ff6666')!;
    expect(raRow.props('upgrade')).toBe(false);

    const allRows = wrapper.findAllComponents(CollectionHistoryRow);
    expect(allRows).toHaveLength(6); // Fe (current+past), Ra (current+past), Xx (current+past)
    const xxRow = allRows.find((r) => r.props('name') === '')!;
    expect(xxRow).toBeTruthy();
  });

  it('marks a past history entry NOT_RETAINED when retained is explicitly false, and RETAINED otherwise', async () => {
    const { wrapper } = await mountPanel();
    const allRows = wrapper.findAllComponents(CollectionHistoryRow);
    // Fe's past entry: retained false -> not-retained marker color
    const fePast = allRows.find((r) => r.props('color') === '#ffcc00' && r.props('upgrade') === false);
    expect(fePast).toBeTruthy();
    // Ra's past entry: retained true -> retained marker color, distinct from Fe's
    const raPast = allRows.find((r) => r.props('color') === '#ff6666' && r.props('upgrade') === false);
    expect(raPast).toBeTruthy();
    expect(fePast!.props('markerColor')).not.toBe(raPast!.props('markerColor'));
  });

  it('hides the history section when no element has an acquiredDate', async () => {
    ELEMENTS.splice(0, ELEMENTS.length, {
      number: 1,
      symbol: 'H',
      mass: '1.008',
      group: 1,
      oldGroup: 'IA',
      row: 1,
      col: 1,
      periodEnd: false,
      color: '#00ccff',
      category: 'nonmetal',
      inCollection: true,
      collection: {},
    });
    const { wrapper } = await mountPanel();
    expect(wrapper.findComponent(CollectionHistoryRow).exists()).toBe(false);
  });

  it('toggles each collapsible section open/closed', async () => {
    await mountPanel();
    const titles = body().findAll('.collapsible-section__title');
    expect(titles).toHaveLength(4); // stats, spectra, wishlist, history

    for (const title of titles) {
      const section = title.element.closest('.collapsible-section')!;
      const wasCollapsed = section.classList.contains('collapsible-section--collapsed');
      await title.trigger('click');
      expect(section.classList.contains('collapsible-section--collapsed')).toBe(!wasCollapsed);
    }
  });
});
