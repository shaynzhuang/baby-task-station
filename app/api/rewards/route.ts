import { NextResponse } from 'next/server'
import { getRewards } from '@/lib/queries/rewards'

export async function GET() {
  const rewards = await getRewards()
  return NextResponse.json(rewards)
}
