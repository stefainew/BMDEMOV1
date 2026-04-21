import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// Run once in Supabase SQL Editor:
// CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value JSONB NOT NULL);
// ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "admin_all" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

const WEEKDAYS = [
  { key: 1, label: 'Пн' },
  { key: 2, label: 'Вт' },
  { key: 3, label: 'Ср' },
  { key: 4, label: 'Чт' },
  { key: 5, label: 'Пт' },
  { key: 6, label: 'Сб' },
  { key: 0, label: 'Нд' },
]

const DEFAULTS = {
  open_days:  [1, 2, 3, 4, 5],
  start_hour: 9,
  end_hour:   19,
  days_off:   [],
}

const BG_MONTHS = ['Яну','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек']

function fmtDate(d) {
  const [y, m, day] = d.split('-')
  return `${parseInt(day)} ${BG_MONTHS[parseInt(m) - 1]} ${y}`
}

export default function AdminSettings({ onClose }) {
  const [tab, setTab]         = useState('hours')
  const [settings, setSettings] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)

  const [pwForm, setPwForm]   = useState({ newPw: '', confirmPw: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaving, setPwSaving] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)

  const [newDayOff, setNewDayOff] = useState('')

  useEffect(() => {
    supabase.from('settings').select('key,value')
      .then(({ data }) => {
        if (data?.length) {
          const map = {}
          data.forEach(r => { map[r.key] = r.value })
          setSettings(prev => ({ ...prev, ...map }))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    const rows = Object.entries(settings).map(([key, value]) => ({ key, value }))
    await supabase.from('settings').upsert(rows, { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  async function changePassword() {
    setPwError('')
    if (pwForm.newPw.length < 6) { setPwError('Паролата трябва да е поне 6 символа.'); return }
    if (pwForm.newPw !== pwForm.confirmPw) { setPwError('Паролите не съвпадат.'); return }
    setPwSaving(true)
    const { error } = await supabase.auth.updateUser({ password: pwForm.newPw })
    setPwSaving(false)
    if (error) { setPwError(error.message); return }
    setPwSaved(true)
    setPwForm({ newPw: '', confirmPw: '' })
    setTimeout(() => setPwSaved(false), 3000)
  }

  function toggleDay(key) {
    setSettings(s => ({
      ...s,
      open_days: s.open_days.includes(key)
        ? s.open_days.filter(d => d !== key)
        : [...s.open_days, key].sort(),
    }))
  }

  function addDayOff() {
    if (!newDayOff) return
    setSettings(s => ({ ...s, days_off: [...new Set([...s.days_off, newDayOff])].sort() }))
    setNewDayOff('')
  }

  function removeDayOff(d) {
    setSettings(s => ({ ...s, days_off: s.days_off.filter(x => x !== d) }))
  }

  const TABS = [
    { key: 'hours',    label: 'Работно Време' },
    { key: 'days_off', label: 'Почивни Дни' },
    { key: 'password', label: 'Парола' },
  ]

  return (
    <div className="fixed inset-0 z-[200] bg-[#0A0A0A] flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A2A] shrink-0">
        <div>
          <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest">Brillare by BM</p>
          <h2 className="cormorant-display text-xl text-[#EDE8DF]">Настройки</h2>
        </div>
        <button onClick={onClose} className="p-2 text-[#8A8070] active:text-[#EDE8DF]">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1A1A1A] shrink-0">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 josefin-nav text-[10px] uppercase tracking-widest transition-colors ${
              tab === t.key
                ? 'text-[#C9A84C] border-b border-[#C9A84C]'
                : 'text-[#4A4540]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 py-6">

          {/* ── Working Hours ── */}
          {tab === 'hours' && (
            <div className="space-y-8">

              <div>
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-3">Работни дни</p>
                <div className="flex gap-1.5">
                  {WEEKDAYS.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => toggleDay(key)}
                      className={`flex-1 py-3 josefin-nav text-[10px] uppercase font-bold border transition-all ${
                        settings.open_days.includes(key)
                          ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0A0A]'
                          : 'border-[#2A2A2A] text-[#4A4540]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-3">Работни часове</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="josefin-nav text-[9px] text-[#4A4540] uppercase mb-2 block">Отваряне</label>
                    <select
                      value={settings.start_hour}
                      onChange={e => setSettings(s => ({ ...s, start_hour: parseInt(e.target.value) }))}
                      className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
                    >
                      {Array.from({ length: 13 }, (_, i) => i + 7).map(h => (
                        <option key={h} value={h}>{String(h).padStart(2,'0')}:00</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="josefin-nav text-[9px] text-[#4A4540] uppercase mb-2 block">Затваряне</label>
                    <select
                      value={settings.end_hour}
                      onChange={e => setSettings(s => ({ ...s, end_hour: parseInt(e.target.value) }))}
                      className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
                    >
                      {Array.from({ length: 13 }, (_, i) => i + 12).map(h => (
                        <option key={h} value={h}>{String(h).padStart(2,'0')}:00</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── Days Off ── */}
          {tab === 'days_off' && (
            <div className="space-y-6">

              <div>
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-3">Добави почивен ден</p>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={newDayOff}
                    onChange={e => setNewDayOff(e.target.value)}
                    className="flex-1 bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C]"
                  />
                  <button
                    onClick={addDayOff}
                    className="px-5 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[11px] uppercase font-bold tracking-widest"
                  >
                    Добави
                  </button>
                </div>
              </div>

              <div>
                <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-3">
                  Почивни дни{settings.days_off.length > 0 ? ` (${settings.days_off.length})` : ''}
                </p>
                {settings.days_off.length === 0 ? (
                  <p className="text-xs text-[#4A4540] font-body italic">Няма добавени почивни дни</p>
                ) : (
                  <div className="space-y-2">
                    {settings.days_off.map(d => (
                      <div key={d} className="flex items-center justify-between bg-[#131313] border border-[#2A2A2A] px-4 py-3">
                        <span className="font-mono text-sm text-[#EDE8DF]">{fmtDate(d)}</span>
                        <button
                          onClick={() => removeDayOff(d)}
                          className="text-[#4A4540] active:text-red-400 transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ── Password ── */}
          {tab === 'password' && (
            <div className="space-y-4">
              <p className="josefin-nav text-[10px] text-[#8A8070] uppercase tracking-widest mb-2">Смяна на парола</p>

              <input
                type="password"
                placeholder="Нова парола (мин. 6 символа)"
                value={pwForm.newPw}
                onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))}
                className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540]"
              />
              <input
                type="password"
                placeholder="Потвърди новата парола"
                value={pwForm.confirmPw}
                onChange={e => setPwForm(f => ({ ...f, confirmPw: e.target.value }))}
                className="w-full bg-[#131313] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 focus:outline-none focus:border-[#C9A84C] placeholder-[#4A4540]"
              />

              {pwError && (
                <p className="text-red-400 text-sm font-body">{pwError}</p>
              )}
              {pwSaved && (
                <p className="text-green-400 text-sm font-body">✓ Паролата е сменена успешно.</p>
              )}

              <button
                onClick={changePassword}
                disabled={pwSaving}
                className="w-full py-4 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[11px] uppercase font-bold tracking-widest disabled:opacity-40 mt-2"
              >
                {pwSaving ? 'Запазване...' : 'Смени паролата'}
              </button>
            </div>
          )}

        </div>
      )}

      {/* Save footer (not on password tab) */}
      {tab !== 'password' && (
        <div className="px-5 py-4 border-t border-[#2A2A2A] shrink-0">
          <button
            onClick={save}
            disabled={saving}
            className="w-full py-4 bg-[#C9A84C] text-[#0A0A0A] josefin-nav text-[11px] uppercase font-bold tracking-widest disabled:opacity-40"
          >
            {saving ? 'Запазване...' : saved ? '✓ Запазено' : 'Запази настройките'}
          </button>
        </div>
      )}

    </div>
  )
}
