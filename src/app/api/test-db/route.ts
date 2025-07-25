import { NextResponse } from 'next/server'
import { testDatabaseConnection } from '@/lib/db-test'

export async function GET() {
  const result = await testDatabaseConnection()
  
  if (result.success) {
    return NextResponse.json({ 
      success: true, 
      message: 'PostgreSQL connection successful',
      timestamp: result.timestamp
    })
  } else {
    return NextResponse.json({ 
      success: false, 
      error: result.error 
    }, { status: 500 })
  }
}