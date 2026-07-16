import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import KeyIdea from '../components/KeyIdea'
import { consumeEnterFromDivider } from '../lib/dividerTransition'

export default function P2aFeedbackConversation() {
  const [enterFromDivider] = useState(() => consumeEnterFromDivider())

  return (
    <div
      className={enterFromDivider ? 'screen--from-divider' : undefined}
    >
      <SectionHeading title="Feedback is a conversation, not a monologue" />

      <p className="screen-lede m-0">
        Feedback can feel like blame when it only tells someone what went wrong.
        Coaching feedback combines clear observations with thoughtful questions,
        creating space for reflection, learning, and response.
      </p>

      <div
        className="contrast-pair"
        role="group"
        aria-label="Statement becomes a coaching question"
      >
        <div className="contrast-pair__enter-statement">
          <Card className="contrast-pair__card contrast-pair__card--from">
            <p className="contrast-pair__label m-0">Statement</p>
            <p className="contrast-pair__quote m-0">This keeps happening.</p>
          </Card>
        </div>

        <div
          className="contrast-pair__arrow contrast-pair__enter-arrow"
          aria-hidden="true"
        >
          <span className="hidden sm:inline">→</span>
          <span className="sm:hidden">↓</span>
        </div>

        <div className="contrast-pair__enter-question">
          <Card className="contrast-pair__card contrast-pair__card--to">
            <p className="contrast-pair__label m-0">Coaching question</p>
            <p className="contrast-pair__quote m-0">
              When does this usually happen?
            </p>
          </Card>
        </div>
      </div>

      <KeyIdea>
        A statement names what happened; a{' '}
        <strong className="key-idea__hl">thoughtful question</strong> opens
        space to understand it.
      </KeyIdea>
    </div>
  )
}
