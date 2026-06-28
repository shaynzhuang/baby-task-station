import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi = pathname.startsWith('/api/admin') && pathname !== '/api/admin/auth'
  if (!isAdminPage && !isAdminApi) return NextResponse.next()

  const auth = req.cookies.get('admin_auth')
  if (auth?.value !== process.env.ADMIN_PASSWORD) {
    if (isAdminApi) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
