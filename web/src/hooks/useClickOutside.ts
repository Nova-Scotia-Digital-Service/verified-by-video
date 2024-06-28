import { useEffect } from 'react'

export function useClickOutside(ref: React.RefObject<any>, cb: () => void) {
  useEffect(() => {
    const onClickOutside = (ev: Event) => {
      ref.current && !ref.current.contains(ev.target) && cb && cb()
    }

    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('touchstart', onClickOutside)

    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('touchstart', onClickOutside)
    }
  }, [ref, cb])
}
