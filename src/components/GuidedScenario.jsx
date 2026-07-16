import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Card from './Card'
import Button from './Button'
import ChoiceOption from './ChoiceOption'
import FeedbackBanner from './FeedbackBanner'
import InlineOutcomeFeedback from './InlineOutcomeFeedback'
import AssessmentMissesPanel from './AssessmentMissesPanel'
import ActivityCallout from './ActivityCallout'
import OscarStepHeader from './OscarStepHeader'
import { CHOICE_LETTERS } from './ScenarioFeedbackPanel'
import {
  OUTCOME_TO_BANNER,
  OUTCOME_TO_CHOICE,
} from '../data/assessmentFeedback'
import { useCourse } from '../context/CourseContext'

/**
 * Reusable guided multi-stage choice walkthrough.
 * Shared by coach Sam, knowledge check, GROW in action.
 *
 * feedbackMode:
 *  - 'reveal-all' (default): after correct, open every option's feedback equally
 *  - 'primary-then-misses': selected-only until correct; then correct panel +
 *    secondary explanations for other choices
 *  - 'selected-only': selected-only until correct; correct panel only (no
 *    distractor explanations) — lighter practice e.g. GROW in action
 */
export default function GuidedScenario({ config, lockCourseNext = true }) {
  const { setNextLocked, markComplete, currentId, getProgress, setProgress } =
    useCourse()
  const stages = config.stages
  const progressKey = `guided:${config.id}`
  const letters = useMemo(
    () =>
      Array.isArray(config.wordmark) && config.wordmark.length > 0
        ? config.wordmark
        : stages.map((s) => s.letter ?? s.id),
    [config.wordmark, stages],
  )

  const feedbackPanel = config.feedbackPanel !== false
  const singleSelection = config.singleSelection !== false
  const labelChoices = config.labelChoices !== false
  const numberPrompts = config.numberPrompts !== false
  const wordmarkInteractive = config.wordmarkInteractive === true
  const wordmarkHighlight = config.wordmarkHighlight ?? 'current'
  const navStyle = config.navStyle ?? 'questions'
  const scenarioTone = config.scenarioTone ?? 'mint'
  const letterStages = config.letterStages
  const showScenario = Boolean(config.scenario) && config.showScenario !== false
  const showWordmark = config.showWordmark !== false
  const navPlacement = config.navPlacement ?? 'side'
  const hierarchical =
    config.feedbackMode === 'primary-then-misses' ||
    config.feedbackMode === 'selected-only'
  const showMissesAfterCorrect = config.feedbackMode === 'primary-then-misses'
  const completionVariant = config.completionVariant ?? 'complete'

  const feedbackRef = useRef(null)
  const focusGeneration = useRef(0)

  const saved = getProgress(progressKey)

  const emptyRecords = () =>
    stages.map(() => ({
      tried: {},
      resolved: false,
      correctId: null,
      lastChoiceId: null,
    }))

  const hydrateRecords = (raw) => {
    const base = emptyRecords()
    if (!Array.isArray(raw) || raw.length !== stages.length) return base
    return base.map((slot, i) => ({
      ...slot,
      ...raw[i],
      tried:
        raw[i]?.tried && typeof raw[i].tried === 'object' ? raw[i].tried : {},
    }))
  }

  const [viewIndex, setViewIndex] = useState(() =>
    Number.isInteger(saved?.viewIndex) ? saved.viewIndex : 0,
  )
  const [progressIndex, setProgressIndex] = useState(() =>
    Number.isInteger(saved?.progressIndex) ? saved.progressIndex : 0,
  )
  const [stageRecords, setStageRecords] = useState(() =>
    hydrateRecords(saved?.stageRecords),
  )
  const [scenarioComplete, setScenarioComplete] = useState(() =>
    Boolean(saved?.scenarioComplete),
  )

  const [displayedIndex, setDisplayedIndex] = useState(() =>
    Number.isInteger(saved?.viewIndex) ? saved.viewIndex : 0,
  )
  const [turnFading, setTurnFading] = useState(false)

  useEffect(() => {
    setProgress(progressKey, {
      viewIndex,
      progressIndex,
      stageRecords,
      scenarioComplete,
    })
  }, [
    progressKey,
    viewIndex,
    progressIndex,
    stageRecords,
    scenarioComplete,
    setProgress,
  ])

  useEffect(() => {
    if (!lockCourseNext) return undefined
    setNextLocked(!scenarioComplete)
    return () => setNextLocked(false)
  }, [lockCourseNext, scenarioComplete, setNextLocked])

  useEffect(() => {
    if (scenarioComplete) markComplete(currentId)
  }, [scenarioComplete, markComplete, currentId])

  useEffect(() => {
    if (viewIndex === displayedIndex) return undefined

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      setDisplayedIndex(viewIndex)
      return undefined
    }

    setTurnFading(true)
    const id = window.setTimeout(() => {
      setDisplayedIndex(viewIndex)
      setTurnFading(false)
    }, 125)

    return () => window.clearTimeout(id)
  }, [viewIndex, displayedIndex])

  const stage = stages[displayedIndex]
  const record = stageRecords[displayedIndex]
  const headerStage = stages[viewIndex]
  const isReview =
    record.resolved &&
    (displayedIndex < progressIndex ||
      (scenarioComplete && displayedIndex === stages.length - 1))
  const showingActiveWork =
    displayedIndex === progressIndex &&
    !record.resolved &&
    !scenarioComplete &&
    displayedIndex === viewIndex

  const showFullReveal =
    feedbackPanel &&
    !hierarchical &&
    (record.resolved || isReview) &&
    Boolean(record.correctId || record.resolved)

  const showHierarchicalPrimary =
    feedbackPanel &&
    hierarchical &&
    Boolean(record.lastChoiceId) &&
    (showingActiveWork || record.resolved || isReview)

  const showMissesPanel =
    hierarchical &&
    showMissesAfterCorrect &&
    feedbackPanel &&
    config.missesVariant !== 'none' &&
    (record.resolved || isReview) &&
    Boolean(record.correctId)

  const activeFeedback = useMemo(() => {
    if (feedbackPanel) return null
    if (!record.lastChoiceId) return null
    const choice = stage.choices.find((c) => c.id === record.lastChoiceId)
    if (!choice) return null
    return {
      variant: OUTCOME_TO_BANNER[choice.outcome],
      message: choice.feedback,
    }
  }, [feedbackPanel, record.lastChoiceId, stage.choices])

  const primaryChoice = useMemo(() => {
    if (!showHierarchicalPrimary) return null
    if (record.resolved || isReview) {
      return (
        stage.choices.find((c) => c.id === record.correctId) ??
        stage.choices.find((c) => c.id === record.lastChoiceId) ??
        null
      )
    }
    return stage.choices.find((c) => c.id === record.lastChoiceId) ?? null
  }, [
    showHierarchicalPrimary,
    record.resolved,
    record.correctId,
    record.lastChoiceId,
    isReview,
    stage.choices,
  ])

  const missChoices = useMemo(() => {
    if (!showMissesPanel || !record.correctId) return []
    return stage.choices.filter((c) => c.id !== record.correctId)
  }, [showMissesPanel, record.correctId, stage.choices])

  useEffect(() => {
    if (!feedbackPanel) return undefined
    if (!record.lastChoiceId && !record.resolved) return undefined
    if (turnFading) return undefined

    const generation = ++focusGeneration.current
    const id = window.setTimeout(() => {
      if (generation !== focusGeneration.current) return
      feedbackRef.current?.focus?.()
    }, 30)

    return () => window.clearTimeout(id)
  }, [
    feedbackPanel,
    record.lastChoiceId,
    record.resolved,
    displayedIndex,
    turnFading,
  ])

  function choiceState(choice) {
    if (hierarchical && (record.resolved || isReview)) {
      if (choice.id === record.correctId) return 'correct'
      return 'idle'
    }

    if (record.resolved || isReview) {
      return OUTCOME_TO_CHOICE[choice.outcome] ?? 'idle'
    }

    if (singleSelection) {
      if (record.lastChoiceId === choice.id) {
        return OUTCOME_TO_CHOICE[choice.outcome] ?? 'selected'
      }
      return 'idle'
    }

    if (record.tried[choice.id]) {
      return OUTCOME_TO_CHOICE[record.tried[choice.id]] ?? 'idle'
    }
    return 'idle'
  }

  function feedbackOpen(choice) {
    if (!feedbackPanel) return false

    if (hierarchical) {
      if (!showHierarchicalPrimary || !primaryChoice) return false
      return choice.id === primaryChoice.id
    }

    if (showFullReveal) return true
    if (
      showingActiveWork &&
      record.lastChoiceId === choice.id &&
      !record.resolved
    ) {
      return true
    }
    return false
  }

  function handleSelect(choice) {
    if (!showingActiveWork) return
    if (record.resolved) return

    if (!singleSelection && record.tried[choice.id]) return

    const willCompleteScenario =
      choice.outcome === 'correct' && displayedIndex === stages.length - 1

    setStageRecords((prev) => {
      const next = prev.map((r) => ({ ...r, tried: { ...r.tried } }))
      const current = {
        ...next[displayedIndex],
        tried: { ...next[displayedIndex].tried },
      }
      current.tried[choice.id] = choice.outcome
      current.lastChoiceId = choice.id

      if (choice.outcome === 'correct') {
        current.resolved = true
        current.correctId = choice.id
      }

      next[displayedIndex] = current
      return next
    })

    if (willCompleteScenario) {
      setScenarioComplete(true)
    }
  }

  function goNextStage() {
    if (viewIndex >= stages.length - 1) return
    const nextIdx = viewIndex + 1
    if (viewIndex === progressIndex && stageRecords[viewIndex]?.resolved) {
      setProgressIndex(nextIdx)
    }
    setViewIndex(nextIdx)
  }

  function goPreviousQuestion() {
    if (viewIndex <= 0) return
    setViewIndex(viewIndex - 1)
  }

  function handleLetterSelect(index) {
    if (!wordmarkInteractive) return
    if (!stageRecords[index]?.resolved) return
    setViewIndex(index)
  }

  const viewRecord = stageRecords[viewIndex]
  const stageSolved = record.resolved

  const canAdvanceStage =
    navStyle === 'stages' &&
    stageSolved &&
    displayedIndex === progressIndex &&
    displayedIndex === viewIndex &&
    viewIndex < stages.length - 1 &&
    !scenarioComplete

  const canReturnToCurrent =
    navStyle === 'stages' && viewIndex !== progressIndex && !scenarioComplete

  const showPrevArrow = navStyle === 'questions' && viewIndex > 0
  const showNextArrow =
    navStyle === 'questions' && viewIndex < stages.length - 1
  const canGoNextQuestion =
    viewIndex < progressIndex ||
    (viewIndex === progressIndex && Boolean(viewRecord?.resolved))

  const promptText = numberPrompts
    ? `${displayedIndex + 1}. ${stage.prompt}`
    : stage.prompt

  const showCompletion =
    scenarioComplete &&
    config.completion &&
    displayedIndex === stages.length - 1 &&
    viewIndex === stages.length - 1

  const prevNavLabel = config.prevNavLabel ?? 'Previous question'
  const nextNavLabel = config.nextNavLabel ?? 'Next question'
  const nextNavLockedLabel =
    config.nextNavLockedLabel ?? 'Answer correctly to continue'

  const choicesBlock = (
    <div
      className={[
        'guided-scenario__choices',
        feedbackPanel ? 'guided-scenario__choices--inline' : '',
      ].join(' ')}
    >
      {stage.choices.map((choice, index) => {
        const state = choiceState(choice)
        const disabled =
          !showingActiveWork ||
          stageSolved ||
          (!singleSelection && Boolean(record.tried[choice.id]))
        const label = CHOICE_LETTERS[index] ?? String(index + 1)
        const text = labelChoices ? `${label}. ${choice.text}` : choice.text
        const open = feedbackOpen(choice)
        const outcomeClass = OUTCOME_TO_CHOICE[choice.outcome] ?? 'incorrect'
        const isFocusTarget =
          open &&
          (hierarchical
            ? primaryChoice?.id === choice.id
            : record.lastChoiceId === choice.id)

        if (!feedbackPanel) {
          return (
            <ChoiceOption
              key={`${displayedIndex}-${choice.id}`}
              state={state}
              disabled={disabled}
              lockState={!singleSelection || !showingActiveWork}
              onClick={() => handleSelect(choice)}
            >
              {text}
            </ChoiceOption>
          )
        }

        return (
          <div
            key={`${displayedIndex}-${choice.id}`}
            className={[
              'guided-scenario__choice-block',
              open ? 'has-feedback' : '',
              `is-${outcomeClass}`,
            ].join(' ')}
          >
            <ChoiceOption
              state={state}
              disabled={disabled}
              lockState={!singleSelection || !showingActiveWork}
              className={open ? 'guided-scenario__choice--attached' : ''}
              onClick={() => handleSelect(choice)}
              aria-describedby={
                open ? `feedback-${displayedIndex}-${choice.id}` : undefined
              }
            >
              {text}
            </ChoiceOption>

            <div id={`feedback-${displayedIndex}-${choice.id}`}>
              <InlineOutcomeFeedback
                outcome={choice.outcome}
                message={choice.feedback}
                open={open}
                revealAll={showFullReveal}
                staggerIndex={index}
                panelRef={feedbackRef}
                isFocusTarget={isFocusTarget}
              />
            </div>
          </div>
        )
      })}

      {showMissesPanel && missChoices.length > 0 ? (
        <AssessmentMissesPanel
          choices={missChoices}
          allChoices={stage.choices}
          labelChoices={labelChoices}
          variant={config.missesVariant ?? 'light-list'}
          title={config.missesTitle}
        />
      ) : null}
    </div>
  )

  const navArrows = navStyle === 'questions'
  const bottomNav = navArrows && navPlacement === 'bottom'

  const prevArrow = showPrevArrow ? (
    <button
      type="button"
      className="guided-scenario__nav-arrow"
      aria-label={prevNavLabel}
      onClick={goPreviousQuestion}
    >
      <span aria-hidden="true">←</span>
    </button>
  ) : null

  const nextArrow = showNextArrow ? (
    <button
      type="button"
      className={[
        'guided-scenario__nav-arrow',
        !canGoNextQuestion ? 'is-disabled' : '',
      ].join(' ')}
      aria-label={canGoNextQuestion ? nextNavLabel : nextNavLockedLabel}
      title={canGoNextQuestion ? nextNavLabel : nextNavLockedLabel}
      aria-disabled={!canGoNextQuestion}
      disabled={!canGoNextQuestion}
      onClick={() => {
        if (!canGoNextQuestion) return
        goNextStage()
      }}
    >
      <span aria-hidden="true">→</span>
    </button>
  ) : null

  function renderCompletion() {
    if (!showCompletion) return null

    if (completionVariant === 'takeaway') {
      return (
        <aside
          className="guided-scenario__completion guided-scenario__completion--takeaway"
          aria-label={config.completionEyebrow ?? 'Takeaway'}
        >
          <p className="guided-scenario__completion-eyebrow">
            {config.completionEyebrow ?? 'TAKEAWAY'}
          </p>
          <p className="guided-scenario__completion-text">
            {config.completion}
          </p>
        </aside>
      )
    }

    const calloutVariant =
      completionVariant === 'next-step' || completionVariant === 'next-skill'
        ? completionVariant
        : 'complete'

    return (
      <ActivityCallout
        variant={calloutVariant}
        className="guided-scenario__completion"
      >
        <p className="m-0">{config.completion}</p>
      </ActivityCallout>
    )
  }

  return (
    <div className="guided-scenario">
      <SectionHeading title={config.title} />

      {config.instruction ? (
        <p className="m-0 mb-6 text-body text-ink whitespace-nowrap max-[800px]:whitespace-normal">
          {config.instruction}
        </p>
      ) : null}

      {showScenario ? (
        <Card tone={scenarioTone} className="mb-8">
          <p className="m-0 mb-2 text-caption font-medium uppercase tracking-wide text-ink-soft">
            Scenario
          </p>
          <p className="m-0 text-body text-ink">{config.scenario}</p>
        </Card>
      ) : null}

      {showWordmark ? (
        <OscarStepHeader
          letters={letters}
          letterStages={letterStages}
          stepIndex={viewIndex}
          reachedIndex={Math.max(viewIndex, progressIndex)}
          stepName={headerStage.name}
          onSelect={handleLetterSelect}
          interactive={wordmarkInteractive}
          highlightMode={wordmarkHighlight}
          isClickable={(index) =>
            wordmarkInteractive && Boolean(stageRecords[index]?.resolved)
          }
          ariaLabel={`${config.frameworkLabel ?? 'Framework'} stages`}
        />
      ) : null}

      <div
        className={[
          'guided-scenario__turn',
          turnFading ? 'is-fading' : '',
        ].join(' ')}
      >
        <p className="guided-scenario__prompt">{promptText}</p>

        {navArrows && !bottomNav ? (
          <div className="guided-scenario__question-area">
            <div className="guided-scenario__nav-slot guided-scenario__nav-slot--prev">
              {showPrevArrow ? (
                prevArrow
              ) : (
                <span
                  className="guided-scenario__nav-spacer"
                  aria-hidden="true"
                />
              )}
            </div>

            <div className="guided-scenario__question-main">{choicesBlock}</div>

            <div className="guided-scenario__nav-slot guided-scenario__nav-slot--next">
              {showNextArrow ? (
                nextArrow
              ) : (
                <span
                  className="guided-scenario__nav-spacer"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        ) : (
          choicesBlock
        )}

        {activeFeedback ? (
          <div className="guided-scenario__feedback">
            <FeedbackBanner
              variant={activeFeedback.variant}
              message={activeFeedback.message}
            />
          </div>
        ) : null}

        {canAdvanceStage ? (
          <div className="guided-scenario__actions">
            <Button variant="primary" onClick={goNextStage}>
              Next stage
            </Button>
          </div>
        ) : null}

        {canReturnToCurrent ? (
          <div className="guided-scenario__actions">
            <Button variant="ghost" onClick={() => setViewIndex(progressIndex)}>
              Back to current stage
            </Button>
          </div>
        ) : null}

        {renderCompletion()}
      </div>

      {bottomNav ? (
        <div className="match-quiz__nav match-quiz__nav--activity">
          <div className="match-quiz__nav-slot">
            {showPrevArrow ? prevArrow : null}
          </div>
          <div className="match-quiz__nav-slot match-quiz__nav-slot--end">
            {showNextArrow ? nextArrow : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
