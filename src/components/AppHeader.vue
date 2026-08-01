<script setup lang="ts">
import LanguageSwitcher from './LanguageSwitcher.vue'
import OrnamentDivider from './OrnamentDivider.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { useLocale } from '../locales'

const { messages } = useLocale()
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <div class="app-header__controls">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      <h1 class="app-header__title">
        <span class="app-header__title-line app-header__title-line--primary">
          {{ messages.siteHeading.line1 }}
        </span>
        <span class="app-header__title-line app-header__title-line--secondary">
          {{ messages.siteHeading.line2 }}
        </span>
        <OrnamentDivider class="app-header__title-ornament" />
      </h1>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding: 10px 16px 0;
}

.app-header__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 1480px;
  margin: 0 auto;
}

.app-header__controls {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.app-header__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  min-width: 0;
  max-width: min(820px, 100%);
  padding: 2px 20px 0;
  text-align: center;
}

.app-header__title-line {
  display: block;
}

.app-header__title-line--primary {
  font-size: clamp(1.2rem, 2.2vw + 0.55rem, 1.65rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--color-text);
}

.app-header__title-line--secondary {
  margin-top: 4px;
  font-size: clamp(0.95rem, 1.1vw + 0.45rem, 1.12rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
  font-style: italic;
}

.app-header__title-ornament {
  margin-top: 11px;
}

@media (max-width: 900px) {
  .app-header {
    padding:
      8px
      max(12px, env(safe-area-inset-right, 0px))
      0
      max(12px, env(safe-area-inset-left, 0px));
  }

  .app-header__inner {
    gap: 8px;
  }

  .app-header__title {
    padding-inline: 12px;
    max-width: none;
  }

  .app-header__title-ornament {
    margin-top: 9px;
  }
}

@media (orientation: landscape) and (max-width: 960px) {
  .app-header {
    padding:
      6px
      max(8px, env(safe-area-inset-right, 0px))
      0
      max(8px, env(safe-area-inset-left, 0px));
  }

  .app-header__inner {
    gap: 4px;
  }

  .app-header__title {
    padding-inline: 8px;
  }

  .app-header__title-line--primary {
    font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  }

  .app-header__title-line--secondary {
    margin-top: 2px;
    font-size: clamp(0.75rem, 1.8vw, 0.85rem);
  }

  .app-header__title-ornament {
    margin-top: 4px;
  }
}
</style>
