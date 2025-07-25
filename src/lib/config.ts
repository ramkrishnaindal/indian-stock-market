import { env } from './env'

export const config = {
  // Environment
  env: env.NODE_ENV,
  isDev: env.NODE_ENV === 'development',
  isStaging: env.NODE_ENV === 'staging',
  isProd: env.NODE_ENV === 'production',
  
  // Database
  database: {
    url: env.DATABASE_URL,
  },
  
  // Redis
  redis: {
    url: env.REDIS_URL,
  },
  
  // Authentication
  auth: {
    secret: env.NEXTAUTH_SECRET,
    url: env.NEXTAUTH_URL,
    jwtSecret: env.JWT_SECRET,
  },
  
  // Security
  security: {
    encryptionKey: env.ENCRYPTION_KEY,
  },
  
  // Rate Limiting
  rateLimit: {
    maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
  },
  
  // Cache
  cache: {
    ttl: {
      stocks: env.CACHE_TTL_STOCKS,
      portfolio: env.CACHE_TTL_PORTFOLIO,
      news: env.CACHE_TTL_NEWS,
    },
  },
  
  // Trading
  trading: {
    maxPositionSize: env.MAX_POSITION_SIZE,
    maxDailyTrades: env.MAX_DAILY_TRADES,
    riskPercentage: env.RISK_PERCENTAGE,
  },
  
  // APIs
  apis: {
    alphaVantage: env.ALPHA_VANTAGE_API_KEY,
    yahooFinance: env.YAHOO_FINANCE_API_KEY,
    financialModelingPrep: env.FINANCIAL_MODELING_PREP_API_KEY,
  },
} as const

// Validate configuration on startup
export function validateConfig() {
  const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'NEXTAUTH_SECRET',
    'JWT_SECRET',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  console.log(`✅ Configuration loaded for ${config.env} environment`)
}

// Skip validation in development
// validateConfig() is called manually when needed