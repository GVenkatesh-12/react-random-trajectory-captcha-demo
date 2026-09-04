import React, { useRef } from 'react'
import {
  RandomTrajectoryCaptcha,
  type CaptchaHandle,
  type CaptchaVerificationResult,
} from 'react-random-trajectory-captcha'
import 'react-random-trajectory-captcha/style.css'
import { X, Shield, Lock, AlertCircle } from 'lucide-react'

interface HumanVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerified: (result: CaptchaVerificationResult) => void
  actionName?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export const HumanVerificationModal: React.FC<HumanVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  actionName = 'Vault Action Confirmation',
  difficulty = 'medium',
}) => {
  const captchaRef = useRef<CaptchaHandle>(null)

  if (!isOpen) return null

  const handleSuccess = (result: CaptchaVerificationResult) => {
    // Small delay so user sees green success indicator
    setTimeout(() => {
      onVerified(result)
      onClose()
    }, 650)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Security Check
                <span className="text-[10px] font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Motion CAPTCHA
                </span>
              </h3>
              <p className="text-xs text-slate-400">Verify you are human to proceed with {actionName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-4 bg-purple-950/30 border border-purple-800/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-purple-200">
            <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              <strong>Target Interception:</strong> Wait until the orb enters the crosshair target zone, then click or tap it directly.
            </span>
          </div>

          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-2 flex justify-center">
            <RandomTrajectoryCaptcha
              ref={captchaRef}
              difficulty={difficulty}
              trajectoryType="random"
              height={300}
              showControls={true}
              showBotSimulator={false}
              showInstructions={true}
              onSuccess={handleSuccess}
              onFailure={() => {
                // Failure feedback is handled automatically inside component
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              Touch, mouse, and stylus supported
            </span>
            <button
              type="button"
              onClick={() => captchaRef.current?.reset()}
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium text-xs"
            >
              Reset Trajectory
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
