import { getChildren } from '@/lib/queries/children'
import ChildCard from '@/components/child/ChildCard'

export default async function HomePage() {
  const children = await getChildren()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="text-5xl mb-4">⭐</div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">宝贝任务站</h1>
      <p className="text-gray-500 mb-10">💗 打卡任务 · 赚取积分 · 兑换礼物 💗</p>
      <p className="text-gray-600 mb-6">我是 👇</p>
      <div className="w-full max-w-sm space-y-4">
        {children.map(child => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
      <p className="text-gray-400 text-sm mt-10">完成任务 → 积累积分 → 兑换礼物 🎁</p>
    </main>
  )
}
