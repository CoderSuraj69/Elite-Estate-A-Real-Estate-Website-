import { createContext, useContext, useState, useEffect } from 'react'

const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('realEstateFavourites')
    if (stored) setFavourites(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('realEstateFavourites', JSON.stringify(favourites))
  }, [favourites])

  const addFavourite = (property) => {
    if (!favourites.find(p => p.id === property.id)) {
      setFavourites(prev => [...prev, property])
    }
  }

  const removeFavourite = (id) => {
    setFavourites(prev => prev.filter(p => p.id !== id))
  }

  const isFavourite = (id) => favourites.some(p => p.id === id)

  const toggleFavourite = (property) => {
    if (isFavourite(property.id)) removeFavourite(property.id)
    else addFavourite(property)
  }

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext)
  if (!ctx) throw new Error('useFavourites must be used within FavouritesProvider')
  return ctx
}
