'use client'

import { useState } from 'react'

interface ExposureForecastProps {
  currentSavings: number
  portfolio: {
    stocks: number
    bonds: number
    realEstate: number
    cash: number
    other: number
  }
  retirement: {
    targetAge: number
    currentAge: number
    spouseCurrentAge: number
    annualExpenses: number
    expectedReturn: number
  }
  monthlyContribution: number
}

export default function ExposureForecast({
  currentSavings,
  portfolio,
  retirement,
  monthlyContribution,
}: ExposureForecastProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateFutureValue = (
    years: number,
    cashAllocation: number,
    cashReturn: number,
    stocksBondsReturn: number,
    monthlyContrib: number
  ) => {
    if (years <= 0) return currentSavings

    const totalAssets = currentSavings
    const cashAmount = totalAssets * (cashAllocation / 100)
    const stocksBondsAmount = totalAssets - cashAmount

    const rCash = cashReturn / 100
    const rStocksBonds = stocksBondsReturn / 100
    const n = years
    const annualContrib = monthlyContrib * 12

    // Future value of current cash
    const futureValueOfCash = cashAmount * Math.pow(1 + rCash, n)
    
    // Future value of current stocks/bonds
    const futureValueOfStocksBonds = stocksBondsAmount * Math.pow(1 + rStocksBonds, n)
    
    // Future value of contributions (assume they go into stocks/bonds)
    let futureValueOfContributions = 0
    if (rStocksBonds > 0) {
      futureValueOfContributions = annualContrib * ((Math.pow(1 + rStocksBonds, n) - 1) / rStocksBonds)
    } else {
      futureValueOfContributions = annualContrib * n
    }

    return futureValueOfCash + futureValueOfStocksBonds + futureValueOfContributions
  }

  const currentCashPercentage = (portfolio.cash / currentSavings) * 100
  const cashReturn = 1.5 // Assume 1.5% return on cash (money market, savings)
  const stocksBondsReturn = retirement.expectedReturn // Use the expected return for stocks/bonds

  const scenarios = [
    {
      label: 'Current Allocation',
      cashPercent: currentCashPercentage,
      description: `${currentCashPercentage.toFixed(1)}% cash`,
    },
    {
      label: '20% Cash Target',
      cashPercent: 20,
      description: '20% cash, 80% stocks/bonds',
    },
    {
      label: '10% Cash Target',
      cashPercent: 10,
      description: '10% cash, 90% stocks/bonds',
    },
  ]

  // Show specific ages: current, then 35, 40, 45, 50, 55
  const retirementAges = [
    retirement.currentAge,
    35,
    40,
    45,
    50,
    55,
  ].filter(age => age >= retirement.currentAge && age <= 55)

  // Calculate projections for target retirement age
  const targetYears = retirement.targetAge - retirement.currentAge
  const currentProjection = calculateFutureValue(targetYears, currentCashPercentage, cashReturn, stocksBondsReturn, monthlyContribution)
  const projection20Cash = calculateFutureValue(targetYears, 20, cashReturn, stocksBondsReturn, monthlyContribution)
  const projection10Cash = calculateFutureValue(targetYears, 10, cashReturn, stocksBondsReturn, monthlyContribution)

  const difference20 = projection20Cash - currentProjection
  const difference10 = projection10Cash - currentProjection

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Exposure Forecast</h2>
      
      <div className="mb-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300 mb-2">
          <strong className="text-white">Current Cash Allocation:</strong> {currentCashPercentage.toFixed(1)}% ({formatCurrency(portfolio.cash)})
        </p>
        <p className="text-xs text-gray-400">
          Reducing cash allocation and moving funds to stocks/bonds can significantly increase projected returns. 
          Assumes cash earns 1.5% annually vs {stocksBondsReturn}% for stocks/bonds.
        </p>
      </div>

      {/* Projection Comparison at Target Retirement Age */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          Projected Net Worth at Age {retirement.targetAge} ({targetYears} years)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="text-sm text-gray-400 mb-1">Current Allocation</div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatCurrency(currentProjection)}
            </div>
            <div className="text-xs text-gray-500">
              {currentCashPercentage.toFixed(1)}% cash
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 border border-green-500">
            <div className="text-sm text-gray-400 mb-1">20% Cash Target</div>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {formatCurrency(projection20Cash)}
            </div>
            <div className="text-xs text-green-400">
              +{formatCurrency(difference20)} vs current
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4 border border-blue-500">
            <div className="text-sm text-gray-400 mb-1">10% Cash Target</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {formatCurrency(projection10Cash)}
            </div>
            <div className="text-xs text-blue-400">
              +{formatCurrency(difference10)} vs current
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Projections by Retirement Age
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Age</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">Current</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">20% Cash</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">10% Cash</th>
              </tr>
            </thead>
            <tbody>
              {retirementAges.map((age) => {
                const years = age - retirement.currentAge
                const current = calculateFutureValue(years, currentCashPercentage, cashReturn, stocksBondsReturn, monthlyContribution)
                const at20 = calculateFutureValue(years, 20, cashReturn, stocksBondsReturn, monthlyContribution)
                const at10 = calculateFutureValue(years, 10, cashReturn, stocksBondsReturn, monthlyContribution)
                return (
                  <tr key={age} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-4 font-medium text-white">{age}</td>
                    <td className="py-3 px-4 text-right text-gray-300">{formatCurrency(current)}</td>
                    <td className="py-3 px-4 text-right text-green-400">{formatCurrency(at20)}</td>
                    <td className="py-3 px-4 text-right text-blue-400">{formatCurrency(at10)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assumptions */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          <strong>Assumptions:</strong> Cash earns 1.5% annually, Stocks/Bonds earn {stocksBondsReturn}% annually. 
          Monthly contributions of {formatCurrency(monthlyContribution)} are assumed to go into stocks/bonds. 
          Current allocation: {currentCashPercentage.toFixed(1)}% cash, {(100 - currentCashPercentage).toFixed(1)}% stocks/bonds.
        </p>
      </div>
    </div>
  )
}

