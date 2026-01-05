'use client'

interface ExpenseTrackerProps {
  expenses: {
    housing: number
    utilities: number
    food: number
    transportation: number
    healthcare: number
    insurance: number
    entertainment: number
    other: number
  }
}

export default function ExpenseTracker({ expenses }: ExpenseTrackerProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const expenseCategories = [
    { key: 'housing', label: 'Housing', icon: '🏠', color: 'bg-blue-100 text-blue-700' },
    { key: 'utilities', label: 'Utilities', icon: '💡', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'food', label: 'Food', icon: '🍽️', color: 'bg-green-100 text-green-700' },
    { key: 'transportation', label: 'Transportation', icon: '🚗', color: 'bg-purple-100 text-purple-700' },
    { key: 'healthcare', label: 'Healthcare', icon: '🏥', color: 'bg-red-100 text-red-700' },
    { key: 'insurance', label: 'Insurance', icon: '🛡️', color: 'bg-indigo-100 text-indigo-700' },
    { key: 'entertainment', label: 'Entertainment', icon: '🎬', color: 'bg-pink-100 text-pink-700' },
    { key: 'other', label: 'Other', icon: '📦', color: 'bg-gray-100 text-gray-700' },
  ]

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0)

  const getPercentage = (value: number) => {
    if (totalExpenses === 0) return 0
    return ((value / totalExpenses) * 100).toFixed(1)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-black mb-6">Monthly Expenses</h2>
      
      {totalExpenses === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No expense data available. Add your expenses to see breakdown.
        </p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {expenseCategories.map((category) => {
              const amount = expenses[category.key as keyof typeof expenses]
              const percentage = parseFloat(getPercentage(amount))
              
              return (
                <div key={category.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium text-gray-700">{category.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-black">
                        {formatCurrency(amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getPercentage(amount)}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${category.color.split(' ')[0]} h-2 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
            <span className="font-bold text-lg text-black">Total Monthly Expenses</span>
            <span className="font-bold text-lg text-black">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

