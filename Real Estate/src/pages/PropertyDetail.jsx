import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useProperties } from '../context/PropertiesContext'
import PropertyCard from '../components/PropertyCard'
import PropertyMap from '../components/PropertyMap'
import { useAuth } from '../context/AuthContext'
import { useFavourites } from '../context/FavouritesContext'
import { useBooking } from '../context/BookingContext'
import PaymentModal from '../components/PaymentModal'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isFavourite, toggleFavourite } = useFavourites()
  const { properties, updatePropertyStatus } = useProperties()
  const { addBooking } = useBooking()
  const [enquirySent, setEnquirySent] = useState(false)
  const [bookingType, setBookingType] = useState('enquiry') // 'enquiry' or 'booking'
  const [enquiry, setEnquiry] = useState({ name: '', email: '', phone: '', message: '' })
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '', rentalMonths: 1 })
  const [showPayment, setShowPayment] = useState(false)

  const property = properties.find((p) => p.id === id)
  const related = properties.filter((p) => p.id !== id && p.type === property?.type && p.status === 'available').slice(0, 3)

  if (!property) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <Link to="/properties" className="btn-primary">Back to Properties</Link>
      </div>
    )
  }

  const formatPrice = (price) =>
    `₹${price.toLocaleString()}`

  const handleEnquiry = (e) => {
    e.preventDefault()
    setEnquirySent(true)
    setEnquiry({ name: '', email: '', phone: '', message: '' })
  }

  const handleBooking = (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    
    const rentalPrice = property.price * booking.rentalMonths
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    const rentalPrice = property.price * booking.rentalMonths
    addBooking({
      userId: user.id || 'guest',
      propertyId: property.id,
      propertyTitle: property.title,
      propertyPrice: property.price,
      ...booking,
      totalPrice: rentalPrice,
      status: 'Confirmed',
      paymentStatus: 'Paid'
    })
    updatePropertyStatus(property.id, 'booked')
    setEnquirySent(true)
    setShowPayment(false)
    setBooking({ name: '', email: '', phone: '', checkIn: '', checkOut: '', rentalMonths: 1 })
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="mt-8">
              <h1 className="text-3xl font-display font-bold text-stone-900 dark:text-white mb-4">
                {property.title}
              </h1>
              <p className="text-2xl text-primary-600 dark:text-primary-400 font-semibold mb-6">
                {formatPrice(property.price)}
              </p>
              <div className="flex flex-wrap gap-6 text-stone-600 dark:text-stone-400 mb-6">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {property.bedrooms} Bedrooms
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  {property.bathrooms} Bathrooms
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {property.area} sqft
                </span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
                {property.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span
                    key={a}
                    className="px-4 py-2 bg-stone-200 dark:bg-stone-700 rounded-lg text-sm font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <PropertyMap lat={property.lat} lng={property.lng} className="h-64" />
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6 sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                  {property.type}
                </span>
                {user && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavourite(property)}
                      className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-red-500"
                    >
                      <svg
                        className={`w-5 h-5 ${isFavourite(property.id) ? 'fill-red-500 text-red-500' : ''}`}
                        fill={isFavourite(property.id) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {isFavourite(property.id) ? 'Saved' : 'Save'}
                    </button>
                    <Link
                      to={`/edit-property/${property.id}`}
                      className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-blue-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                  </div>
                )}
              </div>
              <p className="text-stone-500 dark:text-stone-400 flex items-center gap-2 mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {property.location}
              </p>

              {property.status === 'booked' ? (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-800 dark:text-red-200 mb-6">
                  <p className="font-semibold">This property is currently booked.</p>
                  <p>Please check back later or browse other available properties.</p>
                </div>
              ) : (
                <>
                  {/* Booking Type Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => { setBookingType('enquiry'); setEnquirySent(false) }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        bookingType === 'enquiry'
                          ? 'bg-primary-500 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      Enquiry
                    </button>
                    <button
                      onClick={() => { setBookingType('booking'); setEnquirySent(false) }}
                      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                        bookingType === 'booking'
                          ? 'bg-primary-500 text-white'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      Rent
                    </button>
                  </div>

                  {enquirySent ? (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-800 dark:text-green-200">
                  {bookingType === 'booking' ? (
                    <div>
                      <p className="font-semibold mb-2">Booking Confirmed! 🎉</p>
                      <p>Your rental booking has been confirmed. Check your bookings for details.</p>
                    </div>
                  ) : (
                    <p>Thank you! Your enquiry has been sent. We'll contact you soon.</p>
                  )}
                </div>
              ) : bookingType === 'enquiry' ? (
                <form onSubmit={handleEnquiry} className="space-y-4">
                  <h4 className="font-semibold">Send Enquiry</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={enquiry.name}
                    onChange={(e) => setEnquiry((q) => ({ ...q, name: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={enquiry.email}
                    onChange={(e) => setEnquiry((q) => ({ ...q, email: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={enquiry.phone}
                    onChange={(e) => setEnquiry((q) => ({ ...q, phone: e.target.value }))}
                    className="input-field"
                  />
                  <textarea
                    placeholder="Your message"
                    value={enquiry.message}
                    onChange={(e) => setEnquiry((q) => ({ ...q, message: e.target.value }))}
                    className="input-field min-h-[100px]"
                    rows={4}
                  />
                  <button type="submit" className="btn-primary w-full">
                    Send Enquiry
                  </button>
                </form>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <h4 className="font-semibold">Rental Booking</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={booking.name}
                    onChange={(e) => setBooking((b) => ({ ...b, name: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={booking.email}
                    onChange={(e) => setBooking((b) => ({ ...b, email: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={booking.phone}
                    onChange={(e) => setBooking((b) => ({ ...b, phone: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Check-in Date"
                    value={booking.checkIn}
                    onChange={(e) => setBooking((b) => ({ ...b, checkIn: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <input
                    type="date"
                    placeholder="Check-out Date"
                    value={booking.checkOut}
                    onChange={(e) => setBooking((b) => ({ ...b, checkOut: e.target.value }))}
                    className="input-field"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Rental Months: {booking.rentalMonths}</label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={booking.rentalMonths}
                      onChange={(e) => setBooking((b) => ({ ...b, rentalMonths: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                  <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-lg">
                    <p className="text-sm text-stone-600 dark:text-stone-400">Monthly Rent:</p>
                    <p className="text-xl font-semibold text-primary-600 dark:text-primary-400">
                      {formatPrice(property.price * booking.rentalMonths)}
                    </p>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Book Now
                  </button>
                </form>
              )}
              </>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-display font-bold mb-8">Similar Properties</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
