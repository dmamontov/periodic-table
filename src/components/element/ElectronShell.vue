<script setup lang="ts">
import { computed } from 'vue';
import { PARTICLE_COLORS } from '../../theme/colors';

const props = defineProps<{
  shell: string | null | undefined;
  accentColor?: string;
}>();

const ELECTRON_RADIUS = [19, 34, 49, 64, 79, 94, 109, 124];
const ORBIT_SIZES = [40, 70, 100, 130, 160, 190, 220, 250];
const DURATIONS = [20, 19, 18, 17, 16, 15, 14, 13];
const BORDER_OPACITY = [1, 0.99, 0.98, 0.5, 0.4, 0.3, 0.2, 0.2];

const shellCounts = computed(() => {
  if (!props.shell) return [];
  const counts = props.shell.split('-').map((part) => {
    const match = /\d+/.exec(part);
    return match ? Number(match[0]) : 0;
  });
  while (counts.length < 8) counts.push(0);
  return counts.slice(0, 8);
});

function electronsForOrbit(count: number, radius: number) {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    transform: `rotate(${(360 / count) * index}deg) translate(0, -${radius}px)`,
  }));
}

function orbitBorderColor(index: number) {
  const mix = (BORDER_OPACITY[index] ?? 0) * 35;
  return `color-mix(in srgb, ${props.accentColor ?? PARTICLE_COLORS.electron} ${mix}%, var(--color-border-input))`;
}
</script>

<template>
  <div v-if="shellCounts.length" class="electron-shell">
    <div class="electron-shell__wrapper">
      <div class="electron-shell__center" />

      <div
        v-for="(count, index) in shellCounts"
        :key="index"
        class="electron-shell__orbit"
        :style="{
          width: `${ORBIT_SIZES[index]}px`,
          height: `${ORBIT_SIZES[index]}px`,
        }"
      >
        <ul
          class="electron-shell__circle"
          :style="{
            animationDuration: `${DURATIONS[index]}s`,
            borderColor: orbitBorderColor(index),
          }"
        >
          <li
            v-for="electron in electronsForOrbit(count, ELECTRON_RADIUS[index] ?? 0)"
            :key="electron.id"
            class="electron-shell__atom"
            :style="{
              transform: electron.transform,
              backgroundColor: accentColor ?? PARTICLE_COLORS.electron,
            }"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.electron-shell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  margin-top: 14px;
}

.electron-shell__wrapper {
  position: relative;
  width: 262px;
  height: 262px;
  flex-shrink: 0;
  transform: rotate(90deg);
}

.electron-shell__center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #8a8a8a, #4a4a4a);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.12);
}

.electron-shell__orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.electron-shell__circle {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 4px;
  list-style: none;
  border: 2px solid var(--color-border-input);
  border-radius: 50%;
  box-sizing: border-box;
  animation: electron-shell-rotate linear infinite;
}

.electron-shell__atom {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
}

@keyframes electron-shell-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .electron-shell__circle {
    animation: none;
  }
}
</style>
