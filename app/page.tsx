import { getChildren } from '@/lib/queries/children'
import ChildCard from '@/components/child/ChildCard'

export default async function HomePage() {
  const children = await getChildren()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xs">
        <p className="text-xs tracking-[0.2em] text-ink-muted uppercase mb-3 text-center">任务 · 积分 · 礼物</p>
        <h1 className="text-4xl font-bold text-ink text-center mb-12" style={{ letterSpacing: '0.05em' }}>
          宝贝任务站
        </h1>
        <div className="space-y-3">
          {children.map(child => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      </div>
    </main>
  )
}
