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
