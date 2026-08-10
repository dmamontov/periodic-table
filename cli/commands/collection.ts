import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  intro,
  outro,
  text,
  select,
  autocomplete,
  confirm,
  note,
  log,
  cancel,
  isCancel,
} from '@clack/prompts'
import type {
  ElementCollection,
  ElementCollectionDecayParent,
  ElementCollectionPhysical,
  ElementCollectionRadioactive,
  ElementCollectionSpectrum,
  SpectrumAnnotation,
} from '../../src/types/collection/collection.ts'
import type { LocalizedLabel } from '../../src/utils/localizedLabel.ts'
import { ROOT } from '../lib/paths.ts'
import { loadElements, type ElementRow } from '../lib/element-data.ts'
import { loadCollection, saveCollection } from '../lib/collection-store.ts'

const SPECTRA_DIR = resolve(ROOT, 'src/data/spectra')

interface Vocabulary {
  elements: ElementRow[]
  elementNames: Record<string, string>
  sampleStateLabels: Record<string, LocalizedLabel>
  containerLabels: Record<string, LocalizedLabel>
  sourceTypeLabels: Record<string, string>
  existingSpectrumIds: string[]
}

/** Unwraps a clack prompt result, exiting cleanly on Esc/Ctrl+C instead of letting the cancel `symbol` leak into the caller. */
async function unwrap<T>(promptPromise: Promise<T | symbol>): Promise<T> {
  const value = await promptPromise
  if (isCancel(value)) {
    cancel('Cancelled.')
    process.exit(0)
  }
  return value
}

async function askText(
  message: string,
  currentValue: string | null | undefined,
  opts: { placeholder?: string; validate?: (value: string) => string | undefined } = {},
): Promise<string | undefined> {
  const customValidate = opts.validate
  const value = await unwrap(
    text({
      message,
      initialValue: currentValue ?? '',
      placeholder: opts.placeholder,
      validate: customValidate ? (v) => customValidate(v ?? '') : undefined,
    }),
  )
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}

async function askRequiredText(
  message: string,
  opts: { placeholder?: string; validate?: (value: string) => string | undefined } = {},
): Promise<string> {
  const customValidate = opts.validate
  const value = await unwrap(
    text({
      message,
      placeholder: opts.placeholder,
      validate: (v) => {
        const normalized = v ?? ''
        return customValidate?.(normalized) ?? (normalized.trim() ? undefined : 'Required')
      },
    }),
  )
  return value.trim()
}

async function askConfirm(message: string, initialValue = false): Promise<boolean> {
  return unwrap(confirm({ message, initialValue }))
}

/** Select from a project vocabulary dict (sampleState/container/sourceType), with an escape hatch for values not yet in it. */
async function askEnum(
  message: string,
  currentValue: string | null | undefined,
  dict: Record<string, LocalizedLabel>,
): Promise<string | undefined> {
  const NONE = '__none__'
  const OTHER = '__other__'
  const knownValue = currentValue && dict[currentValue] ? currentValue : undefined
  const options = [
    { value: NONE, label: '(none)' },
    ...Object.entries(dict).map(([key, label]) => ({
      value: key,
      label: typeof label === 'string' ? label : (label.ru ?? key),
      hint: key,
    })),
    { value: OTHER, label: 'Other… (type a custom value)' },
  ]
  const initialValue = knownValue ?? (currentValue ? OTHER : NONE)
  const picked = await unwrap(select({ message, options, initialValue }))
  if (picked === NONE) return undefined
  if (picked === OTHER) {
    return askText('Custom value (also add it to src/locales/collection.ts)', knownValue ? undefined : currentValue)
  }
  return picked
}

async function askLocalizedLabel(
  message: string,
  current: LocalizedLabel | null | undefined,
): Promise<LocalizedLabel | undefined> {
  const currentRu = typeof current === 'string' ? current : current?.ru
  const currentEn = typeof current === 'string' ? undefined : current?.en
  const currentZh = typeof current === 'string' ? undefined : current?.zh
  const ru = await askText(`${message} — Russian`, currentRu)
  if (ru === undefined) return undefined
  const en = await askText(`${message} — English (leave empty to show the Russian text as-is)`, currentEn)
  const zh = await askText(`${message} — Chinese (leave empty to show the Russian text as-is)`, currentZh)
  if (en === undefined && zh === undefined) return ru
  const result: { ru: string; en?: string; zh?: string } = { ru }
  if (en !== undefined) result.en = en
  if (zh !== undefined) result.zh = zh
  return result
}

async function askDecayChain(
  existing: ElementCollectionDecayParent[] | null | undefined,
): Promise<ElementCollectionDecayParent[] | undefined> {
  note(
    'Order: most distant ancestor first, down to the immediate parent — e.g. Pb-210 → Bi-210 for a Po-210 sample.',
    'Decay chain',
  )
  const chain: ElementCollectionDecayParent[] = existing ? existing.map((p) => ({ ...p })) : []
  while (true) {
    if (chain.length) {
      log.step(`Current chain: ${chain.map((p) => `${p.symbol}-${p.isotope}`).join(' → ')}`)
    }
    const add = await askConfirm(chain.length ? 'Add another ancestor?' : 'Add an ancestor?', chain.length === 0)
    if (!add) break
    const symbol = await askRequiredText('Parent symbol', { placeholder: 'e.g. Pb' })
    const isotope = await askRequiredText('Parent mass number', { placeholder: 'e.g. 210' })
    chain.push({ symbol, isotope })
  }
  return chain.length ? chain : undefined
}

async function askAnnotations(
  existing: SpectrumAnnotation[] | null | undefined,
): Promise<SpectrumAnnotation[] | undefined> {
  note(
    "Only mark a line that's both a documented emission line for the isotope AND actually visible above background in this specific spectrum file — not a textbook value pasted in blind.",
    'Reference lines',
  )
  const list: SpectrumAnnotation[] = existing ? existing.map((a) => ({ ...a })) : []
  while (true) {
    if (list.length) {
      log.step(`Current lines: ${list.map((a) => `${a.energy} keV — ${a.label}`).join('; ')}`)
    }
    const add = await askConfirm(list.length ? 'Add another line?' : 'Add a line?', list.length === 0)
    if (!add) break
    const energyStr = await askRequiredText('Energy, keV', {
      placeholder: 'e.g. 46.5',
      validate: (v) => (v.trim() && !Number.isNaN(Number(v)) ? undefined : 'Must be a number'),
    })
    const label = await askRequiredText('Label', { placeholder: 'e.g. "Pb-210"' })
    list.push({ energy: Number(energyStr), label })
  }
  return list.length ? list : undefined
}

function cleanObject<T extends object>(obj: T): T | undefined {
  const entries = Object.entries(obj).filter(([, v]) => v !== undefined)
  return entries.length ? (Object.fromEntries(entries) as T) : undefined
}

async function editWizard(
  existing: ElementCollection | undefined,
  vocab: Vocabulary,
): Promise<ElementCollection | null> {
  log.info('Physical sample')
  const physical: ElementCollectionPhysical = {}
  physical.sampleState = await askEnum('Sample state', existing?.physical?.sampleState, vocab.sampleStateLabels)
  physical.container = await askEnum('Container', existing?.physical?.container, vocab.containerLabels)
  physical.purity = await askText('Purity', existing?.physical?.purity, {
    placeholder: '999 → 99.9%; 6N → 99.9999%; ~999 → ~99.9% (approximate)',
  })
  physical.weight = await askText('Weight, grams', existing?.physical?.weight, {
    placeholder: '1.85 → 1.85 g; ~1.85 → ~1.85 g (approximate)',
  })
  const wantDescription = await askConfirm(
    'Use a ready-made description instead of sampleState (e.g. "Clock hands with self-luminous paint")?',
    !!existing?.physical?.description,
  )
  physical.description = wantDescription
    ? await askLocalizedLabel('Sample description', existing?.physical?.description)
    : undefined
  const hasPhysical = Object.values(physical).some((v) => v !== undefined)

  log.info('Radioactivity')
  const isRadioactive = await askConfirm('Radioactive sample?', !!existing?.radioactive)
  let radioactive: ElementCollectionRadioactive | undefined
  if (isRadioactive) {
    radioactive = {}
    radioactive.isotope = await askText('Isotope mass number', existing?.radioactive?.isotope, {
      placeholder: 'e.g. 226 for ²²⁶Ra',
    })
    radioactive.sourceType = await askEnum(
      'Source type',
      existing?.radioactive?.sourceType,
      vocab.sourceTypeLabels,
    )
    const wantChain = await askConfirm(
      'Add a decay chain (decayParent)?',
      !!existing?.radioactive?.decayParent?.length,
    )
    radioactive.decayParent = wantChain ? await askDecayChain(existing?.radioactive?.decayParent) : undefined
  }

  log.info('Gamma spectrum')
  const hasSpectrum = await askConfirm('Do you have a gamma-spectrum file for this sample?', !!existing?.spectrum)
  let spectrum: ElementCollectionSpectrum | undefined
  if (hasSpectrum) {
    const id = await askText('Spectrum id', existing?.spectrum?.id, {
      placeholder: 'symbol-atomicnumber-label, e.g. th-90-wt20',
    })
    log.step(`Existing spectrum ids in src/data/spectra/: ${vocab.existingSpectrumIds.join(', ') || '(none)'}`)
    if (id && !vocab.existingSpectrumIds.includes(id)) {
      log.warn(
        `File src/data/spectra/${id}.json not found — run \`pnpm data:spectrum:convert -- <input.xml> ${id}\` first.`,
      )
    }
    const filename = await askLocalizedLabel('Download filename', existing?.spectrum?.filename)
    const wantAnnotations = await askConfirm(
      'Add reference line annotations?',
      !!existing?.spectrum?.annotations?.length,
    )
    const annotations = wantAnnotations ? await askAnnotations(existing?.spectrum?.annotations) : undefined
    if (id) spectrum = { id, filename, annotations }
  }

  const entry: ElementCollection = {}
  if (hasPhysical) entry.physical = cleanObject(physical)
  if (radioactive) entry.radioactive = cleanObject(radioactive)
  if (spectrum) entry.spectrum = cleanObject(spectrum)

  note(JSON.stringify(entry, null, 2), 'Entry preview')
  const confirmed = await askConfirm('Save?', true)
  return confirmed ? entry : null
}

async function pickSymbol(vocab: Vocabulary, myElements: Record<string, ElementCollection>): Promise<string | null> {
  const owned = Object.keys(myElements).length
  const options = [
    { value: '__exit__', label: 'Exit', hint: 'quit the wizard' },
    ...vocab.elements.map((el) => ({
      value: el.symbol,
      label: `${el.symbol} — ${vocab.elementNames[el.symbol] ?? ''}`,
      hint: myElements[el.symbol] ? 'in collection' : undefined,
    })),
  ]
  const picked = await unwrap(
    autocomplete({
      message: `Element symbol or name (${owned}/${vocab.elements.length} in collection)`,
      options,
      placeholder: 'Type to search…',
      maxItems: 10,
    }),
  )
  return picked === '__exit__' ? null : picked
}

async function pickAction(hasExisting: boolean): Promise<'edit' | 'delete' | 'add' | 'back'> {
  const options = hasExisting
    ? [
        { value: 'edit' as const, label: 'Edit' },
        { value: 'delete' as const, label: 'Delete' },
        { value: 'back' as const, label: 'Back' },
      ]
    : [
        { value: 'add' as const, label: 'Add to collection' },
        { value: 'back' as const, label: 'Back' },
      ]
  return unwrap(select({ message: 'Action', options }))
}

async function loadVocabulary(): Promise<Vocabulary> {
  const elements = loadElements()
  const ruMessages = (await import('../../src/locales/lang/ru.ts')).default
  const { sampleStateLabels, containerLabels } = await import('../../src/locales/collection.ts')
  const existingSpectrumIds = readdirSync(SPECTRA_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))

  return {
    elements,
    elementNames: ruMessages.elements,
    sampleStateLabels,
    containerLabels,
    sourceTypeLabels: ruMessages.sidebar.sourceTypes,
    existingSpectrumIds,
  }
}

export async function manageCollection(initialSymbol?: string): Promise<void> {
  const vocab = await loadVocabulary()
  const myElements = await loadCollection()

  if (initialSymbol) {
    const requestedSymbol = initialSymbol
    const match = vocab.elements.find((el) => el.symbol.toLowerCase() === requestedSymbol.toLowerCase())
    if (!match) {
      console.error(`Unknown element symbol "${requestedSymbol}"`)
      process.exit(1)
    }
    initialSymbol = match.symbol
  }

  intro('Manage collection — src/data/collection.ts')

  let pendingSymbol = initialSymbol
  while (true) {
    const symbol = pendingSymbol ?? (await pickSymbol(vocab, myElements))
    pendingSymbol = undefined
    if (symbol === null) break

    const el = vocab.elements.find((e) => e.symbol === symbol)
    if (!el) break
    const existing = myElements[symbol]
    note(
      existing ? JSON.stringify(existing, null, 2) : '(not in collection yet)',
      `${symbol} — ${vocab.elementNames[symbol] ?? ''} (#${el.number})`,
    )

    const action = await pickAction(!!existing)
    if (action === 'back') continue

    if (action === 'add' || action === 'edit') {
      const result = await editWizard(existing, vocab)
      if (result) {
        myElements[symbol] = result
        saveCollection(myElements, vocab.elements)
        log.success(`Saved ${symbol} to collection.ts`)
      } else {
        log.info('Cancelled — no changes saved.')
      }
    } else if (action === 'delete') {
      const confirmed = await askConfirm(`Really delete ${symbol} from the collection?`, false)
      if (confirmed) {
        delete myElements[symbol]
        saveCollection(myElements, vocab.elements)
        log.success(`Removed ${symbol} from collection.ts`)
      }
    }
  }

  outro('Done. Remember to run `pnpm check` before committing.')
}
