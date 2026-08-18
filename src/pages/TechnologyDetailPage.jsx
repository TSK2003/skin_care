import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  Zap
} from 'lucide-react';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { useAdmin } from '../context/AdminContext';
import PageHero from '../components/common/PageHero';

const TechnologyDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const technologiesList = adminContext?.technologies || defaultTechnologies;

  const tech = technologiesList.find((t) => t.slug === slug) || technologiesList[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-10">
      
      <PageHero
        title={tech.name}
        subtitle={`${tech.category} • Advanced Clinical Dermatology & Aesthetic Suite`}
        breadcrumb={[
          { label: 'Lasers & Tech', path: '/technologies' },
          { label: tech.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* OVERVIEW & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <div className="inline-block px-3 py-1 bg-rose-50 text-rose-800 text-xs font-bold rounded-lg uppercase tracking-wider border border-rose-100">
              {tech.category}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-heading">
              {tech.name}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {tech.description}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment({ department: tech.name })}
                className="px-6 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Session with {tech.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <img
              src={tech.heroImage || tech.image}
              alt={tech.name}
              className="w-full h-64 sm:h-72 object-cover"
            />
            {tech.badge && (
              <div className="p-4 bg-slate-900 text-white flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
                <span className="text-xs font-bold">{tech.badge}</span>
              </div>
            )}
          </div>

        </div>

        {/* SPECS & BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Key Benefits */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3 flex items-center space-x-2 font-heading">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>Clinical Precision & Patient Benefits</span>
            </h3>
            <ul className="space-y-3">
              {(tech.keyBenefits || tech.benefits || []).map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3 flex items-center space-x-2 font-heading">
              <Cpu className="w-4 h-4 text-rose-600" />
              <span>Technical & Engineering Specifications</span>
            </h3>
            <div className="space-y-2.5">
              {(tech.technicalSpecs || []).map((spec, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">{spec.label}</span>
                  <span className="font-bold text-slate-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TechnologyDetailPage;
