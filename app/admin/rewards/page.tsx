'use client'
import { useEffect, useState } from 'react'
import type { Reward } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import RewardForm, { type RewardFormData } from '@/components/admin/RewardForm'

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Reward | null>(null)

  useEffect(() => {
    fetch('/api/admin/rewards').then(r => r.json()).then(setRewards)
  }, [])

  async function handleAdd(data: RewardFormData) {
    await fetch('/api/admin/rewards', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    const updated = await fetch('/api/admin/rewards').then(r => r.json())
    setRewards(updated)
    setShowAdd(false)
  }

  async function handleEdit(data: RewardFormData) {
    if (!editing) return
    await fetch(`/api/admin/rewards/${editing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    setRewards(prev => prev.map(r => r.id === editing.id ? { ...r, ...data } : r))
    setEditing(null)
  }

  async function handleDelete(rewardId: string) {
    if (!confirm('确定删除这个礼物吗？')) return
    await fetch(`/api/admin/rewards/${rewardId}`, { method: 'DELETE' })
    setRewards(prev => prev.filter(r => r.id !== rewardId))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">礼物管理</h1>
        <Button onClick={() => setShowAdd(true)}>+ 添加礼物</Button>
      </div>
      <div className="space-y-3">
        {rewards.map(reward => (
          <Card key={reward.id} className={`flex items-center gap-4 ${!reward.enabled ? 'opacity-50' : ''}`}>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{reward.title}</div>
              <div className="text-sm text-gray-400">
                {reward.points_required}分 · 库存：{reward.stock === -1 ? '无限' : reward.stock}
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setEditing(reward)}>编辑</Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(reward.id)}>删除</Button>
          </Card>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="添加礼物">
        <RewardForm onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="编辑礼物">
        {editing && (
          <RewardForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
        )}
      </Modal>
    </div>
  )
}
