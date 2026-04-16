import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { computeTimeEnd } from '../../hooks/useAvailability'

const BG_MONTHS = ['Ян','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']

const SLOT_TIMES = []
for (let h = 9; h <= 19; h++) {
  for (let m = 0; m < 60; m += 45) {
    if (h === 19 && m > 45) break
    SLOT_TIMES.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
  }
}

export default function BookingModal({ booking, onClose, onSaved }) {
  const isEdit = !!booking?.id
  const today = new Date().toISOString().split('T')[0]

  const [services, setServices] = useState([])
  const [masters, setMasters]   = useState([])
  const [clients, setClients]   = useState([])
  const [clientQuery, setClientQuery] = useState('')
  const [clientSearchResults, setClientSearchResults] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    date:         booking?.date        ?? today,
    time_start:   booking?.time_start?.slice(0,5) ?? '10:00',
    master_id:    booking?.master_id   ?? '',
    service_id:   booking?.service_id  ?? '',
    status:       booking?.status      ?? 'confirmed',
    admin_notes:  booking?.admin_notes ?? '',
    // client fields (for new bookings)
    client_id:    booking?.client_id   ?? '',
    client_name:  booking?.client?.name  ?? '',
    client_phone: booking?.client?.phone ?? '',
  })

  useEffect(() => {
    Promise.all([
      supabase.from('services').select('id,name,duration_min').eq('is_active', true).order('sort_order'),
      supabase.from('masters').select('id,name').eq('is_active', true).order('sort_order'),
    ]).then(([{ data: svc }, { data: mst }]) => {
      setServices(svc ?? [])
      setMasters(mst ?? [])
      if (!form.service_id && svc?.length) setForm(f => ({ ...f, service_id: svc[0].id }))
      if (!form.master_id  && mst?.length) setForm(f => ({ ...f, master_id:  mst[0].id }))
    })
  }, [])

  // Client search debounce
  useEffect(() => {
    if (!clientQuery || clientQuery.length < 2) { setClientSearchResults([]); return }
    const t = setTimeout(async () => {
      const { data } = await supabase
        .from('clients')
        .select('id,name,phone')
        .or(`name.ilike.%${clientQuery}%,phone.ilike.%${clientQuery}%`)
        .limit(5)
      setClientSearchResults(data ?? [])
    }, 300)
    return () => clearTimeout(t)
  }, [clientQuery])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function selectClient(c) {
    setForm(f => ({ ...f, client_id: c.id, client_name: c.name, client_phone: c.phone }))
    setClientQuery(c.name)
    setClientSearchResults([])
  }

  async function handleSave() {
    setError('')
    if (!form.date || !form.time_start || !form.master_id || !form.service_id) {
      setError('Попълнете всички задължителни полета.')
      return
    }
    setSaving(true)

    try {
      let clientId = form.client_id

      // If no client selected, create/upsert from name+phone
      if (!clientId && form.client_name && form.client_phone) {
        const { data: c, error: cErr } = await supabase
          .from('clients')
          .upsert({ name: form.client_name, phone: form.client_phone }, { onConflict: 'phone' })
          .select()
          .single()
        if (cErr) throw cErr
        clientId = c.id
      }

      const service = services.find(s => s.id === form.service_id)
      const time_end = computeTimeEnd(form.time_start, service?.duration_min ?? 60)

      const payload = {
        client_id:   clientId || null,
        master_id:   form.master_id,
        service_id:  form.service_id,
        date:        form.date,
        time_start:  form.time_start,
        time_end,
        status:      form.status,
        admin_notes: form.admin_notes || null,
      }

      if (isEdit) {
        const { error: e } = await supabase.from('bookings').update(payload).eq('id', booking.id)
        if (e) throw e
      } else {
        const { error: e } = await supabase.from('bookings').insert(payload)
        if (e) throw e
      }

      onSaved?.()
      onClose()
    } catch (err) {
      setError(err.message || 'Грешка при запазване.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0A0A]/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A]">
        <h2 className="josefin-nav text-[#EDE8DF] font-bold uppercase tracking-wide">
          {isEdit ? 'Редактирай резервация' : 'Нова резервация'}
        </h2>
        <button onClick={onClose} className="p-2 text-[#8A8070] active:text-[#EDE8DF]">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
        {/* Client search */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Клиент</label>
          <input
            type="text"
            placeholder="Търси по име или телефон..."
            value={clientQuery}
            onChange={e => { setClientQuery(e.target.value); set('client_id', '') }}
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
          {clientSearchResults.length > 0 && (
            <div className="mt-1 border border-[#2A2A2A] bg-[#131313]">
              {clientSearchResults.map(c => (
                <button
                  key={c.id}
                  onClick={() => selectClient(c)}
                  className="w-full flex justify-between items-center px-3 py-3 hover:bg-[#1C1B1B] text-left border-b border-[#2A2A2A] last:border-0"
                >
                  <span className="text-[#EDE8DF] text-sm">{c.name}</span>
                  <span className="text-[#8A8070] font-mono text-xs">{c.phone}</span>
                </button>
              ))}
            </div>
          )}
          {/* New client fields shown when no existing client selected */}
          {!form.client_id && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Ime"
                value={form.client_name}
                onChange={e => set('client_name', e.target.value)}
                className="bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
              />
              <input
                type="tel"
                placeholder="Телефон"
                value={form.client_phone}
                onChange={e => set('client_phone', e.target.value)}
                className="bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
              />
            </div>
          )}
          {form.client_id && (
            <p className="mt-2 text-xs text-[#C9A84C]">✓ {form.client_name} ({form.client_phone})</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Услуга *</label>
          <select
            value={form.service_id}
            onChange={e => set('service_id', e.target.value)}
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
          >
            {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        {/* Master */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Майстор *</label>
          <select
            value={form.master_id}
            onChange={e => set('master_id', e.target.value)}
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
          >
            {masters.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Дата *</label>
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
          />
        </div>

        {/* Time */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Час *</label>
          <div className="grid grid-cols-4 gap-2">
            {SLOT_TIMES.map(t => (
              <button
                key={t}
                onClick={() => set('time_start', t)}
                className={`py-3 border font-mono text-sm transition-all ${
                  form.time_start === t
                    ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A] font-bold'
                    : 'border-[#2A2A2A] text-[#EDE8DF] hover:border-[#C9A84C]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Статус</label>
          <select
            value={form.status}
            onChange={e => set('status', e.target.value)}
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
          >
            <option value="pending">Изчаква</option>
            <option value="confirmed">Потвърдена</option>
            <option value="completed">Завършена</option>
            <option value="cancelled">Отменена</option>
            <option value="no_show">Не се яви</option>
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-2 block">Бележки</label>
          <textarea
            rows={3}
            value={form.admin_notes}
            onChange={e => set('admin_notes', e.target.value)}
            placeholder="Бележки за резервацията..."
            className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 resize-none focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540]"
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Footer buttons */}
      <div className="px-5 py-4 border-t border-[#2A2A2A] flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 py-4 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[11px] uppercase tracking-wide"
        >
          Отказ
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-4 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[11px] uppercase font-bold tracking-wide disabled:opacity-40"
        >
          {saving ? 'Запазване...' : isEdit ? 'Запази' : 'Създай'}
        </button>
      </div>
    </div>
  )
}
