import React from 'react';
import { Link } from 'react-router-dom';
import { servicesList } from '../../data/servicesData';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

const MegaMenu = ({ onClose }) => {
  return (
    <div className="w-full bg-white shadow-2xl rounded-2xl border border-rose-100 p-6 md:p-8 transform transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Advanced Dermatology, Lasers & Aesthetic Procedures</h3>
            <p className="text-xs text-slate-500">HydraFacial MD®, Fractional CO2 Lasers, 3-Wave Hair Reduction, Botox®, and Hair Restoration</p>
          </div>
        </div>
        <Link
          to="/services/hydrafacial-md-glow"
          onClick={onClose}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
        >
          <span>View All Procedures</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {servicesList.map((dep) => (
          <Link
            key={dep.id}
            to={`/services/${dep.slug}`}
            onClick={onClose}
            className="group flex items-start space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-rose-50/60 hover:to-pink-50/60 transition-all border border-transparent hover:border-rose-100"
          >
            <div className="mt-0.5 p-2 bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white rounded-lg transition-colors shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-tight">
                {dep.title}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {dep.shortDesc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 bg-rose-50/30 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Equipped with Alma Soprano Titanium, Lumenis Stellar M22, HydraFacial Elite MD & Ultraformer HIFU</span>
        </div>
        <a
          href="tel:1800-419-6784"
          className="text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
        >
          Skin Concierge Helpline: 1800-419-6784
        </a>
      </div>
    </div>
  );
};

export default MegaMenu;
