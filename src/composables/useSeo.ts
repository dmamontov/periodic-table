import { computed, type Ref } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import type { Element } from '../types/element/element'
import type { Locale, LocaleMessages } from '../locales/types'
import { siteTitle, siteUrl } from '../data/collection'
import { resolveLocalizedLabel } from '../utils/localizedLabel'

export function useSeo(
  element: Ref<Element | null>,
  routeSymbol: Ref<string | undefined>,
  messages: Ref<LocaleMessages>,
  locale: Ref<Locale>,
) {
  const title = computed(() => {
    const m = messages.value
    const el = element.value
    const siteTitleText = resolveLocalizedLabel(siteTitle, locale.value)
    const elementName = el ? (m.elements[el.symbol] ?? '') : ''
    return el ? `${elementName} (${el.symbol}) — ${siteTitleText}` : siteTitleText
  })

  const description = computed(() => {
    const m = messages.value
    const el = element.value
    if (!el) return m.seo.description
    const elementName = m.elements[el.symbol] ?? ''
    return m.seo.elementDescription
      .replaceAll('%name%', elementName)
      .replaceAll('%symbol%', el.symbol)
      .replaceAll('%number%', String(el.number))
  })

  const url = computed(() => {
    const symbol = routeSymbol.value
    return symbol ? `${siteUrl}/element/${symbol}` : `${siteUrl}/`
  })

  useHead({
    title,
    link: [{ rel: 'canonical', href: url }],
  })

  useSeoMeta({
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    twitterTitle: title,
    twitterDescription: description,
  })
}
