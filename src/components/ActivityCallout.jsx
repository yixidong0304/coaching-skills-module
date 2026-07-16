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
  'part-complete': {
    label: 'Part 3 complete',
    ariaLabel: 'Part 3 complete',
  },
}

/**
 * Momentum / transition callout — completion, next step, next skill, part complete.
 * Default: completed informational card. Hover: forest left accent + lift
 * (“ready to continue”) — not clickable, no decorative arrow.
 */
export default function ActivityCallout({
  variant = 'complete',
  children,
  className = '',
}) {
  const meta = VARIANTS[variant] ?? VARIANTS.complete

  return (
    <aside
      className={[
        'activity-callout',
        `activity-callout--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={meta.ariaLabel}
    >
      <p className="activity-callout__label m-0">{meta.label}</p>
      <div className="activity-callout__text">{children}</div>
    </aside>
  )
}
