import React from 'react';
import PageHero from '../../components/common/PageHero';
import { hospitalUpdates } from '../../data/updatesData';
import { Calendar, ChevronRight, Sparkles } from 'lucide-react';

const HospitalUpdatesPage = () => {
  const updates = hospitalUpdates || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Institute News & Clinical Milestones"
        subtitle="Latest Laser Dermatology Achievements, Live Aesthetic Masterclasses, and Community Skin Screening Camps."
        breadcrumb={[{ label: 'Clinical Updates' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between group hover:shadow-xl hover:border-rose-300 transition-all">
              <div>
                <div className="h-52 overflow-hidden bg-slate-950">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-md">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 font-heading leading-snug group-hover:text-rose-600 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalUpdatesPage;
