'use client'

interface FinancialOverviewProps {
  totalAssets: number
  monthlyIncome: number
  monthlyExpenses: number
  monthlySavings: number
}

export default function FinancialOverview({
  totalAssets,
  monthlyIncome,
  monthlyExpenses,
  monthlySavings,
}: FinancialOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const savingsRate = monthlyIncome > 0 
    ? ((monthlySavings / monthlyIncome) * 100).toFixed(1)
    : '0.0'

  const cards = [
    {
      title: 'Total Assets',
      value: formatCurrency(totalAssets),
      subtitle: 'Combined savings, investments & retirement',
      color: 'text-green-400',
      bgColor: 'bg-gray-800',
      borderColor: 'border-gray-700',
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(monthlyIncome),
      subtitle: 'After-tax household income',
      color: 'text-blue-400',
      bgColor: 'bg-gray-800',
      borderColor: 'border-gray-700',
    },
    {
      title: 'Monthly Contribution',
      value: formatCurrency(monthlySavings),
      subtitle: 'Estimated monthly investment contribution',
      color: 'text-green-400',
      bgColor: 'bg-gray-800',
      borderColor: 'border-gray-700',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} rounded-lg p-6 border ${card.borderColor} shadow-sm`}
        >
          <h3 className="text-sm font-medium text-gray-400 mb-2">{card.title}</h3>
          <p className={`text-3xl font-bold ${card.color} mb-1`}>
            {card.value}
          </p>
          <p className="text-xs text-gray-500">{card.subtitle}</p>
        </div>
      ))}
    </div>
  )
}

