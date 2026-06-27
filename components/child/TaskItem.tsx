'use client'
import { useState } from 'react'
import type { Task } from '@/lib/supabase/types'

type Props = {
  task: Task
  childId: string
  completed: boolean
  onComplete: (taskId: string, points: number) => void
}

export default function TaskItem({ task, childId, completed, onComplete }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleComplete() {
    if (completed || loading) return
    setLoading(true)
    const res = await fetch('/api/tasks/complete', {
      method: 'POST',
      body: JSON.stringify({ childId, taskId: task.id }),
      headers: { 'Content-Type': 'application/json' },
    })
    setLoading(false)
    if (res.ok) {
      onComplete(task.id, task.points)
    }
  }

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl transition ${completed ? 'bg-gray-50 opacity-60' : 'bg-white shadow-sm'}`}>
      <button
        onClick={handleComplete}
        disabled={completed || loading}
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition flex-shrink-0 ${
          completed ? 'bg-green-400 border-green-400 text-white' : 'border-pink-mid hover:bg-pink-soft'
        }`}
      >
        {completed ? '✓' : loading ? '...' : ''}
      </button>
      <div className="flex-1">
        <div className={`font-semibold ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </div>
        {task.description && (
          <div className="text-sm text-gray-400">{task.description}</div>
        )}
      </div>
      <div className="text-sm font-bold text-pink-strong">+{task.points}分</div>
    </div>
  )
}
