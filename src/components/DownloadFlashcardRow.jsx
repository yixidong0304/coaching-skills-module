import Button from './Button'
import Caption from './Caption'

/**
 * Skills-card download row — primary Button (or download anchor) + copy.
 * Props: copy, href?, fileName?, buttonLabel?, disabled?
 */
export default function DownloadFlashcardRow({
  copy,
  href,
  fileName,
  className = '',
  buttonLabel = 'Download skills card',
  disabled = false,
}) {
  const isLive = Boolean(href) && !disabled

  return (
    <div
      className={['question-families__download-row', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="question-families__download">
        {isLive ? (
          <Button variant="primary" href={href} download={fileName}>
            {buttonLabel}
          </Button>
        ) : (
          <>
            <Button variant="primary" disabled>
              {buttonLabel}
            </Button>
            <Caption className="mt-1.5">Coming soon</Caption>
          </>
        )}
      </div>
      <Caption className="question-families__download-copy whitespace-nowrap max-[700px]:whitespace-normal">
        {copy}
      </Caption>
    </div>
  )
}
