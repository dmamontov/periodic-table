<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, toRef, watch } from 'vue'
import type { Element } from '../types/element'
import type { DetailSection } from '../types/elementDetail'
import { useLocale } from '../locales'
import { useTheme } from '../theme'
import { useElementDetail } from '../composables/useElementDetail'
import { getElementImageUrl, getGridStructureImageUrlByNum, hasElementImage, isElementRadioactive, isElementWeaklyRadioactive } from '../data'
import {
  buildElementSections,
  isSectionEmpty,
  parseOxidationStates,
} from '../utils/elementDetailSections'
import { buildGhsDisplay, buildNfpaDisplay, formatElementSymbol } from '../utils/elementFormatters'
import { formatDecayChainHtml, formatIsotopeHtml } from '../utils/elementIsotopes'
import { getWikipediaUrl } from '../utils/wikipedia'
import { getYouTubeUrl } from '../utils/youtube'
import wikiIconWhite from '../assets/wiki-icon.svg'
import wikiIconDark from '../assets/wiki-icon-dark.svg'
import youtubeIcon from '../assets/youtube-icon.svg'
import youtubeIconWhite from '../assets/youtube-icon-white.svg'
import ElectronShell from './ElectronShell.vue'
import CollectionGammaSpectrum from './CollectionGammaSpectrum.vue'
import ElementMiniTable from './ElementMiniTable.vue'
import GhsPictogram from './GhsPictogram.vue'
import RadiationIcon from './RadiationIcon.vue'

const props = defineProps<{
  element: Element | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { tElement, tLegend, tSidebar, formatMass, messages, locale } = useLocale()
const { resolvedTheme } = useTheme()
const { detail, error } = useElementDetail(toRef(props, 'element'))

const isOpen = computed(() => props.element !== null)

const displaySymbol = computed(() => {
  if (!props.element) return ''
  return formatElementSymbol(props.element.symbol)
})

const elementName = computed(() => {
  void locale.value
  return props.element ? tElement(props.element.number) : ''
})

const spectrumOriginHtml = computed(() => {
  const el = props.element
  if (!el) return ''
  return (
    formatDecayChainHtml(el.symbol, el.collection?.isotope, el.collection?.decayParent) ||
    formatIsotopeHtml(el.symbol, el.collection?.isotope)
  )
})

const elementMass = computed(() => {
  if (!props.element) return ''
  const mass = detail.value?.PropertiesCommon?.elementMasse ?? props.element.mass
  void locale.value
  return formatMass(mass)
})

const categoryLabel = computed(() => {
  void locale.value
  return props.element ? tLegend(props.element.category) : ''
})

const overview = computed(() => detail.value?.OverviewCommon)

const isRadioactive = computed(() =>
  props.element ? isElementRadioactive(props.element.number) : false,
)

const isWeaklyRadioactive = computed(() =>
  props.element ? isElementWeaklyRadioactive(props.element.number) : false,
)

const isInCollection = computed(() => props.element?.inCollection ?? false)

function gridSectionImageUrl(section: DetailSection): string | null {
  return getGridStructureImageUrlByNum(section.gridStructureNum)
}

const nfpaDisplay = computed(() => {
  void locale.value
  return buildNfpaDisplay(detail.value?.NucleusPro?.nfpaCube, locale.value)
})

const ghsDisplay = computed(() => {
  void locale.value
  if (!props.element) return []
  return buildGhsDisplay(props.element.number, locale.value)
})

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
}

const nfpaView = computed(() => nfpaDisplay.value ?? nfpaEmpty)

const sections = computed(() => {
  void locale.value
  if (!detail.value || !props.element) return []
  return buildElementSections(
    detail.value,
    props.element,
    messages.value,
    elementName.value,
    locale.value,
  )
})

const oxidationStates = computed(() =>
  parseOxidationStates(detail.value?.AtomicCommon?.oxidationState),
)

const imageUrl = computed(() =>
  props.element ? getElementImageUrl(props.element.number) : null,
)

const hasImage = computed(() =>
  props.element ? hasElementImage(props.element.number) : false,
)

const headerWikiIcon = computed(() =>
  resolvedTheme.value === 'dark' ? wikiIconWhite : wikiIconDark,
)

const headerYoutubeIcon = computed(() =>
  resolvedTheme.value === 'dark' ? youtubeIconWhite : youtubeIcon,
)

const wikipediaUrl = computed(() => {
  void locale.value
  if (!props.element) return ''
  return getWikipediaUrl(props.element.number, locale.value, detail.value)
})

const youtubeUrl = computed(() => {
  void locale.value
  if (!props.element) return ''
  return getYouTubeUrl(props.element.number, locale.value, detail.value)
})

const collapsedSections = ref<Set<string>>(new Set())
let lastCollapsedForElement: number | undefined

const containerRef = ref<HTMLElement | null>(null)
const headerSentinelRef = ref<HTMLElement | null>(null)
const showStickyNav = ref(false)
let headerObserver: IntersectionObserver | null = null

function disconnectHeaderObserver(): void {
  headerObserver?.disconnect()
  headerObserver = null
}

function setupHeaderObserver(): void {
  disconnectHeaderObserver()
  showStickyNav.value = false

  const root = containerRef.value
  const sentinel = headerSentinelRef.value
  if (!root || !sentinel) return

  headerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry) showStickyNav.value = !entry.isIntersecting
    },
    { root, threshold: 0 },
  )
  headerObserver.observe(sentinel)
}

watch(
  () => [props.element?.number, isOpen.value] as const,
  async ([num, open]) => {
    if (!open || !num) {
      showStickyNav.value = false
      disconnectHeaderObserver()
      return
    }
    await nextTick()
    containerRef.value?.scrollTo(0, 0)
    await nextTick(() => setupHeaderObserver())
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  disconnectHeaderObserver()
})

function applyDefaultCollapsedSections(): void {
  const num = props.element?.number
  if (!num || !sections.value.length) return

  collapsedSections.value = new Set(
    sections.value
      .filter((section) =>
        isSectionEmpty(section, {
          nfpaDisplay: nfpaDisplay.value,
          ghsDisplay: ghsDisplay.value,
          oxidationStates: oxidationStates.value,
          elementShell: overview.value?.elementShell,
          elementE: overview.value?.elementE,
          elementP: overview.value?.elementP,
          elementN: overview.value?.elementN,
        }),
      )
      .map((section) => section.sectionKey ?? section.id),
  )
}

watch(
  () => [props.element?.number, sections.value] as const,
  ([num, secs]) => {
    if (!num) {
      lastCollapsedForElement = undefined
      collapsedSections.value = new Set()
      return
    }
    if (!secs.length) return
    if (num !== lastCollapsedForElement) {
      lastCollapsedForElement = num
      applyDefaultCollapsedSections()
    }
  },
  { immediate: true },
)

function isSectionCollapsed(sectionKey: string): boolean {
  return collapsedSections.value.has(sectionKey)
}

function toggleSection(sectionKey: string): void {
  const next = new Set(collapsedSections.value)
  if (next.has(sectionKey)) next.delete(sectionKey)
  else next.add(sectionKey)
  collapsedSections.value = next
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sidebar-backdrop">
      <button
        v-if="isOpen"
        type="button"
        class="element-sidebar__backdrop"
        :aria-label="tSidebar('close')"
        @click="emit('close')"
      />
    </Transition>

    <aside
      class="element-sidebar"
      :class="{ 'element-sidebar--open': isOpen }"
      :aria-hidden="!isOpen"
    >
      <div v-if="element" class="element-sidebar__shell">
        <div
          class="element-sidebar__sticky-nav"
          :class="{ 'element-sidebar__sticky-nav--visible': showStickyNav }"
          :style="{ backgroundColor: element.color }"
        >
          <button
            type="button"
            class="element-sidebar__back"
            :aria-label="tSidebar('close')"
            @click="emit('close')"
          />
          <div class="element-sidebar__sticky-identity">
            <span class="element-sidebar__sticky-name">{{ elementName }}</span>
            <div class="element-sidebar__sticky-symbol-row">
              <span class="element-sidebar__sticky-symbol">{{ displaySymbol }}</span>
              <span class="element-sidebar__sticky-number">{{ element.number }}</span>
            </div>
          </div>
          <div
            v-if="youtubeUrl || wikipediaUrl"
            class="element-sidebar__header-links element-sidebar__sticky-links"
          >
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
              <img
                class="element-sidebar__header-link-icon"
                :src="wikiIconWhite"
                alt=""
              />
            </a>
          </div>
        </div>

        <div class="element-sidebar__container" ref="containerRef">
        <header
          class="element-sidebar__header"
          :class="{ 'element-sidebar__header--no-image': !hasImage }"
        >
          <div
            class="element-sidebar__header-media"
            :style="!hasImage ? { backgroundColor: element.color } : undefined"
          >
            <img
              v-if="imageUrl"
              class="element-sidebar__image"
              :src="imageUrl"
              alt=""
            />
            <button
              type="button"
              class="element-sidebar__back element-sidebar__back--on-image"
              :aria-label="tSidebar('close')"
              @click="emit('close')"
            />
            <div
              v-if="youtubeUrl || wikipediaUrl"
              class="element-sidebar__header-links"
            >
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
                <img
                  class="element-sidebar__header-link-icon"
                  :src="headerWikiIcon"
                  alt=""
                />
              </a>
            </div>
          </div>

          <div ref="headerSentinelRef" class="element-sidebar__header-sentinel" aria-hidden="true" />

          <div
            class="element-sidebar__header-info"
            :style="{ '--accent': element.color }"
          >
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
              <span
                class="element-sidebar__category"
                :style="{ backgroundColor: element.color }"
              >
                {{ categoryLabel }}
              </span>
              <span
                v-if="isRadioactive"
                class="element-sidebar__radioactive-badge"
                :class="{ 'element-sidebar__radioactive-badge--weak': isWeaklyRadioactive }"
              >
                {{ isWeaklyRadioactive ? tSidebar('weakRadioactiveBadge') : tSidebar('radioactiveBadge') }}
              </span>
              <span
                v-if="isInCollection"
                class="element-sidebar__collection-badge"
              >
                {{ tSidebar('collectionBadge') }}
              </span>
            </div>
          </div>
        </header>

        <div v-if="error" class="element-sidebar__error">{{ tSidebar('error') }}</div>

        <div v-if="detail" class="element-sidebar__body">
          <section
            v-for="section in sections"
            :key="section.sectionKey ?? section.id"
            class="element-sidebar__section"
            :class="{ 'element-sidebar__section--collapsed': isSectionCollapsed(section.sectionKey ?? section.id) }"
          >
            <button
              type="button"
              class="element-sidebar__section-title"
              :style="{ borderColor: section.color }"
              :aria-expanded="!isSectionCollapsed(section.sectionKey ?? section.id)"
              @click="toggleSection(section.sectionKey ?? section.id)"
            >
              <span>{{ section.title }}</span>
              <span class="element-sidebar__section-chevron" aria-hidden="true" />
            </button>

            <div
              v-show="!isSectionCollapsed(section.sectionKey ?? section.id)"
              class="element-sidebar__section-body"
            >
            <ul v-if="section.id !== 'grid' && section.id !== 'nfpa' && section.id !== 'ghs'" class="element-sidebar__props">
              <template v-for="(item, idx) in section.items" :key="`${section.sectionKey ?? section.id}-${idx}`">
                <li
                  v-if="item.kind === 'miniTable'"
                  class="element-sidebar__prop element-sidebar__prop--mini-table"
                >
                  <ElementMiniTable
                    v-if="element"
                    :selected-number="element.number"
                  />
                </li>
                <li
                  v-else
                  class="element-sidebar__prop"
                  :class="{
                    'element-sidebar__prop--empty': item.empty,
                    'element-sidebar__prop--text': !item.label,
                  }"
                >
                <span v-if="item.label" class="element-sidebar__prop-label">{{ item.label }}</span>
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  :alt="item.label"
                  class="element-sidebar__spectrum-image"
                />
                <CollectionGammaSpectrum
                  v-else-if="item.collectionSpectrumId"
                  :spectrum-id="item.collectionSpectrumId"
                  :accent-color="element.color"
                  :element-symbol="displaySymbol"
                  :element-name="elementName"
                  :origin-html="spectrumOriginHtml"
                  class="element-sidebar__collection-spectrum"
                />
                <div
                  v-else-if="item.colorHex"
                  class="element-sidebar__color-swatch"
                  :class="`element-sidebar__color-swatch--${item.colorFinish ?? 'metallic'}`"
                  :style="{ backgroundColor: item.colorHex }"
                />
                <span
                  v-else-if="item.html"
                  class="element-sidebar__prop-value"
                  v-html="item.value"
                />
                <a
                  v-else-if="item.href"
                  :href="item.href"
                  class="element-sidebar__prop-value element-sidebar__prop-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item.value }}
                </a>
                <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
              </li>
              </template>

              <li
                v-if="section.id === 'atomic' && oxidationStates"
                class="element-sidebar__prop"
              >
                <span class="element-sidebar__prop-label">{{ tSidebar('oxidationStates') }}</span>
                <div class="element-sidebar__oxidation">
                  <ul class="element-sidebar__oxidation-row element-sidebar__oxidation-row--negative">
                    <li
                      v-for="(cell, oi) in oxidationStates.negative"
                      :key="`n-${oi}`"
                      class="element-sidebar__oxidation-item"
                      :class="`element-sidebar__oxidation-item--${cell.variant}`"
                    >
                      {{ cell.label === '-' ? '−' : cell.label }}
                    </li>
                  </ul>
                  <ul class="element-sidebar__oxidation-row element-sidebar__oxidation-row--positive">
                    <li
                      v-for="(cell, oi) in oxidationStates.positive"
                      :key="`p-${oi}`"
                      class="element-sidebar__oxidation-item"
                      :class="`element-sidebar__oxidation-item--${cell.variant}`"
                    >
                      {{ cell.label === '-' ? '−' : cell.label }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <template v-if="section.id === 'grid'">
              <div class="element-sidebar__grid-layout">
                <ul class="element-sidebar__props element-sidebar__props--grid">
                  <li
                    v-for="(item, idx) in section.items.slice(0, 3)"
                    :key="`grid-${section.sectionKey ?? section.id}-${idx}`"
                    class="element-sidebar__prop element-sidebar__prop--grid"
                    :class="{ 'element-sidebar__prop--empty': item.empty }"
                  >
                    <span class="element-sidebar__prop-label">{{ item.label }}</span>
                    <span
                      v-if="item.html"
                      class="element-sidebar__prop-value"
                      v-html="item.value"
                    />
                    <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
                  </li>
                </ul>
                <img
                  v-if="gridSectionImageUrl(section)"
                  :src="gridSectionImageUrl(section)!"
                  :alt="section.items[0]?.value ?? ''"
                  class="element-sidebar__grid-image"
                />
              </div>
              <ul
                v-if="section.items.slice(3).length"
                class="element-sidebar__props"
              >
                <li
                  v-for="(item, idx) in section.items.slice(3)"
                  :key="`grid-extra-${section.sectionKey ?? section.id}-${idx}`"
                  class="element-sidebar__prop"
                  :class="{ 'element-sidebar__prop--empty': item.empty }"
                >
                  <span class="element-sidebar__prop-label">{{ item.label }}</span>
                  <span
                    v-if="item.html"
                    class="element-sidebar__prop-value"
                    v-html="item.value"
                  />
                  <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
                </li>
              </ul>
            </template>

            <template v-if="section.id === 'nfpa'">
              <div class="element-sidebar__nfpa-layout">
                <ul class="element-sidebar__props element-sidebar__props--nfpa">
                  <li
                    class="element-sidebar__prop element-sidebar__prop--nfpa element-sidebar__prop--nfpa-red"
                    :class="{ 'element-sidebar__prop--empty': nfpaView.redLabel === '----' }"
                  >
                    <span class="element-sidebar__prop-label">{{ tSidebar('nfpaFire') }}</span>
                    <span class="element-sidebar__prop-value">{{ nfpaView.redLabel }}</span>
                  </li>
                  <li
                    class="element-sidebar__prop element-sidebar__prop--nfpa element-sidebar__prop--nfpa-blue"
                    :class="{ 'element-sidebar__prop--empty': nfpaView.blueLabel === '----' }"
                  >
                    <span class="element-sidebar__prop-label">{{ tSidebar('nfpaHealth') }}</span>
                    <span class="element-sidebar__prop-value">{{ nfpaView.blueLabel }}</span>
                  </li>
                  <li
                    class="element-sidebar__prop element-sidebar__prop--nfpa element-sidebar__prop--nfpa-yellow"
                    :class="{ 'element-sidebar__prop--empty': nfpaView.yellowLabel === '----' }"
                  >
                    <span class="element-sidebar__prop-label">{{ tSidebar('nfpaReactivity') }}</span>
                    <span class="element-sidebar__prop-value">{{ nfpaView.yellowLabel }}</span>
                  </li>
                  <li
                    class="element-sidebar__prop element-sidebar__prop--nfpa element-sidebar__prop--nfpa-white"
                    :class="{ 'element-sidebar__prop--empty': nfpaView.whiteLabel === '----' }"
                  >
                    <span class="element-sidebar__prop-label">{{ tSidebar('nfpaSpecial') }}</span>
                    <span class="element-sidebar__prop-value">{{ nfpaView.whiteLabel }}</span>
                  </li>
                </ul>
                <div v-if="nfpaDisplay" class="element-sidebar__diamond-wrap">
                  <div
                    class="element-sidebar__diamond"
                    :aria-label="tSidebar('nfpaDiamond')"
                  >
                    <div class="element-sidebar__diamond-item element-sidebar__diamond-item--red">
                      <span>{{ nfpaView.red }}</span>
                    </div>
                    <div class="element-sidebar__diamond-item element-sidebar__diamond-item--yellow">
                      <span>{{ nfpaView.yellow }}</span>
                    </div>
                    <div class="element-sidebar__diamond-item element-sidebar__diamond-item--blue">
                      <span>{{ nfpaView.blue }}</span>
                    </div>
                    <div class="element-sidebar__diamond-item element-sidebar__diamond-item--white">
                      <span class="element-sidebar__diamond-white-inner">
                        <template
                          v-for="(part, index) in nfpaView.whiteDiamondParts"
                          :key="index"
                        >
                          <RadiationIcon
                            v-if="part.type === 'rad'"
                            class="element-sidebar__diamond-rad"
                            :light="resolvedTheme === 'dark'"
                          />
                          <span
                            v-else
                            :class="{ 'element-sidebar__diamond-w-strike': nfpaView.whiteStrike && part.value === 'W' }"
                          >{{ part.value }}</span>
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="section.id === 'ghs'">
              <div class="element-sidebar__ghs-grid">
                <div
                  v-for="item in ghsDisplay"
                  :key="item.id"
                  class="element-sidebar__ghs-item"
                >
                  <GhsPictogram :id="item.id" />
                  <span class="element-sidebar__ghs-label">{{ item.label }}</span>
                </div>
              </div>
            </template>

            <template v-if="section.id === 'overview'">
              <ElectronShell :shell="overview?.elementShell" :accent-color="element.color" />
              <div class="element-sidebar__particles">
                <div class="element-sidebar__particle">
                  <span class="element-sidebar__particle-label element-sidebar__particle-label--e">
                    {{ tSidebar('electrons') }}
                  </span>
                  <span class="element-sidebar__particle-value">{{ overview?.elementE ?? '—' }}</span>
                </div>
                <div class="element-sidebar__particle">
                  <span class="element-sidebar__particle-label element-sidebar__particle-label--p">
                    {{ tSidebar('protons') }}
                  </span>
                  <span class="element-sidebar__particle-value">{{ overview?.elementP ?? '—' }}</span>
                </div>
                <div class="element-sidebar__particle">
                  <span class="element-sidebar__particle-label element-sidebar__particle-label--n">
                    {{ tSidebar('neutrons') }}
                  </span>
                  <span class="element-sidebar__particle-value">{{ overview?.elementN ?? '—' }}</span>
                </div>
              </div>
            </template>
            </div>
          </section>
        </div>
        </div>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
.element-sidebar__backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  border: none;
  background: var(--color-overlay);
  cursor: pointer;
}

.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}

.element-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 210;
  width: min(400px, 100vw);
  height: 100vh;
  height: 100dvh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-sizing: border-box;
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  box-shadow: -4px 0 24px var(--color-shadow-md);
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

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

.element-sidebar__header-sentinel {
  height: 1px;
  margin: 0;
  pointer-events: none;
}

.element-sidebar--open {
  transform: translateX(0);
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

.element-sidebar__category {
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  white-space: nowrap;
}

.element-sidebar__collection-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  background: #c9a227;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.element-sidebar__radioactive-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  background: #d14a0f;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
}

.element-sidebar__radioactive-badge--weak {
  background: #8a9aab;
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
  transition: transform 0.15s ease, background-color 0.15s ease;
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
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 18l-6-6 6-6'/%3E%3C/svg%3E") center / 18px no-repeat;
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
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  box-shadow: none;
  transition: transform 0.15s ease, background-color 0.15s ease;
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

.element-sidebar__header--no-image .element-sidebar__header-link-icon--youtube {
  width: 17px;
  height: 17px;
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
}

.element-sidebar__section + .element-sidebar__section {
  margin-top: 8px;
}

.element-sidebar__section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  margin: 20px 0 12px;
  padding: 0 0 0 12px;
  border: none;
  border-left: 4px solid;
  background: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  transition: color 0.15s ease;
}

.element-sidebar__section-title:hover {
  color: var(--color-text-secondary);
}

.element-sidebar__section--collapsed .element-sidebar__section-title {
  margin-bottom: 20px;
}

.element-sidebar__section-chevron {
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  margin-right: 6px;
  border-right: 2px solid var(--color-text-secondary);
  border-bottom: 2px solid var(--color-text-secondary);
  transform: rotate(45deg);
  transition: transform 0.2s ease;
}

.element-sidebar__section--collapsed .element-sidebar__section-chevron {
  transform: rotate(-45deg);
}

.element-sidebar__section-body {
  overflow: visible;
}

.element-sidebar__props {
  margin: 0;
  padding: 0;
  list-style: none;
}

.element-sidebar__prop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 13px;
}

.element-sidebar__prop--empty {
  opacity: 0.45;
}

.element-sidebar__prop--text {
  display: block;
}

.element-sidebar__prop--text .element-sidebar__prop-value {
  display: block;
  text-align: left;
  font-weight: 400;
  line-height: 1.45;
}

.element-sidebar__prop-label {
  color: var(--color-text-secondary);
  font-weight: 400;
}

.element-sidebar__prop-value {
  color: var(--color-text);
  font-weight: 700;
  text-align: right;
  word-break: break-word;
}

.element-sidebar__prop-link {
  color: var(--color-link);
  text-decoration: none;
}

.element-sidebar__prop-link:hover {
  text-decoration: underline;
}

.element-sidebar__prop-value sup {
  font-size: 0.72em;
  line-height: 0;
  vertical-align: super;
}

.element-sidebar__prop-value sub {
  font-size: 0.72em;
  line-height: 0;
  vertical-align: sub;
}

.element-sidebar__prop-value sup.collection-isotope-mass {
  font-size: 0.62em;
  font-weight: 700;
}

.element-sidebar__prop-value :is(sup, sub) small {
  font-size: inherit;
}

.element-sidebar__prop:has(.element-sidebar__oxidation),
.element-sidebar__prop:has(.element-sidebar__spectrum-image),
.element-sidebar__prop:has(.element-sidebar__collection-spectrum),
.element-sidebar__prop:has(.element-sidebar__color-swatch),
.element-sidebar__prop--mini-table {
  grid-template-columns: 1fr;
}

.element-sidebar__prop--mini-table {
  justify-items: stretch;
}

.element-sidebar__prop--mini-table .element-mini-table {
  max-width: 320px;
  margin: 0 auto;
}

.element-sidebar__spectrum-image {
  display: block;
  width: 100%;
  margin-top: 6px;
  border-radius: 4px;
}

.element-sidebar__color-swatch {
  position: relative;
  display: block;
  width: 100%;
  height: 26px;
  margin-top: 6px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.element-sidebar__color-swatch::before,
.element-sidebar__color-swatch::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Polished metal: cylinder + top highlight, no diagonal streak */
.element-sidebar__color-swatch--metallic {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 -1px 0 rgba(0, 0, 0, 0.45),
    inset 1px 0 1px rgba(255, 255, 255, 0.15),
    inset -1px 0 1px rgba(0, 0, 0, 0.18);
}

.element-sidebar__color-swatch--metallic::before {
  background:
    radial-gradient(
      ellipse 110% 70% at 50% -35%,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.28) 38%,
      transparent 68%
    );
}

.element-sidebar__color-swatch--metallic::after {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22) 0%,
      rgba(255, 255, 255, 0.04) 22%,
      rgba(0, 0, 0, 0.04) 58%,
      rgba(0, 0, 0, 0.28) 100%
    ),
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(255, 255, 255, 0.1) 14%,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.06) 86%,
      rgba(0, 0, 0, 0.22) 100%
    );
}

/* Glossy (sulfur, bromine, iodine): soft convex sheen */
.element-sidebar__color-swatch--glossy {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.element-sidebar__color-swatch--glossy::before {
  background: radial-gradient(
    ellipse 100% 80% at 50% 0%,
    rgba(255, 255, 255, 0.45) 0%,
    transparent 65%
  );
}

.element-sidebar__color-swatch--glossy::after {
  background: linear-gradient(
    180deg,
    transparent 40%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

/* Gases: subtle top glint */
.element-sidebar__color-swatch--subtle {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.element-sidebar__color-swatch--subtle::before {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.35) 0%,
    transparent 45%
  );
}

.element-sidebar__color-swatch--subtle::after {
  display: none;
}

/* Matte surface */
.element-sidebar__color-swatch--matte {
  box-shadow: inset 0 -1px 3px rgba(0, 0, 0, 0.22);
}

.element-sidebar__color-swatch--matte::before {
  display: none;
}

.element-sidebar__color-swatch--matte::after {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 35%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.element-sidebar__grid-layout {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.element-sidebar__props--grid {
  flex: 1;
  min-width: 0;
}

.element-sidebar__prop--grid {
  grid-template-columns: 1fr;
  gap: 4px;
}

.element-sidebar__prop--grid .element-sidebar__prop-value {
  text-align: left;
}

.element-sidebar__grid-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.element-sidebar__nfpa-layout {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.element-sidebar__props--nfpa {
  flex: 1;
  min-width: 0;
}

.element-sidebar__prop--nfpa {
  display: block;
  position: relative;
  padding-left: 22px;
  grid-template-columns: unset;
  gap: 0;
  border-bottom-color: var(--color-border-subtle);
}

.element-sidebar__prop--nfpa::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.element-sidebar__prop--nfpa-red::before {
  background: #d62839;
}

.element-sidebar__prop--nfpa-blue::before {
  background: #4f5bd5;
}

.element-sidebar__prop--nfpa-yellow::before {
  background: #d4a012;
}

.element-sidebar__prop--nfpa-white::before {
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border-input);
}

.element-sidebar__prop--nfpa .element-sidebar__prop-label {
  display: block;
  margin-bottom: 2px;
  font-weight: 700;
  color: var(--color-text);
  font-size: 13px;
}

.element-sidebar__prop--nfpa .element-sidebar__prop-value {
  display: block;
  text-align: left;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.35;
}

.element-sidebar__diamond-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  padding-top: 2px;
}

.element-sidebar__ghs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  gap: 12px 16px;
}

.element-sidebar__ghs-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
  width: 100%;
  text-align: center;
}

.element-sidebar__ghs-label {
  width: 100%;
  max-width: 100%;
  font-size: 12px;
  line-height: 1.35;
  color: var(--color-text-secondary);
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.element-sidebar__diamond {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  width: 82px;
  height: 82px;
  min-width: 82px;
  padding: 2px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: var(--color-bg-subtle);
  transform: rotate(45deg);
  margin: 0;
  box-sizing: border-box;
}

.element-sidebar__diamond-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
}

.element-sidebar__diamond-item > span {
  display: block;
  transform: rotate(-45deg);
  line-height: 1;
}

.element-sidebar__diamond-item--red {
  background: #d62839;
}

.element-sidebar__diamond-item--yellow {
  background: #d4a012;
  color: #fff;
}

.element-sidebar__diamond-item--blue {
  background: #4f5bd5;
}

.element-sidebar__diamond-item--white {
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: 10px;
  border: 1px solid var(--color-border);
}

.element-sidebar__diamond-white-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  line-height: 1;
}

.element-sidebar__diamond-rad {
  width: 1.45em;
  height: 1.45em;
  line-height: 1;
}

.element-sidebar__diamond-w-strike {
  text-decoration: line-through;
}

.element-sidebar__oxidation {
  margin-top: 6px;
}

.element-sidebar__oxidation-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.element-sidebar__oxidation-row--positive {
  margin-top: 0;
}

.element-sidebar__oxidation-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 27px;
  height: 27px;
  margin: 0 5px 5px 0;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

.element-sidebar__oxidation-item--empty {
  background: var(--color-bg-muted);
  color: var(--color-text-muted);
}

.element-sidebar__oxidation-item--zero {
  background: #e6f3f6;
  color: #4a8a9b;
}

.element-sidebar__oxidation-item--negative {
  background: #e8f0fc;
  color: #3d6fc4;
}

.element-sidebar__oxidation-item--positive {
  background: #fcebee;
  color: #c43d52;
}

.element-sidebar__particles {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 16px 0 8px;
  text-align: center;
}

.element-sidebar__particle {
  flex: 1;
}

.element-sidebar__particle-label {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.element-sidebar__particle-label--e {
  background: #5b8def;
}

.element-sidebar__particle-label--p {
  background: #e05a6f;
}

.element-sidebar__particle-label--n {
  background: #5cad52;
}

.element-sidebar__particle-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
}

@media (max-width: 900px) {
  .element-sidebar__symbol {
    font-size: 52px;
  }

  .element-sidebar__name {
    font-size: 20px;
  }

  .element-sidebar__ghs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }
}

@media (max-width: 900px) and (orientation: portrait) {
  .element-sidebar {
    width: 100vw;
    left: 0;
    right: 0;
    border-left: none;
    box-shadow: none;
  }

  .element-sidebar__prop--mini-table .element-mini-table {
    max-width: none;
  }
}
</style>
