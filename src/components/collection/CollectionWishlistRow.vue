<script setup lang="ts">
import ElementSpectrumHeading from './ElementSpectrumHeading.vue'
import Badge from '../common/Badge.vue'
import { useLocale } from '../../locales'
import { COLLECTION_COLOR, WISHLIST_UPGRADE_COLOR } from '../../theme/colors'
import type { WishlistLink } from '../../types/collection/collection'

defineProps<{
  symbol: string
  name: string
  color: string
  originHtml: string
  links: WishlistLink[]
  upgrade?: boolean
}>()

const emit = defineEmits<{ open: [] }>()
const { messages } = useLocale()
</script>

<template>
  <div class="collection-wishlist-row">
    <button type="button" class="collection-wishlist-row__element" @click="emit('open')">
      <ElementSpectrumHeading :symbol="symbol" :name="name" :accent="color" :origin-html="originHtml" compact />
    </button>
    <Badge v-if="upgrade" :color="WISHLIST_UPGRADE_COLOR" class="collection-wishlist-row__badge">
      {{ messages.collectionPanel.wishlistUpgradeBadge }}
    </Badge>
    <div class="collection-wishlist-row__links">
      <a
        v-for="link in links"
        :key="link.url"
        class="collection-wishlist-row__link"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        >{{ link.label }} ↗</a>
    </div>
  </div>
</template>

<style scoped>
.collection-wishlist-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.collection-wishlist-row__element {
  display: block;
  flex: 1;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  min-width: 0;
}

.collection-wishlist-row__badge {
  flex-shrink: 0;
}

.collection-wishlist-row__element :deep(.element-spectrum-heading__name) {
  transition: color 0.15s ease;
}

.collection-wishlist-row__element:hover :deep(.element-spectrum-heading__name) {
  color: var(--color-text);
}

.collection-wishlist-row__links {
  flex-shrink: 0;
  min-width: 12ch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.collection-wishlist-row__link {
  font-size: 12px;
  color: v-bind(COLLECTION_COLOR);
  text-decoration: none;
  white-space: nowrap;
}

.collection-wishlist-row__link:hover {
  text-decoration: underline;
}
</style>
