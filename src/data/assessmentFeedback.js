/**
 * Shared assessment outcome mapping + labels for quizzes and guided scenarios.
 * Labels include icons so state is not color-only.
 */

export const OUTCOME_TO_CHOICE = {
  correct: 'correct',
  partial: 'partial',
  incorrect: 'incorrect',
}

export const OUTCOME_TO_BANNER = {
  correct: 'success',
  partial: 'partial',
  incorrect: 'error',
}

/** Visible outcome labels (CSS uppercases via letter-spacing treatment). */
export const OUTCOME_LABELS = {
  correct: { icon: '✓', text: 'Correct — Continue' },
  partial: { icon: '→', text: 'Close — Try again' },
  incorrect: { icon: '✕', text: 'Incorrect — Try again' },
}
