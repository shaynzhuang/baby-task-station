import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { TaskLog } from '@/lib/supabase/types'
import { getTodayStart } from '@/lib/utils/date'

export async function logTaskCompletion(
  childId: string,
  taskId: string,
  points: number
): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('task_logs').insert({
    child_id: childId,
    task_id: taskId,
    points_earned: points,
  })
  if (error) throw error
}

export async function getTodayLogs(childId: string): Promise<TaskLog[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('task_logs')
    .select('*')
    .eq('child_id', childId)
    .gte('completed_at', getTodayStart().toISOString())
  if (error) throw error
  return data
}

export async function getAllLogsForTask(childId: string, taskId: string): Promise<TaskLog[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('task_logs')
    .select('*')
    .eq('child_id', childId)
    .eq('task_id', taskId)
  if (error) throw error
  return data
}

export async function getAllLogs(limit = 100): Promise<(TaskLog & { children: { name: string }, tasks: { title: string } })[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('task_logs')
    .select('*, children(name), tasks(title)')
    .order('completed_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data as any
}
