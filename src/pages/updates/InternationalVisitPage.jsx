import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Globe, Award, Calendar, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

const InternationalVisitPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="International Aesthetic Tourism & Global Patient Concierge"
        subtitle="Welcoming international clients for luxury hair restoration, full-face laser revitalization, and bridal glow transformations."
        breadcrumb={[{ label: 'International Patients' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 text-rose-700">
            <Globe className="w-10 h-10 text-rose-600 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-slate-950 font-heading">Global Skin & Hair Concierge Desk</h2>
              <p className="text-xs text-slate-500">World-class US-FDA laser treatments and Sapphire FUE hair transplants at transparent global pricing.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            DermaLuxe welcomes clients from the UAE, Singapore, Malaysia, Sri Lanka, the UK, and North America seeking discreet, high-precision aesthetic treatments, multi-session laser resurfacing, and permanent follicular unit hair restoration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-700">
            <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100 space-y-1">
              <span className="font-bold text-slate-900 block">✈️ VIP Airport Chauffeur & Visa Letters</span>
              <p className="text-slate-500 text-[11px]">Direct medical visa support letters, luxury airport transfers from Madurai and Trivandrum international airports.</p>
            </div>
            <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-100 space-y-1">
              <span className="font-bold text-slate-900 block">🏨 Luxury Recovery Lounges</span>
              <p className="text-slate-500 text-[11px]">Private post-procedure cooling suites with personalized organic antioxidant menus and dedicated personal concierges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalVisitPage;
