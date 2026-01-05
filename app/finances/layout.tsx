import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Personal financial planning and retirement projections',
  icons: {
    icon: '/logo/favicon.png',
    shortcut: '/logo/favicon.png',
    apple: '/logo/favicon.png',
  },
}

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

