'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import TaskItem from '@/components/child/TaskItem'
import type { Child, Task, TaskLog } from '@/lib/supabase/types'

export default function ChildTaskPage() {
  const { childId } = useParams<{ childId: string }>()
  const router = useRouter()
  const [child, setChild] = useState<Child | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [childRes, tasksRes, logsRes] = await Promise.all([
        fetch(`/api/children/${childId}`),
        fetch(`/api/children/${childId}/tasks`),
        fetch(`/api/children/${childId}/today-logs`),
      ])
      const childData: Child = await childRes.json()
      const tasksData: Task[] = await tasksRes.json()
      const logsData: TaskLog[] = await logsRes.json()
      setChild(childData)
      setTasks(tasksData)
      setPoints(childData.total_points)
      setCompletedIds(new Set(logsData.map(l => l.task_id)))
      setLoading(false)
    }
    load()
  }, [childId])

  function handleComplete(taskId: string, earned: number) {
    setCompletedIds(prev => new Set([...prev, taskId]))
    setPoints(prev => prev + earned)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-ink-muted text-sm">加载中</div>
  if (!child) return null

  const completedCount = completedIds.size
  const totalCount = tasks.length

  return (
    <main className="min-h-screen px-5 py-10 max-w-sm mx-auto">
      {/* Header */}
      <button onClick={() => router.push('/')} className="flex items-center gap-1 text-ink-muted text-sm mb-10 hover:text-ink transition">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回
      </button>

      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs tracking-widest text-ink-muted uppercase mb-1">今日任务</p>
          <h1 className="text-2xl font-bold text-ink">{child.avatar} {child.name}</h1>
        </div>
        {/* Points badge — signature element */}
        <div
          className="flex flex-col items-center px-4 py-2 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #FAE8EE 0%, #F2C8D4 100%)',
            boxShadow: '0 0 0 3px rgba(242,167,185,0.25)',
          }}
        >
          <span className="text-xl font-bold text-rose-deep" style={{ color: '#D4748A' }}>{points}</span>
          <span className="text-xs text-ink-muted">积分</span>
        </div>
      </div>

      {/* Progress hint */}
      {totalCount > 0 && (
        <p className="text-xs text-ink-muted mb-4">
          今天完成了 <span className="font-semibold text-ink">{completedCount}</span> / {totalCount} 个任务
        </p>
      )}

      <div className="space-y-2 mb-10">
        {tasks.length === 0 && (
          <p className="text-center text-ink-muted text-sm py-12">还没有任务</p>
        )}
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            childId={childId}
            completed={completedIds.has(task.id)}
            onComplete={handleComplete}
          />
        ))}
      </div>

      <Link
        href={`/${childId}/rewards`}
        className="flex items-center justify-between bg-ink text-bg rounded-2xl px-6 py-4 font-medium hover:opacity-90 transition"
      >
        <span>去兑换礼物</span>
        <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </main>
  )
}
