import Card from '@/components/ui/Card'
import { getAllLogs } from '@/lib/queries/logs'

export default async function AdminLogsPage() {
  const logs = await getAllLogs(200)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">打卡记录</h1>
      <Card>
        {logs.length === 0 && <p className="text-gray-400 text-sm text-center py-4">暂无记录</p>}
        <div className="divide-y">
          {logs.map((log: any) => (
            <div key={log.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <span className="font-semibold text-gray-800">{log.children?.name}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gray-600">{log.tasks?.title}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <span className="font-bold text-pink-strong">+{log.points_earned}分</span>
                <span>{new Date(log.completed_at).toLocaleString('zh-CN')}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
