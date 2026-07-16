import Card from '../components/Card'
import slidesPreview from '../assets/slides_preview.png'
import cardsPreview from '../assets/cards_preview.png'

const SKILLS = [
  {
    headline: 'Coach vs. direct',
    body: (
      <>
        Tell when to <strong className="intro-learn__hl">coach</strong> and when
        to just <strong className="intro-learn__hl">direct</strong>, and why it
        matters.
      </>
    ),
  },
  {
    headline: 'Feedback with OSCAR',
    body: (
      <>
        Give feedback that opens a conversation, using the{' '}
        <strong className="intro-learn__hl">OSCAR framework</strong>.
      </>
    ),
  },
  {
    headline: 'Powerful questions',
    body: (
      <>
        Ask <strong className="intro-learn__hl">powerful questions</strong> that
        get people thinking.
      </>
    ),
  },
  {
    headline: 'Structure with GROW',
    body: (
      <>
        Run a short coaching conversation with the{' '}
        <strong className="intro-learn__hl">GROW framework</strong>.
      </>
    ),
  },
  {
    headline: 'The right approach',
    body: (
      <>
        Pick the right approach for the{' '}
        <strong className="intro-learn__hl">real situations</strong> you face.
      </>
    ),
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
    body: 'Three printable one-page cards: the OSCAR framework, the question library, and the GROW framework.',
    image: cardsPreview,
    alt: 'Preview of the coaching skills cards',
  },
]

/**
 * intro-2 — Skills + materials overview (previews only; downloads at wrap-2).
 */
export default function IntroWhatYoullLearn() {
  return (
    <div className="intro-learn">
      <section className="intro-learn__section">
        <header className="mb-6">
          <h2 className="intro-learn__heading m-0">Skills you&apos;ll learn</h2>
        </header>
        <div
          className="intro-learn__skills"
          role="list"
          aria-label="Skills you'll learn"
        >
          {SKILLS.map((skill, index) => (
            <Card
              key={skill.headline}
              interaction="informational"
              role="listitem"
              className={[
                'intro-learn__skill-card',
                `intro-learn__enter-${index + 1}`,
              ].join(' ')}
            >
              <p className="intro-learn__skill-title m-0">
                {skill.headline}
              </p>
              <p className="intro-learn__skill-body m-0 mt-2">
                {skill.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="intro-learn__section">
        <header className="mb-6">
          <h2 className="intro-learn__heading m-0">Materials you&apos;ll get</h2>
        </header>
        <p className="intro-learn__lead m-0">
          You&apos;ll receive the following materials at the end of the course: a
          full slide deck and three printable coaching skills cards.
        </p>
        <div
          className="intro-learn__materials"
          role="list"
          aria-label="Materials you'll get"
        >
          {MATERIALS.map((item) => (
            <div
              key={item.title}
              className="intro-learn__material-enter"
              role="listitem"
            >
              <Card className="intro-learn__material-card">
                <div className="intro-learn__material-text">
                  <p className="intro-learn__skill-title m-0">{item.title}</p>
                  <p className="intro-learn__skill-body m-0">{item.body}</p>
                </div>
                <div className="materials-preview-wrap">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="materials-preview"
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
