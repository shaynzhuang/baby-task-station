import { NextRequest, NextResponse } from 'next/server'
import { getChild } from '@/lib/queries/children'

export async function GET(_: NextRequest, { params }: { params: Promise<{ childId: string }> }) {
  const { childId } = await params
  const child = await getChild(childId)
  return NextResponse.json(child)
}
