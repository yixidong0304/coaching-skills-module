/**
 * Structured revealed-answer panel for detailed model answers / explanations.
 * Distinct from compact InlineOutcomeFeedback attached under a choice.
 *
 * tone "feedback" — pale success instructional surface (shared pattern).
 */
export default function DetailedAnswerPanel({
  label,
  primary,
  explanation,
  sectionTitle,
  checklistLead,
  checklist = [],
  note,
  children,
  tone = 'feedback',
  className = '',
  role = 'status',
}) {
  const hasExtra =
    Boolean(sectionTitle) ||
    Boolean(children) ||
    Boolean(checklistLead) ||
    checklist.length > 0 ||
    Boolean(note)

  return (
    <aside
      className={[
        'detailed-answer',
        `detailed-answer--${tone}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role={role}
      aria-label={label}
    >
      {label ? (
        <p className="detailed-answer__label m-0">{label}</p>
      ) : null}

      {primary ? (
        <div className="detailed-answer__primary">{primary}</div>
      ) : null}

      {explanation ? (
        <p className="detailed-answer__explanation m-0">{explanation}</p>
      ) : null}

      {hasExtra ? (
        <div className="detailed-answer__extra">
          {sectionTitle ? (
            <p className="detailed-answer__section-title m-0">{sectionTitle}</p>
          ) : null}

          {children}

          {checklistLead ? (
            <p className="detailed-answer__checklist-lead m-0">
              {checklistLead}
            </p>
          ) : null}
          {checklist.length > 0 ? (
            <ul className="detailed-answer__checklist m-0">
              {checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {note ? (
            <p className="detailed-answer__note m-0">{note}</p>
          ) : null}
        </div>
      ) : null}
    </aside>
  )
}
