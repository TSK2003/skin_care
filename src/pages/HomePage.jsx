import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  Quote, 
  Star, 
  Cpu, 
  Check, 
  ArrowRight, 
  Zap, 
  Award, 
  Layers, 
  Heart, 
  Smile, 
  CheckCircle2,
  Search,
  BedDouble,
  UserCheck
} from 'lucide-react';

import { servicesList as defaultServices } from '../data/servicesData';
import { branchesList as defaultBranches } from '../data/branchesData';
import { chiefDoctorsList as defaultDoctors } from '../data/doctorsData';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { healthPackages } from '../data/healthCenterData';
import { insurancePartners } from '../data/insuranceData';
import { useAdmin } from '../context/AdminContext';

const clinicalHighlights = [
  { number: '15,000+', label: 'Laser & Glow Procedures', subtext: 'US-FDA Approved Systems' },
  { number: '18+', label: 'MD Board-Certified Doctors', subtext: 'International Aesthetic Fellows' },
  { number: '99.6%', label: 'Skin Transformation Rate', subtext: 'Documented Patient Efficacy' },
  { number: '100%', label: 'Painless & Zero Downtime', subtext: 'Sub-Zero ICE Cooling Tech' },
];

const skinConcerns = [
  { 
    id: 'acne', 
    name: 'Active Acne & Pitted Scars', 
    icon: ShieldCheck, 
    desc: 'Severe cystic acne, deep icepick scars, rolling scars, and post-acne blemishes.',
    symptoms: ['Painful inflammatory cysts & pustules', 'Deep pitted indentations and uneven skin texture', 'Enlarged congested facial pores', 'Red and purple post-acne marks (PIE)'],
    recommended: 'Fractional CO2 Laser Resurfacing + Medical Salicylic Chemical Peels',
    serviceSlug: 'fractional-co2-laser'
  },
  { 
    id: 'pigmentation', 
    name: 'Melasma & Hyperpigmentation', 
    icon: Sparkles, 
    desc: 'Dermal melasma, sun freckles, stubborn dark spots, and uneven tan.',
    symptoms: ['Symmetrical brown/grayish patches on cheeks', 'Stubborn dark patches resisting OTC creams', 'Sun-induced lentigines and age spots', 'Post-inflammatory dark blemishes'],
    recommended: 'Q-Switched Nd:YAG Laser Toning + Tranexamic Meso-Infusion',
    serviceSlug: 'pigmentation-melasma-q-switch'
  },
  { 
    id: 'hair-loss', 
    name: 'Hair Thinning & Alopecia', 
    icon: Zap, 
    desc: 'Male/female pattern baldness, diffuse scalp thinning, and receding hairlines.',
    symptoms: ['Excessive daily hair shedding (> 100 strands)', 'Widening hair parting or crown thinning', 'Weak, thin, miniaturized hair roots', 'Receding M-shaped frontal hairline'],
    recommended: 'Autologous Growth Factor Concentrate (GFC) + Sapphire FUE Transplant',
    serviceSlug: 'prp-gfc-hair-restoration'
  },
  { 
    id: 'aging', 
    name: 'Wrinkles, Sagging & Volume Loss', 
    icon: Heart, 
    desc: 'Crow’s feet, forehead lines, hollow under-eyes, double chin, and loose skin.',
    symptoms: ['Forehead creases & dynamic smile lines', 'Hollow dark under-eye tear troughs', 'Sagging jowls and double chin fat laxity', 'Deep nasolabial laugh folds'],
    recommended: 'Ultraformer 7D HIFU Non-Surgical Lift + Allergan Botox® & Fillers',
    serviceSlug: 'hifu-skin-tightening'
  },
  { 
    id: 'unwanted-hair', 
    name: 'Unwanted Hair & Strawberry Legs', 
    icon: Cpu, 
    desc: 'Coarse facial hair, underarms, arms, legs, back, and chronic razor bumps.',
    symptoms: ['Frequent shaving burns, cuts & irritation', 'Ingrown hairs and itchy folliculitis bumps', 'Rapid dark coarse hair regrowth', 'Dark strawberry pores on legs'],
    recommended: 'Alma Soprano Titanium Painless 3-Wave Laser Hair Removal',
    serviceSlug: 'laser-hair-reduction'
  },
  { 
    id: 'dull-skin', 
    name: 'Dull Skin & Clogged Pores', 
    icon: Smile, 
    desc: 'Dehydrated complexion, environmental pollution damage, blackheads, and lack of glow.',
    symptoms: ['Dry, flaky, lackluster complexion', 'Stubborn blackheads and whiteheads on nose', 'Makeup looking patchy and cakey', 'Tired, environmentally stressed skin'],
    recommended: 'HydraFacial MD® Signature 4-Step Deep Pore Hydro-Dermabrasion',
    serviceSlug: 'hydrafacial-md-glow'
  },
];

const patientTransformations = [
  {
    id: 't1',
    name: 'Sneha Ramachandran (Age 27)',
    concern: 'Severe Cystic Acne & Deep Rolling Scars',
    treatment: 'Fractional CO2 Laser (4 Sessions) + Salicylic Peels',
    result: '85% scar reduction, pore tightening, and completely crystal-clear radiant glass skin.',
    rating: 5,
    doctor: 'Dr. Jennifer Vance, MD',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't2',
    name: 'Vikram Sundaram (Age 32)',
    concern: 'Grade-3 Male Pattern Hair Loss & Thinning Crown',
    treatment: 'GFC Bio-Therapy (4 Sessions) + Sapphire FUE (2,200 Grafts)',
    result: 'Restored natural dense hairline with strong follicular growth and zero shedding.',
    rating: 5,
    doctor: 'Dr. Marcus Lin, MD (FISHRS)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't3',
    name: 'Dr. Meenakshi Iyer (Age 44)',
    concern: 'Stubborn Hormonal Melasma & Under-Eye Hollows',
    treatment: 'Q-Switched Laser Toning + Tear Trough Dermal Filler',
    result: '90% clearance of dark cheek patches with refreshed, well-rested youthful under-eyes.',
    rating: 5,
    doctor: 'Dr. Sophia Bennett, MD',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

const faqItems = [
  {
    q: 'How does HydraFacial MD differ from regular salon facials?',
    a: 'HydraFacial MD uses patented 4-step Vortex-Fusion suction technology and physician-formulated active serums (salicylic, glycolic, hyaluronic acid, peptides) to deeply extract impurities and infuse antioxidants with zero pinching, zero micro-tears, and zero downtime.'
  },
  {
    q: 'Is laser hair reduction truly permanent and pain-free?',
    a: 'Our Alma Soprano Titanium system features continuous ICE Plus sub-zero sapphire cooling and In-Motion 3-wave technology, making sessions virtually painless. It permanently destroys over 90% of active hair follicles across 6 to 8 sessions.'
  },
  {
    q: 'How many Fractional CO2 Laser sessions are needed for acne scars?',
    a: 'Most patients achieve dramatic 70-85% improvement within 3 to 5 sessions spaced 4 to 6 weeks apart. Dermal collagen continues remodeling and tightening for up to 6 months post-treatment.'
  },
  {
    q: 'Will Botox injections freeze my natural facial expressions?',
    a: 'Not at DermaLuxe. Our board-certified dermatologists practice the refined "Baby Botox" micro-dosing technique, relaxing only wrinkle-causing muscles while preserving 100% of your natural, authentic facial expressions.'
  }
];

const HomePage = ({ onOpenAppointment, onOpenEnquiry }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    tagline: 'Institute of Advanced Dermatology, Laser & Aesthetic Medicine',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784'
  };
  const heroContent = adminContext?.heroContent || {
    badge: 'Center of Excellence in Clinical & Aesthetic Dermatology',
    heading: 'Advanced Laser Dermatology, HydraFacial MD & Flawless Skin Radiance',
    description: 'US-FDA approved Alma Soprano Titanium laser hair reduction, Fractional CO2 acne scar remodeling, Q-Switched melasma depigmentation, and bespoke dermatologist care.',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=85',
    stats: clinicalHighlights,
  };
  const whyChooseUs = adminContext?.whyChooseUs || [];
  const servicesList = adminContext?.services || defaultServices;
  const doctorsList = adminContext?.doctors || defaultDoctors;
  const technologiesList = adminContext?.technologies || defaultTechnologies;
  const blogList = adminContext?.blogPosts || defaultBlogPosts;
  const branchesList = adminContext?.branches || defaultBranches;

  const [selectedConcern, setSelectedConcern] = useState(skinConcerns[0]);
  const [activeFaq, setActiveFaq] = useState(null);

  // Quick Book state
  const [quickConcern, setQuickConcern] = useState(servicesList[0]?.title || 'HydraFacial MD® & Deep Pore Hydro-Dermabrasion');
  const [quickDoctor, setQuickDoctor] = useState(doctorsList[0]?.name || 'Dr. Jennifer Vance, MD (Dermatology)');
  const [quickDate, setQuickDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  const handleQuickBook = (e) => {
    e.preventDefault();
    onOpenAppointment({
      department: quickConcern,
      doctorName: quickDoctor,
      date: quickDate
    });
  };

  return (
    <div className="space-y-16 sm:space-y-24 bg-slate-50 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>{heroContent.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
              {heroContent.heading}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
              {heroContent.description}
            </p>

            {/* Trust Micro-Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>US-FDA Approved Lasers</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Award className="w-4 h-4 text-rose-400" />
                <span>VISIA® 3D Skin Analytics</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Painless ICE Plus Cooling</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenAppointment()}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-900/40 hover:shadow-rose-700/60 transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-rose-200" />
                <span>Book Glow Consultation</span>
              </button>

              <button
                type="button"
                onClick={onOpenEnquiry}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm rounded-xl transition-all flex items-center space-x-2 active:scale-95 cursor-pointer"
              >
                <span>Treatment Pricing & Query</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Emergency / Concierge Helpline Ribbon */}
            <div className="pt-2">
              <a
                href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`}
                className="inline-flex items-center space-x-2 text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900/60 px-4 py-2 rounded-xl hover:bg-rose-900/40 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>Skin & Laser Concierge: {hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Instant Consultation Booking Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-rose-100 relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                Priority Clinic Slots
              </div>

              <div className="space-y-1 mb-5">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                  Quick Appointment
                </h3>
                <p className="text-xs text-slate-500">
                  Select your treatment & preferred date for instant confirmation.
                </p>
              </div>

              <form onSubmit={handleQuickBook} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Treatment / Concern</label>
                  <select
                    value={quickConcern}
                    onChange={(e) => setQuickConcern(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc.id} value={svc.title}>{svc.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Dermatologist</label>
                  <select
                    value={quickDoctor}
                    onChange={(e) => setQuickDoctor(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    {doctorsList.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    Proceed to Reserve Consultation
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>✔ No cancellation charge</span>
                  <span>✔ Zero waiting queue</span>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div className="max-w-7xl mx-auto w-full mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {clinicalHighlights.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-rose-400 font-heading">
                {stat.number}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. SKIN CONCERN MATCHER (INTERACTIVE SELECTOR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Skin Diagnosis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
            What Skin or Hair Concern Are You Facing?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            Select your specific concern below to see dermatologist-curated treatment solutions, technologies, and instant appointment booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Concern Buttons Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {skinConcerns.map((concern) => {
              const Icon = concern.icon;
              const isSelected = selectedConcern.id === concern.id;
              return (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcern(concern)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 border-rose-500 scale-[1.02]'
                      : 'bg-white hover:bg-rose-50/50 text-slate-800 border-slate-200 hover:border-rose-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {concern.name}
                    </h3>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                      {concern.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution & Recommended Treatment Detail Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Clinical Action Plan</span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  {selectedConcern.name}
                </h3>
              </div>
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {/* Symptoms / Clinical Signs */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Common Clinical Presentations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedConcern.symptoms.map((symptom, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Treatment Box */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold text-rose-700 uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Gold Standard Dermatological Recommendation:</span>
              </div>
              <p className="text-sm font-bold text-slate-900">
                {selectedConcern.recommended}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/services/${selectedConcern.serviceSlug}`}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
              >
                <span>Read Full Procedure Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenAppointment({ department: selectedConcern.name })}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center space-x-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation for This Concern</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED ADVANCED PROCEDURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pioneering Dermatology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
              Our Core Aesthetic & Clinical Procedures
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              US-FDA certified medical lasers, hydro-dermabrasion, and board-certified aesthetic protocols for transformative skin health.
            </p>
          </div>

          <Link
            to="/technologies"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 shrink-0"
          >
            <span>Explore All Energy Devices</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Procedures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.slice(0, 8).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-slate-200 hover:border-rose-200 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Dermatologist Approved
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors font-heading line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-xs font-bold text-slate-800 hover:text-rose-600 flex items-center space-x-1"
                  >
                    <span>View Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenAppointment({ department: service.title })}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                    title="Book Appointment for this service"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ADVANCED LASER & TECHNOLOGY HIGHLIGHT */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950 text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              <Cpu className="w-3.5 h-3.5 text-rose-400" />
              <span>Cutting-Edge Aesthetic Equipment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
              World-Class Laser & Energy Devices
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              We invest in global gold-standard aesthetic systems so you receive maximum efficacy with minimal discomfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologiesList.slice(0, 3).map((tech) => (
              <div
                key={tech.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md hover:bg-white/10 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="h-44 rounded-2xl overflow-hidden relative">
                    <img
                      src={tech.heroImage}
                      alt={tech.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase shadow">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading">
                    {tech.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {tech.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/technologies/${tech.slug}`}
                    className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => onOpenAppointment({ department: tech.name })}
                    className="text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. MEET OUR BOARD-CERTIFIED DERMATOLOGISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Medical Faculty</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
              Consult Top Skin Care Specialists & Trichologists
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Board-certified MD dermatologists with international fellowships in laser medicine, aesthetic injectables, and hair restoration.
            </p>
          </div>

          <Link
            to="/about/doctors"
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 shrink-0"
          >
            <span>View All Doctors & Hours</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctorsList.slice(0, 3).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 hover:border-rose-200 transition-all flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {doctor.experience} Experience
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                    {doctor.department}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 font-heading">
                    {doctor.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {doctor.qualification}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {doctor.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>{doctor.timing}</span>
                  </div>

                  <button
                    onClick={() => onOpenAppointment({ doctorName: doctor.name, department: doctor.department })}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment with Doctor</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BEFORE & AFTER CLINICAL TRANSFORMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Documented Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
            Real Patient Skin & Hair Transformations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            See how our tailored medical laser and aesthetic protocols delivered radiant, lasting transformations for our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patientTransformations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-rose-400"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <span className="text-[11px] text-rose-600 font-semibold">{item.concern}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="bg-rose-50/60 p-3.5 rounded-2xl text-xs space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Treatment Protocol:</span>
                  <p className="font-bold text-slate-800">{item.treatment}</p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{item.result}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Attending: {item.doctor}</span>
                <span className="text-emerald-700 font-bold">✔ Verified Review</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. BRIDAL & GLOW DIAGNOSTIC PACKAGES */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-rose-200">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>Curated Wellness Plans</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
              Bridal Radiance & Comprehensive Skin Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Multi-modality diagnostic and rejuvenation packages designed for maximum glow, bridal readiness, and long-term cellular anti-aging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl p-6 shadow-xl border border-rose-200 flex flex-col justify-between space-y-5 relative"
              >
                {pkg.badge && (
                  <span className="absolute -top-3 right-6 bg-rose-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow">
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-3">
                  <h3 className="text-base font-extrabold text-slate-900 font-heading leading-snug">
                    {pkg.title}
                  </h3>

                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-black text-rose-600 font-mono">{pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">{pkg.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Included Procedures:</span>
                    <ul className="space-y-1.5">
                      {pkg.tests.slice(0, 4).map((test, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => onOpenAppointment({ department: pkg.title })}
                  className="w-full py-2.5 bg-slate-900 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Book Package
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. 0% EMI & FINANCING PARTNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">Affordable Aesthetics</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                0% Interest EMI & Flexible Financing Partners
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Avail instant paperless EMI approvals for hair transplants, laser packages, and anti-aging treatments.
              </p>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm shrink-0 cursor-pointer"
            >
              Check EMI Eligibility
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {insurancePartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center flex flex-col items-center justify-center space-y-2 hover:border-rose-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                  {partner.name.substring(0, 2).toUpperCase()}
                </div>
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{partner.name}</h4>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  {partner.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
            Dermatology & Laser FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Answers to common questions about HydraFacials, laser treatments, downtime, and consultation prep.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <span className={`p-1.5 rounded-full bg-rose-50 text-rose-600 transition-transform ${isOpen ? 'rotate-180 bg-rose-600 text-white' : ''}`}>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. BOTTOM GLOBAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider">
              Begin Your Skin Journey
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading">
              Ready to Experience Radiant, Flawless Skin?
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
              Book a consultation with our board-certified dermatologists today and receive a complimentary Canfield VISIA® 3D Skin Complexion Scan with your session.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenAppointment()}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-rose-50 text-rose-700 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              Book Consultation Now
            </button>
            <a
              href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-rose-950/40 hover:bg-rose-950/60 border border-white/20 text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center"
            >
              Call Concierge: 1800-419-6784
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
