import { useEffect, useState } from 'react'

export function useReducedMotionPref() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

export function useSoundEvents() {
  return {
    play: (eventName: string) => {
      // TODO: Implement sound system in Phase 2
      console.log(`[Audio] ${eventName}`)
    }
  }
}