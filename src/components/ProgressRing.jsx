/**
 * Compact circular progress for the collapsed sidebar rail.
 * CSS donut — no SVG fill/filter/shadow artifacts.
 */
export default function ProgressRing({ value = 0 }) {
  const clamped = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div
      className="progress-ring"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${clamped}% complete`}
    >
      <div
        className="progress-ring__circle"
        style={{ '--progress-ring-value': `${clamped}%` }}
        aria-hidden="true"
      />
      <span className="progress-ring__label">{clamped}%</span>
    </div>
  )
}
