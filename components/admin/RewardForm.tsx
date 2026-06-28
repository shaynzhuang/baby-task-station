import { useState } from 'react'
import type { Reward } from '@/lib/supabase/types'
import Button from '@/components/ui/Button'

type FormData = Pick<Reward, 'title' | 'description' | 'points_required' | 'stock' | 'enabled'>

type Props = {
  initial?: Partial<FormData>
  onSubmit: (data: FormData) => void
  onCancel: () => void
}

export default function RewardForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<FormData>({
    title: initial?.title ?? '',
    description: initial?.description ?? '',
    points_required: initial?.points_required ?? 10,
    stock: initial?.stock ?? -1,
    enabled: initial?.enabled ?? true,
  })

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-gray-600 block mb-1">礼物名称 *</label>
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
          <label className="text-sm text-gray-600 block mb-1">所需积分</label>
          <input
            type="number" min={1}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
            value={form.points_required}
            onChange={e => setForm(f => ({ ...f, points_required: Number(e.target.value) }))}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm text-gray-600 block mb-1">库存（-1=无限）</label>
          <input
            type="number" min={-1}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
            value={form.stock}
            onChange={e => setForm(f => ({ ...f, stock: Number(e.target.value) }))}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="secondary" onClick={onCancel}>取消</Button>
        <Button onClick={() => form.title && onSubmit(form)} disabled={!form.title}>保存</Button>
      </div>
    </div>
  )
}
