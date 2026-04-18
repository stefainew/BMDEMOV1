import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const tabs = [
  { id: 'today',    icon: 'calendar_today',  label: 'Днес',       path: '/admin' },
  { id: 'calendar', icon: 'calendar_month',  label: 'Календар',   path: '/admin?view=calendar' },
  { id: 'clients',  icon: 'group',           label: 'Клиенти',    path: '/admin/clients' },
  { id: 'products', icon: 'local_mall',      label: 'Продукти',   path: '/admin/products' },
  { id: 'inbox',    icon: 'inbox',           label: 'Запитвания', path: '/admin/inbox' },
]

export default function AdminBottomNav({ activeView, onChangeView }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    async function fetchUnread() {
      const { count } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
      setUnread(count ?? 0)
    }
    fetchUnread()

    const channel = supabase
      .channel('inquiries-nav')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, fetchUnread)
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E0E0E] border-t border-[#2A2A2A] flex safe-area-bottom">
      {tabs.map(tab => {
        const isActive =
          tab.id === 'clients'  ? location.pathname === '/admin/clients'  :
          tab.id === 'products' ? location.pathname === '/admin/products' :
          tab.id === 'inbox'    ? location.pathname === '/admin/inbox'    :
          location.pathname === '/admin' && (
            tab.id === 'today'    ? activeView === 'today'    :
            tab.id === 'calendar' ? activeView === 'calendar' : false
          )

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'clients')  navigate('/admin/clients')
              else if (tab.id === 'products') navigate('/admin/products')
              else if (tab.id === 'inbox')    navigate('/admin/inbox')
              else { navigate('/admin'); onChangeView?.(tab.id) }
            }}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 min-h-[60px] transition-colors relative ${
              isActive ? 'text-[#C9A84C]' : 'text-[#8A8070] active:text-[#EDE8DF]'
            }`}
          >
            <span className="relative inline-flex">
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {tab.icon}
              </span>
              {tab.id === 'inbox' && unread > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-[3px] leading-none">
                  {unread > 99 ? '99+' : unread}
                </span>
              )}
            </span>
            <span className="text-[10px] josefin-nav uppercase tracking-wide">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
