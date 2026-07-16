import SectionHeading from '../components/SectionHeading'
import KeyIdea from '../components/KeyIdea'
import { Fragment } from 'react'

const STAGES = [
  {
    id: 'listen',
    label: 'Listen',
    heading: 'Hear what the person is really saying.',
    body: 'Pay attention to their words, tone, and what may be underneath the problem.',
  },
  {
    id: 'ask',
    label: 'Ask',
    heading: 'Ask a question based on what you heard.',
    body: 'Help the person clarify the situation and think about what to do next.',
  },
  {
    id: 'listen-again',
    label: 'Listen again',
    heading: 'Listen closely to the answer.',
    body: 'Use their response to decide what to ask or explore next.',
  },
]

function RhythmArrow({ enterClass }) {
  return (
    <div
      className={['listening-rhythm__arrow', enterClass].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <svg
        className="listening-rhythm__arrow-icon listening-rhythm__arrow-icon--h"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12h14m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="listening-rhythm__arrow-icon listening-rhythm__arrow-icon--v"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4v14m0 0-5-5m5 5 5-5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function P2bHowTheyRelate() {
  return (
    <div className="listening-relate screen-stack">
      <div className="screen-stack__intro">
        <SectionHeading title="Listening makes questions work" />
        <p className="screen-lede m-0">
          Powerful questions only help when they respond to what the other person
          actually said. Coaching moves in a simple rhythm: listen, ask from what
          you heard, then listen again.
        </p>
      </div>

      <div
        className="listening-rhythm"
        role="list"
        aria-label="Coaching rhythm: listen, ask, listen again"
      >
        {STAGES.map((stage, index) => (
          <Fragment key={stage.id}>
            {index > 0 ? (
              <RhythmArrow enterClass={`listening-rhythm__enter-arrow-${index}`} />
            ) : null}

            <article
              role="listitem"
              className={[
                'listening-rhythm__stage',
                `listening-rhythm__enter-stage-${index + 1}`,
              ].join(' ')}
            >
              <p className="listening-rhythm__label m-0">
                <span className="listening-rhythm__step" aria-hidden="true">
                  {index + 1}
                </span>
                {stage.label}
              </p>

              <h2 className="listening-rhythm__heading m-0">{stage.heading}</h2>

              <p className="listening-rhythm__body m-0">{stage.body}</p>
            </article>
          </Fragment>
        ))}
      </div>

      <KeyIdea>
        Good coaching is not a list of prepared questions. It is a responsive
        conversation.
      </KeyIdea>
    </div>
  )
}
