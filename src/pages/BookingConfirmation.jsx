import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function BookingConfirmation() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-background text-[#EDE8DF] font-body">
      <div className="grain-overlay"></div>

      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
        {/* Step 5: Contact Form */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" id="confirmation-step">
          <div className="lg:col-span-7">
            <div className="mb-12">
              <span className="text-precision text-primary text-xs mb-4 block">Стъпка 05 / 05</span>
              <h1 className="text-brand-header text-5xl md:text-6xl font-bold text-on-background mb-6">Данни за контакт</h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">
                Моля, въведете вашите данни за потвърждение на резервацията. Ще получите SMS с детайлите за вашия час.
              </p>
            </div>

            <form
              className="space-y-12"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-precision text-[0.7rem] text-outline mb-2 block group-focus-within:text-primary transition-colors">Име</label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-background focus:ring-0 focus:border-primary placeholder:text-surface-container-highest transition-all font-body text-lg"
                    placeholder="Иван"
                    type="text"
                  />
                </div>
                <div className="relative group">
                  <label className="text-precision text-[0.7rem] text-outline mb-2 block group-focus-within:text-primary transition-colors">Фамилия</label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-background focus:ring-0 focus:border-primary placeholder:text-surface-container-highest transition-all font-body text-lg"
                    placeholder="Петров"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <label className="text-precision text-[0.7rem] text-outline mb-2 block group-focus-within:text-primary transition-colors">Телефон</label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-background focus:ring-0 focus:border-primary placeholder:text-surface-container-highest transition-all text-technical text-lg tracking-wider"
                    placeholder="+359 897 975 527"
                    type="tel"
                  />
                </div>
                <div className="relative group">
                  <label className="text-precision text-[0.7rem] text-outline mb-2 block group-focus-within:text-primary transition-colors">E-mail (незадължително)</label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 text-on-background focus:ring-0 focus:border-primary placeholder:text-surface-container-highest transition-all font-body text-lg"
                    placeholder="ivan@example.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <input
                  className="w-5 h-5 rounded-none border-outline-variant bg-transparent text-primary focus:ring-0 focus:ring-offset-0"
                  id="terms"
                  type="checkbox"
                />
                <label className="text-on-surface-variant text-sm font-body" htmlFor="terms">
                  Съгласен съм с <Link className="text-primary underline" to="#">Общите условия</Link> и политиката за поверителност.
                </label>
              </div>
              <div className="pt-8">
                <button
                  className="w-full md:w-auto bg-primary text-on-primary px-16 py-5 text-precision text-sm font-bold hover:bg-primary-fixed-dim transition-all active:scale-95 flex items-center justify-center gap-4"
                  type="submit"
                >
                  Потвърди резервацията
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-5 bg-surface-container-low p-12 relative overflow-hidden border-l border-outline-variant/10">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-8xl">content_cut</span>
            </div>
            <h3 className="text-precision text-sm text-outline mb-10 border-b border-outline-variant pb-4">Резюме на резервацията</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-precision text-[0.65rem] text-outline mb-1">Услуга</p>
                  <p className="text-xl font-headline font-bold text-on-background">Класическо подстригване</p>
                  <p className="text-on-surface-variant text-sm font-body mt-1">45 минути</p>
                </div>
                <p className="text-technical text-primary text-lg">45.00 лв.</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-precision text-[0.65rem] text-outline mb-1">Майстор</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center overflow-hidden">
                      <img
                        alt="Brillare by BM"
                        className="w-full h-full object-cover grayscale brightness-75"
                        src="https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg"
                      />
                    </div>
                    <p className="text-lg font-headline text-on-background">Боби / Маги</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <p className="text-precision text-[0.65rem] text-outline mb-1">Дата</p>
                  <p className="text-lg font-headline text-on-background">15 Октомври, 2024</p>
                </div>
                <div>
                  <p className="text-precision text-[0.65rem] text-outline mb-1">Час</p>
                  <p className="text-lg text-technical text-on-background">14:30 ч.</p>
                </div>
              </div>
              <div className="pt-10 border-t border-outline-variant/30 flex justify-between items-baseline">
                <p className="text-precision text-sm text-on-background">Общо за плащане</p>
                <p className="text-3xl text-technical text-primary">45.00 лв.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-24 border-0 h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

        {/* Success Section */}
        <section className={`max-w-3xl mx-auto text-center py-20 ${submitted ? '' : 'opacity-30'}`} id="success-message">
          <div className="mb-12 inline-flex items-center justify-center w-24 h-24 bg-surface-container-low border border-primary/20 relative">
            <span className="material-symbols-outlined text-primary text-5xl">check_circle</span>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <h2 className="text-brand-header text-5xl md:text-7xl font-bold text-on-background mb-8">Резервацията е успешна!</h2>
          <div className="bg-surface-container-low p-8 md:p-12 mb-12 text-left border-l-2 border-primary">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">
                  Благодарим Ви! Вашият час е потвърден в Brillare by BM.
                </p>
                <div className="flex items-start gap-4 text-[#8A8070]">
                  <span className="material-symbols-outlined text-primary mt-1">sms</span>
                  <p className="text-sm">
                    Ще получите SMS потвърждение на телефон <span className="text-on-background text-technical">+359 897 975 527</span> в следващите няколко минути.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-auto pt-4 md:pt-0">
                <button className="w-full md:w-auto outline outline-1 outline-outline-variant px-8 py-3 text-precision text-xs hover:bg-surface-container-high transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                  Добави в Календар
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link className="bg-primary text-on-primary px-12 py-5 text-precision text-sm font-bold hover:bg-primary-fixed-dim transition-all" to="/">
              Обратно към начало
            </Link>
            <Link className="text-on-surface-variant hover:text-on-background px-12 py-5 text-precision text-sm border border-outline-variant transition-all" to="#">
              Виж моите резервации
            </Link>
          </div>
          <div className="mt-20 opacity-30 grayscale hover:opacity-100 transition-opacity duration-700">
            <img
              alt="Brillare by BM — фризьорски салон"
              className="w-full h-64 object-cover"
              src="https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-6 md:px-12 py-16 gap-8 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-6">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] uppercase">Brillare by BM</div>
            <p className="text-[#8A8070] max-w-xs font-body leading-relaxed">Прецизност във всяко движение. Вашата визия е нашата мисия в сърцето на града.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="text-precision text-[0.65rem] text-primary">Социални мрежи</span>
              <a className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" href="#">Instagram</a>
              <a className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" href="#">Facebook</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-precision text-[0.65rem] text-primary">Локация</span>
              <Link className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" to="/contact">Бул. Витоша 42</Link>
              <Link className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" to="/contact">София, България</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-precision text-[0.65rem] text-primary">Контакт</span>
              <a className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" href="tel:+359888123456">+359 897 975 527</a>
              <a className="text-[#8A8070] hover:text-[#EDE8DF] transition-colors text-sm font-body" href="mailto:bmhairstdio19@gmail.com">bmhairstdio19@gmail.com</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-precision text-[0.65rem] text-primary">Работно време</span>
              <span className="text-[#8A8070] text-sm font-technical">Пон-Съб: 10:00 - 20:00</span>
              <span className="text-[#8A8070] text-sm font-technical">Неделя: Почивен ден</span>
            </div>
          </div>
        </div>
        <div className="px-12 py-8 border-t border-[#2A2A2A]/30">
          <p className="text-[#8A8070] text-[0.7rem] text-precision opacity-60">© 2024 Brillare by BM Precision Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
