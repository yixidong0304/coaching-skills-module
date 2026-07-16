import SectionHeading from '../components/SectionHeading'
import {
  IconConversation,
  IconMagnifier,
  IconListening,
  IconGrowth,
  IconCheck,
  IconStar,
  IconTarget,
} from '../components/CourseIcons'

const JOURNEY_NODES = [
  {
    label: 'What coaching is',
    support: 'Understand the mindset and when it fits.',
    Icon: IconConversation,
    tone: 'mint',
  },
  {
    label: 'OSCAR',
    support: 'Structure feedback that drives clarity and action.',
    Icon: IconMagnifier,
    tone: 'mint',
  },
  {
    label: 'Listening & questions',
    support: 'Listen actively and ask powerful questions.',
    Icon: IconListening,
    tone: 'mint',
  },
  {
    label: 'GROW',
    support: 'Guide short coaching conversations that move people forward.',
    Icon: IconGrowth,
    tone: 'forest',
  },
]

const KEY_TAKEAWAYS = [
  'Coaching works even under time pressure.',
  'Coaching conversations can lead to sustainable improvement.',
  'One good question can be more effective than a long explanation.',
]

const ACTION_PLAN = [
  'One coaching question I will use in my next work day',
  'Choose one situation where you will try OSCAR or GROW',
  'Notice the impact—and iterate',
]

/**
 * wrap-1 — Approved journey infographic + Key Takeaways / Action Plan panel.
 */
function WrapKeyTakeaways() {
  return (
    <div className="module-journey">
      <div className="module-journey__inner">
        <header className="module-journey__header">
          <SectionHeading title="You're ready to coach." />
          <p className="module-journey__intro m-0">
            Here&apos;s the big picture—your toolkit for everyday leadership
            conversations.
          </p>
        </header>

        <ol className="module-map" aria-label="Your learning journey">
          {JOURNEY_NODES.map((node, index) => {
            const Icon = node.Icon
            return (
              <li
                key={node.label}
                className={[
                  'module-map__step',
                  `module-map__step--${index + 1}`,
                  `module-map__step--${node.tone}`,
                ].join(' ')}
              >
                {index > 0 ? (
                  <div
                    className={`module-map__connector module-map__connector--${index}`}
                    aria-hidden="true"
                  />
                ) : null}
                <div className="module-map__node">
                  <span
                    className={[
                      'module-map__icon-circle',
                      node.tone === 'forest'
                        ? 'module-map__icon-circle--forest'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-hidden="true"
                  >
                    <Icon size={54} />
                  </span>
                  <p className="module-map__label m-0">
                    {index + 1}. {node.label}
                  </p>
                  <p className="module-map__support m-0">{node.support}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <aside
          className="journey-panel"
          aria-label="Key takeaways and your action plan"
        >
          <section
            className="journey-panel__col journey-panel__col--takeaways"
            aria-labelledby="key-takeaways-heading"
          >
            <header className="journey-panel__heading">
              <span className="journey-panel__heading-icon" aria-hidden="true">
                <IconStar size={28} />
              </span>
              <h2 id="key-takeaways-heading" className="journey-panel__title m-0">
                Key takeaways
              </h2>
            </header>
            <ul className="journey-panel__list m-0 list-none p-0">
              {KEY_TAKEAWAYS.map((item, index) => (
                <li
                  key={item}
                  className={`journey-panel__item journey-panel__item--${index + 1}`}
                >
                  <span className="journey-panel__check" aria-hidden="true">
                    <IconCheck size={18} />
                  </span>
                  <p className="journey-panel__text m-0">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="journey-panel__divider" aria-hidden="true" />

          <section
            className="journey-panel__col journey-panel__col--actions"
            aria-labelledby="action-plan-heading"
          >
            <header className="journey-panel__heading">
              <span className="journey-panel__heading-icon" aria-hidden="true">
                <IconTarget size={28} />
              </span>
              <h2 id="action-plan-heading" className="journey-panel__title m-0">
                Your action plan
              </h2>
            </header>
            <ol className="journey-panel__list journey-panel__list--actions m-0 list-none p-0">
              {ACTION_PLAN.map((item, index) => (
                <li
                  key={item}
                  className={`journey-panel__item journey-panel__item--${index + 1}`}
                >
                  <span className="journey-panel__num" aria-hidden="true">
                    {index + 1}
                  </span>
                  <p className="journey-panel__text m-0">{item}</p>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  )
}

WrapKeyTakeaways.fullBleed = true

export default WrapKeyTakeaways
