import { useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Caption from '../components/Caption'
import ChoiceOption from '../components/ChoiceOption'
import FeedbackBanner from '../components/FeedbackBanner'
import FrameworkLetters from '../components/FrameworkLetters'
import ProgressBar from '../components/ProgressBar'
import RevealTile from '../components/RevealTile'
import SectionHeading from '../components/SectionHeading'
import WorkedExample from '../components/WorkedExample'

function GallerySection({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-h2 font-semibold text-ink border-b border-line pb-2">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export default function ComponentGallery() {
  const [oscarIndex, setOscarIndex] = useState(0)
  const [growIndex, setGrowIndex] = useState(1)
  const [revealedA, setRevealedA] = useState(false)
  const [revealedB, setRevealedB] = useState(true)
  const [exampleIndex, setExampleIndex] = useState(1)

  return (
    <div>
      <SectionHeading
        title="Component gallery"
        subtitle="Design system review: every reusable piece in its visual states."
        eyebrow="Foundation"
      />

      <GallerySection title="Button">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="primary" disabled>
            Primary disabled
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost" disabled>
            Ghost disabled
          </Button>
        </div>
      </GallerySection>

      <GallerySection title="Card">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="m-0 text-body">Default card: canvas fill, line border, soft shadow.</p>
          </Card>
          <Card tone="mint">
            <p className="m-0 text-body">Mint tone: panel or reveal surface.</p>
          </Card>
        </div>
      </GallerySection>

      <GallerySection title="SectionHeading">
        <Card>
          <SectionHeading
            eyebrow="Part 2 · OSCAR"
            title="Meet OSCAR"
            subtitle="A five-step conversation framework for coaching feedback."
          />
        </Card>
      </GallerySection>

      <GallerySection title="Caption">
        <Caption>Helper text uses the caption scale and ink-soft color.</Caption>
      </GallerySection>

      <GallerySection title="ProgressBar">
        <div className="space-y-3">
          <div>
            <Caption className="mb-2">0%</Caption>
            <ProgressBar value={0} />
          </div>
          <div>
            <Caption className="mb-2">35%</Caption>
            <ProgressBar value={35} />
          </div>
          <div>
            <Caption className="mb-2">100%</Caption>
            <ProgressBar value={100} />
          </div>
        </div>
      </GallerySection>

      <GallerySection title="FrameworkLetters">
        <Card>
          <Caption className="mb-4">OSCAR: click a letter</Caption>
          <FrameworkLetters
            letters={['O', 'S', 'C', 'A', 'R']}
            activeIndex={oscarIndex}
            onSelect={setOscarIndex}
          />
        </Card>
        <Card>
          <Caption className="mb-4">GROW: click a letter</Caption>
          <FrameworkLetters
            letters={['G', 'R', 'O', 'W']}
            activeIndex={growIndex}
            onSelect={setGrowIndex}
          />
        </Card>
      </GallerySection>

      <GallerySection title="RevealTile">
        <div className="grid gap-4 md:grid-cols-2">
          <RevealTile
            label="Collapsed tile"
            revealed={revealedA}
            onReveal={() => setRevealedA(true)}
          >
            Revealed content appears here after click.
          </RevealTile>
          <RevealTile
            label="Already revealed"
            revealed={revealedB}
            onReveal={() => setRevealedB(true)}
          >
            This tile starts expanded so you can compare both states.
          </RevealTile>
        </div>
      </GallerySection>

      <GallerySection title="ChoiceOption">
        <div className="space-y-2 max-w-xl">
          <ChoiceOption state="idle">Idle: waiting for selection</ChoiceOption>
          <ChoiceOption state="selected">Selected: learner picked this</ChoiceOption>
          <ChoiceOption state="correct">Correct: strong coaching move</ChoiceOption>
          <ChoiceOption state="partial">Partial: on the right track</ChoiceOption>
          <ChoiceOption state="incorrect">Incorrect: redirect needed</ChoiceOption>
        </div>
      </GallerySection>

      <GallerySection title="FeedbackBanner">
        <FeedbackBanner
          variant="success"
          message="Nice work. That question invites the coachee to own the next step."
        />
        <FeedbackBanner
          variant="partial"
          message="Close. Try staying curious a little longer before offering advice."
        />
        <FeedbackBanner
          variant="error"
          message="That response directs rather than coaches. Ask what they notice first."
        />
      </GallerySection>

      <GallerySection title="WorkedExample">
        <Card>
          <div className="mb-4 flex flex-wrap gap-2">
            <Caption className="w-full mb-1">Active line index: {exampleIndex}</Caption>
            {[0, 1, 2].map((i) => (
              <Button
                key={i}
                variant={exampleIndex === i ? 'primary' : 'ghost'}
                onClick={() => setExampleIndex(i)}
              >
                Line {i + 1}
              </Button>
            ))}
          </div>
          <WorkedExample
            guidance={
              <p className="m-0">
                Start with <strong>Outcome</strong>: what does success look like for
                this conversation?
              </p>
            }
            lines={[
              '“What would a good outcome look like for you this week?”',
              '“How will you know you’ve got there?”',
              '“What’s one thing you’d like to leave with today?”',
            ]}
            activeIndex={exampleIndex}
          />
        </Card>
      </GallerySection>
    </div>
  )
}
