'use client'

import { useState, useEffect } from 'react'
import FinanceNav from '@/components/FinanceNav'
import FinancialOverview from '@/components/FinancialOverview'
import PortfolioAllocation from '@/components/PortfolioAllocation'
import PortfolioGrowth from '@/components/PortfolioGrowth'
import RetirementTimeline from '@/components/RetirementTimeline'
import FinancialDataInput from '@/components/FinancialDataInput'
import NetWorthProjector from '@/components/NetWorthProjector'
import ExposureForecast from '@/components/ExposureForecast'
import { calculateTaxes } from '@/lib/taxCalculator'

export interface FinancialData {
  // Income
  monthlyIncome: number
  spouseMonthlyIncome: number
  
  // Assets
  savings: number
  investments: number
  retirementAccounts: number
  otherAssets: number
  
  // Portfolio Allocation
  portfolio: {
    stocks: number
    bonds: number
    realEstate: number
    cash: number
    other: number
  }
  
  // Expenses
  monthlyExpenses: {
    housing: number
    utilities: number
    food: number
    transportation: number
    healthcare: number
    insurance: number
    entertainment: number
    other: number
  }
  
  // Retirement Planning
  retirement: {
    targetAge: number
    currentAge: number
    spouseCurrentAge: number
    annualExpenses: number
    expectedReturn: number
  }
}

// Calculate after-tax income from $250k gross (married filing jointly, CT residency)
const grossAnnualIncome = 250000
const taxResult = calculateTaxes(grossAnnualIncome)
const netAnnualIncome = taxResult.netIncome
// Split proportionally based on original 150k/80k split (60%/32% of 250k, with remainder)
// Using 150k/80k = 65.2%/34.8% split of net income
const userGross = 150000
const spouseGross = 80000
const totalOriginal = userGross + spouseGross
const userNet = (userGross / totalOriginal) * netAnnualIncome
const spouseNet = (spouseGross / totalOriginal) * netAnnualIncome

const defaultData: FinancialData = {
  monthlyIncome: userNet / 12, // After-tax from 150k gross
  spouseMonthlyIncome: spouseNet / 12, // After-tax from 80k gross
  savings: 682558, // Checking (360k) + Money market/EJ standard cash (202,558) + Spouse checking/savings (120k)
  investments: 965510, // EJ Standard stocks/bonds (363,440) + EJ Guided stocks/bonds (162,070) + Taxable stocks (320k) + Spouse mutual fund (120k)
  retirementAccounts: 209000, // Your 401k (109k) + Spouse Traditional 401k (70k) + Spouse Roth IRA (30k) - assume 80% stocks, 20% bonds
  otherAssets: 224433, // Crypto total (224,433)
  portfolio: {
    stocks: 961370, // EJ stocks (354,210) + Taxable stocks (320k) + Spouse mutual fund (120k) + Retirement accounts stocks (167,200 = 80% of 209k)
    bonds: 212700, // EJ bonds (171,300) + Retirement accounts bonds (41,800 = 20% of 209k)
    realEstate: 0,
    cash: 682558, // Checking + money market + spouse checking/savings
    other: 224433, // Crypto
  },
  monthlyExpenses: {
    housing: 5500,
    utilities: 500,
    food: 866.67,
    transportation: 500,
    healthcare: 200,
    insurance: 300,
    entertainment: 1500,
    other: 0,
  },
  retirement: {
    targetAge: 55,
    currentAge: 31,
    spouseCurrentAge: 30,
    annualExpenses: 185000,
    expectedReturn: 6,
  },
}

export default function FinancesPage() {
  const [data, setData] = useState<FinancialData>(defaultData)
  const [isEditing, setIsEditing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    // Load data from localStorage - using private key separate from store
    const savedData = localStorage.getItem('private-financial-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setData({ ...defaultData, ...parsed })
        const savedDate = localStorage.getItem('private-financial-data-updated')
        if (savedDate) {
          setLastUpdated(new Date(savedDate))
        }
      } catch (e) {
        console.error('Error loading financial data:', e)
      }
    }
  }, [])

  const saveData = (newData: FinancialData) => {
    setData(newData)
    // Store in private localStorage key - completely separate from store
    localStorage.setItem('private-financial-data', JSON.stringify(newData))
    const now = new Date()
    localStorage.setItem('private-financial-data-updated', now.toISOString())
    setLastUpdated(now)
    setIsEditing(false)
  }

  const totalAssets = data.savings + data.investments + data.retirementAccounts + data.otherAssets
  const totalMonthlyIncome = data.monthlyIncome + data.spouseMonthlyIncome
  // For now, use a placeholder monthly contribution - user can adjust in projections
  const monthlySavings = 4000 // Default monthly investment contribution

  return (
    <main className="min-h-screen bg-gray-900">
      <FinanceNav />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-semibold text-white mb-2">
                Financial Dashboard
              </h1>
              {lastUpdated && (
                <p className="text-sm text-gray-400">
                  Last updated: {lastUpdated.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-md font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit Data'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {isEditing ? (
          <FinancialDataInput
            data={data}
            onSave={saveData}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-12">
            {/* Section 1: Retirement Forecast */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-blue-500"></div>
                <h2 className="text-3xl font-bold text-white">Retirement Forecast</h2>
              </div>
              <NetWorthProjector
                currentSavings={totalAssets}
                retirement={data.retirement}
              />
            </div>

            {/* Section 2: Net Worth Overview */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-blue-500"></div>
                <h2 className="text-3xl font-bold text-white">Net Worth Overview</h2>
              </div>
              <FinancialOverview
                totalAssets={totalAssets}
                monthlyIncome={totalMonthlyIncome}
                monthlyExpenses={0}
                monthlySavings={monthlySavings}
              />
              
              <PortfolioAllocation
                portfolio={data.portfolio}
                totalAssets={totalAssets}
              />
            </div>

            {/* Section 3: Growth Analysis */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-blue-500"></div>
                <h2 className="text-3xl font-bold text-white">Growth Analysis</h2>
              </div>
              <PortfolioGrowth
                currentSavings={totalAssets}
                retirement={data.retirement}
              />
              
              <ExposureForecast
                currentSavings={totalAssets}
                portfolio={data.portfolio}
                retirement={data.retirement}
                monthlyContribution={monthlySavings}
              />
              
              <RetirementTimeline
                retirement={data.retirement}
                currentSavings={totalAssets}
                monthlySavings={monthlySavings}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

