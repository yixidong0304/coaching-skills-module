export default function ProgressBar({ value = 0, className = '' }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={['h-1.5 w-full overflow-hidden rounded-full bg-line', className].join(
        ' ',
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-forest transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
