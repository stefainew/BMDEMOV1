import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import { useBooking } from '../components/booking/BookingContext'

const STEPS = ['Услуга', 'Дата и час', 'Потвърждение']
const CURRENT = 0

function Stepper() {
  return (
    <div className="mb-16 md:mb-20">
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
            }`}>
              {i < CURRENT ? '✓' : i + 1}
            </div>
            <span className={`josefin-nav text-[10px] whitespace-nowrap ${
              i === CURRENT ? 'text-[#C9A84C] font-bold' : i < CURRENT ? 'text-[#C9A84C] opacity-60' : 'text-[#8A8070]'
            }`}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BookingStep1() {
  const [services, setServices]   = useState([])
  const [master, setMaster]       = useState(null)
  const [loading, setLoading]     = useState(true)
  const [activeCat, setActiveCat] = useState('Мъжко')
  const { booking, update }       = useBooking()
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('masters').select('*').eq('is_active', true).order('sort_order').limit(1),
    ]).then(([{ data: svc }, { data: mst }]) => {
      const svcData = svc ?? []
      const mstData = mst ?? []
      setServices(svcData)
      if (mstData.length) {
        setMaster(mstData[0])
        update({ master: mstData[0] })
      }
      if (!booking.service && svcData.length) update({ service: svcData[0] })
      setLoading(false)
    })
  }, [])

  const filteredServices = services.filter(s => s.category === activeCat)
  const selectedService  = booking.service

  function handleContinue() {
    if (!selectedService) return
    navigate('/booking/date')
  }

  const masterInitials = master?.name
    ? master.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'БМ'

  return (
    <div className="text-[#EDE8DF] min-h-screen" style={{
      backgroundColor: '#0A0A0A',
      backgroundImage: `
        radial-gradient(ellipse 70% 55% at 92% 8%,  rgba(201,168,76,0.08) 0%, transparent 65%),
        radial-gradient(ellipse 55% 45% at 6%  92%,  rgba(201,168,76,0.05) 0%, transparent 60%),
        radial-gradient(ellipse 40% 30% at 50% 50%,  rgba(201,168,76,0.02) 0%, transparent 80%),
        repeating-linear-gradient(-45deg, transparent 0px, transparent 79px, rgba(201,168,76,0.018) 79px, rgba(201,168,76,0.018) 80px)
      `
    }}>
      <div className="grain-overlay fixed inset-0 z-[100]" />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-48 px-5 max-w-4xl mx-auto">

        <Stepper />

        {/* Title */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="cormorant-display text-5xl md:text-6xl font-medium text-[#EDE8DF] tracking-tight">
            Избор на услуга
          </h1>
          <p className="text-[#8A8070] font-body text-base italic opacity-80">
            Персонализирайте вашето преживяване.
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-[#131313] animate-pulse rounded-[22px]" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">

            {/* Category pills */}
            <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['Мъжко', 'Дамско', 'Брада'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-7 py-2.5 josefin-nav text-[10px] rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeCat === cat
                      ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                      : 'bg-white/5 text-[#8A8070] hover:text-[#EDE8DF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service cards */}
            <div className="space-y-3">
              {filteredServices.length === 0 && (
                <p className="text-center text-[#8A8070] font-body italic py-12">
                  Няма услуги в тази категория.
                </p>
              )}
              {filteredServices.map(s => {
                const isSelected = selectedService?.id === s.id
                return (
                  <button
                    key={s.id}
                    onClick={() => update({ service: s })}
                    className={`w-full text-left rounded-[22px] p-7 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-400 backdrop-blur-[20px] active:scale-[0.99] ${
                      isSelected
                        ? 'bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.4)]'
                        : 'bg-[rgba(25,25,25,0.5)] border border-white/5 hover:bg-[rgba(35,35,35,0.65)] hover:border-[rgba(201,168,76,0.2)] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="josefin-nav text-base md:text-lg font-bold text-[#EDE8DF] leading-snug">
                          {s.name}
                        </h3>
                        {isSelected && (
                          <span
                            className="material-symbols-outlined text-[#C9A84C] text-xl shrink-0"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >check_circle</span>
                        )}
                      </div>
                      {s.description && (
                        <p className="text-sm text-[#8A8070] font-body leading-relaxed line-clamp-2">
                          {s.description}
                        </p>
                      )}
                      <span className={`inline-block text-[10px] uppercase tracking-[0.2em] josefin-nav ${
                        isSelected ? 'text-[#C9A84C]/70' : 'text-[#8A8070]/60'
                      }`}>
                        {s.duration_min} минути
                      </span>
                    </div>
                    <div className="shrink-0 md:text-right">
                      <span className={`font-mono text-xl md:text-2xl font-light ${
                        isSelected ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'
                      }`}>
                        {s.price ? `${s.price} €` : (s.price_label || 'по запитване')}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Master section */}
            {master && (
              <section className="space-y-10">
                <div className="text-center">
                  <h2 className="cormorant-display text-4xl md:text-5xl font-medium text-[#EDE8DF] mb-3">
                    Вашият Майстор
                  </h2>
                  <p className="text-[#8A8070] font-body text-sm italic">
                    Експертност, на която можете да се доверите.
                  </p>
                </div>

                <div className="max-w-xs mx-auto">
                  <div className="backdrop-blur-[20px] bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.35)] rounded-[22px] p-10 flex flex-col items-center text-center space-y-6">
                    {/* Monogram avatar */}
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full ring-1 ring-[#C9A84C]/40 bg-[#1C1B1B] flex items-center justify-center">
                        <span className="cormorant-display text-3xl font-bold text-[#C9A84C]">
                          {masterInitials}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 right-1 bg-[#C9A84C] text-[#0A0A0A] rounded-full p-1.5 shadow-xl">
                        <span
                          className="material-symbols-outlined text-xs leading-none"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >star</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="josefin-nav text-base font-bold text-[#C9A84C]">
                        {master.name}
                      </h4>
                      {master.role && (
                        <p className="text-[10px] text-[#8A8070] uppercase tracking-widest">
                          {master.role}
                        </p>
                      )}
                      {/* 5 stars */}
                      <div className="flex items-center justify-center gap-0.5 pt-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[11px] text-[#C9A84C]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >star</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>
        )}
      </main>

      {/* Floating bottom summary bar */}
      {!loading && (
        <div className="fixed bottom-0 left-0 w-full z-40 px-5 pb-6 md:pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[22px] px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">

              {/* Selection info */}
              <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
                <span className="josefin-nav text-[9px] text-[#C9A84C] font-bold tracking-[0.3em]">
                  ТЕКУЩА СЕЛЕКЦИЯ
                </span>
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2">
                  <span className="text-[#EDE8DF] josefin-nav text-sm font-medium whitespace-nowrap">
                    {selectedService?.name || 'Изберете услуга'}
                  </span>
                  {master && (
                    <span className="text-[#8A8070] font-body text-xs italic whitespace-nowrap">
                      с {master.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="flex items-center gap-6 md:gap-10">
                {selectedService && (
                  <div className="text-right hidden md:block">
                    <span className="josefin-nav text-[9px] text-[#8A8070] block mb-1">СУМА</span>
                    <span className="font-mono text-xl font-bold text-[#C9A84C] whitespace-nowrap">
                      {selectedService.price ? `${selectedService.price} €` : (selectedService.price_label || 'по запитване')}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleContinue}
                  disabled={!selectedService}
                  className="bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold py-4 px-10 text-[11px] tracking-[0.2em] rounded-full hover:brightness-110 active:scale-[0.97] transition-all flex items-center gap-3 disabled:opacity-40 whitespace-nowrap"
                >
                  ПРОДЪЛЖИ КЪМ ЧАС
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

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
