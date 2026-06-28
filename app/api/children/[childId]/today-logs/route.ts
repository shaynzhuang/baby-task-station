import { NextRequest, NextResponse } from 'next/server'
import { getTodayLogs } from '@/lib/queries/logs'

export async function GET(_: NextRequest, { params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params
  const logs = await getTodayLogs(childId)
  return NextResponse.json(logs)
}
