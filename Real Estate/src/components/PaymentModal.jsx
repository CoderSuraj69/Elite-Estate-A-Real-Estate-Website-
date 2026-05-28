import { Elements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import stripePromise from '../utils/stripe'
import PaymentForm from './PaymentForm'

export default function PaymentModal({ isOpen, onClose, amount, onSuccess }) {
  const [clientSecret, setClientSecret] = useState('')

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-stone-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Complete Payment</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-stone-600 dark:text-stone-400">Amount to pay:</p>
          <p className="text-2xl font-bold text-primary-600">₹{amount.toLocaleString()}</p>
        </div>

        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm onSuccess={onSuccess} />
          </Elements>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-stone-600 dark:text-stone-400">Loading payment form...</p>
          </div>
        )}
      </div>
    </div>
  )
}