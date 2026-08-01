<template>
  <span class="ornament-divider" aria-hidden="true">
    <span class="ornament-divider__line" />
    <span class="ornament-divider__dot" />
    <span class="ornament-divider__line" />
  </span>
</template>

<style scoped>
.ornament-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  width: min(200px, 52vw);
}

.ornament-divider__line {
  flex: 1;
  height: 1px;
  background: var(--color-border-input);
  opacity: 0.75;
}

.ornament-divider__dot {
  flex-shrink: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-text-muted);
  opacity: 0.65;
}

@media (max-width: 900px) {
  .ornament-divider {
    width: min(160px, 60vw);
    gap: 8px;
  }
}
</style>
