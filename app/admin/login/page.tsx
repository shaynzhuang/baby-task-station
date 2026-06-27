'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg w-80">
        <h1 className="text-xl font-bold text-center mb-6">家长入口 🔐</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="请输入密码"
          className="w-full border rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-mid"
        />
        {error && <p className="text-red-500 text-sm mb-3 text-center">密码错误</p>}
        <button
          type="submit"
          className="w-full bg-pink-mid text-white rounded-xl py-2 font-semibold hover:bg-pink-strong transition"
        >
          进入后台
        </button>
      </form>
    </div>
  )
}
