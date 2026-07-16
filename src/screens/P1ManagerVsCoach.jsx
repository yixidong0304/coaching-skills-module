import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import KeyIdea from '../components/KeyIdea'

const MODES = [
  {
    label: 'MANAGER MODE',
    heading: 'Focus on execution and outcomes.',
    body: 'Set priorities, allocate resources, make decisions, and ensure work is completed safely, on time, and to standard.',
  },
  {
    label: 'COACH MODE',
    heading: 'Focus on capability and growth.',
    body: 'Create space for people to think, learn from experience, and take greater ownership through questions and feedback.',
  },
]

export default function P1ManagerVsCoach() {
  return (
    <div className="part1-screen screen-stack">
      <div className="screen-stack__intro">
        <SectionHeading title="Same leader, two modes" />
        <p className="screen-lede m-0">
          Directing and coaching are not separate roles. They are two modes the
          same leader uses.
        </p>
      </div>

      <div
        className="hats-pair"
        role="group"
        aria-label="Manager mode and coach mode"
      >
        <Card
          interaction="informational"
          className="hats-pair__card static-card-grid__enter-1"
        >
          <p className="hats-pair__label m-0">{MODES[0].label}</p>
          <p className="hats-pair__title m-0 mb-2">{MODES[0].heading}</p>
          <p className="hats-pair__body m-0">{MODES[0].body}</p>
        </Card>

        <div
          className="hats-pair__bridge static-card-grid__enter-2"
          aria-hidden="true"
        >
          <span className="hats-pair__bridge-glyph hats-pair__bridge-glyph--desk">
            ↔
          </span>
          <span className="hats-pair__bridge-glyph hats-pair__bridge-glyph--mob">
            ↕
          </span>
          <span className="hats-pair__bridge-caption">move between</span>
        </div>

        <Card
          interaction="informational"
          className="hats-pair__card static-card-grid__enter-3"
        >
          <p className="hats-pair__label m-0">{MODES[1].label}</p>
          <p className="hats-pair__title m-0 mb-2">{MODES[1].heading}</p>
          <p className="hats-pair__body m-0">{MODES[1].body}</p>
        </Card>
      </div>

      <KeyIdea>
        Coaching{' '}
        <strong className="key-idea__hl">does not replace managing</strong>.
        Strong leaders move between both modes deliberately.
      </KeyIdea>
    </div>
  )
}
