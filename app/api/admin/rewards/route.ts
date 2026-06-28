import { NextRequest, NextResponse } from 'next/server'
import { getAllRewards, createReward } from '@/lib/queries/rewards'

export async function GET() {
  return NextResponse.json(await getAllRewards())
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  await createReward(data)
  return NextResponse.json({ ok: true })
}
