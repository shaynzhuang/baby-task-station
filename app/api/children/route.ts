import { NextResponse } from 'next/server'
import { getChildren } from '@/lib/queries/children'

export async function GET() {
  const children = await getChildren()
  return NextResponse.json(children)
}
