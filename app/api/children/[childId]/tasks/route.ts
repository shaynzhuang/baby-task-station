import { NextRequest, NextResponse } from 'next/server'
import { getTasksForChild } from '@/lib/queries/tasks'

export async function GET(_: NextRequest, { params }: { params: { childId: string } }) {
  const tasks = await getTasksForChild(params.childId)
  return NextResponse.json(tasks)
}
