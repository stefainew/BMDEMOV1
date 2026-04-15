import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const categories = ['Боядисване', 'Кичури', 'Екстеншъни', 'Терапии', 'Официални', 'Подстригване']

const services = [
  { id: 1, name: 'Боядисване', desc: 'Цялостно боядисване с висок клас продукти за трайни и живи цветове.', duration: 'по запитване', price: 'по запитване' },
  { id: 2, name: 'Кичури и Балеаж', desc: 'Деликатно осветляване и балеаж за естествен, слънчев ефект.', duration: 'по запитване', price: 'по запитване' },
  { id: 3, name: 'Екстеншъни', desc: 'Премиум удължаване и сгъстяване с висококачествена коса.', duration: 'по запитване', price: 'по запитване' },
  { id: 4, name: 'Подстригване и стайлинг', desc: 'Прецизно подстригване и стайлинг за всеки тип коса.', duration: 'по запитване', price: 'по запитване' },
  { id: 5, name: 'Официална прическа', desc: 'Изискана прическа за сватба, абитуриентски бал или специален повод.', duration: 'по запитване', price: 'по запитване' },
  { id: 6, name: 'Премиум терапия', desc: 'Кератин, ботокс и възстановяващи терапии за здрава и блестяща коса.', duration: 'по запитване', price: 'по запитване' },
]

const masters = [
  {
    id: 1, name: 'Боби', role: 'Майстор Фризьор / 25+ години опит', reviews: 200, stars: 5,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg',
  },
  {
    id: 2, name: 'Маги', role: 'Старши Стилист / Специалист цветни техники', reviews: 180, stars: 5,
    img: 'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg',
  },
]

const steps = ['1. Услуга', '2. Майстор', '3. Час', '4. Потвърждение']

export default function BookingStep1() {
  const [activeCat, setActiveCat] = useState('Мъжко')
  const [selectedService, setSelectedService] = useState(services[0])
  const [selectedMaster, setSelectedMaster] = useState(masters[0])
  const navigate = useNavigate()

  return (
    <div className="bg-[#0A0A0A] text-[#EDE8DF]">
      <div className="grain-overlay"></div>

      <Navbar />

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto">
        {/* Stepper */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-3xl mx-auto relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#2A2A2A] -translate-y-1/2 hidden md:block"></div>
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold josefin-nav text-xs ${
                  i === 0
                    ? 'bg-[#C9A84C] text-[#0A0A0A] shadow-[0_0_15px_rgba(201,168,76,0.5)]'
                    : 'bg-[#131313] border border-[#2A2A2A] text-[#8A8070]'
                }`}>{i + 1}</div>
                <span className={`josefin-nav text-[10px] ${i === 0 ? 'text-[#C9A84C] font-bold' : 'text-[#8A8070]'}`}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Service Selection */}
          <div className="lg:col-span-7 space-y-12">
            <header>
              <h1 className="cormorant-display text-5xl font-bold text-[#EDE8DF] mb-4">Избор на услуга</h1>
              <p className="text-[#8A8070] font-body italic">Изберете услугата, за която желаете да запазите час.</p>
            </header>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-6 py-2 josefin-nav text-[11px] rounded-[2px] transition-all ${
                    activeCat === cat
                      ? 'bg-[#C9A84C] text-[#0A0A0A] font-bold'
                      : 'bg-[#1C1B1B] text-[#8A8070] hover:text-[#EDE8DF] border border-transparent hover:border-[#2A2A2A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service List */}
            <div className="grid gap-4">
              {services.map((s) => {
                const isSelected = selectedService.id === s.id
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`group relative bg-[#131313] border-l-4 p-6 flex justify-between items-center cursor-pointer transition-all duration-300 hover:bg-[#1C1B1B] ${
                      isSelected ? 'border-[#C9A84C]' : 'border-transparent hover:border-[#2A2A2A]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h3 className="josefin-nav text-sm font-bold text-[#EDE8DF]">{s.name}</h3>
                      <p className="text-xs text-[#8A8070] font-body">{s.desc}</p>
                      <span className={`inline-block text-[10px] uppercase tracking-widest mt-2 josefin-nav ${isSelected ? 'text-[#C9A84C]' : 'text-[#8A8070]'}`}>{s.duration}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`dm-mono-price text-lg font-medium ${isSelected ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'}`}>{s.price}</span>
                      {isSelected
                        ? <span className="material-symbols-outlined text-[#C9A84C]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        : <div className="w-6 h-6 rounded-full border border-[#2A2A2A]"></div>
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Master Selection */}
          <div className="lg:col-span-5 space-y-12">
            <header>
              <h2 className="cormorant-display text-4xl font-bold text-[#EDE8DF] mb-4">Избор на майстор</h2>
              <p className="text-[#8A8070] font-body italic">Вашият стил заслужава експертна ръка.</p>
            </header>
            <div className="flex flex-col gap-8">
              {masters.map((m) => {
                const isSelected = selectedMaster.id === m.id
                const fullStars = Math.floor(m.stars)
                const hasHalf = m.stars % 1 !== 0
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMaster(m)}
                    className={`flex items-center gap-6 group cursor-pointer transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-full overflow-hidden p-1 ${isSelected ? 'selection-ring' : 'border border-[#2A2A2A]'}`}>
                        <img
                          alt={m.name}
                          className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                          src={m.img}
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 bg-[#C9A84C] text-[#0A0A0A] rounded-full p-1 shadow-lg">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className={`josefin-nav text-lg font-bold ${isSelected ? 'text-[#C9A84C]' : 'text-[#EDE8DF]'}`}>{m.name}</h4>
                      <p className="text-xs text-[#8A8070] font-body">{m.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span
                            key={si}
                            className="material-symbols-outlined text-[12px] text-[#C9A84C]"
                            style={{ fontVariationSettings: si < fullStars ? "'FILL' 1" : hasHalf && si === fullStars ? "'FILL' 0.5" : "'FILL' 0" }}
                          >star</span>
                        ))}
                        <span className="text-[10px] text-[#8A8070] ml-2 josefin-nav">({m.reviews} отзива)</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Sticky Summary Bar */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center bg-[#0E0E0E] p-8 border-t border-[#2A2A2A]">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Вашият избор</p>
            <div className="flex flex-col">
              <span className="josefin-nav text-lg font-bold text-[#EDE8DF]">{selectedService.name}</span>
              <span className="text-[#8A8070] font-body text-sm italic">Майстор: {selectedMaster.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-12">
            <div className="text-right">
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-1">Общо</p>
              <span className="dm-mono-price text-2xl font-bold text-[#C9A84C]">{selectedService.price}</span>
            </div>
            <button
              onClick={() => navigate('/booking/date')}
              className="bg-[#C9A84C] text-[#0A0A0A] josefin-nav font-bold py-4 px-12 text-sm tracking-widest hover:brightness-110 transition-all flex items-center gap-4"
            >
              ПРОДЪЛЖИ КЪМ ЧАС
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start px-12 py-16 gap-8 w-full max-w-screen-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-xl font-bold tracking-widest text-[#EDE8DF] josefin-nav">Brillare by BM</div>
            <p className="text-[#8A8070] max-w-xs text-sm font-body italic">
              Precision is not a skill, it is a state of mind.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Follow</span>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" href="#">Instagram</a>
              <a className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" href="#">Facebook</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="josefin-nav text-[10px] text-[#C9A84C] font-bold">Visit</span>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" to="/contact">Location</Link>
              <Link className="text-sm text-[#8A8070] hover:text-[#EDE8DF] transition-colors josefin-nav" to="/contact">Contact</Link>
            </div>
          </div>
          <div className="md:text-right space-y-2">
            <p className="text-[10px] text-[#8A8070] josefin-nav uppercase tracking-widest">© 2024 Brillare by BM Precision Atelier. All rights reserved.</p>
            <div className="flex md:justify-end gap-6">
              <Link className="text-[10px] text-[#4d4637] hover:text-[#EDE8DF] josefin-nav uppercase" to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
