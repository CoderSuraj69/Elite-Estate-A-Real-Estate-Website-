import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      createdAt: new Date().toLocaleDateString(),
    }
    setBookings([...bookings, newBooking])
    return newBooking
  }

  const cancelBooking = (bookingId) => {
    setBookings(bookings.filter((b) => b.id !== bookingId))
  }

  const getBookingsByUser = (userId) => {
    return bookings.filter((b) => b.userId === userId)
  }

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingsByUser }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return context
}
