/**
 * Tax calculator for US (Connecticut residency)
 * Calculates federal, state, and FICA taxes for married filing jointly
 */

export interface TaxResult {
  grossIncome: number
  federalTax: number
  stateTax: number
  ficaTax: number
  netIncome: number
  effectiveTaxRate: number
}

export function calculateTaxes(grossAnnualIncome: number): TaxResult {
  // Federal Income Tax (2024 brackets, married filing jointly)
  let federalTax = 0
  const brackets = [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ]

  let remainingIncome = grossAnnualIncome
  for (const bracket of brackets) {
    if (remainingIncome <= 0) break
    
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    federalTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  // Connecticut State Income Tax (2024, married filing jointly)
  let stateTax = 0
  const ctBrackets = [
    { min: 0, max: 20000, rate: 0.03 },
    { min: 20000, max: 100000, rate: 0.05 },
    { min: 100000, max: 200000, rate: 0.055 },
    { min: 200000, max: 250000, rate: 0.06 },
    { min: 250000, max: 500000, rate: 0.065 },
    { min: 500000, max: Infinity, rate: 0.0699 },
  ]

  remainingIncome = grossAnnualIncome
  for (const bracket of ctBrackets) {
    if (remainingIncome <= 0) break
    
    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    stateTax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  // FICA Taxes (Social Security + Medicare)
  // Social Security: 6.2% on first $168,600 (2024 wage base limit)
  const socialSecurityWageBase = 168600
  const socialSecurityTax = Math.min(grossAnnualIncome, socialSecurityWageBase) * 0.062

  // Medicare: 1.45% on all income
  const medicareTax = grossAnnualIncome * 0.0145

  // Additional Medicare Tax: 0.9% on income over $250,000 (married filing jointly)
  let additionalMedicareTax = 0
  if (grossAnnualIncome > 250000) {
    additionalMedicareTax = (grossAnnualIncome - 250000) * 0.009
  }

  const ficaTax = socialSecurityTax + medicareTax + additionalMedicareTax

  const totalTax = federalTax + stateTax + ficaTax
  const netIncome = grossAnnualIncome - totalTax
  const effectiveTaxRate = (totalTax / grossAnnualIncome) * 100

  return {
    grossIncome: grossAnnualIncome,
    federalTax,
    stateTax,
    ficaTax,
    netIncome,
    effectiveTaxRate,
  }
}

