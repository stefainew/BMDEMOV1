import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import AdminBottomNav from '../components/admin/AdminBottomNav'

const BG_MONTHS = ['Яну','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']

function formatDate(ts) {
  const d = new Date(ts)
  return `${d.getDate()} ${BG_MONTHS[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

const STATUS_TABS = [
  { id: 'new',      label: 'Нови' },
  { id: 'read',     label: 'Прочетени' },
  { id: 'archived', label: 'Архив' },
]

export default function AdminInbox() {
  const [activeStatus, setActiveStatus] = useState('new')
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('inquiries')
      .select('*')
      .eq('status', activeStatus)
      .order('created_at', { ascending: false })
    setInquiries(data ?? [])
    setLoading(false)
  }, [activeStatus])

  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  async function markAs(id, status) {
    await supabase.from('inquiries').update({ status, updated_at: new Date().toISOString() }).eq('id', id)
    setInquiries(prev => prev.filter(i => i.id !== id))
    if (expanded === id) setExpanded(null)
  }

  async function handleExpand(inquiry) {
    if (expanded === inquiry.id) { setExpanded(null); return }
    setExpanded(inquiry.id)
    if (inquiry.status === 'new') {
      await supabase.from('inquiries').update({ status: 'read', updated_at: new Date().toISOString() }).eq('id', inquiry.id)
      setInquiries(prev => prev.map(i => i.id === inquiry.id ? { ...i, status: 'read' } : i))
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col">
      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
      />

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">Запитвания</h1>
        </div>
        <button onClick={fetchInquiries} className="p-2 text-[#8A8070] active:text-[#EDE8DF] transition-colors">
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </header>

      {/* Status tabs */}
      <div className="flex border-b border-[#2A2A2A] shrink-0">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveStatus(tab.id); setExpanded(null) }}
            className={`flex-1 py-3 josefin-nav text-[10px] uppercase tracking-widest transition-colors ${
              activeStatus === tab.id
                ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                : 'text-[#8A8070]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-24">
        {loading ? (
          <div className="space-y-2 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-[#131313] animate-pulse rounded" />
            ))}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8 gap-3">
            <span className="material-symbols-outlined text-[#2A2A2A] text-5xl">inbox</span>
            <p className="josefin-nav text-[10px] uppercase tracking-widest text-[#4A4540]">Няма запитвания</p>
          </div>
        ) : (
          <div className="divide-y divide-[#1C1C1C]">
            {inquiries.map(inq => {
              const isOpen = expanded === inq.id
              return (
                <div key={inq.id}>
                  {/* Collapsed row */}
                  <button
                    className="w-full text-left px-5 py-4 flex items-start gap-3 active:bg-[#131313] transition-colors"
                    onClick={() => handleExpand(inq)}
                  >
                    {/* Unread dot */}
                    <div className="mt-1.5 shrink-0">
                      {inq.status === 'new'
                        ? <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                        : <div className="w-2 h-2 rounded-full bg-[#2A2A2A]" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="josefin-nav text-sm text-[#EDE8DF] truncate font-bold">{inq.name}</p>
                        <p className="font-mono text-[9px] text-[#4A4540] shrink-0">{formatDate(inq.created_at)}</p>
                      </div>
                      <p className="font-['Lora'] text-xs text-[#8A8070] italic line-clamp-2 leading-relaxed">
                        {inq.message}
                      </p>
                    </div>

                    <span className={`material-symbols-outlined text-[#4A4540] text-lg shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-5 pb-5 bg-[#0E0E0E] border-t border-[#1C1C1C]">
                      {/* Contact info */}
                      <div className="flex flex-wrap gap-4 py-4 border-b border-[#1C1C1C] mb-4">
                        {inq.phone && (
                          <a href={`tel:${inq.phone}`} className="flex items-center gap-2 text-[#C9A84C]">
                            <span className="material-symbols-outlined text-base">phone</span>
                            <span className="font-mono text-sm tracking-wide">{inq.phone}</span>
                          </a>
                        )}
                        {inq.email && (
                          <a href={`mailto:${inq.email}`} className="flex items-center gap-2 text-[#8A8070]">
                            <span className="material-symbols-outlined text-base">mail</span>
                            <span className="font-mono text-xs break-all">{inq.email}</span>
                          </a>
                        )}
                      </div>

                      {/* Full message */}
                      <p className="font-['Lora'] text-sm text-[#D4CFC6] italic leading-relaxed mb-5">
                        {inq.message}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {activeStatus !== 'archived' && (
                          <button
                            onClick={() => markAs(inq.id, 'archived')}
                            className="flex-1 py-2.5 border border-[#2A2A2A] josefin-nav text-[10px] uppercase tracking-widest text-[#8A8070] active:text-[#EDE8DF] transition-colors"
                          >
                            Архивирай
                          </button>
                        )}
                        {activeStatus === 'archived' && (
                          <button
                            onClick={() => markAs(inq.id, 'read')}
                            className="flex-1 py-2.5 border border-[#2A2A2A] josefin-nav text-[10px] uppercase tracking-widest text-[#8A8070] active:text-[#EDE8DF] transition-colors"
                          >
                            Възстанови
                          </button>
                        )}
                        {inq.phone && (
                          <a
                            href={`tel:${inq.phone}`}
                            className="flex-1 py-2.5 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">phone</span>
                            Обади се
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
