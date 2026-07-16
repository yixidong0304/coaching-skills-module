import { useEffect, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import OscarStepHeader from '../components/OscarStepHeader'
import WorkedExample from '../components/WorkedExample'
import { useCourse } from '../context/CourseContext'
import useScreenEntrance from '../hooks/useScreenEntrance'

const OSCAR_STEPS = [
  {
    letter: 'O',
    name: 'Observation',
    guidance: [
      'Share only what you personally observed.',
      'State facts, not hearsay or interpretation.',
    ],
    example:
      'From the back of the room, I noticed you spent much of the presentation looking down rather than at the audience.',
  },
  {
    letter: 'S',
    name: 'Specific',
    guidance: [
      'Name one or two facts the person can act on.',
      'Avoid piling on too many improvement points.',
    ],
    example:
      'A few times, your voice dropped enough that it was difficult to hear from the back.',
  },
  {
    letter: 'C',
    name: 'Consequences',
    guidance: [
      'Ask what impact the behavior had.',
      'Share your perspective only if they are stuck, and ask permission first.',
    ],
    example:
      'What effect do you think that had on how the message landed? For me, it became harder to follow your main point.',
  },
  {
    letter: 'A',
    name: 'Actions',
    guidance: [
      'Ask what they could do differently next time.',
      'Use open “what” and “how” questions.',
    ],
    example:
      'How might you approach it differently next time? What would help you look up more often and keep your voice steady?',
  },
  {
    letter: 'R',
    name: 'Results',
    guidance: [
      'Ask how the new action could change the outcome.',
      'Keep the learner focused on the future result.',
    ],
    example:
      'How would that change the way the presentation lands with the audience?',
  },
]

const LOCK_HINT = 'Step through all five to continue.'
const TOTAL_STEPS = OSCAR_STEPS.length

export default function P2aOscarStepByStep() {
  const {
    setNextLocked,
    markComplete,
    currentId,
    getProgress,
    setProgress,
  } = useCourse()
  const entrancePhase = useScreenEntrance(700)
  const progressKey = 'oscar-steps'
  const saved = getProgress(progressKey)

  const [stepIndex, setStepIndex] = useState(() =>
    Number.isInteger(saved?.stepIndex) ? saved.stepIndex : 0,
  )
  const [visited, setVisited] = useState(() => {
    const fromSave = Array.isArray(saved?.visited) ? saved.visited : [0]
    return new Set(fromSave.includes(0) ? fromSave : [...fromSave, 0])
  })
  const [enterDir, setEnterDir] = useState('initial')

  const step = OSCAR_STEPS[stepIndex]
  const isFirst = stepIndex === 0
  const isLast = stepIndex === TOTAL_STEPS - 1
  const allVisited = visited.size >= TOTAL_STEPS

  function goToStep(index) {
    const next = Math.max(0, Math.min(TOTAL_STEPS - 1, index))
    if (next === stepIndex) return
    setEnterDir(next > stepIndex ? 'forward' : 'back')
    setStepIndex(next)
    setVisited((prev) => {
      if (prev.has(next)) return prev
      const copy = new Set(prev)
      copy.add(next)
      return copy
    })
  }

  useEffect(() => {
    setProgress(progressKey, {
      stepIndex,
      visited: [...visited],
    })
  }, [stepIndex, visited, setProgress])

  useEffect(() => {
    setNextLocked(!allVisited, allVisited ? null : LOCK_HINT)
    return () => setNextLocked(false)
  }, [allVisited, setNextLocked])

  useEffect(() => {
    if (allVisited) markComplete(currentId)
  }, [allVisited, markComplete, currentId])

  return (
    <div className={['oscar-walkthrough', 'ia-practice', entrancePhase].join(' ')}>
      <SectionHeading title="OSCAR, step by step" />

      <p className="screen-lede m-0">
        Use the arrows or select a letter to build the conversation step by
        step.
      </p>

      <div className="oscar-framework-nav" aria-label="OSCAR step navigation">
        <div className="oscar-framework-nav__slot">
          <button
            type="button"
            className={[
              'guided-scenario__nav-arrow',
              'ia-arrow',
              isFirst ? 'is-disabled' : '',
            ].join(' ')}
            aria-label="Previous OSCAR step"
            disabled={isFirst}
            onClick={() => goToStep(stepIndex - 1)}
          >
            <span aria-hidden="true">←</span>
          </button>
        </div>

        <OscarStepHeader
          className="oscar-framework-nav__header"
          letters={OSCAR_STEPS.map((s) => s.letter)}
          stepNames={OSCAR_STEPS.map((s) => s.name)}
          stepIndex={stepIndex}
          stepName={step.name}
          visitedIndices={[...visited]}
          highlightMode="visited"
          onSelect={goToStep}
          ariaLabel="OSCAR steps"
        />

        <div className="oscar-framework-nav__slot oscar-framework-nav__slot--end">
          <button
            type="button"
            className={[
              'guided-scenario__nav-arrow',
              'ia-arrow',
              isLast ? 'is-disabled' : '',
            ].join(' ')}
            aria-label="Next OSCAR step"
            disabled={isLast}
            onClick={() => goToStep(stepIndex + 1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        key={stepIndex}
        className={['oscar-walkthrough__body', 'ia-stage', `is-${enterDir}`].join(
          ' ',
        )}
      >
        <WorkedExample
          stepKey={stepIndex}
          leftHeading="Your move"
          rightHeading="Conversation so far"
          guidance={step.guidance}
          lines={OSCAR_STEPS.map((s) => s.example)}
          activeIndex={stepIndex}
          showFuture={false}
          onSelectLine={goToStep}
        />
      </div>
    </div>
  )
}
