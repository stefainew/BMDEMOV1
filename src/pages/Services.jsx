import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  {
    num: '01',
    tag: 'Цвят и Живот',
    title: 'Боядисване',
    desc: 'Трайни, живи цветове с висок клас продукти. Пълна грижа за структурата на косата при всяко боядисване.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg',
    items: [
      { name: 'Цялостно боядисване', desc: 'Равномерно покритие от корен до връхчета' },
      { name: 'Корени', desc: 'Боядисване само на израснала коса' },
      { name: 'Тонировка', desc: 'Тониране за по-жив и наситен цвят' },
    ],
    light: true,
    imgRight: true,
  },
  {
    num: '02',
    tag: 'Светлина и Нюанс',
    title: 'Кичури и Балеаж',
    desc: 'Деликатно осветляване за естествен, слънчев ефект, персонализирано за вашия тип коса и желан резултат.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg',
    items: [
      { name: 'Балеаж', desc: 'Ръчно нанесено осветляване за естествен ефект' },
      { name: 'Кичури', desc: 'Класически или модерни кичури по цялата дължина' },
      { name: 'Омбре', desc: 'Плавен преход от тъмно към светло' },
    ],
    light: false,
    imgRight: false,
  },
  {
    num: '03',
    tag: 'Обем и Дължина',
    title: 'Екстеншъни',
    desc: 'Премиум удължаване и сгъстяване с висококачествена коса. Естествен вид и трайност при правилна грижа.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-extensions-premium-sofia-1-705x705.jpg',
    items: [
      { name: 'Микро-ринг', desc: 'Безнагревна техника без лепило' },
      { name: 'Tape-in', desc: 'Бърза и лесна апликация' },
      { name: 'Кератин', desc: 'С топлинна техника за трайност' },
    ],
    light: true,
    imgRight: true,
  },
  {
    num: '04',
    tag: 'Форма и Стил',
    title: 'Подстригване',
    desc: 'Прецизно подстригване и стайлинг за всеки тип коса. Консултация включена — намираме формата, която е само ваша.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
    items: [
      { name: 'Дамско подстригване', desc: 'С индивидуална консултация за форма' },
      { name: 'Стайлинг и сешоар', desc: 'Оформяне след подстригване' },
      { name: 'Кератинова терапия', desc: 'Изглаждане и блясък за дълго' },
    ],
    light: false,
    imgRight: false,
  },
  {
    num: '05',
    tag: 'Специален Повод',
    title: 'Официални прически',
    desc: 'Сватби, абитуриентски балове и всеки специален момент заслужава перфектна прическа. Всяко движение е прецизно обмислено.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
    items: [
      { name: 'Сватбена прическа', desc: 'Консултация и репетиция включена' },
      { name: 'Абитуриентска прическа', desc: 'Изискан вид за незабравимата вечер' },
      { name: 'Официален повод', desc: 'За всеки момент, който заслужава повече' },
    ],
    light: true,
    imgRight: true,
  },
  {
    num: '06',
    tag: 'Грижа и Възстановяване',
    title: 'Премиум терапии',
    desc: 'Научно обосновани, резултат-ориентирани процедури за здрава, блестяща и силна коса. Грижа от вътре навън.',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/premium-hair-treatment-sofia-705x705.jpg',
    items: [
      { name: 'Ботокс за коса', desc: 'Дълбока реконструкция на структурата' },
      { name: 'Кератинова терапия', desc: 'Изглаждане и премахване на накъдряне' },
      { name: 'Хидратираща маска', desc: 'Интензивна хидратация и блясък' },
      { name: 'Възстановяваща терапия', desc: 'За изтощена или третирана коса' },
    ],
    light: false,
    imgRight: false,
  },
]

/* ─── SERVICE SECTION ───────────────────────────────────── */
function ServiceSection({ s, index }) {
  const bg = s.light ? '#F5F0E8' : '#111110'
  const textPrimary = s.light ? '#1A1A18' : '#EDE8DF'
  const textMuted = s.light ? '#5C5448' : '#8A8070'
  const borderColor = s.light ? 'rgba(26,26,24,0.1)' : 'rgba(237,232,223,0.1)'
  const numWatermark = s.light ? 'rgba(26,26,24,0.04)' : 'rgba(201,168,76,0.06)'

  const imgMotion = s.imgRight
    ? { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } }

  const textMotion = s.imgRight
    ? { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } }
    : { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 } }

  return (
    <section style={{ backgroundColor: bg, position: 'relative', overflow: 'hidden' }}>
      {/* Watermark number */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(10rem, 22vw, 22rem)',
          fontWeight: 700,
          color: numWatermark,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {s.num}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-24 md:py-32">
        <div className={`flex flex-col ${s.imgRight ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-24 items-center`}>

          {/* Text side */}
          <motion.div
            {...textMotion}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#C9A84C',
                  letterSpacing: '0.15em',
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                }}
              >
                {s.tag}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                fontWeight: 700,
                lineHeight: 0.92,
                color: textPrimary,
                marginBottom: '1.5rem',
              }}
            >
              {s.title}
            </h2>

            <p
              style={{
                fontFamily: "'Lora', serif",
                color: textMuted,
                lineHeight: 1.8,
                fontSize: '0.95rem',
                marginBottom: '2.5rem',
                maxWidth: '400px',
                fontStyle: 'italic',
              }}
            >
              {s.desc}
            </p>

            <div style={{ borderTop: `1px solid ${borderColor}` }}>
              {s.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  viewport={{ once: true }}
                  className="flex justify-between items-end py-4"
                  style={{ borderBottom: `1px solid ${borderColor}` }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontSize: '0.65rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: textPrimary,
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '0.8rem',
                        color: textMuted,
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.7rem',
                      color: '#C9A84C',
                      letterSpacing: '0.1em',
                      flexShrink: 0,
                      marginLeft: '1.5rem',
                    }}
                  >
                    по запитване
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image side */}
          <motion.div
            {...imgMotion}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex-1 relative"
            style={{ maxWidth: '480px', width: '100%' }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={s.img}
                alt={s.title}
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  display: 'block',
                  filter: s.light ? 'contrast(1.05)' : 'grayscale(15%) brightness(0.85)',
                }}
              />
              {/* Gold frame offset */}
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  [s.imgRight ? 'right' : 'left']: -20,
                  bottom: -20,
                  [s.imgRight ? 'left' : 'right']: 20,
                  border: '1px solid rgba(201,168,76,0.3)',
                  zIndex: -1,
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Services() {
  return (
    <div style={{ backgroundColor: '#0A0A0A', color: '#EDE8DF' }}>
      <div className="grain-overlay" />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ backgroundColor: '#0A0A0A', minHeight: '60vh', paddingTop: '120px' }}
      >
        {/* Giant background word */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-0.1em',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(8rem, 20vw, 20rem)',
            fontWeight: 700,
            color: 'rgba(201,168,76,0.04)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          УСЛУГИ
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 pb-20 w-full">
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
            Brillare by BM — Услуги и цени
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(3.5rem, 7vw, 8rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              color: '#EDE8DF',
              marginBottom: '2rem',
              maxWidth: '800px',
            }}
          >
            Всяка услуга —
            <br />
            <em style={{ fontWeight: 300 }}>персонализирана</em>
            <br />
            за вас.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              fontFamily: "'Lora', serif",
              color: '#8A8070',
              fontSize: '1rem',
              lineHeight: 1.75,
              maxWidth: '460px',
            }}
          >
            Над 25 години опит в грижата за косата. Индивидуален подход, премиум продукти и резултати, от които ще се влюбите.
          </motion.p>

          {/* Index nav */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {services.map(s => (
              <a
                key={s.num}
                href={`#service-${s.num}`}
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#8A8070',
                  textDecoration: 'none',
                  borderBottom: '1px solid transparent',
                  paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#C9A84C'
                  e.currentTarget.style.borderBottomColor = '#C9A84C'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#8A8070'
                  e.currentTarget.style.borderBottomColor = 'transparent'
                }}
              >
                {s.num} {s.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      {services.map((s, i) => (
        <div key={s.num} id={`service-${s.num}`}>
          <ServiceSection s={s} index={i} />
        </div>
      ))}

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: '#F5F0E8', minHeight: '380px' }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
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
              Запазете своя час онлайн или се обадете. Боби ще се погрижи за всичко останало.
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
