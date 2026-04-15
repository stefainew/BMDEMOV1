import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import BookingStep1 from './pages/BookingStep1'
import BookingStep3 from './pages/BookingStep3'
import BookingConfirmation from './pages/BookingConfirmation'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/booking" element={<BookingStep1 />} />
      <Route path="/booking/date" element={<BookingStep3 />} />
      <Route path="/booking/confirmation" element={<BookingConfirmation />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    </>
  )
}
