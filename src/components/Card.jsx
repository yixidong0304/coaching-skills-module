import { forwardRef } from 'react'

/**
 * tone="mint" / "mint-tint" → pale mint (--color-mint-tint).
 * Saturated --color-mint is reserved for non-Card accents (e.g. SVG panels).
 *
 * interaction:
 * - "informational" — passive read cards (pale hover only; not focusable)
 * - "interactive" — clickable exploration (pale hover; light open/selected via aria-expanded; forest fill only for card--selected)
 * - "none" — no built-in hover treatment
 */
const Card = forwardRef(function Card(
  {
    children,
    tone = 'default',
    interaction = 'none',
    className = '',
    ...rest
  },
  ref,
) {
  const useInteraction = interaction === 'informational' || interaction === 'interactive'

  const toneClass = useInteraction
    ? ''
    : tone === 'mint' || tone === 'mint-tint'
      ? 'bg-mint-tint border-transparent'
      : 'bg-canvas border-line'

  const interactionClass =
    interaction === 'informational'
      ? 'card--informational'
      : interaction === 'interactive'
        ? 'card--interactive'
        : ''

  return (
    <div
      ref={ref}
      className={[
        'rounded-card border p-6 shadow-soft',
        toneClass,
        interactionClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
})

export default Card
