import { calculateNewTotal } from '@/lib/utils/points'

describe('calculateNewTotal', () => {
  it('adds earned points to current total', () => {
    expect(calculateNewTotal(10, 5)).toBe(15)
  })

  it('never goes below 0 when deducting', () => {
    expect(calculateNewTotal(3, -10)).toBe(0)
  })
})
