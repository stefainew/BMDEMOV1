import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UPDATED = '20 Април 2026'

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-14">
    <h2 className="cormorant-display text-2xl md:text-3xl text-[#EDE8DF] mb-5 pb-3 border-b border-[#2A2A2A]">{title}</h2>
    <div className="space-y-4 text-[#A89F92] text-sm leading-relaxed font-body">
      {children}
    </div>
  </section>
)

const Right = ({ icon, title, children }) => (
  <div className="flex gap-4 p-5 bg-[#0E0E0E] border border-[#2A2A2A]">
    <span className="material-symbols-outlined text-[#C9A84C] text-lg shrink-0 mt-0.5">{icon}</span>
    <div>
      <p className="josefin-nav text-xs text-[#EDE8DF] uppercase tracking-widest mb-1">{title}</p>
      <p className="text-sm text-[#8A8070]">{children}</p>
    </div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="josefin-nav text-[#C9A84C] text-[10px] tracking-widest uppercase mb-4">Правна информация</p>
          <h1 className="cormorant-display text-5xl md:text-6xl font-bold text-[#EDE8DF] mb-6">
            Политика за поверителност
          </h1>
          <p className="text-[#8A8070] text-sm italic font-body">
            Последна актуализация: {UPDATED} · Важи за: brillarebybm.vercel.app
          </p>
          <div className="mt-8 p-5 bg-[#131313] border-l-4 border-[#C9A84C] text-sm text-[#A89F92] font-body">
            Тази политика е изготвена в съответствие с Регламент (ЕС) 2016/679 (GDPR) и Закона за защита на личните данни (ЗЗЛД) на Република България. Моля, прочетете я внимателно.
          </div>
        </header>

        {/* TOC */}
        <nav className="mb-16 p-6 bg-[#131313] rounded-sm">
          <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-4">Съдържание</p>
          <ol className="space-y-2 text-sm text-[#8A8070] josefin-nav">
            {[
              ['#admin', '1. Администратор на лични данни'],
              ['#basis', '2. Правно основание и цели на обработване'],
              ['#data', '3. Какви данни събираме'],
              ['#retention', '4. Срокове на съхранение'],
              ['#processors', '5. Получатели и обработватели'],
              ['#transfers', '6. Международни предавания'],
              ['#rights', '7. Вашите права'],
              ['#cookies', '8. Бисквитки и Google услуги'],
              ['#contact', '9. Как да се свържете с нас'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-[#C9A84C] transition-colors">{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1. Администратор */}
        <Section id="admin" title="1. Администратор на лични данни">
          <p>
            Администратор на личните Ви данни е:
          </p>
          <div className="p-5 bg-[#131313] border border-[#2A2A2A] font-mono text-xs space-y-2 text-[#EDE8DF]">
            <p><span className="text-[#C9A84C]">Наименование:</span> [ИМЕ НА ФИРМА / ФИЗИЧЕСКО ЛИЦЕ] <span className="text-[#4A4540]">← попълва се</span></p>
            <p><span className="text-[#C9A84C]">ЕИК / ЕГН:</span> [XXXXXXXXX] <span className="text-[#4A4540]">← попълва се</span></p>
            <p><span className="text-[#C9A84C]">Адрес:</span> [УЛ., ГРАД, ПОЩЕНСКИ КОД] <span className="text-[#4A4540]">← попълва се</span></p>
            <p><span className="text-[#C9A84C]">Телефон:</span> +359 897 975 527</p>
            <p><span className="text-[#C9A84C]">Имейл:</span> bmhairstdio19@gmail.com</p>
            <p><span className="text-[#C9A84C]">Уебсайт:</span> brillarebybm.vercel.app</p>
          </div>
          <p className="text-xs italic text-[#5A5550]">
            Забележка: Полетата в скоби са mock данни и трябва да се попълнят с реалните данни на юридическото или физическото лице, което стопанисва Brillare by BM.
          </p>
        </Section>

        {/* 2. Правно основание */}
        <Section id="basis" title="2. Правно основание и цели на обработване">
          <p>Обработваме Вашите лични данни само при наличие на надлежно правно основание. По-долу са описани целите и съответните основания:</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#131313]">
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Цел</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Правно основание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Управление на резервация (час, услуга, майстор)', 'Чл. 6, ал. 1, б. „б" GDPR — изпълнение на договор'],
                  ['Връзка с Вас при промяна/отмяна на час', 'Чл. 6, ал. 1, б. „б" GDPR — изпълнение на договор'],
                  ['Обработка на запитвания (контактна форма)', 'Чл. 6, ал. 1, б. „б" GDPR — преддоговорни отношения'],
                  ['Изпращане на напомняния за час (SMS/имейл)', 'Чл. 6, ал. 1, б. „б" GDPR — изпълнение на договор'],
                  ['История на посещенията (вътрешна CRM база)', 'Чл. 6, ал. 1, б. „е" GDPR — легитимен интерес на администратора'],
                  ['Счетоводни и данъчни задължения', 'Чл. 6, ал. 1, б. „в" GDPR — правно задължение (ЗДДС, ЗСч)'],
                ].map(([goal, basis], i) => (
                  <tr key={i} className="border border-[#2A2A2A] hover:bg-[#131313] transition-colors">
                    <td className="p-3 text-[#A89F92]">{goal}</td>
                    <td className="p-3 text-[#8A8070]">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Когато обработването се основава на легитимен интерес (чл. 6, ал. 1, б. „е"), сме извършили балансов тест и сме преценили, че интересите ни не надвишават Вашите основни права и свободи. Имате право да възразите срещу такова обработване — вижте Раздел 7.
          </p>
        </Section>

        {/* 3. Данни */}
        <Section id="data" title="3. Какви данни събираме">
          <p>Събираме следните категории лични данни:</p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {[
              { label: 'При резервация', items: ['Три имена (или само собствено)', 'Телефонен номер (задължителен)', 'Имейл адрес (по избор)'] },
              { label: 'При контактна форма', items: ['Три имена', 'Телефон и/или имейл', 'Текст на запитването'] },
              { label: 'Технически данни', items: ['IP адрес (чрез Supabase)', 'Дата и час на заявката', 'Браузър / устройство (HTTP заглавки)'] },
              { label: 'НЕ събираме', items: ['Здравни данни', 'Данни за плащане', 'Биометрични данни', 'Данни за деца под 16 г.'] },
            ].map(({ label, items }) => (
              <div key={label} className="p-4 bg-[#131313] border border-[#2A2A2A]">
                <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-3">{label}</p>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#8A8070]">
                      <span className="text-[#C9A84C] mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p>
            Данните се предоставят директно от Вас. Не събираме данни от трети страни. Предоставянето на телефонен номер е задължително условие за извършване на резервация — без него не можем да потвърдим или напомним за часа.
          </p>
        </Section>

        {/* 4. Срокове */}
        <Section id="retention" title="4. Срокове на съхранение">
          <p>
            Съхраняваме личните Ви данни само толкова дълго, колкото е необходимо за постигане на целите, за които са събрани, или колкото изисква приложимото законодателство:
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#131313]">
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Категория данни</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Срок</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Основание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Данни за резервации', '5 години след последното посещение', 'Чл. 12 ЗДДС — данъчно задължение'],
                  ['Профил на клиент (CRM)', '3 години след последна активност', 'Легитимен интерес'],
                  ['Запитвания от контактна форма', '1 година от получаването', 'Легитимен интерес'],
                  ['Технически логове (IP)', '90 дни', 'Сигурност на системата'],
                ].map(([cat, period, reason], i) => (
                  <tr key={i} className="border border-[#2A2A2A] hover:bg-[#131313] transition-colors">
                    <td className="p-3 text-[#A89F92]">{cat}</td>
                    <td className="p-3 text-[#EDE8DF] font-mono">{period}</td>
                    <td className="p-3 text-[#8A8070]">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            След изтичане на приложимия срок данните се изтриват автоматично или се анонимизират по начин, при който идентификацията Ви е невъзможна.
          </p>
        </Section>

        {/* 5. Получатели */}
        <Section id="processors" title="5. Получатели и обработватели">
          <p>
            Не продаваме и не предоставяме Вашите данни на трети страни за маркетингови цели. Данните Ви се обработват от следните доверени обработватели, с които имаме сключени Споразумения за обработване на данни (DPA):
          </p>
          <div className="space-y-3 mt-4">
            {[
              {
                name: 'Supabase Inc.',
                role: 'Хостинг на база данни и инфраструктура',
                location: 'AWS eu-central-1 (Германия, ЕС)',
                link: 'https://supabase.com/privacy',
              },
              {
                name: 'Vercel Inc.',
                role: 'Хостинг на уебсайта',
                location: 'ЕС / САЩ (чрез SCC)',
                link: 'https://vercel.com/legal/privacy-policy',
              },
              {
                name: 'Google LLC',
                role: 'Google Fonts (шрифтове) · Material Symbols (икони)',
                location: 'САЩ (чрез SCC и SCCs)',
                link: 'https://policies.google.com/privacy',
              },
            ].map(p => (
              <div key={p.name} className="p-4 bg-[#131313] border border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-1">
                  <p className="josefin-nav text-xs text-[#EDE8DF] mb-1">{p.name}</p>
                  <p className="text-xs text-[#8A8070]">{p.role}</p>
                  <p className="text-xs text-[#5A5550] font-mono mt-1">📍 {p.location}</p>
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[10px] josefin-nav text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1 hover:bg-[#C9A84C]/10 transition-colors shrink-0">
                  Политика →
                </a>
              </div>
            ))}
          </div>
        </Section>

        {/* 6. Международни предавания */}
        <Section id="transfers" title="6. Международни предавания на данни">
          <p>
            Някои от нашите обработватели (Vercel, Google) са базирани в САЩ. Предаването на данни към тях се осъществява при наличие на подходящи гаранции съгласно чл. 46 GDPR — Стандартни договорни клаузи (SCC), приети от Европейската комисия с Решение 2021/914/ЕС.
          </p>
          <p>
            Supabase съхранява данни в региона <strong className="text-[#EDE8DF]">eu-central-1 (Германия)</strong> — в рамките на ЕИП, без необходимост от допълнителни механизми за предаване.
          </p>
          <p>
            При поискване можете да получите копие от приложимите SCC клаузи, като се свържете с нас на имейла в Раздел 9.
          </p>
        </Section>

        {/* 7. Права */}
        <Section id="rights" title="7. Вашите права">
          <p>
            Съгласно GDPR и ЗЗЛД имате следните права по отношение на личните Ви данни:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <Right icon="visibility" title="Право на достъп (Чл. 15 GDPR)">
              Можете да поискате потвърждение дали обработваме Вашите данни и копие от тях.
            </Right>
            <Right icon="edit" title="Право на коригиране (Чл. 16 GDPR)">
              Можете да поискате корекция на неточни или непълни данни.
            </Right>
            <Right icon="delete" title="Право на изтриване (Чл. 17 GDPR)">
              Можете да поискате изтриване на данните, когато не са необходими за целите, за които са събрани.
            </Right>
            <Right icon="block" title="Право на ограничаване (Чл. 18 GDPR)">
              Можете да поискате ограничаване на обработването в определени случаи.
            </Right>
            <Right icon="sync_alt" title="Право на преносимост (Чл. 20 GDPR)">
              Можете да получите данните в структуриран, машинно четим формат.
            </Right>
            <Right icon="do_not_disturb_on" title="Право на възражение (Чл. 21 GDPR)">
              Можете да възразите срещу обработване въз основа на легитимен интерес.
            </Right>
          </div>
          <div className="mt-6 p-5 bg-[#131313] border border-[#C9A84C]/20">
            <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-3">Право на жалба до КЗЛД</p>
            <p className="text-sm text-[#8A8070]">
              Ако считате, че обработването на данните Ви нарушава GDPR, имате право да подадете жалба до надзорния орган:
            </p>
            <div className="mt-3 font-mono text-xs text-[#A89F92] space-y-1">
              <p>Комисия за защита на личните данни (КЗЛД)</p>
              <p>бул. „Проф. Цветан Лазаров" № 2, гр. София 1592</p>
              <p>Тел.: +359 2 91 53 518</p>
              <p>
                <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">www.cpdp.bg</a>
                {' · '}
                <a href="mailto:kzld@cpdp.bg" className="text-[#C9A84C] hover:underline">kzld@cpdp.bg</a>
              </p>
            </div>
          </div>
          <p>
            Молбите за упражняване на права се разглеждат в срок до <strong className="text-[#EDE8DF]">30 дни</strong> от получаването им (с възможност за удължаване до 3 месеца при сложност). Отговаряме безплатно, освен при явно неоснователни или прекомерни искания.
          </p>
        </Section>

        {/* 8. Бисквитки */}
        <Section id="cookies" title="8. Бисквитки и Google услуги">
          <p>
            Нашият уебсайт използва бисквитки (cookies) и зарежда ресурси от Google. По-долу е описано подробно каква информация се предава и на какво основание:
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#131313]">
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Бисквитка / Услуга</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Цел</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Основание</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Трети страни</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['bm-cookie-consent', 'Съхранява Вашия избор за бисквитки', 'Легитимен интерес (функционална)', 'Няма'],
                  ['sb-* (Supabase session)', 'Сесия за резервация и admin панел', 'Изпълнение на договор', 'Supabase Inc.'],
                  ['Google Fonts (fonts.googleapis.com)', 'Зарежда декоративни шрифтове — Cormorant, Josefin Sans, Lora, DM Mono, Jost', 'Съгласие', 'Google LLC (САЩ)'],
                  ['Material Symbols (fonts.googleapis.com)', 'Зарежда иконографски шрифт (UI икони)', 'Легитимен интерес (UI функционалност)', 'Google LLC (САЩ)'],
                ].map(([name, purpose, basis, third], i) => (
                  <tr key={i} className="border border-[#2A2A2A] hover:bg-[#131313] transition-colors">
                    <td className="p-3 font-mono text-[#EDE8DF]">{name}</td>
                    <td className="p-3 text-[#A89F92]">{purpose}</td>
                    <td className="p-3 text-[#8A8070]">{basis}</td>
                    <td className="p-3 text-[#8A8070]">{third}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            При зареждане на Google Fonts Вашият IP адрес се предава на сървъри на Google LLC в САЩ. Тази услуга е необходима за коректното визуализиране на шрифтовете на сайта. Можете да изтеглите шрифтовете локално, за да избегнете тази передача — моля, свържете се с нас.
          </p>
          <p>
            Не използваме Google Analytics, Facebook Pixel или друг рекламен тракинг. Не показваме персонализирана реклама.
          </p>

          <div className="mt-4 p-4 bg-[#131313] border border-[#2A2A2A] text-xs text-[#8A8070]">
            <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-2">Оттегляне на съгласие</p>
            <p>
              Можете да изтриете бисквитката <span className="font-mono text-[#EDE8DF]">bm-cookie-consent</span> от настройките на браузъра си по всяко време. При следващо посещение ще Ви бъде показан отново банерът за бисквитки.
            </p>
          </div>
        </Section>

        {/* 9. Контакт */}
        <Section id="contact" title="9. Как да се свържете с нас">
          <p>
            За всички въпроси, свързани с личните Ви данни, или за упражняване на правата Ви, можете да се обърнете към нас по следните начини:
          </p>
          <div className="p-5 bg-[#131313] border border-[#2A2A2A] font-mono text-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#C9A84C] text-base">mail</span>
              <a href="mailto:bmhairstdio19@gmail.com" className="text-[#C9A84C] hover:underline">bmhairstdio19@gmail.com</a>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#C9A84C] text-base">phone</span>
              <a href="tel:+359897975527" className="text-[#EDE8DF] hover:underline">+359 897 975 527</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#C9A84C] text-base">location_on</span>
              <span className="text-[#8A8070]">[АДРЕС НА САЛОНА] <span className="text-[#4A4540]">← попълва се</span></span>
            </div>
          </div>
          <p>
            Отговаряме на запитвания в рамките на <strong className="text-[#EDE8DF]">5 работни дни</strong>. За упражняване на права по GDPR — в рамките на 30 дни.
          </p>
        </Section>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="josefin-nav text-[10px] text-[#4A4540] uppercase tracking-widest">© 2026 Brillare by BM · Всички права запазени</p>
          <div className="flex gap-6">
            <Link className="josefin-nav text-[10px] text-[#8A8070] hover:text-[#C9A84C] uppercase tracking-widest transition-colors" to="/terms">Общи условия</Link>
            <Link className="josefin-nav text-[10px] text-[#8A8070] hover:text-[#C9A84C] uppercase tracking-widest transition-colors" to="/contact">Контакти</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
