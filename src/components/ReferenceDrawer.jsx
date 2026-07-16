import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Right slide-in reference drawer.
 * Backdrop click, Escape, and X close; focus trap + restore like Modal.
 *
 * Props: open, onClose, title?, children, returnFocusRef?
 */
export default function ReferenceDrawer({
  open,
  onClose,
  title = 'Reference',
  children,
  returnFocusRef,
}) {
  const titleId = useId()
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    previouslyFocused.current =
      returnFocusRef?.current ?? document.activeElement

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const panel = panelRef.current
    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll(FOCUSABLE)) : []

    const first = focusables()[0]
    first?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const items = focusables()
      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const firstEl = items[0]
      const lastEl = items[items.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [open, onClose, returnFocusRef])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="reference-drawer" role="presentation">
      <button
        type="button"
        className="reference-drawer__backdrop"
        aria-label="Close cheat sheet"
        tabIndex={-1}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="reference-drawer__panel"
      >
        <header className="reference-drawer__header">
          <h2 id={titleId} className="reference-drawer__title">
            {title}
          </h2>
          <button
            type="button"
            className="reference-drawer__close"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="reference-drawer__body">{children}</div>
      </aside>
    </div>,
    document.body,
  )
}
