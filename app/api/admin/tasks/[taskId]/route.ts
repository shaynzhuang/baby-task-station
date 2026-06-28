import { NextRequest, NextResponse } from 'next/server'
import { updateTask, deleteTask } from '@/lib/queries/tasks'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  const updates = await req.json()
  await updateTask(taskId, updates)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params
  await deleteTask(taskId)
  return NextResponse.json({ ok: true })
}
