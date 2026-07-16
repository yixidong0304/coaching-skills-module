import { useEffect, useId } from 'react'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Caption from '../components/Caption'
import Button from '../components/Button'
import { useCourse } from '../context/CourseContext'
import {
  COURSE_SLIDES,
  SKILL_CARDS_BUNDLE,
} from '../data/downloads'
import slidesPreview from '../assets/slides_preview.png'
import cardsPreview from '../assets/cards_preview.png'

/**
 * wrap-2 — Materials page: slides (pending) + all three cards + reflection.
 */
export default function WrapTakeYourCards() {
  const {
    markComplete,
    currentId,
    setNextLocked,
    reflection,
    setReflection,
  } = useCourse()
  const reflectionId = useId()
  const confirmed = reflection.trim().length > 0

  useEffect(() => {
    markComplete(currentId)
    setNextLocked(false)
    return () => setNextLocked(false)
  }, [markComplete, currentId, setNextLocked])

  function handleReflectionChange(event) {
    setReflection(event.target.value)
  }

  return (
    <div className="wrap-cards">
      <SectionHeading title="Your materials" />

      <p className="m-0 mb-8 max-w-prose text-body text-ink">
        Well done. You&apos;ve completed the course. As promised, everything you
        worked with is yours to keep: the full slide deck behind this module, and
        the three coaching skills cards. Keep them close: the best time to use
        them is your next real conversation.
      </p>

      <div
        className="intro-learn__materials"
        role="list"
        aria-label="Your materials"
      >
        <Card role="listitem" className="intro-learn__material-card">
          <div className="intro-learn__material-text">
            <p className="intro-learn__skill-title m-0">Course slides</p>
            <p className="intro-learn__skill-body m-0">
              The complete slide deck behind this module, as a PDF.
            </p>
          </div>
          <div className="materials-preview-wrap">
            <img
              src={slidesPreview}
              alt="Preview of the course slides"
              className="materials-preview"
            />
          </div>
          <div className="intro-learn__material-actions">
            {COURSE_SLIDES.available ? (
              <Button
                variant="primary"
                href={COURSE_SLIDES.href}
                download={COURSE_SLIDES.fileName}
              >
                Download slides
              </Button>
            ) : (
              <>
                <Button variant="primary" disabled>
                  Download slides
                </Button>
                <Caption className="mt-2">Available soon</Caption>
              </>
            )}
          </div>
        </Card>

        <Card role="listitem" className="intro-learn__material-card">
          <div className="intro-learn__material-text">
            <p className="intro-learn__skill-title m-0">
              Coaching skills cards
            </p>
            <p className="intro-learn__skill-body m-0">
              Three printable one-page cards: OSCAR, the question library, and
              GROW.
            </p>
          </div>
          <div className="materials-preview-wrap">
            <img
              src={cardsPreview}
              alt="Preview of the coaching skills cards"
              className="materials-preview"
            />
          </div>
          <div className="intro-learn__material-actions">
            <Button
              variant="primary"
              href={SKILL_CARDS_BUNDLE.href}
              download={SKILL_CARDS_BUNDLE.fileName}
            >
              Download all three cards
            </Button>
          </div>
        </Card>
      </div>

      <div className="wrap-cards__reflect mt-10">
        <label
          htmlFor={reflectionId}
          className="m-0 mb-2 block text-body font-semibold text-ink"
        >
          One coaching question I&apos;ll use this week:
        </label>
        <input
          id={reflectionId}
          type="text"
          className="wrap-cards__input"
          value={reflection}
          onChange={handleReflectionChange}
          autoComplete="off"
        />
        {confirmed ? (
          <Caption className="mt-2 wrap-cards__confirm">
            Keep it somewhere you&apos;ll see it.
          </Caption>
        ) : null}
      </div>
    </div>
  )
}
