import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Framework wordmark | Step name header with cross-fading step name.
 *
 * highlightMode:
 *  - 'through' (default): letters up to reachedIndex are "reached"
 *  - 'current': only current letter is current; earlier = completed; later = upcoming
 *  - 'visited': current + visitedIndices (not current) + upcoming (not visited)
 *
 * interactive=false: pure progress indicator (no buttons / pointer)
 */
export default function OscarStepHeader({
  letters = [],
  letterStages,
  stepNames,
  stepIndex = 0,
  reachedIndex,
  visitedIndices,
  stepName,
  onSelect,
  isClickable,
  interactive = true,
  highlightMode = 'through',
  ariaLabel = 'Framework steps',
}) {
  const skipFade = useRef(true)
  const [displayedName, setDisplayedName] = useState(stepName)
  const [fading, setFading] = useState(false)
  const highlightThrough =
    typeof reachedIndex === 'number' ? reachedIndex : stepIndex

  const visitedSet = useMemo(
    () => new Set(Array.isArray(visitedIndices) ? visitedIndices : []),
    [visitedIndices],
  )

  useEffect(() => {
    if (skipFade.current) {
      skipFade.current = false
      setDisplayedName(stepName)
      return undefined
    }

    setFading(true)
    const id = window.setTimeout(() => {
      setDisplayedName(stepName)
      setFading(false)
    }, 125)

    return () => window.clearTimeout(id)
  }, [stepName])

  function stageForLetter(index) {
    if (Array.isArray(letterStages) && letterStages[index] != null) {
      return letterStages[index]
    }
    return index
  }

  function letterClass(stage) {
    if (highlightMode === 'current') {
      if (stage === stepIndex) return 'is-current'
      if (stage < stepIndex) return 'is-completed'
      return 'is-upcoming'
    }
    if (highlightMode === 'visited') {
      if (stage === stepIndex) return 'is-current'
      if (visitedSet.has(stage)) return 'is-completed'
      return 'is-upcoming'
    }
    return stage <= highlightThrough ? 'is-reached' : ''
  }

  return (
    <div className="oscar-step-header">
      <div
        className={[
          'oscar-step-header__letters',
          interactive ? '' : 'is-static',
        ].join(' ')}
        role={interactive ? 'tablist' : 'group'}
        aria-label={ariaLabel}
      >
        {letters.map((letter, index) => {
          const stage = stageForLetter(index)
          const stateClass = letterClass(stage)
          const firstOfStage =
            letters.findIndex((_, i) => stageForLetter(i) === stage) === index
          const name =
            Array.isArray(stepNames) && stepNames[stage]
              ? stepNames[stage]
              : `step ${stage + 1}`

          if (!interactive) {
            return (
              <span
                key={`${letter}-${index}`}
                className={['oscar-step-header__letter', stateClass].join(' ')}
                aria-current={
                  stage === stepIndex && firstOfStage ? 'step' : undefined
                }
              >
                {letter}
              </span>
            )
          }

          const canClick =
            typeof isClickable === 'function' ? isClickable(stage) : true
          const isCurrent = stage === stepIndex && firstOfStage

          return (
            <button
              key={`${letter}-${index}`}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`${letter}: ${name}`}
              disabled={!canClick}
              onClick={(event) => {
                if (!canClick) return
                onSelect?.(stage)
                // Mouse activation should not leave a sticky focus ring.
                if (event.detail > 0) {
                  event.currentTarget.blur()
                }
              }}
              className={[
                'oscar-step-header__letter',
                stateClass,
                !canClick ? 'is-locked' : '',
              ].join(' ')}
            >
              <span className="oscar-step-header__letter-glyph" aria-hidden="true">
                {letter}
              </span>
            </button>
          )
        })}
      </div>

      <div className="oscar-step-header__divider" aria-hidden="true" />

      <p
        className={[
          'oscar-step-header__name',
          fading ? 'is-fading' : '',
        ].join(' ')}
        aria-live="polite"
      >
        {displayedName}
      </p>
    </div>
  )
}
