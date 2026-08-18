import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Target, Compass, Heart, Sparkles } from 'lucide-react';

const VisionMissionPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Vision & Aesthetic Philosophy"
        subtitle="Our core purpose, clinical commitment, and dedication to pioneering evidence-based dermatology and flawless skin health."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Vision & Mission' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Our Vision</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be recognized globally as the gold-standard Institute of Clinical Dermatology, Laser Aesthetics, and Trichology, delivering transformative, science-backed skin solutions that empower confidence and self-expression.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To deliver compassionate, ethical, and medical-grade aesthetic care using US-FDA approved lasers, VISIA 3D diagnostics, painless cooling technologies, and authentic formulations under the supervision of board-certified dermatologists.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;
