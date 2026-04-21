import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBooking } from '../components/booking/BookingContext'
import { useAvailability } from '../hooks/useAvailability'

const weekdays  = ['Пн','Вт','Ср','Чт','Пт','Сб','Нд']
const BG_MONTHS = ['Януари','Февруари','Март','Април','Май','Юни','Юли','Август','Септември','Октомври','Ноември','Декември']
const STEPS     = ['Услуга','Дата и час','Потвърждение']
const CURRENT   = 1

function buildCalendarDays(year, month) {
  const firstDay   = new Date(year, month, 1).getDay()
  const offset     = firstDay === 0 ? 6 : firstDay - 1
  const inMonth    = new Date(year, month + 1, 0).getDate()
  const inPrev     = new Date(year, month, 0).getDate()
  const prevDays   = Array.from({ length: offset },          (_, i) => ({ day: inPrev - offset + 1 + i, type: 'prev' }))
  const curDays    = Array.from({ length: inMonth },         (_, i) => ({ day: i + 1, type: 'cur' }))
  const nextDays   = Array.from({ length: 42 - prevDays.length - curDays.length }, (_, i) => ({ day: i + 1, type: 'next' }))
  return [...prevDays, ...curDays, ...nextDays]
}

function toDateStr(date) {
  return date.toISOString().split('T')[0]
}

/* ── Shared stepper ── */
function Stepper() {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex justify-between items-center gap-4 max-w-3xl mx-auto relative mb-8">
        <div className="absolute top-5 left-0 w-full h-[1px] bg-[#2A2A2A]" />
        {STEPS.map((step, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold josefin-nav text-xs ${
              i === CURRENT
                ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                : i < CURRENT
                ? 'bg-[#1C1B1B] border border-[#C9A84C]/40 text-[#C9A84C]'
                : 'bg-[#131313] border border-[#2A2A2A] text-[#8A8070]'
            }`}>{i < CURRENT ? '✓' : i + 1}</div>
            <span className={`josefin-nav text-[10px] whitespace-nowrap ${
              i === CURRENT ? 'text-[#C9A84C] font-bold' : i < CURRENT ? 'text-[#C9A84C] opacity-60' : 'text-[#8A8070]'
            }`}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BookingStep3() {
  const today = new Date(); today.setHours(0,0,0,0)

  const [viewYear,  setViewYear]  = useState(today.getFullYear())
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
    if (d.getDay() === 0 || d.getDay() === 6) return
    setSelectedDate(d)
    update({ time: null })
  }

  function selectTime(t) { update({ time: t }) }

  function handleContinue() {
    if (!selectedDate || !booking.time) return
    update({ date: toDateStr(selectedDate) })
    navigate('/booking/confirmation')
  }

  const morning   = available.filter(t => t < '12:00')
  const afternoon = available.filter(t => t >= '12:00' && t < '17:00')
  const evening   = available.filter(t => t >= '17:00')

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('bg-BG', { weekday: 'long', day: 'numeric', month: 'long' })
    : null

  /* ── Slot button ── */
  function SlotBtn({ time }) {
    const isSelected = booking.time === time
    return (
      <button
        onClick={() => selectTime(time)}
        className={`py-4 font-mono text-sm rounded-2xl transition-all active:scale-95 border ${
          isSelected
            ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold border-[#C9A84C] shadow-xl shadow-[#C9A84C]/25 ring-4 ring-[#C9A84C]/10'
            : 'bg-[#2A2A2A]/40 border-transparent text-[#EDE8DF] hover:border-[#C9A84C]/30'
        }`}
      >
        {time}
      </button>
    )
  }

  function BookedBtn({ time }) {
    return (
      <button disabled className="py-4 font-mono text-sm rounded-2xl bg-[#1C1B1B]/40 text-[#8A8070]/30 border border-transparent cursor-not-allowed line-through">
        {time}
      </button>
    )
  }

  /* ── Time slots panel content ── */
  function SlotsContent() {
    if (!selectedDate) return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="material-symbols-outlined text-3xl text-[#2A2A2A]">calendar_today</span>
        <p className="text-[#8A8070] text-sm italic text-center">Изберете дата от календара.</p>
      </div>
    )
    if (slotsLoading) return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => <div key={i} className="h-14 bg-[#1C1B1B] animate-pulse rounded-2xl" />)}
      </div>
    )
    if (available.length === 0 && booked.length === 0) return (
      <p className="text-[#8A8070] text-sm italic text-center py-16">Няма налични часове за тази дата.</p>
    )
    return (
      <div className="space-y-8">
        {morning.length > 0 && (
          <section>
            <h4 className="josefin-nav text-[10px] text-[#8A8070]/50 uppercase tracking-[0.3em] mb-4 pl-1">Сутрин</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {morning.map(t => <SlotBtn key={t} time={t} />)}
            </div>
          </section>
        )}
        {afternoon.length > 0 && (
          <section>
            <h4 className="josefin-nav text-[10px] text-[#8A8070]/50 uppercase tracking-[0.3em] mb-4 pl-1">Следобед</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {afternoon.map(t => <SlotBtn key={t} time={t} />)}
            </div>
          </section>
        )}
        {evening.length > 0 && (
          <section>
            <h4 className="josefin-nav text-[10px] text-[#8A8070]/50 uppercase tracking-[0.3em] mb-4 pl-1">Вечер</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {evening.map(t => <SlotBtn key={t} time={t} />)}
            </div>
          </section>
        )}
        {booked.length > 0 && (
          <section>
            <h4 className="josefin-nav text-[10px] text-[#8A8070]/30 uppercase tracking-[0.3em] mb-4 pl-1">Заети</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {booked.map(t => <BookedBtn key={t} time={t} />)}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]" />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-32 md:pb-24 px-5 md:px-12 max-w-5xl mx-auto">

        <Stepper />

        {/* Title */}
        <div className="text-center mb-12 space-y-3">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[#C9A84C]/30" />
            <span className="josefin-nav text-[10px] text-[#C9A84C] tracking-[0.3em]">Стъпка 2 от 3</span>
            <div className="h-[1px] w-8 bg-[#C9A84C]/30" />
          </div>
          <h1 className="cormorant-display text-5xl md:text-6xl text-[#EDE8DF]">Кога Ви е удобно?</h1>
          {booking.service && (
            <p className="text-[#8A8070] text-sm italic font-body max-w-md mx-auto">
              {booking.service.name}{booking.master ? ` при ${booking.master.name}` : ''}
            </p>
          )}
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Calendar ── */}
          <div className="space-y-5">
            <div
              className="rounded-3xl p-6 md:p-8 border border-white/[0.04]"
              style={{ background: 'rgba(28,27,27,0.5)', backdropFilter: 'blur(20px)' }}
            >
              {/* Month nav */}
              <div className="flex items-center justify-between mb-8 px-1">
                <h2 className="josefin-nav uppercase tracking-widest text-xs font-bold text-[#EDE8DF]">
                  {BG_MONTHS[viewMonth]} {viewYear}
                </h2>
                <div className="flex gap-1">
                  <button onClick={prevMonth} className="p-2.5 rounded-full hover:bg-white/5 text-[#8A8070] hover:text-[#C9A84C] transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_left</span>
                  </button>
                  <button onClick={nextMonth} className="p-2.5 rounded-full hover:bg-white/5 text-[#8A8070] hover:text-[#C9A84C] transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-y-1 text-center">
                {weekdays.map(d => (
                  <div key={d} className="josefin-nav text-[9px] text-[#8A8070]/50 uppercase tracking-widest pb-5">{d}</div>
                ))}
                {calDays.map(({ day, type }, idx) => {
                  const dateObj    = new Date(viewYear, viewMonth + (type === 'prev' ? -1 : type === 'next' ? 1 : 0), day)
                  const isPast     = dateObj < today
                  const isWeekend  = dateObj.getDay() === 0 || dateObj.getDay() === 6
                  const isToday    = dateObj.getTime() === today.getTime()
                  const isSelected = selectedDate && dateObj.getTime() === selectedDate.getTime()
                  const isDisabled = type !== 'cur' || isPast || isWeekend

                  if (isSelected) return (
                    <div key={idx} className="flex items-center justify-center py-1">
                      <div className="w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A84C]/20">
                        <span className="font-mono text-sm font-bold text-[#0A0A0A]">{day}</span>
                      </div>
                    </div>
                  )
                  if (isToday) return (
                    <div key={idx} className="flex items-center justify-center py-1 cursor-pointer" onClick={() => !isDisabled && selectDate(day, type)}>
                      <div className="w-10 h-10 border border-[#C9A84C]/35 rounded-full flex items-center justify-center">
                        <span className="font-mono text-sm font-bold text-[#C9A84C]">{day}</span>
                      </div>
                    </div>
                  )
                  return (
                    <div
                      key={idx}
                      onClick={() => !isDisabled && selectDate(day, type)}
                      className={`flex items-center justify-center py-3 font-mono text-sm transition-all ${
                        isDisabled
                          ? 'text-white/10 cursor-default'
                          : 'text-[#EDE8DF]/80 cursor-pointer hover:bg-white/5 rounded-full active:scale-90'
                      }`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-white/[0.04] flex justify-center gap-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                  <span className="josefin-nav text-[9px] text-[#8A8070] uppercase tracking-widest">Избрано</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 border border-[#C9A84C]/40 rounded-full" />
                  <span className="josefin-nav text-[9px] text-[#8A8070] uppercase tracking-widest">Днес</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-2 text-[#8A8070]/60">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>event_available</span>
              <p className="text-xs leading-relaxed">Всички часове са съобразени с часовата зона на България (GMT +02:00).</p>
            </div>
          </div>

          {/* ── Time Slots ── */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-6 px-1">
                <div>
                  <h3 className="josefin-nav uppercase tracking-[0.2em] text-xs font-bold text-[#EDE8DF]">Налични часове</h3>
                  {selectedDateLabel && (
                    <p className="font-body text-xs text-[#C9A84C]/70 mt-1 italic capitalize">{selectedDateLabel}</p>
                  )}
                </div>
                <span className="josefin-nav text-[9px] uppercase tracking-widest text-[#8A8070] whitespace-nowrap">
                  {booking.service?.duration_min ?? 60} мин.
                </span>
              </div>

              <SlotsContent />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => navigate('/booking')}
                className="flex-1 py-5 rounded-2xl border border-white/10 text-[#8A8070] josefin-nav uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
              >
                Назад
              </button>
              <button
                onClick={handleContinue}
                disabled={!selectedDate || !booking.time}
                className="flex-1 py-5 bg-[#C9A84C] text-[#0A0A0A] rounded-2xl josefin-nav font-bold uppercase tracking-widest text-[10px] disabled:opacity-40 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#C9A84C]/15"
              >
                {!selectedDate ? 'Изберете дата' : !booking.time ? 'Изберете час' : 'Продължи към финал'}
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Brillare by BM</div>
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
          <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2026 Brillare by BM</p>
        </div>
      </footer>
    </div>
  )
}
