import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Working hours: slots every 45 min from 09:00 to 19:45
const SLOT_INTERVAL = 45
const DAY_START = 9 * 60   // 09:00 in minutes
const DAY_END   = 19 * 60 + 45 // 19:45 in minutes

function minutesToTime(m) {
  const hh = String(Math.floor(m / 60)).padStart(2, '0')
  const mm = String(m % 60).padStart(2, '0')
  return `${hh}:${mm}`
}

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function generateSlots() {
  const slots = []
  for (let start = DAY_START; start + SLOT_INTERVAL <= DAY_END + SLOT_INTERVAL; start += SLOT_INTERVAL) {
    slots.push(minutesToTime(start))
  }
  return slots
}

export function useAvailability(dateStr, masterId, durationMin = 60) {
  const [available, setAvailable] = useState([])
  const [booked, setBooked] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!dateStr || !masterId) return

    setLoading(true)
    supabase
      .from('bookings')
      .select('time_start, time_end')
      .eq('date', dateStr)
      .eq('master_id', masterId)
      .not('status', 'in', '("cancelled","no_show")')
      .then(({ data }) => {
        const existingBookings = data ?? []
        const allSlots = generateSlots()
        const availableSlots = []
        const bookedSlots = []

        for (const slotTime of allSlots) {
          const slotStart = timeToMinutes(slotTime)
          const slotEnd   = slotStart + durationMin

          const hasConflict = existingBookings.some(b => {
            const bStart = timeToMinutes(b.time_start)
            const bEnd   = b.time_end ? timeToMinutes(b.time_end) : bStart + 60
            return slotStart < bEnd && slotEnd > bStart
          })

          if (hasConflict) {
            bookedSlots.push(slotTime)
          } else {
            availableSlots.push(slotTime)
          }
        }

        setAvailable(availableSlots)
        setBooked(bookedSlots)
        setLoading(false)
      })
  }, [dateStr, masterId, durationMin])

  return { available, booked, loading }
}

export function computeTimeEnd(timeStart, durationMin) {
  const totalMin = timeToMinutes(timeStart) + durationMin
  return minutesToTime(totalMin)
}
