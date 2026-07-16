import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import ChoiceOption from './ChoiceOption'
import InlineOutcomeFeedback from './InlineOutcomeFeedback'
import ActivityCallout from './ActivityCallout'
import {
  MATCH_COMPLETION_NEUTRAL,
  MATCH_COMPLETION_PERFECT,
  MATCH_FAMILIES,
  MATCH_QUESTIONS,
} from '../data/matchQuestionData'
import { useCourse } from '../context/CourseContext'

/**
 * Sequential classification quiz (p2b-4).
 * Simple variant: feedback only under the selected option; no other-choice panel.
 */
export default function MatchQuestionBoard({ lockCourseNext = true }) {
  const { setNextLocked, markComplete, currentId, getProgress, setProgress } =
    useCourse()
  const progressKey = 'match-quiz'
  const feedbackRef = useRef(null)
  const focusGeneration = useRef(0)

  const saved = getProgress(progressKey)

  function emptyRecords() {
    return MATCH_QUESTIONS.map(() => ({
      selectedId: null,
      resolved: false,
      missedOnce: false,
    }))
  }

  function hydrateRecords(raw) {
    const base = emptyRecords()
    if (!Array.isArray(raw) || raw.length !== MATCH_QUESTIONS.length) return base
    return base.map((slot, i) => ({
      ...slot,
      ...(raw[i] ?? {}),
      missedOnce: Boolean(raw[i]?.missedOnce),
    }))
  }

  const [index, setIndex] = useState(() =>
    Number.isInteger(saved?.index) ? saved.index : 0,
  )
  const [progressIndex, setProgressIndex] = useState(() =>
    Number.isInteger(saved?.progressIndex) ? saved.progressIndex : 0,
  )
  const [records, setRecords] = useState(() => hydrateRecords(saved?.records))
  const [complete, setComplete] = useState(() => Boolean(saved?.complete))

  useEffect(() => {
    setProgress(progressKey, {
      index,
      progressIndex,
      records,
      complete,
    })
  }, [index, progressIndex, records, complete, setProgress])

  const total = MATCH_QUESTIONS.length
  const question = MATCH_QUESTIONS[index]
  const record = records[index]
  const progressLabel = `${index + 1} of ${total}`
  const completedCount = records.filter((r) => r.resolved).length
  const isReview = record.resolved
  const showingActive = index === progressIndex && !record.resolved && !complete

  useEffect(() => {
    if (!lockCourseNext) return undefined
    setNextLocked(!complete)
    return () => setNextLocked(false)
  }, [lockCourseNext, complete, setNextLocked])

  useEffect(() => {
    if (complete) markComplete(currentId)
  }, [complete, markComplete, currentId])

  useEffect(() => {
    if (!record.selectedId) return undefined
    const generation = ++focusGeneration.current
    const id = window.setTimeout(() => {
      if (generation !== focusGeneration.current) return
      feedbackRef.current?.focus?.()
    }, 30)
    return () => window.clearTimeout(id)
  }, [record.selectedId, record.resolved, index])

  function handleSelect(familyId) {
    if (!showingActive) return

    const isCorrect = familyId === question.familyId

    setRecords((prev) => {
      const next = prev.map((r) => ({ ...r }))
      const prior = next[index]
      next[index] = {
        selectedId: familyId,
        resolved: isCorrect,
        missedOnce: prior.missedOnce || !isCorrect,
      }
      return next
    })

    if (isCorrect && index === total - 1) {
      setComplete(true)
    }
  }

  function goPrevious() {
    if (index <= 0) return
    setIndex((i) => i - 1)
  }

  function goNext() {
    if (index >= total - 1) return
    if (!(index < progressIndex || record.resolved)) return

    if (index === progressIndex && record.resolved) {
      setProgressIndex(index + 1)
    }
    setIndex(index + 1)
  }

  function optionState(familyId) {
    if (record.resolved) {
      if (familyId === question.familyId) return 'correct'
      return 'idle'
    }
    if (record.selectedId === familyId) return 'incorrect'
    return 'idle'
  }

  function feedbackFor(familyId) {
    if (!record.selectedId) return null
    if (record.resolved) {
      if (familyId !== question.familyId) return null
      return {
        outcome: 'correct',
        message: question.correctFeedback,
      }
    }
    if (familyId !== record.selectedId) return null
    return {
      outcome: 'incorrect',
      message: question.incorrectFeedback,
    }
  }

  const showPrev = index > 0
  const showNext = index < total - 1
  const canGoNext =
    index < progressIndex || (index === progressIndex && record.resolved)

  const allFirstTry =
    complete && records.every((r) => r.resolved && !r.missedOnce)
  const completionText = allFirstTry
    ? MATCH_COMPLETION_PERFECT
    : MATCH_COMPLETION_NEUTRAL

  return (
    <div className="match-quiz">
      <div key={question.id} className="match-quiz__stage">
        <Card tone="mint" className="match-quiz__stem">
          <div className="match-quiz__stem-header">
            <p className="match-quiz__stem-meta m-0">{progressLabel}:</p>
            <div
              className="match-quiz__dots"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={completedCount}
              aria-label={`${completedCount} of ${total} questions completed`}
            >
              {MATCH_QUESTIONS.map((item, i) => (
                <span
                  key={item.id}
                  className={[
                    'match-quiz__dot',
                    i < completedCount ? 'is-filled' : '',
                    i === index && !record.resolved ? 'is-current' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <p className="match-quiz__stem-text m-0">
            &ldquo;{question.text}&rdquo;
          </p>
        </Card>

        <div
          className="match-quiz__options match-quiz__options--inline"
          role="group"
          aria-label="Question family"
        >
          {MATCH_FAMILIES.map((family) => {
            const state = optionState(family.id)
            const locked = isReview || !showingActive
            const feedback = feedbackFor(family.id)
            const open = Boolean(feedback)

            return (
              <div
                key={family.id}
                className={[
                  'guided-scenario__choice-block',
                  'match-quiz__choice-block',
                  open ? 'has-feedback' : '',
                  feedback ? `is-${feedback.outcome}` : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <ChoiceOption
                  state={state}
                  lockState={false}
                  disabled={locked}
                  className={[
                    'match-quiz__option',
                    open ? 'guided-scenario__choice--attached' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={`${family.name}: ${family.does}`}
                  aria-describedby={
                    open ? `match-feedback-${family.id}` : undefined
                  }
                  onClick={() => handleSelect(family.id)}
                >
                  <span className="match-quiz__option-name">{family.name}</span>
                  <span className="match-quiz__option-does">{family.does}</span>
                </ChoiceOption>

                <div id={`match-feedback-${family.id}`}>
                  <InlineOutcomeFeedback
                    outcome={feedback?.outcome ?? 'incorrect'}
                    message={feedback?.message ?? ''}
                    open={open}
                    panelRef={feedbackRef}
                    isFocusTarget={open}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {complete && index === total - 1 ? (
          <ActivityCallout
            variant="complete"
            className="match-quiz__completion"
          >
            <p className="m-0">{completionText}</p>
          </ActivityCallout>
        ) : null}
      </div>

      <div className="match-quiz__nav match-quiz__nav--activity">
        <div className="match-quiz__nav-slot">
          {showPrev ? (
            <button
              type="button"
              className="guided-scenario__nav-arrow"
              aria-label="Previous question"
              onClick={goPrevious}
            >
              <span aria-hidden="true">←</span>
            </button>
          ) : null}
        </div>

        <div className="match-quiz__nav-slot match-quiz__nav-slot--end">
          {showNext ? (
            <button
              type="button"
              className={[
                'guided-scenario__nav-arrow',
                !canGoNext ? 'is-disabled' : '',
              ].join(' ')}
              aria-label={
                canGoNext ? 'Next question' : 'Answer correctly to continue'
              }
              title={
                canGoNext ? 'Next question' : 'Answer correctly to continue'
              }
              disabled={!canGoNext}
              onClick={goNext}
            >
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
