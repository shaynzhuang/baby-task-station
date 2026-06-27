import { getChildren } from '@/lib/queries/children'
import { getAllLogs } from '@/lib/queries/logs'
import Card from '@/components/ui/Card'

export default async function AdminDashboard() {
  const [children, logs] = await Promise.all([
    getChildren(),
    getAllLogs(10),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">总览</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {children.map(child => (
          <Card key={child.id} className="text-center">
            <div className="text-3xl mb-1">{child.avatar}</div>
            <div className="font-bold text-gray-800">{child.name}</div>
            <div className="text-2xl font-bold text-pink-strong mt-1">{child.total_points}</div>
            <div className="text-xs text-gray-400">积分</div>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="font-bold text-gray-700 mb-3">最近打卡记录</h2>
        {logs.length === 0 && <p className="text-gray-400 text-sm">暂无记录</p>}
        <div className="space-y-2">
          {logs.map((log: any) => (
            <div key={log.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{log.children?.name} · {log.tasks?.title}</span>
              <span className="text-pink-strong font-semibold">+{log.points_earned}分</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
