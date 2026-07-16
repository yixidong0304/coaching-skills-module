import { useEffect, useRef, useState } from 'react'
import Card from './Card'

export default function WorkedExample({
  guidance,
  lines = [],
  activeIndex = 0,
  leftHeading = 'Your move',
  rightHeading = 'Conversation so far',
  showFuture = true,
  onSelectLine,
  stepKey,
}) {
  const interactive = typeof onSelectLine === 'function'
  const skipFade = useRef(true)

  const [panelGuidance, setPanelGuidance] = useState(guidance)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (skipFade.current) {
      skipFade.current = false
      setPanelGuidance(guidance)
      return undefined
    }

    setFading(true)
    const id = window.setTimeout(() => {
      setPanelGuidance(guidance)
      setFading(false)
    }, 125)

    return () => window.clearTimeout(id)
  }, [stepKey, guidance])

  const renderGuidance = (content) => {
    if (Array.isArray(content)) {
      return (
        <ul className="m-0 list-disc space-y-2 pl-5 marker:text-forest">
          {content.map((point, index) => (
            <li key={index} className="pl-1">
              {point}
            </li>
          ))}
        </ul>
      )
    }
    return content
  }

  return (
    <div className="worked-example__layout">
      <div className="worked-example__col ia-panel ia-panel--left">
        <h2 className="worked-example__col-title">{leftHeading}</h2>
        <Card tone="mint" className="worked-example__panel">
          <div
            className={[
              'worked-example__guidance text-body text-ink',
              fading ? 'is-fading' : '',
            ].join(' ')}
          >
            {renderGuidance(panelGuidance)}
          </div>
        </Card>
      </div>

      <div className="worked-example__col ia-panel ia-panel--right">
        <h2 className="worked-example__col-title">{rightHeading}</h2>
        <ul className="worked-example__lines m-0 list-none space-y-2 p-0">
          {lines.map((line, index) => {
            if (!showFuture && index > activeIndex) return null

            const isCurrent = index === activeIndex
            const isFuture = index > activeIndex
            const canSelect = interactive && !isFuture

            return (
              <li
                key={index}
                className="ia-line"
                style={{ '--ia-line-index': index }}
              >
                <button
                  type="button"
                  disabled={!canSelect}
                  aria-current={isCurrent ? 'step' : undefined}
                  onClick={() => {
                    if (canSelect) onSelectLine(index)
                  }}
                  className={[
                    'worked-example__line',
                    isCurrent ? 'is-current' : '',
                    isFuture ? 'is-future' : '',
                  ].join(' ')}
                >
                  {line}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
