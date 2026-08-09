<script setup lang="ts">
import { useLocale } from '../../locales'
import { useTheme } from '../../theme'
import type { NfpaDisplay } from '../../utils/element/formatters'
import RadiationIcon from '../common/RadiationIcon.vue'

defineProps<{
  nfpaView: NfpaDisplay
  hasDiamond: boolean
}>()

const { tSidebar } = useLocale()
const { resolvedTheme } = useTheme()
</script>

<template>
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
    <div v-if="hasDiamond" class="element-sidebar__diamond-wrap">
      <div class="element-sidebar__diamond" :aria-label="tSidebar('nfpaDiamond')">
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
            <template v-for="(part, index) in nfpaView.whiteDiamondParts" :key="index">
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

<style scoped>
.element-sidebar__nfpa-layout {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.element-sidebar__props {
  margin: 0;
  padding: 0;
  list-style: none;
}

.element-sidebar__props--nfpa {
  flex: 1;
  min-width: 0;
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
</style>
