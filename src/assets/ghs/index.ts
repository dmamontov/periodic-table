import type { GhsPictogramId } from '../../types/element/ghs'
import acuteToxicity from './acuteToxicity.svg'
import compressedGas from './compressedGas.svg'
import corrosive from './corrosive.svg'
import environment from './environment.svg'
import explosive from './explosive.svg'
import flammable from './flammable.svg'
import healthHazard from './healthHazard.svg'
import irritant from './irritant.svg'
import oxidizer from './oxidizer.svg'

/** Official UNECE GHS pictograms (vectorized), Wikimedia Commons */
export const ghsPictogramSources: Record<GhsPictogramId, string> = {
  explosive,
  flammable,
  oxidizer,
  compressedGas,
  corrosive,
  acuteToxicity,
  irritant,
  healthHazard,
  environment,
}
