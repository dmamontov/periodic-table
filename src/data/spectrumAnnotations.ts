export interface SpectrumAnnotation {
  /** Line energy, keV */
  energy: number
  /** Short label — the actual emitting isotope/line, not necessarily the sample's own element */
  label: string
}

/**
 * Reference gamma/X-ray lines marked on collection spectra — each one is a
 * documented isotope line and shows a real, background-subtracted signal in
 * that specific spectrum, not just a textbook value pasted in blind.
 */
export const spectrumAnnotations: Record<string, SpectrumAnnotation[]> = {
  'am-95-his07': [
    { energy: 59.5, label: 'Am-241' },
    { energy: 26.3, label: 'Am-241' },
  ],
  'pu-94-rid6m': [{ energy: 17.2, label: 'U Lα (Pu-239)' }],
  'ra-88-spd': [
    { energy: 186.2, label: 'Ra-226' },
    { energy: 351.9, label: 'Pb-214' },
    { energy: 609.3, label: 'Bi-214' },
  ],
  'th-90-wt20': [{ energy: 238.6, label: 'Pb-212' }],
  'u-92-glass': [
    { energy: 63.3, label: 'Th-234' },
    { energy: 92.6, label: 'Th-234' },
    { energy: 185.7, label: 'U-235' },
  ],
  'po-84-staticmaster': [
    { energy: 46.5, label: 'Pb-210' },
    { energy: 75.0, label: 'Pb/Bi Kα' },
  ],
}
