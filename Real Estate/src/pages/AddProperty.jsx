import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../context/NotificationContext'
import { useProperties } from '../context/PropertiesContext'
import PropertyMap from '../components/PropertyMap'

export default function AddProperty() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { addProperty } = useProperties()
  const [form, setForm] = useState({
    title: '',
    price: '',
    type: 'House',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    lat: '40.7128',
    lng: '-74.0060',
    amenities: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProperty = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      area: Number(form.area),
      amenities: form.amenities.split(',').map(a => a.trim()).filter(a => a),
    }
    addProperty(newProperty)
    addNotification({
      title: 'Property added',
      message: `"${form.title}" has been added successfully.`,
      time: 'Just now',
    })
    navigate('/properties')
  }

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-stone-900 dark:text-white mb-2">
          Add Property
        </h1>
        <p className="text-stone-600 dark:text-stone-400 mb-10">
          List your property for sale or rent
        </p>

        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              className="input-field"
              placeholder="e.g. Modern 3BHK Villa"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="input-field"
                placeholder="450000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                value={form.type}
                onChange={(e) => update('type', e.target.value)}
                className="input-field"
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Cabin">Cabin</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              className="input-field"
              placeholder="City, State"
              required
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                value={form.bedrooms}
                onChange={(e) => update('bedrooms', e.target.value)}
                className="input-field"
                placeholder="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                value={form.bathrooms}
                onChange={(e) => update('bathrooms', e.target.value)}
                className="input-field"
                placeholder="2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Area (sqft)</label>
              <input
                type="number"
                value={form.area}
                onChange={(e) => update('area', e.target.value)}
                className="input-field"
                placeholder="2200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="input-field min-h-[120px]"
              placeholder="Describe your property..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amenities (comma separated)</label>
            <input
              type="text"
              value={form.amenities}
              onChange={(e) => update('amenities', e.target.value)}
              className="input-field"
              placeholder="Pool, Garden, Garage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Map Location</label>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={form.lat}
                onChange={(e) => update('lat', e.target.value)}
                className="input-field"
                placeholder="Latitude"
              />
              <input
                type="text"
                value={form.lng}
                onChange={(e) => update('lng', e.target.value)}
                className="input-field"
                placeholder="Longitude"
              />
            </div>
            <PropertyMap lat={form.lat} lng={form.lng} className="h-48" />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Submit Property
            </button>
            <button
              type="button"
              onClick={() => navigate('/properties')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
