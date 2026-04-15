import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const values = [
  {
    num: '01',
    code: 'PERSONAL',
    title: 'Индивидуален подход',
    desc: 'Всяка коса е различна и заслужава специално отношение. Консултираме се с вас, за да намерим идеалното решение.',
  },
  {
    num: '02',
    code: 'QUALITY',
    title: 'Премиум продукти',
    desc: 'Работим само с висок клас марки. Вашата коса получава грижата, която заслужава, с безопасни и ефективни формули.',
  },
  {
    num: '03',
    code: 'MASTERY',
    title: 'Опит и занаят',
    desc: '25+ години опит, работа по филми, реклами и ТВ продукции. Боби и Маги са истински майстори на своята работа.',
  },
]

const timeline = [
  {
    year: '1999',
    title: 'Началото',
    body: 'Боби и Маги започват своя път с любов към занаята и мечта да създават не просто прически, а цели изживявания. Первите стъпки — в малко ателие, но с голяма визия.',
  },
  {
    year: '2010',
    title: 'Екранът и подиумът',
    body: 'Работа по филмови продукции, рекламни кампании и ТВ предавания. Опитът зад кадъра научи Боби и Маги на нещо, което рядко се учи в салон — перфекцията под натиск.',
  },
  {
    year: 'ДНЕС',
    title: 'Brillare by BM',
    body: 'Salon на бул. България 60А — пространство, където всяко посещение е ритуал. Над 25 години са превърнати в методология: слушай, консултирай, изпълни перфектно.',
  },
]

export default function About() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#EDE8DF' }}>
      <div className="grain-overlay" />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ backgroundColor: '#0A0A0A', minHeight: '80vh', paddingTop: '130px' }}
      >
        {/* Watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-0.05em',
            right: '-0.05em',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(10rem, 22vw, 22rem)',
            fontWeight: 700,
            color: 'rgba(201,168,76,0.04)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          ЗА НАС
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 pb-24 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
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
                Brillare by BM — За нас
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(4rem, 8vw, 9rem)',
                  fontWeight: 700,
                  lineHeight: 0.88,
                  color: '#EDE8DF',
                  marginBottom: '2rem',
                }}
              >
                Боби<br />
                <em style={{ fontWeight: 300 }}>и</em><br />
                Маги.
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              style={{ paddingBottom: '0.5rem' }}
            >
              <p
                style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: '#8A8070',
                  fontStyle: 'italic',
                  borderLeft: '2px solid #C9A84C',
                  paddingLeft: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                "Brillare by BM е повече от фризьорски салон. Това е пространство, където красотата среща опита и индивидуалният подход е в основата на всяко посещение."
              </p>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: '#C9A84C',
                }}
              >
                25+ ГОДИНИ / СОФИЯ / БУЛ. БЪЛГАРИЯ 60А
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PORTRAIT ─────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-28">
          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Images — overlapping */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative"
              style={{ minHeight: '520px' }}
            >
              {/* Main image */}
              <img
                src="https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg"
                alt="Маги — официална прическа"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '72%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  zIndex: 2,
                  filter: 'contrast(1.05)',
                }}
              />
              {/* Secondary image — bottom left overlap */}
              <img
                src="https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg"
                alt="Боби — стайлинг"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '55%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  zIndex: 3,
                  border: '6px solid #F5F0E8',
                  filter: 'contrast(1.05)',
                }}
              />
              {/* Gold accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 24,
                  right: -16,
                  width: '72%',
                  height: '60%',
                  border: '1px solid rgba(201,168,76,0.35)',
                  zIndex: 1,
                }}
              />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.62rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  marginBottom: '1.5rem',
                }}
              >
                Нашата история
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  color: '#1A1A18',
                  marginBottom: '2rem',
                }}
              >
                Двама майстори.
                <br />
                <em style={{ fontWeight: 300 }}>Един общ език</em>
                <br />
                с косата.
              </h2>
              <div style={{ fontFamily: "'Lora', serif", color: '#5C5448', lineHeight: 1.85, fontSize: '0.98rem' }}>
                <p style={{ marginBottom: '1.25rem' }}>
                  Ние сме Боби и Маги – екип с над 25 години професионален опит в света на красотата. Нашият път започна с любов към занаята и желание да създаваме не просто прически, а цели изживявания.
                </p>
                <p>
                  Работили сме по филми, реклами и ТВ продукции, придобивайки опит, който малко салони могат да предложат. Днес Brillare by BM е синоним на качество, индивидуален подход и модерни техники в сърцето на София.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section style={{ backgroundColor: '#111110' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '5rem',
            }}
          >
            Нашият път
          </motion.p>

          <div style={{ position: 'relative' }}>
            {/* Vertical hairline */}
            <div
              style={{
                position: 'absolute',
                left: '0',
                top: 0,
                bottom: 0,
                width: '1px',
                backgroundColor: 'rgba(201,168,76,0.15)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    gap: '3rem',
                    paddingLeft: '2.5rem',
                    paddingTop: i === 0 ? 0 : '4rem',
                    paddingBottom: '4rem',
                    borderBottom: i < timeline.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Dot on hairline */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-4px',
                      top: i === 0 ? '0.3em' : 'calc(4rem + 0.3em)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#C9A84C',
                      border: '2px solid #111110',
                    }}
                  />

                  {/* Year */}
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 'clamp(3.5rem, 6vw, 7rem)',
                        fontWeight: 400,
                        color: 'rgba(201,168,76,0.25)',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: '0.5rem' }}>
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                        fontWeight: 700,
                        color: '#EDE8DF',
                        marginBottom: '1rem',
                        lineHeight: 1,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '0.97rem',
                        color: '#8A8070',
                        lineHeight: 1.85,
                        maxWidth: '480px',
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY PULL-QUOTE ────────────────────────── */}
      <section style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-5xl mx-auto px-8 md:px-20 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '0.62rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#C9A84C',
                marginBottom: '2.5rem',
              }}
            >
              Нашата философия
            </p>
            <blockquote
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 4.5vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                color: '#1A1A18',
                marginBottom: '2.5rem',
              }}
            >
              "Вашата красота е<br />
              <em style={{ fontWeight: 300 }}>нашата мисия."</em>
            </blockquote>
            <p
              style={{
                fontFamily: "'Lora', serif",
                fontSize: '1rem',
                color: '#5C5448',
                lineHeight: 1.8,
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              Вярваме, че всяко посещение трябва да е изживяване: индивидуален подход, модерни техники и атмосфера на лукс. Нашата цел е да ви помогнем да откриете своя уникален стил.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: '0.62rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '4rem',
            }}
          >
            Нашите ценности
          </motion.p>

          <div className="grid md:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: '2.5rem',
                  borderRight: i < values.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                  borderTop: '2px solid rgba(201,168,76,0)',
                  transition: 'border-top-color 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderTopColor = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.borderTopColor = 'rgba(201,168,76,0)')}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.65rem',
                      color: '#C9A84C',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {v.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: '0.55rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.5)',
                    }}
                  >
                    {v.code}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: '#EDE8DF',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '0.88rem',
                    color: '#8A8070',
                    lineHeight: 1.8,
                  }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY CALLOUT ──────────────────────────────── */}
      <section style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <img
          src="https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg"
          alt="Brillare by BM — галерия"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 700,
              color: '#F5F0E8',
              textAlign: 'center',
              lineHeight: 0.95,
            }}
          >
            Вижте нашата<br />
            <em style={{ fontWeight: 300 }}>работа</em>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/gallery"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '0.65rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#1A1A18',
                backgroundColor: '#C9A84C',
                padding: '1rem 2.5rem',
                fontWeight: 700,
                display: 'inline-block',
                textDecoration: 'none',
              }}
            >
              Към Галерията →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#F5F0E8' }}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-20 py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
                fontWeight: 700,
                lineHeight: 0.92,
                color: '#1A1A18',
                marginBottom: '1.25rem',
              }}
            >
              Запознайте се<br />
              <em style={{ fontWeight: 300 }}>с нас лично.</em>
            </h2>
            <p
              style={{
                fontFamily: "'Lora', serif",
                color: '#5C5448',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                maxWidth: '380px',
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

      <Footer />
    </div>
  )
}
