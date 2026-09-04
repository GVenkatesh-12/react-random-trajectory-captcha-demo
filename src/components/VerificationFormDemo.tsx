import React, { useState, useRef } from 'react'
import {
  RandomTrajectoryCaptcha,
  type CaptchaHandle,
  type CaptchaVerificationResult,
} from 'react-random-trajectory-captcha'
import 'react-random-trajectory-captcha/style.css'
import { HumanVerificationModal } from './HumanVerificationModal'
import { TelemetryDisplay } from './TelemetryDisplay'
import type { VerificationAttempt } from '../types'
import {
  ShieldCheck,
  Send,
  Lock,
  Sparkles,
  RefreshCw,
  Wallet,
  AlertTriangle,
  Fingerprint,
} from 'lucide-react'

interface VerificationFormDemoProps {
  onRecordAttempt: (attempt: VerificationAttempt) => void
}

export const VerificationFormDemo: React.FC<VerificationFormDemoProps> = ({ onRecordAttempt }) => {
  const [mode, setMode] = useState<'inline' | 'modal'>('inline')
  const [recipient, setRecipient] = useState('0x71C...a89B (Escrow Smart Contract)')
  const [amount, setAmount] = useState('2,500 USDC')
  const [note, setNote] = useState('Audit & Settlement Release')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [lastResult, setLastResult] = useState<CaptchaVerificationResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')

  const inlineCaptchaRef = useRef<CaptchaHandle>(null)

  const handleInlineSuccess = (result: CaptchaVerificationResult) => {
    setIsVerified(true)
    setLastResult(result)
    onRecordAttempt({
      ...result,
      id: Math.random().toString(36).substring(2, 9),
      context: 'form-inline',
    })
  }

  const handleModalSuccess = (result: CaptchaVerificationResult) => {
    setIsVerified(true)
    setLastResult(result)
    onRecordAttempt({
      ...result,
      id: Math.random().toString(36).substring(2, 9),
      context: 'form-modal',
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'modal' && !isVerified) {
      // Open modal challenge
      setIsModalOpen(true)
      return
    }

    if (!isVerified) {
      alert('Please complete the motion verification challenge first!')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setTransactionSuccess(true)
    }, 800)
  }

  const handleResetForm = () => {
    setIsVerified(false)
    setLastResult(null)
    setTransactionSuccess(false)
    inlineCaptchaRef.current?.reset()
  }

  return (
    <div className="space-y-8">
      {/* Introduction banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/20 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 shadow-lg shadow-purple-500/10">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Human Verification Gate Demo
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-mono px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Active
                </span>
              </h2>
              <p className="text-sm text-slate-300 mt-0.5">
                Simulates a high-security operation requiring real-time motion trajectory challenge before execution.
              </p>
            </div>
          </div>

          {/* Verification Mode Selector */}
          <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 self-stretch sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setMode('inline')
                handleResetForm()
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'inline'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Inline Challenge
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('modal')
                handleResetForm()
              }}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'modal'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Modal Pop-up Challenge
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Captcha Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Protected Form Column */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base">Authorize High-Value Vault Action</h3>
                <p className="text-xs text-slate-400">Requires proof of human presence</p>
              </div>
            </div>
            <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
              Tier 3 Security
            </span>
          </div>

          {transactionSuccess ? (
            <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                <ShieldCheck className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-white mb-1">Transaction Executed Successfully!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                Human verification verified via non-linear trajectory telemetry. Biometric jitter confirmed authentic operator.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-left font-mono text-xs space-y-2 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Action:</span>
                  <span className="text-slate-200">Vault Settlement</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Amount:</span>
                  <span className="text-emerald-400 font-bold">{amount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Recipient:</span>
                  <span className="text-slate-200 truncate max-w-[200px]">{recipient}</span>
                </div>
                <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                  <span>Verification Hash:</span>
                  <span className="text-purple-400 text-[10px]">
                    0x{Math.random().toString(16).substring(2, 18)}...PASS
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Test Another Protected Action
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination Escrow Address</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Transfer Value</label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition-colors font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Challenge Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      setDifficulty(e.target.value as any)
                      setIsVerified(false)
                      inlineCaptchaRef.current?.reset()
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="easy">Easy (Slower, wider target)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="hard">Hard (Fast, agile trajectory)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Authorization Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Status indicator badge */}
              <div className="pt-2">
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isVerified
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    {isVerified ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span>
                      {isVerified
                        ? 'Human presence confirmed! Ready to authorize.'
                        : mode === 'inline'
                        ? 'Solve the motion CAPTCHA below to unlock.'
                        : 'Verification challenge required before authorizing.'}
                    </span>
                  </div>

                  {isVerified && (
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-[11px] underline text-emerald-400 hover:text-emerald-300"
                    >
                      Re-challenge
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || (mode === 'inline' && !isVerified)}
                className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isVerified
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 active:scale-[0.99]'
                    : mode === 'modal'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20 active:scale-[0.99]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authorizing Transaction...
                  </span>
                ) : isVerified ? (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Confirm & Execute Transaction
                  </span>
                ) : mode === 'modal' ? (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Verify Human & Submit (Pop-up)
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Intercept Target Below to Unlock
                  </span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Challenge or Telemetry Column */}
        <div className="lg:col-span-6 space-y-6">
          {mode === 'inline' && !transactionSuccess && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h4 className="font-bold text-slate-100 text-sm">Interactive Motion Challenge</h4>
                </div>
                <span className="text-[11px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  Tap / click orb in crosshair
                </span>
              </div>

              {/* Inline CAPTCHA instance */}
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-2 flex justify-center shadow-inner">
                <RandomTrajectoryCaptcha
                  ref={inlineCaptchaRef}
                  difficulty={difficulty}
                  trajectoryType="random"
                  height={320}
                  showControls={true}
                  showBotSimulator={true}
                  showInstructions={true}
                  onSuccess={handleInlineSuccess}
                  onFailure={() => {
                    setIsVerified(false)
                  }}
                  onReset={() => {
                    setIsVerified(false)
                  }}
                />
              </div>

              <div className="mt-3.5 flex items-center justify-between text-xs text-slate-400">
                <span>Universal touch & mouse support</span>
                <span className="font-mono text-purple-400">github:GVenkatesh-12/...</span>
              </div>
            </div>
          )}

          {/* Real-time Telemetry Card */}
          <TelemetryDisplay result={lastResult} title="Form Submission Telemetry" />
        </div>
      </div>

      {/* Modal Dialog for Modal Mode */}
      <HumanVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerified={handleModalSuccess}
        actionName="Transfer of 2,500 USDC"
        difficulty={difficulty}
      />
    </div>
  )
}
