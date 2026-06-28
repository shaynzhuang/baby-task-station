import { NextRequest, NextResponse } from 'next/server'
import { updateReward } from '@/lib/queries/rewards'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function PATCH(req: NextRequest, { params }: { params: { rewardId: string } }) {
  const updates = await req.json()
  await updateReward(params.rewardId, updates)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: NextRequest, { params }: { params: { rewardId: string } }) {
  const supabase = getSupabaseServerClient()
  await supabase.from('rewards').delete().eq('id', params.rewardId)
  return NextResponse.json({ ok: true })
}
