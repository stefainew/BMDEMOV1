import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'
import { useBooking } from '../components/booking/BookingContext'
import { computeTimeEnd } from '../hooks/useAvailability'

export default function BookingConfirmation() {
  const { booking, reset } = useBooking()
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

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] font-body min-h-screen">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        {submitted ? (
          /* ─── SUCCESS ─── */
          <section className="max-w-3xl mx-auto text-center py-20">
            <div className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-[#131313] border border-[#C9A84C]/20 relative">
              <span className="material-symbols-outlined text-[#C9A84C] text-5xl">check_circle</span>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#C9A84C] text-[#0A0A0A] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <h2 className="cormorant-display text-5xl md:text-7xl font-bold text-[#EDE8DF] mb-8">Резервацията е успешна!</h2>
            <div className="bg-[#131313] p-8 md:p-12 mb-12 text-left border-l-2 border-[#C9A84C]">
              <p className="text-[#8A8070] text-lg mb-4 leading-relaxed">
                Благодарим Ви! Вашият час е потвърден в Brillare by BM. Очакваме ви!
              </p>
              <div className="flex items-start gap-4 text-[#8A8070]">
                <span className="material-symbols-outlined text-[#C9A84C] mt-1">phone</span>
                <p className="text-sm">Ако имате въпроси, обадете ни се на <span className="text-[#EDE8DF]">+359 897 975 527</span></p>
              </div>
            </div>
            <Link className="bg-[#C9A84C] text-[#0A0A0A] px-12 py-5 josefin-nav text-sm font-bold hover:brightness-110 transition-all" to="/">
              Обратно към начало
            </Link>
          </section>
        ) : (
          /* ─── FORM ─── */
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="mb-12">
                <span className="josefin-nav text-[#C9A84C] text-xs tracking-widest uppercase mb-4 block">Стъпка 4 / 4</span>
                <h1 className="cormorant-display text-5xl md:text-6xl font-bold text-[#EDE8DF] mb-6">Данни за контакт</h1>
                <p className="text-[#8A8070] text-lg leading-relaxed max-w-xl">
                  Моля, въведете вашите данни за потвърждение на резервацията.
                </p>
              </div>

              <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="josefin-nav text-[0.7rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors">Име *</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540] transition-all text-lg"
                      placeholder="Иван"
                      type="text"
                    />
                  </div>
                  <div className="relative group">
                    <label className="josefin-nav text-[0.7rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors">Фамилия *</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540] transition-all text-lg"
                      placeholder="Петров"
                      type="text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label className="josefin-nav text-[0.7rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors">Телефон *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540] transition-all font-mono text-lg tracking-wider"
                      placeholder="+359 888 123 456"
                      type="tel"
                    />
                  </div>
                  <div className="relative group">
                    <label className="josefin-nav text-[0.7rem] text-[#8A8070] mb-2 block group-focus-within:text-[#C9A84C] transition-colors">E-mail (незадължително)</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 border-b border-[#2A2A2A] py-3 px-0 text-[#EDE8DF] focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540] transition-all text-lg"
                      placeholder="ivan@example.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-start gap-4">
                    <input
                      id="privacy-agree"
                      type="checkbox"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                      className="w-5 h-5 mt-0.5 shrink-0 rounded-none border-[#2A2A2A] bg-transparent accent-[#C9A84C]"
                    />
                    <label className="text-[#8A8070] text-sm leading-relaxed" htmlFor="privacy-agree">
                      Прочел/а съм и се съгласявам с{' '}
                      <Link className="text-[#C9A84C] underline hover:brightness-125 transition-all" to="/privacy">
                        Политиката за поверителност
                      </Link>
                      {' '}и давам съгласие за обработване на личните ми данни за целите на резервацията. *
                    </label>
                  </div>
                  <div className="flex items-start gap-4">
                    <input
                      id="terms-agree"
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={e => setAgreedTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 shrink-0 rounded-none border-[#2A2A2A] bg-transparent accent-[#C9A84C]"
                    />
                    <label className="text-[#8A8070] text-sm leading-relaxed" htmlFor="terms-agree">
                      Запознат/а съм с{' '}
                      <Link className="text-[#C9A84C] underline hover:brightness-125 transition-all" to="/terms">
                        Общите условия
                      </Link>
                      {' '}за резервации — включително с политиката за отмяна и закъснение. *
                    </label>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <div className="pt-8">
                  <button
                    className="w-full md:w-auto bg-[#C9A84C] text-[#0A0A0A] px-16 py-5 josefin-nav text-sm font-bold hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-40"
                    type="submit"
                    disabled={saving}
                  >
                    {saving ? 'Запазване...' : 'Потвърди резервацията'}
                    {!saving && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
                  </button>
                </div>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-5 bg-[#131313] p-12 relative overflow-hidden border-l border-[#2A2A2A]">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-8xl">content_cut</span>
              </div>
              <h3 className="josefin-nav text-sm text-[#8A8070] mb-10 border-b border-[#2A2A2A] pb-4 uppercase tracking-widest">Резюме</h3>
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="josefin-nav text-[0.65rem] text-[#8A8070] mb-1 uppercase">Услуга</p>
                    <p className="text-xl cormorant-display font-bold text-[#EDE8DF]">{booking.service?.name || '—'}</p>
                    <p className="text-[#8A8070] text-sm mt-1">{booking.service?.duration_min ?? '—'} минути</p>
                  </div>
                  <p className="font-mono text-[#C9A84C] text-lg">
                    {booking.service?.price ? `${booking.service.price} €` : booking.service?.price_label || '—'}
                  </p>
                </div>
                <div>
                  <p className="josefin-nav text-[0.65rem] text-[#8A8070] mb-1 uppercase">Майстор</p>
                  <p className="text-lg cormorant-display text-[#EDE8DF]">{booking.master?.name || '—'}</p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <p className="josefin-nav text-[0.65rem] text-[#8A8070] mb-1 uppercase">Дата</p>
                    <p className="text-[#EDE8DF]">{displayDate}</p>
                  </div>
                  <div>
                    <p className="josefin-nav text-[0.65rem] text-[#8A8070] mb-1 uppercase">Час</p>
                    <p className="font-mono text-[#EDE8DF]">{booking.time ? `${booking.time} ч.` : '—'}</p>
                  </div>
                </div>
                <div className="pt-10 border-t border-[#2A2A2A] flex justify-between items-baseline">
                  <p className="josefin-nav text-sm text-[#EDE8DF] uppercase">Общо</p>
                  <p className="text-3xl font-mono text-[#C9A84C]">
                    {booking.service?.price ? `${booking.service.price} €` : booking.service?.price_label || 'по запитване'}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 max-w-screen-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Brillare by BM</div>
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
          <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2024 Brillare by BM</p>
        </div>
      </footer>
    </div>
  )
}
