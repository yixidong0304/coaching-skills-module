import SectionHeading from '../components/SectionHeading'
import TakeawayCallout from '../components/TakeawayCallout'

export default function P3bWhenNotApply() {
  return (
    <div className="when-not-coach">
      <SectionHeading title="When to coach, and when not to" />

      <p className="m-0 mb-8 max-w-prose text-body text-ink when-not-coach__body">
        Coaching doesn&apos;t replace clear direction. In a crisis, a
        safety-critical moment, or a decision that&apos;s yours to make, you tell
        clearly and without apology. Coaching comes before (to prepare people)
        or after (to learn from it), not in the middle of the emergency.
      </p>

      <TakeawayCallout>
        Knowing when NOT to coach is part of the skill.
      </TakeawayCallout>
    </div>
  )
}
