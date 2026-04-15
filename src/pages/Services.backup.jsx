import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF] font-['Lora']">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-32">
          <h1 className="brand-header text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl leading-tight">
            Услуги и цени
          </h1>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <p className="text-secondary text-xl max-w-xl leading-relaxed">
              Над 25 години опит в грижата за косата. Индивидуален подход, премиум продукти и резултати, от които ще се влюбите.
            </p>
            <div className="h-px w-24 bg-primary mt-4 hidden md:block"></div>
          </div>
        </header>

        <div className="space-y-40">
          {/* Боядисване */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="boyadisване">
            <div className="lg:col-span-5">
              <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Цвят и Живот</span>
              <h2 className="brand-header text-5xl font-light mb-6">Боядисване</h2>
              <p className="text-secondary mb-8 leading-relaxed italic">Трайни, живи цветове с висок клас продукти. Пълна грижа за структурата на косата при всяко боядисване.</p>
              <div className="relative w-full aspect-[4/5] overflow-hidden group">
                <img
                  alt="Боядисване на коса — Brillare by BM"
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg"
                />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                {[
                  { name: 'Цялостно боядисване', desc: 'Равномерно покритие от корен до връхчета', price: 'по запитване' },
                  { name: 'Корени', desc: 'Боядисване само на израснала коса', price: 'по запитване' },
                  { name: 'Тонировка', desc: 'Тониране за по-жив и наситен цвят', price: 'по запитване' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                    <div>
                      <h3 className="ui-label uppercase tracking-widest text-on-surface">{s.name}</h3>
                      <p className="text-secondary text-sm">{s.desc}</p>
                    </div>
                    <span className="price-line text-primary text-xl">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Кичури и Балеаж */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="kichuri">
            <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                {[
                  { name: 'Балеаж', desc: 'Ръчно нанесено осветляване за естествен ефект', price: 'по запитване' },
                  { name: 'Кичури', desc: 'Класически или модерни кичури по цялата дължина', price: 'по запитване' },
                  { name: 'Омбре', desc: 'Плавен преход от тъмно към светло', price: 'по запитване' },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
                    <div>
                      <h3 className="ui-label uppercase tracking-widest text-on-surface">{s.name}</h3>
                      <p className="text-secondary text-sm">{s.desc}</p>
                    </div>
                    <span className="price-line text-primary text-xl">{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Светлина и Нюанс</span>
              <h2 className="brand-header text-5xl font-light mb-6">Кичури и Балеаж</h2>
              <p className="text-secondary mb-8 leading-relaxed italic">Деликатно осветляване за естествен, слънчев ефект, персонализирано за вашия тип коса.</p>
              <div className="relative w-full aspect-[4/5] overflow-hidden group">
                <img
                  alt="Кичури и балеаж — Brillare by BM"
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-700"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg"
                />
              </div>
            </div>
          </section>

          {/* Екстеншъни и Подстригване */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-12 flex flex-col justify-between">
              <div>
                <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Обем и Дължина</span>
                <h2 className="brand-header text-4xl font-light mb-4">Екстеншъни</h2>
                <p className="text-secondary text-sm mb-8 leading-relaxed italic">Премиум удължаване и сгъстяване с висококачествена коса. Естествен вид и трайност.</p>
                <div className="space-y-6">
                  {[
                    { name: 'Микро-ринг', desc: 'Безнагревна техника без лепило' },
                    { name: 'Tape-in', desc: 'Бърза и лесна апликация' },
                    { name: 'Кератин', desc: 'С топлинна техника' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                      <div>
                        <span className="ui-label text-sm uppercase tracking-widest block">{s.name}</span>
                        <span className="text-secondary text-xs">{s.desc}</span>
                      </div>
                      <span className="price-line text-primary">по запитване</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <img
                  className="w-full h-40 object-cover grayscale opacity-60"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/hair-extensions-premium-sofia-1-705x705.jpg"
                  alt="Екстеншъни"
                />
              </div>
            </div>
            <div className="bg-surface-container-low p-12 flex flex-col justify-between">
              <div>
                <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Форма и Стил</span>
                <h2 className="brand-header text-4xl font-light mb-4">Подстригване и Стайлинг</h2>
                <p className="text-secondary text-sm mb-8 leading-relaxed italic">Прецизно подстригване и стайлинг за всеки тип коса и желан вид.</p>
                <div className="space-y-6">
                  {[
                    { name: 'Подстригване', desc: 'Дамско подстригване с консултация' },
                    { name: 'Стайлинг', desc: 'Оформяне и сешоар след подстригване' },
                    { name: 'Кератинова терапия', desc: 'Изглаждане и блясък за дълго' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                      <div>
                        <span className="ui-label text-sm uppercase tracking-widest block">{s.name}</span>
                        <span className="text-secondary text-xs">{s.desc}</span>
                      </div>
                      <span className="price-line text-primary">по запитване</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <img
                  className="w-full h-40 object-cover grayscale opacity-60"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg"
                  alt="Подстригване и стайлинг"
                />
              </div>
            </div>
          </section>

          {/* Терапии и Официални поводи */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-surface-container-high p-8 flex flex-col justify-between">
              <div>
                <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Специален Повод</span>
                <h2 className="brand-header text-3xl font-light mb-4">Официални прически</h2>
                <p className="text-secondary text-sm mb-6 leading-relaxed">Сватби, абитуриентски балове и всеки специален момент заслужава перфектна прическа.</p>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <span className="ui-label text-xs uppercase tracking-widest text-on-surface">Официална прическа</span>
                  <span className="price-line text-primary">по запитване</span>
                </div>
              </div>
              <div className="mt-6">
                <img
                  className="w-full h-32 object-cover grayscale opacity-60"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg"
                  alt="Официални прически"
                />
              </div>
            </div>
            <div className="lg:col-span-2 relative overflow-hidden p-12 bg-surface-container-low border border-outline-variant/20">
              <div className="relative z-10">
                <span className="ui-label uppercase tracking-[0.3em] text-primary text-xs mb-4 block">Грижа и Възстановяване</span>
                <h2 className="brand-header text-4xl font-light mb-8">Премиум терапии</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    { name: 'Кератинова терапия', price: 'по запитване' },
                    { name: 'Ботокс за коса', price: 'по запитване' },
                    { name: 'Хидратираща маска', price: 'по запитване' },
                    { name: 'Възстановяваща терапия', price: 'по запитване' },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between border-b border-outline-variant/10 pb-2">
                      <span className="ui-label text-sm uppercase tracking-widest">{s.name}</span>
                      <span className="price-line text-primary">{s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-5">
                <span className="material-symbols-outlined text-[200px]">spa</span>
              </div>
            </div>
          </section>
        </div>

        {/* Appointment CTA */}
        <section className="mt-40 mb-20 text-center py-24 bg-surface-container-lowest border border-primary/10">
          <h2 className="brand-header text-4xl md:text-6xl font-light mb-8 italic">Готови ли сте за вашата трансформация?</h2>
          <p className="text-secondary ui-label uppercase tracking-[0.2em] mb-12">Резервирайте своя час онлайн или по телефона</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a
              href="https://www.fresha.com/book-now/brilare-eood-mtqavppl/all-offer?pId=1013517"
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-bg text-on-primary-container px-12 py-5 ui-label uppercase tracking-widest font-bold hover:scale-105 transition-transform"
            >
              Запази час онлайн
            </a>
            <a
              href="tel:+359897975527"
              className="border border-outline px-12 py-5 ui-label uppercase tracking-widest hover:bg-surface-variant transition-colors"
            >
              +359 897 975 527
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
