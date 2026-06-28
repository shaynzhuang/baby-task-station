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
    <div
      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-150 ${
        completed ? 'opacity-45' : 'bg-surface'
      }`}
      style={completed ? {} : { boxShadow: '0 1px 4px rgba(44,36,56,0.06)' }}
    >
      <button
        onClick={handleComplete}
        disabled={completed || loading}
        className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-150"
        style={completed
          ? { backgroundColor: '#D4748A', borderColor: '#D4748A' }
          : { borderColor: '#F2A7B9' }
        }
      >
        {completed && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {loading && <span className="w-2 h-2 rounded-full bg-rose animate-pulse" />}
      </button>

      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium truncate ${completed ? 'line-through text-ink-muted' : 'text-ink'}`}>
          {task.title}
        </div>
        {task.description && (
          <div className="text-xs text-ink-muted mt-0.5 truncate">{task.description}</div>
        )}
      </div>

      <div className="text-xs font-semibold flex-shrink-0" style={{ color: '#D4748A' }}>
        +{task.points}
      </div>
    </div>
  )
}
