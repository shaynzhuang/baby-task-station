import { NextRequest, NextResponse } from 'next/server'
import { getChild } from '@/lib/queries/children'
import { logTaskCompletion } from '@/lib/queries/logs'
import { addPoints } from '@/lib/queries/children'
import { getTodayLogs } from '@/lib/queries/logs'
import { getTasksForChild } from '@/lib/queries/tasks'

export async function POST(req: NextRequest) {
  const { childId, taskId } = await req.json()
  if (!childId || !taskId) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  // Verify task belongs to this child and is enabled
  const tasks = await getTasksForChild(childId)
  const task = tasks.find(t => t.id === taskId)
  if (!task) return NextResponse.json({ error: 'task not found' }, { status: 404 })

  // Check not already completed today
  const todayLogs = await getTodayLogs(childId)
  const alreadyDone = todayLogs.some(l => l.task_id === taskId)
  if (alreadyDone) return NextResponse.json({ error: 'already completed' }, { status: 409 })

  await logTaskCompletion(childId, taskId, task.points)
  await addPoints(childId, task.points)

  return NextResponse.json({ ok: true, points: task.points })
}
