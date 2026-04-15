import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = ['Всички', 'Боядисване', 'Кичури и Балеаж', 'Екстеншъни', 'Подстригване', 'Официални', 'Терапии']

const galleryItems = [
  {
    category: 'Кичури и Балеаж',
    label: 'Кичури и Балеаж',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg',
  },
  {
    category: 'Боядисване',
    label: 'Боядисване',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-coloring-salon-sofia-705x705.jpg',
  },
  {
    category: 'Официални',
    label: 'Официална прическа',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
  },
  {
    category: 'Екстеншъни',
    label: 'Екстеншъни',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/hair-extensions-premium-sofia-1-705x705.jpg',
  },
  {
    category: 'Подстригване',
    label: 'Подстригване и стайлинг',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
  },
  {
    category: 'Терапии',
    label: 'Премиум терапия',
    artisan: 'Brillare by BM',
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/premium-hair-treatment-sofia-705x705.jpg',
  },
]

const instagramImages = [
  {
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/balayage-highlights-hair-color-1-705x705.jpg',
  },
  {
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
  },
]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('Всички')

  const filtered = activeFilter === 'Всички'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <div className="bg-background text-warm-white-text font-['Lora'] selection:bg-primary/30">
      <div className="grain-overlay"></div>
      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-20">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-6 tracking-tight">Галерия</h1>
          <div className="w-24 h-[1px] bg-primary mb-8"></div>
          <p className="max-w-xl text-secondary-text font-['Lora'] leading-relaxed text-lg">
            Резултатите говорят сами. Разгледайте нашите трансформации и открийте вдъхновение за вашия следващ визит в Brillare by BM.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 border-b border-outline-variant/30 pb-6 overflow-x-auto whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-['Josefin_Sans'] uppercase tracking-[0.2em] text-[0.75rem] pb-2 transition-colors ${
                activeFilter === cat
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-secondary-text hover:text-warm-white-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-container gap-8">
          {filtered.map((item, i) => (
            <div key={i} className="masonry-item relative group overflow-hidden bg-surface-container-low">
              <img
                className="w-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                src={item.img}
                alt={item.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="font-['DM_Mono'] text-[0.65rem] text-primary uppercase tracking-widest mb-1">{item.label}</span>
                <span className="font-['Josefin_Sans'] text-xs uppercase tracking-widest text-warm-white-text">Artisan: {item.artisan}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <section className="mt-32 border-t border-outline-variant/20 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-['DM_Mono'] text-primary uppercase tracking-[0.3em] text-xs mb-4 block">Последвайте ни</span>
              <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light mb-6">Отвъд огледалото</h2>
              <p className="text-secondary-text mb-8 leading-relaxed max-w-md">
                За ежедневна доза вдъхновение, процеси "зад кулисите" и най-новите ни творби, присъединете се към нашата общност в Instagram.
              </p>
              <a className="inline-flex items-center gap-4 group" href="https://www.instagram.com/brillare_by_bm" target="_blank" rel="noopener noreferrer">
                <div className="w-12 h-12 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-black">photo_camera</span>
                </div>
                <span className="font-['Josefin_Sans'] uppercase tracking-widest text-sm text-warm-white-text">@brillare_by_bm</span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-surface-container-high overflow-hidden">
                <img
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  src={instagramImages[0].img}
                  alt="Instagram post 1"
                />
              </div>
              <div className="aspect-square bg-surface-container-high overflow-hidden mt-8">
                <img
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  src={instagramImages[1].img}
                  alt="Instagram post 2"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
