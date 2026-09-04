import { useState, useRef } from 'react'
import {
  RandomTrajectoryCaptcha,
  type CaptchaHandle,
  type CaptchaVerificationResult,
  type DifficultyLevel,
} from 'react-random-trajectory-captcha'
import 'react-random-trajectory-captcha/style.css'
import {
  ShieldCheck,
  ShieldAlert,
  Bot,
  UserCheck,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  Zap,
  Target,
  MousePointer,
} from 'lucide-react'

export function App() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')
  const [result, setResult] = useState<CaptchaVerificationResult | null>(null)
  const [copied, setCopied] = useState(false)
  const captchaRef = useRef<CaptchaHandle>(null)

  const handleComplete = (res: CaptchaVerificationResult) => {
    setResult(res)
  }

  const handleReset = () => {
    setResult(null)
    captchaRef.current?.reset()
  }

  const handleDifficultyChange = (lvl: DifficultyLevel) => {
    setDifficulty(lvl)
    setResult(null)
    captchaRef.current?.reset()
  }

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install github:GVenkatesh-12/react-random-trajectory-captcha')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Bar */}
      <header className="w-full max-w-2xl flex items-center justify-between pb-6 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/20">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-2">
              Motion CAPTCHA
              <span className="text-[10px] bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-mono font-semibold">
                Demo
              </span>
            </h1>
            <p className="text-xs text-slate-400">Random trajectory human verification</p>
          </div>
        </div>

        <a
          href="https://github.com/GVenkatesh-12/react-random-trajectory-captcha"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all group"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
        </a>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-xl my-auto py-8 space-y-6">
        {/* Instruction note */}
        <div className="text-center space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Human Verification Test
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Click or tap the moving orb when it enters the target zone to prove you are human.
          </p>
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-1">Difficulty:</span>
          {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleDifficultyChange(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                difficulty === lvl
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 ring-1 ring-purple-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {lvl} {lvl === 'medium' && <span className="text-[10px] text-purple-200/70">(Default)</span>}
            </button>
          ))}
        </div>

        {/* CAPTCHA Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-2 flex justify-center shadow-inner">
            <RandomTrajectoryCaptcha
              ref={captchaRef}
              difficulty={difficulty}
              trajectoryType="random"
              height={340}
              showControls={true}
              showBotSimulator={true}
              showInstructions={true}
              onSuccess={handleComplete}
              onFailure={handleComplete}
              onComplete={handleComplete}
              onReset={() => setResult(null)}
            />
          </div>
        </div>

        {/* Verification Result Card */}
        {result && (
          <div className="animate-in fade-in zoom-in-95 duration-200 bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    result.success
                      ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30'
                  }`}
                >
                  {result.success ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    {result.success ? 'Verification Successful' : 'Verification Failed'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {result.success
                      ? 'Orb intercepted inside target area'
                      : 'Target missed or clicked outside perimeter'}
                  </p>
                </div>
              </div>

              {/* Bot Heuristic Pill */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border ${
                  result.isLikelyBot
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                }`}
              >
                {result.isLikelyBot ? (
                  <>
                    <Bot className="w-3.5 h-3.5" />
                    <span>Bot Detected</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Human Verified</span>
                  </>
                )}
              </div>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-2.5 font-mono text-center text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                  <Zap className="w-3 h-3 text-amber-400" />
                  Reaction
                </span>
                <span className="font-bold text-slate-100">{result.reactionTime.toFixed(0)} ms</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                  <Target className="w-3 h-3 text-purple-400" />
                  Error
                </span>
                <span className="font-bold text-slate-100">{result.spatialError.toFixed(1)} px</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1 mb-0.5">
                  <MousePointer className="w-3 h-3 text-cyan-400" />
                  Device
                </span>
                <span className="font-bold text-slate-100 capitalize">{result.pointerType}</span>
              </div>
            </div>

            {/* Try Again Button */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all shadow-md shadow-purple-600/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Test Again
              </button>
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

      {/* Footer */}
      <footer className="w-full max-w-2xl text-center pt-4 border-t border-slate-800/80 text-xs text-slate-500">
        <p>
          Component: <a href="https://github.com/GVenkatesh-12/react-random-trajectory-captcha" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">react-random-trajectory-captcha</a> • MIT License
        </p>
      </footer>
    </div>
  )
}
