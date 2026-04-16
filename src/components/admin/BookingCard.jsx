import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_LABELS = {
  pending:   { label: 'Изчаква',   color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  confirmed: { label: 'Потвърдена', color: 'text-[#C9A84C] bg-[#C9A84C]/10 border-[#C9A84C]/20' },
  completed: { label: 'Завършена', color: 'text-green-400 bg-green-400/10 border-green-400/20' },
  cancelled: { label: 'Отменена',  color: 'text-red-400 bg-red-400/10 border-red-400/20' },
  no_show:   { label: 'Не се яви', color: 'text-[#8A8070] bg-[#8A8070]/10 border-[#8A8070]/20' },
}

export default function BookingCard({ booking, onRefresh, onEdit }) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [savingStatus, setSavingStatus] = useState(false)

  const s = STATUS_LABELS[booking.status] ?? STATUS_LABELS.pending

  async function handleDelete() {
    setDeleting(true)
    await supabase.from('bookings').delete().eq('id', booking.id)
    onRefresh?.()
  }

  async function handleStatus(newStatus) {
    setSavingStatus(true)
    await supabase.from('bookings').update({ status: newStatus }).eq('id', booking.id)
    setSavingStatus(false)
    onRefresh?.()
  }

  async function saveNotes(e) {
    const notes = e.target.value
    await supabase.from('bookings').update({ admin_notes: notes }).eq('id', booking.id)
  }

  return (
    <div className={`bg-[#131313] border-l-4 transition-all duration-200 ${
      booking.status === 'confirmed' ? 'border-[#C9A84C]' :
      booking.status === 'completed' ? 'border-green-400' :
      booking.status === 'cancelled' ? 'border-red-400/40' :
      'border-[#2A2A2A]'
    }`}>
      {/* Collapsed row */}
      <button
        className="w-full flex items-center gap-4 p-4 text-left active:bg-[#1C1B1B] transition-colors"
        onClick={() => { setExpanded(e => !e); setConfirmDelete(false) }}
      >
        <div className="w-14 shrink-0 text-center">
          <span className="font-mono text-[#C9A84C] text-base font-bold">{booking.time_start?.slice(0, 5)}</span>
          {booking.time_end && (
            <span className="block font-mono text-[10px] text-[#8A8070]">{booking.time_end.slice(0, 5)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="josefin-nav text-[#EDE8DF] font-bold truncate">{booking.client?.name ?? '—'}</p>
          <p className="text-xs text-[#8A8070] truncate">{booking.service?.name} · {booking.master?.name}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[10px] josefin-nav px-2 py-1 border rounded-sm ${s.color}`}>{s.label}</span>
          <span className={`material-symbols-outlined text-[#8A8070] text-sm transition-transform ${expanded ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-[#2A2A2A] px-4 pb-4 pt-4 space-y-4">
          {/* Contact info */}
          {booking.client?.phone && (
            <a
              href={`tel:${booking.client.phone}`}
              className="flex items-center gap-3 text-[#EDE8DF] active:text-[#C9A84C] transition-colors"
            >
              <span className="material-symbols-outlined text-[#C9A84C] text-xl">phone</span>
              <span className="font-mono text-sm">{booking.client.phone}</span>
            </a>
          )}

          {/* Service details */}
          <div className="text-sm text-[#8A8070] space-y-1">
            <p><span className="text-[#EDE8DF]">Услуга:</span> {booking.service?.name}</p>
            <p><span className="text-[#EDE8DF]">Майстор:</span> {booking.master?.name}</p>
            {booking.service?.duration_min && (
              <p><span className="text-[#EDE8DF]">Продължителност:</span> {booking.service.duration_min} мин.</p>
            )}
          </div>

          {/* Admin notes */}
          <div>
            <p className="josefin-nav text-[10px] text-[#8A8070] uppercase mb-1">Бележки</p>
            <textarea
              defaultValue={booking.admin_notes ?? ''}
              onBlur={saveNotes}
              rows={2}
              placeholder="Добави бележка..."
              className="w-full bg-[#0A0A0A] border border-[#2A2A2A] text-[#EDE8DF] text-sm p-3 resize-none focus:outline-none focus:border-[#C9A84C] transition-colors placeholder-[#4A4540]"
            />
          </div>

          {/* Status changer */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(STATUS_LABELS).map(([key, val]) => (
              <button
                key={key}
                disabled={booking.status === key || savingStatus}
                onClick={() => handleStatus(key)}
                className={`text-[10px] josefin-nav px-3 py-2 border rounded-sm transition-all ${
                  booking.status === key
                    ? val.color + ' opacity-100'
                    : 'border-[#2A2A2A] text-[#8A8070] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                } disabled:cursor-not-allowed`}
              >
                {val.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => onEdit?.(booking)}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[11px] uppercase tracking-wide hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors min-h-[44px]"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
              Редактирай
            </button>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[11px] uppercase tracking-wide hover:border-red-400 hover:text-red-400 transition-colors min-h-[44px]"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Изтрий
              </button>
            ) : (
              <div className="flex-1 flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 py-3 bg-red-500/20 border border-red-500/40 text-red-400 josefin-nav text-[11px] uppercase tracking-wide min-h-[44px]"
                >
                  {deleting ? '...' : 'Да'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-3 border border-[#2A2A2A] text-[#8A8070] josefin-nav text-[11px] uppercase tracking-wide min-h-[44px]"
                >
                  Не
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
