import { useEffect, useId, useMemo, useRef, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import ChoiceOption from '../components/ChoiceOption'
import InlineOutcomeFeedback from '../components/InlineOutcomeFeedback'
import AssessmentMissesPanel from '../components/AssessmentMissesPanel'
import ScenarioContextCard from '../components/ScenarioContextCard'
import DetailedAnswerPanel from '../components/DetailedAnswerPanel'
import ActivityCallout from '../components/ActivityCallout'
import Button from '../components/Button'
import ReferenceDrawer from '../components/ReferenceDrawer'
import CoachingCheatSheet from '../components/CoachingCheatSheet'
import { useCourse } from '../context/CourseContext'
import { OUTCOME_TO_CHOICE } from '../data/assessmentFeedback'
import {
  REAL_SITUATIONS,
  REAL_SITUATIONS_COMPARE,
  REAL_SITUATIONS_TEXT_MIN,
} from '../data/realSituationsData'

const EMPTY_APPROACH = {
  lastChoiceId: null,
  resolved: false,
  correctId: null,
}

function emptyDraft() {
  return {
    approach: EMPTY_APPROACH,
    questionText: '',
    modelRevealed: false,
    step: 1,
  }
}

function completionCopy(doneCount) {
  if (doneCount >= 3) {
    return "You've worked through all three situations. You've practiced choosing the approach. The last skill is knowing when not to coach at all. Continue on."
  }
  return `Nice work. You've completed ${doneCount} of the situations. Try another, or continue on when you're ready.`
}

export default function P3bScenarioSelector() {
  const {
    setNextLocked,
    markComplete,
    currentId,
    getProgress,
    setProgress,
  } = useCourse()
  const progressKey = 'real-situations'
  const saved = getProgress(progressKey)

  const [activeId, setActiveId] = useState(() => saved?.activeId ?? null)
  const [step, setStep] = useState(() =>
    Number.isInteger(saved?.step) ? saved.step : 1,
  )
  const [approach, setApproach] = useState(() =>
    saved?.approach
      ? { ...EMPTY_APPROACH, ...saved.approach }
      : EMPTY_APPROACH,
  )
  const [questionText, setQuestionText] = useState(
    () => saved?.questionText ?? '',
  )
  const [modelRevealed, setModelRevealed] = useState(() =>
    Boolean(saved?.modelRevealed),
  )
  const [doneIds, setDoneIds] = useState(
    () => new Set(Array.isArray(saved?.doneIds) ? saved.doneIds : []),
  )
  const [drafts, setDrafts] = useState(() =>
    saved?.drafts && typeof saved.drafts === 'object' ? saved.drafts : {},
  )
  const [cheatOpen, setCheatOpen] = useState(false)
  const textareaId = useId()
  const cheatTriggerRef = useRef(null)
  const cheatReturnFocusRef = useRef(null)
  const feedbackRef = useRef(null)
  const nextArrowRef = useRef(null)
  const focusGeneration = useRef(0)

  function openCheatSheet(triggerEl) {
    cheatReturnFocusRef.current = triggerEl ?? null
    setCheatOpen(true)
  }

  const screenComplete = doneIds.size > 0
  const inFlow = Boolean(activeId)

  useEffect(() => {
    setProgress(progressKey, {
      activeId,
      step,
      approach,
      questionText,
      modelRevealed,
      doneIds: [...doneIds],
      drafts,
    })
  }, [
    activeId,
    step,
    approach,
    questionText,
    modelRevealed,
    doneIds,
    drafts,
    setProgress,
  ])

  useEffect(() => {
    setNextLocked(!screenComplete)
    return () => setNextLocked(false)
  }, [screenComplete, setNextLocked])

  useEffect(() => {
    if (screenComplete) markComplete(currentId)
  }, [screenComplete, markComplete, currentId])

  const active = useMemo(
    () => REAL_SITUATIONS.find((s) => s.id === activeId) ?? null,
    [activeId],
  )

  const approachMisses = useMemo(() => {
    if (!active || !approach.resolved || !approach.correctId) return []
    return active.choices.filter((c) => c.id !== approach.correctId)
  }, [active, approach.resolved, approach.correctId])

  function applyDraft(draft) {
    setApproach(draft.approach)
    setQuestionText(draft.questionText)
    setModelRevealed(draft.modelRevealed)
    setStep(draft.step)
  }

  function snapshotDraft() {
    return {
      approach,
      questionText,
      modelRevealed,
      step,
    }
  }

  function selectScenario(id) {
    const draft = drafts[id]
    if (draft?.approach?.resolved) {
      applyDraft(draft)
    } else {
      applyDraft(emptyDraft())
    }
    setActiveId(id)
  }

  function returnToOverview() {
    if (!activeId) return

    if (approach.resolved) {
      setDrafts((prev) => ({
        ...prev,
        [activeId]: snapshotDraft(),
      }))
    }

    if (modelRevealed) {
      setDoneIds((prev) => {
        if (prev.has(activeId)) return prev
        const next = new Set(prev)
        next.add(activeId)
        return next
      })
    }

    setActiveId(null)
  }

  function markSituationComplete(id) {
    setDoneIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  function handleApproach(choice) {
    if (approach.resolved) return

    setApproach((prev) => {
      const next = {
        ...prev,
        lastChoiceId: choice.id,
      }
      if (choice.outcome === 'correct') {
        next.resolved = true
        next.correctId = choice.id
      }
      return next
    })
  }

  function choiceState(choice) {
    if (approach.resolved) {
      if (choice.id === approach.correctId) return 'correct'
      return 'idle'
    }
    if (approach.lastChoiceId === choice.id) {
      return OUTCOME_TO_CHOICE[choice.outcome] ?? 'selected'
    }
    return 'idle'
  }

  function feedbackOpen(choice) {
    if (approach.resolved) {
      return choice.id === approach.correctId
    }
    return approach.lastChoiceId === choice.id
  }

  useEffect(() => {
    if (!approach.resolved) return undefined
    const generation = ++focusGeneration.current
    const id = window.setTimeout(() => {
      if (generation !== focusGeneration.current) return
      nextArrowRef.current?.focus?.()
    }, 30)
    return () => window.clearTimeout(id)
  }, [approach.resolved, activeId])

  function revealModel() {
    if (questionText.trim().length < REAL_SITUATIONS_TEXT_MIN) return
    setModelRevealed(true)
    if (activeId) markSituationComplete(activeId)
  }

  const canRevealModel =
    questionText.trim().length >= REAL_SITUATIONS_TEXT_MIN
  const canGoNextStep = approach.resolved

  return (
    <div className="real-situations">
      <div className="real-situations__top">
        <SectionHeading title="Real situations: what would you do?" />
        <Button
          ref={cheatTriggerRef}
          variant="ghost"
          className="real-situations__cheat-btn"
          aria-haspopup="dialog"
          aria-expanded={cheatOpen}
          onClick={() => openCheatSheet(cheatTriggerRef.current)}
        >
          <span aria-hidden="true">📋 </span>
          Cheat sheet
        </Button>
      </div>

      <ReferenceDrawer
        open={cheatOpen}
        onClose={() => setCheatOpen(false)}
        title="Coaching cheat sheet"
        returnFocusRef={cheatReturnFocusRef}
      >
        <CoachingCheatSheet />
      </ReferenceDrawer>

      {!inFlow ? (
        <div className="real-situations__overview">
          <p className="screen-lede real-situations__lede m-0">
            Put OSCAR, GROW, and powerful questions into practice.
          </p>

          <aside
            className="real-situations__task"
            role="note"
            aria-label="Your task"
          >
            <p className="real-situations__task-eyebrow m-0">Your task</p>
            <p className="real-situations__task-main m-0">
              Choose one situation, decide which approach fits, then write what
              you would say first.
            </p>
            <p className="real-situations__task-note m-0">
              *Complete one situation to continue. The other two are optional.
            </p>
          </aside>

          <div
            className="static-card-grid real-situations__grid"
            role="list"
            aria-label="Real situations"
          >
            {REAL_SITUATIONS.map((scenario, index) => {
              const done = doneIds.has(scenario.id)
              return (
                <Card
                  key={scenario.id}
                  interaction="interactive"
                  role="listitem"
                  tabIndex={0}
                  className={[
                    'real-situations__pick',
                    `static-card-grid__enter-${index + 1}`,
                    done ? 'is-done' : '',
                  ].join(' ')}
                  onClick={() => selectScenario(scenario.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectScenario(scenario.id)
                    }
                  }}
                  aria-label={`${scenario.title}. ${scenario.overview}${done ? ' Completed.' : ''} Explore situation.`}
                >
                  {done ? (
                    <span
                      className="real-situations__check"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                  ) : null}
                  <p className="real-situations__pick-title m-0">
                    {scenario.title}
                  </p>
                  <p className="real-situations__pick-body m-0">
                    {scenario.overview}
                  </p>
                  <p className="real-situations__pick-cue m-0" aria-hidden="true">
                    Explore situation →
                  </p>
                </Card>
              )
            })}
          </div>

          {doneIds.size > 0 ? (
            <ActivityCallout
              variant="complete"
              className="real-situations__completion"
            >
              <p className="m-0">{completionCopy(doneIds.size)}</p>
            </ActivityCallout>
          ) : null}
        </div>
      ) : null}

      {inFlow && active ? (
        <div className="real-situations__flow">
          <button
            type="button"
            className="real-situations__back"
            onClick={() => returnToOverview()}
          >
            ← Back to situations
          </button>

          <ScenarioContextCard
            className="real-situations__context"
            title={active.title}
          >
            <p className="m-0">{active.summary}</p>
          </ScenarioContextCard>

          {step === 1 ? (
            <section
              className="real-situations__step real-situations__step--enter"
              aria-label="Step 1"
            >
              <p className="guided-scenario__prompt">
                1. {active.approachPrompt}
              </p>

              <div className="guided-scenario__choices guided-scenario__choices--inline">
                {active.choices.map((choice) => {
                  const state = choiceState(choice)
                  const open = feedbackOpen(choice)
                  const outcomeClass =
                    OUTCOME_TO_CHOICE[choice.outcome] ?? 'incorrect'
                  const disabled = approach.resolved
                  const isFocusTarget = open

                  return (
                    <div
                      key={choice.id}
                      className={[
                        'guided-scenario__choice-block',
                        open ? 'has-feedback' : '',
                        `is-${outcomeClass}`,
                      ].join(' ')}
                    >
                      <ChoiceOption
                        state={state}
                        disabled={disabled}
                        lockState={approach.resolved}
                        className={
                          open ? 'guided-scenario__choice--attached' : ''
                        }
                        aria-describedby={
                          open ? `rs-feedback-${choice.id}` : undefined
                        }
                        onClick={() => handleApproach(choice)}
                      >
                        {choice.text}
                      </ChoiceOption>

                      <div id={`rs-feedback-${choice.id}`}>
                        <InlineOutcomeFeedback
                          outcome={choice.outcome}
                          message={choice.feedback}
                          open={open}
                          panelRef={feedbackRef}
                          isFocusTarget={isFocusTarget}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {approach.resolved && approachMisses.length > 0 ? (
                <AssessmentMissesPanel
                  choices={approachMisses}
                  allChoices={active.choices}
                  labelChoices={false}
                  variant="light-list"
                  title="Why the others fall short"
                />
              ) : null}

              <div className="match-quiz__nav match-quiz__nav--activity">
                <div className="match-quiz__nav-slot">
                  <span
                    className="guided-scenario__nav-spacer"
                    aria-hidden="true"
                  />
                </div>
                <div className="match-quiz__nav-slot match-quiz__nav-slot--end">
                  <button
                    ref={nextArrowRef}
                    type="button"
                    className={[
                      'guided-scenario__nav-arrow',
                      !canGoNextStep ? 'is-disabled' : '',
                    ].join(' ')}
                    aria-label={
                      canGoNextStep
                        ? 'Continue to next decision'
                        : 'Answer correctly to continue'
                    }
                    title={
                      canGoNextStep
                        ? 'Continue to next decision'
                        : 'Answer correctly to continue'
                    }
                    disabled={!canGoNextStep}
                    onClick={() => {
                      if (!canGoNextStep) return
                      setStep(2)
                    }}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section
              className="real-situations__step real-situations__step--enter"
              aria-label="Step 2"
            >
              <p className="guided-scenario__prompt m-0 mb-4">
                2. Write the first question you&apos;d ask.
              </p>

              <div className="real-situations__response">
                <label
                  htmlFor={textareaId}
                  className="real-situations__response-label"
                >
                  Your response
                </label>
                <textarea
                  id={textareaId}
                  className="real-situations__textarea"
                  rows={3}
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  disabled={modelRevealed}
                  placeholder="Your opening question…"
                />

                {!modelRevealed ? (
                  <div className="real-situations__response-action">
                    <Button
                      variant="primary"
                      disabled={!canRevealModel}
                      onClick={revealModel}
                    >
                      Compare with a model
                    </Button>
                  </div>
                ) : null}
              </div>

              {modelRevealed ? (
                <div className="real-situations__model-wrap">
                  <DetailedAnswerPanel
                    label="Model response"
                    primary={<>&ldquo;{active.modelQuestion}&rdquo;</>}
                    explanation={active.modelWhy}
                    checklistLead={REAL_SITUATIONS_COMPARE.lead}
                    checklist={REAL_SITUATIONS_COMPARE.bullets}
                    note={REAL_SITUATIONS_COMPARE.note}
                    tone="feedback"
                  />
                </div>
              ) : null}

              <div className="match-quiz__nav match-quiz__nav--activity">
                <div className="match-quiz__nav-slot">
                  <button
                    type="button"
                    className="guided-scenario__nav-arrow"
                    aria-label="Previous decision"
                    onClick={() => setStep(1)}
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                </div>
                <div className="match-quiz__nav-slot match-quiz__nav-slot--end">
                  <span
                    className="guided-scenario__nav-spacer"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
