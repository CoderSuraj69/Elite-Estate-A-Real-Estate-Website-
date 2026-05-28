import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useFavourites } from '../context/FavouritesContext'
import { useNotifications } from '../context/NotificationContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { darkMode, toggleDarkMode } = useTheme()
  const { favourites } = useFavourites()
  const { notifications, markAsRead, markAllRead, unreadCount } = useNotifications()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">Elite</span>
            <span className="text-2xl font-display font-bold text-stone-800 dark:text-stone-200">Estate</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">Home</Link>
            <Link to="/properties" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">Properties</Link>
            <Link to="/contact" className="text-stone-600 dark:text-stone-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-stone-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {user && (
              <>
                <Link to="/favourites" className="relative p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                  <svg className="w-5 h-5 text-stone-600 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {favourites.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">{favourites.length}</span>
                  )}
                </Link>

                <div className="relative">
                  <button
                    onClick={() => { setShowNotifications(!showNotifications); setShowUserMenu(false) }}
                    className="relative p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <svg className="w-5 h-5 text-stone-600 dark:text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                      <div className="p-4 border-b border-stone-200 dark:border-stone-700 flex justify-between items-center">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-sm text-primary-600 hover:underline">Mark all read</button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-stone-500 text-sm">No notifications</p>
                        ) : (
                          notifications.map(n => (
                            <div
                              key={n.id}
                              onClick={() => markAsRead(n.id)}
                              className={`p-4 border-b border-stone-100 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700/50 cursor-pointer ${!n.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                            >
                              <p className="font-medium text-sm">{n.title}</p>
                              <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">{n.message}</p>
                              <p className="text-xs text-stone-400 mt-1">{n.time}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/add-property" className="hidden sm:inline btn-primary text-sm py-2">
                  Add Property
                </Link>

                <Link to="/my-bookings" className="hidden sm:inline btn-secondary text-sm py-2 bg-blue-600 hover:bg-blue-700 border-blue-600 text-white">
                  My Bookings
                </Link>

                <div className="relative">
                  <button
                    onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifications(false) }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden sm:block font-medium">{user?.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 py-2">
                      <Link to="/favourites" className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700" onClick={() => setShowUserMenu(false)}>Favourites</Link>
                      <Link to="/my-bookings" className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700" onClick={() => setShowUserMenu(false)}>My Bookings</Link>
                      <Link to="/add-property" className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 sm:hidden" onClick={() => setShowUserMenu(false)}>Add Property</Link>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-700 text-red-600">Logout</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!user && (
              <Link to="/login" className="btn-primary text-sm py-2">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
