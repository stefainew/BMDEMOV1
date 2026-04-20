# Боби Ярчев — Personal Website

A luxury personal website and online booking platform for **Боби Ярчев**, master hairdresser with 25+ years of experience based in Sofia, Bulgaria.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Animations | Motion (Framer Motion) |
| Backend / DB | Supabase (PostgreSQL + RPC) |
| Deployment | Vercel |

**Fonts:** Cormorant Garamond · Josefin Sans · Lora · DM Mono · Jost

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, services mosaic, testimonials, team, contact strip |
| `/about` | About Bobi — timeline, philosophy, values |
| `/services` | Full services & pricing |
| `/gallery` | Work gallery with category filters |
| `/contact` | Contact form + map |
| `/booking` | Multi-step online booking (service → date/time → confirmation) |
| `/privacy` | Privacy policy |

---

## Booking Flow

```
Step 1 — Choose service
Step 2 — Pick date & time (live availability from Supabase)
Step 3 — Enter contact details & confirm
```

Appointments are saved via a Supabase RPC function (`book_appointment`). The availability hook (`useAvailability.js`) checks real-time slot occupancy.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file at the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Database

The Supabase schema is in [`supabase_schema.sql`](supabase_schema.sql).
A products migration is in [`supabase_products_migration.sql`](supabase_products_migration.sql).

---

## Contact

**Боби Ярчев** — Master Hairdresser
📍 бул. България 60А, София
📞 +359 897 975 527
🕐 Mon–Fri: 10:00–19:00
