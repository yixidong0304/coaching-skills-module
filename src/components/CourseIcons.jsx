/**
 * Shared line icons for intro / wrap-up visual language.
 * Stroke inherits currentColor; size via className or width/height.
 */
function IconShell({ children, className = '', size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={['course-icon', className].filter(Boolean).join(' ')}
    >
      {children}
    </svg>
  )
}

const stroke = {
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

/** Two speech bubbles — coaching conversation */
export function IconConversation({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path d="M4.5 15.5V7.5A2 2 0 0 1 6.5 5.5h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8.5l-4 3v-2Z" {...stroke} />
      <path d="M14 9.5h3.5a2 2 0 0 1 2 2v5l-3 2v-2H14" {...stroke} />
    </IconShell>
  )
}

/** Message + mark — feedback / OSCAR */
export function IconFeedback({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H10l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5Z" {...stroke} />
      <path d="M8 11.5h8M8 14h5" {...stroke} />
    </IconShell>
  )
}

/** Magnifier — clarity / OSCAR observation */
export function IconMagnifier({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <circle cx="10.5" cy="10.5" r="5.75" {...stroke} />
      <path d="m15.2 15.2 4.3 4.3" {...stroke} />
    </IconShell>
  )
}

/** Star — key takeaways */
export function IconStar({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path
        d="m12 3.5 2.2 4.7 5.2.6-3.9 3.5 1.1 5.1L12 15.4 7.4 17.4l1.1-5.1-3.9-3.5 5.2-.6L12 3.5Z"
        {...stroke}
      />
    </IconShell>
  )
}

/** Target — action plan */
export function IconTarget({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <circle cx="12" cy="12" r="8.25" {...stroke} />
      <circle cx="12" cy="12" r="4.5" {...stroke} />
      <circle cx="12" cy="12" r="1.35" fill="currentColor" stroke="none" />
    </IconShell>
  )
}

/** Ear / listening */
export function IconListening({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path
        d="M9 8.5a3.5 3.5 0 0 1 7 0c0 2.2-1.5 3-1.5 5.5M12.5 18.5v.5a2 2 0 0 1-2 2"
        {...stroke}
      />
      <path d="M10.5 11.5c0 1.5-.5 2.5-.5 4" {...stroke} />
    </IconShell>
  )
}

/** Sprout — GROW / growth */
export function IconGrowth({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path d="M12 20.5V11" {...stroke} />
      <path d="M12 14.5c-3.5 0-5.5-2.2-5.5-5.5 3.5 0 5.5 2.2 5.5 5.5Z" {...stroke} />
      <path d="M12 12.5c3.2 0 5-1.8 5-4.8-3.2 0-5 1.8-5 4.8Z" {...stroke} />
    </IconShell>
  )
}

/** Fork / balance — coach vs direct */
export function IconBalance({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path d="M12 4.5v6" {...stroke} />
      <path d="M12 10.5 6.5 16.5M12 10.5l5.5 6" {...stroke} />
      <path d="M4.5 16.5h4M15.5 16.5h4" {...stroke} />
    </IconShell>
  )
}

/** Question mark in circle — powerful questions */
export function IconQuestion({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <circle cx="12" cy="12" r="8.25" {...stroke} />
      <path d="M9.8 9.6a2.4 2.4 0 1 1 3.5 2.1c-.7.4-1.3.9-1.3 1.8" {...stroke} />
      <path d="M12 16.6h.01" {...stroke} />
    </IconShell>
  )
}

/** Compass / paths — apply the right approach */
export function IconCompass({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <circle cx="12" cy="12" r="8.25" {...stroke} />
      <path d="m14.8 9.2-1.6 5.4-5.4 1.6 1.6-5.4 5.4-1.6Z" {...stroke} />
    </IconShell>
  )
}

/** Check — takeaway / complete */
export function IconCheck({ className, size }) {
  return (
    <IconShell className={className} size={size}>
      <path d="M5.5 12.5 10 17l8.5-9.5" {...stroke} />
    </IconShell>
  )
}
