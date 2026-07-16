import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'

/**
 * OSCAR layout — letter centers evenly spaced with ~9% side margins.
 * Zones: top (O,C,R) / bottom (S,A). Middle band owns letters + words.
 */
export const OSCAR_LAYOUT = [
  {
    letter: { left: '17%', top: '48%', origin: 'center' },
    word: { left: '10%', top: '42%' },
    detail: { left: '12%' },
    zone: 'top',
    dot: 'var(--color-showcase-dot-1)',
  },
  {
    letter: { left: '34%', top: '52%', origin: 'center' },
    word: { left: '28%', top: '58%' },
    detail: { left: '28%' },
    zone: 'bottom',
    dot: 'var(--color-showcase-dot-2)',
  },
  {
    letter: { left: '50%', top: '48%', origin: 'center' },
    word: { left: '40%', top: '42%' },
    detail: { left: '44%' },
    zone: 'top',
    dot: 'var(--color-showcase-dot-3)',
  },
  {
    letter: { left: '66%', top: '52%', origin: 'center' },
    word: { left: '60%', top: '58%' },
    detail: { left: '60%' },
    zone: 'bottom',
    dot: 'var(--color-showcase-dot-4)',
  },
  {
    letter: { left: '83%', top: '48%', origin: 'center' },
    word: { left: '76%', top: '44%' },
    detail: { left: '78%' },
    zone: 'top',
    dot: 'var(--color-showcase-dot-5)',
  },
]

/**
 * GROW layout — letter centers evenly spaced with ~9% side margins.
 * Zones: top (G,O) / bottom (R,W).
 */
export const GROW_LAYOUT = [
  {
    letter: { left: '19%', top: '48%', origin: 'center' },
    word: { left: '12%', top: '42%' },
    detail: { left: '14%' },
    zone: 'top',
    dot: 'var(--color-showcase-dot-1)',
  },
  {
    letter: { left: '40%', top: '52%', origin: 'center' },
    word: { left: '33%', top: '58%' },
    detail: { left: '33%' },
    zone: 'bottom',
    dot: 'var(--color-showcase-dot-2)',
  },
  {
    letter: { left: '60%', top: '48%', origin: 'center' },
    word: { left: '52%', top: '42%' },
    detail: { left: '54%' },
    zone: 'top',
    dot: 'var(--color-showcase-dot-3)',
  },
  {
    letter: { left: '81%', top: '52%', origin: 'center' },
    word: { left: '70%', top: '58%' },
    detail: { left: '72%' },
    zone: 'bottom',
    dot: 'var(--color-showcase-dot-4)',
  },
]

function useMinShowcase() {
  const [wide, setWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(width >= 700px)')
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return wide
}

function parseInsetPx(stage) {
  const raw = getComputedStyle(stage)
    .getPropertyValue('--spacing-showcase-detail-inset')
    .trim()
  const parsed = Number.parseFloat(raw)
  if (Number.isNaN(parsed)) return 12
  if (raw.endsWith('rem')) {
    const root = Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    return parsed * (Number.isNaN(root) ? 16 : root)
  }
  return parsed
}

function DetailContent({ item }) {
  if (item.question) {
    return (
      <>
        <span className="framework-showcase__detail-question">
          {item.question}
        </span>
        {item.explanation ? (
          <span className="framework-showcase__detail-explanation">
            {item.explanation}
          </span>
        ) : null}
      </>
    )
  }
  return item.detail
}

/**
 * Detail block for one letter. Leader + dot stay at the letter’s intended
 * column. When wrapping text would clip the right edge, the row flips so the
 * text sits to the left of the dot and the leader stays over the letter.
 */
function DetailSlot({ layout, item, detailId, visible, stageRef }) {
  const slotRef = useRef(null)
  const [fittedLeft, setFittedLeft] = useState(layout.detail.left)
  const [flipped, setFlipped] = useState(false)

  const isTop = layout.zone === 'top'

  useLayoutEffect(() => {
    const stage = stageRef.current
    const slot = slotRef.current
    if (!stage || !slot) return

    const fit = () => {
      const stageWidth = stage.clientWidth
      const inset = parseInsetPx(stage)
      const intended =
        (Number.parseFloat(layout.detail.left) / 100) * stageWidth

      slot.classList.remove('is-flipped')
      slot.style.left = `${intended}px`
      const width = slot.offsetWidth
      const overflowsRight = intended + width > stageWidth - inset

      if (overflowsRight) {
        slot.classList.add('is-flipped')
        const flippedWidth = slot.offsetWidth
        const next = Math.max(inset, intended - flippedWidth + 8)
        slot.style.left = `${next}px`
        setFittedLeft(`${next}px`)
        setFlipped(true)
      } else {
        setFittedLeft(`${intended}px`)
        setFlipped(false)
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [layout.detail.left, item, stageRef])

  const revealClass = [
    'framework-showcase__detail',
    visible ? 'is-visible' : '',
  ].join(' ')

  const slotStyle = {
    left: fittedLeft,
    ...(isTop
      ? {
          top: 'var(--showcase-band-top-start)',
          height: 'var(--showcase-band-top-height)',
        }
      : {
          top: 'var(--showcase-band-bottom-start)',
          height: 'var(--showcase-band-bottom-height)',
        }),
  }

  const row = (
    <div className="framework-showcase__detail-row">
      <span
        className="framework-showcase__dot"
        aria-hidden="true"
        style={layout.dot ? { backgroundColor: layout.dot } : undefined}
      />
      <div id={detailId} role="note" className="framework-showcase__detail-text">
        <DetailContent item={item} />
      </div>
    </div>
  )

  return (
    <div
      ref={slotRef}
      className={[
        'framework-showcase__detail-slot',
        isTop
          ? 'framework-showcase__detail-slot--top'
          : 'framework-showcase__detail-slot--bottom',
        flipped ? 'is-flipped' : '',
        revealClass,
      ].join(' ')}
      style={slotStyle}
    >
      {isTop ? (
        <>
          {row}
          <div className="framework-showcase__leader" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="framework-showcase__leader" aria-hidden="true" />
          {row}
        </>
      )}
    </div>
  )
}

/**
 * Watermark framework panel (OSCAR / GROW).
 *
 * Three vertical bands: top details · middle letters/words · bottom details.
 * items[]: { letter, word, detail? } or { letter, word, question, explanation }
 */
export default function FrameworkShowcase({
  items = [],
  layout = OSCAR_LAYOUT,
  className = '',
  ariaLabel = 'Framework letters',
}) {
  const baseId = useId()
  const stageRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(null)
  const isWide = useMinShowcase()

  const activate = (index) => setActiveIndex(index)
  const deactivate = () => setActiveIndex(null)
  const toggle = (index) =>
    setActiveIndex((current) => (current === index ? null : index))

  if (!isWide) {
    const activeItem =
      activeIndex === null ? null : (items[activeIndex] ?? null)
    const activePos =
      activeIndex === null ? null : (layout[activeIndex] ?? null)
    const mobileDetailId = `${baseId}-mobile-detail`

    return (
      <div
        className={['framework-showcase__mobile', className]
          .filter(Boolean)
          .join(' ')}
        aria-label={ariaLabel}
      >
        <div className="framework-showcase__acronym" role="list">
          {items.map((item, index) => {
            const isActive = activeIndex === index
            const hasActive = activeIndex !== null

            return (
              <button
                key={`${item.letter}-${index}`}
                type="button"
                role="listitem"
                aria-expanded={isActive}
                aria-controls={mobileDetailId}
                aria-label={`${item.letter}: ${item.word}`}
                onClick={() => toggle(index)}
                className={[
                  'framework-showcase__letter-btn',
                  'framework-showcase__acronym-btn',
                  isActive ? 'is-active' : '',
                  hasActive && !isActive ? 'is-dimmed' : '',
                ].join(' ')}
              >
                <span className="framework-showcase__letter">{item.letter}</span>
                <span
                  className={[
                    'framework-showcase__word',
                    isActive ? 'is-active' : '',
                  ].join(' ')}
                >
                  {item.word}
                </span>
              </button>
            )
          })}
        </div>

        <div
          id={mobileDetailId}
          className={[
            'framework-showcase__mobile-panel',
            activeItem ? 'is-visible' : '',
          ].join(' ')}
          aria-live="polite"
        >
          {activeItem ? (
            <div className="framework-showcase__detail-row">
              <span
                className="framework-showcase__dot"
                aria-hidden="true"
                style={
                  activePos?.dot
                    ? { backgroundColor: activePos.dot }
                    : undefined
                }
              />
              <div role="note" className="framework-showcase__detail-text">
                <DetailContent item={activeItem} />
              </div>
            </div>
          ) : (
            <p className="framework-showcase__mobile-hint m-0">
              Tap a letter to see what it means.
            </p>
          )}
        </div>
      </div>
    )
  }

  const hasActive = activeIndex !== null

  return (
    <div
      ref={stageRef}
      className={[
        'framework-showcase__stage',
        hasActive ? 'has-active' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const pos = layout[index] ?? OSCAR_LAYOUT[index]
        if (!pos) return null

        const isActive = activeIndex === index
        const detailId = `${baseId}-detail-${index}`
        const centered = pos.letter.origin === 'center'

        return (
          <div key={`${item.letter}-${index}`} role="listitem">
            <button
              type="button"
              aria-expanded={isActive}
              aria-controls={detailId}
              aria-label={`${item.letter}: ${item.word}`}
              onMouseEnter={() => activate(index)}
              onMouseLeave={deactivate}
              onFocus={() => activate(index)}
              onBlur={deactivate}
              onClick={() => toggle(index)}
              className={[
                'framework-showcase__letter-btn',
                centered ? 'is-centered' : '',
                isActive ? 'is-active' : '',
                hasActive && !isActive ? 'is-dimmed' : '',
              ].join(' ')}
              style={{ left: pos.letter.left, top: pos.letter.top }}
            >
              <span className="framework-showcase__letter">{item.letter}</span>
            </button>

            <span
              className={[
                'framework-showcase__word',
                isActive ? 'is-active' : '',
                hasActive && !isActive ? 'is-dimmed' : '',
              ].join(' ')}
              style={{ left: pos.word.left, top: pos.word.top }}
            >
              {item.word}
            </span>

            <DetailSlot
              layout={pos}
              item={item}
              detailId={detailId}
              visible={isActive}
              stageRef={stageRef}
            />
          </div>
        )
      })}
    </div>
  )
}
