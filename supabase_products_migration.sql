-- ============================================================
-- Brillare by BM — Products & Sales Migration
-- Пусни в Supabase SQL Editor
-- ============================================================

-- ─── TABLES ──────────────────────────────────────────────────

CREATE TABLE products (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  brand      TEXT,
  category   TEXT,
  price      NUMERIC(10,2),
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_sales (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id  UUID REFERENCES clients(id)   ON DELETE SET NULL,
  product_id UUID REFERENCES products(id)  ON DELETE SET NULL,
  quantity   INTEGER NOT NULL DEFAULT 1,
  price_sold NUMERIC(10,2) NOT NULL,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  notes      TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_sales_client  ON product_sales(client_id);
CREATE INDEX idx_product_sales_product ON product_sales(product_id);
CREATE INDEX idx_product_sales_date    ON product_sales(date);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────

ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sales  ENABLE ROW LEVEL SECURITY;

-- PRODUCTS: public read active, admin manages
CREATE POLICY "Public read active products"
  ON products FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Admin manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- PRODUCT_SALES: admin only
CREATE POLICY "Admin manage product_sales"
  ON product_sales FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
