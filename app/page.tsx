import HomeHero from '@/components/HomeHero';
import BrandMarquee from '@/components/BrandMarquee';
import FeaturedSection from '@/components/FeaturedSection';
import WarrantySection from '@/components/WarrantySection';
import FinanceSection from '@/components/FinanceSection';
import DifferenceSection from '@/components/DifferenceSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactCTA from '@/components/ContactCTA';
import SEOSection from '@/components/SEOSection';
import { createClient } from '@/lib/supabase-server';
import type { Vehicle } from '@/lib/types';

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    // Featured cars first; top up with the newest stock if fewer than 6
    const { data: featured } = await supabase
      .from('vehicles')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .limit(6);
    const cars = (featured as Vehicle[]) || [];
    if (cars.length >= 6) return cars;

    const { data: rest } = await supabase
      .from('vehicles')
      .select('*')
      .eq('status', 'available')
      .eq('featured', false)
      .order('created_at', { ascending: false })
      .limit(6 - cars.length);
    return [...cars, ...((rest as Vehicle[]) || [])];
  } catch {
    return [];
  }
}

async function getStockCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from('vehicles')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'available');
    return count || 0;
  } catch {
    return 0;
  }
}

export default async function Home() {
  const [featuredVehicles, stockCount] = await Promise.all([
    getFeaturedVehicles(),
    getStockCount(),
  ]);

  return (
    <>
      {/* Cars first — stock is the primary action; finance supports it further down */}
      <HomeHero stockCount={stockCount} />
      <BrandMarquee />
      <FeaturedSection vehicles={featuredVehicles} />
      <WarrantySection />
      <FinanceSection />
      <DifferenceSection stockCount={stockCount} />
      <ReviewsSection />
      <ContactCTA />
      <SEOSection />
    </>
  );
}
