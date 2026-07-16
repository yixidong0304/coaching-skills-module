const VARIANTS = {
  complete: {
    label: 'Activity complete',
    ariaLabel: 'Activity complete',
  },
  'next-step': {
    label: 'Next step',
    ariaLabel: 'Next step',
  },
  'next-skill': {
    label: 'Next skill',
    ariaLabel: 'Next skill',
  },
}

/**
 * Labeled pale-green callout for assessment completion / transitions.
 * Same visual family as Key Idea / Coaching Move; distinct semantic label.
 */
export default function ActivityCallout({
  variant = 'complete',
  children,
  className = '',
}) {
  const meta = VARIANTS[variant] ?? VARIANTS.complete

  return (
    <aside
      className={['activity-callout', className].filter(Boolean).join(' ')}
      role="status"
      aria-label={meta.ariaLabel}
    >
      <p className="activity-callout__label m-0">{meta.label}</p>
      <div className="activity-callout__text">{children}</div>
    </aside>
  )
}
