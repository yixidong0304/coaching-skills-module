import { useEffect, useState } from 'react'
import { useCourse } from '../context/CourseContext'
import { markEnterFromDivider } from '../lib/dividerTransition'

/**
 * Full-bleed forest chapter-divider / breath screen.
 * Props: eyebrow?, statement?, statements?, body?, previews?, attribution?,
 * bridgeLine?, immersiveNav?, children?, ariaLabel?
 *
 * When immersiveNav is true, BottomNav should be hidden (courseData.hideBottomNav)
 * and floating ← / → (same as p1-0) drive course back/next, with leave-swipe on →.
 */
export default function BreathScreen({
  eyebrow,
  statement,
  statements,
  body,
  previews,
  attribution,
  bridgeLine,
  immersiveNav = false,
  children,
  ariaLabel = 'Pause and reflect',
}) {
  const { next, back, isFirst, isLast, nextLocked } = useCourse()
  const [leaving, setLeaving] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  let nextEnter = 1
  const enter = () => `breath-screen__enter-${Math.min(nextEnter++, 4)}`

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!leaving) return undefined
    const duration = reduceMotion ? 0 : 480
    const id = window.setTimeout(() => {
      markEnterFromDivider()
      next()
    }, duration)
    return () => window.clearTimeout(id)
  }, [leaving, reduceMotion, next])

  const lines = Array.isArray(statements)
    ? statements
    : statement
      ? [statement]
      : []

  const previewList = Array.isArray(previews) ? previews : []
  const canGoBack = immersiveNav && !isFirst && !leaving
  const canGoForward = immersiveNav && !isLast && !nextLocked && !leaving

  function goForward() {
    if (!canGoForward) return
    setLeaving(true)
  }

  return (
    <section
      className={[
        'breath-screen',
        immersiveNav ? 'breath-screen--immersive' : '',
        leaving ? 'is-leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
    >
      {immersiveNav ? (
        <>
          <button
            type="button"
            className={[
              'not-extra__nav',
              'not-extra__nav--back',
              !canGoBack ? 'is-disabled' : '',
            ].join(' ')}
            aria-label="Go back"
            disabled={!canGoBack}
            onClick={() => back()}
          >
            <span aria-hidden="true">←</span>
          </button>

          <button
            type="button"
            className={[
              'not-extra__nav',
              'not-extra__nav--forward',
              !canGoForward ? 'is-busy' : '',
            ].join(' ')}
            aria-label="Continue"
            disabled={!canGoForward}
            onClick={goForward}
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : null}

      <div className="breath-screen__content">
        {eyebrow ? (
          <p className={['breath-screen__eyebrow', enter()].join(' ')}>
            {eyebrow}
          </p>
        ) : null}

        {lines.map((line, index) => (
          <p
            key={line}
            className={[
              'breath-screen__statement',
              index > 0 ? 'breath-screen__statement--spaced' : '',
              enter(),
            ].join(' ')}
          >
            {line}
          </p>
        ))}

        {body ? (
          <p className={['breath-screen__body', enter()].join(' ')}>{body}</p>
        ) : null}

        {previewList.length > 0 ? (
          <ul
            className={['breath-screen__previews', enter()].join(' ')}
            aria-label="What's ahead"
          >
            {previewList.map((item) => (
              <li key={item.heading} className="breath-screen__preview">
                <p className="breath-screen__preview-heading m-0">
                  {item.heading}
                </p>
                <p className="breath-screen__preview-body m-0">{item.body}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {attribution ? (
          <p className={['breath-screen__attribution', enter()].join(' ')}>
            {attribution}
          </p>
        ) : null}

        {bridgeLine ? (
          <p className={['breath-screen__bridge', enter()].join(' ')}>
            {bridgeLine}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  )
}

BreathScreen.fullBleed = true
