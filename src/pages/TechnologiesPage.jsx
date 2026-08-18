import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Cpu, Sparkles, ShieldCheck } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { useAdmin } from '../context/AdminContext';

const TechnologiesPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const technologiesList = adminContext?.technologies || defaultTechnologies;
  const hospitalInfo = adminContext?.hospitalInfo || { fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology' };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-10">
      
      <PageHero
        title="US-FDA Approved Laser & Aesthetic Energy Devices"
        subtitle={`${hospitalInfo.fullName || 'DermaLuxe'} features Alma Soprano Titanium, Lumenis Stellar M22 IPL, HydraFacial Elite MD, VISIA 3D Analytics, and Ultraformer III HIFU.`}
        breadcrumb={[{ label: 'Lasers & Tech' }]}
      />

      {/* TECHNOLOGIES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologiesList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between hover:border-rose-500 hover:shadow-xl transition-all group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={item.heroImage || item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/90 text-rose-300 text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider border border-rose-900/50">
                    {item.category}
                  </div>
                  {item.badge && (
                    <div className="absolute bottom-3 left-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-base font-bold text-slate-950 group-hover:text-rose-600 transition-colors leading-snug font-heading">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <Link
                  to={`/technologies/${item.slug}`}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                >
                  <span>Technical Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => onOpenAppointment && onOpenAppointment({ department: item.name })}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TechnologiesPage;
