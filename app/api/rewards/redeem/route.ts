import { NextRequest, NextResponse } from 'next/server'
import { redeemReward, getRewards } from '@/lib/queries/rewards'
import { getChild } from '@/lib/queries/children'

export async function POST(req: NextRequest) {
  const { childId, rewardId } = await req.json()
  if (!childId || !rewardId) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }

  const child = await getChild(childId)
  const rewards = await getRewards()
  const reward = rewards.find(r => r.id === rewardId)
  if (!reward) return NextResponse.json({ error: 'reward not found' }, { status: 404 })
  if (child.total_points < reward.points_required) {
    return NextResponse.json({ error: 'not enough points' }, { status: 400 })
  }
  if (reward.stock === 0) {
    return NextResponse.json({ error: 'out of stock' }, { status: 400 })
  }

  await redeemReward(childId, rewardId)
  return NextResponse.json({ ok: true })
}
