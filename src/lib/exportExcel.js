import XLSX from 'xlsx-js-style'

// ─── Brand colours ────────────────────────────────────────────────────────────
const C = {
  darkBg:  '131313',
  gold:    'C9A84C',
  cream:   'EDE8DF',
  white:   'FFFFFF',
  altRow:  'F5F2EE',
  textDark:'1C1C1C',
  muted:   '8A8070',
  green:   '2D6A4F',
  red:     '9B2226',
  amber:   '8B6914',
  gray:    '555555',
}

// ─── Shared style builders ────────────────────────────────────────────────────
function headerCell(value) {
  return {
    v: value,
    t: 's',
    s: {
      fill:      { fgColor: { rgb: C.darkBg } },
      font:      { bold: true, color: { rgb: C.gold }, name: 'Calibri', sz: 10 },
      alignment: { vertical: 'center', horizontal: 'left', wrapText: false },
      border:    { bottom: { style: 'medium', color: { rgb: C.gold } } },
    },
  }
}

function dataCell(value, type = 's', extra = {}) {
  return {
    v: value ?? '',
    t: type,
    s: {
      font:      { color: { rgb: C.textDark }, name: 'Calibri', sz: 10 },
      alignment: { vertical: 'center', wrapText: false },
      border: {
        bottom: { style: 'thin', color: { rgb: 'E0DDD8' } },
        right:  { style: 'thin', color: { rgb: 'E0DDD8' } },
      },
      ...extra,
    },
  }
}

function altDataCell(value, type = 's', extra = {}) {
  const base = dataCell(value, type, extra)
  base.s.fill = { fgColor: { rgb: C.altRow } }
  return base
}

function statusCell(label, status, isAlt) {
  const colorMap = {
    completed: C.green,
    confirmed: C.amber,
    cancelled: C.red,
    no_show:   C.red,
    pending:   C.muted,
  }
  const color = colorMap[status] ?? C.gray
  const fn = isAlt ? altDataCell : dataCell
  const cell = fn(label)
  cell.s.font = { ...cell.s.font, color: { rgb: color }, bold: true }
  return cell
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_LABELS = {
  pending:   'Изчаква',
  confirmed: 'Потвърдена',
  completed: 'Завършена',
  cancelled: 'Отменена',
  no_show:   'Не се яви',
}

function fmtDate(isoDate) {
  if (!isoDate) return '—'
  const [y, m, d] = isoDate.slice(0, 10).split('-')
  const months = ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек']
  return `${d} ${months[Number(m) - 1]} ${y}`
}

function fmtTimestamp(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return fmtDate(d.toISOString().slice(0, 10))
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function exportClientsExcel(supabase) {
  // Fetch all clients with full booking history
  const { data: clients, error } = await supabase
    .from('clients')
    .select(`
      id, name, phone, email, notes, created_at,
      bookings:bookings(
        id, date, time_start, status, admin_notes,
        service:services(name),
        master:masters(name)
      )
    `)
    .order('name')

  if (error) throw error

  const wb = XLSX.utils.book_new()

  // ── Sheet 1: Client summary ──────────────────────────────────────────────
  const clientHeaders = [
    headerCell('Клиент'),
    headerCell('Телефон'),
    headerCell('Имейл'),
    headerCell('Посещения'),
    headerCell('Последно посещение'),
    headerCell('Бележки'),
    headerCell('Регистриран'),
  ]

  const clientRows = clients.map((client, i) => {
    const isAlt    = i % 2 === 1
    const cell     = isAlt ? altDataCell : dataCell
    const bookings = client.bookings ?? []
    const valid    = bookings.filter(b => b.status !== 'cancelled' && b.status !== 'no_show')
    const lastVisit = [...valid].sort((a, b) => b.date > a.date ? 1 : -1)[0]?.date ?? null

    return [
      cell(client.name),
      cell(client.phone),
      cell(client.email ?? ''),
      { ...cell(valid.length, 'n'), s: { ...cell(valid.length, 'n').s, alignment: { horizontal: 'center', vertical: 'center' } } },
      cell(fmtDate(lastVisit)),
      { ...cell(client.notes ?? ''), s: { ...cell(client.notes ?? '').s, alignment: { vertical: 'center', wrapText: true } } },
      cell(fmtTimestamp(client.created_at)),
    ]
  })

  const wsClients = XLSX.utils.aoa_to_sheet([clientHeaders, ...clientRows])
  wsClients['!cols'] = [
    { wch: 24 }, // Клиент
    { wch: 16 }, // Телефон
    { wch: 28 }, // Имейл
    { wch: 11 }, // Посещения
    { wch: 20 }, // Последно посещение
    { wch: 42 }, // Бележки
    { wch: 16 }, // Регистриран
  ]
  wsClients['!rows'] = [{ hpt: 26 }] // header row height

  XLSX.utils.book_append_sheet(wb, wsClients, 'Клиенти')

  // ── Sheet 2: Full booking history ────────────────────────────────────────
  const histHeaders = [
    headerCell('Клиент'),
    headerCell('Телефон'),
    headerCell('Дата'),
    headerCell('Час'),
    headerCell('Услуга'),
    headerCell('Майстор'),
    headerCell('Статус'),
    headerCell('Бележки'),
  ]

  const histRows = []
  let rowIdx = 0

  // Sort clients by name, bookings by date desc
  clients.forEach(client => {
    const sorted = [...(client.bookings ?? [])].sort((a, b) =>
      b.date > a.date ? 1 : b.date < a.date ? -1 : 0
    )
    sorted.forEach(b => {
      const isAlt = rowIdx % 2 === 1
      const cell  = isAlt ? altDataCell : dataCell
      histRows.push([
        cell(client.name),
        cell(client.phone),
        cell(fmtDate(b.date)),
        cell(b.time_start?.slice(0, 5) ?? '—'),
        cell(b.service?.name ?? '—'),
        cell(b.master?.name ?? '—'),
        statusCell(STATUS_LABELS[b.status] ?? b.status, b.status, isAlt),
        { ...cell(b.admin_notes ?? ''), s: { ...cell(b.admin_notes ?? '').s, alignment: { vertical: 'center', wrapText: true } } },
      ])
      rowIdx++
    })
  })

  const wsHistory = XLSX.utils.aoa_to_sheet([histHeaders, ...histRows])
  wsHistory['!cols'] = [
    { wch: 24 }, // Клиент
    { wch: 16 }, // Телефон
    { wch: 16 }, // Дата
    { wch: 8  }, // Час
    { wch: 28 }, // Услуга
    { wch: 16 }, // Майстор
    { wch: 14 }, // Статус
    { wch: 36 }, // Бележки
  ]
  wsHistory['!rows'] = [{ hpt: 26 }]

  XLSX.utils.book_append_sheet(wb, wsHistory, 'История')

  // ── Download ──────────────────────────────────────────────────────────────
  const date     = new Date().toISOString().slice(0, 10)
  const filename = `brillare-bm-${date}.xlsx`
  XLSX.writeFile(wb, filename)
}

// ─── CSV export ───────────────────────────────────────────────────────────────
function escapeCSV(val) {
  if (val == null) return ''
  const str = String(val)
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str
}

export async function exportClientsCSV(supabase) {
  const { data: clients, error } = await supabase
    .from('clients')
    .select(`
      id, name, phone, email, notes, created_at,
      bookings:bookings(
        id, date, time_start, status, admin_notes,
        service:services(name),
        master:masters(name)
      )
    `)
    .order('name')

  if (error) throw error

  const BOM = '\uFEFF' // UTF-8 BOM so Excel opens Cyrillic correctly

  // ── Sheet 1: Clients summary ──────────────────────────────────────────────
  const clientsHeader = ['Клиент', 'Телефон', 'Имейл', 'Посещения', 'Последно посещение', 'Бележки', 'Регистриран']
  const clientsRows = clients.map(client => {
    const bookings  = client.bookings ?? []
    const valid     = bookings.filter(b => b.status !== 'cancelled' && b.status !== 'no_show')
    const lastVisit = [...valid].sort((a, b) => b.date > a.date ? 1 : -1)[0]?.date ?? ''
    return [
      client.name,
      client.phone,
      client.email ?? '',
      valid.length,
      fmtDate(lastVisit),
      client.notes ?? '',
      fmtTimestamp(client.created_at),
    ]
  })

  // ── Sheet 2: Booking history ──────────────────────────────────────────────
  const histHeader = ['Клиент', 'Телефон', 'Дата', 'Час', 'Услуга', 'Майстор', 'Статус', 'Бележки']
  const histRows = []
  clients.forEach(client => {
    const sorted = [...(client.bookings ?? [])].sort((a, b) =>
      b.date > a.date ? 1 : b.date < a.date ? -1 : 0
    )
    sorted.forEach(b => {
      histRows.push([
        client.name,
        client.phone,
        fmtDate(b.date),
        b.time_start?.slice(0, 5) ?? '',
        b.service?.name ?? '',
        b.master?.name ?? '',
        STATUS_LABELS[b.status] ?? b.status,
        b.admin_notes ?? '',
      ])
    })
  })

  // Combine into one CSV: clients block, blank line, history block
  const toCSV = (header, rows) => [
    header.map(escapeCSV).join(','),
    ...rows.map(r => r.map(escapeCSV).join(',')),
  ].join('\r\n')

  const csv = [
    '=== КЛИЕНТИ ===',
    toCSV(clientsHeader, clientsRows),
    '',
    '=== ИСТОРИЯ НА РЕЗЕРВАЦИИТЕ ===',
    toCSV(histHeader, histRows),
  ].join('\r\n')

  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `brillare-bm-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
