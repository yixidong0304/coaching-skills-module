import { useEffect } from 'react'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Caption from '../components/Caption'
import Button from '../components/Button'
import { useCourse } from '../context/CourseContext'
import { COURSE_SLIDES, SKILL_CARDS_BUNDLE } from '../data/downloads'
import slidesPreview from '../assets/slides_preview.png'
import cardsPreview from '../assets/cards_preview.png'

const RESOURCES = [
  {
    id: 'slides',
    typeLabel: 'PDF deck',
    title: 'Course slides',
    body: 'The complete slide deck behind this module, as a PDF.',
    image: slidesPreview,
    alt: 'Preview of the course slides',
    buttonLabel: 'Download slides',
    asset: COURSE_SLIDES,
  },
  {
    id: 'cards',
    typeLabel: 'Printable cards',
    title: 'Coaching skills cards',
    body: 'Three printable one-page cards: OSCAR, the question library, and GROW.',
    image: cardsPreview,
    alt: 'Preview of the coaching skills cards',
    buttonLabel: 'Download all three cards',
    asset: SKILL_CARDS_BUNDLE,
    alwaysAvailable: true,
  },
]

/**
 * wrap-2 — Download destination for course materials.
 */
export default function WrapTakeYourCards() {
  const { markComplete, currentId, setNextLocked } = useCourse()

  useEffect(() => {
    markComplete(currentId)
    setNextLocked(false)
    return () => setNextLocked(false)
  }, [markComplete, currentId, setNextLocked])

  return (
    <div className="wrap-cards">
      <SectionHeading title="Your materials" />

      <p className="screen-lede wrap-cards__intro m-0">
        You&apos;ve completed the course. Download the full slide deck and three
        coaching skills cards to use in your next real conversation.
      </p>

      <div className="wrap-cards__grid" role="list" aria-label="Your materials">
        {RESOURCES.map((resource, index) => {
          const available =
            resource.alwaysAvailable || Boolean(resource.asset.available)

          return (
            <Card
              key={resource.id}
              role="listitem"
              className={[
                'wrap-cards__download',
                'intro-learn__material-enter',
              ].join(' ')}
            >
              <p className="wrap-cards__type m-0">{resource.typeLabel}</p>
              <p className="wrap-cards__title m-0">{resource.title}</p>
              <p className="wrap-cards__body m-0">{resource.body}</p>
              <div
                className={[
                  'asset-preview',
                  'asset-preview--download',
                  index % 2 === 1 ? 'asset-preview--alt' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <img
                  src={resource.image}
                  alt={resource.alt}
                  className="asset-preview__img"
                />
              </div>
              <div className="wrap-cards__actions">
                {available ? (
                  <Button
                    variant="primary"
                    href={resource.asset.href}
                    download={resource.asset.fileName}
                  >
                    {resource.buttonLabel}
                  </Button>
                ) : (
                  <>
                    <Button variant="primary" disabled>
                      {resource.buttonLabel}
                    </Button>
                    <Caption className="mt-2">Available soon</Caption>
                  </>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
