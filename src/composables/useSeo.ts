import { watchEffect, type Ref } from 'vue'
import type { Element } from '../types/element'
import type { LocaleMessages } from '../locales/types'

const SITE_URL = 'https://periodic.mamontov.tech'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export function useSeo(
  element: Ref<Element | null>,
  routeSymbol: Ref<string | undefined>,
  messages: Ref<LocaleMessages>,
) {
  watchEffect(() => {
    const m = messages.value
    const el = element.value
    const symbol = routeSymbol.value

    const elementName = el ? (m.elements[String(el.number)] ?? '') : ''
    const title = el ? `${elementName} (${el.symbol}) — ${m.title}` : m.title
    const description = el
      ? m.seo.elementDescription
          .replace('%name%', elementName)
          .replace('%symbol%', el.symbol)
          .replace('%number%', String(el.number))
      : m.seo.description
    const url = symbol ? `${SITE_URL}/element/${symbol}` : `${SITE_URL}/`

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
