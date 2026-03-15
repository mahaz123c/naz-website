-- ============================================
-- Supabase Schema for Car Dealership Website
-- Run this in Supabase SQL Editor
-- ============================================

-- Vehicles table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  body_type TEXT NOT NULL,
  colour TEXT,
  doors INTEGER DEFAULT 4,
  engine_size TEXT,
  horsepower INTEGER,
  monthly_price NUMERIC(10,2),
  description TEXT,
  features TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  featured BOOLEAN DEFAULT false,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_make ON vehicles(make);
CREATE INDEX idx_vehicles_price ON vehicles(price);
CREATE INDEX idx_vehicles_body_type ON vehicles(body_type);
CREATE INDEX idx_vehicles_featured ON vehicles(featured) WHERE featured = true;
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

-- Contact form submissions
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  type TEXT DEFAULT 'general' CHECK (type IN ('general', 'vehicle', 'finance')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Sell My Car valuations
CREATE TABLE valuations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  registration TEXT,
  condition TEXT CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Row Level Security
-- ============================================

-- Vehicles: public read, authenticated write
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read vehicles"
  ON vehicles FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

-- Enquiries: anyone can insert, authenticated can read
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiry"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

-- Valuations: anyone can insert, authenticated can read
ALTER TABLE valuations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit valuation"
  ON valuations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read valuations"
  ON valuations FOR SELECT
  TO authenticated
  USING (true);

-- Reviews: public read, authenticated write
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true);

-- ============================================
-- Storage: Create a public bucket called "vehicle-images"
-- Do this in the Supabase Dashboard > Storage
-- Set policy: public read, authenticated upload/delete
-- ============================================
