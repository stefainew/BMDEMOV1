import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] w-full py-20 px-12 border-t border-[#2A2A2A]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/">
            <img src="/Bobi_logo.png" alt="Brillare by BM" className="h-10 w-auto mb-4" />
          </Link>
          <p className="font-['Lora'] text-sm leading-relaxed text-[#8A8070]">
            Фризьорски салон с 25+ години опит в сърцето на София. Вашата красота е моята страст.
          </p>
          <div className="mt-6 space-y-2">
            <p className="font-['Lora'] text-sm text-[#8A8070]">бул. България 60А, София</p>
            <a href="tel:+359897975527" className="font-['DM_Mono'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors block">+359 897 975 527</a>
            <a href="mailto:bmhairstdio19@gmail.com" className="font-['Lora'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors block">bmhairstdio19@gmail.com</a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col space-y-4">
          <h5 className="font-['Josefin_Sans'] text-on-surface uppercase tracking-widest text-xs">Навигация</h5>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/">Начало</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/about">За нас</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/services">Услуги</Link>
          <Link className="font-['Lora'] text-sm leading-relaxed text-[#8A8070] hover:text-[#EDE8DF] transition-colors duration-300" to="/gallery">Галерия</Link>
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
              href="https://www.facebook.com/brillarebybm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/brillare_by_bm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@brillare_by_bm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-['Lora'] text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors"
            >
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
        <div className="uppercase">© 2024 Brillare by BM. Всички права запазени.</div>
        <div className="flex space-x-8 uppercase">
          <a className="hover:text-primary transition-colors" href="https://www.instagram.com/brillare_by_bm" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="hover:text-primary transition-colors" href="https://www.facebook.com/brillarebybm" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a className="hover:text-primary transition-colors" href="https://www.tiktok.com/@brillare_by_bm" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>
      </div>
    </footer>
  )
}
