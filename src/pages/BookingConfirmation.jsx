import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import { useBooking } from '../components/booking/BookingContext'
import { computeTimeEnd } from '../hooks/useAvailability'

const steps = ['Услуга', 'Дата и час', 'Потвърждение']
const CURRENT = 2

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

export default function BookingConfirmation() {
  const { booking, reset } = useBooking()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' })
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!agreed || !agreedTerms) { setError('Трябва да се съгласите с Политиката за поверителност и Общите условия.'); return }
    if (!booking.service || !booking.master || !booking.date || !booking.time) {
      setError('Непълна резервация. Моля, върнете се назад и попълнете всички стъпки.')
      return
    }
    setSaving(true)
    setError('')
    try {
      const fullName = `${form.firstName} ${form.lastName}`.trim()
      const timeEnd = computeTimeEnd(booking.time, booking.service.duration_min ?? 60)
      const { error: rpcErr } = await supabase.rpc('book_appointment', {
        p_name:       fullName,
        p_phone:      form.phone,
        p_email:      form.email || '',
        p_master_id:  booking.master.id,
        p_service_id: booking.service.id,
        p_date:       booking.date,
        p_time_start: booking.time,
        p_time_end:   timeEnd,
      })
      if (rpcErr) throw rpcErr
      reset()
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Възникна грешка. Моля, опитайте отново или се свържете с нас по телефон.')
    } finally {
      setSaving(false)
    }
  }

  const displayDate = booking.date
    ? new Date(booking.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  /* ── Booking summary card — used both mobile (top) and desktop (right sidebar) ── */
  const SummaryCard = ({ className = '' }) => (
    <div className={`bg-[#131313] relative overflow-hidden border-l border-[#2A2A2A] ${className}`}>
      <div className="absolute top-0 right-0 p-6 opacity-5">
        <span className="material-symbols-outlined text-7xl">content_cut</span>
      </div>
      <div className="p-6 md:p-12">
        <h3 className="josefin-nav text-xs text-[#8A8070] mb-6 border-b border-[#2A2A2A] pb-4 uppercase tracking-widest">Резюме</h3>
        <div className="space-y-5 md:space-y-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="josefin-nav text-[0.6rem] text-[#8A8070] mb-1 uppercase">Услуга</p>
              <p className="text-lg md:text-xl cormorant-display font-bold text-[#EDE8DF] leading-tight">{booking.service?.name || '—'}</p>
              <p className="text-[#8A8070] text-xs mt-1">{booking.service?.duration_min ?? '—'} мин.</p>
            </div>
            <p className="font-mono text-[#C9A84C] text-base md:text-lg shrink-0">
              {booking.service?.price ? `${booking.service.price} €` : booking.service?.price_label || '—'}
            </p>
          </div>
          <div>
            <p className="josefin-nav text-[0.6rem] text-[#8A8070] mb-1 uppercase">Майстор</p>
            <p className="text-base md:text-lg cormorant-display text-[#EDE8DF]">{booking.master?.name || '—'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 pt-2">
            <div>
              <p className="josefin-nav text-[0.6rem] text-[#8A8070] mb-1 uppercase">Дата</p>
              <p className="text-[#EDE8DF] text-sm">{displayDate}</p>
            </div>
            <div>
              <p className="josefin-nav text-[0.6rem] text-[#8A8070] mb-1 uppercase">Час</p>
              <p className="font-mono text-[#EDE8DF]">{booking.time ? `${booking.time} ч.` : '—'}</p>
            </div>
          </div>
          <div className="pt-5 md:pt-10 border-t border-[#2A2A2A] flex justify-between items-baseline">
            <p className="josefin-nav text-sm text-[#EDE8DF] uppercase">Общо</p>
            <p className="text-2xl md:text-3xl font-mono text-[#C9A84C]">
              {booking.service?.price ? `${booking.service.price} €` : booking.service?.price_label || 'по запитване'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] font-body min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      <Navbar />

      <main className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-12 max-w-screen-xl mx-auto">
        {submitted ? (
          /* ── SUCCESS ── */
          <section className="max-w-3xl mx-auto text-center py-16 md:py-20">
            <div className="mb-10 inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-[#131313] border border-[#C9A84C]/20 relative">
              <span className="material-symbols-outlined text-[#C9A84C] text-4xl md:text-5xl">check_circle</span>
              <div className="absolute -bottom-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-[#C9A84C] text-[#0A0A0A] flex items-center justify-center">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <h2 className="cormorant-display text-4xl md:text-6xl font-bold text-[#EDE8DF] mb-6">Резервацията е успешна!</h2>
            <div className="bg-[#131313] p-6 md:p-10 mb-10 text-left border-l-2 border-[#C9A84C]">
              <p className="text-[#8A8070] text-base md:text-lg mb-4 leading-relaxed">
                Благодарим Ви! Вашият час при Боби е потвърден. Очакваме ви!
              </p>
              <div className="flex items-start gap-3 text-[#8A8070]">
                <span className="material-symbols-outlined text-[#C9A84C] mt-0.5 text-base">phone</span>
                <p className="text-sm">Въпроси? Обадете ни се на <a href="tel:+359897975527" className="text-[#EDE8DF]">+359 897 975 527</a></p>
              </div>
            </div>
            <Link className="inline-block bg-[#C9A84C] text-[#0A0A0A] px-10 py-4 josefin-nav text-sm font-bold hover:brightness-110 transition-all" to="/">
              Обратно към начало
            </Link>
          </section>
        ) : (
          /* ── FORM ── */
          <section>
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
              <h1 className="cormorant-display text-5xl md:text-6xl font-bold text-[#EDE8DF]">Данни за контакт</h1>
            </div>

            {/* Mobile stepper + title */}
            <MobileStepper />
            <h1 className="md:hidden cormorant-display text-3xl font-bold text-[#EDE8DF] mb-6">Потвърждение</h1>

            {/* Mobile: summary first */}
            <SummaryCard className="md:hidden mb-6 rounded-sm" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
              {/* Form */}
              <div className="lg:col-span-7">
                <p className="hidden md:block text-[#8A8070] text-lg leading-relaxed max-w-xl mb-10">
                  Моля, въведете вашите данни за потвърждение на резервацията.
                </p>

                <form className="space-y-8 md:space-y-12" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div className="relative group">
                      <label className="josefin-nav text-[0.65rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors uppercase tracking-widest">Име *</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#3A3530] transition-all text-base md:text-lg"
                        placeholder="Иван"
                        type="text"
                      />
                    </div>
                    <div className="relative group">
                      <label className="josefin-nav text-[0.65rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors uppercase tracking-widest">Фамилия *</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#3A3530] transition-all text-base md:text-lg"
                        placeholder="Петров"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    <div className="relative group">
                      <label className="josefin-nav text-[0.65rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors uppercase tracking-widest">Телефон *</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#3A3530] transition-all font-mono text-base md:text-lg tracking-wider"
                        placeholder="+359 888 123 456"
                        type="tel"
                      />
                    </div>
                    <div className="relative group">
                      <label className="josefin-nav text-[0.65rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors uppercase tracking-widest">E-mail (незадължително)</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#3A3530] transition-all text-base md:text-lg"
                        placeholder="ivan@example.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        id="privacy-agree"
                        type="checkbox"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                        className="w-5 h-5 mt-0.5 shrink-0 rounded-none border-[#2A2A2A] bg-transparent accent-[#C9A84C]"
                      />
                      <span className="text-[#8A8070] text-sm leading-relaxed group-hover:text-[#A89F92] transition-colors">
                        Прочел/а съм и се съгласявам с{' '}
                        <Link className="text-[#C9A84C] underline" to="/privacy" onClick={e => e.stopPropagation()}>
                          Политиката за поверителност
                        </Link>
                        . *
                      </span>
                    </label>
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <input
                        id="terms-agree"
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={e => setAgreedTerms(e.target.checked)}
                        className="w-5 h-5 mt-0.5 shrink-0 rounded-none border-[#2A2A2A] bg-transparent accent-[#C9A84C]"
                      />
                      <span className="text-[#8A8070] text-sm leading-relaxed group-hover:text-[#A89F92] transition-colors">
                        Запознат/а съм с{' '}
                        <Link className="text-[#C9A84C] underline" to="/terms" onClick={e => e.stopPropagation()}>
                          Общите условия
                        </Link>
                        {' '}за резервации. *
                      </span>
                    </label>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 p-4 bg-red-950/30 border border-red-900/50">
                      <span className="material-symbols-outlined text-red-400 text-base shrink-0 mt-0.5">error</span>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3 md:block">
                    <button
                      type="button"
                      onClick={() => navigate('/booking/date')}
                      className="md:hidden flex-none px-5 py-4 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[10px] uppercase tracking-widest"
                    >
                      Назад
                    </button>
                    <button
                      className="flex-1 md:w-auto md:flex-none bg-[#C9A84C] text-[#0A0A0A] px-10 md:px-16 py-4 md:py-5 josefin-nav text-sm font-bold hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-40"
                      type="submit"
                      disabled={saving}
                    >
                      {saving ? 'Запазване...' : (
                        <>
                          <span className="md:hidden">Потвърди</span>
                          <span className="hidden md:inline">Потвърди резервацията</span>
                        </>
                      )}
                      {!saving && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                    </button>
                  </div>
                </form>
              </div>

              {/* Desktop summary sidebar */}
              <div className="hidden lg:block lg:col-span-5">
                <SummaryCard />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Боби Ярчев</div>
            <p className="text-[#8A8070] max-w-xs text-sm font-body italic">Precision is not a skill, it is a state of mind.</p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Контакт</span>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] josefin-nav" href="tel:+359897975527">+359 897 975 527</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Правни</span>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] josefin-nav" to="/privacy">Поверителност</Link>
            </div>
          </div>
          <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2025 Боби Ярчев</p>
        </div>
      </footer>
    </div>
  )
}
