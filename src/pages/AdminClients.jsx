import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminBottomNav from '../components/admin/AdminBottomNav'
import { exportClientsExcel, exportClientsCSV } from '../lib/exportExcel'

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

// ─── Add-sale modal ───────────────────────────────────────────────────────────
function SaleModal({ clientId, products, onClose, onSaved }) {
  const today = new Date().toISOString().slice(0, 10)
  const [productId, setProductId] = useState(products[0]?.id ?? '')
  const [qty,       setQty]       = useState(1)
  const [price,     setPrice]     = useState(products[0]?.price ?? '')
  const [date,      setDate]      = useState(today)
  const [notes,     setNotes]     = useState('')
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState('')
  const [kbOffset,  setKbOffset]  = useState(0)

  // Push the modal above the virtual keyboard on iOS/Android.
  // The layout viewport does not shrink when the keyboard opens, so fixed
  // elements stay behind it. visualViewport.height gives the actual visible
  // area, letting us compute keyboard height and shift the modal up.
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const update = () => {
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop)
      setKbOffset(kb)
    }
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
    }
  }, [])

  function onProductChange(id) {
    setProductId(id)
    const p = products.find(p => p.id === id)
    if (p) setPrice(p.price ?? '')
  }

  async function save() {
    if (!productId)               { setError('Избери продукт.'); return }
    if (!price || isNaN(Number(price))) { setError('Въведи валидна цена.'); return }
    setSaving(true)
    setError('')
    const { error: err } = await supabase.from('product_sales').insert({
      client_id:  clientId,
      product_id: productId,
      quantity:   Number(qty),
      price_sold: Number(price),
      date,
      notes: notes.trim() || null,
    })
    if (err) { setError(err.message); setSaving(false); return }
    onSaved()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ paddingBottom: kbOffset, transition: 'padding-bottom 0.15s ease-out' }}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className="relative w-full sm:max-w-md bg-[#131313] border-t border-[#2A2A2A] sm:border z-10 flex flex-col"
        style={{ maxHeight: kbOffset > 0 ? `calc(100vh - ${kbOffset}px - 16px)` : 'min(85dvh, 85vh)' }}
      >
        {/* Header — never scrolls */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
          <h2 className="cormorant-display text-lg text-[#EDE8DF]">Добави продажба</h2>
          <button onClick={onClose} className="text-[#8A8070]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form fields — scrollable */}
        <div className="px-5 py-5 space-y-4 overflow-y-auto overflow-x-hidden min-h-0 flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Product */}
          <div>
            <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">Продукт</label>
            <select
              value={productId}
              onChange={e => onProductChange(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}{p.brand ? ` — ${p.brand}` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Qty + Price row */}
          <div className="flex gap-3">
            <div className="w-28">
              <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">Брой</label>
              <input
                type="number" min="1" max="99"
                value={qty}
                onChange={e => setQty(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            <div className="flex-1 min-w-0">
              <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">Цена (лв)</label>
              <input
                type="number" min="0" step="0.01"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          </div>

          {/* Date — appearance:none strips the native calendar widget chrome that
              overflows the container on Android/iOS while keeping the picker */}
          <div>
            <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">Дата</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
              style={{ WebkitAppearance: 'none', appearance: 'none' }}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">Бележка (по желание)</label>
            <input
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Напр. клиентът попита за следващо зареждане"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}
        </div>

        {/* Save button — pinned footer, never scrolls away */}
        <div className="px-5 py-4 border-t border-[#2A2A2A] shrink-0">
          <button
            onClick={save}
            disabled={saving}
            className="w-full py-3.5 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-xs uppercase tracking-widest font-bold active:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Записване…' : 'Запази продажбата'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Client card ──────────────────────────────────────────────────────────────
function ClientCard({ client, products }) {
  const [expanded,     setExpanded]     = useState(false)
  const [history,      setHistory]      = useState([])
  const [histLoading,  setHistLoading]  = useState(false)
  const [sales,        setSales]        = useState([])
  const [salesLoading, setSalesLoading] = useState(false)
  const [showSaleModal,setShowSaleModal]= useState(false)
  const [notes,        setNotes]        = useState(client.notes ?? '')

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

  async function loadSales() {
    setSalesLoading(true)
    const { data } = await supabase
      .from('product_sales')
      .select('id, date, quantity, price_sold, notes, product:products(name, brand)')
      .eq('client_id', client.id)
      .order('date', { ascending: false })
    setSales(data ?? [])
    setSalesLoading(false)
  }

  async function saveNotes(e) {
    const val = e.target.value
    setNotes(val)
    await supabase.from('clients').update({ notes: val }).eq('id', client.id)
  }

  function toggle() {
    setExpanded(e => !e)
    if (!expanded) { loadHistory(); loadSales() }
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

          {/* Booking history */}
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

          {/* Product sales */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase">Закупени продукти</p>
              {products.length > 0 && (
                <button
                  onClick={() => setShowSaleModal(true)}
                  className="flex items-center gap-1 text-[#C9A84C] josefin-nav text-[10px] uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Добави
                </button>
              )}
            </div>
            {salesLoading ? (
              <div className="space-y-2">
                {[...Array(2)].map((_, i) => <div key={i} className="h-10 bg-[#1C1B1B] animate-pulse" />)}
              </div>
            ) : sales.length === 0 ? (
              <p className="text-xs text-[#4A4540] italic">Няма записани продажби.</p>
            ) : (
              <div className="space-y-2">
                {sales.map(s => (
                  <div key={s.id} className="flex items-center gap-3 py-2 border-b border-[#2A2A2A]/50 last:border-0">
                    <div className="shrink-0">
                      <p className="font-mono text-xs text-[#EDE8DF]">{formatDate(s.date)}</p>
                      {s.quantity > 1 && (
                        <p className="font-mono text-[10px] text-[#8A8070]">x{s.quantity}</p>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#EDE8DF] truncate">{s.product?.name ?? '—'}</p>
                      {s.product?.brand && (
                        <p className="text-xs text-[#8A8070]">{s.product.brand}</p>
                      )}
                    </div>
                    <span className="josefin-nav text-sm text-[#C9A84C] shrink-0 font-bold">
                      {Number(s.price_sold * s.quantity).toFixed(2)} лв
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

      {showSaleModal && (
        <SaleModal
          clientId={client.id}
          products={products}
          onClose={() => setShowSaleModal(false)}
          onSaved={loadSales}
        />
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminClients() {
  const [query,          setQuery]          = useState('')
  const [clients,        setClients]        = useState([])
  const [loading,        setLoading]        = useState(false)
  const [searched,       setSearched]       = useState(false)
  const [products,       setProducts]       = useState([])
  const [exporting,      setExporting]      = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  // Load active products once — passed down to each ClientCard for the sale modal
  useEffect(() => {
    supabase.from('products').select('id, name, brand, price').eq('is_active', true).order('name')
      .then(({ data }) => setProducts(data ?? []))
  }, [])

  async function handleExport(type) {
    setShowExportMenu(false)
    setExporting(true)
    try {
      if (type === 'csv') await exportClientsCSV(supabase)
      else                await exportClientsExcel(supabase)
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    if (query.length < 1) { loadClients(''); return }
    const t = setTimeout(() => loadClients(query), 300)
    return () => clearTimeout(t)
  }, [query])

  async function loadClients(q) {
    setLoading(true)
    setSearched(true)
    let req = supabase
      .from('clients')
      .select('id, name, phone, email, notes, created_at, bookings(id, date, status)')
      .order('name')
      .limit(50)
    if (q) req = req.or(`name.ilike.%${q}%,phone.ilike.%${q}%`)
    const { data } = await req
    const enriched = (data ?? []).map(c => {
      const valid  = (c.bookings ?? []).filter(b => b.status !== 'cancelled' && b.status !== 'no_show')
      const sorted = [...valid].sort((a, b) => new Date(b.date) - new Date(a.date))
      return { ...c, visit_count: valid.length, last_visit: sorted[0]?.date ?? null }
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

      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">Клиенти</h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(m => !m)}
            disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#C9A84C]/40 text-[#C9A84C] josefin-nav text-[10px] uppercase tracking-widest active:bg-[#C9A84C]/10 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-base">
              {exporting ? 'hourglass_empty' : 'download'}
            </span>
            {exporting ? 'Зарежда…' : 'Изтегли'}
          </button>
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 bg-[#1C1B1B] border border-[#2A2A2A] min-w-[140px] shadow-xl">
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left josefin-nav text-[11px] uppercase tracking-widest text-[#EDE8DF] hover:bg-[#2A2A2A] active:bg-[#2A2A2A] transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#C9A84C]">table_view</span>
                  Excel (.xlsx)
                </button>
                <div className="h-px bg-[#2A2A2A]" />
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left josefin-nav text-[11px] uppercase tracking-widest text-[#EDE8DF] hover:bg-[#2A2A2A] active:bg-[#2A2A2A] transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#C9A84C]">csv</span>
                  CSV (.csv)
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Search */}
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
          clients.map(c => <ClientCard key={c.id} client={c} products={products} />)
        )}
      </div>

      <AdminBottomNav />
    </div>
  )
}
