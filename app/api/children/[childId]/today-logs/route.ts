import { NextRequest, NextResponse } from 'next/server'
import { getTodayLogs } from '@/lib/queries/logs'

export async function GET(_: NextRequest, { params }: { params: { childId: string } }) {
  const logs = await getTodayLogs(params.childId)
  return NextResponse.json(logs)
}
