'use client'

import { useState } from 'react'
import type { FinancialData } from '@/app/finances/page'

interface FinancialDataInputProps {
  data: FinancialData
  onSave: (data: FinancialData) => void
  onCancel: () => void
}

export default function FinancialDataInput({
  data,
  onSave,
  onCancel,
}: FinancialDataInputProps) {
  const [formData, setFormData] = useState<FinancialData>(data)
  const [importJson, setImportJson] = useState('')
  const [importError, setImportError] = useState('')

  const handleImport = () => {
    try {
      setImportError('')
      const imported = JSON.parse(importJson)
      
      // Merge imported data with existing structure
      const merged: FinancialData = {
        monthlyIncome: imported.monthlyIncome ?? formData.monthlyIncome,
        spouseMonthlyIncome: imported.spouseMonthlyIncome ?? formData.spouseMonthlyIncome,
        savings: imported.savings ?? formData.savings,
        investments: imported.investments ?? formData.investments,
        retirementAccounts: imported.retirementAccounts ?? formData.retirementAccounts,
        otherAssets: imported.otherAssets ?? formData.otherAssets,
        portfolio: {
          stocks: imported.portfolio?.stocks ?? formData.portfolio.stocks,
          bonds: imported.portfolio?.bonds ?? formData.portfolio.bonds,
          realEstate: imported.portfolio?.realEstate ?? formData.portfolio.realEstate,
          cash: imported.portfolio?.cash ?? formData.portfolio.cash,
          other: imported.portfolio?.other ?? formData.portfolio.other,
        },
        monthlyExpenses: {
          housing: imported.monthlyExpenses?.housing ?? formData.monthlyExpenses.housing,
          utilities: imported.monthlyExpenses?.utilities ?? formData.monthlyExpenses.utilities,
          food: imported.monthlyExpenses?.food ?? formData.monthlyExpenses.food,
          transportation: imported.monthlyExpenses?.transportation ?? formData.monthlyExpenses.transportation,
          healthcare: imported.monthlyExpenses?.healthcare ?? formData.monthlyExpenses.healthcare,
          insurance: imported.monthlyExpenses?.insurance ?? formData.monthlyExpenses.insurance,
          entertainment: imported.monthlyExpenses?.entertainment ?? formData.monthlyExpenses.entertainment,
          other: imported.monthlyExpenses?.other ?? formData.monthlyExpenses.other,
        },
        retirement: {
          targetAge: imported.retirement?.targetAge ?? formData.retirement.targetAge,
          currentAge: imported.retirement?.currentAge ?? formData.retirement.currentAge,
          spouseCurrentAge: imported.retirement?.spouseCurrentAge ?? formData.retirement.spouseCurrentAge,
          annualExpenses: imported.retirement?.annualExpenses ?? formData.retirement.annualExpenses,
          expectedReturn: imported.retirement?.expectedReturn ?? formData.retirement.expectedReturn,
        },
      }
      
      setFormData(merged)
      setImportJson('')
      setImportError('Data imported successfully!')
      setTimeout(() => setImportError(''), 3000)
    } catch (e) {
      setImportError('Invalid JSON format. Please check your data and try again.')
    }
  }

  const updateField = (path: string[], value: number) => {
    setFormData((prev) => {
      const newData = { ...prev }
      let current: any = newData
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      
      current[path[path.length - 1]] = value
      return newData
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Import JSON Section */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Import Data from ChatGPT</h2>
        <p className="text-sm text-gray-600 mb-4">
          Paste your financial data as JSON here. You can copy the data structure from your ChatGPT conversation.
        </p>
        <div className="space-y-3">
          <textarea
            value={importJson}
            onChange={(e) => {
              setImportJson(e.target.value)
              setImportError('')
            }}
            placeholder='Paste JSON data here, e.g. {"monthlyIncome": 5000, "savings": 10000, ...}'
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
            rows={6}
          />
          {importError && (
            <p className={`text-sm ${importError.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {importError}
            </p>
          )}
          <button
            type="button"
            onClick={handleImport}
            disabled={!importJson.trim()}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-md font-medium"
          >
            Import JSON Data
          </button>
        </div>
        <details className="mt-4">
          <summary className="text-sm text-gray-600 cursor-pointer hover:text-black">
            View expected JSON format
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
{`{
  "monthlyIncome": 5000,
  "spouseMonthlyIncome": 4000,
  "savings": 25000,
  "investments": 50000,
  "retirementAccounts": 75000,
  "otherAssets": 0,
  "portfolio": {
    "stocks": 40000,
    "bonds": 10000,
    "realEstate": 0,
    "cash": 25000,
    "other": 0
  },
  "monthlyExpenses": {
    "housing": 2000,
    "utilities": 300,
    "food": 800,
    "transportation": 400,
    "healthcare": 200,
    "insurance": 300,
    "entertainment": 300,
    "other": 200
  },
  "retirement": {
    "targetAge": 65,
    "currentAge": 35,
    "spouseCurrentAge": 33,
    "annualExpenses": 60000,
    "expectedReturn": 7
  }
}`}
          </pre>
        </details>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Income</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Monthly Income
            </label>
            <input
              type="number"
              value={formData.monthlyIncome || ''}
              onChange={(e) => updateField(['monthlyIncome'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spouse Monthly Income
            </label>
            <input
              type="number"
              value={formData.spouseMonthlyIncome || ''}
              onChange={(e) => updateField(['spouseMonthlyIncome'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Assets Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Savings
            </label>
            <input
              type="number"
              value={formData.savings || ''}
              onChange={(e) => updateField(['savings'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investments
            </label>
            <input
              type="number"
              value={formData.investments || ''}
              onChange={(e) => updateField(['investments'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Accounts (401k, IRA, etc.)
            </label>
            <input
              type="number"
              value={formData.retirementAccounts || ''}
              onChange={(e) => updateField(['retirementAccounts'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Assets
            </label>
            <input
              type="number"
              value={formData.otherAssets || ''}
              onChange={(e) => updateField(['otherAssets'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Portfolio Allocation Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Portfolio Allocation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'stocks', label: 'Stocks' },
            { key: 'bonds', label: 'Bonds' },
            { key: 'realEstate', label: 'Real Estate' },
            { key: 'cash', label: 'Cash' },
            { key: 'other', label: 'Other' },
          ].map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {item.label}
              </label>
              <input
                type="number"
                value={formData.portfolio[item.key as keyof typeof formData.portfolio] || ''}
                onChange={(e) => updateField(['portfolio', item.key], parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Monthly Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'housing', label: 'Housing' },
            { key: 'utilities', label: 'Utilities' },
            { key: 'food', label: 'Food' },
            { key: 'transportation', label: 'Transportation' },
            { key: 'healthcare', label: 'Healthcare' },
            { key: 'insurance', label: 'Insurance' },
            { key: 'entertainment', label: 'Entertainment' },
            { key: 'other', label: 'Other' },
          ].map((item) => (
            <div key={item.key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {item.label}
              </label>
              <input
                type="number"
                value={formData.monthlyExpenses[item.key as keyof typeof formData.monthlyExpenses] || ''}
                onChange={(e) => updateField(['monthlyExpenses', item.key], parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Retirement Planning Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-6">Retirement Planning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Current Age
            </label>
            <input
              type="number"
              value={formData.retirement.currentAge || ''}
              onChange={(e) => updateField(['retirement', 'currentAge'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spouse Current Age
            </label>
            <input
              type="number"
              value={formData.retirement.spouseCurrentAge || ''}
              onChange={(e) => updateField(['retirement', 'spouseCurrentAge'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Retirement Age
            </label>
            <input
              type="number"
              value={formData.retirement.targetAge || ''}
              onChange={(e) => updateField(['retirement', 'targetAge'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="65"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.retirement.expectedReturn || ''}
              onChange={(e) => updateField(['retirement', 'expectedReturn'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="7"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Expenses in Retirement
            </label>
            <input
              type="number"
              value={formData.retirement.annualExpenses || ''}
              onChange={(e) => updateField(['retirement', 'annualExpenses'], parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">
              Estimate your annual expenses during retirement
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md font-medium"
        >
          Save Data
        </button>
      </div>
    </form>
  )
}

