import { NextRequest, NextResponse } from 'next/server'
import { getTasksForChild } from '@/lib/queries/tasks'

export async function GET(_: NextRequest, { params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params
  const tasks = await getTasksForChild(childId)
  return NextResponse.json(tasks)
}
