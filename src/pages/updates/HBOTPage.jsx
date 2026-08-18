import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Sparkles, ShieldCheck, Zap, Calendar } from 'lucide-react';

const HBOTPage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Hyperbaric Bio-Oxygen Dome & LED Phototherapy"
        subtitle="Accelerating Post-Laser Wound Healing, Collagen Neovascularization, and Reversing Oxidative Cellular Aging."
        breadcrumb={[{ label: 'Bio-Oxygen & Phototherapy' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider border border-rose-200">
              Advanced Regenerative Dermatology
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">Pure 95% Anion Oxygen & Far-Infrared Light Therapy</h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our hyperbaric bio-oxygen dome infuses purified pressurized oxygen and negative ions directly into compromised epidermal layers. This stimulates rapid fibroblastic collagen synthesis, neutralizes airborne free radicals, and cuts post-laser erythema downtime by 70%.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Bio-Oxygen Session</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1512290900672-1f41d9962a6b?auto=format&fit=crop&w=800&q=80"
              alt="Bio-Oxygen Hyperbaric Facial Suite"
              className="w-full h-72 object-cover rounded-3xl shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HBOTPage;
