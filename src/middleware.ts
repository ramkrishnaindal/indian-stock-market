import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from './lib/jwt'

const protectedRoutes = ['/profile', '/dashboard']
const adminRoutes = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if route needs protection
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdmin = adminRoutes.some(route => pathname.startsWith(route))
  
  if (!isProtected && !isAdmin) {
    return NextResponse.next()
  }

  const token = request.cookies.get('accessToken')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  try {
    const payload = JWTService.verifyToken(token)
    
    // Check admin access
    if (isAdmin && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }
}

export const config = {
  matcher: ['/profile/:path*', '/dashboard/:path*', '/admin/:path*']
}