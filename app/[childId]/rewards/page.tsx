'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RewardCard from '@/components/child/RewardCard'
import type { Child, Reward } from '@/lib/supabase/types'

export default function RewardsPage() {
  const { childId } = useParams<{ childId: string }>()
  const router = useRouter()
  const [child, setChild] = useState<Child | null>(null)
  const [rewards, setRewards] = useState<Reward[]>([])
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [childRes, rewardsRes] = await Promise.all([
        fetch(`/api/children/${childId}`),
        fetch('/api/rewards'),
      ])
      const childData: Child = await childRes.json()
      const rewardsData: Reward[] = await rewardsRes.json()
      setChild(childData)
      setRewards(rewardsData)
      setPoints(childData.total_points)
      setLoading(false)
    }
    load()
  }, [childId])

  function handleRedeem(_: string, pointsSpent: number) {
    setPoints(prev => Math.max(0, prev - pointsSpent))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-ink-muted text-sm">加载中</div>
  if (!child) return null

  return (
    <main className="min-h-screen px-5 py-10 max-w-sm mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-ink-muted text-sm mb-10 hover:text-ink transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest text-ink-muted uppercase mb-1">礼物商店</p>
          <h1 className="text-2xl font-bold text-ink">{child.avatar} {child.name}</h1>
        </div>
        <div
          className="flex flex-col items-center px-4 py-2 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #FAE8EE 0%, #F2C8D4 100%)',
            boxShadow: '0 0 0 3px rgba(242,167,185,0.25)',
          }}
        >
          <span className="text-xl font-bold" style={{ color: '#D4748A' }}>{points}</span>
          <span className="text-xs text-ink-muted">积分</span>
        </div>
      </div>

      <div className="space-y-2">
        {rewards.length === 0 && (
          <p className="text-center text-ink-muted text-sm py-12">还没有礼物</p>
        )}
        {rewards.map(reward => (
          <RewardCard
            key={reward.id}
            reward={reward}
            childId={childId}
            currentPoints={points}
            onRedeem={handleRedeem}
          />
        ))}
      </div>
    </main>
  )
}
