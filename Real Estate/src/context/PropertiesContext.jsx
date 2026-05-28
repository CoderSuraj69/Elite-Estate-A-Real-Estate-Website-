import { createContext, useContext, useState } from 'react'
import { properties as initialProperties } from '../data/properties'

const PropertiesContext = createContext()

export function useProperties() {
  return useContext(PropertiesContext)
}

export function PropertiesProvider({ children }) {
  const [properties, setProperties] = useState(initialProperties)

  const addProperty = (newProperty) => {
    const id = (Math.max(...properties.map(p => parseInt(p.id))) + 1).toString()
    setProperties([...properties, { ...newProperty, id }])
  }

  const editProperty = (id, updatedProperty) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updatedProperty } : p))
  }

  const deleteProperty = (id) => {
    setProperties(properties.filter(p => p.id !== id))
  }

  const updatePropertyStatus = (id, status) => {
    setProperties(properties.map(p => p.id === id ? { ...p, status } : p))
  }

  return (
    <PropertiesContext.Provider value={{ properties, addProperty, editProperty, deleteProperty, updatePropertyStatus }}>
      {children}
    </PropertiesContext.Provider>
  )
}