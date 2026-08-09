<script setup lang="ts">
import { useLocale } from '../../locales'
import { PARTICLE_COLORS } from '../../theme/colors'
import ElectronShell from './ElectronShell.vue'

defineProps<{
  shell: string | null | undefined
  accentColor: string
  electrons: string | null | undefined
  protons: string | null | undefined
  neutrons: string | null | undefined
}>()

const { tSidebar } = useLocale()
</script>

<template>
  <ElectronShell :shell="shell" :accent-color="accentColor" />
  <div class="element-sidebar__particles">
    <div class="element-sidebar__particle">
      <span class="element-sidebar__particle-label element-sidebar__particle-label--e">
        {{ tSidebar('electrons') }}
      </span>
      <span class="element-sidebar__particle-value">{{ electrons ?? '—' }}</span>
    </div>
    <div class="element-sidebar__particle">
      <span class="element-sidebar__particle-label element-sidebar__particle-label--p">
        {{ tSidebar('protons') }}
      </span>
      <span class="element-sidebar__particle-value">{{ protons ?? '—' }}</span>
    </div>
    <div class="element-sidebar__particle">
      <span class="element-sidebar__particle-label element-sidebar__particle-label--n">
        {{ tSidebar('neutrons') }}
      </span>
      <span class="element-sidebar__particle-value">{{ neutrons ?? '—' }}</span>
    </div>
  </div>
</template>

<style scoped>
.element-sidebar__particles {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 16px 0 8px;
  text-align: center;
}

.element-sidebar__particle {
  flex: 1;
}

.element-sidebar__particle-label {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.element-sidebar__particle-label--e {
  background: v-bind('PARTICLE_COLORS.electron');
}

.element-sidebar__particle-label--p {
  background: v-bind('PARTICLE_COLORS.proton');
}

.element-sidebar__particle-label--n {
  background: v-bind('PARTICLE_COLORS.neutron');
}

.element-sidebar__particle-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
}
</style>
