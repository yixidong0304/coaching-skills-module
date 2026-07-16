import { useEffect, useState } from 'react'

/**
 * Page-level entrance plays once per mount.
 * Returns 'is-entering' then 'is-settled' so CSS can stop replaying chrome motion
 * on internal question/stage/letter state changes.
 */
export default function useScreenEntrance(durationMs = 650) {
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reduceMotion) {
      setSettled(true)
      return undefined
    }

    const id = window.setTimeout(() => setSettled(true), durationMs)
    return () => window.clearTimeout(id)
  }, [durationMs])

  return settled ? 'is-settled' : 'is-entering'
}
