// Environment variable validation and type safety

export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  REDIS_URL: process.env.REDIS_URL!,
  
  // Next.js
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Market Data APIs
  ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
  YAHOO_FINANCE_API_KEY: process.env.YAHOO_FINANCE_API_KEY,
  NSE_API_KEY: process.env.NSE_API_KEY,
  BSE_API_KEY: process.env.BSE_API_KEY,
  FINANCIAL_MODELING_PREP_API_KEY: process.env.FINANCIAL_MODELING_PREP_API_KEY,
  
  // News APIs
  NEWS_API_KEY: process.env.NEWS_API_KEY,
  ECONOMIC_TIMES_RSS_URL: process.env.ECONOMIC_TIMES_RSS_URL,
  
  // Broker APIs
  ZERODHA_API_KEY: process.env.ZERODHA_API_KEY,
  ZERODHA_API_SECRET: process.env.ZERODHA_API_SECRET,
  ZERODHA_REDIRECT_URL: process.env.ZERODHA_REDIRECT_URL,
  
  UPSTOX_API_KEY: process.env.UPSTOX_API_KEY,
  UPSTOX_API_SECRET: process.env.UPSTOX_API_SECRET,
  UPSTOX_REDIRECT_URL: process.env.UPSTOX_REDIRECT_URL,
  
  ANGEL_ONE_API_KEY: process.env.ANGEL_ONE_API_KEY,
  ANGEL_ONE_API_SECRET: process.env.ANGEL_ONE_API_SECRET,
  ANGEL_ONE_REDIRECT_URL: process.env.ANGEL_ONE_REDIRECT_URL,
  
  // Communication
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
  
  // Monitoring
  SENTRY_DSN: process.env.SENTRY_DSN,
  DATADOG_API_KEY: process.env.DATADOG_API_KEY,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  
  // Security
  JWT_SECRET: process.env.JWT_SECRET!,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  
  // Configuration
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  
  CACHE_TTL_STOCKS: parseInt(process.env.CACHE_TTL_STOCKS || '300'),
  CACHE_TTL_PORTFOLIO: parseInt(process.env.CACHE_TTL_PORTFOLIO || '60'),
  CACHE_TTL_NEWS: parseInt(process.env.CACHE_TTL_NEWS || '1800'),
  
  MAX_POSITION_SIZE: parseInt(process.env.MAX_POSITION_SIZE || '100000'),
  MAX_DAILY_TRADES: parseInt(process.env.MAX_DAILY_TRADES || '50'),
  RISK_PERCENTAGE: parseFloat(process.env.RISK_PERCENTAGE || '2'),
} as const

// Validate required environment variables
function validateEnv() {
  const required = [
    'DATABASE_URL',
    'REDIS_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'JWT_SECRET',
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Run validation in development
if (process.env.NODE_ENV === 'development') {
  validateEnv()
}