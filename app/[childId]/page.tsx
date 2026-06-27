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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">加载中...</div>
  if (!child) return null

  return (
    <main className="min-h-screen px-4 py-8 max-w-md mx-auto">
      <button onClick={() => router.push('/')} className="text-gray-400 text-sm mb-6">← 返回</button>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{child.avatar}</span>
        <h1 className="text-2xl font-bold text-gray-800">{child.name}的任务</h1>
      </div>
      <div className="text-sm text-gray-500 mb-6">当前积分：<span className="font-bold text-pink-strong text-lg">{points}</span> 分</div>

      <div className="space-y-3 mb-8">
        {tasks.length === 0 && <p className="text-center text-gray-400 py-8">还没有任务 ✨</p>}
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
        className="block text-center bg-pink-soft text-pink-strong font-semibold rounded-2xl py-3 hover:bg-pink-mid hover:text-white transition"
      >
        去兑换礼物 🎁
      </Link>
    </main>
  )
}
