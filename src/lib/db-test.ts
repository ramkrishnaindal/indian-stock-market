import { Client } from 'pg'

export async function testDatabaseConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    await client.connect()
    const result = await client.query('SELECT NOW()')
    await client.end()
    return { success: true, timestamp: result.rows[0].now }
  } catch (error) {
    console.error('Database connection error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}