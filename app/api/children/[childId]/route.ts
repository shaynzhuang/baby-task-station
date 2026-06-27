import { NextRequest, NextResponse } from 'next/server'
import { getChild } from '@/lib/queries/children'

export async function GET(_: NextRequest, { params }: { params: { childId: string } }) {
  const child = await getChild(params.childId)
  return NextResponse.json(child)
}
