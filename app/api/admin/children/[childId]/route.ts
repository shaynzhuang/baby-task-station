import { NextRequest, NextResponse } from 'next/server'
import { updateChild } from '@/lib/queries/children'

export async function PATCH(req: NextRequest, { params }: { params: { childId: string } }) {
  const updates = await req.json()
  await updateChild(params.childId, updates)
  return NextResponse.json({ ok: true })
}
