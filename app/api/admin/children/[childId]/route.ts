import { NextRequest, NextResponse } from 'next/server'
import { updateChild } from '@/lib/queries/children'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params
  const updates = await req.json()
  await updateChild(childId, updates)
  return NextResponse.json({ ok: true })
}
