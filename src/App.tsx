import { useState } from 'react'
import { VerificationFormDemo } from './components/VerificationFormDemo'
import { PlaygroundView } from './components/PlaygroundView'
import { AttemptHistory } from './components/AttemptHistory'
import type { VerificationAttempt } from './types'
import {
  Shield,
  Sliders,
  History,
  CheckCircle2,
  Bot,
  Zap,
  ExternalLink,
} from 'lucide-react'

export function App() {
  const getInitialTab = (): 'demo' | 'playground' | 'history' => {
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get('tab')
    if (tabParam === 'playground' || tabParam === 'history' || tabParam === 'demo') {
      return tabParam
    }
    const hash = window.location.hash.replace('#', '')
    if (hash === 'playground' || hash === 'history' || hash === 'demo') {
      return hash
    }
    return 'demo'
  }

  const [activeTab, setActiveTab] = useState<'demo' | 'playground' | 'history'>(getInitialTab)
  const [attempts, setAttempts] = useState<VerificationAttempt[]>([])
  const [selectedAttempt, setSelectedAttempt] = useState<VerificationAttempt | null>(null)

  const handleTabChange = (tab: 'demo' | 'playground' | 'history') => {
    setActiveTab(tab)
    window.history.replaceState(null, '', `?tab=${tab}`)
  }

  const handleRecordAttempt = (attempt: VerificationAttempt) => {
    setAttempts((prev) => [attempt, ...prev])
  }

  const handleClearHistory = () => {
    setAttempts([])
    setSelectedAttempt(null)
  }

  // Summary Metrics
  const totalAttempts = attempts.length
  const successfulInterceptions = attempts.filter((a) => a.success).length
  const detectedBots = attempts.filter((a) => a.isLikelyBot).length
  const avgReactionTime =
    attempts.length > 0
      ? Math.round(attempts.reduce((acc, curr) => acc + curr.reactionTime, 0) / attempts.length)
      : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Motion CAPTCHA
                </span>
                <span className="text-[10px] bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-mono font-semibold">
                  v1.0.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Random Trajectory Motion & Telemetry Bot-Resistant Challenge
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleTabChange('demo')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'demo'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Human Verification Gate
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('playground')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'playground'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Configurator & Bot Lab
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('history')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Audit Log ({attempts.length})
            </button>
          </div>

          {/* Right GitHub Link */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/GVenkatesh-12/react-random-trajectory-captcha"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all group"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden sm:inline">GitHub Package</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
            </a>
          </div>
        </div>

        {/* Mobile Tab bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-900/60 px-2 py-1.5">
          <button
            type="button"
            onClick={() => handleTabChange('demo')}
            className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
              activeTab === 'demo' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            Verification Gate
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('playground')}
            className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
              activeTab === 'playground' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            Configurator
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('history')}
            className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg ${
              activeTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400'
            }`}
          >
            Audit Log ({attempts.length})
          </button>
        </div>
      </header>

      {/* Hero Stats Subheader */}
      <section className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Interceptions</span>
                <span className="font-mono font-bold text-slate-100 text-sm">
                  {successfulInterceptions} / {totalAttempts}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Bots Flagged</span>
                <span className="font-mono font-bold text-rose-400 text-sm">{detectedBots}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Avg Latency</span>
                <span className="font-mono font-bold text-amber-300 text-sm">
                  {avgReactionTime ? `${avgReactionTime} ms` : '—'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-800/50">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Source</span>
                <span className="font-mono font-bold text-emerald-400 text-xs truncate max-w-[130px]">
                  github:GVenkatesh-12
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'demo' && <VerificationFormDemo onRecordAttempt={handleRecordAttempt} />}

        {activeTab === 'playground' && <PlaygroundView onRecordAttempt={handleRecordAttempt} />}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <AttemptHistory
              attempts={attempts}
              onClear={handleClearHistory}
              onSelectAttempt={(a) => setSelectedAttempt(a)}
            />

            {selectedAttempt && (
              <div className="animate-in fade-in duration-200">
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Selected Attempt Inspection</h3>
                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 overflow-x-auto">
                  {JSON.stringify(selectedAttempt, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Global Recent Activity Tray on Demo / Playground tabs */}
        {activeTab !== 'history' && attempts.length > 0 && (
          <div className="mt-12 border-t border-slate-800/80 pt-8">
            <AttemptHistory
              attempts={attempts.slice(0, 5)}
              onClear={handleClearHistory}
              onSelectAttempt={(a) => {
                setSelectedAttempt(a)
                setActiveTab('history')
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Testing website for{' '}
            <code className="text-purple-400 font-mono">
              github:GVenkatesh-12/react-random-trajectory-captcha
            </code>
          </p>
          <p className="flex items-center gap-1">
            Built with React 19 + TypeScript + Vite + Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
