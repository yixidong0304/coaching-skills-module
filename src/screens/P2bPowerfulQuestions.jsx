import { useRef, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Caption from '../components/Caption'
import Button from '../components/Button'
import FamilyQuestionModal from '../components/FamilyQuestionModal'
import { QUESTION_FAMILIES, STUCK_CALLOUT } from '../data/questionBank'

export default function P2bPowerfulQuestions() {
  const [activeName, setActiveName] = useState(null)
  const triggerRefs = useRef({})
  const returnFocusRef = useRef(null)

  function openFamily(name) {
    returnFocusRef.current = triggerRefs.current[name] ?? null
    setActiveName(name)
  }

  function closeModal() {
    setActiveName(null)
  }

  return (
    <div className="question-families-screen">
      <SectionHeading title="Four kinds of powerful questions" />

      <p className="m-0 mb-6 max-w-prose text-body text-ink">
        You do not need a perfect question. You need the right kind at the right
        moment. These four families cover most everyday coaching conversations.
      </p>

      <Caption className="mb-3">
        Preview each family below. Open a card to explore the full question
        bank.
      </Caption>

      <div
        className="static-card-grid question-families"
        role="list"
        aria-label="Families of powerful questions"
      >
        {QUESTION_FAMILIES.map((family, index) => {
          const isOpen = activeName === family.name
          return (
            <Card
              key={family.name}
              interaction="interactive"
              role="listitem"
              tabIndex={0}
              ref={(node) => {
                triggerRefs.current[family.name] = node
              }}
              className={[
                'question-families__card',
                isOpen ? 'question-families__card--open' : '',
                `static-card-grid__enter-${index + 1}`,
              ]
                .filter(Boolean)
                .join(' ')}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              onClick={() => openFamily(family.name)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  openFamily(family.name)
                }
              }}
            >
              <div className="question-families__card-top">
                <p className="question-families__title m-0 text-h2 font-semibold">
                  {family.name}
                </p>
                {isOpen ? (
                  <span className="question-families__badge">Viewing</span>
                ) : null}
              </div>
              <p className="question-families__body m-0 mb-4 text-body">
                {family.does}
              </p>
              <p className="question-families__stems m-0 text-body-sm">
                {family.stems.map((stem, i) => (
                  <span key={stem}>
                    {i > 0 ? (
                      <span aria-hidden="true">
                        {' '}
                        ·{' '}
                      </span>
                    ) : null}
                    <span className="static-card-grid__stem">
                      &ldquo;{stem}&rdquo;
                    </span>
                  </span>
                ))}
              </p>
              <p className="question-families__hint m-0 text-caption font-medium">
                View full question bank →
              </p>
            </Card>
          )
        })}
      </div>

      <div className="question-families__download-row">
        <div className="question-families__download">
          <Button
            variant="primary"
            href="/downloads/question_card.png"
            download="question_card.png"
          >
            Download question library
          </Button>
        </div>
        <Caption className="question-families__download-copy whitespace-nowrap max-[700px]:whitespace-normal">
          Keep the full printable bank open during your next coaching conversation.
        </Caption>
      </div>

      <aside className="coaching-move" role="note" aria-label="Coaching move">
        <p className="coaching-move__label m-0">{STUCK_CALLOUT.label}</p>
        <p className="coaching-move__lead m-0">{STUCK_CALLOUT.lead}</p>
        <p className="coaching-move__question m-0">
          &ldquo;{STUCK_CALLOUT.question}&rdquo;
        </p>
        <p className="coaching-move__caption m-0">{STUCK_CALLOUT.caption}</p>
      </aside>

      <FamilyQuestionModal
        familyName={activeName}
        open={Boolean(activeName)}
        onClose={closeModal}
        returnFocusRef={returnFocusRef}
      />
    </div>
  )
}
