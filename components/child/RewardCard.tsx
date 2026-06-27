'use client'
import { useState } from 'react'
import type { Reward } from '@/lib/supabase/types'

type Props = {
  reward: Reward
  childId: string
  currentPoints: number
  onRedeem: (rewardId: string, pointsSpent: number) => void
}

export default function RewardCard({ reward, childId, currentPoints, onRedeem }: Props) {
  const [loading, setLoading] = useState(false)
  const [redeemed, setRedeemed] = useState(false)
  const canAfford = currentPoints >= reward.points_required
  const outOfStock = reward.stock === 0

  async function handleRedeem() {
    if (!canAfford || outOfStock || loading || redeemed) return
    if (!confirm(`确定用 ${reward.points_required} 分兑换「${reward.title}」吗？`)) return
    setLoading(true)
    const res = await fetch('/api/rewards/redeem', {
      method: 'POST',
      body: JSON.stringify({ childId, rewardId: reward.id }),
      headers: { 'Content-Type': 'application/json' },
    })
    setLoading(false)
    if (res.ok) {
      setRedeemed(true)
      onRedeem(reward.id, reward.points_required)
    }
  }

  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 ${!canAfford ? 'opacity-50' : ''}`}>
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{reward.title}</div>
        {reward.description && <div className="text-sm text-gray-400">{reward.description}</div>}
        <div className="text-pink-strong font-bold mt-1">{reward.points_required} 分</div>
      </div>
      <button
        onClick={handleRedeem}
        disabled={!canAfford || outOfStock || loading || redeemed}
        className="bg-pink-mid text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-pink-strong transition disabled:opacity-40"
      >
        {redeemed ? '已兑换 ✓' : outOfStock ? '已售罄' : loading ? '...' : '兑换'}
      </button>
    </div>
  )
}
