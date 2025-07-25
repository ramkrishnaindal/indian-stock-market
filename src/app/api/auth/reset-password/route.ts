import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthService } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    const resetRecord = await prisma.passwordReset.findUnique({
      where: { token }
    })

    if (!resetRecord || resetRecord.used || resetRecord.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 })
    }

    const hashedPassword = await AuthService.hashPassword(password)

    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetRecord.email },
        data: { password: hashedPassword }
      }),
      prisma.passwordReset.update({
        where: { token },
        data: { used: true }
      })
    ])

    return NextResponse.json({ message: 'Password reset successful' })
  } catch (error) {
    return NextResponse.json({ error: 'Password reset failed' }, { status: 500 })
  }
}