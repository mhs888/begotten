'use client'

interface RetirementTimelineProps {
  retirement: {
    targetAge: number
    currentAge: number
    spouseCurrentAge: number
    annualExpenses: number
    expectedReturn: number
  }
  currentSavings: number
  monthlySavings: number
}

export default function RetirementTimeline({
  retirement,
  currentSavings,
  monthlySavings,
}: RetirementTimelineProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const yearsToRetirement = retirement.targetAge - retirement.currentAge
  const annualSavings = monthlySavings * 12
  const monthlyReturn = retirement.expectedReturn / 100 / 12
  const years = yearsToRetirement

  // Calculate future value using compound interest formula
  // FV = PV * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
  const calculateFutureValue = () => {
    if (years <= 0) return currentSavings

    const r = retirement.expectedReturn / 100
    const n = years
    
    // Future value of current savings
    const futureValueOfCurrent = currentSavings * Math.pow(1 + r, n)
    
    // Future value of annuity (monthly contributions)
    if (monthlyReturn > 0) {
      const futureValueOfAnnuity = annualSavings * ((Math.pow(1 + r, n) - 1) / r)
      return futureValueOfCurrent + futureValueOfAnnuity
    } else {
      return futureValueOfCurrent + (annualSavings * n)
    }
  }

  const projectedSavings = calculateFutureValue()
  const requiredSavings = retirement.annualExpenses * 25 // 4% rule
  const shortfall = requiredSavings - projectedSavings
  const isOnTrack = projectedSavings >= requiredSavings

  // Calculate different scenarios
  const scenarios = [
    {
      label: 'Conservative (5% return)',
      return: 5,
    },
    {
      label: 'Moderate (7% return)',
      return: 7,
    },
    {
      label: 'Aggressive (9% return)',
      return: 9,
    },
  ].map(scenario => {
    const r = scenario.return / 100
    const n = years
    const futureValueOfCurrent = currentSavings * Math.pow(1 + r, n)
    const futureValueOfAnnuity = annualSavings * ((Math.pow(1 + r, n) - 1) / r)
    return {
      ...scenario,
      projected: futureValueOfCurrent + futureValueOfAnnuity,
    }
  })

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Retirement Projections</h2>
      
      {retirement.annualExpenses === 0 ? (
        <p className="text-gray-400 text-center py-8">
          Add your retirement goals to see projections.
        </p>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="text-sm text-gray-400 mb-1">Years to Retirement</div>
              <div className="text-2xl font-bold text-blue-400">{yearsToRetirement}</div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="text-sm text-gray-400 mb-1">Projected Savings</div>
              <div className="text-2xl font-bold text-green-400">
                {formatCurrency(projectedSavings)}
              </div>
            </div>
            <div className={`${isOnTrack ? 'bg-gray-700 border-green-500' : 'bg-gray-700 border-red-500'} rounded-lg p-4 border`}>
              <div className="text-sm text-gray-400 mb-1">
                {isOnTrack ? 'Surplus' : 'Shortfall'}
              </div>
              <div className={`text-2xl font-bold ${isOnTrack ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(Math.abs(shortfall))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className={`p-4 rounded-lg ${isOnTrack ? 'bg-gray-700 border-green-500' : 'bg-gray-700 border-yellow-500'} border`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{isOnTrack ? '✅' : '⚠️'}</span>
              <div>
                <div className="font-semibold text-white">
                  {isOnTrack 
                    ? 'On Track for Retirement' 
                    : 'Not On Track - Consider Increasing Savings'}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Target: {formatCurrency(requiredSavings)} (25x annual expenses)
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Analysis */}
          <div>
            <h3 className="font-semibold text-white mb-4">Scenario Analysis</h3>
            <div className="space-y-3">
              {scenarios.map((scenario, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <span className="text-gray-300">{scenario.label}</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(scenario.projected)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assumptions */}
          <div className="pt-4 border-t border-gray-700">
            <h3 className="font-semibold text-white mb-2">Assumptions</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Current age: {retirement.currentAge} years</li>
              <li>• Target retirement age: {retirement.targetAge} years</li>
              <li>• Annual expenses in retirement: {formatCurrency(retirement.annualExpenses)}</li>
              <li>• Expected annual return: {retirement.expectedReturn}%</li>
              <li>• Using 4% withdrawal rule (25x annual expenses)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

