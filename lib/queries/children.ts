import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Child } from '@/lib/supabase/types'

export async function getChildren(): Promise<Child[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .order('created_at')
  if (error) throw error
  return data
}

export async function getChild(id: string): Promise<Child> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function updateChild(id: string, updates: Partial<Pick<Child, 'name' | 'avatar' | 'color'>>): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('children').update(updates).eq('id', id)
  if (error) throw error
}

export async function addPoints(childId: string, points: number): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.rpc('add_points', { child_id: childId, delta: points })
  if (error) throw error
}

export async function deductPoints(childId: string, points: number): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.rpc('deduct_points', { child_id: childId, delta: points })
  if (error) throw error
}
