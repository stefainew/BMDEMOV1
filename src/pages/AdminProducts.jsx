import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminBottomNav from '../components/admin/AdminBottomNav'

// ─── Product modal (add / edit) ───────────────────────────────────────────────
function ProductModal({ product, onClose, onSaved }) {
  const isEdit = !!product?.id
  const [form, setForm]     = useState({
    name:      product?.name      ?? '',
    brand:     product?.brand     ?? '',
    category:  product?.category  ?? '',
    price:     product?.price     ?? '',
    is_active: product?.is_active ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function save() {
    if (!form.name.trim()) { setError('Името е задължително.'); return }
    if (form.price === '' || isNaN(Number(form.price))) { setError('Въведи валидна цена.'); return }
    setSaving(true)
    setError('')
    const payload = {
      name:      form.name.trim(),
      brand:     form.brand.trim()    || null,
      category:  form.category.trim() || null,
      price:     Number(form.price),
      is_active: form.is_active,
    }
    const { error: err } = isEdit
      ? await supabase.from('products').update(payload).eq('id', product.id)
      : await supabase.from('products').insert(payload)
    if (err) { setError(err.message); setSaving(false); return }
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-[#131313] border-t border-[#2A2A2A] sm:border sm:rounded-none z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
          <h2 className="cormorant-display text-lg text-[#EDE8DF]">
            {isEdit ? 'Редактирай продукт' : 'Нов продукт'}
          </h2>
          <button onClick={onClose} className="text-[#8A8070]">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <div className="px-5 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">
              Наименование *
            </label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Напр. Shea Butter Shampoo"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">
              Марка
            </label>
            <input
              value={form.brand}
              onChange={e => set('brand', e.target.value)}
              placeholder="Напр. Kerastase"
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
            />
          </div>

          {/* Category + Price row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">
                Категория
              </label>
              <input
                value={form.category}
                onChange={e => set('category', e.target.value)}
                placeholder="Напр. Шампоан"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
              />
            </div>
            <div className="w-28">
              <label className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest block mb-1">
                Цена (€) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm px-4 py-3 focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
              />
            </div>
          </div>

          {/* Active toggle (edit only) */}
          {isEdit && (
            <div className="flex items-center justify-between py-1">
              <span className="josefin-nav text-[11px] text-[#8A8070] uppercase tracking-widest">Активен</span>
              <button
                onClick={() => set('is_active', !form.is_active)}
                className={`w-12 h-6 rounded-full transition-colors relative ${form.is_active ? 'bg-[#C9A84C]' : 'bg-[#2A2A2A]'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${form.is_active ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          )}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            onClick={save}
            disabled={saving}
            className="w-full py-3.5 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-xs uppercase tracking-widest font-bold active:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Запазване…' : isEdit ? 'Запази промените' : 'Добави продукт'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState(null) // null | { product?: {} }

  async function load() {
    setLoading(true)
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('sort_order')
      .order('name')
    setProducts(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const active   = products.filter(p => p.is_active)
  const inactive = products.filter(p => !p.is_active)

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
          <h1 className="cormorant-display text-xl text-[#EDE8DF]">Продукти</h1>
        </div>
        <div className="josefin-nav text-[10px] text-[#8A8070]">
          {active.length} активни
        </div>
      </header>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-28 space-y-2">
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-[#131313] animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-[#2A2A2A] mb-4">inventory_2</span>
            <p className="josefin-nav text-[#8A8070] uppercase tracking-wide text-sm">Няма добавени продукти</p>
            <p className="text-[#4A4540] text-xs mt-2">Докоснете + за да добавите</p>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <div className="space-y-2">
                {active.map(p => <ProductRow key={p.id} product={p} onEdit={() => setModal({ product: p })} />)}
              </div>
            )}

            {inactive.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="josefin-nav text-[10px] text-[#4A4540] uppercase tracking-widest pb-1">Неактивни</p>
                {inactive.map(p => <ProductRow key={p.id} product={p} onEdit={() => setModal({ product: p })} />)}
              </div>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setModal({})}
        className="fixed right-5 bottom-[80px] z-40 w-14 h-14 bg-[#C9A84C] text-[#0A0A0A] rounded-full flex items-center justify-center shadow-lg shadow-[#C9A84C]/20 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <AdminBottomNav />

      {modal && (
        <ProductModal
          product={modal.product}
          onClose={() => setModal(null)}
          onSaved={load}
        />
      )}
    </div>
  )
}

function ProductRow({ product, onEdit }) {
  return (
    <button
      onClick={onEdit}
      className="w-full flex items-center gap-4 p-4 bg-[#131313] border-l-4 text-left active:bg-[#1C1B1B] transition-colors"
      style={{ borderColor: product.is_active ? '#C9A84C33' : '#2A2A2A' }}
    >
      <div className="w-10 h-10 rounded-full bg-[#1C1B1B] flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[#C9A84C] text-lg">
          {product.is_active ? 'local_mall' : 'inventory_2'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="josefin-nav text-sm text-[#EDE8DF] font-bold truncate">{product.name}</p>
        <p className="text-xs text-[#8A8070] truncate">
          {[product.brand, product.category].filter(Boolean).join(' · ') || 'Без категория'}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="josefin-nav text-sm text-[#C9A84C] font-bold">
          {product.price != null ? `${Number(product.price).toFixed(2)} €` : '—'}
        </p>
        <span className="material-symbols-outlined text-[#8A8070] text-sm">chevron_right</span>
      </div>
    </button>
  )
}
