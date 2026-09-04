import React, { useState, useRef } from 'react'
import {
  RandomTrajectoryCaptcha,
  type CaptchaHandle,
  type CaptchaVerificationResult,
  type DifficultyLevel,
  type TrajectoryCurveType,
  type BotSimulationMode,
  type CaptchaTheme,
} from 'react-random-trajectory-captcha'
import 'react-random-trajectory-captcha/style.css'
import { TelemetryDisplay } from './TelemetryDisplay'
import type { VerificationAttempt } from '../types'
import {
  Sliders,
  Play,
  RotateCcw,
  Bot,
  Palette,
  Compass,
  Gauge,
  Eye,
  Zap,
  CheckCircle,
} from 'lucide-react'

// Curated themes for the playground
const THEME_PRESETS: Record<string, { name: string; id: string; theme: CaptchaTheme }> = {
  cyberpunk: {
    name: 'Cyberpunk Purple',
    id: 'cyberpunk',
    theme: {
      ballColor: '#c084fc',
      ballGlowColor: '#a855f7',
      trailColor: 'rgba(168, 85, 247, 0.45)',
      targetAreaColor: 'rgba(168, 85, 247, 0.08)',
      targetRingColor: 'rgba(192, 132, 252, 0.5)',
      crosshairColor: 'rgba(216, 180, 254, 0.6)',
      accentColor: '#a855f7',
      backgroundColor: '#090714',
      borderColor: '#4c1d95',
      textColor: '#f3e8ff',
    },
  },
  emerald: {
    name: 'Matrix Emerald',
    id: 'emerald',
    theme: {
      ballColor: '#34d399',
      ballGlowColor: '#10b981',
      trailColor: 'rgba(16, 185, 129, 0.45)',
      targetAreaColor: 'rgba(16, 185, 129, 0.08)',
      targetRingColor: 'rgba(52, 211, 153, 0.5)',
      crosshairColor: 'rgba(110, 231, 183, 0.6)',
      accentColor: '#10b981',
      backgroundColor: '#021810',
      borderColor: '#065f46',
      textColor: '#d1fae5',
    },
  },
  sunset: {
    name: 'Sunset Amber',
    id: 'sunset',
    theme: {
      ballColor: '#fb923c',
      ballGlowColor: '#f97316',
      trailColor: 'rgba(249, 115, 22, 0.45)',
      targetAreaColor: 'rgba(249, 115, 22, 0.08)',
      targetRingColor: 'rgba(251, 146, 60, 0.5)',
      crosshairColor: 'rgba(253, 186, 116, 0.6)',
      accentColor: '#f97316',
      backgroundColor: '#160b03',
      borderColor: '#7c2d12',
      textColor: '#ffedd5',
    },
  },
  ocean: {
    name: 'Deep Oceanic',
    id: 'ocean',
    theme: {
      ballColor: '#38bdf8',
      ballGlowColor: '#0284c7',
      trailColor: 'rgba(2, 132, 199, 0.45)',
      targetAreaColor: 'rgba(2, 132, 199, 0.08)',
      targetRingColor: 'rgba(56, 189, 248, 0.5)',
      crosshairColor: 'rgba(125, 211, 252, 0.6)',
      accentColor: '#0284c7',
      backgroundColor: '#031321',
      borderColor: '#075985',
      textColor: '#e0f2fe',
    },
  },
}

interface PlaygroundViewProps {
  onRecordAttempt: (attempt: VerificationAttempt) => void
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ onRecordAttempt }) => {
  const captchaRef = useRef<CaptchaHandle>(null)

  // Configuration state
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium')
  const [trajectoryType, setTrajectoryType] = useState<TrajectoryCurveType>('random')
  const [height, setHeight] = useState<number>(340)
  const [showControls, setShowControls] = useState<boolean>(true)
  const [showBotSimulator, setShowBotSimulator] = useState<boolean>(true)
  const [showInstructions, setShowInstructions] = useState<boolean>(true)
  const [reducedMotion, setReducedMotion] = useState<boolean>(false)
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>('cyberpunk')
  const [useCustomTheme, setUseCustomTheme] = useState<boolean>(false)

  // Bot running state
  const [isBotRunning, setIsBotRunning] = useState<boolean>(false)
  const [lastResult, setLastResult] = useState<CaptchaVerificationResult | null>(null)

  const handleComplete = (result: CaptchaVerificationResult) => {
    setLastResult(result)
    onRecordAttempt({
      ...result,
      id: Math.random().toString(36).substring(2, 9),
      context: isBotRunning ? 'bot-test' : 'playground',
    })
  }

  const runBot = async (mode: BotSimulationMode) => {
    if (!captchaRef.current) return
    setIsBotRunning(true)
    try {
      const res = await captchaRef.current.simulateBot(mode)
      handleComplete(res)
    } finally {
      setIsBotRunning(false)
    }
  }

  const currentTheme = useCustomTheme
    ? (THEME_PRESETS as any)[selectedThemeKey]?.theme
    : undefined

  return (
    <div className="space-y-8">
      {/* Playground Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              Interactive Component Configurator & Bot Lab
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Customize flight physics, trajectory geometry, color palettes, and benchmark automated bot detection algorithms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => captchaRef.current?.reset()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={() => captchaRef.current?.start()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors shadow-lg shadow-purple-600/20"
            >
              <Play className="w-3.5 h-3.5" />
              Start Flight
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel: Config */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
              <Gauge className="w-4 h-4 text-purple-400" />
              Flight Physics & Trajectory
            </h3>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Difficulty Preset</label>
              <div className="grid grid-cols-3 gap-2">
                {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize transition-all ${
                      difficulty === level
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Trajectory Pattern */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                Trajectory Pattern
              </label>
              <select
                value={trajectoryType}
                onChange={(e) => setTrajectoryType(e.target.value as TrajectoryCurveType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
              >
                <option value="random">random (Unpredictable Non-Linear)</option>
                <option value="curved">curved (Quadratic Bézier)</option>
                <option value="sinusoidal">sinusoidal (Oscillating Sine Wave)</option>
                <option value="piecewise">piecewise (Sharp Zig-Zag Segments)</option>
                <option value="accelerating">accelerating (Exponential Surge)</option>
                <option value="decelerating">decelerating (Glide to Rest)</option>
                <option value="bouncing">bouncing (Wall & Ceiling Reflection)</option>
              </select>
            </div>

            {/* Viewport Height */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
                <span>Canvas Height</span>
                <span className="font-mono text-purple-400">{height}px</span>
              </div>
              <input
                type="range"
                min="260"
                max="440"
                step="20"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-purple-500 bg-slate-950"
              />
            </div>

            {/* Feature Toggles */}
            <div className="border-t border-slate-800/80 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-purple-400" />
                Display Toggles
              </h4>

              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Built-in Header Controls</span>
                <input
                  type="checkbox"
                  checked={showControls}
                  onChange={(e) => setShowControls(e.target.checked)}
                  className="rounded accent-purple-600 bg-slate-950"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Bot Simulator Button</span>
                <input
                  type="checkbox"
                  checked={showBotSimulator}
                  onChange={(e) => setShowBotSimulator(e.target.checked)}
                  className="rounded accent-purple-600 bg-slate-950"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Floating Instructions Banner</span>
                <input
                  type="checkbox"
                  checked={showInstructions}
                  onChange={(e) => setShowInstructions(e.target.checked)}
                  className="rounded accent-purple-600 bg-slate-950"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-300 cursor-pointer">
                <span>Reduced Motion</span>
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => setReducedMotion(e.target.checked)}
                  className="rounded accent-purple-600 bg-slate-950"
                />
              </label>
            </div>

            {/* Themes */}
            <div className="border-t border-slate-800/80 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-purple-400" />
                  Custom Theme
                </h4>
                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                  <span>Enable</span>
                  <input
                    type="checkbox"
                    checked={useCustomTheme}
                    onChange={(e) => setUseCustomTheme(e.target.checked)}
                    className="rounded accent-purple-600 bg-slate-950"
                  />
                </label>
              </div>

              {useCustomTheme && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {Object.entries(THEME_PRESETS).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedThemeKey(key)}
                      className={`p-2 rounded-xl text-left text-xs font-semibold transition-all border ${
                        selectedThemeKey === key
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.theme.ballColor }}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bot Solver Automation Testbed */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-rose-400" />
                Bot Simulation Benchmark
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Execute automated bot interception routines via <code className="text-purple-300">ref.current.simulateBot(mode)</code>.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                disabled={isBotRunning}
                onClick={() => runBot('perfect')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-rose-400" />
                  <span>"perfect" Bot</span>
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono">
                  Instantaneous linear solve
                </span>
              </button>

              <button
                type="button"
                disabled={isBotRunning}
                onClick={() => runBot('human-like')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>"human-like" Bot</span>
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono">
                  Artificial jitter & delay
                </span>
              </button>

              <button
                type="button"
                disabled={isBotRunning}
                onClick={() => runBot('erratic')}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>"erratic" Bot</span>
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono">
                  Off-target failure mode
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Canvas Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping"></span>
                <h4 className="font-bold text-slate-100 text-sm">Live Component Viewport</h4>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-purple-300">
                  {trajectoryType}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
                  {difficulty}
                </span>
              </div>
            </div>

            {/* Captcha Canvas */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-2 flex justify-center shadow-inner">
              <RandomTrajectoryCaptcha
                ref={captchaRef}
                difficulty={difficulty}
                trajectoryType={trajectoryType}
                height={height}
                showControls={showControls}
                showBotSimulator={showBotSimulator}
                showInstructions={showInstructions}
                reducedMotion={reducedMotion}
                theme={currentTheme}
                onSuccess={handleComplete}
                onFailure={handleComplete}
                onComplete={handleComplete}
              />
            </div>
          </div>

          {/* Telemetry Display */}
          <TelemetryDisplay result={lastResult} title="Sandbox Execution Telemetry" />
        </div>
      </div>
    </div>
  )
}
