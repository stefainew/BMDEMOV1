import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import CookieBanner from './components/CookieBanner'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { BookingProvider } from './components/booking/BookingContext'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import BookingStep1 from './pages/BookingStep1'
import BookingStep3 from './pages/BookingStep3'
import BookingConfirmation from './pages/BookingConfirmation'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminClients from './pages/AdminClients'
import AdminProducts from './pages/AdminProducts'
import AdminInbox from './pages/AdminInbox'

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Booking flow — shared state via BookingProvider */}
        <Route element={<BookingProvider />}>
          <Route path="/booking" element={<BookingStep1 />} />
          <Route path="/booking/date" element={<BookingStep3 />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
