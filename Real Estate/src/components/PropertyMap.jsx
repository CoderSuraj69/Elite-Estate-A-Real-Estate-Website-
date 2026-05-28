import { useEffect, useRef, useState } from 'react'

export default function PropertyMap({ lat, lng, zoom = 14, className = '' }) {
  const mapRef = useRef(null)
  const [mapError, setMapError] = useState(false)
  const [useEmbed, setUseEmbed] = useState(false)

  useEffect(() => {
    // Check if Google Maps API is loaded and has a real API key
    if (!window.google || !window.google.maps || !window.google.maps.Map) {
      setUseEmbed(true)
      return
    }

    if (!mapRef.current || !lat || !lng) return

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: parseFloat(lat), lng: parseFloat(lng) },
        zoom,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        ],
      })

      new window.google.maps.Marker({
        position: { lat: parseFloat(lat), lng: parseFloat(lng) },
        map,
        title: 'Property Location',
      })
    } catch (err) {
      setMapError(true)
      setUseEmbed(true)
    }
  }, [lat, lng, zoom])

  // Use OpenStreetMap embed as fallback (free, no API key required)
  if (useEmbed || mapError || !window.google) {
    // Convert zoom level (Google Maps zoom to OpenStreetMap zoom is similar but may need adjustment)
    const osmZoom = Math.max(1, Math.min(18, zoom));
    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(lng)-0.01},${parseFloat(lat)-0.01},${parseFloat(lng)+0.01},${parseFloat(lat)+0.01}&layer=mapnik&marker=${lat},${lng}`

    return (
      <div className={`rounded-xl overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '300px' }}
          title="Property Location Map"
        />
        <div className="text-xs text-stone-500 p-2 bg-stone-100 dark:bg-stone-800">
          Map powered by OpenStreetMap
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className={`rounded-xl overflow-hidden ${className}`} style={{ minHeight: '300px' }} />
}
