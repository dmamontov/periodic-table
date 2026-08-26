<script setup lang="ts">
import AppIcon from '../common/AppIcon.vue';
import OrnamentDivider from './OrnamentDivider.vue';

const LAUNCH_YEAR = 2026;
const currentYear = new Date().getFullYear();
const year = currentYear > LAUNCH_YEAR ? `${LAUNCH_YEAR}–${currentYear}` : `${LAUNCH_YEAR}`;
const email = 'd@mamontov.tech';
const githubUrl = 'https://github.com/dmamontov/periodic-table';
const appVersion = __APP_VERSION__;
</script>

<template>
  <footer class="app-footer">
    <OrnamentDivider class="app-footer__ornament" />
    <div class="app-footer__text">
      <p class="app-footer__links">
        <a class="app-footer__link" :href="`mailto:${email}`" :aria-label="`Email: ${email}`" :title="email">
          <AppIcon class="app-footer__icon" name="mail" />
        </a>
        <a
          class="app-footer__link"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <AppIcon class="app-footer__icon" name="github" />
        </a>
      </p>
      <span class="app-footer__year">{{ year }} · {{ appVersion }}</span>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-text-muted);
}

.app-footer__links {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
}

.app-footer__year {
  font-variant-numeric: tabular-nums;
}

.app-footer__link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
  transition: color 0.15s ease;
}

.app-footer__link:hover {
  color: var(--color-text);
}

.app-footer__icon :deep(svg) {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-width: 900px) {
  .app-footer {
    gap: 8px;
    padding: 0 max(12px, env(safe-area-inset-right, 0px)) 16px max(12px, env(safe-area-inset-left, 0px));
  }

  .app-footer__text {
    font-size: 12px;
  }
}

@media (orientation: landscape) and (max-width: 960px) {
  .app-footer {
    gap: 6px;
    padding: 0 max(4px, env(safe-area-inset-right, 0px)) 8px max(4px, env(safe-area-inset-left, 0px));
  }

  .app-footer__text {
    font-size: 11px;
  }
}
</style>
