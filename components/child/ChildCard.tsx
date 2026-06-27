import Link from 'next/link'
import type { Child } from '@/lib/supabase/types'

export default function ChildCard({ child }: { child: Child }) {
  return (
    <Link href={`/${child.id}`}>
      <div
        className="rounded-3xl p-6 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform shadow-sm"
        style={{ backgroundColor: child.color + '40' }}
      >
        <span className="text-4xl">{child.avatar}</span>
        <div>
          <div className="text-xl font-bold text-gray-800">{child.name}</div>
          <div className="text-sm text-gray-500">的专属空间 ✨</div>
        </div>
        <span className="ml-auto text-2xl">✦</span>
      </div>
    </Link>
  )
}
