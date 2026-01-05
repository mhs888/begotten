'use client'

import { useState } from 'react'

interface NetWorthProjectorProps {
  currentSavings: number
  retirement: {
    targetAge: number
    currentAge: number
    spouseCurrentAge: number
    annualExpenses: number
    expectedReturn: number
  }
}

export default function NetWorthProjector({
  currentSavings,
  retirement,
}: NetWorthProjectorProps) {
  const [monthlyContribution, setMonthlyContribution] = useState(4000)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateFutureValue = (years: number, annualReturn: number, monthlyContrib: number) => {
    if (years <= 0) return currentSavings

    const r = annualReturn / 100
    const n = years
    const annualContrib = monthlyContrib * 12
    
    // Future value of current savings
    const futureValueOfCurrent = currentSavings * Math.pow(1 + r, n)
    
    // Future value of annuity (annual contributions)
    if (r > 0) {
      const futureValueOfAnnuity = annualContrib * ((Math.pow(1 + r, n) - 1) / r)
      return futureValueOfCurrent + futureValueOfAnnuity
    } else {
      return futureValueOfCurrent + (annualContrib * n)
    }
  }

  // Find earliest retirement age where portfolio >= 25x annual expenses
  const findEarliestRetirement = () => {
    const targetNetWorth = retirement.annualExpenses * 25
    const minAge = retirement.currentAge
    const maxAge = 70

    for (let age = minAge; age <= maxAge; age++) {
      const years = age - retirement.currentAge
      const projected = calculateFutureValue(years, retirement.expectedReturn, monthlyContribution)
      
      if (projected >= targetNetWorth) {
        return {
          age,
          years,
          netWorth: projected,
          annualWithdrawal: projected * 0.04, // 4% rule
        }
      }
    }

    // If not achievable by 70, return the max projection
    const years = maxAge - retirement.currentAge
    const projected = calculateFutureValue(years, retirement.expectedReturn, monthlyContribution)
    return {
      age: maxAge,
      years,
      netWorth: projected,
      annualWithdrawal: projected * 0.04,
      notAchievable: true,
    }
  }

  const findEarliestRetirementForContribution = (monthlyContrib: number) => {
    const targetNetWorth = retirement.annualExpenses * 25
    const minAge = retirement.currentAge
    const maxAge = 70

    for (let age = minAge; age <= maxAge; age++) {
      const years = age - retirement.currentAge
      const projected = calculateFutureValue(years, retirement.expectedReturn, monthlyContrib)
      
      if (projected >= targetNetWorth) {
        return {
          age,
          years,
          netWorth: projected,
          annualWithdrawal: projected * 0.04,
        }
      }
    }

    const years = maxAge - retirement.currentAge
    const projected = calculateFutureValue(years, retirement.expectedReturn, monthlyContrib)
    return {
      age: maxAge,
      years,
      netWorth: projected,
      annualWithdrawal: projected * 0.04,
      notAchievable: true,
    }
  }

  const earliestRetirement = findEarliestRetirement()
  const targetNetWorth = retirement.annualExpenses * 25
  const isAchievable = earliestRetirement.netWorth >= targetNetWorth

  // Calculate projections for different contribution levels
  const contributionScenarios = [2000, 3000, 4000, 5000, 6000]
  const scenarioResults = contributionScenarios.map(contrib => {
    const result = findEarliestRetirementForContribution(contrib)
    return {
      contribution: contrib,
      ...result,
    }
  })

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Earliest Retirement Projector</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-300">Monthly Contribution:</label>
          <select
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="px-3 py-1 border border-gray-600 rounded-md bg-gray-700 text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {contributionScenarios.map(contrib => (
              <option key={contrib} value={contrib}>
                ${contrib.toLocaleString()}/month
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Projection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Earliest Retirement Age</div>
          <div className="text-3xl font-bold text-blue-400">{earliestRetirement.age}</div>
          <div className="text-xs text-gray-500 mt-1">
            {earliestRetirement.years} years from now
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Projected Net Worth</div>
          <div className="text-3xl font-bold text-green-400">
            {formatCurrency(earliestRetirement.netWorth)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {isAchievable ? '✓ Target achieved' : `Need ${formatCurrency(targetNetWorth)}`}
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Annual Withdrawal (4% rule)</div>
          <div className="text-3xl font-bold text-purple-400">
            {formatCurrency(earliestRetirement.annualWithdrawal)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Target: {formatCurrency(retirement.annualExpenses)}
          </div>
        </div>
      </div>

      {/* Comparison by Contribution Level */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Earliest Retirement by Contribution Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {scenarioResults.map((scenario) => {
            const isSelected = scenario.contribution === monthlyContribution
            return (
              <div
                key={scenario.contribution}
                className={`bg-gray-800 rounded-lg p-3 border-2 ${
                  isSelected ? 'border-blue-500' : 'border-gray-700'
                }`}
              >
                <div className="text-xs font-medium text-gray-400 mb-1">
                  ${scenario.contribution.toLocaleString()}/mo
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  Age {scenario.age}
                </div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(scenario.netWorth)}
                </div>
                {scenario.notAchievable && (
                  <div className="text-xs text-red-400 mt-1">Not by 70</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Assumptions */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          Assumptions: {retirement.expectedReturn}% annual return, 4% safe withdrawal rate (25x annual expenses), 
          target annual expenses: {formatCurrency(retirement.annualExpenses)}
        </p>
      </div>
    </div>
  )
}

