import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, make, model, year, mileage, registration, condition, notes } = body;

    if (!name || !email || !phone || !make || !model || !year || !mileage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { cookies: { getAll: () => [], setAll: () => {} } }
    );

    const { error } = await supabase.from('valuations').insert({
      name,
      email,
      phone,
      make,
      model,
      year: Number(year),
      mileage: Number(mileage),
      registration: registration || null,
      condition: condition || null,
      notes: notes || null,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save valuation' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
