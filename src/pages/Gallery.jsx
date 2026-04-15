import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── DATA ─────────────────────────────────────────────── */
const categories = ['Всички', 'Боядисване', 'Кичури и Балеаж', 'Екстеншъни', 'Подстригване', 'Официални', 'Терапии']

const items = [
  {
    id: 1,
    category: 'Кичури и Балеаж',
    label: 'Кичури и Балеаж',
    desc: 'Ръчно нанесено балеаж осветляване',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg',
    span: 'wide',
  },
  {
    id: 2,
    category: 'Боядисване',
    label: 'Боядисване',
    desc: 'Пълно боядисване с премиум продукти',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg',
    span: 'narrow',
  },
  {
    id: 3,
    category: 'Официални',
    label: 'Официална прическа',
    desc: 'Сватбена прическа — прецизност в детайла',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
    span: 'narrow',
  },
  {
    id: 4,
    category: 'Екстеншъни',
    label: 'Екстеншъни',
    desc: 'Премиум удължаване — естествен вид',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-extensions-premium-sofia-1-705x705.jpg',
    span: 'wide',
  },
  {
    id: 5,
    category: 'Подстригване',
    label: 'Подстригване и стайлинг',
    desc: 'Прецизна форма и индивидуална консултация',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
    span: 'half',
  },
  {
    id: 6,
    category: 'Терапии',
    label: 'Премиум терапия',
    desc: 'Дълбока реконструкция и блясък',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/premium-hair-treatment-sofia-705x705.jpg',
    span: 'half',
  },
]

/* ─── FILM PERFORATIONS ─────────────────────────────────── */
function FilmStrip({ light = false }) {
  const bg = light ? '#F5F0E8' : '#0A0A0A'
  const hole = light ? 'rgba(26,26,24,0.12)' : 'rgba(201,168,76,0.15)'
  return (
    <div
      style={{
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 20px',
        overflowX: 'hidden',
      }}
    >
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: '18px',
            height: '12px',
            borderRadius: '2px',
            border: `1px solid ${hole}`,
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

/* ─── GALLERY ITEM ──────────────────────────────────────── */
function GalleryItem({ item, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden"
      style={{
        gridColumn: item.span === 'wide' ? 'span 8' : item.span === 'narrow' ? 'span 4' : 'span 6',
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: item.span === 'half' ? '4/3' : '3/4' }}>
        <img
          src={item.img}
          alt={item.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(80%) brightness(0.75)',
            transform: 'scale(1)',
            transition: 'filter 0.6s ease, transform 0.7s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = 'grayscale(80%) brightness(0.75)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />

        {/* Caption overlay — slides up on hover */}
        <div
          className="group"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 55%)',
            opacity: 0,
            transition: 'opacity 0.45s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.5rem',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              color: '#C9A84C',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
              display: 'block',
            }}
          >
            {item.category}
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.4rem',
              color: '#F5F0E8',
              fontWeight: 600,
              lineHeight: 1.1,
              display: 'block',
              marginBottom: '0.3rem',
            }}
          >
            {item.label}
          </span>
          <span
            style={{
              fontFamily: "'Lora', serif",
              fontSize: '0.75rem',
              color: '#8A8070',
              fontStyle: 'italic',
            }}
          >
            {item.desc}
          </span>
        </div>

        {/* Item number */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.55rem',
            color: 'rgba(201,168,76,0.6)',
            letterSpacing: '0.15em',
          }}
        >
          {String(item.id).padStart(2, '0')}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Gallery() {
  const [active, setActive] = useState('Всички')

  const filtered = active === 'Всички' ? items : items.filter(i => i.category === active)

  const getCount = (cat) =>
    cat === 'Всички' ? items.length : items.filter(i => i.category === cat).length

  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#EDE8DF' }}>
      <div className="grain-overlay" />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A', paddingTop: '130px', paddingBottom: '5rem' }}
      >
        {/* Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-0.05em',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(9rem, 20vw, 20rem)',
            fontWeight: 700,
            color: 'rgba(201,168,76,0.035)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ГАЛЕРИЯ
        </div>

        <div className="max-w-7xl mx-auto px-8 md:px-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: '1.5rem',
                }}
              >
                Brillare by BM — Нашата работа
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(4rem, 8vw, 9rem)',
                  fontWeight: 700,
                  lineHeight: 0.88,
                  color: '#EDE8DF',
                }}
              >
                Всяка<br />
                <em style={{ fontWeight: 300 }}>трансформация</em><br />
                разказва история.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ textAlign: 'right', flexShrink: 0 }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                  fontWeight: 700,
                  color: 'rgba(201,168,76,0.3)',
                  lineHeight: 1,
                }}
              >
                {String(items.length).padStart(2, '0')}
              </div>
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#8A8070',
                }}
              >
                Проекта
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Film strip */}
      <FilmStrip />

      {/* ── FILTER + GRID ────────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A', paddingBottom: '6rem' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-20">

          {/* Filter bar */}
          <div
            className="flex flex-wrap gap-x-8 gap-y-3 py-8 mb-12"
            style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
          >
            {categories.map((cat) => {
              const isActive = active === cat
              const count = getCount(cat)
              return (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: '0.62rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: isActive ? '#C9A84C' : '#8A8070',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem 0',
                    borderBottom: isActive ? '1px solid #C9A84C' : '1px solid transparent',
                    transition: 'color 0.25s, border-color 0.25s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#EDE8DF' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#8A8070' }}
                >
                  {cat}
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.5rem',
                      color: isActive ? '#C9A84C' : 'rgba(138,128,112,0.5)',
                    }}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>

          {/* Editorial grid */}
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1rem',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <GalleryItem key={item.id} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 0',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                color: 'rgba(138,128,112,0.4)',
                fontStyle: 'italic',
              }}
            >
              Няма резултати.
            </div>
          )}
        </div>
      </section>

      {/* Film strip */}
      <FilmStrip light />

      {/* ── INSTAGRAM ────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.62rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: '1.5rem',
                }}
              >
                Последвайте ни
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: '#1A1A18',
                  marginBottom: '1.75rem',
                }}
              >
                Отвъд<br />
                <em style={{ fontWeight: 300 }}>огледалото.</em>
              </h2>
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  color: '#5C5448',
                  lineHeight: 1.8,
                  fontSize: '0.97rem',
                  maxWidth: '380px',
                  marginBottom: '2.5rem',
                }}
              >
                За ежедневна доза вдъхновение, процеси "зад кулисите" и най-новите ни творби — присъединете се към нашата общност в Instagram.
              </p>
              <a
                href="https://www.instagram.com/brillare_by_bm"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.65rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  backgroundColor: '#1A1A18',
                  padding: '1rem 2.5rem',
                  fontWeight: 700,
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                @brillare_by_bm
              </a>
            </motion.div>

            {/* Image duo — staggered */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative"
              style={{ minHeight: '420px' }}
            >
              <img
                src="https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg"
                alt="Instagram 1"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '65%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  filter: 'contrast(1.05)',
                }}
              />
              <img
                src="https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg"
                alt="Instagram 2"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '55%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  border: '5px solid #F5F0E8',
                  filter: 'contrast(1.05)',
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: -16,
                  width: '65%',
                  height: '50%',
                  border: '1px solid rgba(201,168,76,0.35)',
                  zIndex: 0,
                }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F0E8' }}>
        <div
          style={{ borderTop: '1px solid rgba(26,26,24,0.08)' }}
          className="max-w-7xl mx-auto px-8 md:px-20 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 700,
              lineHeight: 0.92,
              color: '#1A1A18',
            }}
          >
            Готови за<br />
            <em style={{ fontWeight: 300 }}>вашата трансформация?</em>
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
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
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Запази час онлайн
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
