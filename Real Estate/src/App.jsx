import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import EditProperty from './pages/EditProperty'
import AddProperty from './pages/AddProperty'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Favourites from './pages/Favourites'
import MyBookings from './pages/MyBookings'
import { useAuth } from './context/AuthContext'
import Footer from './components/Footer'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={
            <ProtectedRoute><Favourites /></ProtectedRoute>
          } />
          <Route path="/my-bookings" element={
            <ProtectedRoute><MyBookings /></ProtectedRoute>
          } />
          <Route path="/add-property" element={
            <ProtectedRoute><AddProperty /></ProtectedRoute>
          } />
          <Route path="/edit-property/:id" element={
            <ProtectedRoute><EditProperty /></ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
