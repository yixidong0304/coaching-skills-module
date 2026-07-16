export default function Caption({ children, className = '' }) {
  return (
    <p
      className={[
        'screen-caption',
        'text-caption',
        'font-medium',
        'text-ink-soft',
        'm-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  )
}
