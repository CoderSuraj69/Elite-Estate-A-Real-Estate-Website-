import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { FavouritesProvider } from './context/FavouritesContext'
import { PropertiesProvider } from './context/PropertiesContext'
import { NotificationProvider } from './context/NotificationContext'
import { BookingProvider } from './context/BookingContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FavouritesProvider>
            <NotificationProvider>
              <PropertiesProvider>
                <BookingProvider>
                  <App />
                </BookingProvider>
              </PropertiesProvider>
            </NotificationProvider>
          </FavouritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
