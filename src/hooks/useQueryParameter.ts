import { useCallback, useEffect, useState } from 'react'

export default function useQueryParameter(
  param: string,
  defaultValue = '',
): [string, (newValue: string) => void] {
  const getQueryParamValue = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param) ?? defaultValue
  }, [param, defaultValue])

  const [value, setValue] = useState<string>(getQueryParamValue())

  const setQueryParamValue = useCallback(
    (newValue: string) => {
      const newParams = new URLSearchParams(window.location.search)
      if (newValue === defaultValue) {
        newParams.delete(param)
      } else {
        newParams.set(param, newValue)
      }
      const newQueryString = newParams.toString()
      const newUrl =
        window.location.origin +
        window.location.pathname +
        (newQueryString ? `?${newQueryString}` : '') +
        window.location.hash
      window.history.pushState(null, '', newUrl)
      setValue(newValue)
    },
    [defaultValue, param],
  )

  useEffect(() => {
    const handlePopState = () => setValue(getQueryParamValue())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [getQueryParamValue])

  return [value, setQueryParamValue]
}
