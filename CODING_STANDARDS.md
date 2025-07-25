# Coding Standards - Indian Stock Market Platform

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── stocks/           # Stock detail pages
│   ├── portfolio/        # Portfolio management pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── charts/           # Chart components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── services/             # API services and data fetching
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

## Naming Conventions

### Files and Folders
- **Components**: PascalCase (e.g., `StockChart.tsx`)
- **Pages**: lowercase with hyphens (e.g., `stock-detail`)
- **Hooks**: camelCase starting with 'use' (e.g., `useStockData.ts`)
- **Utils**: camelCase (e.g., `formatCurrency.ts`)
- **Types**: PascalCase (e.g., `StockData.ts`)

### Variables and Functions
- **Variables**: camelCase (e.g., `stockPrice`)
- **Functions**: camelCase (e.g., `calculateReturns`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `StockData`, `UserProfile`)

## TypeScript Guidelines

### Type Definitions
- Use interfaces for object shapes
- Use types for unions, primitives, and computed types
- Export types from dedicated files in `/types` folder
- Use generic types where appropriate

### Example:
```typescript
// types/stock.ts
export interface Stock {
  id: string
  symbol: string
  name: string
  price: number
  sector: string
}

export type PortfolioType = 'swing' | 'short-term' | 'long-term'
```

## Component Guidelines

### React Components
- Use functional components with hooks
- Use TypeScript for all components
- Export components as default
- Use proper prop typing

### Example:
```typescript
interface StockCardProps {
  stock: Stock
  onSelect: (stock: Stock) => void
}

export default function StockCard({ stock, onSelect }: StockCardProps) {
  return (
    <div onClick={() => onSelect(stock)}>
      {stock.name}
    </div>
  )
}
```

## API Guidelines

### API Routes
- Use RESTful conventions
- Implement proper error handling
- Use TypeScript for request/response types
- Include input validation

### Example:
```typescript
// app/api/stocks/route.ts
export async function GET(request: Request) {
  try {
    const stocks = await getStocks()
    return NextResponse.json(stocks)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stocks' },
      { status: 500 }
    )
  }
}
```

## Styling Guidelines

### Tailwind CSS
- Use utility classes for styling
- Create component variants using class-variance-authority
- Use consistent spacing scale (4, 8, 12, 16, 24, 32)
- Follow mobile-first responsive design

### Example:
```typescript
const cardVariants = cva(
  "rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-white border-gray-200",
        highlighted: "bg-blue-50 border-blue-200"
      }
    }
  }
)
```

## State Management

### Local State
- Use useState for component-level state
- Use useReducer for complex state logic
- Use custom hooks for reusable state logic

### Global State
- Use Zustand for global state management
- Create separate stores for different domains (auth, stocks, portfolio)

## Error Handling

### Client-Side
- Use try-catch blocks for async operations
- Display user-friendly error messages
- Log errors for debugging

### Server-Side
- Return appropriate HTTP status codes
- Include error messages in response
- Log errors with context

## Testing Guidelines

### Unit Tests
- Test utility functions
- Test custom hooks
- Test component logic

### Integration Tests
- Test API endpoints
- Test database operations
- Test user workflows

## Performance Guidelines

### Code Splitting
- Use dynamic imports for large components
- Implement lazy loading for routes
- Split vendor bundles appropriately

### Caching
- Use Redis for API response caching
- Implement client-side caching for static data
- Use React Query for server state management

## Security Guidelines

### API Security
- Validate all inputs
- Use rate limiting
- Implement proper authentication
- Sanitize database queries

### Client Security
- Never expose sensitive data
- Use HTTPS in production
- Implement CSP headers
- Validate user permissions

## Git Guidelines

### Commit Messages
- Use conventional commits format
- Include scope when relevant
- Keep messages concise but descriptive

### Example:
```
feat(stocks): add real-time price updates
fix(portfolio): resolve calculation error
docs(readme): update installation instructions
```

### Branch Naming
- `feature/feature-name`
- `fix/bug-description`
- `docs/documentation-update`
- `refactor/component-name`

## Code Review Guidelines

### Before Submitting
- Run type checking (`npm run type-check`)
- Run linting (`npm run lint`)
- Test functionality manually
- Write/update tests if needed

### Review Checklist
- Code follows naming conventions
- TypeScript types are properly defined
- Error handling is implemented
- Performance considerations addressed
- Security best practices followed