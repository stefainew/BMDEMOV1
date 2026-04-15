import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
const prevDays = [25, 26, 27, 28, 29, 30]
const currentDays = Array.from({ length: 29 }, (_, i) => i + 1)

const morningSlots = ['09:00', '09:45', '11:15']
const afternoonSlots = ['13:00', '13:45', '14:30', '15:15', '16:45', '17:30', '18:15']
const eveningSlots = ['19:00', '19:45']
const bookedSlots = ['10:30', '16:00']

const steps = [
  { label: '1. Услуга', done: true },
  { label: '2. Майстор', done: true },
  { label: '3. Час', done: false, active: true },
  { label: '4. Потвърждение', done: false },
]

export default function BookingStep3() {
  const [selectedDate, setSelectedDate] = useState(19)
  const [selectedTime, setSelectedTime] = useState('13:45')
  const navigate = useNavigate()

  const renderSlotButton = (time) => {
    const isBooked = bookedSlots.includes(time)
    const isSelected = selectedTime === time
    if (isBooked) {
      return (
        <button key={time} disabled className="py-4 border border-outline-variant/20 font-mono text-sm text-outline opacity-30 cursor-not-allowed">
          {time}
        </button>
      )
    }
    if (isSelected) {
      return (
        <button key={time} className="py-4 bg-primary border border-primary font-mono text-sm text-on-primary font-bold shadow-lg shadow-primary/20">
          {time}
        </button>
      )
    }
    return (
      <button
        key={time}
        onClick={() => setSelectedTime(time)}
        className="py-4 border border-outline-variant/20 font-mono text-sm text-on-surface hover:border-primary transition-all active:scale-95"
      >
        {time}
      </button>
    )
  }

  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>

      <Navbar />

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-label uppercase tracking-[0.2em]">
              {steps.map((s, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && <div className="w-8 h-[1px] bg-outline-variant/30 hidden md:block"></div>}
                  {s.done ? (
                    <div className="flex items-center gap-2 text-primary opacity-60">
                      <span className="material-symbols-outlined !text-sm">check_circle</span>
                      <span>{s.label}</span>
                    </div>
                  ) : s.active ? (
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <span className="w-5 h-5 rounded-full border border-primary flex items-center justify-center text-[8px]">3</span>
                      <span>{s.label}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-outline">
                      <span className="w-5 h-5 rounded-full border border-outline/30 flex items-center justify-center text-[8px]">4</span>
                      <span>{s.label}</span>
                    </div>
                  )}
                </span>
              ))}
            </div>
            <h1 className="font-headline text-4xl md:text-5xl text-on-surface">Избор на дата и час</h1>
          </div>
          <div className="h-1 w-full bg-surface-container-high mt-8 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-3/4 bg-primary transition-all duration-700"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Calendar */}
          <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-sm shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-label uppercase tracking-widest text-sm text-primary">Декември 2024</h2>
              <div className="flex gap-4">
                <button className="p-2 hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-outline">chevron_left</span>
                </button>
                <button className="p-2 hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-outline">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-y-4 text-center">
              {weekdays.map((d) => (
                <div key={d} className="font-label text-[10px] text-outline uppercase tracking-tighter pb-4">{d}</div>
              ))}
              {prevDays.map((d) => (
                <div key={`prev-${d}`} className="text-outline/20 font-mono text-sm py-3">{d}</div>
              ))}
              {currentDays.map((d) => {
                if (d === 12) return (
                  <div key={d} className="relative py-3 flex items-center justify-center">
                    <span className="absolute inset-0 m-auto w-8 h-8 border border-primary/40 rounded-sm"></span>
                    <span className="text-primary font-mono text-sm font-bold relative">{d}</span>
                  </div>
                )
                if (d === selectedDate) return (
                  <div key={d} className="relative py-3 flex items-center justify-center">
                    <span className="absolute inset-0 m-auto w-8 h-8 bg-primary rounded-sm"></span>
                    <span className="text-on-primary font-mono text-sm font-bold relative">{d}</span>
                  </div>
                )
                return (
                  <div
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className="text-on-surface font-mono text-sm py-3 cursor-pointer hover:text-primary transition-colors"
                  >{d}</div>
                )
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-outline-variant/20 flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-[1px]"></div>
                <span className="font-label text-[10px] text-outline uppercase tracking-wider">Избрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-primary/40 rounded-[1px]"></div>
                <span className="font-label text-[10px] text-outline uppercase tracking-wider">Днес</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-low rounded-sm h-full flex flex-col">
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                <div>
                  <h3 className="font-label uppercase tracking-widest text-sm text-on-surface">Налични часове</h3>
                  <p className="font-body text-xs text-outline mt-1 italic">Четвъртък, {selectedDate} Декември</p>
                </div>
                <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 border border-primary/20">GMT +02:00</span>
              </div>

              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 custom-scrollbar overflow-y-auto max-h-[500px]">
                <div className="col-span-full font-label text-[10px] text-outline uppercase tracking-widest mt-2 mb-4">Сутрин</div>
                {morningSlots.map(renderSlotButton)}
                {bookedSlots.slice(0, 1).map(renderSlotButton)}

                <div className="col-span-full font-label text-[10px] text-outline uppercase tracking-widest mt-6 mb-4">Следобед</div>
                {afternoonSlots.slice(0, 4).map(renderSlotButton)}
                {bookedSlots.slice(1).map(renderSlotButton)}
                {afternoonSlots.slice(4).map(renderSlotButton)}

                <div className="col-span-full font-label text-[10px] text-outline uppercase tracking-widest mt-6 mb-4">Вечер</div>
                {eveningSlots.map(renderSlotButton)}
              </div>

              <div className="mt-auto p-8 bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 text-outline text-xs">
                  <span className="material-symbols-outlined !text-sm">info</span>
                  <span>Продължителност на услугата: 45 мин.</span>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => navigate('/booking')}
                    className="flex-1 md:flex-none px-8 py-3 border border-outline/30 text-outline font-label uppercase tracking-widest text-[10px] hover:bg-surface-container-high transition-colors"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => navigate('/booking/confirmation')}
                    className="flex-1 md:flex-none px-12 py-3 bg-primary text-on-primary font-label font-bold uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
                  >
                    Продължи
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Summary (desktop) */}
        <div className="hidden xl:block fixed right-12 bottom-12 w-80 bg-surface-container-high border-t-2 border-primary shadow-2xl p-6 transition-all duration-500">
          <h4 className="font-label uppercase tracking-widest text-[10px] text-primary mb-4">Вашият избор</h4>
          <div className="space-y-4">
            {[
              { label: 'Услуга', value: 'Класическо подстригване' },
              { label: 'Майстор', value: 'Боби / Маги' },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-start">
                <span className="font-body text-xs text-outline">{row.label}</span>
                <span className="font-label text-xs text-on-surface text-right">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-start">
              <span className="font-body text-xs text-outline">Дата и час</span>
              <span className="font-mono text-xs text-primary text-right">{selectedDate} Дек, {selectedTime} ч.</span>
            </div>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="font-label text-[10px] text-outline uppercase tracking-widest">Общо</span>
              <span className="font-mono text-lg text-on-surface">45.00 лв</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] w-full border-t border-[#2A2A2A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 w-full max-w-screen-2xl mx-auto">
          <div className="flex flex-col gap-6">
            <span className="text-xl font-bold tracking-widest text-[#EDE8DF] font-label">Brillare by BM</span>
            <p className="font-body text-[#8A8070] max-w-xs text-sm leading-relaxed">
              Прецизност във всяко движение. Ателие за мъжки стил и автентично преживяване.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
              <span className="font-label uppercase text-[10px] tracking-widest text-primary">Социални</span>
              <a className="text-sm font-label text-[#8A8070] hover:text-[#EDE8DF] transition-colors" href="#">Instagram</a>
              <a className="text-sm font-label text-[#8A8070] hover:text-[#EDE8DF] transition-colors" href="#">Facebook</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label uppercase text-[10px] tracking-widest text-primary">Локация</span>
              <Link className="text-sm font-label text-[#8A8070] hover:text-[#EDE8DF] transition-colors" to="/contact">София, ул. Шишман 14</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-label uppercase text-[10px] tracking-widest text-primary">Контакт</span>
              <a className="text-sm font-label text-[#8A8070] hover:text-[#EDE8DF] transition-colors" href="tel:+359888123456">+359 897 975 527</a>
              <a className="text-sm font-label text-[#8A8070] hover:text-[#EDE8DF] transition-colors" href="mailto:bmhairstdio19@gmail.com">bmhairstdio19@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="px-6 md:px-12 pb-12 w-full max-w-screen-2xl mx-auto">
          <p className="font-mono text-[10px] text-[#8A8070]">© 2024 Brillare by BM Precision Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
