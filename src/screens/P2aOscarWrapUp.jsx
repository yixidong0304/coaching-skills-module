import SectionHeading from '../components/SectionHeading'
import DownloadFlashcardRow from '../components/DownloadFlashcardRow'

const OSCAR_RECAP = [
  {
    letter: 'O',
    word: 'Observation',
    line: 'State what you actually saw.',
  },
  {
    letter: 'S',
    word: 'Specific',
    line: 'Focus on 1–2 key facts.',
  },
  {
    letter: 'C',
    word: 'Consequences',
    line: 'Explore the impact.',
  },
  {
    letter: 'A',
    word: 'Actions',
    line: 'Ask what they could do next.',
  },
  {
    letter: 'R',
    word: 'Results',
    line: 'Clarify the better outcome.',
  },
]

export default function P2aOscarWrapUp() {
  return (
    <div className="oscar-wrapup">
      <SectionHeading title="OSCAR, in one card" />

      <p className="m-0 mb-6 text-body text-ink whitespace-nowrap max-[800px]:whitespace-normal">
        A one-page coaching guide to keep next to your screen.
      </p>

      <section
        className="oscar-toolkit oscar-wrapup__enter-panel"
        aria-label="OSCAR quick recap"
      >
        <header className="oscar-toolkit__header">
          <p className="oscar-toolkit__label m-0">Takeaway tool</p>
          <h2 className="oscar-toolkit__heading m-0">OSCAR quick recap</h2>
          <p className="oscar-toolkit__support m-0">
            Use this guide to structure your next feedback conversation.
          </p>
        </header>

        <ul className="oscar-toolkit__tiles m-0 list-none p-0" role="list">
          {OSCAR_RECAP.map((item, index) => (
            <li key={item.letter}>
              <article
                className={[
                  'oscar-toolkit__tile',
                  `oscar-wrapup__enter-tile-${index + 1}`,
                ].join(' ')}
                aria-label={`${item.letter}: ${item.word}. ${item.line}`}
              >
                <span className="oscar-toolkit__tile-letter" aria-hidden="true">
                  {item.letter}
                </span>
                <p className="oscar-toolkit__tile-word m-0">{item.word}</p>
                <p className="oscar-toolkit__tile-line m-0">{item.line}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <DownloadFlashcardRow
        className="oscar-wrapup__download oscar-wrapup__enter-follow-1"
        buttonLabel="Download printable skills card"
        copy="Print it or keep it open during feedback conversations."
        href="/downloads/oscar_card.png"
        fileName="oscar_card.png"
      />

      <aside
        className="oscar-next-skill oscar-wrapup__enter-follow-2"
        aria-label="Next skill: Listening and powerful questions"
      >
        <p className="oscar-next-skill__label m-0">Next skill</p>
        <h3 className="oscar-next-skill__heading m-0">
          Listening + powerful questions
        </h3>
        <p className="oscar-next-skill__body m-0">
          OSCAR gives feedback a structure. Next, strengthen the listening and
          questioning skills that make any coaching conversation work.
        </p>
      </aside>
    </div>
  )
}
