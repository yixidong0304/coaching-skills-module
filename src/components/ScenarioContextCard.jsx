/**
 * Scenario context for in-activity practice — information to use, not a header.
 * Hierarchy: small eyebrow → optional secondary title → dominant readable body.
 * Shared by Real Situations, Coach Sam, and GROW in action.
 */
export default function ScenarioContextCard({
  title,
  children,
  className = '',
  eyebrow = 'Scenario',
}) {
  const ariaLabel = title ? `${eyebrow}: ${title}` : eyebrow

  return (
    <aside
      className={['scenario-context', className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
    >
      <p className="scenario-context__eyebrow m-0">{eyebrow}</p>
      {title ? <p className="scenario-context__title m-0">{title}</p> : null}
      <div className="scenario-context__body">{children}</div>
    </aside>
  )
}
