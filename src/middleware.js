import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  // return NextResponse.redirect(new URL('/login', request.url))
  return await updateSession(request)
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
}