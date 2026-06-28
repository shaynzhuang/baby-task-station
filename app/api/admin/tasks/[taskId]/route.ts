import { NextRequest, NextResponse } from 'next/server'
import { updateTask, deleteTask } from '@/lib/queries/tasks'

export async function PATCH(req: NextRequest, { params }: { params: { taskId: string } }) {
  const updates = await req.json()
  await updateTask(params.taskId, updates)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: { params: { taskId: string } }) {
  await deleteTask(params.taskId)
  return NextResponse.json({ ok: true })
}
