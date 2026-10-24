import type { BacklogComplexity } from '~/types/backlog'

const COMPLEXITY_TONES = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const satisfies Record<BacklogComplexity, string>

/**
 * Maps a backlog complexity to a badge tone.
 */
export function complexityTone(complexity: BacklogComplexity) {
  return COMPLEXITY_TONES[complexity]
}
