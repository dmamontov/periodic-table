/** CID783 → https://pubchem.ncbi.nlm.nih.gov/compound/783 */
export function parsePubChemCid(raw: string | null | undefined): number | null {
  if (!raw) return null
  const match = /(\d+)/.exec(raw)
  if (!match?.[1]) return null
  const id = Number(match[1])
  return Number.isFinite(id) && id > 0 ? id : null
}

export function getPubChemUrl(raw: string | null | undefined): string | null {
  const id = parsePubChemCid(raw)
  if (id === null) return null
  return `https://pubchem.ncbi.nlm.nih.gov/compound/${id}`
}
