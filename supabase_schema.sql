-- ============================================================
-- Brillare by BM — Database Schema
-- Пусни целия файл в Supabase SQL Editor
-- ============================================================

-- ─── TABLES ─────────────────────────────────────────────────

CREATE TABLE services (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  category     TEXT NOT NULL,
  description  TEXT,
  duration_min INTEGER NOT NULL DEFAULT 60,
  price        NUMERIC(10,2),
  price_label  TEXT DEFAULT 'по запитване',
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE masters (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  bio         TEXT,
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clients (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  phone      TEXT NOT NULL UNIQUE,
  email      TEXT,
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_clients_name  ON clients(name);

CREATE TABLE bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id   UUID REFERENCES clients(id) ON DELETE SET NULL,
  master_id   UUID REFERENCES masters(id) ON DELETE SET NULL,
  service_id  UUID REFERENCES services(id) ON DELETE SET NULL,
  date        DATE NOT NULL,
  time_start  TIME NOT NULL,
  time_end    TIME,
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending','confirmed','completed','cancelled','no_show')),
  admin_notes TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_date   ON bookings(date);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_bookings_master ON bookings(master_id);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE services  ENABLE ROW LEVEL SECURITY;
ALTER TABLE masters   ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients   ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings  ENABLE ROW LEVEL SECURITY;

-- SERVICES: публично четене, admin пише
CREATE POLICY "Public read active services"
  ON services FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- MASTERS: публично четене, admin пише
CREATE POLICY "Public read active masters"
  ON masters FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin manage masters"
  ON masters FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- CLIENTS: анонимен само INSERT, admin всичко
CREATE POLICY "Anyone can create client"
  ON clients FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read clients"
  ON clients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update clients"
  ON clients FOR UPDATE USING (auth.role() = 'authenticated');

-- BOOKINGS: анонимен само INSERT, admin всичко
CREATE POLICY "Anyone can create booking"
  ON bookings FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Admin read bookings"
  ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update bookings"
  ON bookings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete bookings"
  ON bookings FOR DELETE USING (auth.role() = 'authenticated');

-- ─── SEED DATA ───────────────────────────────────────────────

INSERT INTO services (name, category, description, duration_min, price_label, sort_order) VALUES
  ('Боядисване',              'Боядисване',    'Цялостно боядисване с висок клас продукти.',        120, 'по запитване', 1),
  ('Кичури и Балеаж',         'Кичури',        'Деликатно осветляване, балеаж и омбре.',             90, 'по запитване', 2),
  ('Екстеншъни',              'Екстеншъни',    'Премиум удължаване и сгъстяване на коса.',          180, 'по запитване', 3),
  ('Подстригване и стайлинг', 'Подстригване',  'Прецизно подстригване за всеки тип коса.',           60, 'по запитване', 4),
  ('Официална прическа',      'Официални',     'Изискана прическа за специален повод.',             120, 'по запитване', 5),
  ('Премиум терапия',         'Терапии',       'Кератин, ботокс и възстановяващи терапии за коса.', 90, 'по запитване', 6);

INSERT INTO masters (name, role, image_url, sort_order) VALUES
  ('Боби', 'Майстор Фризьор / 25+ години опит',
   'https://brillarebybm.com/wp-content/uploads/2016/05/haircut-and-styling-sofia-salon-705x705.jpg', 1),
  ('Маги', 'Старши Стилист / Специалист цветни техники',
   'https://brillarebybm.com/wp-content/uploads/2016/05/bridal-hairstyle-sofia-salon-705x705.jpg', 2);
