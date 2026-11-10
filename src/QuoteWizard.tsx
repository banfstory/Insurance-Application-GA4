import { useEffect, useRef } from 'react'
import { useQuoteWizard } from './context/QuoteContext'
import { StepConfirmation } from './steps/buy/StepConfirmation'
import { StepPayment } from './steps/buy/StepPayment'
import { StepPolicyStart } from './steps/buy/StepPolicyStart'
import { StepCover } from './steps/quote/StepCover'
import { StepDriver } from './steps/quote/StepDriver'
import { StepQuoteSummary } from './steps/quote/StepQuoteSummary'
import { StepUsage } from './steps/quote/StepUsage'
import { StepVehicle } from './steps/quote/StepVehicle'
import pageView, { updateGlobalJourneyState } from './analytics/pageview'

const STEP_COMPONENTS = {
  vehicle: StepVehicle,
  usage: StepUsage,
  driver: StepDriver,
  cover: StepCover,
  'quote-summary': StepQuoteSummary,
  'policy-start': StepPolicyStart,
  payment: StepPayment,
  confirmation: StepConfirmation,
} as const

export function QuoteWizard() {
  const context = useQuoteWizard()
  const stepId = context?.stepId
  const { form, quote, policyNumber } = context
  const previousStepRef = useRef<string | null>(null)

  useEffect(() => {
    if (!stepId) return

    // Only fire if the stepId has actually changed from the previous render
    if (previousStepRef.current === stepId) {
      return
    }

    previousStepRef.current = stepId;
    // Store stepId into window.__pageId
    (window as any).__pageId = stepId

    let pageData: Record<string, unknown> | null = null
    switch (stepId) {
      case 'vehicle':
        pageData = { quoteStarted: true }
        break
      case 'usage':
        updateGlobalJourneyState({
          vehicleIdentificationMethod: form.vehicle.identificationMode,
        })
        break
      case 'driver':
        updateGlobalJourneyState({
          suburb: form.usage.suburb,
          state: form.usage.state,
          overnightParkingType: form.usage.parkingType,
        })
        break
      case 'quote-summary':
        updateGlobalJourneyState({
          coverType: form.cover.coverType,
          optionalBenefits: Object.entries(form.cover.addOns)
            .filter(([, selected]) => selected)
            .map(([benefit]) => benefit)
            .join('|'),
        })
        pageData = { quoteCompleted: true }
        break
      case 'policy-start':
        pageData = { policyPurchaseStarted: true }
        break
      case 'payment':
        updateGlobalJourneyState({
          policyStartDate: form.buy.policyStartDate,
        })
        break
      case 'confirmation':
        updateGlobalJourneyState({ policyNumber })
        pageData = {
          annualPremium: quote.annualTotal,
          policyPurchaseCompleted: true,
        }
        break
    }

    pageView(pageData)
  }, [form, policyNumber, quote.annualTotal, stepId])

  // Safely check if stepId is valid and exists in our map
  const Step = stepId ? STEP_COMPONENTS[stepId as keyof typeof STEP_COMPONENTS] : undefined
  
  if (!Step) {
    return <div className="p-4 text-red-600">Error: Invalid or missing step ID ("{String(stepId)}")</div>
  }

  return (
    <div data-tracking-group={stepId}>
      <Step />
    </div>
  )
}