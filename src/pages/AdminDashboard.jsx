import { Link } from 'react-router-dom'

const sidebarLinks = [
  { icon: 'calendar_today', label: 'Календар', active: true },
  { icon: 'content_cut', label: 'Услуги', active: false },
  { icon: 'group', label: 'Екип', active: false },
  { icon: 'person', label: 'Клиенти', active: false },
]

const timeMarkers = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

const masters = [
  {
    name: 'Виктор К.',
    role: 'Master Barber',
    appointments: [
      { top: 20, height: 128, time: '10:00 - 11:30', client: 'Иван П.', service: 'Подстригване + Оформяне', status: 'confirmed', statusColor: 'bg-green-500', statusLabel: 'Confirmed' },
      { top: 320, height: 80, time: '13:00 - 14:00', client: 'Марин Т.', service: null, status: 'pending', statusColor: 'bg-yellow-500', statusLabel: 'Pending' },
    ],
  },
  {
    name: 'Елена М.',
    role: 'Senior Stylist',
    appointments: [
      { top: 0, height: 96, time: '09:00 - 10:15', client: 'Борис Д.', service: null, status: 'completed', statusColor: null, statusLabel: 'Completed', faded: true },
      { top: 220, height: 128, time: '11:45 - 13:15', client: 'Асен Г.', service: 'Ритуал Бръснене', status: 'confirmed', statusColor: 'bg-green-500', statusLabel: 'Confirmed' },
    ],
  },
  {
    name: 'Стефан С.',
    role: 'Creative Artist',
    appointments: [
      { top: 160, height: 160, time: '10:30 - 12:30', client: 'Никола Й.', service: 'Цялостен Стилизинг', status: 'confirmed', statusColor: 'bg-green-500', statusLabel: 'Confirmed' },
    ],
  },
]

export default function AdminDashboard() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex overflow-hidden">
      <div className="grain-overlay fixed inset-0 z-[100]"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col h-screen z-40 flex-shrink-0">
        <div className="px-8 py-10">
          <Link to="/">
            <img src="/logo.jpg" alt="Brillare by BM" className="h-8 w-auto" />
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all duration-300 group ${
                link.active
                  ? 'text-[#C9A84C] bg-surface-container-high font-bold'
                  : 'text-[#8A8070] hover:text-[#EDE8DF] hover:bg-surface-container-low'
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="josefin-sans uppercase tracking-widest text-[0.75rem]">{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="p-8 border-t border-outline-variant mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-surface-container-high border border-outline-variant overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxDGbVk5Xpp-625QELNLHtgL_jJ8V2HX7zvDaYU5nG9wR6W6XQaU6GCIktU1O7pNrNf1CogkR6UehHi7YeSkLnOSSjGiK5RIxArRN1P0QZq50GAZMsqa6oVmsOII03pAnNYNgMW9vifmPt1Z0eEY4TQK_TlXKqFcnTpaD1o5OQOOMKRSJCBtFD9ALEx04OYfuHPsmKmF3hEYijHAX_hR2OtxrSUiROmTdo9BwQ20e5DCgHtnQgYPRzXYy6XHqLzMyGF77EkKb_7Q"
                alt="Admin avatar"
              />
            </div>
            <div>
              <p className="text-[0.7rem] josefin-sans uppercase tracking-tighter text-[#EDE8DF]">Администратор</p>
              <p className="text-[0.6rem] dm-mono text-[#8A8070]">ID: 4429-A</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        {/* Top Bar */}
        <header className="h-20 flex justify-between items-center px-12 bg-surface-container-lowest/50 backdrop-blur-xl border-b border-outline-variant/30">
          <div className="flex items-center gap-8 w-1/2">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline-variant text-lg">search</span>
              <input
                className="w-full bg-transparent border-0 border-b border-outline-variant py-2 pl-8 text-[0.75rem] josefin-sans focus:ring-0 focus:border-primary transition-all placeholder:text-outline-variant uppercase tracking-widest"
                placeholder="ТЪРСЕНЕ..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 bg-primary text-on-primary-container px-6 py-2.5 rounded-sm josefin-sans uppercase tracking-widest text-[0.75rem] font-bold hover:bg-primary-fixed-dim transition-all active:scale-95">
              <span className="material-symbols-outlined text-[1.1rem]">add</span>
              Добави резервация
            </button>
          </div>
        </header>

        {/* Calendar Dashboard */}
        <div className="flex-1 overflow-auto p-8 lg:p-12 admin-scrollbar">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="cormorant text-5xl font-bold text-[#EDE8DF] mb-2 tracking-tight">График на Ателието</h2>
              <p className="josefin-sans uppercase tracking-[0.3em] text-[#8A8070] text-xs">Понеделник, 14 Октомври 2024</p>
            </div>
            <div className="flex gap-4">
              <button className="p-2 border border-outline-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-4 py-2 border border-outline-variant text-[0.7rem] josefin-sans uppercase tracking-widest hover:bg-surface-container-high transition-colors">Днес</button>
              <button className="p-2 border border-outline-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Masters Grid */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-6">
            {/* Time Markers */}
            <div className="pt-20 space-y-[84px]">
              {timeMarkers.map((t) => (
                <div key={t} className="dm-mono text-[0.7rem] text-[#8A8070]">{t}</div>
              ))}
            </div>

            {/* Master Columns */}
            {masters.map((master) => (
              <div key={master.name} className="space-y-4">
                <div className="bg-surface-container-low p-4 mb-8">
                  <h3 className="josefin-sans uppercase tracking-widest text-[0.8rem] text-[#EDE8DF] font-bold">{master.name}</h3>
                  <p className="dm-mono text-[0.6rem] text-primary">{master.role}</p>
                </div>
                <div className="relative h-[800px] border-l border-outline-variant/20">
                  {master.appointments.map((apt, i) => (
                    <div
                      key={i}
                      className="absolute w-full p-1"
                      style={{ top: apt.top, height: apt.height }}
                    >
                      <div className={`h-full border-l-2 p-3 flex flex-col justify-between group cursor-pointer transition-colors ${
                        apt.faded
                          ? 'bg-surface-container-high/50 border-outline-variant opacity-50'
                          : 'bg-surface-container-high border-primary hover:bg-surface-variant'
                      }`}>
                        <div>
                          <p className={`dm-mono text-[0.65rem] mb-1 ${apt.faded ? 'text-[#8A8070]' : 'text-primary'}`}>{apt.time}</p>
                          <p className="josefin-sans uppercase text-[0.75rem] font-bold tracking-wider">{apt.client}</p>
                          {apt.service && <p className="lora italic text-[0.7rem] text-[#8A8070]">{apt.service}</p>}
                        </div>
                        <div className="flex justify-end items-center gap-1">
                          {apt.faded
                            ? <><span className="material-symbols-outlined text-[0.8rem] text-primary">check_circle</span><span className="dm-mono text-[0.55rem] text-[#8A8070] uppercase">{apt.statusLabel}</span></>
                            : <><span className={`w-1.5 h-1.5 rounded-full ${apt.statusColor}`}></span><span className="dm-mono text-[0.55rem] text-[#8A8070] uppercase">{apt.statusLabel}</span></>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-12 right-12 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-surface-container-highest border border-outline-variant flex items-center justify-center text-primary hover:text-white transition-all duration-300">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="w-14 h-14 bg-primary text-on-primary-container flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95 shadow-2xl">
          <span className="material-symbols-outlined">edit_calendar</span>
        </button>
      </div>
    </div>
  )
}
