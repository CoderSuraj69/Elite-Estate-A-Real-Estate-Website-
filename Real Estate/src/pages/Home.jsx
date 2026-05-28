import { Link } from 'react-router-dom'
import { useProperties } from '../context/PropertiesContext'
import PropertyCard from '../components/PropertyCard'

export default function Home() {
  const { properties } = useProperties()
  const featured = properties.filter(p => p.status === 'available').slice(0, 3)

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            alt="Luxury home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            Find Your <span className="text-primary-400">Dream</span> Home
          </h1>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto">
            Discover premium properties tailored to your lifestyle. From cozy apartments to luxury villas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/properties" className="btn-primary text-lg px-8 py-4">
              Explore Properties
            </Link>
            <Link to="/contact" className="btn-secondary text-lg px-8 py-4 text-white bg-white/20 hover:bg-white/30 border border-white/40">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-4">
              Featured Properties
            </h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Handpicked selections of our finest listings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties" className="btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-stone-100 dark:bg-stone-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-stone-900 dark:text-white mb-6">
            Why Choose Elite Estate?
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Listings</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">Curated selection of verified properties</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Location Insights</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">Interactive maps for every property</p>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">Dedicated team for your enquiries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
