import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New property match', message: 'A 3BHK villa in your budget was just listed.', time: '2 min ago', read: false },
    { id: 2, title: 'Price drop alert', message: 'The property you viewed dropped by 5%.', time: '1 hour ago', read: false },
    { id: 3, title: 'Viewing confirmed', message: 'Your property viewing is scheduled for tomorrow.', time: 'Yesterday', read: true },
  ])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = (notification) => {
    setNotifications(prev => [{ ...notification, id: Date.now(), read: false }, ...prev])
  }

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markAllRead, unreadCount, addNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
