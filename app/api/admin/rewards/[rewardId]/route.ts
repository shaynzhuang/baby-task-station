import { NextRequest, NextResponse } from 'next/server'
import { updateReward } from '@/lib/queries/rewards'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ rewardId: string }> }) {
  const { rewardId } = await params
  const updates = await req.json()
  await updateReward(rewardId, updates)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ rewardId: string }> }) {
  const { rewardId } = await params
  const supabase = await getSupabaseServerClient()
  await supabase.from('rewards').delete().eq('id', rewardId)
  return NextResponse.json({ ok: true })
}
