import { forwardRef } from 'react'

/**
 * Shared course card shell.
 *
 * tone (only when interaction="none"):
 * - "default" → white + neutral border
 * - "mint" / "mint-tint" → pale mint surface
 *
 * interaction:
 * - "informational" — Family 1A static info (restrained visual hover, cursor:default)
 * - "interactive" — Family 1B clickable (stronger hover + focus-visible)
 * - "none" — page-owned shell (card--static). No base hover; page variants own it.
 *
 * Exclusions (never route through family hover):
 * - KeyIdea / KeyDecision
 * - Scenario cards (class card--scenario, .scenario-context, .real-situations__pick)
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
  const useInteraction =
    interaction === 'informational' || interaction === 'interactive'

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
        : 'card--static'

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
