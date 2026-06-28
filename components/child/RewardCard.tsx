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

  const isDisabled = !canAfford || outOfStock || loading || redeemed

  return (
    <div
      className={`bg-surface rounded-xl px-4 py-4 flex items-center gap-4 transition-all ${!canAfford && !redeemed ? 'opacity-40' : ''}`}
      style={{ boxShadow: '0 1px 4px rgba(44,36,56,0.06)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-ink truncate">{reward.title}</div>
        {reward.description && (
          <div className="text-xs text-ink-muted mt-0.5 truncate">{reward.description}</div>
        )}
        <div className="text-xs font-semibold mt-1.5" style={{ color: '#D4748A' }}>
          {reward.points_required} 积分
        </div>
      </div>

      <button
        onClick={handleRedeem}
        disabled={isDisabled}
        className="flex-shrink-0 text-xs font-semibold px-4 py-2 rounded-lg transition-all"
        style={
          redeemed
            ? { backgroundColor: '#F2A7B9', color: '#fff' }
            : outOfStock
            ? { backgroundColor: '#E2DCE8', color: '#9B8FA4' }
            : canAfford
            ? { backgroundColor: '#2C2438', color: '#FFF8F6' }
            : { backgroundColor: '#E2DCE8', color: '#9B8FA4' }
        }
      >
        {redeemed ? '已兑换' : outOfStock ? '售罄' : loading ? '…' : '兑换'}
      </button>
    </div>
  )
}
