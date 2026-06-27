// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '宝贝任务站',
  description: '打卡任务 · 赚取积分 · 兑换礼物',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen bg-gradient-to-b from-pink-soft to-purple-soft">
        {children}
      </body>
    </html>
  )
}
