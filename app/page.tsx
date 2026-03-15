import HeroSlider from '@/components/HeroSlider';
import FinanceBanner from '@/components/FinanceBanner';
import BudgetFilter from '@/components/BudgetFilter';
import FinanceDisclaimer from '@/components/FinanceDisclaimer';
import AboutSection from '@/components/AboutSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedSection from '@/components/FeaturedSection';
import ReviewsSection from '@/components/ReviewsSection';
import TrustBadges from '@/components/TrustBadges';
import CTABanners from '@/components/CTABanners';
import { createClient } from '@/lib/supabase-server';
import type { Vehicle } from '@/lib/types';

async function getFeaturedVehicles(): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('vehicles')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .limit(8);
    return (data as Vehicle[]) || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredVehicles = await getFeaturedVehicles();

  return (
    <>
      <HeroSlider />
      <FinanceBanner />
      <BudgetFilter />
      <FinanceDisclaimer />
      <AboutSection />
      <WhyChooseUs />
      <FeaturedSection vehicles={featuredVehicles} />
      <ReviewsSection />
      <TrustBadges />
      <CTABanners />
    </>
  );
}
