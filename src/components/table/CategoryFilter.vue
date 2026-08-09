<script setup lang="ts">
import { allCategories } from '../../data'
import type { CategoryId } from '../../types/element/category'
import { useLocale } from '../../locales'

const ALL_COLOR = '#615f5f'
const COLLECTION_COLOR = '#c9a227'

const COLLECTION_FILTER_ID = 'collection'

interface CategoryItem {
  kind: 'category'
  id: string
  color: string
}

interface CollectionItem {
  kind: 'collection'
  color: string
}

type ColumnCell = CategoryItem | CollectionItem | null

const selectedCategory = defineModel<string>({ default: 'all' })

const { tLegend, tCategories, locale, collectionName } = useLocale()

const categoryColor = Object.fromEntries(
  allCategories.map((c) => [c.id, c.color]),
) as Record<CategoryId, string>

function cat(id: CategoryId): CategoryItem {
  return { kind: 'category', id, color: categoryColor[id] }
}

const columns: ColumnCell[][] = [
  [
    { kind: 'category', id: 'all', color: ALL_COLOR },
    { kind: 'collection', color: COLLECTION_COLOR },
    cat('alkali'),
    cat('alkaline-earth'),
  ],
  [
    cat('transition'),
    cat('post-transition'),
    cat('metalloid'),
    cat('nonmetal'),
  ],
  [
    cat('halogen'),
    cat('noble-gas'),
    cat('lanthanides'),
    cat('actinides'),
  ],
]

function categoryLabel(id: string) {
  return id === 'all' ? tCategories('all') : tLegend(id)
}

function isActive(item: CategoryItem | CollectionItem) {
  if (item.kind === 'collection') return selectedCategory.value === COLLECTION_FILTER_ID
  return selectedCategory.value === item.id
}

function onItemClick(item: CategoryItem | CollectionItem) {
  if (item.kind === 'collection') {
    selectedCategory.value =
      selectedCategory.value === COLLECTION_FILTER_ID ? 'all' : COLLECTION_FILTER_ID
    return
  }
  if (item.id === 'all') {
    selectedCategory.value = 'all'
    return
  }
  selectedCategory.value = selectedCategory.value === item.id ? 'all' : item.id
}
</script>

<template>
  <div class="category-filter" :key="locale">
    <div
      v-for="(column, colIndex) in columns"
      :key="colIndex"
      class="category-filter__column"
    >
      <template
        v-for="(item, rowIndex) in column"
        :key="item?.kind === 'collection' ? 'collection' : item?.id ?? `empty-${colIndex}-${rowIndex}`"
      >
        <button
          v-if="item"
          type="button"
          class="category-filter__item"
          :class="{ 'category-filter__item--active': isActive(item) }"
          :aria-pressed="isActive(item)"
          @click="onItemClick(item)"
        >
          <span
            class="category-filter__radio"
            :style="{
              borderColor: item.color,
              backgroundColor: isActive(item) ? item.color : 'transparent',
            }"
          />
          <span class="category-filter__label">
            {{ item.kind === 'collection' ? collectionName : categoryLabel(item.id) }}
          </span>
        </button>
        <span
          v-else
          class="category-filter__placeholder"
          aria-hidden="true"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 22px;
  box-sizing: border-box;
}

.category-filter__column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
}

.category-filter__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  width: max-content;
  min-height: calc(var(--cell-size, 76px) * 0.19);
  padding: 1px 0 1px 18px;
  border: none;
  background: none;
  cursor: pointer;
  user-select: none;
  text-align: left;
  font-family: var(--font-body);
}

.category-filter__placeholder {
  display: block;
  width: 100%;
  min-height: calc(var(--cell-size, 76px) * 0.19);
}

.category-filter__item:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 1px;
  border-radius: 2px;
}

.category-filter__radio {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 11px;
  height: 11px;
  border: 2px solid var(--color-text-secondary);
  border-radius: 50%;
  flex-shrink: 0;
  transition: background-color 0.2s ease;
  pointer-events: none;
}

.category-filter__label {
  font-size: var(--panel-font-size);
  line-height: var(--panel-line-height);
  color: var(--color-text);
  font-weight: 400;
  pointer-events: none;
  white-space: nowrap;
}

.category-filter__item--active .category-filter__label {
  font-weight: 700;
}

@media (max-width: 900px), ((orientation: landscape) and (max-width: 960px)) {
  .category-filter {
    gap: 12px;
  }

  .category-filter__column {
    gap: 2px;
  }

  .category-filter__item {
    padding-left: 16px;
    min-height: 13px;
  }

  .category-filter__placeholder {
    min-height: 13px;
  }

  .category-filter__radio {
    width: 10px;
    height: 10px;
  }
}

@media (orientation: landscape) and (max-width: 960px) {
  .category-filter {
    gap: 8px;
  }

  .category-filter__column {
    gap: 3px;
  }

  .category-filter__item {
    min-height: 14px;
  }

  .category-filter__placeholder {
    min-height: 14px;
  }
}
</style>
