import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="bg-[#0A0A0A]">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-12 mb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <h1 className="font-headline text-[5rem] leading-[0.9] font-bold text-[#EDE8DF] mb-8">
                За нас
              </h1>
              <p className="font-body text-xl text-[#8A8070] max-w-xl">
                Brillare by BM е повече от фризьорски салон. Това е пространство, където красотата среща опита и индивидуалният подход е в основата на всяко посещение.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-end">
              <span className="font-mono text-sm tracking-widest text-[#C9A84C]">25+ ГОДИНИ / СОФИЯ</span>
            </div>
          </div>
          <div className="mt-16 h-[600px] w-full relative overflow-hidden">
            <img
              className="w-full h-full object-cover grayscale brightness-75"
              src="https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg"
              alt="Brillare by BM — салон за красота"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
          </div>
        </section>

        {/* History */}
        <section className="px-12 py-32 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="font-headline text-4xl text-[#EDE8DF]">Нашата история</h2>
              <div className="space-y-6 font-body text-lg text-[#8A8070] leading-relaxed">
                <p>
                  Ние сме Боби и Маги – екип с над 25 години професионален опит в света на красотата. Нашият път започна с любов към занаята и желание да създаваме не просто прически, а цели изживявания.
                </p>
                <p>
                  Работили сме по филми, реклами и ТВ продукции, придобивайки опит, който малко салони могат да предложат. Днес Brillare by BM е синоним на качество, индивидуален подход и модерни техники в сърцето на София.
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 z-10">
                <img
                  className="w-full h-full object-cover"
                  src="https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg"
                  alt="Brillare by BM — официална прическа"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-surface-container-high p-8 flex flex-col justify-end">
                <span className="font-mono text-xs text-[#C9A84C] mb-2">ARCHIVE NO. 001</span>
                <p className="font-label text-sm uppercase tracking-widest">Първият детайл е най-важен.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-12 py-40">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-[#C9A84C]">Нашата Философия</span>
            <h2 className="font-headline text-6xl leading-tight">
              Вашата красота е<br />
              <span className="italic text-[#8A8070]">нашата мисия.</span>
            </h2>
            <p className="font-body text-xl text-[#8A8070] max-w-2xl mx-auto">
              Вярваме, че всяко посещение трябва да е изживяване: индивидуален подход, модерни техники и атмосфера на лукс. Нашата цел е да ви помогнем да откриете своя уникален стил и да излъчвате увереност.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-12 pb-40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'architecture', title: 'Индивидуален подход', num: '01 / PERSONAL', desc: 'Всяка коса е различна и заслужава специално отношение. Консултираме се с вас, за да намерим идеалното решение за вашата коса.' },
              { icon: 'shield', title: 'Премиум продукти', num: '02 / QUALITY', desc: 'Работим само с висок клас марки и продукти. Вашата коса получава грижата, която заслужава, с безопасни и ефективни формули.' },
              { icon: 'spa', title: 'Опит и занаят', num: '03 / MASTERY', desc: '25+ години опит, работа по филми, реклами и ТВ продукции. Боби и Маги са истински майстори на своята работа.' },
            ].map((v, i) => (
              <div key={i} className="bg-surface-container-low p-12 space-y-8 flex flex-col justify-between border-b-2 border-transparent hover:border-[#C9A84C] transition-all group">
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-[#C9A84C] text-3xl">{v.icon}</span>
                  <h3 className="font-label text-xl uppercase tracking-widest text-[#EDE8DF]">{v.title}</h3>
                  <p className="font-body text-[#8A8070]">{v.desc}</p>
                </div>
                <span className="font-mono text-xs text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity">{v.num}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Callout */}
        <section className="h-[819px] relative overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg"
            alt="Brillare by BM — галерия"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/40 flex items-center justify-center">
            <div className="text-center space-y-8">
              <h2 className="font-headline text-5xl">Вижте нашата работа</h2>
              <Link
                to="/gallery"
                className="inline-block border border-[#C9A84C] text-[#C9A84C] font-label uppercase tracking-widest px-10 py-4 hover:bg-[#C9A84C] hover:text-black transition-all"
              >
                Към Галерията
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
