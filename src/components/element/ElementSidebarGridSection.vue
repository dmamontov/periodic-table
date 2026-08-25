<script setup lang="ts">
import type { DetailSection } from '../../types/element/section';

defineProps<{
  section: DetailSection;
  imageUrl: string | null;
}>();
</script>

<template>
  <div class="element-sidebar__grid-layout">
    <ul class="element-sidebar__props element-sidebar__props--grid">
      <li
        v-for="(item, idx) in section.items.slice(0, 3)"
        :key="`grid-${section.sectionKey ?? section.id}-${idx}`"
        class="element-sidebar__prop element-sidebar__prop--grid"
        :class="{ 'element-sidebar__prop--empty': item.empty }"
      >
        <span class="element-sidebar__prop-label">{{ item.label }}</span>
        <span v-if="item.html" class="element-sidebar__prop-value" v-html="item.value" />
        <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
      </li>
    </ul>
    <img v-if="imageUrl" :src="imageUrl" :alt="section.items[0]?.value ?? ''" class="element-sidebar__grid-image" />
  </div>
  <ul v-if="section.items.slice(3).length" class="element-sidebar__props">
    <li
      v-for="(item, idx) in section.items.slice(3)"
      :key="`grid-extra-${section.sectionKey ?? section.id}-${idx}`"
      class="element-sidebar__prop"
      :class="{ 'element-sidebar__prop--empty': item.empty }"
    >
      <span class="element-sidebar__prop-label">{{ item.label }}</span>
      <span v-if="item.html" class="element-sidebar__prop-value" v-html="item.value" />
      <span v-else class="element-sidebar__prop-value">{{ item.value }}</span>
    </li>
  </ul>
</template>

<style scoped>
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
</style>
