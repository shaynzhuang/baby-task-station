'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: '📊 总览' },
  { href: '/admin/children', label: '👧 孩子管理' },
  { href: '/admin/tasks', label: '✅ 任务管理' },
  { href: '/admin/rewards', label: '🎁 礼物管理' },
  { href: '/admin/logs', label: '📋 打卡记录' },
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <nav className="w-48 shrink-0 bg-white rounded-2xl shadow-sm p-4 h-fit sticky top-8">
      <div className="font-bold text-gray-800 mb-4 text-center">家长后台 🔐</div>
      <div className="space-y-1">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-xl text-sm transition ${
              pathname === link.href
                ? 'bg-pink-soft text-pink-strong font-semibold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        className="block mt-6 text-xs text-center text-gray-400 hover:text-gray-600"
      >
        回到孩子端 →
      </Link>
    </nav>
  )
}
