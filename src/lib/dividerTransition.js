/** Session flag: next content screen entered from a part divider leave-swipe. */
export const DIVIDER_ENTER_KEY = 'coaching-enter-from-divider'

export function markEnterFromDivider() {
  try {
    sessionStorage.setItem(DIVIDER_ENTER_KEY, '1')
  } catch {
    /* ignore */
  }
}

/** Read-and-clear; call once when the destination screen mounts. */
export function consumeEnterFromDivider() {
  try {
    if (sessionStorage.getItem(DIVIDER_ENTER_KEY) !== '1') return false
    sessionStorage.removeItem(DIVIDER_ENTER_KEY)
    return true
  } catch {
    return false
  }
}
