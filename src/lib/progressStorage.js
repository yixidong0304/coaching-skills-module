/** Central learner progress persistence for the coaching module. */

export const STORAGE_KEY = 'coaching-module-progress-v1'

export const DEFAULT_PROGRESS = {
  version: 1,
  currentId: null,
  completedIds: [],
  sidebarCollapsed: false,
  reflection: '',
  screenProgress: {},
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROGRESS }
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_PROGRESS }
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      version: 1,
      completedIds: Array.isArray(parsed.completedIds)
        ? parsed.completedIds
        : [],
      screenProgress:
        parsed.screenProgress && typeof parsed.screenProgress === 'object'
          ? parsed.screenProgress
          : {},
      reflection: typeof parsed.reflection === 'string' ? parsed.reflection : '',
      sidebarCollapsed: Boolean(parsed.sidebarCollapsed),
    }
  } catch {
    return { ...DEFAULT_PROGRESS }
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    /* private mode / quota */
  }
}

export function clearProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
    window.localStorage.removeItem('sidebar-collapsed')
  } catch {
    /* ignore */
  }
}
