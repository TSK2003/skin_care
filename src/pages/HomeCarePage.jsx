import React from 'react';
import PageHero from '../components/common/PageHero';
import { 
  Sparkles, 
  UserCheck, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Heart,
  Award,
  CheckCircle2,
  Zap
} from 'lucide-react';

const homeCareServices = [
  {
    id: "home-post-laser-recovery",
    title: "Post-Laser & Chemical Peel Home Recovery",
    icon: Sparkles,
    color: "bg-rose-600",
    desc: "Certified aesthetic nursing staff visit to inspect skin healing, apply soothing epidermal growth-factor barrier packs, and evaluate erythema.",
    features: ["Sterile Cold Cryo Soothing Compress", "Barrier Repair Ceramide Mask Dressing", "Post-Procedure UV & Healing Assessment"]
  },
  {
    id: "home-trichology-gfc-kit",
    title: "Post-Hair Transplant Home Follicular Care",
    icon: Zap,
    color: "bg-pink-600",
    desc: "Specialized trichology technicians deliver gentle graft-safe saline misting, post-transplant donor dressings, and scalp disinfection.",
    features: ["Graft-Safe Low-Pressure Scalp Cleansing", "Donor Area Suture / Crust Management", "Biotin & Follicle Spray Application"]
  },
  {
    id: "home-acne-barrier-visit",
    title: "Severe Acne & Eczema Barrier Dressing",
    icon: ShieldCheck,
    color: "bg-emerald-600",
    desc: "At-home wet wrap barrier therapy, non-comedogenic wound dressings for severe cystic acne, and ceramide barrier replenishment.",
    features: ["Wet-Wrap Eczema Calming Protocol", "Medicated Anti-Bacterial Spot Dressings", "Sensitive Skin Allergen Assessment"]
  },
  {
    id: "tele-derma-consultation",
    title: "HD Video Tele-Dermatology Consultation",
    icon: UserCheck,
    color: "bg-purple-600",
    desc: "Consult our senior board-certified dermatologists from home with high-definition photo review, digital prescription, and doorstep skincare delivery.",
    features: ["HD Macro Photo & Video Evaluation", "Customized Medical Skincare Routine", "Direct Prescription to Partner Pharmacy"]
  },
  {
    id: "bridal-home-radiance",
    title: "Pre-Bridal Luxury Radiance Care at Home",
    icon: Heart,
    color: "bg-rose-500",
    desc: "VIP aesthetic therapists bring gentle enzymatic glow packs, hydrating bio-cellulose sheets, and de-tan exfoliation directly to brides-to-be.",
    features: ["Gentle Non-Chemical Fruit Enzyme Polish", "Multi-Peptide Bio-Cellulose Sheet Infusion", "Lip & Hand Softening Paraffin Care"]
  },
  {
    id: "chronic-psoriasis-home-nursing",
    title: "Chronic Psoriasis & Vitiligo Barrier Care",
    icon: Award,
    color: "bg-amber-600",
    desc: "Trained nurses provide gentle descaling keratolytic application, topical calcipotriol monitoring, and repigmentation progress logging.",
    features: ["Keratolytic Scale Softening Protocol", "Localized Topical Medication Logging", "Progressive Repigmentation Photography"]
  }
];

const HomeCarePage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="DermaLuxe At-Home Care & Tele-Dermatology"
        subtitle="Bringing clinical-grade post-procedure recovery, gentle skin barrier care, and dermatologist consultations directly to your doorstep."
        breadcrumb={[{ label: 'Home Care & Tele-Derma' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeCareServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:border-rose-300 transition-all"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${service.color} text-white rounded-2xl flex items-center justify-center shadow-sm`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 font-heading">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{service.desc}</p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenAppointment && onOpenAppointment({ department: service.title })}
                    className="w-full py-2.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs"
                  >
                    Request Home Care Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HomeCarePage;
