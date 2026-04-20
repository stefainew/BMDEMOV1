import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'bm-cookie-consent'

function injectGoogleFonts() {
  if (document.getElementById('gf-injected')) return
  const fonts = [
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap',
    'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
  ]
  fonts.forEach((href, i) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    if (i === 0) link.id = 'gf-injected'
    document.head.appendChild(link)
  })
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    } else if (consent === 'all') {
      injectGoogleFonts()
    }
  }, [])

  function acceptAll() {
    localStorage.setItem(CONSENT_KEY, 'all')
    injectGoogleFonts()
    setVisible(false)
  }

  function acceptNecessary() {
    localStorage.setItem(CONSENT_KEY, 'necessary')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Настройки за бисквитки"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
    >
      <div className="max-w-3xl mx-auto bg-[#131313] border border-[#2A2A2A] shadow-[0_-8px_40px_rgba(0,0,0,0.6)]">
        {/* Gold accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-5">
            <span className="material-symbols-outlined text-[#C9A84C] text-2xl shrink-0 mt-0.5">cookie</span>
            <div>
              <h2 className="josefin-nav text-sm text-[#EDE8DF] uppercase tracking-widest mb-1">Бисквитки и поверителност</h2>
              <p className="text-[#8A8070] text-sm font-body leading-relaxed">
                Използваме бисквитки, за да осигурим функционирането на сайта. За визуализиране на шрифтовете използваме <strong className="text-[#EDE8DF]">Google Fonts</strong> — при зареждането им Вашият IP адрес се предава на Google LLC (САЩ). Можете да изберете да не разрешите това.
              </p>
            </div>
          </div>

          {/* Detail toggle */}
          {showDetail && (
            <div className="mb-5 p-4 bg-[#0E0E0E] border border-[#2A2A2A] text-xs font-body space-y-3">
              <div className="flex justify-between items-start gap-4 pb-3 border-b border-[#2A2A2A]">
                <div>
                  <p className="josefin-nav text-[10px] text-[#EDE8DF] uppercase tracking-widest mb-1">Задължителни бисквитки</p>
                  <p className="text-[#8A8070]">Сесия за резервация (Supabase). Необходими за работата на сайта.</p>
                </div>
                <span className="josefin-nav text-[10px] text-[#C9A84C] border border-[#C9A84C]/30 px-2 py-1 shrink-0">Винаги активни</span>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="josefin-nav text-[10px] text-[#EDE8DF] uppercase tracking-widest mb-1">Google Fonts (декоративни шрифтове)</p>
                  <p className="text-[#8A8070]">Зарежда Cormorant Garamond, Josefin Sans, Lora, DM Mono, Jost от сървъри на Google LLC, САЩ. При отказ шрифтовете ще бъдат заменени с системни алтернативи.</p>
                </div>
                <span className="josefin-nav text-[10px] text-[#8A8070] border border-[#2A2A2A] px-2 py-1 shrink-0">По избор</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDetail(v => !v)}
                className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest hover:text-[#EDE8DF] transition-colors"
              >
                {showDetail ? 'Скрий детайли' : 'Детайли'}
              </button>
              <Link
                to="/privacy#cookies"
                className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest hover:text-[#EDE8DF] transition-colors"
              >
                Политика за поверителност
              </Link>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={acceptNecessary}
                className="flex-1 sm:flex-none px-5 py-3 border border-[#2A2A2A] josefin-nav text-[10px] uppercase tracking-widest text-[#8A8070] hover:border-[#4A4540] hover:text-[#EDE8DF] transition-all"
              >
                Само задължителни
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-8 py-3 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[10px] uppercase tracking-widest font-bold hover:brightness-110 active:scale-95 transition-all"
              >
                Приемам всички
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
