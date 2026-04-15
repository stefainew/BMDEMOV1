import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'motion/react'
import { TestimonialsColumn } from '../components/ui/TestimonialsColumn'

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
            else setCount(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

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
    text: 'Brillare by BM е любимото ми място в София! Боби и Маги са невероятни – резултатът всеки път надминава очакванията ми. Балеажът е просто перфектен.',
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
    text: 'Боядисването с тях е цяло изживяване. Обясняват всяка стъпка, съветват какво е най-добро за косата ти и резултатът е всеки път страхотен.',
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
    text: 'Зарадвах се, когато открих Brillare by BM. Екстеншъните са с невероятно качество и прилепват перфектно към естествената ми коса.',
    name: 'Виктория Димитрова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  {
    text: 'Прическата за сватбата ми беше дело на Маги – изглеждах приказно! Всички питаха кой ми е направил косата. Само препоръки!',
    name: 'Калина Стоянова',
    role: 'Клиент',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    text: 'Отивам там веднъж месечно. Всеки път излизам с усещане, че косата ми е трансформирана. Премиум продукти и страхотни резултати.',
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
    text: 'Атмосферата е уникална – луксозна, но приятелска. Не просто правят прическа, а правят изживяване. Завинаги мой салон!',
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
    desc: 'С над 25 години опит, Боби е истинският майстор зад Brillare by BM. Работа по филми, реклами и ТВ продукции.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
  },
  {
    name: 'Маги',
    role: 'Старши Стилист',
    desc: 'Маги е специалист в цветните техники, балеаж и официални прически. Индивидуален подход и прецизност.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
  },
  {
    name: 'Brillare by BM',
    role: 'Фризьорски Салон',
    desc: 'Нашата мисия е да ви помогнем да откриете своя уникален стил с индивидуален подход и премиум продукти.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/premium-hair-treatment-sofia-705x705.jpg',
  },
]

export default function Home() {
  return (
    <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <div className="grain-overlay"></div>
      <Navbar />

      <main>
        {/* Hero Split Screen */}
        <section className="min-h-screen flex flex-col md:flex-row pt-24">
          <div className="w-full md:w-1/2 flex flex-col justify-center px-12 md:px-24 py-12 order-2 md:order-1">
            <span className="font-label text-primary uppercase tracking-[0.4em] text-xs mb-6">25+ Години Опит</span>
            <h1 className="font-headline text-6xl md:text-8xl text-on-surface leading-[0.9] mb-8 font-bold">
              Вашата <br />
              <span className="italic font-light">красота.</span> <br />
              Нашата страст.
            </h1>
            <p className="font-body text-lg text-on-surface-variant max-w-md leading-relaxed mb-12">
              Модерен фризьорски салон в сърцето на София с над 25 години опит, премиум продукти и индивидуален подход към всяка коса.
            </p>
            <div className="flex items-center space-x-8">
              <a
                href="https://www.fresha.com/book-now/brilare-eood-mtqavppl/all-offer?pId=1013517"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-10 py-4 font-label uppercase tracking-widest text-xs rounded-sm hover:bg-primary-fixed-dim transition-colors"
              >
                Запази час онлайн
              </a>
              <a href="/services" className="border border-outline-variant text-on-surface px-10 py-4 font-label uppercase tracking-widest text-xs rounded-sm hover:bg-surface-container-low transition-colors">
                Нашите услуги
              </a>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-4 mt-8">
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
            </div>
          </div>

          <div className="w-full md:w-1/2 h-[614px] md:h-auto relative overflow-hidden order-1 md:order-2">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdreiaFdBTH7plf2YyxkkS82AlTtnJgc6txSFUyrnkRpFgKPQxb14cs6-Wz8oXS6KsnpOw35LGBd09_JCdMvoptXuRChSdJwo9J_0W3uwgIHTbcNgodXNg2n7zzqTK9UGljWCkin9cYkU6wRH5wIrfS2P2mzCCWtxJLkixj_FmTVZWmxZOI_2siUQDlzYCCGJaJkIaMQYAo8jWSAP9pzN0KO5MBHlhr7bRzPG-2rF-IsMXOmU49bBiF1k8Fj72pCxiWyZScXSYeg"
              alt="Brillare by BM — hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block"></div>
            <div className="absolute bottom-12 left-12 md:hidden">
              <span className="font-headline text-3xl text-primary italic">Brillare by BM</span>
            </div>

            {/* Floating Review Card — top right */}
            <div className="absolute top-10 right-6 hidden md:block w-64 bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C9A84C]/20 p-5 shadow-2xl" style={{ animation: 'floatY 6s ease-in-out infinite' }}>
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

            {/* Floating Review Card — middle left on image */}
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

            {/* Floating stat badge — bottom right */}
            <div className="absolute bottom-10 right-6 hidden md:block bg-[#C9A84C] px-5 py-3 shadow-2xl" style={{ animation: 'floatY 5s ease-in-out infinite 3s' }}>
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
        <div className="overflow-hidden py-5 bg-[#C9A84C]">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marqueeSlide 22s linear infinite' }}
          >
            {['BRILLARE BY BM', 'БОБИ И МАГИ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД',
              'BRILLARE BY BM', 'БОБИ И МАГИ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД',
              'BRILLARE BY BM', 'БОБИ И МАГИ', '25+ ГОДИНИ ОПИТ', 'СОФИЯ', 'ПРЕМИУМ СТИЛИСТИКА', 'ИНДИВИДУАЛЕН ПОДХОД'].map((t, i) => (
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
        </div>

        {/* Stats */}
        <section style={{ backgroundColor: '#F5F0E8' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-3">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
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
        <section className="py-32 px-12 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline text-5xl text-on-surface mb-6">Нашите услуги</h2>
                <p className="font-body text-secondary text-lg">
                  Всяко посещение в Brillare by BM е изживяване. Използваме премиум продукти и персонализирани техники за вашата уникална коса.
                </p>
              </div>
              <div className="font-mono text-primary text-sm uppercase tracking-tighter">
                [ КРАСОТА С ИНДИВИДУАЛЕН ПОДХОД ]
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Ritual 1 - wide with image */}
              <div className="md:col-span-8 group relative overflow-hidden h-[500px]">
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                  src={rituals[0].img}
                  alt={rituals[0].title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                  <span className="font-mono text-primary mb-2 block">{rituals[0].num}</span>
                  <h3 className="font-headline text-3xl text-on-surface mb-4">{rituals[0].title}</h3>
                  <p className="font-body text-secondary-fixed-dim max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {rituals[0].desc}
                  </p>
                  <span className="font-mono text-primary-fixed-dim">{rituals[0].price}</span>
                </div>
              </div>

              {/* Ritual 2 */}
              <div className="md:col-span-4 bg-surface-container-high p-12 flex flex-col justify-end border-l border-primary/20">
                <span className="font-mono text-primary mb-2 block">{rituals[1].num}</span>
                <h3 className="font-headline text-2xl text-on-surface mb-4">{rituals[1].title}</h3>
                <p className="font-body text-secondary text-sm mb-8">{rituals[1].desc}</p>
                <div className="font-mono text-primary-fixed-dim">{rituals[1].price}</div>
              </div>

              {/* Ritual 3 */}
              <div className="md:col-span-4 bg-surface-container-low p-12 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-primary mb-2 block">{rituals[2].num}</span>
                  <h3 className="font-headline text-2xl text-on-surface mb-4">{rituals[2].title}</h3>
                </div>
                <div>
                  <p className="font-body text-secondary text-sm mb-8">{rituals[2].desc}</p>
                  <div className="font-mono text-primary-fixed-dim">{rituals[2].price}</div>
                </div>
              </div>

              {/* Ritual 4 - wide with image */}
              <div className="md:col-span-8 group relative overflow-hidden h-[400px]">
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:grayscale-0 grayscale transition-all duration-700"
                  src={rituals[3].img}
                  alt={rituals[3].title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                <div className="absolute left-12 top-1/2 -translate-y-1/2">
                  <span className="font-mono text-primary mb-2 block">{rituals[3].num}</span>
                  <h3 className="font-headline text-3xl text-on-surface mb-2">{rituals[3].title}</h3>
                  <p className="font-body text-on-surface-variant max-w-xs mb-4">{rituals[3].desc}</p>
                  <div className="font-mono text-primary-fixed-dim">{rituals[3].price}</div>
                </div>
              </div>
            </div>

            {/* Services CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex justify-center mt-16"
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
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#1A1A18'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#C9A84C'
                }}
              >
                {/* Fill animation background */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0"
                  style={{
                    backgroundColor: '#C9A84C',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 0,
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>Разгледай всички услуги</span>
                <span
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                  }}
                  className="group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </motion.div>

          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-background overflow-hidden">
          <div className="px-12 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
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

          <div className="flex justify-center gap-6 px-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden">
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
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
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
                Запазете своя час онлайн или ни се обадете. Боби и Маги ще се погрижат за всичко останало.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 items-start md:items-end"
            >
              <a
                href="https://www.fresha.com/book-now/brilare-eood-mtqavppl/all-offer?pId=1013517"
                target="_blank"
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
        <section id="team" className="py-32 px-12 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="font-headline text-5xl text-on-surface mb-6">Нашият екип</h2>
              <p className="font-body text-secondary max-w-xl mx-auto">
                Ние сме Боби и Маги – екип с над 25 години професионален опит. Индивидуален подход, модерни техники и атмосфера на лукс.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, i) => (
                <div key={i} className="group">
                  <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      src={member.img}
                      alt={member.name}
                    />
                    <div className="absolute inset-0 border-[10px] border-primary/0 group-hover:border-primary/10 transition-all duration-500"></div>
                  </div>
                  <h4 className="font-headline text-2xl text-on-surface">{member.name}</h4>
                  <p className="font-label text-primary uppercase tracking-widest text-xs mb-4">{member.role}</p>
                  <p className="font-body text-secondary text-sm">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Contact */}
        <section className="grid grid-cols-1 md:grid-cols-2 bg-[#0A0A0A] border-t border-outline-variant/20">
          <div className="p-12 md:p-24 flex flex-col justify-center">
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
          </div>
          <div className="h-[400px] md:h-auto w-full grayscale contrast-125 opacity-70">
            <img
              className="w-full h-full object-cover"
              src="https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg"
              alt="Brillare by BM — Подстригване и стайлинг"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
