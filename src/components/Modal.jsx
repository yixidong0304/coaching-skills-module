import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Reusable modal overlay: backdrop, Escape, focus trap, body scroll lock.
 * returnFocusRef (optional): element to restore focus to on close.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  returnFocusRef,
  className = '',
  closeLabel = 'Close',
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
    <div className="modal-root" role="presentation">
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={['modal-panel', className].filter(Boolean).join(' ')}
      >
        <button
          type="button"
          className="modal-close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>

        {title ? (
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
        ) : (
          <span id={titleId} className="sr-only">
            Dialog
          </span>
        )}

        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
