import React, { useState } from 'react'
import type { CaptchaVerificationResult } from '../types'
import {
  ShieldCheck,
  ShieldAlert,
  Bot,
  UserCheck,
  Zap,
  Target,
  MousePointer,
  Clock,
  ChevronDown,
  ChevronUp,
  Activity,
} from 'lucide-react'

interface TelemetryDisplayProps {
  result: CaptchaVerificationResult | null
  title?: string
}

export const TelemetryDisplay: React.FC<TelemetryDisplayProps> = ({
  result,
  title = 'Real-Time Telemetry & Verification Analysis',
}) => {
  const [showJson, setShowJson] = useState(false)

  if (!result) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm text-center">
        <div className="mx-auto w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-500 mb-3">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="text-slate-300 font-semibold text-base mb-1">Awaiting Challenge Completion</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Intercept the moving trajectory target with your mouse, finger, or stylus (or run the Bot Solver) to view live biometric telemetry.
        </p>
      </div>
    )
  }

  const {
    success,
    spatialError,
    reactionTime,
    movementDistance,
    duration,
    pointerType,
    isLikelyBot,
    botConfidence,
    difficulty,
    trajectoryType,
  } = result

  // Bot confidence percentage
  const botPercent = Math.round(botConfidence * 100)

  // Color mapping based on bot score
  const getBotScoreColor = (score: number) => {
    if (score < 0.3) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    if (score < 0.7) return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  }

  const getProgressColor = (score: number) => {
    if (score < 0.3) return 'from-emerald-500 to-teal-400'
    if (score < 0.7) return 'from-amber-500 to-yellow-400'
    return 'from-rose-500 to-red-400'
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md shadow-xl transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              success
                ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30'
                : 'bg-rose-500/15 text-rose-400 ring-1 ring-rose-500/30'
            }`}
          >
            {success ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-lg">{title}</h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                  success
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {success ? 'Intercept Succeeded' : 'Intercept Failed'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Trajectory: <span className="text-purple-300 capitalize">{trajectoryType}</span> • Difficulty:{' '}
              <span className="text-purple-300 capitalize">{difficulty}</span>
            </p>
          </div>
        </div>

        {/* Bot Heuristic Badge */}
        <div
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border ${
            isLikelyBot
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}
        >
          {isLikelyBot ? (
            <>
              <Bot className="w-4 h-4 text-rose-400 animate-bounce" />
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold uppercase tracking-wider">Bot Detected</span>
                <span className="text-[10px] text-rose-400/80">Synthetic motion pattern</span>
              </div>
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div className="text-left leading-tight">
                <span className="block text-xs font-bold uppercase tracking-wider">Human Verified</span>
                <span className="text-[10px] text-emerald-400/80">Organic biometric jitter</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bot Confidence Bar */}
      <div className="mb-6 bg-slate-950/60 p-4 rounded-xl border border-slate-800/60">
        <div className="flex items-center justify-between text-xs font-medium mb-1.5">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            Bot Probability Confidence Score
          </span>
          <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs border ${getBotScoreColor(botConfidence)}`}>
            {botPercent}% ({botConfidence.toFixed(3)})
          </span>
        </div>
        <div className="h-2.5 w-full bg-slate-800/90 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
              botConfidence
            )} transition-all duration-700`}
            style={{ width: `${Math.max(4, Math.min(100, botPercent))}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
          <span>0% (Genuine Human)</span>
          <span>50% (Threshold)</span>
          <span>100% (Definite Bot)</span>
        </div>
      </div>

      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-950/60 border border-slate-800/60 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>Spatial Error</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {spatialError.toFixed(1)} <span className="text-xs font-normal text-slate-400">px</span>
          </div>
          <span className="text-[10px] text-slate-500">Center offset</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/60 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Reaction Time</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {reactionTime.toFixed(0)} <span className="text-xs font-normal text-slate-400">ms</span>
          </div>
          <span className="text-[10px] text-slate-500">Latency to interact</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/60 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pointer Travel</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {movementDistance.toFixed(0)} <span className="text-xs font-normal text-slate-400">px</span>
          </div>
          <span className="text-[10px] text-slate-500">Input: {pointerType}</span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/60 p-3.5 rounded-xl">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total Duration</span>
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {duration.toFixed(2)} <span className="text-xs font-normal text-slate-400">s</span>
          </div>
          <span className="text-[10px] text-slate-500">Time on flight path</span>
        </div>
      </div>

      {/* Raw Payload Inspector Toggle */}
      <div className="border-t border-slate-800/70 pt-3">
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="flex items-center justify-between w-full text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors py-1"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400/80"></span>
            Inspect Verification Payload JSON
          </span>
          {showJson ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showJson && (
          <pre className="mt-2.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto selection:bg-purple-900/60">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
