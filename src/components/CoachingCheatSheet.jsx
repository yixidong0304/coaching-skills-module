import Card from './Card'
import Caption from './Caption'
import { CHEAT_SHEET_SECTIONS } from '../data/coachingCheatSheet'

/**
 * Dense framework-level cheat sheet panels (no scenario answers).
 * Rendered inside ReferenceDrawer.
 */
export default function CoachingCheatSheet() {
  return (
    <div className="cheat-sheet" aria-label="Coaching frameworks reference">
      {CHEAT_SHEET_SECTIONS.map((section) => (
        <Card key={section.id} className="cheat-sheet__card">
          <p className="cheat-sheet__name m-0">{section.title}</p>

          {section.items ? (
            <ul className="cheat-sheet__list">
              {section.items.map((item) => (
                <li key={item.label} className="cheat-sheet__item">
                  <span className="cheat-sheet__label">{item.label}</span>
                  <span className="cheat-sheet__sep" aria-hidden="true">
                    :
                  </span>{' '}
                  <span className="cheat-sheet__line">{item.line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cheat-sheet__body m-0">{section.body}</p>
          )}

          {section.tag ? (
            <Caption className="cheat-sheet__tag mt-2">{section.tag}</Caption>
          ) : null}
        </Card>
      ))}
    </div>
  )
}
