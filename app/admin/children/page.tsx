'use client'
import { useEffect, useState } from 'react'
import type { Child } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

export default function AdminChildrenPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [editing, setEditing] = useState<Child | null>(null)
  const [form, setForm] = useState({ name: '', avatar: '', color: '' })

  useEffect(() => {
    fetch('/api/children').then(r => r.json()).then(setChildren)
  }, [])

  function openEdit(child: Child) {
    setEditing(child)
    setForm({ name: child.name, avatar: child.avatar, color: child.color })
  }

  async function handleSave() {
    if (!editing) return
    await fetch(`/api/admin/children/${editing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    })
    setChildren(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c))
    setEditing(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">孩子管理</h1>
      <div className="space-y-3">
        {children.map(child => (
          <Card key={child.id} className="flex items-center gap-4">
            <span className="text-3xl">{child.avatar}</span>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{child.name}</div>
              <div className="text-sm text-gray-400">积分：{child.total_points}</div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => openEdit(child)}>编辑</Button>
          </Card>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title="编辑孩子信息">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">名字</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">头像 Emoji</label>
            <input
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-mid"
              value={form.avatar}
              onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">主题颜色（HEX）</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={form.color}
                onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                className="h-10 w-14 rounded border cursor-pointer"
              />
              <span className="text-sm text-gray-500">{form.color}</span>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="secondary" onClick={() => setEditing(null)}>取消</Button>
            <Button onClick={handleSave}>保存</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
