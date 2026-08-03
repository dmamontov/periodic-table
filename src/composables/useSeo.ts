import { watchEffect, type Ref } from 'vue'
import type { Element } from '../types/element'
import type { Locale, LocaleMessages } from '../locales/types'
import { siteTitle, siteUrl } from '../data/myCollection'
import { resolveLocalizedLabel } from '../utils/localizedLabel'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export function useSeo(
  element: Ref<Element | null>,
  routeSymbol: Ref<string | undefined>,
  messages: Ref<LocaleMessages>,
  locale: Ref<Locale>,
) {
  watchEffect(() => {
    const m = messages.value
    const el = element.value
    const symbol = routeSymbol.value
    const siteTitleText = resolveLocalizedLabel(siteTitle, locale.value)

    const elementName = el ? (m.elements[String(el.number)] ?? '') : ''
    const title = el ? `${elementName} (${el.symbol}) — ${siteTitleText}` : siteTitleText
    const description = el
      ? m.seo.elementDescription
          .replace('%name%', elementName)
          .replace('%symbol%', el.symbol)
          .replace('%number%', String(el.number))
      : m.seo.description
    const url = symbol ? `${siteUrl}/element/${symbol}` : `${siteUrl}/`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  })
}
