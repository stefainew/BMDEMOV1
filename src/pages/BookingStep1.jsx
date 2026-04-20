import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import { useBooking } from '../components/booking/BookingContext'

const steps = ['Услуга', 'Дата и час', 'Потвърждение']
const CURRENT = 0

function MobileStepper() {
  return (
    <div className="md:hidden mb-8 px-1">
      <div className="flex items-center justify-center mb-3">
        {steps.map((_, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold josefin-nav transition-all ${
              i === CURRENT
                ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_10px_rgba(201,168,76,0.35)]'
                : i < CURRENT
                ? 'bg-[#1C1B1B] border border-[#C9A84C]/50 text-[#C9A84C]'
                : 'bg-[#131313] border border-[#2A2A2A] text-[#4A4540]'
            }`}>
              {i < CURRENT ? '✓' : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-10 h-[1px] ${i < CURRENT ? 'bg-[#C9A84C]/40' : 'bg-[#2A2A2A]'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-center josefin-nav text-[11px] text-[#C9A84C] tracking-widest uppercase">{steps[CURRENT]}</p>
    </div>
  )
}

export default function BookingStep1() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCat, setActiveCat] = useState(null)
  const { booking, update } = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('masters').select('*').eq('is_active', true).order('sort_order'),
    ]).then(([{ data: svc }, { data: mst }]) => {
      const svcData = svc ?? []
      const mstData = mst ?? []
      setServices(svcData)
      if (!booking.service && svcData.length) update({ service: svcData[0] })
      if (!booking.master && mstData.length) update({ master: mstData[0] })
      if (svcData.length) setActiveCat(svcData[0].category)
      setLoading(false)
    })
  }, [])

  const categories = [...new Set(services.map(s => s.category))]
  const filteredServices = activeCat ? services.filter(s => s.category === activeCat) : services
  const selectedService = booking.service

  function handleContinue() {
    if (!selectedService) return
    navigate('/booking/date')
  }

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      <Navbar />

      <main className="pt-24 md:pt-32 pb-32 md:pb-24 px-4 md:px-12 max-w-6xl mx-auto">

        {/* Desktop stepper */}
        <div className="hidden md:block mb-16">
          <div className="flex justify-between items-center gap-4 max-w-3xl mx-auto relative mb-8">
            <div className="absolute top-5 left-0 w-full h-[1px] bg-[#2A2A2A]" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold josefin-nav text-xs ${
                  i === CURRENT
                    ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                    : i < CURRENT
                    ? 'bg-[#1C1B1B] border border-[#C9A84C]/40 text-[#C9A84C]'
                    : 'bg-[#131313] border border-[#2A2A2A] text-[#8A8070]'
                }`}>{i < CURRENT ? '✓' : i + 1}</div>
                <span className={`josefin-nav text-[10px] ${i === CURRENT ? 'text-[#C9A84C] font-bold' : i < CURRENT ? 'text-[#C9A84C] opacity-60' : 'text-[#8A8070]'}`}>{step}</span>
              </div>
            ))}
          </div>
          <h1 className="cormorant-display text-5xl font-bold text-[#EDE8DF]">Избор на услуга</h1>
        </div>

        {/* Mobile stepper + title */}
        <MobileStepper />
        <h1 className="md:hidden cormorant-display text-3xl font-bold text-[#EDE8DF] mb-6">Избор на услуга</h1>

        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-[#131313] animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">

            {/* Category tabs — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`flex-none px-5 py-2.5 josefin-nav text-[11px] rounded-[2px] transition-all whitespace-nowrap ${
                    activeCat === cat
                      ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                      : 'bg-[#1C1B1B] text-[#8A8070] border border-[#2A2A2A] hover:text-[#EDE8DF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service cards */}
            <div className="grid gap-3">
              {filteredServices.map((s) => {
                const isSelected = selectedService?.id === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => update({ service: s })}
                    className={`w-full text-left bg-[#131313] border-l-4 px-5 py-5 flex items-center justify-between gap-4 transition-all duration-200 active:scale-[0.99] ${
                      isSelected ? 'border-[#C9A84C] bg-[#161510]' : 'border-transparent hover:border-[#2A2A2A] hover:bg-[#1C1B1B]'
                    }`}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="josefin-nav text-sm font-bold text-[#EDE8DF] leading-snug">{s.name}</p>
                      <p className="text-xs text-[#8A8070] font-body line-clamp-2 leading-relaxed">{s.description}</p>
                      <p className={`text-[10px] josefin-nav uppercase tracking-widest ${isSelected ? 'text-[#C9A84C]' : 'text-[#5A5550]'}`}>
                        {s.duration_min} мин.
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`font-mono text-base font-medium ${isSelected ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'}`}>
                        {s.price ? `${s.price} €` : s.price_label}
                      </span>
                      {isSelected
                        ? <span className="material-symbols-outlined text-[#C9A84C] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        : <div className="w-5 h-5 rounded-full border border-[#2A2A2A]" />
                      }
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Desktop bottom summary bar */}
        {!loading && (
          <div className="hidden md:flex mt-20 justify-between items-center bg-[#0E0E0E] p-8 border-t border-[#2A2A2A]">
            <div>
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Вашият избор</p>
              <div className="flex flex-col">
                <span className="josefin-nav text-lg font-bold text-[#EDE8DF]">{selectedService?.name || '—'}</span>
                <span className="text-[#8A8070] font-body text-sm italic">Майстор: Боби</span>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Общо</p>
                <span className="font-mono text-2xl font-bold text-[#C9A84C] whitespace-nowrap">
                  {selectedService?.price ? `${selectedService.price} €` : selectedService?.price_label || '—'}
                </span>
              </div>
              <button
                onClick={handleContinue}
                disabled={!selectedService}
                className="bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold py-4 px-12 text-sm tracking-widest hover:brightness-110 transition-all flex items-center gap-4 disabled:opacity-40"
              >
                <span className="whitespace-nowrap">ПРОДЪЛЖИ КЪМ ЧАС</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile fixed bottom bar */}
      {!loading && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0E0E0E]/95 backdrop-blur-sm border-t border-[#2A2A2A] px-4 py-3">
          {selectedService && (
            <div className="flex justify-between items-baseline mb-2 px-1">
              <span className="josefin-nav text-xs text-[#EDE8DF] truncate mr-3">{selectedService.name}</span>
              <span className="font-mono text-sm text-[#C9A84C] shrink-0">
                {selectedService.price ? `${selectedService.price} €` : selectedService.price_label}
              </span>
            </div>
          )}
          <button
            onClick={handleContinue}
            disabled={!selectedService}
            className="w-full py-4 bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold text-sm uppercase tracking-widest disabled:opacity-40 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span className="whitespace-nowrap">Продължи към час</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
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
