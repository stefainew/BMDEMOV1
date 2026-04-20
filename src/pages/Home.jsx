import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'motion/react'
import { TestimonialsColumn } from '../components/ui/TestimonialsColumn'
import BarberDivider from '../components/BarberDivider'

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCount(0)
          setActive(true)
        } else {
          if (animRef.current) cancelAnimationFrame(animRef.current)
          setActive(false)
          setCount(0)
        }
      },
      { threshold: 0.5 }
    )
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) animRef.current = requestAnimationFrame(tick)
      else setCount(target)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [active, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const heroStats = [
  { value: 25, suffix: '+', label: 'Години опит' },
  { value: 200, suffix: '+', label: 'Доволни клиенти' },
  { value: 5, suffix: '.0', label: 'Средна оценка' },
]

const rituals = [
  {
    num: '01',
    title: 'Кичури и Балеаж',
    desc: 'Деликатно осветляване и техника балеаж за естествен, слънчев ефект. Персонализирано за вашия тип коса и желан резултат.',
    price: '',
    wide: true,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg',
  },
  {
    num: '02',
    title: 'Боядисване',
    desc: 'Професионално боядисване с висок клас продукти за трайни и живи цветове. Пълна грижа за структурата на косата.',
    price: '',
    wide: false,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg',
  },
  {
    num: '03',
    title: 'Екстеншъни',
    desc: 'Премиум удължаване и сгъстяване с висококачествена коса. Естествен вид и трайност при правилна грижа.',
    price: '',
    wide: false,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-extensions-premium-sofia-1-705x705.jpg',
  },
  {
    num: '04',
    title: 'Официални прически',
    desc: 'Изискана прическа за сватба, абитуриентски бал или всеки специален повод. Всяко движение е прецизно обмислено.',
    price: '',
    wide: true,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
  },
]

const testimonials = [
  {
    text: 'Боби е невероятен – резултатът всеки път надминава очакванията ми. Балеажът е просто перфектен.',
    name: 'Мария Иванова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    text: 'Отидох за първи път преди три години и оттогава не сменям. Индивидуалният подход и грижата за косата ми са несравними с никое друго място.',
    name: 'Стела Петрова',
    role: 'Редовен клиент',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    text: 'Боядисването при Боби е цяло изживяване. Обяснява всяка стъпка, съветва какво е най-добро за косата ти и резултатът е всеки път страхотен.',
    name: 'Десислава Тодорова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
  {
    text: 'Рядко срещаш място, където се отнасят към косата ти с такова уважение. Атмосферата е луксозна, но усещането е домашно и топло.',
    name: 'Анна Михайлова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    text: 'Зарадвах се, когато открих Боби Ярчев. Екстеншъните са с невероятно качество и прилепват перфектно към естествената ми коса.',
    name: 'Виктория Димитрова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  {
    text: 'Прическата за сватбата ми беше дело на Боби – изглеждах приказно! Всички питаха кой ми е направил косата. Само препоръки!',
    name: 'Калина Стоянова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    text: 'Отивам при Боби веднъж месечно. Всеки път излизам с усещане, че косата ми е трансформирана. Премиум продукти и страхотни резултати.',
    name: 'Надя Кирова',
    role: 'Редовен клиент',
    image: 'https://randomuser.me/api/portraits/women/78.jpg',
  },
  {
    text: 'Боби е истински майстор на своята работа. 25 години опит личат на всяка стъпка – от консултацията до финалния резултат.',
    name: 'Радостина Иванова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/34.jpg',
  },
  {
    text: 'Атмосферата е уникална – луксозна, но приятелска. Боби не просто прави прическа, а прави изживяване.',
    name: 'Ирина Петкова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/91.jpg',
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const team = [
  {
    name: 'Боби',
    role: 'Майстор Фризьор',
    desc: 'С над 25 години опит, Боби Ярчев е истинският майстор. Работа по филми, реклами и ТВ продукции.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
  },
]

const manifestoText = 'Моята мисия е да ви помогна да откриете своя уникален стил с индивидуален подход и премиум продукти.'

/* ─── MOSAIC CELL ───────────────────────────────────────── */
function ServiceMosaicCell({ ritual, tall = false, wide = false, rowSpan = 1 }) {
  const height = wide ? '340px' : '100%'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="group"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height,
        gridRow: rowSpan === 2 ? 'span 2' : undefined,
        cursor: 'default',
      }}
    >
      {/* Image — desaturated, reveals color on hover */}
      <img
        src={ritual.img}
        alt={ritual.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 25%',
          filter: 'grayscale(60%) brightness(0.65)',
          transform: 'scale(1)',
          transition: 'filter 0.7s ease, transform 0.9s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'grayscale(0%) brightness(0.8)'
          e.currentTarget.style.transform = 'scale(1.06)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = 'grayscale(60%) brightness(0.65)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      />

      {/* Diagonal clip overlay — gold wash, clipped diagonally */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, transparent 60%)',
        clipPath: 'polygon(0 0, 55% 0, 35% 100%, 0 100%)',
        pointerEvents: 'none',
        transition: 'opacity 0.6s',
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.1) 55%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Watermark number */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: wide ? '18rem' : '14rem',
        fontWeight: 700,
        color: 'rgba(201,168,76,0.05)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        transition: 'color 0.6s',
      }}>
        {ritual.num}
      </div>

      {/* Content — bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: wide ? '2rem 3rem' : '2rem 2.5rem',
        display: wide ? 'flex' : 'block',
        alignItems: wide ? 'flex-end' : undefined,
        justifyContent: wide ? 'space-between' : undefined,
        gap: wide ? '2rem' : undefined,
      }}>
        <div>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            color: '#C9A84C',
            letterSpacing: '0.2em',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            {ritual.num} — {ritual.title.toUpperCase()}
          </span>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: wide ? 'clamp(2rem, 3.5vw, 3.5rem)' : 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 700,
            color: '#EDE8DF',
            lineHeight: 0.95,
            marginBottom: '0.6rem',
          }}>
            {ritual.title}
          </h3>
        </div>

        {/* Description — slides up on hover */}
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '0.8rem',
          color: 'rgba(237,232,223,0.55)',
          fontStyle: 'italic',
          lineHeight: 1.7,
          maxWidth: wide ? '380px' : '260px',
          transform: 'translateY(8px)',
          opacity: 0,
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
          className="group-hover:opacity-100 group-hover:translate-y-0"
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '0'
            e.currentTarget.style.transform = 'translateY(8px)'
          }}
        >
          {ritual.desc}
        </p>
      </div>

      {/* Corner accent line — top right */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40px',
        height: '40px',
        borderTop: '1px solid rgba(201,168,76,0.3)',
        borderRight: '1px solid rgba(201,168,76,0.3)',
      }} />
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <div className="grain-overlay"></div>
      <Navbar />

      <main>
        {/* Hero Split Screen */}
        <section className="min-h-screen flex flex-col md:flex-row pt-24 overflow-hidden">
          <motion.div
            className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-12 order-2 md:order-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.13 } }
            }}
          >
            <motion.span
              className="font-label text-primary uppercase tracking-[0.4em] text-xs mb-6"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >25+ Години Опит</motion.span>
            <motion.h1
              className="font-headline text-6xl md:text-8xl text-on-surface leading-[0.9] mb-8 font-bold"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16,1,0.3,1] } } }}
            >
              Твоята <br />
              <span className="italic font-light">коса.</span> <br />
              Моята страст.
            </motion.h1>
            <motion.p
              className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed mb-12"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } } }}
            >
              Боби Ярчев — майстор фризьор с над 25 години опит. Прецизност и индивидуален подход към всяка коса.
            </motion.p>
            <motion.div
              className="flex items-center space-x-8"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
            >
              <a
                href="/booking"
                
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-xs rounded-sm hover:bg-primary-fixed-dim transition-colors"
              >
                Запази час онлайн
              </a>
              <a href="/services" className="border border-outline-variant text-on-surface px-10 py-4 font-label uppercase tracking-widest text-xs rounded-sm hover:bg-surface-container-low transition-colors">
                Нашите услуги
              </a>
            </motion.div>

            {/* Star Rating */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-8"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.7, delay: 0.1 } } }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-primary fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['women/32', 'women/44', 'women/55', 'women/12'].map((p, i) => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} className="w-7 h-7 rounded-full border-2 border-background object-cover" alt="" />
                  ))}
                </div>
                <div>
                  <span className="font-label text-xs text-on-surface font-bold">5.0</span>
                  <span className="font-body text-xs text-on-surface-variant ml-1">от 200+ клиента</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="w-full md:w-1/2 h-[614px] md:h-auto relative overflow-hidden order-1 md:order-2">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdreiaFdBTH7plf2YyxkkS82AlTtnJgc6txSFUyrnkRpFgKPQxb14cs6-Wz8oXS6KsnpOw35LGBd09_JCdMvoptXuRChSdJwo9J_0W3uwgIHTbcNgodXNg2n7zzqTK9UGljWCkin9cYkU6wRH5wIrfS2P2mzCCWtxJLkixj_FmTVZWmxZOI_2siUQDlzYCCGJaJkIaMQYAo8jWSAP9pzN0KO5MBHlhr7bRzPG-2rF-IsMXOmU49bBiF1k8Fj72pCxiWyZScXSYeg"
              alt="Боби Ярчев — hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block"></div>
            <div className="absolute bottom-12 left-12 md:hidden">
              <span className="font-headline text-3xl text-primary italic">Боби Ярчев</span>
            </div>

            {/* Floating Review Card — top right on desktop, bottom-right on mobile */}
            <div className="absolute bottom-16 right-3 w-52 md:top-10 md:right-6 md:bottom-auto md:w-64 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C9A84C]/20 p-4 md:p-5 shadow-2xl" style={{ animation: 'floatY 6s ease-in-out infinite' }}>
              <div className="flex items-center gap-3 mb-3">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-9 h-9 rounded-full object-cover border border-primary/30" alt="" />
                <div>
                  <p className="font-label text-[0.7rem] uppercase tracking-widest text-[#EDE8DF]">Стела Петрова</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-2.5 h-2.5 text-primary fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-body text-[0.7rem] text-[#D4CFC6] italic leading-relaxed font-semibold">"Индивидуалният подход е несравним. Оттогава не сменям салон."</p>
            </div>

            {/* Floating Review Card — middle left on desktop only (covers face on mobile) */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 hidden md:block w-56 bg-[#0A0A0A]/80 backdrop-blur-md border border-outline-variant/30 p-4 shadow-2xl" style={{ animation: 'floatY 7s ease-in-out infinite 1.5s' }}>
              <div className="flex items-center gap-2 mb-2">
                <img src="https://randomuser.me/api/portraits/women/23.jpg" className="w-8 h-8 rounded-full object-cover border border-primary/30" alt="" />
                <div>
                  <p className="font-label text-[0.65rem] uppercase tracking-wider text-[#EDE8DF]">Калина Стоянова</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-2.5 h-2.5 text-primary fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-body text-[0.65rem] text-[#D4CFC6] italic leading-relaxed font-semibold">"Прическата за сватбата ми беше приказна!"</p>
            </div>

            {/* Floating stat badge — top-left on mobile, bottom-right on desktop */}
            <div className="absolute top-4 left-3 md:top-auto md:bottom-10 md:left-auto md:right-6 bg-[#C9A84C] px-4 py-2 md:px-5 md:py-3 shadow-2xl" style={{ animation: 'floatY 5s ease-in-out infinite 3s' }}>
              <p className="font-label text-[0.6rem] uppercase tracking-widest text-[#0A0A0A] mb-0.5">Средна оценка</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-2xl font-bold text-[#0A0A0A] leading-none">5.0</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-[#0A0A0A] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
              </div>
              <p className="font-mono text-[0.55rem] text-[#241a00] mt-0.5">200+ отзива</p>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden py-5 bg-[#C9A84C]"
        >
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marqueeSlide 22s linear infinite', willChange: 'transform' }}
          >
            {['БОБИ ЯРЧЕВ', 'БОБИ ЯРЧЕВ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД',
              'БОБИ ЯРЧЕВ', 'БОБИ ЯРЧЕВ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД',
              'БОБИ ЯРЧЕВ', 'БОБИ ЯРЧЕВ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД'].map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#1A1A18',
                  paddingRight: '3rem',
                  fontWeight: 700,
                }}
              >
                {t} <span style={{ color: '#7A5C20', marginRight: '3rem' }}>✦</span>
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marqueeSlide {
              from { transform: translateX(0); }
              to { transform: translateX(-33.333%); }
            }
          `}</style>
        </motion.div>

        {/* Stats */}
        <section style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-3">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0 }}
                className="text-center py-14 px-6"
                style={{ borderRight: i < heroStats.length - 1 ? '1px solid rgba(26,26,24,0.08)' : 'none' }}
              >
                <div
                  className="font-headline font-bold leading-none mb-3"
                  style={{ fontSize: 'clamp(3.5rem,6vw,6rem)', color: '#1A1A18' }}
                >
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <p
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: '#C9A84C',
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Service Rituals */}
        <section style={{ backgroundColor: '#0A0A0A', padding: '0 0 6rem', contentVisibility: 'auto', containIntrinsicSize: '0 900px' }}>

          {/* ── Section title — full width spanning header ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0 }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '4rem 4rem 2.5rem',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
              marginBottom: '0',
            }}
          >
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 7vw, 8rem)',
              fontWeight: 700,
              lineHeight: 0.88,
              color: '#EDE8DF',
            }}>
              Нашите <em style={{ fontWeight: 300, color: 'rgba(237,232,223,0.45)' }}>услуги</em>
            </h2>
            <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '0.5rem',
              }}>0{rituals.length} специалности</p>
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: '0.85rem',
                color: '#5C5448',
                fontStyle: 'italic',
                maxWidth: '280px',
              }}>Индивидуален подход, премиум продукти, резултати от които ще се влюбите.</p>
            </div>
          </motion.div>

          {/* ── Mosaic grid ── */}
          <div className="[grid-template-rows:auto] md:[grid-template-rows:340px_340px]" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3px',
            backgroundColor: '#0A0A0A',
          }}>

            {/* Cell 01 — large left, spans 2 rows — the blonde woman */}
            <ServiceMosaicCell ritual={rituals[0]} rowSpan={2} tall />

            {/* Cell 02 — top right image */}
            <ServiceMosaicCell ritual={rituals[2]} />

            {/* Cell 03 — bottom right cream quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true, amount: 0 }}
              style={{
                backgroundColor: '#F5F0E8',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative large quote mark */}
              <div aria-hidden="true" style={{
                position: 'absolute',
                top: '-0.2em',
                left: '0.2em',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16rem',
                fontWeight: 700,
                color: 'rgba(201,168,76,0.07)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                "
              </div>

              <blockquote style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#1A1A18',
                  lineHeight: 1.4,
                  marginBottom: '1.5rem',
                }}>
                  "Рядко срещаш място, където се отнасят към косата ти с такова уважение. Атмосферата е луксозна, но усещането е домашно и топло."
                </p>
                <cite style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.55rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  fontStyle: 'normal',
                }}>
                  — Анна Михайлова, редовен клиент
                </cite>
              </blockquote>

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '40px',
                height: '40px',
                borderBottom: '1px solid rgba(201,168,76,0.3)',
                borderRight: '1px solid rgba(201,168,76,0.3)',
              }} />
            </motion.div>

          </div>

          {/* Cell 04 — full width strip */}
          <div style={{ marginTop: '3px' }}>
            <ServiceMosaicCell ritual={rituals[3]} wide />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
          >
            <a
              href="/services"
              className="group relative overflow-hidden inline-flex items-center gap-4"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.35)',
                padding: '1.1rem 3rem',
                textDecoration: 'none',
                transition: 'color 0.4s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1A1A18')}
              onMouseLeave={e => (e.currentTarget.style.color = '#C9A84C')}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0" style={{
                backgroundColor: '#C9A84C',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 0,
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Разгледай всички услуги</span>
              <span style={{ position: 'relative', zIndex: 1, transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

        </section>

        <BarberDivider />

        {/* Testimonials */}
        <section
          className="py-32 overflow-hidden"
          style={{
            position: 'relative',
            contentVisibility: 'auto',
            containIntrinsicSize: '0 800px',
            background: `
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 80% 30%, rgba(160,110,30,0.05) 0%, transparent 65%),
              radial-gradient(ellipse 40% 40% at 50% 90%, rgba(201,168,76,0.04) 0%, transparent 60%),
              #0D0B09
            `,
          }}
        >
          {/* Diagonal hairline grid */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              rgba(201,168,76,0.025) 0px,
              rgba(201,168,76,0.025) 1px,
              transparent 1px,
              transparent 60px
            )`,
            pointerEvents: 'none',
          }} />
          <div className="px-12 max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0 }}
              className="mb-16"
            >
              <span className="font-label text-primary uppercase tracking-[0.4em] text-xs mb-4 block">
                [ КЛИЕНТСКИ МНЕНИЯ ]
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-on-surface">
                Гласът на клиентите
              </h2>
            </motion.div>
          </div>

          <div className="flex justify-center gap-6 px-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden" style={{ position: 'relative', zIndex: 1, marginTop: '0' }}>
            <TestimonialsColumn testimonials={firstColumn} duration={18} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="relative overflow-hidden"
          style={{ backgroundColor: '#F5F0E8', minHeight: '320px' }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-12 md:px-20 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0 }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.92,
                  color: '#1A1A18',
                  marginBottom: '1.5rem',
                }}
              >
                Готови ли сте<br />
                <em style={{ fontWeight: 300 }}>за трансформация?</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#5C5448',
                  fontSize: '0.95rem',
                  lineHeight: 1.75,
                  maxWidth: '400px',
                }}
              >
                Запазете своя час онлайн или ни се обадете. Боби ще се погрижи за всичко останало.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0 }}
              className="flex flex-col gap-4 items-start md:items-end"
            >
              <a
                href="/booking"
                
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  backgroundColor: '#1A1A18',
                  padding: '1.1rem 3rem',
                  fontWeight: 700,
                  display: 'inline-block',
                }}
              >
                Запази час онлайн
              </a>
              <a
                href="tel:+359897975527"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: '#5C5448',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(92,84,72,0.4)',
                  paddingBottom: '2px',
                  textDecoration: 'none',
                }}
              >
                +359 897 975 527
              </a>
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section
          id="team"
          style={{
            backgroundColor: '#0A0A0A',
            contentVisibility: 'auto',
            containIntrinsicSize: '0 800px',
          }}
        >
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0 }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '4rem 4rem 2.5rem',
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 4vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 0.88,
              color: '#EDE8DF',
            }}>
              Боби
            </h2>
            <div style={{ textAlign: 'right', paddingBottom: '0.5rem' }}>
              <p style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '0.5rem',
              }}>[ 05 — МАЙСТОРЪТ ]</p>
              <p style={{
                fontFamily: "'Lora', serif",
                fontSize: '0.85rem',
                color: '#5C5448',
                fontStyle: 'italic',
                maxWidth: '260px',
              }}>Над 25 години страст, прецизност и индивидуален подход към всяка коса.</p>
            </div>
          </motion.div>

          {/* ── Diptych portraits ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3px',
            backgroundColor: '#0A0A0A',
          }}>
            {team.slice(0, 1).map((member, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0 }}
                style={{ position: 'relative', overflow: 'hidden', height: '380px' }}
              >
                {/* Portrait image */}
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    filter: 'grayscale(50%) brightness(0.6)',
                    transition: 'filter 0.8s ease, transform 1s ease',
                    transform: 'scale(1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.filter = 'grayscale(0%) brightness(0.75)'
                    e.currentTarget.style.transform = 'scale(1.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.filter = 'grayscale(50%) brightness(0.6)'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.2) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Diagonal gold wash */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, transparent 55%)',
                  clipPath: 'polygon(0 0, 45% 0, 25% 100%, 0 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Corner accent */}
                <div style={{
                  position: 'absolute', top: 0,
                  ...(i === 0 ? { right: 0 } : { left: 0 }),
                  width: '40px', height: '40px',
                  borderTop: '1px solid rgba(201,168,76,0.35)',
                  ...(i === 0
                    ? { borderRight: '1px solid rgba(201,168,76,0.35)' }
                    : { borderLeft: '1px solid rgba(201,168,76,0.35)' }),
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '2.5rem 3rem',
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '0.58rem',
                    color: '#C9A84C',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.6rem',
                  }}>
                    0{i + 1} — {member.role.toUpperCase()}
                  </span>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
                    fontWeight: 700,
                    color: '#EDE8DF',
                    lineHeight: 0.9,
                    marginBottom: '0.8rem',
                  }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '0.8rem',
                    color: 'rgba(237,232,223,0.5)',
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    maxWidth: '340px',
                    opacity: 0,
                    transform: 'translateY(8px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '0'
                      e.currentTarget.style.transform = 'translateY(8px)'
                    }}
                  >
                    {member.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Manifesto strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2.5rem 4rem',
              borderTop: '1px solid rgba(201,168,76,0.08)',
              gap: '2rem',
            }}
          >
            <p style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
              fontStyle: 'italic',
              color: 'rgba(237,232,223,0.45)',
              maxWidth: '700px',
              lineHeight: 1.6,
            }}>
              "{manifestoText}"
            </p>
            <a
              href="/about"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                borderBottom: '1px solid rgba(201,168,76,0.4)',
                paddingBottom: '2px',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              За Боби →
            </a>
          </motion.div>
        </section>

        {/* Location & Contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 bg-[#0A0A0A] border-t border-outline-variant/20" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
          <motion.div
            className="p-12 md:p-24 flex flex-col justify-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0 }}
          >
            <h2 className="font-headline text-4xl text-on-surface mb-12">Посетете ни</h2>
            <div className="space-y-12">
              <div>
                <span className="font-label text-primary uppercase tracking-widest text-xs block mb-4">Адрес</span>
                <p className="font-body text-xl text-on-surface">
                  бул. България 60А,<br />
                  София, България
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="font-label text-primary uppercase tracking-widest text-xs block mb-4">Работно време</span>
                  <p className="font-mono text-secondary text-sm">ПОН - ПЕТ: 10:00 - 19:00</p>
                  <p className="font-mono text-secondary text-sm">СЪБ - НЕД: ПОЧИВЕН ДЕН</p>
                </div>
                <div>
                  <span className="font-label text-primary uppercase tracking-widest text-xs block mb-4">Контакти</span>
                  <a href="tel:+359897975527" className="font-mono text-secondary text-sm block hover:text-primary transition-colors">+359 897 975 527</a>
                  <a href="mailto:bmhairstdio19@gmail.com" className="font-mono text-secondary text-sm block hover:text-primary transition-colors">bmhairstdio19@gmail.com</a>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="h-[400px] md:h-auto w-full grayscale contrast-125 opacity-70"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0 }}
          >
            <img
              className="w-full h-full object-cover"
              src="https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg"
              alt="Боби Ярчев — Подстригване и стайлинг"
            />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
