import { useEffect } from 'react'
import BreathScreen from '../components/BreathScreen'
import { useCourse } from '../context/CourseContext'
import { PORTFOLIO_URL } from '../data/site'

/**
 * wrap-3 — Final breath / close. Last screen; marks course complete.
 * No Done button — portfolio CTA only; bottom-bar Next stays hidden.
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
    <BreathScreen
      ariaLabel="Go coach"
      eyebrow="ONE LAST THING"
      statement="You don't need the perfect question. You need a real one, asked with genuine curiosity."
      bridgeLine="Fifteen minutes here. The real course is your next conversation. Go coach."
    >
      <a
        className="breath-screen__portfolio"
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
    </BreathScreen>
  )
}

WrapGoCoach.fullBleed = true

export default WrapGoCoach
