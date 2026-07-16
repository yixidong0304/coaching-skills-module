/**
 * Forest TAKEAWAY callout — inline card (not full-bleed breath).
 */
export default function TakeawayCallout({
  eyebrow = 'TAKEAWAY',
  children,
  className = '',
}) {
  return (
    <aside
      className={['takeaway-callout', className].filter(Boolean).join(' ')}
      aria-label={eyebrow}
    >
      <p className="takeaway-callout__eyebrow">{eyebrow}</p>
      <p className="takeaway-callout__text">{children}</p>
    </aside>
  )
}
