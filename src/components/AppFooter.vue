<script setup lang="ts">
import OrnamentDivider from './OrnamentDivider.vue'

const year = new Date().getFullYear()
const email = 'd@mamontov.tech'
</script>

<template>
  <footer class="app-footer">
    <OrnamentDivider class="app-footer__ornament" />
    <p class="app-footer__text">
      <span class="app-footer__year">{{ year }}</span>
      <span class="app-footer__sep" aria-hidden="true">·</span>
      <a class="app-footer__email" :href="`mailto:${email}`">{{ email }}</a>
    </p>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 16px 20px;
}

.app-footer__ornament {
  flex-shrink: 0;
}

.app-footer__text {
  margin: 0;
  text-align: center;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-text-muted);
}

.app-footer__year {
  font-variant-numeric: tabular-nums;
}

.app-footer__sep {
  margin: 0 0.45em;
  opacity: 0.55;
}

.app-footer__email {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.app-footer__email:hover {
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

@media (max-width: 900px) {
  .app-footer {
    gap: 8px;
    padding:
      0
      max(12px, env(safe-area-inset-right, 0px))
      16px
      max(12px, env(safe-area-inset-left, 0px));
  }

  .app-footer__text {
    font-size: 12px;
  }
}

@media (orientation: landscape) and (max-width: 960px) {
  .app-footer {
    gap: 6px;
    padding:
      0
      max(4px, env(safe-area-inset-right, 0px))
      8px
      max(4px, env(safe-area-inset-left, 0px));
  }

  .app-footer__text {
    font-size: 11px;
  }
}
</style>
