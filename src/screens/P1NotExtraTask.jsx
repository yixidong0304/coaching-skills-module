import { useEffect, useId, useState } from 'react'
import { useCourse } from '../context/CourseContext'
import { markEnterFromDivider } from '../lib/dividerTransition'

/** Worry phrases placed in a wide ring around the title (%, orbit box). */
const WORRIES = [
  { text: 'another meeting?', left: '6%', top: '3%', rotate: '-8deg' },
  { text: 'no time', left: '40%', top: '0%', rotate: '4deg' },
  { text: 'one more framework?', left: '70%', top: '4%', rotate: '7deg' },
  { text: 'on top of everything', left: '0%', top: '24%', rotate: '-5deg' },
  { text: 'who needs this?', left: '78%', top: '22%', rotate: '6deg' },
  { text: 'I already manage', left: '1%', top: '48%', rotate: '5deg' },
  { text: 'another 1:1?', left: '80%', top: '46%', rotate: '-4deg' },
  { text: 'too much already', left: '0%', top: '70%', rotate: '-6deg' },
  { text: 'more work', left: '28%', top: '84%', rotate: '3deg' },
  { text: 'not another task', left: '54%', top: '82%', rotate: '-3deg' },
  { text: 'extra prep?', left: '76%', top: '72%', rotate: '5deg' },
]

/**
 * p1-0 — Immersive hook with side ← / → and reverse.
 */
function P1NotExtraTask() {
  const { completedIds, currentId, next, markComplete } = useCourse()
  const alreadySeen = completedIds.has(currentId)
  const [phase, setPhase] = useState(alreadySeen ? 'resolve' : 'wonder')
  const [reduceMotion, setReduceMotion] = useState(false)
  const [questionReady, setQuestionReady] = useState(alreadySeen)
  const [scatterIn, setScatterIn] = useState(false)
  const headingId = useId()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (phase !== 'wonder') return undefined

    setQuestionReady(false)
    setScatterIn(false)

    const qDelay = reduceMotion ? 0 : 80
    const sDelay = reduceMotion ? 60 : 780
    const qId = window.setTimeout(() => setQuestionReady(true), qDelay)
    const sId = window.setTimeout(() => setScatterIn(true), sDelay)
    return () => {
      window.clearTimeout(qId)
      window.clearTimeout(sId)
    }
  }, [phase, reduceMotion])

  useEffect(() => {
    if (phase !== 'slash') return undefined
    const duration = reduceMotion ? 0 : 700
    const id = window.setTimeout(() => setPhase('neq'), duration)
    return () => window.clearTimeout(id)
  }, [phase, reduceMotion])

  useEffect(() => {
    if (phase !== 'resolveOut') return undefined
    const duration = reduceMotion ? 0 : 380
    const id = window.setTimeout(() => setPhase('resolve'), duration)
    return () => window.clearTimeout(id)
  }, [phase, reduceMotion])

  useEffect(() => {
    if (phase !== 'leaving') return undefined
    const duration = reduceMotion ? 0 : 480
    const id = window.setTimeout(() => {
      markEnterFromDivider()
      next()
    }, duration)
    return () => window.clearTimeout(id)
  }, [phase, reduceMotion, next])

  useEffect(() => {
    if (phase === 'resolve') markComplete(currentId)
  }, [phase, markComplete, currentId])

  function goForward() {
    if (phase === 'wonder') {
      setScatterIn(false)
      setPhase('equation')
      return
    }
    if (phase === 'equation') {
      setPhase(reduceMotion ? 'neq' : 'slash')
      return
    }
    if (phase === 'slash' || phase === 'resolveOut' || phase === 'leaving') {
      return
    }
    if (phase === 'neq') {
      setPhase(reduceMotion ? 'resolve' : 'resolveOut')
      return
    }
    if (phase === 'resolve') {
      setPhase('leaving')
    }
  }

  function goBack() {
    if (phase === 'leaving' || phase === 'resolveOut') return
    if (phase === 'slash') {
      setPhase('equation')
      return
    }
    if (phase === 'resolve') {
      setPhase('neq')
      return
    }
    if (phase === 'neq') {
      setPhase('equation')
      return
    }
    if (phase === 'equation') {
      setPhase('wonder')
    }
  }

  const showScatter = phase === 'wonder' && scatterIn
  const showEquation =
    phase === 'equation' ||
    phase === 'slash' ||
    phase === 'neq' ||
    phase === 'resolveOut'
  const showResolve = phase === 'resolve' || phase === 'leaving'
  const canGoBack =
    phase !== 'wonder' && phase !== 'leaving' && phase !== 'resolveOut'
  const canGoForward =
    phase !== 'slash' && phase !== 'resolveOut' && phase !== 'leaving'
  const forwardLabel =
    phase === 'resolve' ? 'Continue to next screen' : 'Continue'

  return (
    <section
      className={[
        'breath-screen',
        'not-extra',
        phase === 'leaving' ? 'is-leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-labelledby={headingId}
    >
      <h1 id={headingId} className="sr-only">
        Coaching is not an extra task
      </h1>

      <button
        type="button"
        className={[
          'not-extra__nav',
          'not-extra__nav--back',
          !canGoBack ? 'is-disabled' : '',
        ].join(' ')}
        aria-label="Go back"
        disabled={!canGoBack}
        onClick={goBack}
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
        aria-label={forwardLabel}
        disabled={!canGoForward}
        onClick={goForward}
      >
        <span aria-hidden="true">→</span>
      </button>

      <div className="not-extra__stage" aria-live="polite">
        {phase === 'wonder' ? (
          <div className="not-extra__wonder">
            <div className="not-extra__orbit" aria-hidden={!showScatter}>
              {WORRIES.map((item, index) => (
                <span
                  key={item.text}
                  className={[
                    'not-extra__worry',
                    showScatter ? 'is-visible' : '',
                  ].join(' ')}
                  style={{
                    left: item.left,
                    top: item.top,
                    '--worry-rotate': item.rotate,
                    '--worry-delay': `${index * 90}ms`,
                  }}
                >
                  {item.text}
                </span>
              ))}
            </div>
            <p
              className={[
                'not-extra__line',
                'not-extra__line--question',
                questionReady ? 'is-in' : '',
                reduceMotion ? 'is-instant' : '',
              ].join(' ')}
            >
              What is coaching?
            </p>
          </div>
        ) : null}

        {showEquation ? (
          <p
            className={[
              'not-extra__line',
              'not-extra__line--equation',
              phase === 'equation' ? 'is-in' : '',
              phase === 'slash' ? 'is-slashing' : '',
              phase === 'neq' || phase === 'resolveOut' ? 'is-neq' : '',
              phase === 'resolveOut' ? 'is-exiting' : '',
              reduceMotion ? 'is-instant' : '',
            ].join(' ')}
            aria-label={
              phase === 'neq' || phase === 'slash' || phase === 'resolveOut'
                ? 'Coaching is not an extra task'
                : 'Coaching equals extra task?'
            }
          >
            <span>Coaching</span>{' '}
            <span className="not-extra__op" aria-hidden={phase === 'slash'}>
              <span className="not-extra__eq">=</span>
              <span className="not-extra__slash">/</span>
              <span className="not-extra__neq-mark">≠</span>
            </span>{' '}
            <span className="not-extra__emphasis">extra task</span>
            {phase === 'equation' || phase === 'slash' ? (
              <span className="not-extra__qmark">?</span>
            ) : null}
          </p>
        ) : null}

        {showResolve ? (
          <p
            className={[
              'not-extra__line',
              'not-extra__line--resolve',
              alreadySeen && phase === 'resolve' ? 'is-settled' : 'is-in',
              reduceMotion ? 'is-instant' : '',
            ].join(' ')}
          >
            Coaching = a different way of communicating.
          </p>
        ) : null}
      </div>
    </section>
  )
}

P1NotExtraTask.fullBleed = true

export default P1NotExtraTask
