import { channelToEnergy } from '../../data'
import type { CollectionSpectrumData, GammaSpectrumChartData } from '../../types/collection/spectrum'
import type { SpectrumAnnotation } from '../../types/collection/collection'

const CHART_WIDTH = 640
const CHART_HEIGHT = 260

function detectDisplayMaxEnergy(
  counts: number[],
  calibration: CollectionSpectrumData['calibration'],
): number {
  // Last channel is the device's overflow/pileup tally, not a real count — excluded so it doesn't stretch the range.
  const spectralCounts = counts.slice(0, -1)
  const maxCount = Math.max(...spectralCounts)
  const threshold = Math.max(maxCount * 0.02, 6)

  let lastChannel = 0
  for (let ch = 0; ch < spectralCounts.length; ch++) {
    if ((spectralCounts[ch] ?? 0) >= threshold) lastChannel = ch
  }

  let maxEnergy = channelToEnergy(lastChannel, calibration)
  maxEnergy = Math.ceil((maxEnergy * 1.12) / 25) * 25
  return Math.max(maxEnergy, 750)
}

function buildXTicks(maxEnergy: number): number[] {
  const candidates = [25, 50, 100, 200, 250, 500, 1000]
  const step =
    candidates.find((s) => maxEnergy / s <= 6) ??
    candidates[candidates.length - 1]!

  const ticks: number[] = []
  for (let e = 0; e <= maxEnergy + step * 0.01; e += step) {
    ticks.push(Math.round(e))
  }
  return ticks
}

/** "Nice" round-number ticks (1-2-5-10 pattern) for the linear count axis. */
function buildYTicks(maxCount: number): number[] {
  const roughStep = maxCount / 4
  const magnitude = 10 ** Math.floor(Math.log10(roughStep || 1))
  const residual = roughStep / magnitude
  const niceResidual = residual >= 5 ? 10 : residual >= 2 ? 5 : residual >= 1 ? 2 : 1
  const step = niceResidual * magnitude

  const ticks: number[] = []
  for (let v = 0; v <= maxCount + step * 0.01; v += step) ticks.push(Math.round(v))
  return ticks
}

function formatYTick(value: number): string {
  if (value < 1000) return String(value)
  const k = value / 1000
  return `${Number.isInteger(k) ? k : k.toFixed(1)}k`
}

/** Light moving average — tames single-channel Poisson spikes a log scale would blow up into fake peaks. */
function smoothCounts(counts: number[], radius = 2): number[] {
  const n = counts.length
  const out = new Array<number>(n)
  for (let i = 0; i < n; i++) {
    const lo = Math.max(0, i - radius)
    const hi = Math.min(n - 1, i + radius)
    let sum = 0
    for (let j = lo; j <= hi; j++) sum += counts[j] ?? 0
    out[i] = sum / (hi - lo + 1)
  }
  return out
}

export function buildSpectrumChart(
  data: CollectionSpectrumData | null,
  annotations: SpectrumAnnotation[] | null | undefined,
): GammaSpectrumChartData | null {
  if (!data) return null

  const { counts, calibration } = data
  const displayMaxEnergy = detectDisplayMaxEnergy(counts, calibration)
  // Drop the device's overflow tally in the last channel before smoothing/plotting.
  const smoothed = smoothCounts(counts.slice(0, -1))
  const points: { ch: number; count: number }[] = []

  for (let ch = 0; ch < smoothed.length; ch++) {
    if (channelToEnergy(ch, calibration) > displayMaxEnergy) break
    points.push({ ch, count: smoothed[ch] ?? 0 })
  }

  if (points.length === 0) return null

  const maxCount = Math.max(...points.map((p) => p.count), 1)

  const width = CHART_WIDTH
  const height = CHART_HEIGHT
  const pad = { left: 34, right: 8, top: 10, bottom: 26 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const baseY = pad.top + plotH

  const toX = (energy: number) => pad.left + (energy / displayMaxEnergy) * plotW
  const toY = (count: number) => pad.top + plotH - (count / maxCount) * plotH
  // Each channel's own bar edges — a spectrometer bins counts per channel, it doesn't interpolate a curve.
  const leftEdgeX = (ch: number) => toX(channelToEnergy(ch - 0.5, calibration))
  const rightEdgeX = (ch: number) => toX(channelToEnergy(ch + 0.5, calibration))

  const stepCoords: string[] = []
  for (const p of points) {
    const y = toY(p.count).toFixed(1)
    stepCoords.push(`${leftEdgeX(p.ch).toFixed(1)},${y}`, `${rightEdgeX(p.ch).toFixed(1)},${y}`)
  }
  const lineCoords = stepCoords

  const firstX = leftEdgeX(points[0]!.ch)
  const lastX = rightEdgeX(points[points.length - 1]!.ch)
  const areaPath = [
    `M ${firstX.toFixed(1)},${baseY.toFixed(1)}`,
    `L ${stepCoords.join(' L ')}`,
    `L ${lastX.toFixed(1)},${baseY.toFixed(1)} Z`,
  ].join(' ')

  const xTicks = buildXTicks(displayMaxEnergy)

  const markers = (annotations ?? [])
    .filter((a) => a.energy > 0 && a.energy <= displayMaxEnergy)
    .map((a) => ({ x: toX(a.energy), label: a.label }))

  return {
    width,
    height,
    baseY,
    pad,
    plotW,
    plotH,
    displayMaxEnergy,
    areaPath,
    linePath: lineCoords.join(' '),
    xTicks: xTicks.map((e) => ({
      energy: e,
      x: toX(e),
      label: String(e),
    })),
    yTicks: buildYTicks(maxCount).map((v) => ({
      value: v,
      y: toY(v),
      label: formatYTick(v),
    })),
    markers,
  }
}

export function formatSpectrumCaption(data: CollectionSpectrumData | null): string {
  return data?.device ?? ''
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.floor(totalSeconds % 60)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function formatSpectrumDurationLabel(data: CollectionSpectrumData | null): string {
  return data ? formatDuration(data.measurementTimeSec) : ''
}

export function formatSpectrumCpsLabel(data: CollectionSpectrumData | null, locale: string): string {
  if (!data) return ''
  // Same overflow-tally exclusion as the chart.
  const totalCounts = data.counts.slice(0, -1).reduce((sum, c) => sum + c, 0)
  const cps = totalCounts / data.measurementTimeSec
  const loc = locale === 'zh' ? 'zh-CN' : locale
  return `${cps.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cps`
}
