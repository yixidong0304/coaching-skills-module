import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Caption from '../components/Caption'

const JOURNEY_NODES = [
  {
    label: 'What coaching is',
    summary: 'Asking, not telling, and knowing when each fits.',
  },
  {
    label: 'OSCAR',
    summary:
      'Feedback as a conversation: Observation → Specific → Consequences → Actions → Results.',
  },
  {
    label: 'Listening & questions',
    summary:
      'The container and what you do inside it: four question families.',
  },
  {
    label: 'GROW',
    summary: 'A whole coaching conversation in four moves, hallway-sized.',
  },
  {
    label: 'Real situations',
    summary: 'Choosing the approach, and knowing when not to coach.',
  },
]

const TAKEAWAY_ROW =
  'Coaching works under time pressure · One good question can beat a long explanation · Small moments build long-term capability.'

/**
 * wrap-1 — Module map journey (replaces BreathScreen takeaways).
 * Full-bleed canvas panel; inner content centered at content max-width.
 */
function WrapKeyTakeaways() {
  return (
    <div className="module-journey">
      <div className="module-journey__inner">
        <SectionHeading title="The whole module, at a glance" />

        <p className="m-0 mb-8 max-w-prose text-body text-ink">
          Here&apos;s the ground you just covered, and how it fits together.
        </p>

        <ol className="module-map" aria-label="Module map">
          {JOURNEY_NODES.map((node, index) => (
            <li
              key={node.label}
              className={`module-map__step module-map__step--${index + 1}`}
            >
              {index > 0 ? (
                <div
                  className={`module-map__connector module-map__connector--${index}`}
                  aria-hidden="true"
                />
              ) : null}
              <Card className="module-map__card">
                <p className="module-map__label m-0">{node.label}</p>
                <p className="module-map__summary m-0">{node.summary}</p>
              </Card>
            </li>
          ))}
        </ol>

        <Caption className="module-journey__takeaways mt-8">
          {TAKEAWAY_ROW}
        </Caption>
      </div>
    </div>
  )
}

WrapKeyTakeaways.fullBleed = true

export default WrapKeyTakeaways
