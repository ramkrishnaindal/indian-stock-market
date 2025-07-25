import { NextResponse } from 'next/server'
import { CacheService } from '@/lib/cache'

export async function GET() {
  try {
    const testKey = 'test:connection'
    const testValue = `Redis test at ${new Date().toISOString()}`
    
    // Test SET operation
    const setResult = await CacheService.set(testKey, testValue, 60)
    if (!setResult) {
      throw new Error('Failed to set value in Redis')
    }
    
    // Test GET operation
    const getValue = await CacheService.get(testKey)
    if (getValue !== testValue) {
      throw new Error('Retrieved value does not match set value')
    }
    
    // Test EXISTS operation
    const exists = await CacheService.exists(testKey)
    if (!exists) {
      throw new Error('Key should exist but does not')
    }
    
    // Clean up
    await CacheService.del(testKey)
    
    return NextResponse.json({
      success: true,
      message: 'Redis connection and operations successful',
      testValue,
      operations: ['SET', 'GET', 'EXISTS', 'DEL']
    })
  } catch (error) {
    console.error('Redis test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Redis test failed'
    }, { status: 500 })
  }
}