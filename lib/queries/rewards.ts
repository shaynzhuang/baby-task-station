import { getSupabaseServerClient } from '@/lib/supabase/server'
import type { Reward, RewardInsert } from '@/lib/supabase/types'
import { deductPoints } from '@/lib/queries/children'

export async function getRewards(): Promise<Reward[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .eq('enabled', true)
    .order('points_required')
  if (error) throw error
  return data
}

export async function getAllRewards(): Promise<Reward[]> {
  const supabase = getSupabaseServerClient()
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('created_at')
  if (error) throw error
  return data
}

export async function createReward(data: RewardInsert): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('rewards').insert(data)
  if (error) throw error
}

export async function updateReward(id: string, updates: Partial<Reward>): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase.from('rewards').update(updates).eq('id', id)
  if (error) throw error
}

export async function redeemReward(childId: string, rewardId: string): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { data: reward, error: fetchError } = await supabase
    .from('rewards')
    .select('points_required, stock')
    .eq('id', rewardId)
    .single()
  if (fetchError) throw fetchError

  await deductPoints(childId, reward.points_required)

  const { error: logError } = await supabase.from('reward_logs').insert({
    child_id: childId,
    reward_id: rewardId,
    points_spent: reward.points_required,
  })
  if (logError) throw logError

  if (reward.stock > 0) {
    await supabase
      .from('rewards')
      .update({ stock: reward.stock - 1 })
      .eq('id', rewardId)
  }
}
