import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Начало',   to: '/',        num: '01' },
  { label: 'За нас',   to: '/about',   num: '02' },
  { label: 'Услуги',   to: '/services', num: '03' },
  { label: 'Галерия',  to: '/gallery', num: '04' },
  { label: 'Контакт',  to: '/contact', num: '05' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (to) => to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <>
      {/* ─── NAVBAR BAR ─────────────────────────────────────────── */}
      <nav className="bg-transparent backdrop-blur-md dark:bg-black/80 fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 md:py-6">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="Brillare by BM" className="h-10 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-['Josefin_Sans'] uppercase tracking-[0.15em] text-[0.75rem] transition-colors ${
                isActive(link.to)
                  ? 'text-[#C9A84C] font-bold border-b border-[#C9A84C] pb-1'
                  : 'text-[#8A8070] hover:text-[#EDE8DF]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="/booking"
            rel="noopener noreferrer"
            className="font-['Josefin_Sans'] uppercase tracking-[0.15em] text-[0.75rem] bg-[#C9A84C] text-[#241a00] px-6 py-2.5 rounded-[2px] font-bold hover:bg-[#e6c364] transition-colors duration-300"
          >
            Запази час
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Затвори меню' : 'Отвори меню'}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] relative z-[101]"
          >
            <span
              className="block w-6 h-[1.5px] bg-[#EDE8DF] transition-all duration-500 origin-center"
              style={open ? { transform: 'translateY(6.5px) rotate(45deg)', background: '#C9A84C' } : {}}
            />
            <span
              className="block w-4 h-[1.5px] bg-[#EDE8DF] transition-all duration-300"
              style={open ? { opacity: 0, transform: 'scaleX(0)' } : {}}
            />
            <span
              className="block w-6 h-[1.5px] bg-[#EDE8DF] transition-all duration-500 origin-center"
              style={open ? { transform: 'translateY(-6.5px) rotate(-45deg)', background: '#C9A84C' } : {}}
            />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU OVERLAY ──────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[100] md:hidden flex flex-col"
        style={{
          background: '#0A0A0A',
          clipPath: open ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          transition: 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundSize: '128px',
          }}
        />

        {/* Gold vertical accent line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent" />

        {/* Menu items */}
        <div className="flex-1 flex flex-col justify-center pl-14 pr-8 pt-28 pb-8">
          <div className="space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-baseline gap-4 py-3 border-b border-[#1C1C1C] last:border-0"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateX(0)' : 'translateX(-24px)',
                  transition: `opacity 0.5s ease ${0.15 + i * 0.07}s, transform 0.5s ease ${0.15 + i * 0.07}s`,
                }}
              >
                {/* Number */}
                <span
                  className="font-mono text-[0.55rem] tracking-[0.25em] shrink-0 transition-colors duration-300"
                  style={{ color: isActive(link.to) ? '#C9A84C' : '#3A3530' }}
                >
                  {link.num}
                </span>

                {/* Label */}
                <span
                  className="font-['Cormorant_Garamond'] text-[2.8rem] font-light italic leading-none transition-colors duration-300"
                  style={{ color: isActive(link.to) ? '#C9A84C' : '#EDE8DF' }}
                >
                  {link.label}
                </span>

                {/* Arrow that appears on hover */}
                <span
                  className="ml-auto font-mono text-xs text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-8px] group-hover:translate-x-0"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-14 pb-12 pt-6 border-t border-[#1C1C1C] flex items-center justify-between"
          style={{
            opacity: open ? 1 : 0,
            transition: `opacity 0.5s ease ${0.15 + navLinks.length * 0.07}s`,
          }}
        >
          <a
            href="tel:+359897975527"
            className="font-mono text-xs text-[#8A8070] tracking-widest hover:text-[#C9A84C] transition-colors"
          >
            +359 897 975 527
          </a>
          <a
            href="/booking"
            className="font-['Josefin_Sans'] uppercase tracking-[0.2em] text-[0.65rem] font-bold bg-[#C9A84C] text-[#0A0A0A] px-6 py-3"
          >
            Запази час
          </a>
        </div>
      </div>
    </>
  )
}
