import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import KeyIdea from '../components/KeyIdea'
import ActivityCallout from '../components/ActivityCallout'

const COACH_ITEMS = [
  'The person can help shape the answer',
  'Reflection will improve future performance',
  'There is time to explore options',
  'The goal is learning and ownership',
]

const DIRECT_ITEMS = [
  'Safety or compliance is at risk',
  'Immediate action is required',
  'The standard is non-negotiable',
  'The decision belongs to the manager',
]

export default function P3bWhenNotApply() {
  return (
    <div className="when-not-coach screen-stack">
      <div className="screen-stack__intro">
        <SectionHeading title="When to coach, and when to direct" />
        <p className="screen-lede m-0">
          Coaching works when there is room to think, learn, and take ownership.
          Directing is the better choice when clarity, safety, or an immediate
          decision matters most.
        </p>
      </div>

      <div
        className="when-not-coach__pair"
        role="list"
        aria-label="When to coach and when to direct"
      >
        <Card
          interaction="informational"
          role="listitem"
          className="when-not-coach__card static-card-grid__enter-1"
        >
          <p className="when-not-coach__card-label m-0">Coach when</p>
          <ul className="when-not-coach__list m-0">
            {COACH_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="when-not-coach__example-label m-0">Example</p>
          <p className="when-not-coach__example m-0">
            &ldquo;What do you think is causing the issue?&rdquo;
          </p>
        </Card>

        <Card
          interaction="informational"
          role="listitem"
          className="when-not-coach__card static-card-grid__enter-2"
        >
          <p className="when-not-coach__card-label m-0">Direct when</p>
          <ul className="when-not-coach__list m-0">
            {DIRECT_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="when-not-coach__example-label m-0">Example</p>
          <p className="when-not-coach__example m-0">
            &ldquo;Stop the process now. We&apos;ll review what happened
            afterward.&rdquo;
          </p>
        </Card>
      </div>

      <KeyIdea label="Key decision" className="when-not-coach__decision">
        <p className="m-0 mb-2">
          Ask: &ldquo;Is this a moment for thinking—or a moment for clarity?&rdquo;
        </p>
        <p className="m-0 when-not-coach__decision-support">
          Direct now when the situation requires it. Coach before or after when
          reflection can help.
        </p>
      </KeyIdea>

      <ActivityCallout
        variant="part-complete"
        className="when-not-coach__complete"
      >
        <p className="m-0 mb-2">
          You can now choose an approach, structure a coaching conversation, and
          know when coaching is not the right move.
        </p>
        <p className="m-0 when-not-coach__complete-next">
          Next: review what you learned and take the tools with you.
        </p>
      </ActivityCallout>
    </div>
  )
}
