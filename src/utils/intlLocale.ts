/** Intl APIs (toLocaleString/toLocaleDateString) want 'zh-CN', not the app's own 'zh' locale code. */
export function toIntlLocale(locale: string): string {
  return locale === 'zh' ? 'zh-CN' : locale;
}
