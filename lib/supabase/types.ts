export type Child = {
  id: string
  name: string
  avatar: string
  color: string
  total_points: number
  created_at: string
}

export type Task = {
  id: string
  title: string
  description: string
  points: number
  type: 'daily' | 'once'
  child_id: string | null
  category: string
  enabled: boolean
  created_at: string
}

export type TaskInsert = Omit<Task, 'id' | 'created_at'>

export type TaskLog = {
  id: string
  child_id: string
  task_id: string
  points_earned: number
  completed_at: string
}

export type Reward = {
  id: string
  title: string
  description: string
  points_required: number
  stock: number
  enabled: boolean
  created_at: string
}

export type RewardInsert = Omit<Reward, 'id' | 'created_at'>

export type RewardLog = {
  id: string
  child_id: string
  reward_id: string
  points_spent: number
  redeemed_at: string
}
