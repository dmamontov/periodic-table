/** First non-empty string, e.g. a fetched name over a blank field before falling back to a lookup table. */
export function firstNonEmpty(...values: (string | null | undefined)[]): string {
  for (const value of values) {
    if (value) return value;
  }
  return '';
}
