import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const BookingContext = createContext(null)

export function BookingProvider() {
  const [booking, setBooking] = useState({
    service: null,
    master: null,
    date: null,
    time: null,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
  })

  function update(fields) {
    setBooking(prev => ({ ...prev, ...fields }))
  }

  function reset() {
    setBooking({
      service: null,
      master: null,
      date: null,
      time: null,
      clientName: '',
      clientPhone: '',
      clientEmail: '',
    })
  }

  return (
    <BookingContext.Provider value={{ booking, update, reset }}>
      <Outlet />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
