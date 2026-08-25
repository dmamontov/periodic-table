<script setup lang="ts">
import radiationIconSrc from '../../assets/radiation-icon.svg';

defineProps<{
  /** White icon for dark/colored backgrounds (element cells) */
  light?: boolean;
}>();
</script>

<template>
  <img
    :src="radiationIconSrc"
    class="radiation-icon"
    :class="{ 'radiation-icon--light': light }"
    alt=""
    decoding="async"
  />
</template>

<style scoped>
.radiation-icon {
  display: block;
  flex-shrink: 0;
  object-fit: contain;
}

.radiation-icon--light {
  filter: brightness(0) invert(1);
}
</style>
