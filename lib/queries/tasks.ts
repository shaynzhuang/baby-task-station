import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Task, TaskInsert } from '@/lib/supabase/types'

export async function getTasks(): Promise<Task[]> {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at')
  if (error) throw error
  return data
}

export async function getTasksForChild(childId: string): Promise<Task[]> {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .or(`child_id.eq.${childId},child_id.is.null`)
    .eq('enabled', true)
    .order('created_at')
  if (error) throw error
  return data
}

export async function createTask(data: TaskInsert): Promise<void> {
  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.from('tasks').insert(data)
  if (error) throw error
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.from('tasks').update(updates).eq('id', id)
  if (error) throw error
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = await getSupabaseServerClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw error
}
