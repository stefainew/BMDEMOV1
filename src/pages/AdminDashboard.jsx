import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import AdminBottomNav from '../components/admin/AdminBottomNav'
import BookingCard from '../components/admin/BookingCard'
import BookingModal from '../components/admin/BookingModal'

const BG_DAYS   = ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота']
const BG_MONTHS = ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември']
const WEEKDAYS  = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд']

function toDateStr(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function buildCalDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset   = firstDay === 0 ? 6 : firstDay - 1
  const inMonth  = new Date(year, month + 1, 0).getDate()
  const inPrev   = new Date(year, month, 0).getDate()
  const prev = Array.from({ length: offset }, (_, i) => ({ day: inPrev - offset + 1 + i, type: 'prev' }))
  const cur  = Array.from({ length: inMonth }, (_, i) => ({ day: i + 1, type: 'cur' }))
  const rem  = 42 - prev.length - cur.length
  const next = Array.from({ length: rem }, (_, i) => ({ day: i + 1, type: 'next' }))
  return [...prev, ...cur, ...next]
}

export default function AdminDashboard() {
  const today = new Date(); today.setHours(0,0,0,0)
  const [view, setView]           = useState('today')
  const [calYear, setCalYear]     = useState(today.getFullYear())
  const [calMonth, setCalMonth]   = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(today)
  const [bookings, setBookings]         = useState([])
  const [monthBookings, setMonthBookings] = useState({}) // { 'YYYY-MM-DD': '10:00' }
  const [loading, setLoading]           = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [editBooking, setEditBooking]   = useState(null)

  const dateStr = toDateStr(selectedDate)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        client:clients(id, name, phone, notes),
        master:masters(id, name),
        service:services(id, name, duration_min, price_label, price)
      `)
      .eq('date', dateStr)
      .order('time_start')
    setBookings(data ?? [])
    setLoading(false)
  }, [dateStr])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  // Fetch first appointment time for each day in the current calendar month
  useEffect(() => {
    async function fetchMonth() {
      const firstDay = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-01`
      const lastDay  = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${new Date(calYear, calMonth + 1, 0).getDate()}`
      const { data } = await supabase
        .from('bookings')
        .select('date, time_start')
        .gte('date', firstDay)
        .lte('date', lastDay)
        .not('status', 'eq', 'cancelled')
        .order('time_start')
      const map = {}
      ;(data ?? []).forEach(b => {
        if (!map[b.date]) map[b.date] = b.time_start?.slice(0, 5)
      })
      setMonthBookings(map)
    }
    fetchMonth()
  }, [calYear, calMonth])

  function openCreate() { setEditBooking(null); setShowModal(true) }
  function openEdit(b)  { setEditBooking(b);    setShowModal(true) }

  const displayDate = `${BG_DAYS[selectedDate.getDay()]}, ${selectedDate.getDate()} ${BG_MONTHS[selectedDate.getMonth()]}`
  const isToday = toDateStr(selectedDate) === toDateStr(today)

  function DayView() {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
          <div>
            <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">
              {isToday ? 'Днес' : 'Избрана дата'}
            </p>
            <h2 className="cormorant-display text-2xl text-[#EDE8DF]">{displayDate}</h2>
          </div>
          <div className="flex items-center gap-3">
            {!isToday && (
              <button
                onClick={() => setSelectedDate(new Date(today))}
                className="text-[10px] josefin-nav text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-2"
              >
                Днес
              </button>
            )}
            <div className={`josefin-nav text-sm font-bold px-3 py-2 rounded-sm ${
              bookings.length === 0 ? 'text-[#8A8070]' : 'text-[#C9A84C] bg-[#C9A84C]/10'
            }`}>
              {loading ? '…' : `${bookings.length} ${bookings.length === 1 ? 'резерв.' : 'резерв.'}`}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-2">
          {loading ? (
            <div className="space-y-2 pt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-[#131313] animate-pulse rounded" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-[#2A2A2A] mb-4">calendar_today</span>
              <p className="josefin-nav text-[#8A8070] uppercase tracking-wide text-sm">Няма резервации</p>
              <p className="text-[#4A4540] text-xs mt-2">Докоснете + за нова резервация</p>
            </div>
          ) : (
            bookings.map(b => (
              <BookingCard
                key={b.id}
                booking={b}
                onRefresh={fetchBookings}
                onEdit={openEdit}
              />
            ))
          )}
        </div>
      </div>
    )
  }

  function CalView() {
    const calDays = buildCalDays(calYear, calMonth)

    function prevMonth() {
      if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
      else setCalMonth(m => m - 1)
    }
    function nextMonth() {
      if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
      else setCalMonth(m => m + 1)
    }

    function selectDay(day, type) {
      if (type !== 'cur') return
      const d = new Date(calYear, calMonth, day)
      setSelectedDate(d)
      setView('today')
    }

    return (
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="josefin-nav text-[#C9A84C] uppercase tracking-widest text-sm">
            {BG_MONTHS[calMonth]} {calYear}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 text-[#8A8070] active:text-[#EDE8DF]">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button onClick={nextMonth} className="p-2 text-[#8A8070] active:text-[#EDE8DF]">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center">
          {WEEKDAYS.map(d => (
            <div key={d} className="josefin-nav text-[10px] text-[#8A8070] uppercase pb-3">{d}</div>
          ))}
          {calDays.map(({ day, type }, idx) => {
            const dateObj = new Date(calYear, calMonth + (type === 'prev' ? -1 : type === 'next' ? 1 : 0), day)
            const isT     = dateObj.getTime() === today.getTime()
            const isSel   = dateObj.getTime() === selectedDate.getTime()
            const disabled = type !== 'cur'
            const dateKey = toDateStr(dateObj)
            const firstTime = type === 'cur' ? monthBookings[dateKey] : null

            return (
              <div
                key={idx}
                onClick={() => selectDay(day, type)}
                className={`relative py-1 flex flex-col items-center justify-center gap-0.5 min-h-[48px] ${disabled ? 'opacity-20' : 'cursor-pointer'}`}
              >
                {isSel && <span className="absolute inset-x-1 top-0.5 bottom-0.5 bg-[#C9A84C] rounded-sm" />}
                {isT && !isSel && <span className="absolute inset-x-1 top-0.5 bottom-0.5 border border-[#C9A84C]/40 rounded-sm" />}
                <span className={`relative font-mono text-sm leading-none ${
                  isSel ? 'text-[#0A0A0A] font-bold' : isT ? 'text-[#C9A84C] font-bold' : 'text-[#EDE8DF]'
                }`}>{day}</span>
                {firstTime && (
                  <span className={`relative font-mono text-[9px] leading-none ${isSel ? 'text-[#0A0A0A]/70' : 'text-[#C9A84C]/70'}`}>
                    {firstTime}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-[#8A8070] mt-8">Докоснете дата за да видите резервациите</p>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
      />

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">Панел</h1>
        </div>
        <button onClick={fetchBookings} className="p-2 text-[#8A8070] active:text-[#EDE8DF] transition-colors">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'today'    && <DayView />}
        {view === 'calendar' && <CalView />}
      </div>

      {/* FAB */}
      <button
        onClick={openCreate}
        className="fixed right-5 bottom-[80px] z-40 w-14 h-14 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A84C]/20 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <AdminBottomNav activeView={view} onChangeView={setView} />

      {showModal && (
        <BookingModal
          booking={editBooking}
          onClose={() => setShowModal(false)}
          onSaved={fetchBookings}
        />
      )}
    </div>
  )
}
