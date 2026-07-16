const stateClasses = {
  idle: 'choice-option--idle',
  selected: 'choice-option--selected',
  correct: 'choice-option--correct',
  partial: 'choice-option--partial',
  incorrect: 'choice-option--incorrect',
}

/**
 * Shared assessment answer option.
 * Light surfaces only — correctness is border + connected feedback, never dark fill.
 */
export default function ChoiceOption({
  children,
  state = 'idle',
  onClick,
  disabled = false,
  lockState = true,
  className = '',
  ...rest
}) {
  const stateLocks =
    lockState &&
    (state === 'correct' || state === 'incorrect' || state === 'partial')

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || stateLocks}
      className={[
        'choice-option',
        stateClasses[state] ?? stateClasses.idle,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
