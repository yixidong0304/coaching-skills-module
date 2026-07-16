import { useEffect, useState } from 'react'
import { CourseProvider, useCourse } from './context/CourseContext'
import Sidebar from './components/Sidebar'
import BottomNav from './components/BottomNav'
import {
  resolveScreen,
  ComponentGallery,
} from './screens/screenRegistry.jsx'

function MenuIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M5 5l12 12M17 5 5 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 6h14M4 11h14M4 16h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

function CourseShell() {
  const { currentScreen, sidebarCollapsed, setSidebarCollapsed } = useCourse()
  const [showGallery, setShowGallery] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const ScreenComponent = resolveScreen(currentScreen)
  const isFullBleed =
    !showGallery &&
    Boolean(currentScreen?.fullBleed || ScreenComponent?.fullBleed)

  const openScreen = () => {
    setShowGallery(false)
    setDrawerOpen(false)
  }

  const shellStyle = {
    '--shell-sidebar-width': sidebarCollapsed
      ? 'var(--spacing-sidebar-collapsed)'
      : 'var(--spacing-sidebar)',
  }

  return (
    <div className="shell" style={shellStyle}>
      {/* Desktop sidebar */}
      <div className="shell__sidebar-slot hidden min-shell:block">
        <Sidebar
          galleryActive={showGallery}
          onNavigate={() => setShowGallery(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
          collapsible
        />
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 min-shell:hidden',
          drawerOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
      >
        <button
          type="button"
          aria-label="Close menu"
          className={[
            'absolute inset-0 bg-ink/40 transition-opacity',
            drawerOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className={[
            'absolute inset-y-0 left-0 transition-transform duration-200 ease-out',
            drawerOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <Sidebar
            galleryActive={showGallery}
            onNavigate={openScreen}
            collapsible={false}
          />
        </div>
      </div>

      {/* Main column */}
      <div className="shell__main">
        <header className="flex shrink-0 items-center gap-3 border-b border-line bg-canvas px-4 py-3 min-shell:hidden">
          <button
            type="button"
            aria-label={drawerOpen ? 'Close lesson menu' : 'Open lesson menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-button text-ink hover:bg-mint-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <MenuIcon open={drawerOpen} />
          </button>
          <span className="truncate text-caption font-semibold text-ink">
            {showGallery
              ? 'Component gallery'
              : currentScreen?.partIntro
                ? currentScreen.partLabel
                : (currentScreen?.title ?? 'Coaching Skills for Managers')}
          </span>
        </header>

        <main
          className={[
            'shell__content',
            isFullBleed ? 'shell__content--full-bleed' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {showGallery ? (
            <div className="shell__padded">
              <ComponentGallery />
            </div>
          ) : isFullBleed && ScreenComponent ? (
            <div className="content-full-bleed">
              <ScreenComponent />
            </div>
          ) : ScreenComponent ? (
            <div className="shell__padded">
              <ScreenComponent />
            </div>
          ) : (
            <div className="shell__padded">
              <p className="text-ink-soft">Screen not found.</p>
            </div>
          )}
        </main>

        <BottomNav
          hidden={
            showGallery ||
            currentScreen?.id === 'intro-1' ||
            currentScreen?.id === 'p1-0' ||
            Boolean(currentScreen?.hideBottomNav)
          }
        />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CourseProvider>
      <CourseShell />
    </CourseProvider>
  )
}
