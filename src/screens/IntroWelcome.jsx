import Button from '../components/Button'
import { useCourse } from '../context/CourseContext'
import coverImage from '../assets/cover.png'

const EYEBROW_CHIPS = ['Management & Leadership', 'Self-paced learning']

const META = [
  { label: '30 min', tone: 'accent' },
  { label: 'No prerequisites', tone: 'default' },
]

/**
 * intro-1 — Course landing page (split: copy left, cover image right).
 */
export default function IntroWelcome() {
  const { next } = useCourse()

  return (
    <div className="course-landing">
      <div className="course-landing__copy">
        <ul
          className="course-landing__eyebrows course-landing__enter-1"
          aria-label="Course category"
        >
          {EYEBROW_CHIPS.map((item) => (
            <li key={item} className="course-landing__chip">
              {item}
            </li>
          ))}
        </ul>

        <h1 className="course-landing__title course-landing__enter-2">
          Coaching Skills for Managers
        </h1>

        <p className="course-landing__desc course-landing__enter-3 m-0">
          Give feedback that lands, ask questions that unlock thinking, and coach
          in the everyday flow of work.
        </p>

        <ul
          className="course-landing__meta course-landing__enter-4"
          aria-label="Course details"
        >
          {META.map(({ label, tone }) => (
            <li
              key={label}
              className={[
                'course-landing__meta-item',
                tone === 'accent' ? 'course-landing__meta-item--accent' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {label}
            </li>
          ))}
        </ul>

        <div className="course-landing__cta-wrap course-landing__enter-5">
          <Button
            variant="primary"
            className="course-landing__cta"
            onClick={() => next()}
          >
            Start course
          </Button>
        </div>
      </div>

      <div className="course-landing__media">
        <img
          className="course-landing__image"
          src={coverImage}
          alt="Managers collaborating in a coaching conversation"
        />
        <p className="course-landing__credit">
          Photo from Unsplash · Free to use under the Unsplash License
        </p>
      </div>
    </div>
  )
}

IntroWelcome.fullBleed = true
