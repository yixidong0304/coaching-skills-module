/**
 * Page-level instructional takeaway — pale mint note, not a card/alert/CTA.
 */
export default function KeyIdea({ children, className = '' }) {
  return (
    <aside
      className={['key-idea', className].filter(Boolean).join(' ')}
      role="note"
      aria-label="Key idea"
    >
      <p className="key-idea__label m-0">Key idea</p>
      <div className="key-idea__text">{children}</div>
    </aside>
  )
}
