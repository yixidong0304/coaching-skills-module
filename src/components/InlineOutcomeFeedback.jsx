import { OUTCOME_LABELS, OUTCOME_TO_CHOICE } from '../data/assessmentFeedback'

/**
 * Connected outcome panel under a selected ChoiceOption.
 * Pale fill + colored label; dark body text for readability.
 */
export default function InlineOutcomeFeedback({
  outcome = 'incorrect',
  message,
  open = false,
  revealAll = false,
  staggerIndex,
  panelRef,
  isFocusTarget = false,
}) {
  const outcomeClass = OUTCOME_TO_CHOICE[outcome] ?? 'incorrect'
  const meta = OUTCOME_LABELS[outcome] ?? OUTCOME_LABELS.incorrect

  return (
    <div
      className={[
        'guided-scenario__inline-feedback',
        `is-${outcomeClass}`,
        open ? 'is-open' : '',
        revealAll ? 'is-reveal-all' : '',
      ].join(' ')}
      style={
        revealAll && staggerIndex != null
          ? { '--feedback-stagger': String(staggerIndex) }
          : undefined
      }
    >
      <div className="guided-scenario__inline-feedback-inner">
        <div
          className="guided-scenario__inline-feedback-panel"
          ref={isFocusTarget ? panelRef : undefined}
          tabIndex={isFocusTarget ? -1 : undefined}
          role={open ? 'status' : undefined}
          aria-live={open ? 'polite' : undefined}
        >
          <p className="guided-scenario__inline-feedback-label">
            <span aria-hidden="true">{meta.icon}</span>
            <span>{meta.text}</span>
          </p>
          <p className="guided-scenario__inline-feedback-text">{message}</p>
        </div>
      </div>
    </div>
  )
}
