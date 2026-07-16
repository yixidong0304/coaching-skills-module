import Card from '../components/Card'
import slidesPreview from '../assets/slides_preview.png'
import cardsPreview from '../assets/cards_preview.png'
import {
  IconBalance,
  IconFeedback,
  IconQuestion,
  IconGrowth,
  IconCompass,
} from '../components/CourseIcons'

const SKILLS = [
  {
    headline: 'Coach vs. direct',
    body: 'Know when to coach, when to direct, and why it matters.',
    Icon: IconBalance,
  },
  {
    headline: 'Feedback with OSCAR',
    body: 'Give feedback that opens a constructive conversation.',
    Icon: IconFeedback,
  },
  {
    headline: 'Powerful questions',
    body: 'Ask questions that help people reflect and think forward.',
    Icon: IconQuestion,
  },
  {
    headline: 'Structure with GROW',
    body: 'Guide a short coaching conversation with GROW.',
    Icon: IconGrowth,
  },
  {
    headline: 'Apply the right approach',
    body: 'Choose the right tool for the situation in front of you.',
    Icon: IconCompass,
  },
]

const MATERIALS = [
  {
    title: 'Course slides',
    body: 'The complete slide deck behind this module, as a PDF.',
    image: slidesPreview,
    alt: 'Preview of the course slides',
  },
  {
    title: 'Coaching skills cards',
    body: 'Three printable cards: OSCAR, the question library, and GROW.',
    image: cardsPreview,
    alt: 'Preview of the coaching skills cards',
  },
]

/**
 * intro-2 — Skills overview + materials teaser.
 */
export default function IntroWhatYoullLearn() {
  return (
    <div className="intro-learn">
      <section className="intro-learn__section">
        <header className="intro-learn__section-header">
          <h2 className="intro-learn__heading m-0">Skills you&apos;ll learn</h2>
        </header>
        <div
          className="intro-learn__skills"
          role="list"
          aria-label="Skills you'll learn"
        >
          {SKILLS.map((skill, index) => {
            const Icon = skill.Icon
            return (
              <Card
                key={skill.headline}
                interaction="informational"
                role="listitem"
                className={[
                  'intro-learn__skill-card',
                  `intro-learn__enter-${index + 1}`,
                ].join(' ')}
              >
                <span className="intro-learn__skill-icon" aria-hidden="true">
                  <Icon size={30} />
                </span>
                <p className="intro-learn__skill-title m-0">{skill.headline}</p>
                <p className="intro-learn__skill-body m-0">{skill.body}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="intro-learn__section intro-learn__section--materials">
        <header className="intro-learn__materials-header">
          <div className="intro-learn__materials-heading-row">
            <h2 className="intro-learn__heading m-0">
              Materials you&apos;ll get
            </h2>
            <span className="intro-learn__materials-pill">
              Available at the end
            </span>
          </div>
        </header>
        <p className="intro-learn__lead m-0">
          You&apos;ll receive a full slide deck and three printable coaching
          skills cards at the end of the course.
        </p>
        <div
          className="intro-learn__materials"
          role="list"
          aria-label="Materials you'll get"
        >
          {MATERIALS.map((item, index) => (
            <div
              key={item.title}
              className="intro-learn__material-enter"
              role="listitem"
            >
              <Card
                interaction="none"
                className="intro-learn__material-card intro-learn__material-card--preview"
              >
                <div className="intro-learn__material-text">
                  <p className="intro-learn__skill-title m-0">{item.title}</p>
                  <p className="intro-learn__skill-body m-0">{item.body}</p>
                </div>
                <div
                  className={[
                    'asset-preview',
                    'asset-preview--teaser',
                    index % 2 === 1 ? 'asset-preview--alt' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="asset-preview__img"
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
