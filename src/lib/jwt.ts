import jwt from 'jsonwebtoken'
import { config } from './config'

export interface JWTPayload {
  userId: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

export class JWTService {
  private static readonly ACCESS_TOKEN_EXPIRES = '15m'
  private static readonly REFRESH_TOKEN_EXPIRES = '7d'

  static generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: this.ACCESS_TOKEN_EXPIRES,
    })
  }

  static generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: this.REFRESH_TOKEN_EXPIRES,
    })
  }

  static verifyToken(token: string): JWTPayload {
    return jwt.verify(token, config.auth.jwtSecret) as JWTPayload
  }

  static decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload
    } catch {
      return null
    }
  }

  static isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token)
      if (!decoded?.exp) return true
      return Date.now() >= decoded.exp * 1000
    } catch {
      return true
    }
  }
}