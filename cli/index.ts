#!/usr/bin/env tsx
import { existsSync } from 'node:fs'
import { Command } from 'commander'
import { intro, cancel, isCancel, select, text } from '@clack/prompts'
import { buildSitemap } from './commands/sitemap.ts'
import { convertSpectrum } from './commands/spectrum.ts'
import { manageCollection } from './commands/collection.ts'

const program = new Command()
  .name('periodic-table')
  .description('Project tooling for the periodic-table app: sitemap generation, spectrum conversion, and collection management.')

program
  .command('sitemap')
  .description('Generate public/sitemap.xml from src/data/elements/elements.ts and collection.ts siteUrl')
  .action(() => buildSitemap())

program
  .command('spectrum')
  .description("Convert a RadiaCode/GammaVision spectrum XML export into the collection's spectrum JSON + public XML download")
  .argument('<input-xml>', 'path to the RadiaCode/GammaVision XML export')
  .argument('<output-id>', 'spectrum id, e.g. th-90-wt20 (symbol-atomicnumber-label)')
  .action((inputXml: string, outputId: string) => convertSpectrum(inputXml, outputId))

program
  .command('collection')
  .description('Interactively add, edit, or delete entries in src/data/collection.ts')
  .argument('[symbol]', 'jump straight to this element symbol instead of picking from a list')
  .action((symbol?: string) => manageCollection(symbol))

async function promptSpectrumArgs(): Promise<void> {
  const inputXml = await text({
    message: 'Path to the RadiaCode/GammaVision XML export',
    validate: (value) => {
      const trimmed = (value ?? '').trim()
      if (!trimmed) return 'Required'
      if (!existsSync(trimmed)) return 'File not found'
      return undefined
    },
  })
  if (isCancel(inputXml)) {
    cancel('Cancelled.')
    return
  }
  const outputId = await text({
    message: 'Spectrum id',
    placeholder: 'symbol-atomicnumber-label, e.g. th-90-wt20',
    validate: (value) => ((value ?? '').trim() ? undefined : 'Required'),
  })
  if (isCancel(outputId)) {
    cancel('Cancelled.')
    return
  }
  convertSpectrum(inputXml.trim(), outputId.trim())
}

async function showMenu(): Promise<void> {
  intro('Periodic Table — project tools')
  const choice = await select({
    message: 'What do you want to do?',
    options: [
      { value: 'collection', label: 'Manage collection', hint: 'add/edit/delete collection.ts entries' },
      { value: 'spectrum', label: 'Convert a spectrum XML', hint: 'RadiaCode/GammaVision export → collection JSON' },
      { value: 'sitemap', label: 'Build sitemap', hint: 'regenerate public/sitemap.xml' },
      { value: 'exit', label: 'Exit' },
    ],
  })
  if (isCancel(choice) || choice === 'exit') {
    cancel('Bye.')
    return
  }
  if (choice === 'sitemap') {
    buildSitemap()
    return
  }
  if (choice === 'spectrum') {
    await promptSpectrumArgs()
    return
  }
  if (choice === 'collection') {
    await manageCollection()
  }
}

async function main(): Promise<void> {
  if (process.argv.length <= 2) {
    await showMenu()
    return
  }
  await program.parseAsync(process.argv)
}

main().catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
