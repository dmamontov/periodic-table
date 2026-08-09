export interface CollectionSpectrumData {
  id: string
  device: string
  sample: string
  serialNumber: string
  measurementTimeSec: number
  startTime: string
  endTime: string
  channels: number
  calibration: [number, number, number]
  counts: number[]
}

export interface RadiacodeIsotopeRef {
  isotope: string
  slug: string
}

/** UI-facing chart geometry built from `CollectionSpectrumData` by `utils/collection/spectrumChart.ts`, rendered by `GammaSpectrumChartSvg.vue`. */
export interface GammaSpectrumChartData {
  width: number
  height: number
  baseY: number
  pad: { left: number; right: number; top: number; bottom: number }
  plotW: number
  plotH: number
  displayMaxEnergy: number
  areaPath: string
  linePath: string
  xTicks: { energy: number; x: number; label: string }[]
  yTicks: { value: number; y: number; label: string }[]
  markers: { x: number; label: string }[]
}
