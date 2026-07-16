import Button from './Button'
import Caption from './Caption'
import { useCourse } from '../context/CourseContext'

export default function BottomNav({ hidden = false }) {
  const { back, next, isFirst, isLast, nextLocked, nextLockHint, currentScreen } =
    useCourse()

  if (hidden) return null

  const nextLabel = currentScreen?.nextLabel ?? 'Next'

  return (
    <footer className="shrink-0 border-t border-line bg-canvas px-[var(--spacing-content-x)] py-4">
      <div className="mx-auto flex w-full max-w-content flex-col gap-2">
        {nextLocked && nextLockHint ? (
          <Caption className="m-0 text-center">{nextLockHint}</Caption>
        ) : null}
        <div className="flex w-full items-center justify-between gap-4">
          <Button variant="ghost" disabled={isFirst} onClick={back}>
            Back
          </Button>
          {isLast ? (
            <span className="sr-only">End of course</span>
          ) : (
            <Button variant="primary" disabled={nextLocked} onClick={next}>
              {nextLabel}
            </Button>
          )}
        </div>
      </div>
    </footer>
  )
}
