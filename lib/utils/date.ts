export function getTodayStart(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function isCompletedToday(timestamp: string): boolean {
  return new Date(timestamp) >= getTodayStart()
}
