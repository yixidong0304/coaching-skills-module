import { CHOICE_LETTERS } from './ScenarioFeedbackPanel'
import DetailedAnswerPanel from './DetailedAnswerPanel'

/**
 * Secondary explanations after a correct answer.
 *
 * - compact: binary quizzes — “Why not B?” + one short line
 * - light-list: multi-option quizzes — plain divider list (Coach Sam / GROW / Real Situations)
 * - answer-panel: legacy structured DetailedAnswerPanel (unused in live flows)
 */
export default function AssessmentMissesPanel({
  choices = [],
  allChoices = [],
  labelChoices = true,
  variant = 'light-list',
  title,
  className = '',
}) {
  if (!choices.length) return null

  const isCompact = variant === 'compact'
  const isAnswerPanel = variant === 'answer-panel'
  const rootClass = ['guided-scenario__misses', className]
    .filter(Boolean)
    .join(' ')

  function letterFor(choice, index) {
    const sourceIndex = allChoices.findIndex((c) => c.id === choice.id)
    return (
      CHOICE_LETTERS[sourceIndex >= 0 ? sourceIndex : index] ?? String(index + 1)
    )
  }

  const resolvedTitle =
    title ??
    (isCompact && choices.length === 1
      ? `Why not ${letterFor(choices[0], 0)}?`
      : 'Why the others fall short')

  if (isCompact) {
    const choice = choices[0]
    const text = choice.missSummary ?? choice.feedback
    return (
      <div
        className={`${rootClass} guided-scenario__misses--compact`}
        role="note"
        aria-label={resolvedTitle}
      >
        <p className="guided-scenario__misses-title m-0">{resolvedTitle}</p>
        <p className="guided-scenario__misses-feedback m-0">{text}</p>
      </div>
    )
  }

  if (isAnswerPanel) {
    return (
      <DetailedAnswerPanel
        label={resolvedTitle}
        tone="feedback"
        role="note"
        className={['assessment-misses-panel', className]
          .filter(Boolean)
          .join(' ')}
      >
        <ul className="detailed-answer__items m-0 list-none p-0">
          {choices.map((choice, index) => {
            const label = letterFor(choice, index)
            const explanation = choice.missSummary ?? choice.feedback
            return (
              <li key={choice.id} className="detailed-answer__item">
                <p className="detailed-answer__item-title m-0">
                  {labelChoices ? `${label}. ${choice.text}` : choice.text}
                </p>
                <p className="detailed-answer__item-body m-0">{explanation}</p>
              </li>
            )
          })}
        </ul>
      </DetailedAnswerPanel>
    )
  }

  return (
    <div
      className={`${rootClass} guided-scenario__misses--light`}
      role="note"
      aria-label={resolvedTitle}
    >
      <p className="guided-scenario__misses-title m-0">{resolvedTitle}</p>
      <ul className="guided-scenario__misses-list m-0 list-none p-0">
        {choices.map((choice, index) => {
          const label = letterFor(choice, index)
          const explanation = choice.missSummary ?? choice.feedback
          return (
            <li key={choice.id} className="guided-scenario__misses-item">
              <p className="guided-scenario__misses-choice m-0">
                {labelChoices ? `${label}. ${choice.text}` : choice.text}
              </p>
              <p className="guided-scenario__misses-feedback m-0">
                {explanation}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
