import type { MetadataRoute } from 'next';
import { demoVehicles } from '@/lib/demo-vehicles';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // When Supabase is connected, fetch from DB:
  // const { data: vehicles } = await supabase.from('vehicles').select('slug, updated_at').eq('status', 'available');
  const vehicles = demoVehicles.filter((v) => v.status === 'available');

  const vehicleUrls = vehicles.map((v) => ({
    url: `${BASE_URL}/stock/${v.slug}`,
    lastModified: new Date(v.updated_at || Date.now()),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/stock`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/sell-your-car`, lastModified: new Date() },
    { url: `${BASE_URL}/finance`, lastModified: new Date() },
    ...vehicleUrls,
  ];
}
