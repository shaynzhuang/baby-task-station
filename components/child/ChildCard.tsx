import Link from 'next/link'
import type { Child } from '@/lib/supabase/types'

export default function ChildCard({ child }: { child: Child }) {
  return (
    <Link href={`/${child.id}`}>
      <div
        className="bg-surface rounded-2xl flex items-center overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
        style={{ boxShadow: '0 1px 6px rgba(44,36,56,0.07)' }}
      >
        {/* Left color bar — the signature element */}
        <div className="w-1 self-stretch flex-shrink-0 rounded-l-2xl" style={{ backgroundColor: child.color }} />
        <div className="flex items-center gap-4 px-5 py-5 flex-1">
          <span className="text-3xl">{child.avatar}</span>
          <div>
            <div className="text-base font-semibold text-ink">{child.name}</div>
            <div className="text-xs text-ink-muted mt-0.5">点击进入</div>
          </div>
          <svg className="ml-auto text-ink-faint w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
