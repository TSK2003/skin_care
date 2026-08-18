import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Star, Quote, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Sneha Ramachandran (27 Yrs)',
      condition: 'Fractional CO2 Laser for Acne Scars',
      surgeon: 'Dr. Jennifer Vance, MD (Dermatology)',
      comment: 'I struggled with deep pitted boxcar and rolling acne scars since college. After 4 sessions of Fractional CO2 laser combined with subcision at DermaLuxe, my skin texture is over 85% smooth and glowing. My self-confidence has completely transformed!',
      rating: 5
    },
    {
      name: 'Vikram Sundaram (32 Yrs)',
      condition: 'Growth Factor Concentrate (GFC) & Hair Restoration',
      surgeon: 'Dr. Marcus Lin, MD (FISHRS)',
      comment: 'Experiencing rapid crown thinning was depressing. Dr. Marcus started me on GFC bio-therapy and within 3 months my daily shedding stopped completely, and thick new hair follicles appeared along my parting.',
      rating: 5
    },
    {
      name: 'Dr. Meenakshi Iyer (44 Yrs)',
      condition: 'Q-Switched Laser Toning for Melasma',
      surgeon: 'Dr. Sophia Bennett, MD (Dermatology)',
      comment: 'Hormonal melasma on both my cheeks resisted every OTC serum and bleach cream. Dr. Sophia’s combination of Q-Switched nanosecond laser and tranexamic mesotherapy cleared 90% of the dark pigmentation with zero downtime!',
      rating: 5
    },
    {
      name: 'Ananya Krishnan (29 Yrs)',
      condition: 'Platinum HydraFacial MD & Pre-Bridal Glow',
      surgeon: 'Dr. Jennifer Vance, MD (Dermatology)',
      comment: 'I booked the Bridal Radiance package 2 days before my wedding. The HydraFacial vortex extraction and Britenol peptide boosters gave me red-carpet glass skin that photographed flawlessly!',
      rating: 5
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Patient Skin Transformations & Reviews"
        subtitle="Read firsthand experiences of patients who restored their radiant complexion, clear skin, and dense hair at DermaLuxe."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Testimonials' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-xl hover:border-rose-300 transition-all">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-950 font-heading">{t.name}</h4>
                  <p className="text-[11px] text-rose-600 font-semibold">{t.condition}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Doctor: {t.surgeon.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
