import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import { useBooking } from '../components/booking/BookingContext'

const steps = ['1. Услуга', '2. Час', '3. Потвърждение']

export default function BookingStep1() {
  const [services, setServices] = useState([])
  const [masters, setMasters] = useState([])
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
      setMasters(mstData)
      if (!booking.service && svcData.length) update({ service: svcData[0] })
      if (!booking.master && mstData.length) update({ master: mstData[0] })
      if (svcData.length) setActiveCat(svcData[0].category)
      setLoading(false)
    })
  }, [])

  const categories = [...new Set(services.map(s => s.category))]
  const filteredServices = activeCat ? services.filter(s => s.category === activeCat) : services

  const selectedService = booking.service
  const selectedMaster = booking.master

  function handleContinue() {
    if (!selectedService) return
    navigate('/booking/date')
  }

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF]">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-3xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2A2A2A] -translate-y-1/2 hidden md:block"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold josefin-nav text-xs ${
                  i === 0
                    ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                    : 'bg-[#131313] border border-[#2A2A2A] text-[#8A8070]'
                }`}>{i + 1}</div>
                <span className={`josefin-nav text-[10px] ${i === 0 ? 'text-[#C9A84C] font-bold' : 'text-[#8A8070]'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-[#131313] animate-pulse rounded" />
              ))}
            </div>
            <div className="lg:col-span-5 space-y-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-28 bg-[#131313] animate-pulse rounded" />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Service Selection */}
            <div className="lg:col-span-12 space-y-12">
              <header>
                <h1 className="cormorant-display text-5xl font-bold text-[#EDE8DF] mb-4">Избор на услуга</h1>
                <p className="text-[#8A8070] font-body italic">Изберете услугата, за която желаете да запазите час при Боби.</p>
              </header>

              {/* Category Chips */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`px-6 py-2 josefin-nav text-[11px] rounded-[2px] transition-all ${
                      activeCat === cat
                        ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                        : 'bg-[#1C1B1B] text-[#8A8070] hover:text-[#EDE8DF] border border-transparent hover:border-[#2A2A2A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service List */}
              <div className="grid gap-4">
                {filteredServices.map((s) => {
                  const isSelected = selectedService?.id === s.id
                  return (
                    <div
                      key={s.id}
                      onClick={() => update({ service: s })}
                      className={`group relative bg-[#131313] border-l-4 p-6 flex justify-between items-center cursor-pointer transition-all duration-300 hover:bg-[#1C1B1B] ${
                        isSelected ? 'border-[#C9A84C]' : 'border-transparent hover:border-[#2A2A2A]'
                      }`}
                    >
                      <div className="space-y-1">
                        <h3 className="josefin-nav text-sm font-bold text-[#EDE8DF]">{s.name}</h3>
                        <p className="text-xs text-[#8A8070] font-body">{s.description}</p>
                        <span className={`inline-block text-[10px] uppercase tracking-widest mt-2 josefin-nav ${isSelected ? 'text-[#C9A84C]' : 'text-[#8A8070]'}`}>
                          {s.price_label || 'по запитване'}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
                        <span className={`dm-mono-price text-lg font-medium ${isSelected ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'}`}>
                          {s.price ? `${s.price} €` : s.price_label}
                        </span>
                        {isSelected
                          ? <span className="material-symbols-outlined text-[#C9A84C]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          : <div className="w-6 h-6 rounded-full border border-[#2A2A2A]"></div>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}

        {/* Sticky Summary Bar */}
        {!loading && (
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center bg-[#0E0E0E] p-8 border-t border-[#2A2A2A]">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Вашият избор</p>
              <div className="flex flex-col">
                <span className="josefin-nav text-lg font-bold text-[#EDE8DF]">{selectedService?.name || '—'}</span>
                <span className="text-[#8A8070] font-body text-sm italic">Майстор: Боби</span>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Общо</p>
                <span className="dm-mono-price text-2xl font-bold text-[#C9A84C]">
                  {selectedService?.price ? `${selectedService.price} €` : selectedService?.price_label || '—'}
                </span>
              </div>
              <button
                onClick={handleContinue}
                disabled={!selectedService}
                className="bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold py-4 px-12 text-sm tracking-widest hover:brightness-110 transition-all flex items-center gap-4 disabled:opacity-40"
              >
                ПРОДЪЛЖИ КЪМ ЧАС
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 gap-8 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Brillare by BM</div>
            <p className="text-[#8A8070] max-w-xs text-sm font-body italic">Precision is not a skill, it is a state of mind.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Follow</span>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" href="#">Instagram</a>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" href="#">Facebook</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Visit</span>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" to="/contact">Location</Link>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" to="/contact">Contact</Link>
            </div>
          </div>
          <div className="md:text-right space-y-2">
            <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2024 Brillare by BM Precision Atelier. All rights reserved.</p>
            <div className="flex md:justify-end gap-6">
              <Link className="text-[10px] text-[#4d4637] hover:text-[#EDE8DF] josefin-nav uppercase" to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
