import React from 'react';
import PageHero from '../../components/common/PageHero';
import { ShieldCheck, Sparkles, Award, CheckCircle2, Cpu, Heart } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const OverviewPage = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology'
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Institutional Overview"
        subtitle="Discover how DermaLuxe is setting new benchmarks in US-FDA Approved Laser Dermatology, HydraFacial MD®, and Hair Restoration."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Overview' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold uppercase">
            <span>Institute Profile</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            Dedicated Clinical Dermatology, Laser Aesthetics & Trichology Institute
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {hospitalInfo.fullName || 'DermaLuxe'} is an internationally recognized Center of Excellence in Dermatology and Aesthetic Medicine. By pairing board-certified MD dermatologists with Alma Soprano Titanium, Lumenis Stellar M22, HydraFacial Elite MD, and Canfield VISIA 3D diagnostics, we deliver transformative skin health with pure clinical efficacy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-heading">
                <ShieldCheck className="w-5 h-5 text-rose-600" />
                <span>US-FDA Approved Technologies</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adhering to strict international safety guidelines, calibrated pulse energies, and sapphire ICE Plus contact chillers for safe treatment on all skin tones.
              </p>
            </div>

            <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-heading">
                <Sparkles className="w-5 h-5 text-rose-600" />
                <span>Bespoke Aesthetic Care & Glow</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personalized treatment pathways from severe acne scar remodeling to bridal radiance, non-surgical HIFU lifts, and hair restoration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
