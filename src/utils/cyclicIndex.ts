/** Wraps `index + delta` into the valid range [0, count) — for looping navigation through a list (arrow keys, prev/next). */
export function cyclicIndex(index: number, delta: number, count: number): number {
  return (index + delta + count) % count
}
