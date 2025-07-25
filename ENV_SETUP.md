# Environment Variables Setup Guide

## Overview
This document provides instructions for setting up environment variables for all external platforms used in the Indian Stock Market Platform.

## Required Environment Variables

### 1. Database Configuration
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string

### 2. Market Data APIs

#### Alpha Vantage
- **Purpose**: Stock prices, technical indicators
- **Website**: https://www.alphavantage.co/
- **Setup**: Create free account, get API key
- **Variable**: `ALPHA_VANTAGE_API_KEY`

#### Yahoo Finance API
- **Purpose**: Real-time stock data, historical prices
- **Website**: https://rapidapi.com/apidojo/api/yahoo-finance1/
- **Setup**: Subscribe to RapidAPI, get API key
- **Variable**: `YAHOO_FINANCE_API_KEY`

#### NSE/BSE APIs
- **Purpose**: Indian stock exchange data
- **Setup**: Register with respective exchanges
- **Variables**: `NSE_API_KEY`, `BSE_API_KEY`

#### Financial Modeling Prep
- **Purpose**: Fundamental data, financial ratios
- **Website**: https://financialmodelingprep.com/
- **Variable**: `FINANCIAL_MODELING_PREP_API_KEY`

### 3. News APIs

#### NewsAPI
- **Purpose**: Financial news aggregation
- **Website**: https://newsapi.org/
- **Variable**: `NEWS_API_KEY`

### 4. Broker APIs

#### Zerodha Kite API
- **Purpose**: Trading execution, portfolio management
- **Website**: https://kite.trade/
- **Setup**: Apply for API access, get credentials
- **Variables**: `ZERODHA_API_KEY`, `ZERODHA_API_SECRET`

#### Upstox API
- **Purpose**: Alternative trading platform
- **Website**: https://upstox.com/developer/
- **Variables**: `UPSTOX_API_KEY`, `UPSTOX_API_SECRET`

#### Angel One API
- **Purpose**: Trading and portfolio management
- **Website**: https://smartapi.angelbroking.com/
- **Variables**: `ANGEL_ONE_API_KEY`, `ANGEL_ONE_API_SECRET`

### 5. Communication Services

#### Email (SMTP)
- **Purpose**: User notifications, alerts
- **Setup**: Use Gmail App Password or other SMTP service
- **Variables**: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`

#### SMS (Twilio)
- **Purpose**: SMS alerts and notifications
- **Website**: https://www.twilio.com/
- **Variables**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

### 6. Monitoring & Analytics

#### Sentry
- **Purpose**: Error tracking and monitoring
- **Website**: https://sentry.io/
- **Variable**: `SENTRY_DSN`

#### DataDog
- **Purpose**: Performance monitoring
- **Website**: https://www.datadoghq.com/
- **Variable**: `DATADOG_API_KEY`

#### Google Analytics
- **Purpose**: User analytics
- **Variable**: `GOOGLE_ANALYTICS_ID`

## Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your API keys**:
   - Replace placeholder values with actual API keys
   - Never commit the `.env` file to version control

3. **Verify configuration**:
   ```bash
   npm run dev
   ```

4. **Test API connections**:
   - Visit `/api/test-db` to test database connection
   - Visit `/api/test-redis` to test Redis connection

## Security Notes

- Keep all API keys secure and never expose them publicly
- Use different keys for development, staging, and production
- Regularly rotate API keys for security
- Use environment-specific configurations
- Enable rate limiting to prevent API abuse

## Rate Limits

Most APIs have rate limits. Configure these appropriately:
- Alpha Vantage: 5 calls per minute (free tier)
- NewsAPI: 1000 requests per day (free tier)
- Broker APIs: Vary by provider

## Production Deployment

For production deployment:
1. Use secure environment variable management
2. Enable HTTPS for all API calls
3. Implement proper error handling and fallbacks
4. Monitor API usage and costs
5. Set up alerts for API failures