export function calculateNewTotal(current: number, delta: number): number {
  return Math.max(0, current + delta)
}
