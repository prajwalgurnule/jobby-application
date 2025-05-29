// src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set a timer to update debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function that runs on component unmount or before re-running the effect
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Only re-run effect if value or delay changes

  return debouncedValue
}

export default useDebounce