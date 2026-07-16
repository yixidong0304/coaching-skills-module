const variants = {
  success: {
    wrap: 'feedback-banner--success',
    icon: '✓',
    label: 'Correct — Continue',
  },
  partial: {
    wrap: 'feedback-banner--partial',
    icon: '→',
    label: 'Close — Try again',
  },
  error: {
    wrap: 'feedback-banner--error',
    icon: '✕',
    label: 'Incorrect — Try again',
  },
}

/**
 * Standalone feedback banner (legacy / gallery).
 * Prefer InlineOutcomeFeedback when attached under a ChoiceOption.
 */
export default function FeedbackBanner({ variant = 'success', message }) {
  const config = variants[variant] ?? variants.success

  return (
    <div
      role="status"
      className={['feedback-banner', config.wrap].join(' ')}
    >
      <span className="feedback-banner__icon" aria-hidden="true">
        {config.icon}
      </span>
      <div>
        <p className="feedback-banner__label m-0">{config.label}</p>
        <p className="feedback-banner__message m-0">{message}</p>
      </div>
    </div>
  )
}
