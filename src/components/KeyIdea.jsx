/**
 * Page-level instructional takeaway — calm mint highlight for reading/reflection.
 * Not a progress/transition cue (see ActivityCallout).
 * Optional label overrides the default “Key idea” (e.g. Key decision).
 */
export default function KeyIdea({
  children,
  className = '',
  label = 'Key idea',
}) {
  return (
    <aside
      className={['key-idea', className].filter(Boolean).join(' ')}
      role="note"
      aria-label={label}
    >
      <p className="key-idea__label m-0">{label}</p>
      <div className="key-idea__text">{children}</div>
    </aside>
  )
}
