import { useState } from 'react'
import type { Child } from '@/lib/supabase/types'
import Button from '@/components/ui/Button'

export type TaskTaskFormData = {
  title: string
  description: string
  points: number
  type: 'daily' | 'once'
  child_id: string | null
  enabled: boolean
  category: string
}

type Props = {
  initial?: Partial<TaskFormData>
  children: Child[]
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
}

export default function TaskForm({ initial, children, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<TaskFormData>({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    points: initial?.points ?? 1,
    type: initial?.type ?? 'daily',
    child_id: initial?.child_id ?? null,
    enabled: initial?.enabled ?? true,
    category: initial?.category ?? 'general',
  })

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-600 block mb-1">任务名称 *</label>
        <input
          className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm text-gray-600 block mb-1">描述</label>
        <input
          className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-gray-600 block mb-1">积分</label>
          <input
            type="number"
            min={1}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
            value={form.points}
            onChange={e => setForm(f => ({ ...f, points: Number(e.target.value) }))}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600 block mb-1">类型</label>
          <select
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value as 'daily' | 'once' }))}
          >
            <option value="daily">每日任务</option>
            <option value="once">一次性</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-600 block mb-1">分配给</label>
        <select
          className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
          value={form.child_id ?? ''}
          onChange={e => setForm(f => ({ ...f, child_id: e.target.value || null }))}
        >
          <option value="">两人共享</option>
          {children.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="secondary" onClick={onCancel}>取消</Button>
        <Button onClick={() => form.title && onSubmit(form)} disabled={!form.title}>保存</Button>
      </div>
    </div>
  )
}
