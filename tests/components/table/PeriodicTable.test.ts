import { afterEach, describe, expect, it, vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createHead } from '@unhead/vue/client';
import { defineComponent } from 'vue';
import ElementCell from '../../../src/components/table/ElementCell.vue';
import EmptyCell from '../../../src/components/table/EmptyCell.vue';
import TableFilters from '../../../src/components/table/TableFilters.vue';
import HeatmapSelector from '../../../src/components/table/HeatmapSelector.vue';
import { mountComponent } from '../../helpers/mountComponent';

// vi.mock is hoisted above all top-level code in this file, so these fixtures - referenced inside the
// mock factories below - must go through vi.hoisted() to survive that hoist.
const { H, FE, HE, MAIN_ELEMENTS, F_BLOCK_ELEMENTS, ALL_ELEMENTS } = vi.hoisted(() => {
  const h = { number: 1, symbol: 'H', row: 1, col: 1, group: 1, category: 'nonmetal', inCollection: false };
  const fe = { number: 26, symbol: 'Fe', row: 4, col: 8, group: 8, category: 'transition', inCollection: true };
  const he = { number: 2, symbol: 'He', row: 1, col: 18, group: 18, category: 'noble-gas', inCollection: false };
  const la = { number: 57, symbol: 'La', row: 8, col: 4, group: null, category: 'lanthanides', inCollection: false };
  const ac = { number: 89, symbol: 'Ac', row: 9, col: 4, group: null, category: 'actinides', inCollection: false };
  const mainElements = [h, fe, he];
  const fBlockElements = [la, ac];
  const allElements = [...mainElements, ...fBlockElements];
  return {
    H: h,
    FE: fe,
    HE: he,
    MAIN_ELEMENTS: mainElements,
    F_BLOCK_ELEMENTS: fBlockElements,
    ALL_ELEMENTS: allElements,
  };
});

// ElementCell/CategoryFilter(via TableFilters)/HeatmapSelector are all eagerly imported by PeriodicTable
// and touch src/data / src/utils/heatmap / src/utils/element/* at module load time regardless of
// shallow rendering - mocked out with a small synthetic layout so no test here ever touches the real
// personal collection.
vi.mock('../../../src/data', () => ({
  allCategories: [
    { id: 'nonmetal', color: '#00ccff' },
    { id: 'transition', color: '#ffcc00' },
    { id: 'noble-gas', color: '#8800ff' },
    { id: 'lanthanides', color: '#cc00ff' },
    { id: 'actinides', color: '#ff00cc' },
  ],
  mainElements: MAIN_ELEMENTS,
  fBlockElements: F_BLOCK_ELEMENTS,
}));

vi.mock('../../../src/utils/element/lookup', () => ({
  getElementBySymbol: (symbol: string) =>
    ALL_ELEMENTS.find((el) => el.symbol.toLowerCase() === symbol.toLowerCase()) ?? null,
  getElementRouteSymbol: (symbol: string) => symbol.toLowerCase(),
  isElementRadioactive: () => false,
  isElementWeaklyRadioactive: () => false,
  getSymbolByNumber: (number: number) => ALL_ELEMENTS.find((el) => el.number === number)?.symbol ?? null,
}));

vi.mock('../../../src/utils/element/layout', () => ({
  getElementPeriod: (element: { row: number }) => (element.row === 8 ? 6 : element.row === 9 ? 7 : element.row),
  getTopRowByCol: () => new Map(MAIN_ELEMENTS.map((el) => [el.col, el.row])),
  isColumnHead: (element: { col: number; row: number }, topRowByCol: Map<number, number>) =>
    topRowByCol.get(element.col) === element.row,
  getCellBorderRadius: () => undefined,
}));

vi.mock('../../../src/data/collection', () => ({
  siteTitle: 'Test Site',
  siteUrl: 'https://test.example',
}));

vi.mock('../../../src/utils/heatmap', () => ({
  HEATMAP_DEFINITIONS: [{ id: 'atomicMass', group: 'atomic', labelKey: 'atomicMass', unitKey: 'gPerMol' }],
  formatHeatmapCellDisplay: (_id: string, number: number) => (number === FE.number ? '55.85' : undefined),
  formatHeatmapElementValue: (_id: string, number: number) => (number === FE.number ? '55.85' : ''),
  formatUnitLabel: (unitKey: string | undefined) => (unitKey ? 'g/mol' : ''),
  getHeatmapIntensity: (_id: string, number: number) => (number === FE.number ? 0.5 : null),
  intensityToBrightness: (intensity: number) => 0.4 + intensity * 0.6,
}));

// Only used by the one test exercising defineAsyncComponent's own loader (see below) - everywhere else,
// the global.stubs override bypasses the loader entirely, so this mock is otherwise never touched.
vi.mock('../../../src/components/element/ElementSidebar.vue', () => ({
  default: { name: 'ElementSidebar', template: '<div class="real-async-sidebar" />' },
}));

const { default: PeriodicTable } = await import('../../../src/components/table/PeriodicTable.vue');

// PeriodicTable loads ElementSidebar via defineAsyncComponent(() => import(...)), which - even under
// shallow mount - actually invokes the dynamic import() and would evaluate ElementSidebar.vue's own
// real src/data/collection dependencies. An explicit global stub replaces it before that loader ever
// runs, so ElementSidebar.vue's module is never touched; it also has its own dedicated test file.
const ElementSidebarStub = defineComponent({
  name: 'ElementSidebar',
  props: { element: { type: Object, default: null } },
  template: '<div class="stub-sidebar" />',
});

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: { template: '<div />' } },
      { path: '/element/:symbol', name: 'element', component: { template: '<div />' } },
    ],
  });
}

function mountTable(router: ReturnType<typeof createTestRouter>) {
  return mountComponent(PeriodicTable, {
    global: { plugins: [router, createHead()], stubs: { ElementSidebar: ElementSidebarStub } },
    shallow: true,
  });
}

async function setup(path = '/') {
  const router = createTestRouter();
  await router.push(path);
  await router.isReady();
  const wrapper = mountTable(router);
  await wrapper.vm.$nextTick();
  return { wrapper, router };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PeriodicTable', () => {
  it("actually invokes ElementSidebar's async loader when not overridden via global.stubs", async () => {
    const router = createTestRouter();
    await router.push('/');
    await router.isReady();

    // No `stubs: { ElementSidebar }` override here (unlike mountTable()), so Vue's own async-component
    // resolution runs against the vi.mock'd module above rather than being bypassed before it starts.
    const wrapper = mountComponent(PeriodicTable, {
      global: { plugins: [router, createHead()] },
      shallow: true,
    });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);
  });

  it('renders one cell per main + f-block element, plus the two lower empty cells, filters, and heatmap selector', async () => {
    const { wrapper } = await setup();

    expect(wrapper.findAllComponents(ElementCell)).toHaveLength(MAIN_ELEMENTS.length + F_BLOCK_ELEMENTS.length);
    expect(wrapper.findAllComponents(EmptyCell)).toHaveLength(2);
    expect(wrapper.findComponent(TableFilters).exists()).toBe(true);
    expect(wrapper.findComponent(HeatmapSelector).exists()).toBe(true);
  });

  it('selects the element from the initial route symbol and passes it to the sidebar', async () => {
    const { wrapper } = await setup('/element/fe');
    const sidebar = wrapper.findComponent(ElementSidebarStub);
    expect(sidebar.exists()).toBe(true);
    expect(sidebar.props('element')).toEqual(FE);
    const cells = wrapper.findAllComponents(ElementCell);
    const feCell = cells.find((c) => c.props('element').number === FE.number)!;
    expect(feCell.props('active')).toBe(true);
  });

  it('redirects to home when the route symbol matches no element', async () => {
    const router = createTestRouter();
    await router.push('/element/zz');
    await router.isReady();
    const replaceSpy = vi.spyOn(router, 'replace');

    mountTable(router);
    await router.isReady();

    expect(replaceSpy).toHaveBeenCalledWith({ name: 'home' });
  });

  it('normalizes a non-canonical symbol case in the route', async () => {
    const router = createTestRouter();
    await router.push('/element/FE');
    await router.isReady();
    const replaceSpy = vi.spyOn(router, 'replace');

    mountTable(router);
    await router.isReady();

    expect(replaceSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'fe' } });
  });

  it('clears the selection when the route has no symbol', async () => {
    const { wrapper } = await setup('/');
    expect(wrapper.findComponent(ElementSidebarStub).props('element')).toBeNull();
  });

  it('navigates to the element route on selecting a cell, or home when re-selecting the active one', async () => {
    const { wrapper, router } = await setup('/');
    const pushSpy = vi.spyOn(router, 'push');
    const cells = wrapper.findAllComponents(ElementCell);
    const feCell = cells.find((c) => c.props('element').number === FE.number)!;

    feCell.vm.$emit('select', FE);
    await wrapper.vm.$nextTick();
    expect(pushSpy).toHaveBeenCalledWith({ name: 'element', params: { symbol: 'fe' } });
  });

  it('navigates home when re-selecting the already-active element', async () => {
    const { wrapper, router } = await setup('/element/fe');
    const pushSpy = vi.spyOn(router, 'push');
    const cells = wrapper.findAllComponents(ElementCell);
    const feCell = cells.find((c) => c.props('element').number === FE.number)!;

    feCell.vm.$emit('select', FE);
    await wrapper.vm.$nextTick();
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' });
  });

  it('navigates home when the sidebar emits close', async () => {
    const { wrapper, router } = await setup('/element/fe');
    const pushSpy = vi.spyOn(router, 'push');

    wrapper.findComponent(ElementSidebarStub).vm.$emit('close');
    await wrapper.vm.$nextTick();
    expect(pushSpy).toHaveBeenCalledWith({ name: 'home' });
  });

  it('persists the selected category to sessionStorage and restores it on next mount', async () => {
    const { wrapper } = await setup('/');
    const filters = wrapper.findComponent(TableFilters);

    filters.vm.$emit('update:selectedCategory', 'transition');
    await wrapper.vm.$nextTick();
    expect(sessionStorage.getItem('periodic-table-category')).toBe('transition');

    const { wrapper: wrapper2 } = await setup('/');
    expect(wrapper2.findComponent(TableFilters).props('selectedCategory')).toBe('transition');
  });

  it('clears the stored category when reset to "all"', async () => {
    sessionStorage.setItem('periodic-table-category', 'transition');
    const { wrapper } = await setup('/');

    wrapper.findComponent(TableFilters).vm.$emit('update:selectedCategory', 'all');
    await wrapper.vm.$nextTick();
    expect(sessionStorage.getItem('periodic-table-category')).toBeNull();
  });

  it('persists the selected heatmap to sessionStorage and restores it on next mount', async () => {
    const { wrapper } = await setup('/');
    const heatmapSelector = wrapper.findComponent(HeatmapSelector);

    heatmapSelector.vm.$emit('update:selectedHeatmap', 'atomicMass');
    await wrapper.vm.$nextTick();
    expect(sessionStorage.getItem('periodic-table-heatmap')).toBe('atomicMass');

    const { wrapper: wrapper2 } = await setup('/');
    expect(wrapper2.findComponent(HeatmapSelector).props('selectedHeatmap')).toBe('atomicMass');
  });

  it('adds the heatmap-active class and passes intensity/hint/cell-value once a heatmap is selected', async () => {
    sessionStorage.setItem('periodic-table-heatmap', 'atomicMass');
    const { wrapper } = await setup('/');

    expect(wrapper.classes()).toContain('periodic-table--heatmap');
    const feCell = wrapper.findAllComponents(ElementCell).find((c) => c.props('element').number === FE.number)!;
    expect(feCell.props('heatmapIntensity')).toBe(0.5);
    expect(feCell.props('heatmapCellValue')).toBe('55.85');
    expect(feCell.props('heatmapHint')).toContain('55.85');

    const hCell = wrapper.findAllComponents(ElementCell).find((c) => c.props('element').number === H.number)!;
    expect(hCell.props('heatmapIntensity')).toBeNull();
    expect(hCell.props('heatmapHint')).toBeDefined();
  });

  it('falls back to the raw id and no unit suffix when the selected heatmap id matches no known definition', async () => {
    const { wrapper } = await setup('/');
    const heatmapSelector = wrapper.findComponent(HeatmapSelector);

    heatmapSelector.vm.$emit('update:selectedHeatmap', 'unknownId');
    await wrapper.vm.$nextTick();

    const feCell = wrapper.findAllComponents(ElementCell).find((c) => c.props('element').number === FE.number)!;
    expect(feCell.props('heatmapHint')).toBe('unknownId: 55.85');
  });

  it('marks a cell as a column head only for the top-most element in its column', async () => {
    const { wrapper } = await setup('/');
    const cells = wrapper.findAllComponents(ElementCell);
    const heCell = cells.find((c) => c.props('element').number === HE.number)!;
    const feCell = cells.find((c) => c.props('element').number === FE.number)!;

    expect(heCell.props('showGroup')).toBe(true);
    expect(feCell.props('showGroup')).toBe(true);
  });

  it('highlights only the periods/groups matching the active category filter', async () => {
    sessionStorage.setItem('periodic-table-category', 'transition');
    const { wrapper } = await setup('/');
    const cells = wrapper.findAllComponents(ElementCell);

    const feCell = cells.find((c) => c.props('element').number === FE.number)!;
    const hCell = cells.find((c) => c.props('element').number === H.number)!;

    expect(feCell.props('axisPeriodHighlighted')).toBe(true);
    expect(feCell.props('axisGroupHighlighted')).toBe(true);
    expect(hCell.props('axisPeriodHighlighted')).toBe(false);
    expect(hCell.props('axisGroupHighlighted')).toBe(false);
  });

  it('highlights the collection-owning element only when the collection filter is active', async () => {
    sessionStorage.setItem('periodic-table-category', 'collection');
    const { wrapper } = await setup('/');
    const cells = wrapper.findAllComponents(ElementCell);

    const feCell = cells.find((c) => c.props('element').number === FE.number)!;
    const hCell = cells.find((c) => c.props('element').number === H.number)!;

    expect(feCell.props('axisPeriodHighlighted')).toBe(true);
    expect(hCell.props('axisPeriodHighlighted')).toBe(false);
  });

  it('highlights the f-block period/group label only for a category present among lanthanides/actinides', async () => {
    sessionStorage.setItem('periodic-table-category', 'lanthanides');
    const { wrapper } = await setup('/');

    const laCell = wrapper.findAllComponents(ElementCell).find((c) => c.props('element').number === 57)!;
    expect(laCell.props('axisPeriodHighlighted')).toBe(true);
    expect(wrapper.find('.periodic-table__f-group-label').classes()).not.toContain(
      'periodic-table__f-group-label--dimmed',
    );
  });

  it('dims the f-block group label when the active category matches no lanthanide/actinide', async () => {
    sessionStorage.setItem('periodic-table-category', 'transition');
    const { wrapper } = await setup('/');

    expect(wrapper.find('.periodic-table__f-group-label').classes()).toContain('periodic-table__f-group-label--dimmed');
  });

  it('does not highlight/dim anything when the category filter is "all"', async () => {
    const { wrapper } = await setup('/');
    const cells = wrapper.findAllComponents(ElementCell);
    expect(cells.every((c) => c.props('axisPeriodHighlighted') === true)).toBe(true);
    expect(cells.every((c) => c.props('axisGroupHighlighted') === true)).toBe(true);
  });
});
