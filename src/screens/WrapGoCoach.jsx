import { useEffect } from 'react'
import { useCourse } from '../context/CourseContext'
import { PORTFOLIO_URL } from '../data/site'
import { IconGrowth } from '../components/CourseIcons'

/**
 * wrap-3 — Distinctive two-column completion send-off.
 */
function WrapGoCoach() {
  const { markComplete, currentId } = useCourse()
  const hasPortfolio =
    typeof PORTFOLIO_URL === 'string' &&
    PORTFOLIO_URL.length > 0 &&
    PORTFOLIO_URL !== '#'

  useEffect(() => {
    markComplete(currentId)
  }, [markComplete, currentId])

  return (
    <section className="wrap-close" aria-label="Go coach">
      <div className="wrap-close__glow" aria-hidden="true" />
      <div className="wrap-close__motif" aria-hidden="true" />

      <div className="wrap-close__layout">
        <div className="wrap-close__copy">
          <p className="wrap-close__statement m-0">
            You don&apos;t need the perfect question.
            <br />
            You need a real one, asked with genuine curiosity.
          </p>

          <p className="wrap-close__next m-0">
            In your next conversation, pause before giving the answer—and ask
            one real question first.
          </p>

          <a
            className="wrap-close__portfolio"
            href={hasPortfolio ? PORTFOLIO_URL : '#'}
            {...(hasPortfolio
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {
                  onClick: (event) => {
                    event.preventDefault()
                  },
                })}
          >
            See how this course was designed →
          </a>
        </div>

        <aside
          className="wrap-close__card"
          role="note"
          aria-label="Course complete"
        >
          <span className="wrap-close__symbol" aria-hidden="true">
            <IconGrowth size={40} />
          </span>
          <p className="wrap-close__card-title m-0">
            You&apos;ve built something powerful.
          </p>
          <p className="wrap-close__card-body m-0">
            You now have the mindset, tools, and practice to help your team
            think more clearly and move forward.
          </p>
        </aside>
      </div>
    </section>
  )
}

WrapGoCoach.fullBleed = true

export default WrapGoCoach
