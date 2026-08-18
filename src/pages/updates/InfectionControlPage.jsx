import React from 'react';
import PageHero from '../../components/common/PageHero';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const InfectionControlPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Pure Medical Sterility & Cleanroom Dermatosurgery Protocols"
        subtitle="Single-Use Disposable Cartridges, US-FDA Laser Eye Shields, and Autoclaved Surgical Suites."
        breadcrumb={[{ label: 'Sterilization Protocols' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-rose-700">
            <ShieldCheck className="w-10 h-10 text-rose-600 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-heading">100% Sterile Clinical Dermatology Standards</h2>
              <p className="text-xs text-slate-500">Exceeding international hospital-grade infection control standards across all laser and injectables suites.</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
            {[
              '100% individual, vacuum-sealed single-use disposable tips for HydraFacial MD and microneedling RF.',
              'Class-B medical autoclaving of all surgical dermatological forceps, punch biopsy tools, and hair transplant pens.',
              'Optical density OD7+ calibrated laser wavelength safety goggles for both patient and physician protection.',
              'Double-barrier sterile fields for all autologous PRP, GFC, and intradermal botox/filler administrations.',
              'Hospital-grade EPA registered hospital disinfectant fogging and surface sanitization between every client visit.',
              'Cold-chain temperature logging (2°C - 8°C) for all neurotoxins, bio-fillers, and growth factor vials.'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionControlPage;
