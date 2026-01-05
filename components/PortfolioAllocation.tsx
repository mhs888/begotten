'use client'

interface PortfolioAllocationProps {
  portfolio: {
    stocks: number
    bonds: number
    realEstate: number
    cash: number
    other: number
  }
  totalAssets: number
}

export default function PortfolioAllocation({
  portfolio,
  totalAssets,
}: PortfolioAllocationProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Include retirement accounts in portfolio allocation
  // Calculate what portion of totalAssets is in portfolio vs other categories
  const portfolioTotal = portfolio.stocks + portfolio.bonds + portfolio.realEstate + portfolio.cash + portfolio.other
  
  const allocations = [
    { 
      name: 'Stocks', 
      value: portfolio.stocks, 
      color: 'bg-blue-500',
      summary: 'Large cap, Mid cap, Small cap, Index ETFs, Mutual funds, 401k/IRA equities'
    },
    { 
      name: 'Bonds', 
      value: portfolio.bonds, 
      color: 'bg-green-500',
      summary: 'Investment grade bonds, Income funds, 401k/IRA fixed income'
    },
    { 
      name: 'Real Estate', 
      value: portfolio.realEstate, 
      color: 'bg-purple-500',
      summary: 'Real estate investments'
    },
    { 
      name: 'Cash', 
      value: portfolio.cash, 
      color: 'bg-yellow-500',
      summary: 'Checking accounts, Money market, Savings accounts'
    },
    { 
      name: 'Other', 
      value: portfolio.other, 
      color: 'bg-gray-500',
      summary: 'Cryptocurrency (Ethereum, other coins)'
    },
  ]
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value) // Sort descending by value

  const getPercentage = (value: number): string => {
    if (totalAssets === 0) return '0'
    return ((value / totalAssets) * 100).toFixed(1)
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Portfolio Allocation</h2>
      
      {totalAssets === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No portfolio data available. Add your investments to see allocation.
        </p>
      ) : (
        <>
          {/* Visual Bar Chart */}
          <div className="mb-6">
            <div className="flex h-8 rounded-md overflow-hidden">
              {allocations.map((item, index) => {
                const percentage = parseFloat(getPercentage(item.value))
                return (
                  <div
                    key={index}
                    className={`${item.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                    title={`${item.name}: ${getPercentage(item.value)}%`}
                  />
                )
              })}
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-4">
            {allocations.map((item, index) => {
              const percentage = parseFloat(getPercentage(item.value))
              return (
                <div key={index} className="border-b border-gray-700 pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <span className="font-medium text-gray-300">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">
                        {formatCurrency(item.value)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {getPercentage(item.value)}%
                      </div>
                    </div>
                  </div>
                  <div className="ml-7">
                    <p className="text-xs text-gray-500">{item.summary}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-between">
            <span className="font-bold text-lg text-white">Total Assets</span>
            <span className="font-bold text-lg text-white">
              {formatCurrency(totalAssets)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

