<script setup lang="ts">
import CategoryFilter from './CategoryFilter.vue';

const selectedCategory = defineModel<string>('selectedCategory', { default: 'all' });
</script>

<template>
  <CategoryFilter v-model="selectedCategory" class="table-filters" />
</template>

<style scoped>
.table-filters {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
