import React from 'react'
import type { VerificationAttempt } from '../types'
import { CheckCircle2, XCircle, Bot, Trash2, History, MousePointer, ShieldCheck } from 'lucide-react'

interface AttemptHistoryProps {
  attempts: VerificationAttempt[]
  onClear: () => void
  onSelectAttempt?: (attempt: VerificationAttempt) => void
}

export const AttemptHistory: React.FC<AttemptHistoryProps> = ({
  attempts,
  onClear,
  onSelectAttempt,
}) => {
  if (attempts.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm text-center">
        <div className="mx-auto w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 mb-2">
          <History className="w-5 h-5" />
        </div>
        <h4 className="text-slate-300 font-semibold text-sm">No Attempts Recorded Yet</h4>
        <p className="text-slate-500 text-xs mt-1">
          Every human interception and bot simulation will be logged here with timestamp and confidence metrics.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-purple-400" />
          <h4 className="font-bold text-slate-200 text-sm">Attempt History Log</h4>
          <span className="text-xs bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20 font-mono">
            {attempts.length} {attempts.length === 1 ? 'event' : 'events'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors px-2.5 py-1 rounded-lg hover:bg-rose-500/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Log
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-slate-950/60 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Type / Context</th>
              <th className="py-2.5 px-3">Bot Score</th>
              <th className="py-2.5 px-3">Spatial Err</th>
              <th className="py-2.5 px-3">Latency</th>
              <th className="py-2.5 px-3">Device</th>
              <th className="py-2.5 px-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {attempts.map((item) => {
              const date = new Date(item.timestamp)
              const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
              const botScore = Math.round(item.botConfidence * 100)

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectAttempt?.(item)}
                  className="hover:bg-purple-950/20 transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      {item.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span className={item.success ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                        {item.success ? 'PASS' : 'FAIL'}
                      </span>
                    </span>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-300">
                    <div className="flex items-center gap-1">
                      <span className="capitalize text-slate-200">{item.trajectoryType}</span>
                      <span className="text-[10px] text-slate-500">({item.context})</span>
                    </div>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        item.isLikelyBot
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                          : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      {item.isLikelyBot ? <Bot className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                      {botScore}%
                    </span>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                    {item.spatialError.toFixed(1)} px
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                    {item.reactionTime.toFixed(0)} ms
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                    <span className="flex items-center gap-1">
                      <MousePointer className="w-3 h-3 text-slate-500" />
                      {item.pointerType}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 text-[10px]">
                    {timeStr}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
