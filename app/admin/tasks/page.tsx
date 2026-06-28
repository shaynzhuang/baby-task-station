'use client'
import { useEffect, useState } from 'react'
import type { Task, Child } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import TaskForm from '@/components/admin/TaskForm'

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [children, setChildren] = useState<Child[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/tasks').then(r => r.json()),
      fetch('/api/children').then(r => r.json()),
    ]).then(([t, c]) => { setTasks(t); setChildren(c) })
  }, [])

  async function handleAdd(data: any) {
    await fetch('/api/admin/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    const updated = await fetch('/api/admin/tasks').then(r => r.json())
    setTasks(updated)
    setShowAdd(false)
  }

  async function handleEdit(data: any) {
    if (!editing) return
    await fetch(`/api/admin/tasks/${editing.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    setTasks(prev => prev.map(t => t.id === editing.id ? { ...t, ...data } : t))
    setEditing(null)
  }

  async function handleDelete(taskId: string) {
    if (!confirm('确定删除这个任务吗？')) return
    await fetch(`/api/admin/tasks/${taskId}`, { method: 'DELETE' })
    setTasks(prev => prev.filter(t => t.id !== taskId))
  }

  async function toggleEnabled(task: Task) {
    await fetch(`/api/admin/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled: !task.enabled }),
      headers: { 'Content-Type': 'application/json' },
    })
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, enabled: !t.enabled } : t))
  }

  const childName = (id: string | null) => id ? children.find(c => c.id === id)?.name ?? '?' : '共享'

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">任务管理</h1>
        <Button onClick={() => setShowAdd(true)}>+ 添加任务</Button>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <Card key={task.id} className={`flex items-center gap-4 ${!task.enabled ? 'opacity-50' : ''}`}>
            <div className="flex-1">
              <div className="font-semibold text-gray-800">{task.title}</div>
              <div className="text-sm text-gray-400">
                {task.type === 'daily' ? '每日' : '一次性'} · {childName(task.child_id)} · {task.points}分
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={() => toggleEnabled(task)}>
              {task.enabled ? '禁用' : '启用'}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setEditing(task)}>编辑</Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>删除</Button>
          </Card>
        ))}
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="添加任务">
        <TaskForm children={children} onSubmit={handleAdd} onCancel={() => setShowAdd(false)} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title="编辑任务">
        {editing && (
          <TaskForm initial={editing} children={children} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
        )}
      </Modal>
    </div>
  )
}
