// Core data types
export interface Stock {
  id: string
  symbol: string
  name: string
  price: number
  sector: string
  marketCap?: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  createdAt: Date
  updatedAt: Date
}

// Portfolio types
export type PortfolioType = 'swing' | 'short-term' | 'long-term'

export interface Portfolio {
  id: string
  userId: string
  type: PortfolioType
  stocks: PortfolioStock[]
  createdAt: Date
  updatedAt: Date
}

export interface PortfolioStock {
  stockId: string
  quantity: number
  averagePrice: number
  currentPrice: number
  addedAt: Date
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Chart data types
export interface ChartDataPoint {
  timestamp: Date
  price: number
  volume?: number
}

export interface TechnicalIndicator {
  name: string
  value: number
  signal: 'buy' | 'sell' | 'hold'
  confidence: number
}