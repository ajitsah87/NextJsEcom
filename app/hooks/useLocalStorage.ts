import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type UseLocalStorageResult<T> = {
  value: T | null;
  setValue: Dispatch<SetStateAction<T | null>>
}

export const useLocalStorage = <T>(key: string): UseLocalStorageResult<T> => {
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null
  const initial = storedValue ? JSON.parse(storedValue) : []

  const [value, setValue] = useState<T | null>(initial)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return { value, setValue }
}