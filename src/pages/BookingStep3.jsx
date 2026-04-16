import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBooking } from '../components/booking/BookingContext'
import { useAvailability } from '../hooks/useAvailability'

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

const BG_MONTHS = ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември']

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev  = new Date(year, month, 0).getDate()
  const prevDays = Array.from({ length: offset }, (_, i) => ({ day: daysInPrev - offset + 1 + i, type: 'prev' }))
  const curDays  = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, type: 'cur' }))
  const remaining = 42 - prevDays.length - curDays.length
  const nextDays = Array.from({ length: remaining }, (_, i) => ({ day: i + 1, type: 'next' }))
  return [...prevDays, ...curDays, ...nextDays]
}

function toDateStr(date) {
  return date.toISOString().split('T')[0]
}

const steps = ['1. Услуга', '2. Майстор', '3. Час', '4. Потвърждение']

export default function BookingStep3() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewYear, setViewYear]   = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)

  const { booking, update } = useBooking()
  const navigate = useNavigate()

  const dateStr = selectedDate ? toDateStr(selectedDate) : null
  const { available, booked, loading: slotsLoading } = useAvailability(
    dateStr,
    booking.master?.id,
    booking.service?.duration_min ?? 60
  )

  const calDays = buildCalendarDays(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function selectDate(day, type) {
    if (type !== 'cur') return
    const d = new Date(viewYear, viewMonth, day)
    if (d < today) return
    if (d.getDay() === 0) return // Sunday closed
    setSelectedDate(d)
    update({ time: null })
  }

  function selectTime(t) {
    update({ time: t })
  }

  function handleContinue() {
    if (!selectedDate || !booking.time) return
    update({ date: toDateStr(selectedDate) })
    navigate('/booking/confirmation')
  }

  const morning   = available.filter(t => t < '12:00')
  const afternoon = available.filter(t => t >= '12:00' && t < '17:00')
  const evening   = available.filter(t => t >= '17:00')

  const renderSlot = (time) => {
    const isSelected = booking.time === time
    return (
      <button
        key={time}
        onClick={() => selectTime(time)}
        className={`py-4 border font-mono text-sm transition-all active:scale-95 ${
          isSelected
            ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A] font-bold shadow-lg'
            : 'border-[#2A2A2A] text-[#EDE8DF] hover:border-[#C9A84C] hover:text-[#C9A84C]'
        }`}
      >
        {time}
      </button>
    )
  }

  const renderBookedSlot = (time) => (
    <button key={time} disabled className="py-4 border border-[#2A2A2A] font-mono text-sm text-[#3A3A3A] opacity-40 cursor-not-allowed line-through">
      {time}
    </button>
  )

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        {/* Stepper */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-3xl mx-auto relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2A2A2A] -translate-y-1/2 hidden md:block"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold josefin-nav text-xs ${
                  i === 2
                    ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                    : i < 2
                    ? 'bg-[#1C1B1B] border border-[#C9A84C]/40 text-[#C9A84C]'
                    : 'bg-[#131313] border border-[#2A2A2A] text-[#8A8070]'
                }`}>{i < 2 ? '✓' : i + 1}</div>
                <span className={`josefin-nav text-[10px] ${i === 2 ? 'text-[#C9A84C] font-bold' : i < 2 ? 'text-[#C9A84C] opacity-60' : 'text-[#8A8070]'}`}>{step}</span>
              </div>
            ))}
          </div>
          <h1 className="cormorant-display text-4xl md:text-5xl text-[#EDE8DF] text-center md:text-left">Избор на дата и час</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Calendar */}
          <div className="lg:col-span-5 bg-[#131313] p-8 rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="josefin-nav uppercase tracking-widest text-sm text-[#C9A84C]">
                {BG_MONTHS[viewMonth]} {viewYear}
              </h2>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-2 hover:bg-[#1C1B1B] transition-colors rounded">
                  <span className="material-symbols-outlined text-[#8A8070]">chevron_left</span>
                </button>
                <button onClick={nextMonth} className="p-2 hover:bg-[#1C1B1B] transition-colors rounded">
                  <span className="material-symbols-outlined text-[#8A8070]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-2 text-center">
              {weekdays.map(d => (
                <div key={d} className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-tighter pb-3">{d}</div>
              ))}
              {calDays.map(({ day, type }, idx) => {
                const dateObj = new Date(viewYear, viewMonth + (type === 'prev' ? -1 : type === 'next' ? 1 : 0), day)
                const isPast    = dateObj < today
                const isSunday  = dateObj.getDay() === 0
                const isToday   = dateObj.getTime() === today.getTime()
                const isSelected = selectedDate && dateObj.getTime() === selectedDate.getTime()
                const isDisabled = type !== 'cur' || isPast || isSunday

                return (
                  <div
                    key={idx}
                    onClick={() => !isDisabled && selectDate(day, type)}
                    className={`relative py-2 flex items-center justify-center ${
                      isDisabled ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    {isSelected && <span className="absolute inset-0 m-auto w-8 h-8 bg-[#C9A84C] rounded-sm" />}
                    {isToday && !isSelected && <span className="absolute inset-0 m-auto w-8 h-8 border border-[#C9A84C]/40 rounded-sm" />}
                    <span className={`relative font-mono text-sm ${
                      isSelected ? 'text-[#0A0A0A] font-bold' : isToday ? 'text-[#C9A84C] font-bold' : 'text-[#EDE8DF]'
                    }`}>{day}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#C9A84C] rounded-[1px]" />
                <span className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-wider">Избрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-[#C9A84C]/40 rounded-[1px]" />
                <span className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-wider">Днес</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#2A2A2A] rounded-[1px] opacity-40" />
                <span className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-wider">Затворено</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-7">
            <div className="bg-[#131313] rounded-sm h-full flex flex-col">
              <div className="p-8 border-b border-[#2A2A2A] flex justify-between items-center">
                <div>
                  <h3 className="josefin-nav uppercase tracking-widest text-sm text-[#EDE8DF]">Налични часове</h3>
                  <p className="font-body text-xs text-[#8A8070] mt-1 italic">
                    {selectedDate
                      ? selectedDate.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' })
                      : 'Изберете дата от календара'}
                  </p>
                </div>
                {booking.master && (
                  <span className="josefin-nav text-xs text-[#C9A84C] bg-[#C9A84C]/10 px-3 py-1 border border-[#C9A84C]/20">
                    {booking.master.name}
                  </span>
                )}
              </div>

              <div className="p-8 overflow-y-auto max-h-[500px]">
                {!selectedDate ? (
                  <p className="text-[#8A8070] text-sm italic text-center py-12">Изберете дата, за да видите наличните часове.</p>
                ) : slotsLoading ? (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="h-12 bg-[#1C1B1B] animate-pulse rounded" />
                    ))}
                  </div>
                ) : available.length === 0 && booked.length === 0 ? (
                  <p className="text-[#8A8070] text-sm italic text-center py-12">Няма налични часове за тази дата.</p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {morning.length > 0 && (
                      <div className="col-span-full josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mt-2 mb-2">Сутрин</div>
                    )}
                    {morning.map(renderSlot)}

                    {afternoon.length > 0 && (
                      <div className="col-span-full josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mt-4 mb-2">Следобед</div>
                    )}
                    {afternoon.map(renderSlot)}

                    {evening.length > 0 && (
                      <div className="col-span-full josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mt-4 mb-2">Вечер</div>
                    )}
                    {evening.map(renderSlot)}

                    {booked.length > 0 && (
                      <>
                        <div className="col-span-full josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mt-4 mb-2 opacity-50">Заети</div>
                        {booked.map(renderBookedSlot)}
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-auto p-8 bg-[#0E0E0E] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-[#8A8070] text-xs">
                  <span className="material-symbols-outlined !text-sm">schedule</span>
                  <span>Продължителност: {booking.service?.duration_min ?? 60} мин.</span>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => navigate('/booking')}
                    className="flex-1 md:flex-none px-8 py-3 border border-[#2A2A2A] text-[#8A8070] josefin-nav uppercase tracking-widest text-[10px] hover:bg-[#1C1B1B] transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={!selectedDate || !booking.time}
                    className="flex-1 md:flex-none px-12 py-3 bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold uppercase tracking-widest text-[10px] disabled:opacity-40 active:scale-95 transition-all"
                  >
                    Продължи
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] w-full border-t border-[#2A2A2A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-6">
            <span className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Brillare by BM</span>
            <p className="text-[#8A8070] max-w-xs text-sm font-body italic">Precision is not a skill, it is a state of mind.</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Follow</span>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" href="#">Instagram</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Visit</span>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" to="/contact">Contact</Link>
            </div>
          </div>
          <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2024 Brillare by BM</p>
        </div>
      </footer>
    </div>
  )
}
