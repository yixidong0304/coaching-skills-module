export default function RevealTile({
  label,
  children,
  revealed = false,
  onReveal,
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!revealed) onReveal?.()
      }}
      aria-expanded={revealed}
      className={[
        'w-full text-left rounded-card border border-transparent p-5 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
        revealed
          ? 'bg-canvas border-line shadow-soft cursor-default'
          : 'bg-mint-tint hover:shadow-soft cursor-pointer',
      ].join(' ')}
    >
      <span className="block text-h2 font-semibold text-ink">{label}</span>
      {revealed ? (
        <div className="mt-3 text-body text-ink">{children}</div>
      ) : (
        <span className="mt-2 block text-caption text-ink-soft">
          Click to reveal
        </span>
      )}
    </button>
  )
}
