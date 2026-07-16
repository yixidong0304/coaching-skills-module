export default function FrameworkLetters({
  letters = [],
  activeIndex = 0,
  onSelect,
  onHover,
}) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      role="tablist"
      aria-label="Framework letters"
    >
      {letters.map((letter, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={`${letter}-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect?.(index)}
            onMouseEnter={() => onHover?.(index)}
            onFocus={() => onHover?.(index)}
            className={[
              'framework-letters__letter text-display font-bold tracking-tighter leading-none rounded-button px-1',
              'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest',
              isActive ? 'is-active' : '',
            ].join(' ')}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}
