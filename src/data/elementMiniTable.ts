import { fBlockElements, mainElements } from './index'

export { mainElements }

export const lanthanides = fBlockElements.filter((el) => el.row === 8)
export const actinides = fBlockElements.filter((el) => el.row === 9)
