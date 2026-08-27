<script setup lang="ts">
import AppIcon from '../common/AppIcon.vue';

defineProps<{
  variant: 'sticky' | 'on-image';
  youtubeUrl: string;
  wikipediaUrl: string;
  youtubeIcon: string;
  wikiIcon: string;
  youtubeLabel: string;
  wikipediaLabel: string;
  shareAriaLabel: string;
  shareCopied: boolean;
  shareIconColor?: string;
}>();

defineEmits<{ share: [] }>();
</script>

<template>
  <div
    v-if="youtubeUrl || wikipediaUrl"
    class="element-sidebar__header-links"
    :class="{ 'element-sidebar__sticky-links': variant === 'sticky' }"
  >
    <a
      v-if="youtubeUrl"
      :href="youtubeUrl"
      class="element-sidebar__header-link"
      :class="{ 'element-sidebar__header-link--on-image': variant === 'on-image' }"
      :aria-label="youtubeLabel"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="element-sidebar__header-link-icon element-sidebar__header-link-icon--youtube"
        :src="youtubeIcon"
        alt=""
      />
    </a>
    <a
      v-if="wikipediaUrl"
      :href="wikipediaUrl"
      class="element-sidebar__header-link"
      :class="{ 'element-sidebar__header-link--on-image': variant === 'on-image' }"
      :aria-label="wikipediaLabel"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img class="element-sidebar__header-link-icon" :src="wikiIcon" alt="" />
    </a>
    <button
      type="button"
      class="element-sidebar__header-link element-sidebar__header-link--share"
      :class="{ 'element-sidebar__header-link--on-image': variant === 'on-image' }"
      :aria-label="shareAriaLabel"
      @click="$emit('share')"
    >
      <AppIcon
        v-if="!shareCopied"
        class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
        :style="shareIconColor ? { color: shareIconColor } : undefined"
        name="share"
      />
      <AppIcon
        v-else
        class="element-sidebar__header-link-icon element-sidebar__header-link-icon--share"
        :style="shareIconColor ? { color: shareIconColor } : undefined"
        name="check"
      />
    </button>
  </div>
</template>
