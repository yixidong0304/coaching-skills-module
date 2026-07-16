import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  getScreenById,
  getScreenIndex,
  screens,
} from '../data/courseData'
import {
  clearProgress,
  DEFAULT_PROGRESS,
  loadProgress,
  saveProgress,
} from '../lib/progressStorage'

const CourseContext = createContext(null)

function initFromStorage() {
  const saved = loadProgress()
  const startId =
    saved.currentId && getScreenById(saved.currentId)
      ? saved.currentId
      : screens[0]?.id
  return {
    currentId: startId,
    completedIds: new Set(saved.completedIds),
    sidebarCollapsed: saved.sidebarCollapsed,
    reflection: saved.reflection,
    screenProgress: saved.screenProgress ?? {},
  }
}

export function CourseProvider({ children }) {
  const initial = useRef(null)
  if (initial.current === null) {
    initial.current = initFromStorage()
  }

  const [currentId, setCurrentId] = useState(initial.current.currentId)
  const [completedIds, setCompletedIds] = useState(
    () => initial.current.completedIds,
  )
  const [nextLocked, setNextLockedState] = useState(false)
  const [nextLockHint, setNextLockHint] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    initial.current.sidebarCollapsed,
  )
  const [reflection, setReflection] = useState(initial.current.reflection)
  const [screenProgress, setScreenProgress] = useState(
    initial.current.screenProgress,
  )

  useEffect(() => {
    saveProgress({
      version: 1,
      currentId,
      completedIds: [...completedIds],
      sidebarCollapsed,
      reflection,
      screenProgress,
    })
  }, [
    currentId,
    completedIds,
    sidebarCollapsed,
    reflection,
    screenProgress,
  ])

  const markComplete = useCallback((id) => {
    setCompletedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const setNextLocked = useCallback((locked, hint = null) => {
    setNextLockedState(Boolean(locked))
    setNextLockHint(locked ? hint : null)
  }, [])

  const goTo = useCallback((id) => {
    if (getScreenById(id)) {
      setCurrentId(id)
      setNextLockedState(false)
      setNextLockHint(null)
    }
  }, [])

  const next = useCallback(() => {
    const index = getScreenIndex(currentId)
    if (index < 0 || index >= screens.length - 1) return
    if (nextLocked) return
    markComplete(currentId)
    setCurrentId(screens[index + 1].id)
    setNextLockedState(false)
    setNextLockHint(null)
  }, [currentId, markComplete, nextLocked])

  const back = useCallback(() => {
    const index = getScreenIndex(currentId)
    if (index <= 0) return
    setCurrentId(screens[index - 1].id)
    setNextLockedState(false)
    setNextLockHint(null)
  }, [currentId])

  const getProgress = useCallback(
    (key) => screenProgress[key] ?? null,
    [screenProgress],
  )

  const setProgress = useCallback((key, value) => {
    setScreenProgress((prev) => {
      const incoming =
        typeof value === 'function' ? value(prev[key] ?? null) : value
      const prevJson = JSON.stringify(prev[key] ?? null)
      const nextJson = JSON.stringify(incoming ?? null)
      if (prevJson === nextJson) return prev
      return { ...prev, [key]: incoming }
    })
  }, [])

  const resetProgress = useCallback(() => {
    clearProgress()
    const startId = screens[0]?.id
    setCurrentId(startId)
    setCompletedIds(new Set())
    setNextLockedState(false)
    setNextLockHint(null)
    setSidebarCollapsed(false)
    setReflection('')
    setScreenProgress({})
  }, [])

  const progressPercent = useMemo(() => {
    if (screens.length === 0) return 0
    return Math.round((completedIds.size / screens.length) * 100)
  }, [completedIds])

  const currentIndex = getScreenIndex(currentId)
  const isFirst = currentIndex <= 0
  const isLast = currentIndex >= screens.length - 1
  const currentScreen = getScreenById(currentId)

  const value = useMemo(
    () => ({
      currentId,
      currentScreen,
      currentIndex,
      completedIds,
      progressPercent,
      isFirst,
      isLast,
      nextLocked,
      nextLockHint,
      setNextLocked,
      goTo,
      next,
      back,
      markComplete,
      totalScreens: screens.length,
      sidebarCollapsed,
      setSidebarCollapsed,
      reflection,
      setReflection,
      getProgress,
      setProgress,
      resetProgress,
    }),
    [
      currentId,
      currentScreen,
      currentIndex,
      completedIds,
      progressPercent,
      isFirst,
      isLast,
      nextLocked,
      nextLockHint,
      setNextLocked,
      goTo,
      next,
      back,
      markComplete,
      sidebarCollapsed,
      reflection,
      getProgress,
      setProgress,
      resetProgress,
    ],
  )

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  )
}

export function useCourse() {
  const ctx = useContext(CourseContext)
  if (!ctx) {
    throw new Error('useCourse must be used within a CourseProvider')
  }
  return ctx
}

export { DEFAULT_PROGRESS }
