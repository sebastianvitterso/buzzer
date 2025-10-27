import { useEffect, useRef } from 'react'

export default function usePreviousValue<T>(value: T): T | undefined {
  const currentValue = useRef<T | undefined>(undefined)
  const previousValue = useRef<T | undefined>(undefined)

  useEffect(() => {
    previousValue.current = currentValue.current
    currentValue.current = value
  }, [value])

  return previousValue.current
}
