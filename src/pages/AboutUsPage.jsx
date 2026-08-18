import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Users, 
  Building2, 
  CheckCircle2,
  Calendar,
  ArrowRight,
  Heart,
  Zap,
  Cpu
} from 'lucide-react';

const AboutUsPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology'
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-16 pb-20">
      
      <PageHero
        title={`About ${hospitalInfo.fullName || 'DermaLuxe Advanced Institute of Dermatology'}`}
        subtitle="International Center of Excellence in US-FDA Approved Laser Dermatology, HydraFacial MD®, Facial Harmonization, and Sapphire FUE Hair Restoration."
        breadcrumb={[{ label: 'About Institute' }]}
      />

      {/* 1. INSTITUTIONAL LEGACY & HERO NARRATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-rose-100 shadow-md p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-rose-50 bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85"
                  alt="DermaLuxe Laser Dermatology Suite"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              {/* Stat Badge */}
              <div className="absolute -bottom-5 right-4 bg-slate-950 text-white p-5 rounded-2xl shadow-2xl border border-rose-900/50 space-y-1">
                <div className="font-heading text-2xl font-extrabold text-rose-400">18+ Years</div>
                <div className="text-[11px] text-slate-300">Of Dermatological & Aesthetic Excellence</div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-5 text-slate-700">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                <span>Center of Aesthetic & Clinical Excellence</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight">
                Transforming Skin & Hair with Science, Precision & Artistry
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                {hospitalInfo.fullName || 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology'} was established to bring world-class evidence-based clinical dermatology, cutting-edge US-FDA approved energy devices, and bespoke aesthetic medicine under one luxurious roof.
              </p>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Our team consists of MD-qualified Dermatologists, Trichologists, and Dermatosurgeons with international fellowships from Germany, the USA, and the UK, specializing in complex acne scars, stubborn melasma, hair thinning, and subtle facial rejuvenation.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="font-heading text-xl font-extrabold text-rose-600">15,000+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Laser & Glow Sessions</div>
                </div>
                <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="font-heading text-xl font-extrabold text-rose-600">18+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Board-Certified Doctors</div>
                </div>
                <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="font-heading text-xl font-extrabold text-emerald-700">99.6%</div>
                  <div className="text-[11px] text-slate-600 font-medium">Transformation Rate</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-7 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-rose-200 flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Lead Dermatologist</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">US-FDA Approved Lasers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alma Soprano Titanium, Lumenis Stellar M22, and Fractional CO2 systems deliver pinpoint precision with sub-zero sapphire cooling.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">VISIA® 3D Skin Analytics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Advanced multi-spectral photographic diagnostics measuring subsurface UV damage, bacterial porphyrins, and biological skin age.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Pure Medical Grade Standards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% authentic US-FDA approved Allergan Botox®, Juvederm® fillers, and medical-grade sterile procedural suites.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
