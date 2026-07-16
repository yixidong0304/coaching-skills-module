import Card from './Card'

/**
 * Shared multi-question prompt card (Match, Quick Check, similar activities).
 * Shows “N of TOTAL”, prompt text, and optional progress dots.
 */
export default function QuestionPromptCard({
  index = 0,
  total = 1,
  text,
  completedCount = 0,
  currentResolved = false,
  quote = false,
  className = '',
}) {
  const progressLabel = `${index + 1} of ${total}`
  const safeTotal = Math.max(1, total)

  return (
    <Card
      tone="mint"
      className={['question-prompt-card', className].filter(Boolean).join(' ')}
    >
      <div className="question-prompt-card__header">
        <p className="question-prompt-card__meta m-0">{progressLabel}:</p>
        <div
          className="question-prompt-card__dots"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={safeTotal}
          aria-valuenow={Math.min(completedCount, safeTotal)}
          aria-label={`${completedCount} of ${safeTotal} questions completed`}
        >
          {Array.from({ length: safeTotal }, (_, i) => (
            <span
              key={i}
              className={[
                'question-prompt-card__dot',
                i < completedCount ? 'is-filled' : '',
                i === index && !currentResolved ? 'is-current' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <p className="question-prompt-card__text m-0">
        {quote ? (
          <>
            &ldquo;{text}&rdquo;
          </>
        ) : (
          text
        )}
      </p>
    </Card>
  )
}
