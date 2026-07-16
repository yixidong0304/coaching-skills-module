import { CHOICE_LETTERS } from './ScenarioFeedbackPanel'

/**
 * Secondary explanations after a correct answer.
 * Variants stay visually lighter than primary attached feedback — no card chrome.
 *
 * - compact: binary quizzes — “Why not B?” + one short line
 * - light-list: scenario quizzes — “Why the others fall short” + A/B lines
 */
export default function AssessmentMissesPanel({
  choices = [],
  allChoices = [],
  labelChoices = true,
  variant = 'light-list',
  title,
}) {
  if (!choices.length) return null

  const isCompact = variant === 'compact'

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
        className="guided-scenario__misses guided-scenario__misses--compact"
        role="note"
        aria-label={resolvedTitle}
      >
        <p className="guided-scenario__misses-title m-0">{resolvedTitle}</p>
        <p className="guided-scenario__misses-feedback m-0">{text}</p>
      </div>
    )
  }

  return (
    <div
      className="guided-scenario__misses guided-scenario__misses--light"
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
