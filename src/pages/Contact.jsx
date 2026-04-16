import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease }
  })
}

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease }
  })
}

function InViewSection({ children, className = '', once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  return (
    <div ref={ref} className={className} data-inview={inView ? 'true' : 'false'}>
      {children}
    </div>
  )
}

export default function Contact() {
  const heroRef = useRef(null)

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen selection:bg-[#C9A84C] selection:text-[#0A0A0A]">

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.028]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }} />

      {/* Vertical gold rule */}
      <motion.div
        className="fixed left-[3.5rem] top-0 bottom-0 w-px hidden lg:block z-10"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease }}
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.18) 20%, rgba(201,168,76,0.18) 80%, transparent 100%)' }}
      />

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO TITLE ─────────────────────────────────────────── */}
        <section ref={heroRef} className="pt-36 pb-0 overflow-hidden">
          <div className="pl-8 md:pl-24 pr-6">

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-[0.55rem] tracking-[0.35em] text-[#C9A84C] uppercase">Brillare by BM</span>
              <div className="h-px flex-1 max-w-[60px]" style={{ background: 'rgba(201,168,76,0.4)' }} />
              <span className="font-mono text-[0.55rem] tracking-[0.35em] text-[#4A4540] uppercase">Свържете се с нас</span>
            </motion.div>

            {/* Giant title */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, delay: 0.35, ease }}
                className="font-['Cormorant_Garamond'] font-bold leading-[0.85] text-[#EDE8DF]"
                style={{ fontSize: 'clamp(4.5rem, 14vw, 14rem)', letterSpacing: '-0.02em' }}
              >
                Контакти
              </motion.h1>
            </div>

            {/* Tagline + gold line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6 mt-6 mb-0"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.0, delay: 0.9, ease }}
                className="h-px origin-left"
                style={{ width: 'clamp(40px, 8vw, 120px)', background: '#C9A84C' }}
              />
              <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.3em] text-[#8A8070] italic">
                Прецизност във всяко докосване
              </p>
            </motion.div>
          </div>

          {/* Full-width separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.0, ease }}
            className="mt-12 h-px origin-left"
            style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.06) 60%, transparent 100%)' }}
          />
        </section>

        {/* ── MAIN CONTENT ───────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0">

          {/* LEFT — Contact info */}
          <div className="px-8 md:px-24 pt-20 pb-20 border-r border-[#1C1C1C] space-y-16">

            {/* Address */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#C9A84C] mb-5">01 — Локация</p>
              <p className="font-['Cormorant_Garamond'] text-[2.2rem] leading-[1.1] font-light text-[#EDE8DF]">
                бул. България 60А,<br />
                <em className="text-[#8A8070]">София, България</em>
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#C9A84C] mb-5">02 — Телефон</p>
              <a
                href="tel:+359897975527"
                className="group flex items-baseline gap-3"
              >
                <span className="font-['DM_Mono'] text-2xl text-[#EDE8DF] group-hover:text-[#C9A84C] transition-colors duration-400 tracking-tight">
                  +359 897 975 527
                </span>
                <span className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity text-sm">↗</span>
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={2}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#C9A84C] mb-5">03 — Електронна поща</p>
              <a
                href="mailto:bmhairstdio19@gmail.com"
                className="group flex items-baseline gap-3"
              >
                <span className="font-['DM_Mono'] text-lg text-[#EDE8DF] group-hover:text-[#C9A84C] transition-colors duration-400 tracking-tight break-all">
                  bmhairstdio19@gmail.com
                </span>
                <span className="text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity text-sm shrink-0">↗</span>
              </a>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={3}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#C9A84C] mb-6">04 — Работно Време</p>
              <div className="space-y-0">
                {[
                  { day: 'Понеделник — Петък', time: '10:00 — 19:00', open: true },
                  { day: 'Събота',             time: 'Почивен ден',   open: false },
                  { day: 'Неделя',             time: 'Почивен ден',   open: false },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-[#1C1C1C] last:border-0">
                    <span className="font-['Lora'] text-sm italic text-[#8A8070]">{row.day}</span>
                    <span className={`font-['DM_Mono'] text-sm tracking-wide ${row.open ? 'text-[#EDE8DF]' : 'text-[#3A3530]'}`}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={4}
              className="flex gap-6"
            >
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/brillare_by_bm' },
                { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61558337120146' },
                { label: 'TikTok',    href: 'https://www.tiktok.com/@brillare_by_bm' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative font-['Josefin_Sans'] text-[0.65rem] uppercase tracking-[0.25em] text-[#4A4540] hover:text-[#C9A84C] transition-colors duration-300"
                >
                  {s.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px bg-[#C9A84C] transition-all duration-400" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <div className="px-8 md:px-16 lg:px-20 pt-20 pb-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0}
            >
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#C9A84C] mb-3">05 — Запитване</p>
              <h2 className="font-['Cormorant_Garamond'] text-[3rem] md:text-[3.8rem] font-light leading-[0.95] text-[#EDE8DF] mb-14">
                Изпратете<br />
                <em className="text-[#8A8070] font-light">запитване</em>
              </h2>
            </motion.div>

            <form className="space-y-10" onSubmit={e => e.preventDefault()}>
              {[
                { label: 'Вашето Име', name: 'name', type: 'text', placeholder: 'Иван Иванов', custom: 1 },
                { label: 'Телефон', name: 'phone', type: 'tel', placeholder: '+359 888 …', custom: 2 },
                { label: 'Електронна поща', name: 'email', type: 'email', placeholder: 'ivan@example.com', custom: 3 },
              ].map((field) => (
                <motion.div
                  key={field.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  custom={field.custom}
                  className="group relative"
                >
                  <label className="font-['Josefin_Sans'] text-[0.58rem] uppercase tracking-[0.25em] text-[#4A4540] group-focus-within:text-[#C9A84C] transition-colors duration-300 block mb-3">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent border-0 border-b border-[#2A2A2A] focus:border-[#C9A84C] text-[#EDE8DF] text-lg pb-3 px-0 outline-none transition-colors duration-300 placeholder:text-[#2A2A2A] font-['Lora']"
                  />
                  {/* Animated underline on focus */}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] group-focus-within:w-full transition-all duration-500" />
                </motion.div>
              ))}

              {/* Message */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={4}
                className="group relative"
              >
                <label className="font-['Josefin_Sans'] text-[0.58rem] uppercase tracking-[0.25em] text-[#4A4540] group-focus-within:text-[#C9A84C] transition-colors duration-300 block mb-3">
                  Съобщение
                </label>
                <textarea
                  rows={4}
                  placeholder="Как можем да Ви помогнем?"
                  className="w-full bg-transparent border-0 border-b border-[#2A2A2A] focus:border-[#C9A84C] text-[#EDE8DF] text-lg pb-3 px-0 outline-none transition-colors duration-300 placeholder:text-[#2A2A2A] resize-none font-['Lora']"
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] group-focus-within:w-full transition-all duration-500" />
              </motion.div>

              {/* Submit */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                custom={5}
              >
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden bg-transparent border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C] py-5 font-['Josefin_Sans'] text-[0.7rem] uppercase tracking-[0.3em] font-bold transition-colors duration-400 flex items-center justify-center gap-4"
                >
                  {/* Fill on hover */}
                  <span className="absolute inset-0 bg-[#C9A84C] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative group-hover:text-[#0A0A0A] transition-colors duration-300">Изпрати Запитване</span>
                  <span className="relative group-hover:text-[#0A0A0A] transition-colors duration-300 text-base">→</span>
                </button>
              </motion.div>
            </form>
          </div>
        </section>

        {/* ── MAP ────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
          className="relative h-[500px] overflow-hidden"
          style={{ borderTop: '1px solid #1C1C1C' }}
        >
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, transparent 15%, transparent 85%, #0A0A0A 100%)' }} />
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)' }} />

          <img
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(100%) brightness(0.35) contrast(1.1)', transform: 'scale(1.04)' }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7tiYdndQG81tD-dt3EcCB6vdODjdborkjb2wu3zsjUHXUr095HP6HS7Uw7HSbRtAGq0-dTytGAqQ71wZd73_Doy12bugkoh0A2EcQIruC75NwJ-AMdh0q9ntNIv0Gh2b0gZSuRlU3GbkGEVnm9GhBlRh_81hDzIqTBdQcIuPC4dwK7T4GuJLApaZqIS4UH-w8eusp8lC-8MwHxKR7h-WipQhxk2tl7TkedLQYB03Kfc04Hl_2RpNABOnUAw55u1UzUXviN1r_3w"
            alt="Sofia map"
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#C9A84C]" />
            <div className="w-3 h-3 rounded-full border border-[#C9A84C] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
            </div>
            <div className="mt-3 px-8 py-3 border border-[#C9A84C]/30" style={{ background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)' }}>
              <p className="font-['DM_Mono'] text-[0.6rem] uppercase tracking-[0.35em] text-[#C9A84C]">бул. България 60А · София</p>
            </div>
          </div>
        </motion.section>

      </main>

      <Footer />
    </div>
  )
}
