<script setup lang="ts">
import OrnamentDivider from './OrnamentDivider.vue'

const year = new Date().getFullYear()
const email = 'd@mamontov.tech'
const githubUrl = 'https://github.com/dmamontov/periodic-table'
</script>

<template>
  <footer class="app-footer">
    <OrnamentDivider class="app-footer__ornament" />
    <div class="app-footer__text">
      <p class="app-footer__links">
        <a
          class="app-footer__link"
          :href="`mailto:${email}`"
          :aria-label="`Email: ${email}`"
          :title="email"
        >
          <svg
            class="app-footer__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22 6 12 13 2 6" />
          </svg>
        </a>
        <a
          class="app-footer__link"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg
            class="app-footer__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35
                6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65
                16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5
                4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9
                18.13V22"
            />
          </svg>
        </a>
      </p>
      <span class="app-footer__year">{{ year }}</span>
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

.app-footer__icon {
  width: 16px;
  height: 16px;
  display: block;
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
