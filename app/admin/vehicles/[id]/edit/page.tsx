import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import VehicleForm from '@/components/admin/VehicleForm';
import type { Vehicle } from '@/lib/types';

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) notFound();

  return <VehicleForm mode="edit" initialData={data as Vehicle} />;
}
