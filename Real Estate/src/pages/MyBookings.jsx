import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'

export default function MyBookings() {
  const { user } = useAuth()
  const { bookings, getBookingsByUser, cancelBooking } = useBooking()

  const userBookings = user ? getBookingsByUser(user.id || 'guest') : []

  const formatPrice = (price) => `₹${price.toLocaleString()}`

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-2">My Bookings</h1>
        <p className="text-stone-600 dark:text-stone-400 mb-8">Manage your rental bookings</p>

        {userBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
              <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">Start exploring and book your dream property</p>
            <Link to="/properties" className="btn-primary">Browse Properties</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {userBookings.map((booking) => (
              <div key={booking.id} className="card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{booking.propertyTitle}</h3>
                    <p className="text-stone-600 dark:text-stone-400 mb-3">
                      <span className="font-medium">Booking ID:</span> {booking.id}
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-stone-500 dark:text-stone-400">Check-in</p>
                        <p className="font-medium text-stone-900 dark:text-white">{booking.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 dark:text-stone-400">Check-out</p>
                        <p className="font-medium text-stone-900 dark:text-white">{booking.checkOut}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 dark:text-stone-400">Rental Months</p>
                        <p className="font-medium text-stone-900 dark:text-white">{booking.rentalMonths} month{booking.rentalMonths > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-stone-500 dark:text-stone-400">Booked On</p>
                        <p className="font-medium text-stone-900 dark:text-white">{booking.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-stone-600 dark:text-stone-400 text-sm mb-1">Total Rent</p>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {formatPrice(booking.totalPrice)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium rounded-full">
                        {booking.status}
                      </span>
                    </div>
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
