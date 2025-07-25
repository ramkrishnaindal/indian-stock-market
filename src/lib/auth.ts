import bcrypt from 'bcryptjs'
import { JWTService } from './jwt'
import { prisma } from './prisma'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name?: string
}

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  static async login(credentials: LoginCredentials): Promise<AuthTokens | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      })

      if (!user || !user.password) {
        return null
      }

      const isValidPassword = await this.verifyPassword(credentials.password, user.password)
      if (!isValidPassword) {
        return null
      }

      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role || 'user'
      }

      return {
        accessToken: JWTService.generateAccessToken(payload),
        refreshToken: JWTService.generateRefreshToken(payload)
      }
    } catch (error) {
      console.error('Login error:', error)
      return null
    }
  }

  static async register(data: RegisterData): Promise<AuthTokens | null> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      })

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await this.hashPassword(data.password)

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name
        }
      })

      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role || 'user'
      }

      return {
        accessToken: JWTService.generateAccessToken(payload),
        refreshToken: JWTService.generateRefreshToken(payload)
      }
    } catch (error) {
      console.error('Registration error:', error)
      return null
    }
  }

  static async refreshTokens(refreshToken: string): Promise<AuthTokens | null> {
    try {
      const payload = JWTService.verifyToken(refreshToken)
      
      const user = await prisma.user.findUnique({
        where: { id: payload.userId }
      })

      if (!user) {
        return null
      }

      const newPayload = {
        userId: user.id,
        email: user.email,
        role: user.role || 'user'
      }

      return {
        accessToken: JWTService.generateAccessToken(newPayload),
        refreshToken: JWTService.generateRefreshToken(newPayload)
      }
    } catch (error) {
      console.error('Token refresh error:', error)
      return null
    }
  }

  static async validateToken(token: string): Promise<any> {
    try {
      const payload = JWTService.verifyToken(token)
      
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true, role: true }
      })

      return user
    } catch (error) {
      console.error('Token validation error:', error)
      return null
    }
  }
}