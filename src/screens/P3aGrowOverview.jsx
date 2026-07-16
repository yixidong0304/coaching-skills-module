import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import Caption from '../components/Caption'
import FrameworkShowcase, {
  GROW_LAYOUT,
} from '../components/FrameworkShowcase'
import KeyIdea from '../components/KeyIdea'
import DownloadFlashcardRow from '../components/DownloadFlashcardRow'
import { consumeEnterFromDivider } from '../lib/dividerTransition'
import useScreenEntrance from '../hooks/useScreenEntrance'

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
  const entrancePhase = useScreenEntrance(800)

  return (
    <div
      className={[
        'meet-framework',
        entrancePhase,
        enterFromDivider ? 'screen--from-divider' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <SectionHeading title="Meet GROW" />

      <p className="screen-lede m-0">
        OSCAR structures feedback. GROW structures a short coaching conversation
        when someone brings you a problem. Move through four stages: Goal,
        Reality, Options, and Way forward.
      </p>

      <Caption className="screen-caption">
        Hover over or tap each letter to see its guiding question.
      </Caption>

      <FrameworkShowcase
        items={GROW_ITEMS}
        layout={GROW_LAYOUT}
        ariaLabel="GROW framework"
        defaultIndex={null}
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
