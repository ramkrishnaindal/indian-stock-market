import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ message: 'If email exists, reset link sent' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour

    await prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt
      }
    })

    await sendPasswordResetEmail(email, token)

    return NextResponse.json({ message: 'If email exists, reset link sent' })
  } catch (error) {
    return NextResponse.json({ error: 'Reset request failed' }, { status: 500 })
  }
}