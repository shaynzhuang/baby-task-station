import { getTodayStart, isCompletedToday } from '@/lib/utils/date'

describe('getTodayStart', () => {
  it('returns a Date at midnight local time today', () => {
    const start = getTodayStart()
    expect(start.getHours()).toBe(0)
    expect(start.getMinutes()).toBe(0)
    expect(start.getSeconds()).toBe(0)
  })
})

describe('isCompletedToday', () => {
  it('returns true for a timestamp from today', () => {
    const now = new Date().toISOString()
    expect(isCompletedToday(now)).toBe(true)
  })

  it('returns false for a timestamp from yesterday', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(isCompletedToday(yesterday.toISOString())).toBe(false)
  })
})
