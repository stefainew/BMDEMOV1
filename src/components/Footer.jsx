import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] w-full py-20 px-12 border-t border-[#2A2A2A]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/">
            <img src="/new_logo.png" alt="Боби Ярчев" className="h-10 w-auto mb-4" />
          </Link>
          <p className="font-['Lora'] text-sm leading-relaxed text-[#8A8070]">
            Майстор фризьор с 25+ години опит. Прецизност, стил и индивидуален подход — за всяка коса.
          </p>
          <div className="mt-6 space-y-2">
            <p className="font-['Lora'] text-sm text-[#8A8070]">бул. България 60А, София</p>
            <a href="tel:+359897975527" className="font-['DM_Mono'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors block">+359 897 975 527</a>
            <a href="mailto:byarchev@gmail.com" className="font-['Lora'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors block">byarchev@gmail.com</a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-4">
          <h5 className="font-['Josefin_Sans'] text-on-surface uppercase tracking-widest text-xs">Навигация</h5>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/">Начало</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/about">За Боби</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/services">Услуги</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/contact">Контакт</Link>
        </div>

        {/* Hours & Legal */}
        <div className="flex flex-col space-y-4">
          <h5 className="font-['Josefin_Sans'] text-on-surface uppercase tracking-widest text-xs">Работно време</h5>
          <p className="font-['DM_Mono'] text-sm text-[#8A8070]">Понеделник – Петък</p>
          <p className="font-['DM_Mono'] text-sm text-[#C9A84C]">10:00 – 19:00</p>
          <p className="font-['DM_Mono'] text-sm text-[#8A8070] mt-2">Събота – Неделя</p>
          <p className="font-['DM_Mono'] text-sm text-[#8A8070]">Почивен ден</p>
          <div className="pt-4 space-y-2">
            <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300 block" to="/privacy">Политика за поверителност</Link>
          </div>
        </div>

        {/* Social & Booking */}
        <div className="flex flex-col space-y-6">
          <h5 className="font-['Josefin_Sans'] text-on-surface uppercase tracking-widest text-xs">Следвайте ме</h5>
          <div className="flex flex-col space-y-3">
            <a
              href="https://www.instagram.com/boby_yarchev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#C9A84C] transition-colors group"
            >
              <svg className="w-4 h-4 shrink-0 group-hover:text-[#C9A84C] transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.facebook.com/yarchev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#C9A84C] transition-colors group"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </a>
            <a
              href="https://www.tiktok.com/@bobi_yarchev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#C9A84C] transition-colors group"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.18 8.18 0 0 0 4.83 1.55V6.28a4.85 4.85 0 0 1-1.06-.41z"/>
              </svg>
              TikTok
            </a>
          </div>
          <a
            href="/booking"
            
            rel="noopener noreferrer"
            className="mt-4 font-['Josefin_Sans'] uppercase tracking-[0.15em] text-[0.75rem] bg-[#C9A84C] text-[#241a00] px-6 py-3 text-center font-bold hover:bg-[#e6c364] transition-colors duration-300 block"
          >
            Запази час онлайн
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row justify-between items-center text-[#8A8070] font-['Lora'] text-[0.7rem] tracking-widest gap-4">
        <div className="uppercase">© 2025 Боби Ярчев. Всички права запазени.</div>
        <div className="flex items-center space-x-6">
          <a className="text-[#8A8070] hover:text-[#C9A84C] transition-colors" href="https://www.instagram.com/boby_yarchev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a className="text-[#8A8070] hover:text-[#C9A84C] transition-colors" href="https://www.facebook.com/yarchev" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a className="text-[#8A8070] hover:text-[#C9A84C] transition-colors" href="https://www.tiktok.com/@bobi_yarchev" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.19a8.18 8.18 0 0 0 4.83 1.55V6.28a4.85 4.85 0 0 1-1.06-.41z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
