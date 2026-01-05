'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface PortfolioGrowthProps {
  currentSavings: number
  retirement: {
    targetAge: number
    currentAge: number
    spouseCurrentAge: number
    annualExpenses: number
    expectedReturn: number
  }
}

export default function PortfolioGrowth({
  currentSavings,
  retirement,
}: PortfolioGrowthProps) {
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

  const retirementAges = [41, 45, 50, 55, 60, 65]
  const returnScenarios = [
    { label: 'Conservative', return: 5 },
    { label: 'Moderate', return: 7 },
    { label: 'Aggressive', return: 9 },
  ]

  const contributionScenarios = [
    { label: '$2,000/month', value: 2000 },
    { label: '$3,000/month', value: 3000 },
    { label: '$4,000/month', value: 4000 },
    { label: '$5,000/month', value: 5000 },
    { label: '$6,000/month', value: 6000 },
  ]

  // Generate chart data for growth over time
  const generateChartData = (contrib: number, returnRate: number) => {
    const data = []
    const maxAge = 65
    for (let age = retirement.currentAge; age <= maxAge; age++) {
      const years = age - retirement.currentAge
      const value = calculateFutureValue(years, returnRate, contrib)
      data.push({
        age,
        value: Math.round(value),
      })
    }
    return data
  }

  const chartData = generateChartData(monthlyContribution, retirement.expectedReturn)
  const conservativeData = generateChartData(monthlyContribution, 5)
  const moderateData = generateChartData(monthlyContribution, 7)
  const aggressiveData = generateChartData(monthlyContribution, 9)

  // Combine data for multi-line chart
  const combinedChartData = chartData.map((item, index) => ({
    age: item.age,
    Conservative: conservativeData[index].value,
    Moderate: moderateData[index].value,
    Aggressive: aggressiveData[index].value,
  }))

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-sm p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Portfolio Growth Projections</h2>
      
      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Monthly Contribution
          </label>
          <div className="flex gap-2 flex-wrap">
            {contributionScenarios.map((scenario) => (
              <button
                key={scenario.value}
                onClick={() => setMonthlyContribution(scenario.value)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  monthlyContribution === scenario.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Growth Chart - Return Scenarios */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">
          Growth Over Time - Return Scenarios (${monthlyContribution.toLocaleString()}/month)
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="age" 
                stroke="#9ca3af"
                label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: '#d1d5db' }}
              />
              <YAxis 
                stroke="#9ca3af"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                labelFormatter={(label) => `Age ${label}`}
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
              />
              <Legend wrapperStyle={{ color: '#d1d5db' }} />
              <Line 
                type="monotone" 
                dataKey="Conservative" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="Moderate" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="Aggressive" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projections by Retirement Age */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Projections by Retirement Age</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 font-semibold text-gray-300">Retirement Age</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-300">Years</th>
                {returnScenarios.map((scenario) => (
                  <th key={scenario.label} className="text-right py-3 px-4 font-semibold text-gray-300">
                    {scenario.label} ({scenario.return}%)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retirementAges.map((age) => {
                const years = age - retirement.currentAge
                return (
                  <tr
                    key={age}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="py-3 px-4 font-medium text-white">{age}</td>
                    <td className="py-3 px-4 text-right text-gray-400">{years}</td>
                    {returnScenarios.map((scenario) => {
                      const projected = calculateFutureValue(years, scenario.return, monthlyContribution)
                      return (
                        <td key={scenario.label} className="py-3 px-4 text-right font-semibold text-white">
                          {formatCurrency(projected)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Current Settings Summary */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h4 className="font-semibold text-white mb-2">Current Projection Settings</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Current Savings</div>
              <div className="font-semibold text-white">{formatCurrency(currentSavings)}</div>
            </div>
            <div>
              <div className="text-gray-400">Monthly Contribution</div>
              <div className="font-semibold text-white">{formatCurrency(monthlyContribution)}</div>
            </div>
            <div>
              <div className="text-gray-400">Annual Contribution</div>
              <div className="font-semibold text-white">{formatCurrency(monthlyContribution * 12)}</div>
            </div>
            <div>
              <div className="text-gray-400">Current Age</div>
              <div className="font-semibold text-white">{retirement.currentAge}</div>
            </div>
          </div>
        </div>

        {/* FI Target Comparison */}
        {retirement.annualExpenses > 0 && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-white mb-3">Financial Independence Target</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Target (25x annual expenses):</span>
                <span className="font-semibold text-white">
                  {formatCurrency(retirement.annualExpenses * 25)}
                </span>
              </div>
              {retirementAges.map((age) => {
                const years = age - retirement.currentAge
                const projected = calculateFutureValue(years, retirement.expectedReturn, monthlyContribution)
                const isOnTrack = projected >= retirement.annualExpenses * 25
                return (
                  <div key={age} className="flex justify-between items-center">
                    <span className="text-gray-300">Age {age} ({years} years):</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isOnTrack ? 'text-green-400' : 'text-gray-400'}`}>
                        {formatCurrency(projected)}
                      </span>
                      {isOnTrack && <span className="text-green-400">✓</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

