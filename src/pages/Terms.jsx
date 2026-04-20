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

const Rule = ({ icon, title, children }) => (
  <div className="flex gap-4 p-4 bg-[#0E0E0E] border border-[#2A2A2A]">
    <span className="material-symbols-outlined text-[#C9A84C] text-lg shrink-0 mt-0.5">{icon}</span>
    <div>
      <p className="josefin-nav text-[10px] text-[#EDE8DF] uppercase tracking-widest mb-1">{title}</p>
      <p className="text-sm text-[#8A8070]">{children}</p>
    </div>
  </div>
)

export default function Terms() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] min-h-screen">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="josefin-nav text-[#C9A84C] text-[10px] tracking-widest uppercase mb-4">Правна информация</p>
          <h1 className="cormorant-display text-5xl md:text-6xl font-bold text-[#EDE8DF] mb-6">
            Общи условия
          </h1>
          <p className="text-[#8A8070] text-sm italic font-body">
            Последна актуализация: {UPDATED} · Brillare by BM
          </p>
          <div className="mt-8 p-5 bg-[#131313] border-l-4 border-[#C9A84C] text-sm text-[#A89F92] font-body">
            С извършването на резервация чрез нашия уебсайт Вие приемате настоящите Общи условия в тяхната цялост. Ако не сте съгласни с тях, моля, не правете резервация онлайн — можете да се свържете с нас директно по телефон.
          </div>
        </header>

        {/* TOC */}
        <nav className="mb-16 p-6 bg-[#131313] rounded-sm">
          <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-4">Съдържание</p>
          <ol className="space-y-2 text-sm text-[#8A8070] josefin-nav">
            {[
              ['#parties', '1. Страни'],
              ['#booking', '2. Процес на резервация'],
              ['#cancellation', '3. Отмяна и промяна'],
              ['#lateness', '4. Закъснение'],
              ['#conduct', '5. Поведение в студиото'],
              ['#liability', '6. Отговорност'],
              ['#rights', '7. Права на студиото'],
              ['#changes', '8. Промени в условията'],
              ['#law', '9. Приложимо право'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-[#C9A84C] transition-colors">{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* 1. Страни */}
        <Section id="parties" title="1. Страни">
          <p>
            Настоящите Общи условия уреждат отношенията между:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-[#131313] border border-[#2A2A2A]">
              <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-3">Доставчик на услугата</p>
              <div className="font-mono text-xs text-[#A89F92] space-y-1">
                <p><span className="text-[#EDE8DF]">Brillare by BM</span></p>
                <p>[ИМЕ НА ФИРМА / ФИЗИЧЕСКО ЛИЦЕ] <span className="text-[#4A4540]">← попълва се</span></p>
                <p>ЕИК: [XXXXXXXXX] <span className="text-[#4A4540]">← попълва се</span></p>
                <p>[АДРЕС НА САЛОНА] <span className="text-[#4A4540]">← попълва се</span></p>
                <p>Тел.: +359 897 975 527</p>
              </div>
            </div>
            <div className="p-4 bg-[#131313] border border-[#2A2A2A]">
              <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-3">Клиент</p>
              <p className="text-xs text-[#8A8070]">
                Всяко физическо лице, навършило 16 години, което извършва резервация чрез уебсайта brillarebybm.vercel.app или по телефон, и е предоставило личните си данни за тази цел.
              </p>
            </div>
          </div>
        </Section>

        {/* 2. Резервация */}
        <Section id="booking" title="2. Процес на резервация">
          <p>
            Онлайн резервацията е завършена след успешното подаване на формуляра. Запазеният час не изисква авансово плащане. Студиото потвърждава резервацията в рамките на работното си време.
          </p>
          <div className="space-y-3 mt-4">
            <Rule icon="event_available" title="Потвърждение">
              Резервацията се счита за потвърдена в момента, в който системата ви показа съобщение за успех. Запазваме правото да Ви уведомим при невъзможност за спазване на часа.
            </Rule>
            <Rule icon="schedule" title="Работно време">
              Приемаме резервации в работните дни понеделник — петък. Уикендите и официалните празници не са работни дни. Часовете извън работното ни време не могат да бъдат резервирани онлайн.
            </Rule>
            <Rule icon="person" title="Лична резервация">
              Всяка резервация е лична — за конкретен клиент. Прехвърлянето на резервация на друго лице изисква предварително уведомяване и одобрение от наша страна.
            </Rule>
            <Rule icon="credit_card" title="Плащане">
              Плащането се извършва в студиото след приключване на услугата. Не приемаме авансови плащания онлайн. Приемаме плащане в брой и с карта.
            </Rule>
          </div>
        </Section>

        {/* 3. Отмяна */}
        <Section id="cancellation" title="3. Отмяна и промяна на резервация">
          <p>
            Разбираме, че плановете се променят. Молим Ви да ни уведомите навреме, за да можем да освободим часа за друг клиент.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#131313]">
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Срок на уведомяване</th>
                  <th className="text-left p-3 josefin-nav text-[#C9A84C] uppercase tracking-wider border border-[#2A2A2A]">Последствия</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Повече от 24 часа преди часа', 'Безплатна отмяна или промяна. Без никакви санкции.'],
                  ['Между 2 и 24 часа преди часа', 'Отмяна без санкция при уведомяване по телефон. Препоръчваме да намерите заместник.'],
                  ['По-малко от 2 часа или неявяване (no-show)', 'Резервацията се отбелязва като неявяване. При системни неявявания (3+) може да изискваме депозит за бъдещи резервации.'],
                ].map(([term, consequence], i) => (
                  <tr key={i} className="border border-[#2A2A2A] hover:bg-[#131313] transition-colors">
                    <td className="p-3 text-[#EDE8DF] font-medium">{term}</td>
                    <td className="p-3 text-[#8A8070]">{consequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Уведомяването за отмяна се извършва по телефон: <a href="tel:+359897975527" className="text-[#C9A84C]">+359 897 975 527</a>. Молбите за отмяна се приемат само по телефон — не по имейл или чрез сайта.
          </p>
        </Section>

        {/* 4. Закъснение */}
        <Section id="lateness" title="4. Закъснение">
          <div className="space-y-3">
            <Rule icon="timer" title="Толеранция от 15 минути">
              При закъснение до 15 минути се стремим да обслужим клиента. Услугата може да бъде съкратена, за да не се засегнат следващите клиенти.
            </Rule>
            <Rule icon="timer_off" title="Закъснение над 15 минути">
              При закъснение над 15 минути резервацията може да бъде анулирана. В такъв случай не дължите нищо, но губите правото на услугата за съответния час.
            </Rule>
          </div>
          <p>
            Молим Ви да ни се обадите при очаквано закъснение — ще направим всичко възможно да Ви настаним.
          </p>
        </Section>

        {/* 5. Поведение */}
        <Section id="conduct" title="5. Поведение в студиото">
          <p>
            Brillare by BM е пространство за релакс и грижа. Молим Вас и придружаващите Ви лица да спазвате следните правила:
          </p>
          <ul className="space-y-2 mt-4">
            {[
              'Децата под 12 години трябва да са под надзора на придружаващ възрастен по всяко време.',
              'Домашни любимци не се допускат в студиото (с изключение на асистиращи животни).',
              'Молим да не се използват силни парфюми — някои клиенти и специалисти могат да имат алергии.',
              'Не се допуска фотография или видеозаснемане на другите клиенти без тяхното изрично съгласие.',
              'Студиото си запазва правото да откаже обслужване при агресивно или неуважително поведение.',
            ].map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="text-[#C9A84C] font-mono mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* 6. Отговорност */}
        <Section id="liability" title="6. Отговорност">
          <p>
            Специалистите в Brillare by BM са обучени и опитни. Въпреки това, моля да имате предвид следното:
          </p>
          <div className="space-y-3 mt-4">
            <Rule icon="health_and_safety" title="Алергии и чувствителност">
              Уведомете специалиста за известни алергии към козметични продукти преди началото на процедурата. Студиото не носи отговорност за реакции, за които не е уведомено предварително.
            </Rule>
            <Rule icon="content_cut" title="Резултати">
              Стремим се да постигнем желания резултат. Препоръчваме предварителна консултация за сложни процедури (боядисване, изправяне). Студиото не гарантира конкретен резултат, тъй като той зависи от индивидуалните характеристики на косата.
            </Rule>
            <Rule icon="star" title="Рекламации">
              При неудовлетворение от услуга — уведомете ни в рамките на 48 часа. Ще направим всичко по силите ни за корекция без допълнително заплащане. Рекламации, подадени след 48 часа, не могат да бъдат разгледани.
            </Rule>
          </div>
          <p>
            Студиото не носи отговорност за загубени, откраднати или наранени лични вещи на клиентите по времето на посещението.
          </p>
        </Section>

        {/* 7. Права на студиото */}
        <Section id="rights" title="7. Права на студиото">
          <p>Brillare by BM си запазва правото да:</p>
          <ul className="space-y-2 mt-3">
            {[
              'Откаже резервация или услуга без посочване на причина, при наличие на основателни причини.',
              'Промени работното си време, персонала или наличността на услуги без предизвестие — при форсмажорни обстоятелства.',
              'Изисква депозит от клиенти с история на неявявания (3 или повече) при бъдещи резервации.',
              'Прекрати процедура в случай на опасност за здравето на клиента или специалиста.',
              'Актуализира цените на услугите — промените влизат в сила за резервации, направени след датата на промяната.',
            ].map((right, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#A89F92]">
                <span className="text-[#C9A84C] shrink-0 mt-0.5">·</span>
                {right}
              </li>
            ))}
          </ul>
        </Section>

        {/* 8. Промени */}
        <Section id="changes" title="8. Промени в условията">
          <p>
            Brillare by BM може да актуализира настоящите Общи условия по всяко време. Промените влизат в сила от датата на публикуването им на уебсайта. При съществени промени ще Ви уведомим чрез видимо известие на началната страница.
          </p>
          <p>
            Ако продължите да използвате услугите ни след датата на промяна, ще се счита, че сте приели новите условия. Препоръчваме периодично да преглеждате тази страница.
          </p>
        </Section>

        {/* 9. Приложимо право */}
        <Section id="law" title="9. Приложимо право и решаване на спорове">
          <p>
            Настоящите Общи условия се уреждат от <strong className="text-[#EDE8DF]">законодателството на Република България</strong>.
          </p>
          <p>
            При спорове се стремим първо към извънсъдебно разрешаване. Ако това не е възможно, компетентен е <strong className="text-[#EDE8DF]">Софийски районен съд</strong> или съответният районен съд по местонахождение на студиото.
          </p>
          <div className="mt-4 p-4 bg-[#131313] border border-[#2A2A2A] text-sm text-[#8A8070]">
            <p className="josefin-nav text-[10px] text-[#C9A84C] uppercase tracking-widest mb-2">Алтернативно разрешаване на спорове</p>
            <p>
              Съгласно Директива 2013/11/ЕС и Регламент (ЕС) № 524/2013, потребителите имат право да използват платформата за онлайн решаване на спорове:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline">ec.europa.eu/consumers/odr</a>
            </p>
          </div>
          <p>
            Приложимо потребителско законодателство: Закон за защита на потребителите (ЗЗП), Закон за електронната търговия (ЗЕТ).
          </p>
        </Section>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[#2A2A2A] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="josefin-nav text-[10px] text-[#4A4540] uppercase tracking-widest">© 2026 Brillare by BM · Всички права запазени</p>
          <div className="flex gap-6">
            <Link className="josefin-nav text-[10px] text-[#8A8070] hover:text-[#C9A84C] uppercase tracking-widest transition-colors" to="/privacy">Поверителност</Link>
            <Link className="josefin-nav text-[10px] text-[#8A8070] hover:text-[#C9A84C] uppercase tracking-widest transition-colors" to="/contact">Контакти</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
