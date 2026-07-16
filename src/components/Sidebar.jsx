import { getGroupedScreens } from '../data/courseData'
import { useCourse } from '../context/CourseContext'
import ProgressBar from './ProgressBar'
import ProgressRing from './ProgressRing'
import Caption from './Caption'

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3 7.2 5.8 10 11 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3 12a9 9 0 1 0 3-6.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 4v5h5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** PanelLeft-style sidebar toggle glyph (same icon both states). */
function PanelSidebarIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 3v18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Sidebar({
  galleryActive = false,
  onNavigate,
  collapsed = false,
  onToggleCollapsed,
  collapsible = false,
}) {
  const {
    currentId,
    completedIds,
    progressPercent,
    goTo,
    resetProgress,
  } = useCourse()
  const groups = getGroupedScreens()

  return (
    <aside
      className={[
        'sidebar',
        collapsed ? 'sidebar--collapsed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {collapsible ? (
        <div
          className={[
            'sidebar__collapse-row',
            collapsed ? 'sidebar__collapse-row--collapsed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            className="sidebar__collapse-toggle"
            aria-expanded={!collapsed}
            aria-controls="lesson-menu"
            aria-label={collapsed ? 'Expand lesson menu' : 'Collapse lesson menu'}
            onClick={onToggleCollapsed}
          >
            <PanelSidebarIcon />
          </button>
        </div>
      ) : null}

      {collapsed ? (
        <div className="sidebar__rail">
          <ProgressRing value={progressPercent} />
        </div>
      ) : (
        <>
          <div className="shrink-0 border-b border-line px-5 py-5">
            <div className="flex items-start justify-between gap-2">
              <h1 className="m-0 text-h2 font-semibold text-ink leading-snug">
                Coaching Skills for Managers
              </h1>
            </div>
            <span className="mt-3 inline-flex rounded-full bg-mint-tint px-2.5 py-0.5 text-caption font-medium text-forest">
              30 min
            </span>

            <div className="mt-5">
              <ProgressBar value={progressPercent} />
              <Caption className="mt-2">{progressPercent}% complete</Caption>
            </div>
          </div>

          <nav
            id="lesson-menu"
            className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
            aria-label="Lesson menu"
          >
            {groups.map((group) => {
              const intro = group.partIntro
              const introCurrent =
                !galleryActive && intro && intro.id === currentId

              return (
                <div key={group.part} className="mb-5">
                  {intro ? (
                    <button
                      type="button"
                      onClick={() => {
                        goTo(intro.id)
                        onNavigate?.()
                      }}
                      className={[
                        'sidebar__part-btn mb-2',
                        introCurrent ? 'sidebar__part-btn--current' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-current={introCurrent ? 'page' : undefined}
                    >
                      <span className="leading-snug">{group.partLabel}</span>
                    </button>
                  ) : (
                    <p className="mb-2 px-2 text-caption font-semibold uppercase tracking-wide text-ink-soft">
                      {group.partLabel}
                    </p>
                  )}
                  {(group.subsections?.length
                    ? group.subsections
                    : [{ id: null, label: null, screens: group.screens }]
                  ).map((subsection) => (
                    <div
                      key={`${group.part}:${subsection.id ?? 'main'}`}
                      className={
                        subsection.label ? 'sidebar__subsection' : undefined
                      }
                    >
                      {subsection.label ? (
                        <p className="sidebar__subsection-label">
                          {subsection.label}
                        </p>
                      ) : null}
                      <ul
                        className={[
                          'm-0 list-none space-y-0.5 p-0',
                          subsection.label ? 'sidebar__subsection-list' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {subsection.screens.map((screen) => {
                          const isCurrent =
                            !galleryActive && screen.id === currentId
                          const isComplete = completedIds.has(screen.id)

                          return (
                            <li key={screen.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  goTo(screen.id)
                                  onNavigate?.()
                                }}
                                className={[
                                  'flex w-full items-center gap-2 rounded-button px-2.5 py-2 text-left text-caption transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
                                  isCurrent
                                    ? 'bg-forest text-canvas font-semibold'
                                    : 'text-ink hover:bg-mint-tint',
                                ].join(' ')}
                              >
                                <span
                                  className={[
                                    'flex h-4 w-4 shrink-0 items-center justify-center',
                                    isComplete
                                      ? isCurrent
                                        ? 'text-canvas'
                                        : 'text-forest'
                                      : '',
                                  ].join(' ')}
                                >
                                  {isComplete ? (
                                    <CheckIcon />
                                  ) : (
                                    <span
                                      className={[
                                        'block h-1.5 w-1.5 rounded-full',
                                        isCurrent ? 'bg-canvas/70' : 'bg-line',
                                      ].join(' ')}
                                    />
                                  )}
                                </span>
                                <span className="leading-snug">
                                  {screen.title}
                                </span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )
            })}
          </nav>

          <div className="shrink-0 border-t border-line px-3 py-3">
            <button
              type="button"
              onClick={() => {
                const ok = window.confirm(
                  'Reset all course progress? This clears completed screens, quiz answers, and your reflection.',
                )
                if (ok) resetProgress()
              }}
              className="flex w-full items-center gap-2 rounded-button px-2.5 py-2 text-left text-caption font-medium text-ink-soft transition-colors hover:bg-mint-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              <ResetIcon />
              Reset progress
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
