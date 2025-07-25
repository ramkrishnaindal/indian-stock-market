// API endpoints
export const API_ENDPOINTS = {
  STOCKS: '/api/stocks',
  PORTFOLIO: '/api/portfolio',
  USER: '/api/user',
  AUTH: '/api/auth',
} as const

// Stock sectors
export const STOCK_SECTORS = [
  'IT',
  'Banking',
  'Pharma',
  'FMCG',
  'Auto',
  'Energy',
  'Infrastructure',
  'Metals',
  'Textiles',
  'Telecom',
] as const

// Portfolio types
export const PORTFOLIO_TYPES = {
  SWING: 'swing',
  SHORT_TERM: 'short-term',
  LONG_TERM: 'long-term',
} as const

// Cache keys
export const CACHE_KEYS = {
  STOCKS: 'stocks',
  STOCK_DETAIL: 'stock:',
  PORTFOLIO: 'portfolio:',
  USER_PROFILE: 'user:',
} as const

// Time intervals
export const TIME_INTERVALS = {
  '1D': '1d',
  '1W': '1w',
  '1M': '1m',
  '3M': '3m',
  '1Y': '1y',
  'MAX': 'max',
} as const