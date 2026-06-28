import { NextRequest, NextResponse } from 'next/server'
import { logTaskCompletion, getTodayLogs, getAllLogsForTask } from '@/lib/queries/logs'
import { addPoints } from '@/lib/queries/children'
import { getTasksForChild } from '@/lib/queries/tasks'

export async function POST(req: NextRequest) {
  const { childId, taskId } = await req.json()
  if (!childId || !taskId) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const tasks = await getTasksForChild(childId)
  const task = tasks.find(t => t.id === taskId)
  if (!task) return NextResponse.json({ error: 'task not found' }, { status: 404 })

  // once tasks: check all logs ever; daily tasks: check today only
  if (task.type === 'once') {
    const allLogs = await getAllLogsForTask(childId, taskId)
    if (allLogs.length > 0) return NextResponse.json({ error: 'already completed' }, { status: 409 })
  } else {
    const todayLogs = await getTodayLogs(childId)
    const alreadyDone = todayLogs.some(l => l.task_id === taskId)
    if (alreadyDone) return NextResponse.json({ error: 'already completed' }, { status: 409 })
  }

  await logTaskCompletion(childId, taskId, task.points)
  await addPoints(childId, task.points)

  return NextResponse.json({ ok: true, points: task.points })
}
