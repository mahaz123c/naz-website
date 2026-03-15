export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type: string;
  colour: string | null;
  doors: number;
  engine_size: string | null;
  horsepower: number | null;
  monthly_price: number | null;
  description: string | null;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  vehicle_id: string | null;
  type: 'general' | 'vehicle' | 'finance';
  created_at: string;
}

export interface Valuation {
  id: string;
  name: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  registration: string | null;
  condition: string | null;
  notes: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
}
