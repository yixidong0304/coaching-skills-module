import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import KeyIdea from '../components/KeyIdea'

const HABITS = [
  {
    title: 'Attention',
    cue: 'Focus',
    body: 'Give the person your full attention, even in a short conversation. Put distractions aside.',
  },
  {
    title: 'Pause',
    cue: 'Wait',
    body: 'Leave room for silence. The pause is often where thinking happens.',
  },
  {
    title: 'Show it',
    cue: 'Signal',
    body: 'Use eye contact, nodding, and other small signals to show you are present.',
  },
  {
    title: 'Summarize',
    cue: 'Reflect back',
    body: 'Play back what you heard to confirm you understood it correctly.',
  },
]

export default function P2bListenActively() {
  return (
    <div className="listening-habits-screen screen-stack">
      <div className="screen-stack__intro">
        <SectionHeading title="How to listen actively" />
        <p className="screen-lede m-0">
          Active listening comes down to four small habits—even in a two-minute
          conversation.
        </p>
      </div>

      <div
        className="static-card-grid listening-habits"
        role="list"
        aria-label="Active listening habits"
      >
        {HABITS.map((habit, index) => (
          <Card
            key={habit.title}
            interaction="informational"
            role="listitem"
            className={[
              'listening-habits__card',
              `static-card-grid__enter-${index + 1}`,
            ].join(' ')}
          >
            <div className="listening-habits__header">
              <p className="listening-habits__title m-0 text-h2 font-semibold">
                {habit.title}
              </p>
              <p className="listening-habits__cue m-0">{habit.cue}</p>
            </div>
            <p className="listening-habits__body m-0 text-body">{habit.body}</p>
          </Card>
        ))}
      </div>

      <KeyIdea>
        Active listening is visible. People can tell when you are present,
        patient, and following their thinking.
      </KeyIdea>
    </div>
  )
}
