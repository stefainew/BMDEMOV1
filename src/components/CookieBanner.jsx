import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'bm-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Информация за бисквитки"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-[#131313] border border-[#2A2A2A] shadow-[0_-8px_40px_rgba(0,0,0,0.6)]">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <span className="material-symbols-outlined text-[#C9A84C] text-2xl shrink-0">cookie</span>

          <p className="text-[#8A8070] text-sm font-body leading-relaxed flex-1">
            Използваме само задължителни бисквитки за управление на резервации (Supabase сесия). Шрифтовете на сайта се зареждат от нашия собствен сървър — без предаване на данни към Google.{' '}
            <Link to="/privacy#cookies" className="text-[#C9A84C] hover:underline josefin-nav text-[10px] uppercase tracking-wider">
              Научи повече
            </Link>
          </p>

          <button
            onClick={accept}
            className="shrink-0 px-8 py-3 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[10px] uppercase tracking-widest font-bold hover:brightness-110 active:scale-95 transition-all"
          >
            Разбрах
          </button>
        </div>
      </div>
    </div>
  )
}
