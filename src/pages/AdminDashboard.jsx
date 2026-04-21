import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import AdminBottomNav from '../components/admin/AdminBottomNav'
import BookingModal from '../components/admin/BookingModal'
import AdminSettings from '../components/admin/AdminSettings'

const BG_DAYS        = ['Неделя','Понеделник','Вторник','Сряда','Четвъртък','Петък','Събота']
const BG_MONTHS      = ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември']
const BG_MONTHS_SHORT = ['Яну','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']
const WEEKDAYS       = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд']

const START_HOUR  = 9
const END_HOUR    = 19
const PX_PER_HOUR = 80
const HOURS = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i)
const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * PX_PER_HOUR

const STATUS_MAP = {
  pending:   { dot: 'bg-yellow-500', label: 'Чакаща',    text: 'text-yellow-400' },
  confirmed: { dot: 'bg-green-500',  label: 'Потвърдена', text: 'text-green-400'  },
  completed: { dot: 'bg-[#C9A84C]',  label: 'Завършена', text: 'text-[#C9A84C]'  },
  cancelled: { dot: 'bg-red-500',    label: 'Отменена',  text: 'text-red-400'    },
  no_show:   { dot: 'bg-[#4A4540]',  label: 'Неявяване', text: 'text-[#8A8070]'  },
}

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function timeToMinutes(t) {
  if (!t) return 0
  const [h, m] = t.slice(0, 5).split(':').map(Number)
  return h * 60 + m
}

function getTop(timeStr) {
  const mins = timeToMinutes(timeStr) - START_HOUR * 60
  return Math.max(0, (mins / 60) * PX_PER_HOUR)
}

function getHeight(startStr, endStr) {
  if (!endStr) return PX_PER_HOUR
  const dur = timeToMinutes(endStr) - timeToMinutes(startStr)
  return Math.max(36, (dur / 60) * PX_PER_HOUR)
}

function getWeekStart(date) {
  const d = new Date(date); d.setHours(0,0,0,0)
  const day = d.getDay()
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day))
  return d
}

function buildCalDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset   = firstDay === 0 ? 6 : firstDay - 1
  const inMonth  = new Date(year, month + 1, 0).getDate()
  const inPrev   = new Date(year, month, 0).getDate()
  const prev = Array.from({ length: offset }, (_, i) => ({ day: inPrev - offset + 1 + i, type: 'prev' }))
  const cur  = Array.from({ length: inMonth }, (_, i) => ({ day: i + 1, type: 'cur' }))
  const next = Array.from({ length: 42 - prev.length - cur.length }, (_, i) => ({ day: i + 1, type: 'next' }))
  return [...prev, ...cur, ...next]
}

/* ── Booking Detail Sheet ── */
function BookingDetailSheet({ booking, onClose, onEdit, onRefresh }) {
  const [history, setHistory] = useState([])
  const [histLoading, setHistLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!booking?.client_id) return
    setHistLoading(true)
    supabase
      .from('bookings')
      .select('id, date, time_start, status, service:services(name), master:masters(name)')
      .eq('client_id', booking.client_id)
      .order('date', { ascending: false })
      .limit(12)
      .then(({ data }) => { setHistory(data ?? []); setHistLoading(false) })
  }, [booking?.client_id])

  async function handleDelete() {
    setDeleting(true)
    await supabase.from('bookings').delete().eq('id', booking.id)
    onRefresh?.()
    onClose()
  }

  const st = STATUS_MAP[booking.status] || STATUS_MAP.pending
  const BG_MONTHS_HIS = ['Яну','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']

  function formatDate(d) {
    if (!d) return '—'
    const [y, m, day] = d.split('-')
    return `${parseInt(day)} ${BG_MONTHS_HIS[parseInt(m)-1]} ${y}`
  }

  return (
    <div className="fixed inset-0 z-[150]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Sheet */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#0E0E0E] border-t border-[#2A2A2A] max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-[#2A2A2A] rounded-full" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">

          {/* Booking summary */}
          <div className="py-4 border-b border-[#1A1A1A]">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-mono text-xs text-[#C9A84C]">
                  {booking.time_start?.slice(0,5)} – {booking.time_end?.slice(0,5) ?? '—'}
                </p>
                <p className="josefin-nav text-lg font-bold text-[#EDE8DF] mt-0.5">
                  {booking.client?.name ?? '—'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 mt-1 shrink-0">
                <div className={`w-2 h-2 rounded-full ${st.dot}`} />
                <span className={`josefin-nav text-[10px] uppercase tracking-widest ${st.text}`}>{st.label}</span>
              </div>
            </div>

            {booking.client?.phone && (
              <a
                href={`tel:${booking.client.phone}`}
                className="flex items-center gap-2 text-[#8A8070] hover:text-[#C9A84C] transition-colors mb-2"
              >
                <span className="material-symbols-outlined text-base">call</span>
                <span className="font-mono text-sm">{booking.client.phone}</span>
              </a>
            )}

            <p className="font-body text-sm text-[#8A8070] italic">{booking.service?.name}</p>
            {booking.admin_notes && (
              <p className="mt-2 text-xs text-[#5A5550] font-body">{booking.admin_notes}</p>
            )}
          </div>

          {/* Actions */}
          <div className="py-4 border-b border-[#1A1A1A] flex gap-3">
            <button
              onClick={() => { onClose(); onEdit(booking) }}
              className="flex-1 py-3 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[11px] uppercase font-bold tracking-widest"
            >
              Редактирай
            </button>
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-5 py-3 border border-[#3A2020] text-red-400 josefin-nav text-[11px] uppercase tracking-widest"
              >
                Изтрий
              </button>
            ) : (
              <div className="flex gap-2 flex-1">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 bg-red-900/40 border border-red-500/40 text-red-400 josefin-nav text-[11px] uppercase font-bold disabled:opacity-40"
                >
                  {deleting ? '...' : 'Да, изтрий'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-3 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[11px] uppercase"
                >
                  Не
                </button>
              </div>
            )}
          </div>

          {/* Client history */}
          {booking.client_id && (
            <div className="pt-4">
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-3">
                История — {booking.client?.name}
              </p>
              {histLoading && (
                <div className="space-y-2">
                  {[1,2,3].map(i => <div key={i} className="h-10 bg-[#131313] animate-pulse" />)}
                </div>
              )}
              {!histLoading && history.length === 0 && (
                <p className="text-xs text-[#4A4540] font-body italic">Няма предишни посещения</p>
              )}
              {!histLoading && history.map(h => {
                const hst = STATUS_MAP[h.status] || STATUS_MAP.pending
                return (
                  <div key={h.id} className="flex items-center justify-between py-2.5 border-b border-[#1A1A1A] last:border-0">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-[#C9A84C]">{formatDate(h.date)}</p>
                      <p className="josefin-nav text-xs text-[#EDE8DF] truncate">{h.service?.name ?? '—'}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${hst.dot}`} />
                      <span className={`font-mono text-[9px] uppercase ${hst.text}`}>{hst.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Time Grid ── */
function TimeGrid({ bookings, loading, onSelect }) {
  return (
    <div className="flex gap-0 px-4">
      {/* Time labels */}
      <div className="shrink-0 w-11 relative" style={{ height: TOTAL_HEIGHT }}>
        {HOURS.map(h => (
          <div
            key={h}
            className="absolute w-full flex items-center"
            style={{ top: (h - START_HOUR) * PX_PER_HOUR - 7 }}
          >
            <span className="font-mono text-[10px] text-[#3A3A3A]">{String(h).padStart(2,'0')}:00</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 relative border-l border-[#1C1C1C]" style={{ height: TOTAL_HEIGHT }}>

        {/* Hour lines */}
        {HOURS.map(h => (
          <div
            key={h}
            className="absolute left-0 right-0 border-t border-[#1A1A1A]"
            style={{ top: (h - START_HOUR) * PX_PER_HOUR }}
          />
        ))}

        {/* Loading */}
        {loading && [...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute left-2 right-2 h-16 bg-[#131313] animate-pulse rounded-sm"
            style={{ top: i * 110 + 40 }}
          />
        ))}

        {/* Empty state */}
        {!loading && bookings.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
            <span className="material-symbols-outlined text-4xl text-[#1C1C1C]">calendar_today</span>
            <p className="josefin-nav text-[10px] text-[#2A2A2A] uppercase tracking-widest">Няма резервации</p>
          </div>
        )}

        {/* Booking cards */}
        {!loading && bookings.map(b => {
          const top    = getTop(b.time_start)
          const height = getHeight(b.time_start, b.time_end)
          const st     = STATUS_MAP[b.status] || STATUS_MAP.pending

          return (
            <div
              key={b.id}
              className="absolute left-2 right-2 cursor-pointer"
              style={{ top: top + 5, height: height - 10 }}
              onClick={() => onSelect && onSelect(b)}
            >
              <div className="h-full bg-[#161510] border border-[#2A2520] border-l-2 border-l-[#C9A84C] rounded-sm px-2.5 py-2 flex flex-col justify-between overflow-hidden shadow-sm active:opacity-70 transition-opacity">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] md:text-xs text-[#C9A84C] mb-1 leading-none">
                    {b.time_start?.slice(0,5)} – {b.time_end?.slice(0,5) ?? '—'}
                  </p>
                  <p className="josefin-nav text-xs md:text-sm font-bold text-[#EDE8DF] truncate leading-tight">
                    {b.client?.name ?? '—'}
                  </p>
                  {height > 56 && (
                    <p className="font-body text-[10px] md:text-xs text-[#6A6560] italic truncate leading-snug mt-0.5">
                      {b.service?.name}
                    </p>
                  )}
                </div>
                {height > 48 && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${st.dot}`} />
                    <span className={`font-mono text-[9px] md:text-[10px] uppercase tracking-wider ${st.text}`}>{st.label}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const today = new Date(); today.setHours(0,0,0,0)

  const [view, setView]         = useState('today')
  const [calMode, setCalMode]   = useState('week')
  const [calYear, setCalYear]   = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(today)
  const [bookings, setBookings]         = useState([])
  const [monthBookings, setMonthBookings] = useState({})
  const [loading, setLoading]   = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editBooking, setEditBooking]   = useState(null)
  const [detailBooking, setDetailBooking] = useState(null)

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

  useEffect(() => {
    async function fetchMonth() {
      const firstDay = `${calYear}-${String(calMonth+1).padStart(2,'0')}-01`
      const lastDay  = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${new Date(calYear, calMonth+1, 0).getDate()}`
      const { data } = await supabase
        .from('bookings').select('date, time_start')
        .gte('date', firstDay).lte('date', lastDay)
        .not('status', 'eq', 'cancelled').order('time_start')
      const map = {}
      ;(data ?? []).forEach(b => { if (!map[b.date]) map[b.date] = b.time_start?.slice(0,5) })
      setMonthBookings(map)
    }
    fetchMonth()
  }, [calYear, calMonth])

  useEffect(() => {
    setCalYear(selectedDate.getFullYear())
    setCalMonth(selectedDate.getMonth())
  }, [selectedDate])

  function openCreate()   { setEditBooking(null); setShowModal(true) }
  function openEdit(b)    { setEditBooking(b);    setShowModal(true) }
  function openDetail(b)  { setDetailBooking(b) }

  /* ── Shared day header ── */
  function DayHeader({ date, extra }) {
    const dIsToday = toDateStr(date) === toDateStr(today)
    return (
      <div className="px-5 pt-5 pb-3 shrink-0 flex items-center justify-between">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">
            {dIsToday ? 'Днес' : BG_DAYS[date.getDay()]}
          </p>
          <h2 className="cormorant-display text-2xl text-[#EDE8DF]">
            {date.getDate()} {BG_MONTHS[date.getMonth()]}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {!dIsToday && view === 'today' && (
            <button
              onClick={() => setSelectedDate(new Date(today))}
              className="text-[10px] josefin-nav text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-2"
            >
              Днес
            </button>
          )}
          {!loading && bookings.length > 0 && (
            <span className="josefin-nav text-xs font-bold text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1.5">
              {bookings.length} рез.
            </span>
          )}
          {extra}
        </div>
      </div>
    )
  }

  /* ── Day View ── */
  function DayView() {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <DayHeader date={selectedDate} />
        <div className="flex-1 overflow-y-auto pb-24 pt-2">
          <TimeGrid
            bookings={bookings}
            loading={loading}
            onSelect={openDetail}
          />
        </div>
      </div>
    )
  }

  /* ── Week View ── */
  function WeekView() {
    const weekStart = getWeekStart(selectedDate)
    const weekDays  = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart); d.setDate(weekStart.getDate() + i); return d
    })
    const weekEnd = weekDays[6]
    const sameMonth = weekStart.getMonth() === weekEnd.getMonth()
    const weekLabel = sameMonth
      ? `${weekStart.getDate()}–${weekEnd.getDate()} ${BG_MONTHS_SHORT[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`
      : `${weekStart.getDate()} ${BG_MONTHS_SHORT[weekStart.getMonth()]} – ${weekEnd.getDate()} ${BG_MONTHS_SHORT[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`

    function prevWeek() { const d = new Date(weekStart); d.setDate(d.getDate()-7); setSelectedDate(d) }
    function nextWeek() { const d = new Date(weekStart); d.setDate(d.getDate()+7); setSelectedDate(d) }

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Week navigation */}
        <div className="px-4 pt-3 pb-2 shrink-0 border-b border-[#1A1A1A]">
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevWeek} className="w-8 h-8 flex items-center justify-center text-[#8A8070] active:text-[#EDE8DF]">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <div className="text-center">
              <p className="josefin-nav text-[9px] text-[#8A8070] uppercase tracking-widest">Седмица</p>
              <p className="font-mono text-[11px] text-[#EDE8DF]">{weekLabel}</p>
            </div>
            <button onClick={nextWeek} className="w-8 h-8 flex items-center justify-center text-[#8A8070] active:text-[#EDE8DF]">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Day tabs */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d, i) => {
              const isSel     = toDateStr(d) === toDateStr(selectedDate)
              const isT       = toDateStr(d) === toDateStr(today)
              const isWeekend = d.getDay() === 0 || d.getDay() === 6
              const hasDot    = !!monthBookings[toDateStr(d)]

              return (
                <button
                  key={i}
                  onClick={() => !isWeekend && setSelectedDate(new Date(d))}
                  className={`flex flex-col items-center py-1.5 px-1 rounded-sm transition-all ${
                    isSel ? 'bg-[#C9A84C]'
                    : isT  ? 'border border-[#C9A84C]/40'
                    : 'border border-transparent'
                  } ${isWeekend ? 'opacity-25 cursor-default' : 'active:opacity-60'}`}
                >
                  <span className={`josefin-nav text-[9px] uppercase ${isSel ? 'text-[#0A0A0A]' : 'text-[#8A8070]'}`}>
                    {WEEKDAYS[i]}
                  </span>
                  <span className={`font-mono text-sm font-bold leading-tight ${
                    isSel ? 'text-[#0A0A0A]' : isT ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'
                  }`}>{d.getDate()}</span>
                  <div className={`w-1 h-1 rounded-full mt-0.5 ${hasDot && !isSel ? 'bg-[#C9A84C]' : 'bg-transparent'}`} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected day */}
        <DayHeader date={selectedDate} />

        <div className="flex-1 overflow-y-auto pb-24 pt-2">
          <TimeGrid
            bookings={bookings}
            loading={loading}
            onSelect={openDetail}
          />
        </div>
      </div>
    )
  }

  /* ── Month View ── */
  function MonthView() {
    const calDays = buildCalDays(calYear, calMonth)

    function prevMonth() {
      if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1) } else setCalMonth(m => m-1)
    }
    function nextMonth() {
      if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1) } else setCalMonth(m => m+1)
    }

    return (
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="josefin-nav text-[#C9A84C] uppercase tracking-widest text-sm">
            {BG_MONTHS[calMonth]} {calYear}
          </h2>
          <div className="flex gap-1">
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
            const dateObj = new Date(calYear, calMonth + (type==='prev'?-1:type==='next'?1:0), day)
            const isT   = dateObj.getTime() === today.getTime()
            const isSel = dateObj.getTime() === selectedDate.getTime()
            const disabled = type !== 'cur'
            const firstTime = type === 'cur' ? monthBookings[toDateStr(dateObj)] : null

            return (
              <div
                key={idx}
                onClick={() => { if (type==='cur') { setSelectedDate(dateObj); setCalMode('week') }}}
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
        <p className="text-center text-xs text-[#8A8070] mt-6">Докоснете дата за седмичен изглед</p>
      </div>
    )
  }

  /* ── Calendar wrapper ── */
  function CalendarView() {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-5 pt-4 pb-3 shrink-0">
          <div className="flex bg-[#131313] border border-[#2A2A2A] p-0.5 rounded-sm">
            <button
              onClick={() => setCalMode('week')}
              className={`flex-1 py-2 josefin-nav text-[10px] uppercase tracking-widest rounded-[2px] transition-all ${
                calMode === 'week' ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold' : 'text-[#8A8070]'
              }`}
            >Седмичен</button>
            <button
              onClick={() => setCalMode('month')}
              className={`flex-1 py-2 josefin-nav text-[10px] uppercase tracking-widest rounded-[2px] transition-all ${
                calMode === 'month' ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold' : 'text-[#8A8070]'
              }`}
            >Месечен</button>
          </div>
        </div>
        {calMode === 'week'  && <WeekView />}
        {calMode === 'month' && <MonthView />}
      </div>
    )
  }

  const headerTitle = view === 'today'
    ? 'График — Днес'
    : calMode === 'week' ? 'Седмичен график' : 'Месечна програма'

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
      />

      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">{headerTitle}</h1>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={fetchBookings} className="p-2 text-[#8A8070] active:text-[#EDE8DF] transition-colors">
            <span className="material-symbols-outlined">refresh</span>
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 text-[#8A8070] active:text-[#EDE8DF] transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button
            onClick={async () => { await signOut(); navigate('/') }}
            className="p-2 text-[#8A8070] active:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'today'    && <DayView />}
        {view === 'calendar' && <CalendarView />}
      </div>

      <button
        onClick={openCreate}
        className="fixed right-5 bottom-[80px] z-40 w-14 h-14 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A84C]/20 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <AdminBottomNav activeView={view} onChangeView={setView} />

      {showSettings && <AdminSettings onClose={() => setShowSettings(false)} />}

      {detailBooking && (
        <BookingDetailSheet
          booking={detailBooking}
          onClose={() => setDetailBooking(null)}
          onEdit={openEdit}
          onRefresh={fetchBookings}
        />
      )}

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
