import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Star, Smile, ShieldCheck, Award, Sparkles } from 'lucide-react';

const PatientSatisfactionPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Clinical Efficacy & Patient Satisfaction Metrics"
        subtitle="Objective skin rejuvenation milestones, acne clearance rates, and client happiness ratings across 15,000+ aesthetic sessions."
        breadcrumb={[{ label: 'Clinical Efficacy & Reviews' }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-rose-600 font-heading">99.6%</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Satisfaction Score</p>
            <span className="text-[10px] text-slate-400">Post-Treatment Survey</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-emerald-700 font-heading">0.0%</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Laser Burn Incidence</p>
            <span className="text-[10px] text-slate-400">Calibrated US-FDA Lasers</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-rose-600 font-heading">15,000+</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Glow & Laser Sessions</p>
            <span className="text-[10px] text-slate-400">Transformative Outcomes</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-3xl font-black text-amber-500 font-heading">4.9 / 5</p>
            <p className="text-xs font-bold text-slate-800 mt-1">Google Reviews</p>
            <span className="text-[10px] text-slate-400">Over 3,100+ Real Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSatisfactionPage;
