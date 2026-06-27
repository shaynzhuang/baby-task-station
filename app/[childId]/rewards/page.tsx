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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">加载中...</div>
  if (!child) return null

  return (
    <main className="min-h-screen px-4 py-8 max-w-md mx-auto">
      <button onClick={() => router.back()} className="text-gray-400 text-sm mb-6">← 返回</button>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{child.avatar}</span>
        <h1 className="text-2xl font-bold text-gray-800">兑换礼物</h1>
      </div>
      <div className="text-sm text-gray-500 mb-6">当前积分：<span className="font-bold text-pink-strong text-lg">{points}</span> 分</div>

      <div className="space-y-3">
        {rewards.length === 0 && <p className="text-center text-gray-400 py-8">还没有礼物 🎁</p>}
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
