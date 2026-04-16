import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminBottomNav from '../components/admin/AdminBottomNav'
import { exportClientsExcel } from '../lib/exportExcel'

const BG_MONTHS = ['Ян','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']

function formatDate(d) {
  if (!d) return '—'
  const [year, month, day] = d.slice(0, 10).split('-').map(Number)
  return `${day} ${BG_MONTHS[month - 1]} ${year}`
}

const STATUS_LABELS = {
  pending:   'Изчаква',
  confirmed: 'Потвърдена',
  completed: 'Завършена',
  cancelled: 'Отменена',
  no_show:   'Не се яви',
}

function ClientCard({ client }) {
  const [expanded, setExpanded] = useState(false)
  const [history, setHistory]   = useState([])
  const [histLoading, setHistLoading] = useState(false)
  const [notes, setNotes]       = useState(client.notes ?? '')

  async function loadHistory() {
    if (history.length) return
    setHistLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select('id, date, time_start, status, service:services(name), master:masters(name)')
      .eq('client_id', client.id)
      .order('date', { ascending: false })
    setHistory(data ?? [])
    setHistLoading(false)
  }

  async function saveNotes(e) {
    const val = e.target.value
    setNotes(val)
    await supabase.from('clients').update({ notes: val }).eq('id', client.id)
  }

  function toggle() {
    setExpanded(e => !e)
    if (!expanded) loadHistory()
  }

  return (
    <div className="bg-[#131313] border-l-4 border-[#2A2A2A]">
      <button
        className="w-full flex items-center gap-4 p-4 text-left active:bg-[#1C1B1B] transition-colors"
        onClick={toggle}
      >
        <div className="w-10 h-10 rounded-full bg-[#1C1B1B] flex items-center justify-center shrink-0">
          <span className="josefin-nav text-sm font-bold text-[#C9A84C]">
            {client.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="josefin-nav text-[#EDE8DF] font-bold truncate">{client.name}</p>
          <p className="font-mono text-xs text-[#8A8070]">{client.phone}</p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          {client.last_visit && (
            <span className="text-[10px] text-[#8A8070]">{formatDate(client.last_visit)}</span>
          )}
          {client.visit_count > 0 && (
            <span className="text-[10px] josefin-nav text-[#C9A84C]">{client.visit_count} посещения</span>
          )}
          <span className={`material-symbols-outlined text-[#8A8070] text-sm transition-transform ${expanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#2A2A2A] px-4 pb-4 pt-4 space-y-4">
          {/* Contact */}
          <a href={`tel:${client.phone}`} className="flex items-center gap-3 text-[#EDE8DF]">
            <span className="material-symbols-outlined text-[#C9A84C]">phone</span>
            <span className="font-mono text-sm">{client.phone}</span>
          </a>
          {client.email && (
            <a href={`mailto:${client.email}`} className="flex items-center gap-3 text-[#EDE8DF]">
              <span className="material-symbols-outlined text-[#C9A84C]">mail</span>
              <span className="text-sm">{client.email}</span>
            </a>
          )}

          {/* History */}
          <div>
            <p className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2">История на посещенията</p>
            {histLoading ? (
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => <div key={i} className="h-10 bg-[#1C1B1B] animate-pulse" />)}
              </div>
            ) : history.length === 0 ? (
              <p className="text-xs text-[#4A4540] italic">Няма записани посещения.</p>
            ) : (
              <div className="space-y-2">
                {history.map(b => (
                  <div key={b.id} className="flex items-center gap-3 py-2 border-b border-[#2A2A2A]/50 last:border-0">
                    <div className="shrink-0">
                      <p className="font-mono text-xs text-[#EDE8DF]">{formatDate(b.date)}</p>
                      <p className="font-mono text-[10px] text-[#8A8070]">{b.time_start?.slice(0,5)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#EDE8DF] truncate">{b.service?.name ?? '—'}</p>
                      <p className="text-xs text-[#8A8070]">{b.master?.name ?? '—'}</p>
                    </div>
                    <span className={`text-[10px] josefin-nav shrink-0 ${
                      b.status === 'completed' ? 'text-green-400' :
                      b.status === 'cancelled' ? 'text-red-400/70' :
                      b.status === 'confirmed' ? 'text-[#C9A84C]' :
                      'text-[#8A8070]'
                    }`}>
                      {STATUS_LABELS[b.status] ?? b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin notes */}
          <div>
            <p className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2">Бележки за клиента</p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              onBlur={saveNotes}
              rows={3}
              placeholder="Алергии, предпочитания, специални изисквания..."
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 resize-none focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminClients() {
  const [query, setQuery]         = useState('')
  const [clients, setClients]     = useState([])
  const [loading, setLoading]     = useState(false)
  const [searched, setSearched]   = useState(false)
  const [exporting, setExporting] = useState(false)

  async function handleExport() {
    setExporting(true)
    try {
      await exportClientsExcel(supabase)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    if (query.length < 1) {
      // Load all clients by default
      loadClients('')
      return
    }
    const t = setTimeout(() => loadClients(query), 300)
    return () => clearTimeout(t)
  }, [query])

  async function loadClients(q) {
    setLoading(true)
    setSearched(true)

    let req = supabase
      .from('clients')
      .select(`
        id, name, phone, email, notes, created_at,
        bookings(id, date, status)
      `)
      .order('name')
      .limit(50)

    if (q) {
      req = req.or(`name.ilike.%${q}%,phone.ilike.%${q}%`)
    }

    const { data } = await req

    // Enrich with visit_count and last_visit
    const enriched = (data ?? []).map(c => {
      const visits = c.bookings ?? []
      const completed = visits.filter(b => b.status !== 'cancelled' && b.status !== 'no_show')
      const sorted = [...completed].sort((a, b) => new Date(b.date) - new Date(a.date))
      return {
        ...c,
        visit_count: completed.length,
        last_visit:  sorted[0]?.date ?? null,
      }
    })

    setClients(enriched)
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
      />

      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">Клиенти</h1>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          title="Изтегли Excel"
          className="flex items-center gap-1.5 px-3 py-2 border border-[#C9A84C]/40 text-[#C9A84C] josefin-nav text-[10px] uppercase tracking-widest active:bg-[#C9A84C]/10 transition-colors disabled:opacity-40"
        >
          <span className="material-symbols-outlined text-base">
            {exporting ? 'hourglass_empty' : 'download'}
          </span>
          {exporting ? 'Зарежда…' : 'Excel'}
        </button>
      </header>

      {/* Search bar */}
      <div className="px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-3 bg-[#131313] border border-[#2A2A2A] px-4 py-3 focus-within:border-[#C9A84C] transition-colors">
          <span className="material-symbols-outlined text-[#8A8070] text-xl">search</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Търси по име или телефон..."
            className="flex-1 bg-transparent text-[#EDE8DF] text-sm focus:outline-none placeholder-[#4A4540]"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[#8A8070]">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      {searched && !loading && (
        <div className="px-5 pb-2 shrink-0">
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase">
            {clients.length} клиента{query ? ` за "${query}"` : ''}
          </p>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-2">
        {loading ? (
          <div className="space-y-2 pt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-[#131313] animate-pulse rounded" />
            ))}
          </div>
        ) : clients.length === 0 && searched ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-[#2A2A2A] mb-4">person_search</span>
            <p className="josefin-nav text-[#8A8070] uppercase tracking-wide text-sm">Няма намерени клиенти</p>
          </div>
        ) : (
          clients.map(c => <ClientCard key={c.id} client={c} />)
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
