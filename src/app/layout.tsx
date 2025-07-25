import type { Metadata } from 'next'
import { Layout } from '@/components/layout/Layout'
import './globals.css'

export const metadata: Metadata = {
  title: 'Indian Stock Market Platform',
  description: 'Comprehensive stock analysis and trading platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}