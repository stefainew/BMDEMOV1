import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Начало', to: '/' },
  { label: 'За Боби', to: '/about' },
  { label: 'Услуги', to: '/services' },
  { label: 'Контакт', to: '/contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  const isActive = (to) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="bg-transparent backdrop-blur-md dark:bg-black/80 fixed top-0 w-full z-50 flex justify-between items-center px-12 py-6">
      <Link to="/">
        <img src="/logo.jpg" alt="Боби Ярчев" className="h-10 w-auto" />
      </Link>
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
      <a
        href="/booking"
        
        rel="noopener noreferrer"
        className="font-['Josefin_Sans'] uppercase tracking-[0.15em] text-[0.75rem] bg-[#C9A84C] text-[#241a00] px-6 py-2.5 rounded-[2px] font-bold hover:bg-[#e6c364] transition-colors duration-300"
      >
        Запази час
      </a>
    </nav>
  )
}
