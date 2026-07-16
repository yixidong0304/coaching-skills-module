export default function Caption({ children, className = '' }) {
  return (
    <p
      className={['text-caption font-medium text-ink-soft m-0', className].join(
        ' ',
      )}
    >
      {children}
    </p>
  )
}
