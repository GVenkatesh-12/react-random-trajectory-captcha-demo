import { useState, useRef } from 'react'
import {
  RandomTrajectoryCaptcha,
  type CaptchaHandle,
  type CaptchaVerificationResult,
} from 'react-random-trajectory-captcha'
import 'react-random-trajectory-captcha/style.css'
import {
  ShieldCheck,
  Check,
  RotateCcw,
  ExternalLink,
  Copy,
  X,
  Zap,
  Target,
  MousePointer,
  Sparkles,
} from 'lucide-react'

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [result, setResult] = useState<CaptchaVerificationResult | null>(null)
  const [copied, setCopied] = useState(false)
  const captchaRef = useRef<CaptchaHandle>(null)

  const handleCheckboxClick = () => {
    if (isVerified) return
    setIsModalOpen(true)
  }

  const handleCaptchaSuccess = (res: CaptchaVerificationResult) => {
    setResult(res)
    // Smooth transition back to verified checkbox
    setTimeout(() => {
      setIsModalOpen(false)
      setIsVerified(true)
    }, 450)
  }

  const handleReset = () => {
    setIsVerified(false)
    setResult(null)
    setIsModalOpen(false)
  }

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install github:GVenkatesh-12/react-random-trajectory-captcha')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Bar */}
      <header className="w-full max-w-md flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
              Motion CAPTCHA
            </h1>
            <p className="text-xs text-slate-400">Human Verification Demo</p>
          </div>
        </div>

        <a
          href="https://github.com/GVenkatesh-12/react-random-trajectory-captcha"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all group"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
        </a>
      </header>

      {/* Main Center Stage */}
      <main className="w-full max-w-md my-auto py-8 space-y-6 text-center">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Verify You Are Human
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click the check box below to begin the challenge
          </p>
        </div>

        {/* Turnstile / reCAPTCHA Style Checkbox Widget */}
        <div
          onClick={handleCheckboxClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') handleCheckboxClick()
          }}
          className={`w-full bg-slate-900 border transition-all duration-300 rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
            isVerified
              ? 'border-emerald-500/50 bg-emerald-950/20'
              : 'border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/80 active:scale-[0.99]'
          }`}
        >
          {/* Left: Checkbox & Label */}
          <div className="flex items-center gap-3.5">
            <div
              className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                isVerified
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30 scale-105'
                  : isModalOpen
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-slate-700 bg-slate-950 hover:border-purple-400'
              }`}
            >
              {isVerified ? (
                <Check className="w-4 h-4 stroke-[3] animate-in zoom-in-50 duration-200" />
              ) : isModalOpen ? (
                <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              ) : null}
            </div>

            <span className={`text-sm font-medium ${isVerified ? 'text-emerald-300 font-semibold' : 'text-slate-200'}`}>
              {isVerified ? 'Verification Complete' : 'Verify you are human'}
            </span>
          </div>

          {/* Right: Security Badge */}
          <div className="flex flex-col items-end text-right text-slate-500">
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className={`w-4 h-4 ${isVerified ? 'text-emerald-400' : 'text-purple-400'}`} />
              <span>Motion CAPTCHA</span>
            </div>
            <span className="text-[9px] text-slate-600 font-mono">Protected</span>
          </div>
        </div>

        {/* Verification Success Details Card */}
        {isVerified && result && (
          <div className="animate-in fade-in zoom-in-95 duration-200 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-4 text-left space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Human Verified
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5 mb-0.5">
                  <Zap className="w-2.5 h-2.5 text-amber-400" />
                  Latency
                </span>
                <span className="font-bold text-slate-200">{result.reactionTime.toFixed(0)} ms</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5 mb-0.5">
                  <Target className="w-2.5 h-2.5 text-purple-400" />
                  Accuracy
                </span>
                <span className="font-bold text-slate-200">{result.spatialError.toFixed(1)} px</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 flex items-center justify-center gap-0.5 mb-0.5">
                  <MousePointer className="w-2.5 h-2.5 text-cyan-400" />
                  Device
                </span>
                <span className="font-bold text-slate-200 capitalize">{result.pointerType}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick npm install copy snippet */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center justify-between gap-2 text-xs">
          <span className="text-slate-400 font-mono text-[11px] truncate">
            npm install github:GVenkatesh-12/react-random-trajectory-captcha
          </span>
          <button
            type="button"
            onClick={copyInstallCommand}
            className="flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </main>

      {/* Verification Challenge Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Dialog Card */}
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-100">
                    Human Verification Challenge
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Click or tap the moving orb inside the target zone
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Captcha Viewport - Clean without bot buttons or controls */}
            <div className="p-4 sm:p-5">
              <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-2 flex justify-center shadow-inner">
                <RandomTrajectoryCaptcha
                  ref={captchaRef}
                  difficulty="medium"
                  tolerance={1.2}
                  trajectoryType="random"
                  height={320}
                  showControls={false}
                  showBotSimulator={false}
                  showInstructions={true}
                  onSuccess={handleCaptchaSuccess}
                  onFailure={() => {
                    // Handled within canvas
                  }}
                  onReset={() => {
                    setResult(null)
                  }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Touch, mouse & stylus supported</span>
                <button
                  type="button"
                  onClick={() => captchaRef.current?.reset()}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Reset Trajectory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-md text-center pt-4 border-t border-slate-800/80 text-xs text-slate-500">
        <p>
          Component: <a href="https://github.com/GVenkatesh-12/react-random-trajectory-captcha" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">react-random-trajectory-captcha</a> • MIT License
        </p>
      </footer>
    </div>
  )
}
