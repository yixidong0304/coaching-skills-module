import Card from '../components/Card'
import KeyIdea from '../components/KeyIdea'

export default function P1CoachingVsDirecting() {
  return (
    <div className="part1-screen">
      <header className="mb-6">
        <h1 className="part1-screen__title m-0">Two ways to respond</h1>
      </header>

      <p className="part1-screen__intro part1-screen__intro--secondary m-0">
        So what does coaching look like in the moment? When someone brings you a
        problem, you can either give the answer or create space for them to
        think.
      </p>

      <div
        className="ways-pair"
        role="group"
        aria-label="Directing and coaching"
      >
        <div className="ways-pair__enter-direct">
          <Card
            tabIndex={0}
            className="ways-pair__card ways-pair__card--direct"
          >
            <p className="ways-pair__label m-0">Directing</p>
            <p className="ways-pair__quote m-0">
              &ldquo;Do it exactly like this.&rdquo;
            </p>
            <p className="ways-pair__note m-0">
              You provide the answer. This is useful when speed, safety, or a
              clear decision matters most.
            </p>
          </Card>
        </div>

        <div
          className="ways-pair__arrow ways-pair__enter-arrow"
          aria-hidden="true"
        >
          <span className="ways-pair__arrow-glyph hidden sm:inline">→</span>
          <span className="ways-pair__arrow-glyph sm:hidden">↓</span>
        </div>

        <div className="ways-pair__enter-coach">
          <Card
            tabIndex={0}
            className="ways-pair__card ways-pair__card--coach"
          >
            <p className="ways-pair__label m-0">Coaching</p>
            <p className="ways-pair__quote m-0">
              &ldquo;What&apos;s the goal here? What do you think caused it? What
              will you try first?&rdquo;
            </p>
            <p className="ways-pair__note m-0">
              You ask and listen so the other person can think, learn, and take
              ownership.
            </p>
          </Card>
        </div>
      </div>

      <KeyIdea>
        Coaching is not the absence of standards. It is a{' '}
        <strong className="key-idea__hl">curious, deliberate way</strong> of
        helping someone think within them.
      </KeyIdea>
    </div>
  )
}
