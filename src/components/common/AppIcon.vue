<script setup lang="ts">
// Eagerly inlined as raw markup (not `?url`) so `currentColor`/`:style="{ color }"` on the
// wrapping element still reaches the icon - an <img src="*.svg"> can't pick up CSS color.
const modules = import.meta.glob('../../assets/icons/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const iconsByName: Record<string, string> = {};
for (const [path, svg] of Object.entries(modules)) {
  const name = path.slice(path.lastIndexOf('/') + 1, -4);
  iconsByName[name] = String(svg);
}

defineProps<{
  /** Filename (without extension) in src/assets/icons/, e.g. "trend-up" */
  name: string;
}>();
</script>

<template>
  <span class="app-icon" v-html="iconsByName[name]" />
</template>

<style scoped>
.app-icon {
  display: contents;
}
</style>
