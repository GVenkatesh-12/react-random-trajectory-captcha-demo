import type {
  DifficultyLevel,
  TrajectoryCurveType,
  BotSimulationMode,
  CaptchaTheme,
  CaptchaVerificationResult,
  CaptchaHandle,
} from 'react-random-trajectory-captcha'

export type {
  DifficultyLevel,
  TrajectoryCurveType,
  BotSimulationMode,
  CaptchaTheme,
  CaptchaVerificationResult,
  CaptchaHandle,
}

export interface VerificationAttempt extends CaptchaVerificationResult {
  id: string
  context: 'form-inline' | 'form-modal' | 'playground' | 'bot-test'
}
