import { OUTCOME_LABELS } from '../data/assessmentFeedback'

const OUTCOME_META = {
  correct: {
    label: OUTCOME_LABELS.correct.text,
    className: 'is-correct',
  },
  partial: {
    label: OUTCOME_LABELS.partial.text,
    className: 'is-partial',
  },
  incorrect: {
    label: OUTCOME_LABELS.incorrect.text,
    className: 'is-incorrect',
  },
}

const CHOICE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Dedicated feedback panel for guided practice.
 * mode 'single': one selected wrong/partial explanation + try-again cue
 * mode 'full': every option with its authored feedback (correct reveal / review)
 */
export default function ScenarioFeedbackPanel({
  mode = 'single',
  choices = [],
  selectedId = null,
  tryAgainCue = 'Try again. Pick another option.',
}) {
  if (mode === 'full') {
    return (
      <div
        className="scenario-feedback-panel scenario-feedback-panel--full"
        role="region"
        aria-label="Answer explanations"
      >
        <ul className="scenario-feedback-panel__list">
          {choices.map((choice, index) => {
            const meta = OUTCOME_META[choice.outcome] ?? OUTCOME_META.incorrect
            const letter = CHOICE_LETTERS[index] ?? String(index + 1)

            return (
              <li
                key={choice.id}
                className={[
                  'scenario-feedback-panel__item',
                  meta.className,
                ].join(' ')}
              >
                <p className="scenario-feedback-panel__heading">
                  {letter}: {meta.label}
                </p>
                <p className="scenario-feedback-panel__body">{choice.feedback}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const selected = choices.find((c) => c.id === selectedId)
  if (!selected) return null

  const index = choices.findIndex((c) => c.id === selectedId)
  const letter = CHOICE_LETTERS[index] ?? '?'
  const meta = OUTCOME_META[selected.outcome] ?? OUTCOME_META.incorrect

  return (
    <div
      className={[
        'scenario-feedback-panel scenario-feedback-panel--single',
        meta.className,
      ].join(' ')}
      role="status"
    >
      <p className="scenario-feedback-panel__heading">
        {letter}: {meta.label}:
      </p>
      <p className="scenario-feedback-panel__body">{selected.feedback}</p>
      {tryAgainCue ? (
        <p className="scenario-feedback-panel__cue">{tryAgainCue}</p>
      ) : null}
    </div>
  )
}

export { CHOICE_LETTERS, OUTCOME_META }
