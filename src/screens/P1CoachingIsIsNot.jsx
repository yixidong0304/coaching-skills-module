import { Fragment, useState } from 'react'
import { consumeEnterFromDivider } from '../lib/dividerTransition'
import SectionHeading from '../components/SectionHeading'
import KeyIdea from '../components/KeyIdea'

const ROWS = [
  {
    is: "Supporting people's thinking instead of handing them the answer",
    isNot:
      'A long, formal one-to-one every time—it can happen in minutes',
  },
  {
    is: 'Strengthening ownership and accountability',
    isNot: 'Ignoring standards, quality, or expectations',
  },
  {
    is: 'Helping people learn from everyday situations',
    isNot: 'A replacement for a clear decision when one is needed',
  },
]

export default function P1CoachingIsIsNot() {
  const [enterFromDivider] = useState(() => consumeEnterFromDivider())

  return (
    <div
      className={[
        'part1-screen',
        'screen-stack',
        enterFromDivider ? 'screen--from-divider' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="screen-stack__intro">
        <SectionHeading title="What coaching is, and isn't" />
        <p className="screen-lede m-0">
          Coaching helps people think through situations and take ownership,
          rather than relying on the manager to provide every answer.
        </p>
      </div>

      <div
        className="is-not-grid"
        role="group"
        aria-label="Coaching IS and IS NOT"
      >
        <p className="is-not-grid__heading m-0">Coaching IS</p>
        <p className="is-not-grid__heading m-0">Coaching is NOT</p>

        {ROWS.map((row, index) => (
          <Fragment key={row.is}>
            <div
              className={`is-not-grid__card is-not-grid__card--is is-not-grid__enter-${index + 1}`}
            >
              <span className="is-not-grid__mark" aria-hidden="true">
                ✓
              </span>
              <span className="is-not-grid__text">{row.is}</span>
            </div>
            <div
              className={`is-not-grid__card is-not-grid__card--not is-not-grid__enter-not-${index + 1}`}
            >
              <span className="is-not-grid__mark" aria-hidden="true">
                ✕
              </span>
              <span className="is-not-grid__text">{row.isNot}</span>
            </div>
          </Fragment>
        ))}
      </div>

      <KeyIdea>
        Coaching starts with curiosity: focus on the{' '}
        <strong className="key-idea__hl">person&apos;s thinking</strong>, not
        just the immediate problem.
      </KeyIdea>
    </div>
  )
}
