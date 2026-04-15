import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="relative pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
        <header className="mb-20 text-center md:text-left">
          <div className="font-technical text-primary text-sm mb-4 tracking-widest uppercase">
            Legal Documentation / Юридическа документация
          </div>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-6 leading-tight">
            Политика за поверителност
          </h1>
          <div className="w-24 h-0.5 bg-primary-container mb-8"></div>
          <p className="font-body text-secondary-fixed-dim text-lg italic">Последна актуализация: 24 Май 2024</p>
        </header>

        <section className="legal-content">
          <p>
            В Brillare by BM се ангажираме да защитаваме вашата поверителност. Тази политика описва как събираме, използваме и съхраняваме вашата информация при използване на нашите услуги.
          </p>

          <h2>1. Събиране на информация</h2>
          <p>
            Ние събираме информация, която ни предоставяте директно при резервация на час или регистрация в нашето студио. Това включва Вашето име, телефонен номер и адрес на електронна поща. Също така можем да събираме технически данни за Вашето посещение на нашия уебсайт чрез бисквитки.
          </p>

          <div className="my-8 bg-surface-container-low p-8 rounded-[2px] border-l-2 border-primary-container">
            <span className="font-technical text-primary text-xs block mb-4">ТЕХНИЧЕСКИ СПЕЦИФИКАЦИИ</span>
            <p className="text-sm opacity-80 mb-0 italic font-body">
              Всички лични данни се криптират по стандарта AES-256 и се съхраняват на защитени сървъри в рамките на ЕС.
            </p>
          </div>

          <h2>2. Използване на данни</h2>
          <p>
            Вашите данни се използват единствено за управление на Вашите резервации, подобряване на качеството на нашите услуги и изпращане на важни известия относно Вашия престой в ателието. Ние не продаваме Вашите лични данни на трети страни.
          </p>

          <h2>3. Вашите права (GDPR)</h2>
          <p>Съгласно Общия регламент относно защитата на данните, Вие имате право на:</p>
          <ul className="list-none space-y-4 mb-8">
            {[
              'Достъп до Вашите лични данни;',
              'Коригиране на неточна информация;',
              'Изтриване на Вашите данни ("правото да бъдеш забравен");',
              'Преносимост на данните.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                <span className="font-body text-on-surface">{item}</span>
              </li>
            ))}
          </ul>

          <h2>4. Сигурност</h2>
          <p>
            Прилагаме строги административни, технически и физически мерки за сигурност, предназначени да защитят личната информация, която съхраняваме, от случайно, незаконно или неразрешено унищожаване, загуба, промяна, достъп, разкриване или използване.
          </p>

          <h2>5. Контакт</h2>
          <p>
            Ако имате въпроси относно нашата политика за поверителност или искате да упражните правата си, моля, свържете се с нашето длъжностно лице по защита на данните на адрес: bmhairstdio19@gmail.com
          </p>
        </section>

        <div className="mt-20 pt-10 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-technical text-secondary text-xs uppercase tracking-widest">© 2024 Brillare by BM</p>
          <div className="flex gap-8">
            <Link className="font-label text-[0.7rem] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity" to="#">Terms of Service</Link>
            <Link className="font-label text-[0.7rem] uppercase tracking-widest text-primary hover:opacity-70 transition-opacity" to="/contact">Contact Us</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
