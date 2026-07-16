import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Caption from '../components/Caption'
import FrameworkShowcase, {
  GROW_LAYOUT,
} from '../components/FrameworkShowcase'
import KeyIdea from '../components/KeyIdea'
import DownloadFlashcardRow from '../components/DownloadFlashcardRow'
import { consumeEnterFromDivider } from '../lib/dividerTransition'

const GROW_ITEMS = [
  {
    letter: 'G',
    word: 'Goal',
    question: '"What needs to be achieved?"',
    explanation: 'Define where you want to get.',
  },
  {
    letter: 'R',
    word: 'Reality',
    question: '"What is happening right now?"',
    explanation: 'Facts and observations, not assumptions.',
  },
  {
    letter: 'O',
    word: 'Options',
    question: '"What options do we have?"',
    explanation: 'Possible solutions; what has worked before.',
  },
  {
    letter: 'W',
    word: 'Way forward',
    question: '"What is the next practical step?"',
    explanation: 'Commit to a path: who does what, and when.',
  },
]

export default function P3aGrowOverview() {
  const [enterFromDivider] = useState(() => consumeEnterFromDivider())

  return (
    <div className={enterFromDivider ? 'screen--from-divider' : undefined}>
      <SectionHeading title="Meet GROW" />

      <div className="m-0 mb-6 w-full text-body text-ink space-y-3">
        <p className="m-0 whitespace-nowrap max-[800px]:whitespace-normal">
          OSCAR structures feedback. GROW structures a short coaching conversation when someone brings you a problem.
        </p>
        <p className="m-0 whitespace-nowrap max-[800px]:whitespace-normal">
          Move through four stages: Goal, Reality, Options, and Way forward.
        </p>
      </div>

      <Caption className="mb-3 whitespace-nowrap max-[800px]:whitespace-normal">
        Hover over or tap each letter to see its guiding question.
      </Caption>

      <FrameworkShowcase
        items={GROW_ITEMS}
        layout={GROW_LAYOUT}
        ariaLabel="GROW framework"
      />

      <KeyIdea>
        GROW is a flexible conversation shape, not a formal meeting. You can use
        it in 5–10 minutes.
      </KeyIdea>

      <DownloadFlashcardRow
        buttonLabel="Download GROW guide"
        copy="Keep the four stages and guiding questions nearby for your next coaching conversation."
        href="/downloads/grow_card.png"
        fileName="grow_card.png"
      />
    </div>
  )
}
