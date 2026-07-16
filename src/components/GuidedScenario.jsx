import { useEffect, useMemo, useRef, useState } from 'react'
import SectionHeading from './SectionHeading'
import Button from './Button'
import ScenarioContextCard from './ScenarioContextCard'
import ChoiceOption from './ChoiceOption'
import FeedbackBanner from './FeedbackBanner'
import InlineOutcomeFeedback from './InlineOutcomeFeedback'
import AssessmentMissesPanel from './AssessmentMissesPanel'
import ActivityCallout from './ActivityCallout'
import OscarStepHeader from './OscarStepHeader'
import QuestionPromptCard from './QuestionPromptCard'
import { CHOICE_LETTERS } from './ScenarioFeedbackPanel'
import {
  OUTCOME_TO_BANNER,
  OUTCOME_TO_CHOICE,
} from '../data/assessmentFeedback'
import { useCourse } from '../context/CourseContext'
import useScreenEntrance from '../hooks/useScreenEntrance'

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
  const entrancePhase = useScreenEntrance(650)
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
  const letterStages = config.letterStages
  const showScenario = Boolean(config.scenario) && config.showScenario !== false
  const showWordmark = config.showWordmark !== false
  const navPlacement = config.navPlacement ?? 'bottom'
  const promptCard = config.promptCard === true
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
  const [enterDir, setEnterDir] = useState('initial')
  const prevViewRef = useRef(
    Number.isInteger(saved?.viewIndex) ? saved.viewIndex : 0,
  )

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

    const direction = viewIndex > prevViewRef.current ? 'forward' : 'back'
    prevViewRef.current = viewIndex
    setEnterDir(direction)

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
    }, 100)

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

  const completedStageCount = stageRecords.filter((r) => r.resolved).length

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
            <div
              key={`${displayedIndex}-${choice.id}`}
              className="ia-choice"
              style={{ '--ia-choice-index': index }}
            >
              <ChoiceOption
                state={state}
                disabled={disabled}
                lockState={!singleSelection || !showingActiveWork}
                onClick={() => handleSelect(choice)}
              >
                {text}
              </ChoiceOption>
            </div>
          )
        }

        return (
          <div
            key={`${displayedIndex}-${choice.id}`}
            className={[
              'guided-scenario__choice-block',
              'ia-choice',
              open ? 'has-feedback' : '',
              `is-${outcomeClass}`,
            ].join(' ')}
            style={{ '--ia-choice-index': index }}
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
    </div>
  )

  const missesPanel =
    showMissesPanel && missChoices.length > 0 ? (
      <AssessmentMissesPanel
        choices={missChoices}
        allChoices={stage.choices}
        labelChoices={labelChoices}
        variant={config.missesVariant ?? 'light-list'}
        title={config.missesTitle}
        className="guided-scenario__quiz-misses"
      />
    ) : null

  const navArrows = navStyle === 'questions'
  const bottomNav = navArrows && navPlacement === 'bottom'
  const frameworkNav = navArrows && navPlacement === 'framework'
  const sideNav = navArrows && !bottomNav && !frameworkNav

  const interactionMode =
    promptCard && !showWordmark ? 'quiz' : 'practice'

  const prevArrow = (
    <button
      type="button"
      className={[
        'guided-scenario__nav-arrow',
        'ia-arrow',
        !showPrevArrow ? 'is-disabled' : '',
      ].join(' ')}
      aria-label={prevNavLabel}
      disabled={!showPrevArrow}
      onClick={goPreviousQuestion}
    >
      <span aria-hidden="true">←</span>
    </button>
  )

  const nextArrow = (
    <button
      type="button"
      className={[
        'guided-scenario__nav-arrow',
        'ia-arrow',
        !showNextArrow || !canGoNextQuestion ? 'is-disabled' : '',
      ].join(' ')}
      aria-label={
        showNextArrow && canGoNextQuestion ? nextNavLabel : nextNavLockedLabel
      }
      title={
        showNextArrow && canGoNextQuestion ? nextNavLabel : nextNavLockedLabel
      }
      aria-disabled={!showNextArrow || !canGoNextQuestion}
      disabled={!showNextArrow || !canGoNextQuestion}
      onClick={() => {
        if (!showNextArrow || !canGoNextQuestion) return
        goNextStage()
      }}
    >
      <span aria-hidden="true">→</span>
    </button>
  )

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
    <div
      className={[
        'guided-scenario',
        interactionMode === 'quiz' ? 'ia-quiz' : 'ia-practice',
        entrancePhase,
      ].join(' ')}
    >
      <SectionHeading title={config.title} />

      {config.instruction ? (
        <p className="screen-lede m-0">{config.instruction}</p>
      ) : null}

      {showScenario ? (
        <ScenarioContextCard>
          <p className="m-0">{config.scenario}</p>
        </ScenarioContextCard>
      ) : null}

      {showWordmark ? (
        frameworkNav ? (
          <div
            className="oscar-framework-nav"
            aria-label={`${config.frameworkLabel ?? 'Framework'} step navigation`}
          >
            <div className="oscar-framework-nav__slot">{prevArrow}</div>
            <OscarStepHeader
              className="oscar-framework-nav__header"
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
            <div className="oscar-framework-nav__slot oscar-framework-nav__slot--end">
              {nextArrow}
            </div>
          </div>
        ) : (
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
        )
      ) : null}

      <div
        key={displayedIndex}
        className={[
          'guided-scenario__turn',
          promptCard ? 'guided-scenario__turn--quiz' : '',
          turnFading ? 'is-fading' : ['ia-stage', `is-${enterDir}`].join(' '),
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {promptCard && sideNav ? (
          <div className="guided-scenario__quiz-question">
            <div
              className="guided-scenario__question-area guided-scenario__question-area--prompt"
              aria-label="Question navigation"
            >
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

              <div className="guided-scenario__question-main ia-prompt">
                <QuestionPromptCard
                  index={displayedIndex}
                  total={stages.length}
                  text={stage.prompt}
                  completedCount={completedStageCount}
                  currentResolved={Boolean(viewRecord?.resolved)}
                  className="guided-scenario__prompt-card"
                />
              </div>

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

            {choicesBlock}
          </div>
        ) : (
          <>
            {promptCard ? (
              <div className="ia-prompt">
                <QuestionPromptCard
                  index={displayedIndex}
                  total={stages.length}
                  text={stage.prompt}
                  completedCount={completedStageCount}
                  currentResolved={Boolean(viewRecord?.resolved)}
                  className="guided-scenario__prompt-card"
                />
              </div>
            ) : (
              <p className="guided-scenario__prompt ia-prompt ia-heading">
                {promptText}
              </p>
            )}

            {sideNav ? (
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

                <div className="guided-scenario__question-main">
                  {choicesBlock}
                </div>

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
          </>
        )}

        {missesPanel}

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
      </div>

      {bottomNav ? (
        <div className="match-quiz__nav match-quiz__nav--activity">
          <div className="match-quiz__nav-slot">
            {showPrevArrow ? (
              prevArrow
            ) : (
              <span className="guided-scenario__nav-spacer" aria-hidden="true" />
            )}
          </div>
          <div className="match-quiz__nav-slot match-quiz__nav-slot--end">
            {showNextArrow ? (
              nextArrow
            ) : (
              <span className="guided-scenario__nav-spacer" aria-hidden="true" />
            )}
          </div>
        </div>
      ) : null}

      {renderCompletion()}
    </div>
  )
}
