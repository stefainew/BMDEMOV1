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
  const [confirmedBooking, setConfirmedBooking] = useState(null)
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
      setConfirmedBooking({ ...booking, clientName: `${form.firstName} ${form.lastName}`.trim(), clientPhone: form.phone })
      reset()
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Възникна грешка. Моля, опитайте отново или се свържете с нас по телефон.')
    } finally {
      setSaving(false)
    }
  }

  const activeBooking = confirmedBooking ?? booking

  const displayDate = activeBooking.date
    ? new Date(activeBooking.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  /* ── Booking summary card — used both mobile (top) and desktop (right sidebar) ── */
  const masterInitials = activeBooking.master?.name
    ? activeBooking.master.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'БМ'

  const SummaryCard = ({ className = '' }) => (
    <div
      className={`relative overflow-hidden rounded-3xl p-8 md:p-12 ${className}`}
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Decorative background icon */}
      <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 pointer-events-none">
        <span className="material-symbols-outlined" style={{ fontSize: '14rem', lineHeight: 1 }}>content_cut</span>
      </div>

      <h3 className="josefin-nav text-[10px] text-[#C9A84C] font-bold mb-10 tracking-[0.3em] uppercase relative z-10">
        Резюме на резервацията
      </h3>

      <div className="space-y-8 relative z-10">

        {/* Service */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1.5 min-w-0">
            <p className="josefin-nav text-[0.6rem] text-[#8A8070] uppercase tracking-widest">Избрана услуга</p>
            <p className="cormorant-display text-2xl font-bold text-[#EDE8DF] leading-tight">
              {activeBooking.service?.name || '—'}
            </p>
            <p className="text-[#8A8070] text-sm font-body inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
              {activeBooking.service?.duration_min ?? '—'} минути
            </p>
          </div>
          <p className="font-mono text-[#C9A84C] text-xl font-medium shrink-0">
            {activeBooking.service?.price ? `${activeBooking.service.price} €` : activeBooking.service?.price_label || 'по запитване'}
          </p>
        </div>

        {/* Master */}
        <div className="space-y-3">
          <p className="josefin-nav text-[0.6rem] text-[#8A8070] uppercase tracking-widest">Вашият майстор</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1C1B1B] border border-white/10 flex items-center justify-center shrink-0">
              <span className="cormorant-display text-xl font-bold text-[#C9A84C]">{masterInitials}</span>
            </div>
            <div>
              <p className="cormorant-display text-xl font-bold text-[#EDE8DF]">{activeBooking.master?.name || '—'}</p>
              {activeBooking.master?.role && (
                <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest">{activeBooking.master.role}</p>
              )}
            </div>
          </div>
        </div>

        {/* Date / Time */}
        <div className="grid grid-cols-2 gap-6 py-7 border-y border-white/[0.06]">
          <div className="space-y-1.5">
            <p className="josefin-nav text-[0.6rem] text-[#8A8070] uppercase tracking-widest">Дата</p>
            <p className="cormorant-display text-xl text-[#EDE8DF]">{displayDate}</p>
          </div>
          <div className="space-y-1.5">
            <p className="josefin-nav text-[0.6rem] text-[#8A8070] uppercase tracking-widest">Час</p>
            <p className="font-mono text-xl text-[#EDE8DF]">{booking.time ? `${booking.time} ч.` : '—'}</p>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-baseline pt-1">
          <p className="josefin-nav text-xs text-[#8A8070] uppercase tracking-widest">Обща стойност</p>
          <p className="font-mono text-3xl md:text-4xl text-[#C9A84C] font-bold">
            {activeBooking.service?.price ? `${activeBooking.service.price} €` : activeBooking.service?.price_label || 'по запитване'}
          </p>
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
          <section className="w-full max-w-4xl mx-auto text-center space-y-12 py-8 md:py-16">

            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border border-[#C9A84C]/30 flex items-center justify-center bg-[#131313]/50 backdrop-blur-md">
                <span
                  className="material-symbols-outlined text-[#C9A84C]"
                  style={{ fontSize: '48px', fontVariationSettings: "'wght' 200" }}
                >check_circle</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="cormorant-display text-4xl md:text-6xl lg:text-7xl text-[#EDE8DF] font-bold tracking-tight">
                Вашата резервация е потвърдена
              </h1>
              <p className="josefin-nav text-xs md:text-sm text-[#8A8070] tracking-[0.2em] uppercase">
                Очакваме Ви с нетърпение
              </p>
            </div>

            {/* Summary glass card — 2 columns */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden border border-white/10 shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(24px)' }}
            >
              {/* Left: service + master */}
              <div className="bg-[#131313]/60 p-8 md:p-10 text-left flex flex-col justify-between gap-8">
                <div>
                  <span className="josefin-nav text-[0.65rem] tracking-[0.15em] text-[#8A8070] uppercase block mb-2">Услуга</span>
                  <h2 className="cormorant-display text-2xl md:text-3xl text-[#EDE8DF] leading-snug">
                    {confirmedBooking?.service?.name || '—'}
                  </h2>
                  <p className="text-[#8A8070] text-sm mt-1 font-body">
                    {confirmedBooking?.service?.duration_min ?? '—'} минути
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-[#1C1B1B] border border-white/10 flex items-center justify-center shrink-0">
                    <span className="cormorant-display text-lg font-bold text-[#C9A84C]">{masterInitials}</span>
                  </div>
                  <div>
                    <span className="josefin-nav text-[0.65rem] tracking-[0.15em] text-[#8A8070] uppercase block">Майстор</span>
                    <span className="font-body text-lg text-[#EDE8DF]">{confirmedBooking?.master?.name || '—'}</span>
                  </div>
                </div>
              </div>

              {/* Right: date + time */}
              <div className="bg-[#2A2A2A]/40 p-8 md:p-10 text-left flex flex-col justify-between gap-8 border-t md:border-t-0 md:border-l border-white/5">
                <div className="space-y-6">
                  <div>
                    <span className="josefin-nav text-[0.65rem] tracking-[0.15em] text-[#8A8070] uppercase block mb-1">Дата</span>
                    <div className="font-mono text-xl md:text-2xl text-[#C9A84C]">{displayDate}</div>
                  </div>
                  <div>
                    <span className="josefin-nav text-[0.65rem] tracking-[0.15em] text-[#8A8070] uppercase block mb-1">Час</span>
                    <div className="font-mono text-3xl md:text-4xl text-[#EDE8DF]">
                      {confirmedBooking?.time ? `${confirmedBooking.time} ч.` : '—'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#8A8070]">
                  <span className="material-symbols-outlined text-sm">phone</span>
                  <a href="tel:+359897975527" className="josefin-nav text-[0.65rem] tracking-widest uppercase hover:text-[#EDE8DF] transition-colors">
                    +359 897 975 527
                  </a>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/"
                className="w-full md:w-auto px-12 py-5 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-xs font-bold tracking-[0.2em] uppercase hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Обратно към началото
              </Link>
              <button
                onClick={() => navigate('/booking')}
                className="w-full md:w-auto px-12 py-5 border border-white/10 text-[#EDE8DF] josefin-nav text-xs tracking-[0.2em] uppercase hover:bg-white/5 transition-all active:scale-95"
              >
                Нова резервация
              </button>
            </div>

            {/* Footnote */}
            <p className="font-body text-sm text-[#8A8070] italic pt-4">
              Моля, уведомете ни 24 часа предварително при промяна на резервацията.
            </p>

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
