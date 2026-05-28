import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import PropertyCard from '../components/PropertyCard'

export default function Favourites() {
  const { favourites } = useFavourites()

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-2">
          Favourites
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-10">
          {favourites.length} {favourites.length === 1 ? 'property' : 'properties'} saved
        </p>

        {favourites.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
              <svg className="w-10 h-10 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">No favourites yet</h2>
            <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-md mx-auto">
              Save properties you love by clicking the heart icon. They'll appear here for easy access.
            </p>
            <Link to="/properties" className="btn-primary">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favourites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
