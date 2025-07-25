import { redis } from './redis'

export class CacheService {
  static async get(key: string): Promise<string | null> {
    try {
      return await redis.get(key)
    } catch (error) {
      console.error('Redis GET error:', error)
      return null
    }
  }

  static async set(key: string, value: string, ttl: number = 3600): Promise<boolean> {
    try {
      await redis.setEx(key, ttl, value)
      return true
    } catch (error) {
      console.error('Redis SET error:', error)
      return false
    }
  }

  static async del(key: string): Promise<boolean> {
    try {
      await redis.del(key)
      return true
    } catch (error) {
      console.error('Redis DEL error:', error)
      return false
    }
  }

  static async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key)
      return result === 1
    } catch (error) {
      console.error('Redis EXISTS error:', error)
      return false
    }
  }
}