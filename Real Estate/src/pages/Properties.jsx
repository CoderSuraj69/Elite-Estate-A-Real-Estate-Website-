import { useState } from 'react'
import { useProperties } from '../context/PropertiesContext'
import PropertyCard from '../components/PropertyCard'

export default function Properties() {
  const { properties } = useProperties()
  const [filter, setFilter] = useState({ type: '', minPrice: '', maxPrice: '' })

  const filtered = properties.filter((p) => {
    if (p.status !== 'available') return false
    if (filter.type && p.type !== filter.type) return false
    if (filter.minPrice && p.price < Number(filter.minPrice)) return false
    if (filter.maxPrice && p.price > Number(filter.maxPrice)) return false
    return true
  })

  const types = [...new Set(properties.map((p) => p.type))]

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-2">
          All Properties
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-10">
          Browse our complete collection of premium listings
        </p>

        <div className="flex flex-wrap gap-4 mb-10 p-4 bg-white dark:bg-stone-900 rounded-2xl shadow-lg dark:shadow-stone-900/50">
          <select
            value={filter.type}
            onChange={(e) => setFilter((f) => ({ ...f, type: e.target.value }))}
            className="input-field max-w-[180px]"
          >
            <option value="">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={filter.minPrice}
            onChange={(e) => setFilter((f) => ({ ...f, minPrice: e.target.value }))}
            className="input-field max-w-[140px]"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filter.maxPrice}
            onChange={(e) => setFilter((f) => ({ ...f, maxPrice: e.target.value }))}
            className="input-field max-w-[140px]"
          />
          <button
            onClick={() => setFilter({ type: '', minPrice: '', maxPrice: '' })}
            className="btn-secondary"
          >
            Clear
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-500 py-16">No properties match your filters.</p>
        )}
      </div>
    </div>
  )
}
