import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth'
import { ValidationService } from '@/utils/validation'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Validate password strength
    const passwordValidation = ValidationService.validatePassword(password)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(', ') },
        { status: 400 }
      )
    }

    const tokens = await AuthService.register({ email, password, name })

    if (!tokens) {
      return NextResponse.json(
        { error: 'User already exists or registration failed' },
        { status: 409 }
      )
    }

    const response = NextResponse.json({
      success: true,
      message: 'Registration successful',
      accessToken: tokens.accessToken
    })

    // Set refresh token as httpOnly cookie
    response.cookies.set('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}