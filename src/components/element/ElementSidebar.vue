<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, toRef, useTemplateRef, watch } from 'vue';
import type { Element } from '../../types/element/element';
import type { DetailSection } from '../../types/element/section';
import { useLocale } from '../../locales';
import { useTheme } from '../../theme';
import { COLLECTION_COLOR, RADIOACTIVE_COLOR, WEAK_RADIOACTIVE_COLOR } from '../../theme/colors';
import { useElementDetail } from '../../composables/useElementDetail';
import {
  getElementImageUrl,
  getElementRouteSymbol,
  getGridStructureImageUrlByNum,
  hasElementImage,
  isElementRadioactive,
  isElementWeaklyRadioactive,
} from '../../data';
import { siteTitle, siteUrl } from '../../data/collection';
import { resolveLocalizedLabel } from '../../utils/localizedLabel';
import { buildElementSections, isSectionEmpty, parseOxidationStates } from '../../utils/element/detailSections';
import { buildGhsDisplay, buildNfpaDisplay, formatElementSymbol } from '../../utils/element/formatters';
import { formatDecayChainHtml, formatIsotopeHtml } from '../../utils/element/isotopes';
import { getWikipediaUrl } from '../../utils/external-links/wikipedia';
import { getYouTubeUrl } from '../../utils/external-links/youtube';
import wikiIconWhite from '../../assets/wiki-icon.svg';
import wikiIconDark from '../../assets/wiki-icon-dark.svg';
import youtubeIcon from '../../assets/youtube-icon.svg';
import youtubeIconWhite from '../../assets/youtube-icon-white.svg';
import CollapsibleSection from '../common/CollapsibleSection.vue';
import DrawerShell from '../common/DrawerShell.vue';
import Badge from '../common/Badge.vue';
import ElementSidebarPropList from './ElementSidebarPropList.vue';
import ElementSidebarGridSection from './ElementSidebarGridSection.vue';
import ElementSidebarNfpaSection from './ElementSidebarNfpaSection.vue';
import ElementSidebarGhsSection from './ElementSidebarGhsSection.vue';
import ElementSidebarOverviewSection from './ElementSidebarOverviewSection.vue';
import ElementSidebarMiningSection from './ElementSidebarMiningSection.vue';
import ElementCollectionHistoryModal from './ElementCollectionHistoryModal.vue';

const props = defineProps<{
  element: Element | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { tElement, tLegend, tSidebar, formatMass, messages, locale } = useLocale();
const { resolvedTheme } = useTheme();
const { detail, error } = useElementDetail(toRef(props, 'element'));

const isOpen = computed(() => props.element !== null);

const displaySymbol = computed(() => {
  if (!props.element) return '';
  return formatElementSymbol(props.element.symbol);
});

const elementName = computed(() => {
  void locale.value;
  return props.element ? tElement(props.element.number) : '';
});

const spectrumOriginHtml = computed(() => {
  const el = props.element;
  if (!el) return '';
  const radioactive = el.collection?.radioactive;
  return (
    formatDecayChainHtml(el.symbol, radioactive?.isotope, radioactive?.decayParent) ||
    formatIsotopeHtml(el.symbol, radioactive?.isotope)
  );
});

const elementMass = computed(() => {
  if (!props.element) return '';
  const mass = detail.value?.properties?.atomicMass ?? props.element.mass;
  void locale.value;
  return formatMass(mass);
});

const categoryLabel = computed(() => {
  void locale.value;
  return props.element ? tLegend(props.element.category) : '';
});

const overview = computed(() => detail.value?.overview);

const isRadioactive = computed(() => (props.element ? isElementRadioactive(props.element.number) : false));

const isWeaklyRadioactive = computed(() => (props.element ? isElementWeaklyRadioactive(props.element.number) : false));

const isInCollection = computed(() => props.element?.inCollection ?? false);

function gridSectionImageUrl(section: DetailSection): string | null {
  return getGridStructureImageUrlByNum(section.structureCode);
}

const nfpaDisplay = computed(() => {
  void locale.value;
  return buildNfpaDisplay(detail.value?.nucleus?.nfpaCube, locale.value);
});

const ghsDisplay = computed(() => {
  void locale.value;
  if (!props.element) return [];
  return buildGhsDisplay(props.element.number, locale.value);
});

const nfpaEmpty = {
  red: '',
  blue: '',
  yellow: '',
  white: '',
  whiteDiamond: '',
  whiteDiamondParts: [] as { type: 'text' | 'rad'; value: string }[],
  redLabel: '----',
  blueLabel: '----',
  yellowLabel: '----',
  whiteLabel: '----',
  whiteStrike: false,
};

const nfpaView = computed(() => nfpaDisplay.value ?? nfpaEmpty);

const sections = computed(() => {
  void locale.value;
  if (!detail.value || !props.element) return [];
  return buildElementSections(detail.value, props.element, messages.value, elementName.value, locale.value);
});

const oxidationStates = computed(() => parseOxidationStates(detail.value?.atomic?.oxidationState));

const imageUrl = computed(() => (props.element ? getElementImageUrl(props.element.number) : null));

const hasImage = computed(() => (props.element ? hasElementImage(props.element.number) : false));

const headerWikiIcon = computed(() => (resolvedTheme.value === 'dark' ? wikiIconWhite : wikiIconDark));

const headerYoutubeIcon = computed(() => (resolvedTheme.value === 'dark' ? youtubeIconWhite : youtubeIcon));

const wikipediaUrl = computed(() => {
  void locale.value;
  if (!props.element) return '';
  return getWikipediaUrl(props.element.number, locale.value, detail.value);
});

const youtubeUrl = computed(() => {
  void locale.value;
  if (!props.element) return '';
  return getYouTubeUrl(props.element.number, locale.value, detail.value);
});

const shareIconColor = computed(() => (resolvedTheme.value === 'dark' ? '#ffffff' : '#2f2f2f'));

const shareUrl = computed(() => {
  if (!props.element) return '';
  return `${siteUrl}/element/${getElementRouteSymbol(props.element.symbol)}`;
});

const shareCopied = ref(false);
let shareCopiedTimeout: ReturnType<typeof setTimeout> | undefined;

async function share(): Promise<void> {
  if (!props.element) return;
  const url = shareUrl.value;
  const title = `${elementName.value} (${displaySymbol.value}) — ${resolveLocalizedLabel(siteTitle, locale.value)}`;

  if (navigator.share) {
    try {
      await navigator.share({ title, url });
    } catch {
      // user dismissed the native share sheet — not an error
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(url);
  } catch {
    return;
  }
  shareCopied.value = true;
  clearTimeout(shareCopiedTimeout);
  shareCopiedTimeout = setTimeout(() => {
    shareCopied.value = false;
  }, 1500);
}

onBeforeUnmount(() => clearTimeout(shareCopiedTimeout));

const collapsedSections = ref<Set<string>>(new Set());
let lastCollapsedForElement: number | undefined;

const containerRef = useTemplateRef<HTMLElement>('containerRef');
const headerSentinelRef = useTemplateRef<HTMLElement>('headerSentinelRef');
const showStickyNav = ref(false);
let headerObserver: IntersectionObserver | null = null;

function disconnectHeaderObserver(): void {
  headerObserver?.disconnect();
  headerObserver = null;
}

function setupHeaderObserver(): void {
  disconnectHeaderObserver();
  showStickyNav.value = false;

  const root = containerRef.value;
  const sentinel = headerSentinelRef.value;
  if (!root || !sentinel) return;

  headerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry) showStickyNav.value = !entry.isIntersecting;
    },
    { root, threshold: 0 },
  );
  headerObserver.observe(sentinel);
}

watch(
  () => [props.element?.number, isOpen.value] as const,
  async ([num, open]) => {
    if (!open || !num) {
      showStickyNav.value = false;
      disconnectHeaderObserver();
      return;
    }
    await nextTick();
    containerRef.value?.scrollTo(0, 0);
    await nextTick(() => setupHeaderObserver());
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  disconnectHeaderObserver();
});

function applyDefaultCollapsedSections(): void {
  const num = props.element?.number;
  if (!num || !sections.value.length) return;

  collapsedSections.value = new Set(
    sections.value
      .filter((section) =>
        isSectionEmpty(section, {
          nfpaDisplay: nfpaDisplay.value,
          ghsDisplay: ghsDisplay.value,
          oxidationStates: oxidationStates.value,
          electronShellConfig: overview.value?.electronShellConfig,
          electronCount: overview.value?.electronCount,
          protonCount: overview.value?.protonCount,
          neutronCount: overview.value?.neutronCount,
        }),
      )
      .map((section) => section.sectionKey ?? section.id),
  );
}

watch(
  () => [props.element?.number, sections.value] as const,
  ([num, secs]) => {
    if (!num) {
      lastCollapsedForElement = undefined;
      collapsedSections.value = new Set();
      return;
    }
    if (!secs.length) return;
    if (num !== lastCollapsedForElement) {
      lastCollapsedForElement = num;
      applyDefaultCollapsedSections();
    }
  },
  { immediate: true },
);

function isSectionCollapsed(sectionKey: string): boolean {
  return collapsedSections.value.has(sectionKey);
}

function toggleSection(sectionKey: string): void {
  const next = new Set(collapsedSections.value);
  if (next.has(sectionKey)) next.delete(sectionKey);
  else next.add(sectionKey);
  collapsedSections.value = next;
}
</script>

<template>
  <DrawerShell panel-class="element-sidebar" :is-open="isOpen" :close-label="tSidebar('close')" @close="emit('close')">
    <div v-if="element" class="element-sidebar__shell">
      <div
        class="element-sidebar__sticky-nav"
        :class="{ 'element-sidebar__sticky-nav--visible': showStickyNav }"
        :style="{ backgroundColor: element.color }"
      >
        <button type="button" class="element-sidebar__back" :aria-label="tSidebar('close')" @click="emit('close')" />
        <div class="element-sidebar__sticky-identity">
          <span class="element-sidebar__sticky-name">{{ elementName }}</span>
          <div class="element-sidebar__sticky-symbol-row">
            <span class="element-sidebar__sticky-symbol">{{ displaySymbol }}</span>
            <span class="element-sidebar__sticky-number">{{ element.number }}</span>
          </div>
        </div>
        <div v-if="youtubeUrl || wikipediaUrl" class="element-sidebar__header-links element-sidebar__sticky-links">
          <a
            v-if="youtubeUrl"
            :href="youtubeUrl"
            class="element-sidebar__header-link"
            :aria-label="tSidebar('youtube')"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="element-sidebar__header-link-icon element-sidebar__header-link-icon--youtube"
              :src="youtubeIconWhite"
              alt=""
            />
          </a>
          <a
            v-if="wikipediaUrl"
            :href="wikipediaUrl"
            class="element-sidebar__header-link"
            :aria-label="tSidebar('wikipedia')"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img class="element-sidebar__header-link-icon" :src="wikiIconWhite" alt="" />
          </a>
          <button
            type="button"
            class="element-sidebar__header-link element-sidebar__header-link--share"
            :aria-label="shareCopied ? tSidebar('shareCopied') : tSidebar('share')"
            @click="share"
          >
            <svg
              v-if="!shareCopied"
              class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2v13" />
              <path d="m16 6-4-4-4 4" />
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            </svg>
            <svg
              v-else
              class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12l5 5L20 6" />
            </svg>
          </button>
        </div>
      </div>

      <div class="element-sidebar__container" ref="containerRef">
        <header class="element-sidebar__header" :class="{ 'element-sidebar__header--no-image': !hasImage }">
          <div
            class="element-sidebar__header-media"
            :style="!hasImage ? { backgroundColor: element.color } : undefined"
          >
            <img v-if="imageUrl" class="element-sidebar__image" :src="imageUrl" alt="" />
            <button
              type="button"
              class="element-sidebar__back element-sidebar__back--on-image"
              :aria-label="tSidebar('close')"
              @click="emit('close')"
            />
            <div v-if="youtubeUrl || wikipediaUrl" class="element-sidebar__header-links">
              <a
                v-if="youtubeUrl"
                :href="youtubeUrl"
                class="element-sidebar__header-link element-sidebar__header-link--on-image"
                :aria-label="tSidebar('youtube')"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  class="element-sidebar__header-link-icon element-sidebar__header-link-icon--youtube"
                  :src="headerYoutubeIcon"
                  alt=""
                />
              </a>
              <a
                v-if="wikipediaUrl"
                :href="wikipediaUrl"
                class="element-sidebar__header-link element-sidebar__header-link--on-image"
                :aria-label="tSidebar('wikipedia')"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img class="element-sidebar__header-link-icon" :src="headerWikiIcon" alt="" />
              </a>
              <button
                type="button"
                class="element-sidebar__header-link element-sidebar__header-link--on-image element-sidebar__header-link--share"
                :aria-label="shareCopied ? tSidebar('shareCopied') : tSidebar('share')"
                @click="share"
              >
                <svg
                  v-if="!shareCopied"
                  class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
                  viewBox="0 0 24 24"
                  fill="none"
                  :style="{ color: shareIconColor }"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v13" />
                  <path d="m16 6-4-4-4 4" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                </svg>
                <svg
                  v-else
                  class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
                  viewBox="0 0 24 24"
                  fill="none"
                  :style="{ color: shareIconColor }"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12l5 5L20 6" />
                </svg>
              </button>
            </div>
          </div>

          <div ref="headerSentinelRef" class="element-sidebar__header-sentinel" aria-hidden="true" />

          <div class="element-sidebar__header-info" :style="{ '--accent': element.color }">
            <div class="element-sidebar__header-main">
              <h2 class="element-sidebar__name">{{ elementName }}</h2>
              <div class="element-sidebar__symbol-row">
                <span class="element-sidebar__symbol">{{ displaySymbol }}</span>
                <span class="element-sidebar__symbol-number">{{ element.number }}</span>
              </div>
              <p class="element-sidebar__mass">
                {{ elementMass }}
                <span>{{ tSidebar('massUnit') }}</span>
              </p>
            </div>
            <div class="element-sidebar__header-badges">
              <Badge :color="element.color">{{ categoryLabel }}</Badge>
              <Badge v-if="isRadioactive" :color="isWeaklyRadioactive ? WEAK_RADIOACTIVE_COLOR : RADIOACTIVE_COLOR">
                {{ isWeaklyRadioactive ? tSidebar('weakRadioactiveBadge') : tSidebar('radioactiveBadge') }}
              </Badge>
              <Badge v-if="isInCollection" :color="COLLECTION_COLOR">
                {{ tSidebar('collectionBadge') }}
              </Badge>
            </div>
          </div>
        </header>

        <div v-if="error" class="element-sidebar__error">{{ tSidebar('error') }}</div>

        <div v-if="detail" class="element-sidebar__body">
          <CollapsibleSection
            v-for="section in sections"
            :key="section.sectionKey ?? section.id"
            class="element-sidebar__section"
            :title="section.title"
            :accent-color="section.color"
            :collapsed="isSectionCollapsed(section.sectionKey ?? section.id)"
            @update:collapsed="toggleSection(section.sectionKey ?? section.id)"
          >
            <template v-if="section.id === 'collection'" #action>
              <ElementCollectionHistoryModal
                :element="element"
                :element-name="elementName"
                :display-symbol="displaySymbol"
                :accent-color="section.color"
              />
            </template>

            <ElementSidebarPropList
              v-if="section.id !== 'grid' && section.id !== 'nfpa' && section.id !== 'ghs' && section.id !== 'mining'"
              :section="section"
              :element="element"
              :display-symbol="displaySymbol"
              :element-name="elementName"
              :spectrum-origin-html="spectrumOriginHtml"
              :oxidation-states="oxidationStates"
            />

            <ElementSidebarGridSection
              v-if="section.id === 'grid'"
              :section="section"
              :image-url="gridSectionImageUrl(section)"
            />

            <ElementSidebarNfpaSection
              v-if="section.id === 'nfpa'"
              :nfpa-view="nfpaView"
              :has-diamond="Boolean(nfpaDisplay)"
            />

            <ElementSidebarGhsSection v-if="section.id === 'ghs'" :items="ghsDisplay" />

            <ElementSidebarOverviewSection
              v-if="section.id === 'overview'"
              :shell="overview?.electronShellConfig"
              :accent-color="element.color"
              :electrons="overview?.electronCount"
              :protons="overview?.protonCount"
              :neutrons="overview?.neutronCount"
            />

            <ElementSidebarMiningSection
              v-if="section.id === 'mining'"
              :countries="section.miningCountries ?? []"
              :note="section.miningNote ?? ''"
            />
          </CollapsibleSection>
        </div>
      </div>
    </div>
  </DrawerShell>
</template>

<style scoped>
.element-sidebar__sticky-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 64px;
  padding: 8px 12px;
  color: #fff;
  opacity: 0;
  transform: translateY(-100%);
  pointer-events: none;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    box-shadow 0.2s ease;
}

.element-sidebar__sticky-nav--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

.element-sidebar__sticky-identity {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
}

.element-sidebar__sticky-name {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.95;
}

.element-sidebar__sticky-symbol-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.element-sidebar__sticky-symbol {
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.02em;
}

.element-sidebar__sticky-number {
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  opacity: 0.88;
}

.element-sidebar__sticky-nav .element-sidebar__back {
  position: static;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-size: 16px;
}

.element-sidebar__sticky-nav .element-sidebar__sticky-links {
  position: static;
  flex-shrink: 0;
  margin-left: 0;
}

.element-sidebar__sticky-nav .element-sidebar__header-link {
  width: 32px;
  height: 32px;
}

.element-sidebar__sticky-nav .element-sidebar__header-link-icon {
  width: 18px;
  height: 18px;
}

.element-sidebar__sticky-nav .element-sidebar__header-link-icon--youtube {
  width: 17px;
  height: 17px;
}

.element-sidebar__sticky-nav .element-sidebar__header-link-icon--share {
  width: 14px;
  height: 14px;
  color: #fff;
}

.element-sidebar__header-sentinel {
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.element-sidebar__shell {
  position: relative;
  height: 100%;
}

.element-sidebar__container {
  height: 100%;
  overflow-y: auto;
}

.element-sidebar__header {
  border-bottom: 1px solid var(--color-border-light);
}

.element-sidebar__header-media {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.element-sidebar__header--no-image .element-sidebar__header-media {
  height: 52px;
}

.element-sidebar__header--no-image .element-sidebar__back {
  top: 10px;
  left: 12px;
  width: 32px;
  height: 32px;
  background-size: 16px;
}

.element-sidebar__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.element-sidebar__header-info {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 12px;
  align-items: start;
  padding: 16px 20px 18px;
  background: var(--color-bg);
  border-top: 3px solid var(--accent, #ccc);
}

.element-sidebar__header-main {
  min-width: 0;
}

.element-sidebar__header-badges {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.element-sidebar__name {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text);
}

.element-sidebar__back {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E")
    center / 18px no-repeat;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;
}

.element-sidebar__back--on-image {
  background-color: var(--color-surface-on-image);
  background-image: none;
  box-shadow: 0 2px 8px var(--color-shadow-lg);
}

.element-sidebar__back--on-image::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: var(--color-icon-on-surface);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E")
    center / 18px no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E")
    center / 18px no-repeat;
}

.element-sidebar__back:hover {
  transform: scale(1.05);
}

.element-sidebar__back--on-image:hover {
  background-color: var(--color-bg-elevated);
}

.element-sidebar__header--no-image .element-sidebar__header-links {
  top: 10px;
  right: 12px;
}

.element-sidebar__header--no-image .element-sidebar__header-link {
  width: 32px;
  height: 32px;
}

.element-sidebar__header--no-image .element-sidebar__header-link-icon {
  width: 18px;
  height: 18px;
}

.element-sidebar__header-links {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.element-sidebar__header-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  box-shadow: none;
  font: inherit;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;
}

.element-sidebar__header-link-icon {
  width: 22px;
  height: 22px;
  display: block;
}

.element-sidebar__header-link-icon--youtube {
  width: 20px;
  height: 20px;
}

.element-sidebar__header-link-icon--share {
  width: 17px;
  height: 17px;
}

.element-sidebar__header--no-image .element-sidebar__header-link-icon--youtube {
  width: 17px;
  height: 17px;
}

.element-sidebar__header--no-image .element-sidebar__header-link-icon--share {
  width: 15px;
  height: 15px;
}

.element-sidebar__header-link--on-image {
  background-color: var(--color-surface-on-image);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.element-sidebar__header-link:hover {
  transform: scale(1.05);
}

.element-sidebar__header-link--on-image:hover {
  background-color: var(--color-bg-elevated);
}

.element-sidebar__symbol-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 2px 0 6px;
}

.element-sidebar__symbol {
  font-size: 64px;
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: 0.02em;
  color: var(--color-text);
}

.element-sidebar__symbol-number {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text-secondary);
  padding-bottom: 6px;
}

.element-sidebar__mass {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.element-sidebar__mass span {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-secondary);
}

.element-sidebar__error {
  padding: 20px 24px;
  color: var(--color-error);
  font-size: 14px;
}

.element-sidebar__body {
  padding: 8px 0 32px;
}

.element-sidebar__section {
  padding: 0 24px;
  /* Read by CollapsibleSection's own .collapsible-section__title rule — CSS custom properties inherit
     through the DOM regardless of style scoping, so this reaches the child without :deep(). */
  --collapsible-section-title-margin: 20px 0 12px;
  --collapsible-section-title-margin-bottom-collapsed: 20px;
}

.element-sidebar__section + .element-sidebar__section {
  margin-top: 8px;
}

@media (max-width: 900px) {
  .element-sidebar__symbol {
    font-size: 52px;
  }

  .element-sidebar__name {
    font-size: 20px;
  }
}
</style>

<style>
/* Same DrawerShell/Teleport issue as CollectionPanel.vue's own trailing unscoped block — see the comment there. */
@media (max-width: 900px) and (orientation: portrait) {
  .drawer-shell.element-sidebar {
    width: 100vw;
    left: 0;
    right: 0;
    border-left: none;
    box-shadow: none;
  }
}
</style>
