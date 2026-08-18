import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Award, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

const ManagementPage = () => {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Clinical Leadership & Medical Board"
        subtitle="Meet the distinguished dermatologists, dermatosurgeons, and healthcare directors guiding DermaLuxe."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Leadership' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src="https://images.unsplash.com/photo-1594824813566-88855ce783d1?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Jennifer Vance"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-rose-500 shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-50 px-2.5 py-0.5 rounded-md">Medical Director & Chief Dermatologist</span>
              <h3 className="text-base font-bold text-slate-950 font-heading">Dr. Jennifer Vance, MD, DNB, FAM</h3>
              <p className="text-xs text-slate-500">18+ Years Experience • Fellow Aesthetic Medicine (Germany)</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Overseeing laser dermatology safety protocols, Fractional CO2 clinical calibrations, and aesthetic training across all DermaLuxe clinics.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Marcus Lin"
              className="w-32 h-32 rounded-2xl object-cover border-2 border-rose-500 shrink-0"
            />
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-50 px-2.5 py-0.5 rounded-md">Director of Trichology & Hair Transplant</span>
              <h3 className="text-base font-bold text-slate-950 font-heading">Dr. Marcus Lin, MD, FISHRS (USA)</h3>
              <p className="text-xs text-slate-500">17+ Years Experience • Fellow ISHRS (USA)</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Pioneering Sapphire FUE micro-grafting, autologous Growth Factor Concentrate (GFC), and complex scalp restoration protocols.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
