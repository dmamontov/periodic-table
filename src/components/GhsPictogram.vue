<script setup lang="ts">
import type { GhsPictogramId } from '../types/ghs'
import { ghsPictogramSources } from '../assets/ghs'

defineProps<{
  id: GhsPictogramId
}>()
</script>

<template>
  <img
    :src="ghsPictogramSources[id]"
    class="ghs-pictogram"
    alt=""
    width="72"
    height="72"
    decoding="async"
  />
</template>

<style scoped>
.ghs-pictogram {
  display: block;
  width: 72px;
  height: 72px;
}
</style>
