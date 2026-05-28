import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavourites } from '../context/FavouritesContext'

export default function PropertyCard({ property }) {
  const { user } = useAuth()
  const { isFavourite, toggleFavourite } = useFavourites()

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  }

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
            {property.type}
          </span>
        </div>
        {user && (
          <button
            onClick={(e) => { e.preventDefault(); toggleFavourite(property) }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-800 transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isFavourite(property.id) ? 'text-red-500 fill-red-500' : 'text-stone-600 dark:text-stone-400'}`}
              fill={isFavourite(property.id) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>
      <Link to={`/properties/${property.id}`} className="block p-6">
        <h3 className="text-xl font-display font-semibold text-stone-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {property.title}
        </h3>
        <p className="text-primary-600 dark:text-primary-400 font-semibold mt-2">{formatPrice(property.price)}</p>
        <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>
        <div className="flex gap-4 mt-4 text-sm text-stone-600 dark:text-stone-400">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} sqft</span>
        </div>
      </Link>
    </div>
  )
}
