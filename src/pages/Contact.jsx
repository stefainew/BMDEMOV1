import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary selection:text-on-primary">
      <div className="noise-overlay grain-overlay"></div>
      <Navbar />

      <main className="pt-40 pb-20">
        {/* Hero Title */}
        <header className="px-12 mb-24 max-w-7xl mx-auto">
          <h1 className="font-headline text-[5rem] md:text-[8rem] leading-[0.9] tracking-tighter text-on-surface">
            Контакти
          </h1>
          <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-primary"></div>
            <p className="font-label uppercase tracking-widest text-primary text-xs">Прецизност във всяко докосване</p>
          </div>
        </header>

        {/* Main Content Grid */}
        <section className="px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Information */}
          <div className="lg:col-span-5 space-y-20">
            <div className="space-y-12">
              <div className="group">
                <label className="font-label uppercase text-[0.7rem] tracking-[0.2em] text-secondary mb-4 block">Локация</label>
                <p className="font-headline text-3xl text-on-surface group-hover:text-primary transition-colors duration-500">
                  бул. България 60А,<br />
                  София, България
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="font-label uppercase text-[0.7rem] tracking-[0.2em] text-secondary mb-4 block">Телефон</label>
                  <a href="tel:+359897975527" className="font-technical text-xl text-on-surface hover:text-primary transition-colors">+359 897 975 527</a>
                </div>
                <div>
                  <label className="font-label uppercase text-[0.7rem] tracking-[0.2em] text-secondary mb-4 block">Електронна поща</label>
                  <a href="mailto:bmhairstdio19@gmail.com" className="font-technical text-xl text-on-surface underline decoration-primary/30 hover:decoration-primary transition-all">bmhairstdio19@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-surface-container-low p-8 border-l-2 border-primary/20">
              <label className="font-label uppercase text-[0.7rem] tracking-[0.2em] text-primary mb-6 block font-bold">Работно Време</label>
              <div className="space-y-4">
                {[
                  { day: 'Понеделник — Петък', time: '10:00 — 19:00', closed: false },
                  { day: 'Събота', time: 'Почивен ден', closed: true },
                  { day: 'Неделя', time: 'Почивен ден', closed: true },
                ].map((row, i, arr) => (
                  <div key={i} className={`flex justify-between items-center pb-2 ${i < arr.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
                    <span className="font-body text-secondary">{row.day}</span>
                    <span className={`font-technical text-on-surface ${row.closed ? 'text-error' : ''}`}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-8 items-center">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/brillare_by_bm' },
                { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61558337120146' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@brillare_by_bm' },
              ].map((s, i, arr) => (
                <span key={s.label} className="flex items-center gap-8">
                  <a className="group" href={s.href} target="_blank" rel="noopener noreferrer">
                    <span className="font-label uppercase text-[0.75rem] tracking-widest text-secondary group-hover:text-primary transition-colors">{s.label}</span>
                  </a>
                  {i < arr.length - 1 && <div className="w-1.5 h-1.5 bg-outline-variant/30 rounded-full"></div>}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary/20 text-6xl select-none">content_cut</span>
              </div>
              <h3 className="font-headline text-3xl mb-10 text-on-surface">Изпратете запитване</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="font-label text-[0.65rem] uppercase tracking-widest text-secondary mb-2 block">Име</label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface py-2 px-0 transition-all placeholder:text-outline-variant/50"
                      placeholder="Вашето име"
                      type="text"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-label text-[0.65rem] uppercase tracking-widest text-secondary mb-2 block">Телефон</label>
                    <input
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface py-2 px-0 transition-all placeholder:text-outline-variant/50"
                      placeholder="+359 ..."
                      type="tel"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="font-label text-[0.65rem] uppercase tracking-widest text-secondary mb-2 block">Съобщение</label>
                  <textarea
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary text-on-surface py-2 px-0 transition-all placeholder:text-outline-variant/50"
                    placeholder="Как можем да Ви помогнем?"
                    rows="4"
                  ></textarea>
                </div>
                <button
                  className="w-full bg-primary text-on-primary-fixed py-5 font-label uppercase tracking-[0.25em] text-xs font-bold hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-3"
                  type="submit"
                >
                  Изпрати Запитване
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-32 w-full h-[600px] relative grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden group">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background via-transparent to-background"></div>
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center relative">
            <img
              className="w-full h-full object-cover opacity-40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7tiYdndQG81tD-dt3EcCB6vdODjdborkjb2wu3zsjUHXUr095HP6HS7Uw7HSbRtAGq0-dTytGAqQ71wZd73_Doy12bugkoh0A2EcQIruC75NwJ-AMdh0q9ntNIv0Gh2b0gZSuRlU3GbkGEVnm9GhBlRh_81hDzIqTBdQcIuPC4dwK7T4GuJLApaZqIS4UH-w8eusp8lC-8MwHxKR7h-WipQhxk2tl7TkedLQYB03Kfc04Hl_2RpNABOnUAw55u1UzUXviN1r_3w"
              alt="Sofia map"
            />
            <div className="absolute z-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/20 backdrop-blur-md rounded-full flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
              <div className="mt-4 glass-card px-6 py-2 border border-primary/20">
                <span className="font-technical text-primary text-sm uppercase tracking-widest">42.6934° N, 23.3364° E</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
