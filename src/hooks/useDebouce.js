import { useCallback, useRef } from "react";


export const useDebounce = (fn, delay) => {
  const timerRef = useRef()
  return useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      fn.apply(null, args)
    }, delay)
  }, [fn, delay])
}