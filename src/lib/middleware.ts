import { NextRequest, NextResponse } from 'next/server'
import { JWTService } from './jwt'

export function withAuth(handler: Function) {
  return async (request: NextRequest) => {
    try {
      const authHeader = request.headers.get('authorization')
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Authorization token required' },
          { status: 401 }
        )
      }

      const token = authHeader.substring(7) // Remove 'Bearer ' prefix
      const payload = JWTService.verifyToken(token)

      // Add user info to request headers for the handler
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', payload.userId)
      requestHeaders.set('x-user-email', payload.email)
      requestHeaders.set('x-user-role', payload.role || 'user')

      const modifiedRequest = new NextRequest(request.url, {
        method: request.method,
        headers: requestHeaders,
        body: request.body,
      })

      return handler(modifiedRequest)
    } catch (error) {
      console.error('Auth middleware error:', error)
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }
  }
}

export function withRole(roles: string[]) {
  return function(handler: Function) {
    return withAuth(async (request: NextRequest) => {
      const userRole = request.headers.get('x-user-role')
      
      if (!userRole || !roles.includes(userRole)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      return handler(request)
    })
  }
}