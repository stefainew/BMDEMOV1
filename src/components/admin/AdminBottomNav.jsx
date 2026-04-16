import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const tabs = [
  { id: 'today',    icon: 'calendar_today',  label: 'Днес',     path: '/admin' },
  { id: 'calendar', icon: 'calendar_month',  label: 'Календар', path: '/admin?view=calendar' },
  { id: 'clients',  icon: 'group',           label: 'Клиенти',  path: '/admin/clients' },
]

export default function AdminBottomNav({ activeView, onChangeView }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E0E0E] border-t border-[#2A2A2A] flex safe-area-bottom">
      {tabs.map(tab => {
        const isActive =
          tab.id === 'clients'
            ? location.pathname === '/admin/clients'
            : location.pathname === '/admin' && (
                tab.id === 'today'    ? activeView === 'today'
              : tab.id === 'calendar' ? activeView === 'calendar'
              : false
              )

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'clients') navigate('/admin/clients')
              else { navigate('/admin'); onChangeView?.(tab.id) }
            }}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[60px] transition-colors ${
              isActive ? 'text-[#C9A84C]' : 'text-[#8A8070] active:text-[#EDE8DF]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
              {tab.icon}
            </span>
            <span className="text-[10px] josefin-nav uppercase tracking-wide">{tab.label}</span>
          </button>
        )
      })}

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[60px] text-[#8A8070] active:text-red-400 transition-colors"
      >
        <span className="material-symbols-outlined text-[22px]">logout</span>
        <span className="text-[10px] josefin-nav uppercase tracking-wide">Изход</span>
      </button>
    </nav>
  )
}
