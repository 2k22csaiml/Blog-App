import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 2200)
  }, [])

  const value = useMemo(
    () => ({
      notification,
      showNotification,
    }),
    [notification, showNotification],
  )

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotification() {
  return useContext(NotificationContext)
}
