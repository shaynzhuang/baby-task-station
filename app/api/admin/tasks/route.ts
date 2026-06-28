import { NextRequest, NextResponse } from 'next/server'
import { getTasks, createTask } from '@/lib/queries/tasks'

export async function GET() {
  return NextResponse.json(await getTasks())
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  await createTask(data)
  return NextResponse.json({ ok: true })
}
