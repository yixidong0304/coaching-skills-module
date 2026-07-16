import SectionHeading from '../components/SectionHeading'
import Caption from '../components/Caption'
import FrameworkShowcase from '../components/FrameworkShowcase'
import KeyIdea from '../components/KeyIdea'
import useScreenEntrance from '../hooks/useScreenEntrance'

const OSCAR_ITEMS = [
  {
    letter: 'O',
    word: 'Observation',
    detail:
      'Describe what you objectively saw (facts, no interpretation)',
  },
  {
    letter: 'S',
    word: 'Specific',
    detail:
      'Be precise about the behavior or situation, avoid generalizations',
  },
  {
    letter: 'C',
    word: 'Consequences',
    detail:
      'Help the other person recognize the impact of actions / inaction',
  },
  {
    letter: 'A',
    word: 'Actions',
    detail:
      'Help the other person identify which actions they could take to achieve a different result',
  },
  {
    letter: 'R',
    word: 'Results',
    detail: 'Clarify desired outcome or next step',
  },
]

export default function P2aMeetOscar() {
  const entrancePhase = useScreenEntrance(800)

  return (
    <div className={['meet-framework', entrancePhase].join(' ')}>
      <SectionHeading title="Meet OSCAR" />

      <p className="screen-lede m-0">
        OSCAR is a five-step structure for coaching feedback, from what you
        observed to what changes next.
      </p>

      <Caption className="screen-caption">
        Hover over or tap each letter to explore the five steps.
      </Caption>

      <FrameworkShowcase
        items={OSCAR_ITEMS}
        ariaLabel="OSCAR framework"
        defaultIndex={null}
      />

      <KeyIdea>
        Use the steps in order to keep feedback specific, constructive, and
        focused on action.
      </KeyIdea>
    </div>
  )
}
