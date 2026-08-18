import React from 'react';
import PageHero from '../../components/common/PageHero';
import { chiefDoctorsList as defaultDoctors } from '../../data/doctorsData';
import { useAdmin } from '../../context/AdminContext';
import { Clock, Calendar, Sparkles, Award } from 'lucide-react';

const DoctorsPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const doctorsList = adminContext?.doctors || defaultDoctors;

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Our Board-Certified Dermatologists & Specialists"
        subtitle="Meet our distinguished MD dermatologists, trichologists, laser fellows, and facial harmonization consultants."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Dermatologists' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsList.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-rose-500 shrink-0"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 leading-tight font-heading">{doc.name}</h3>
                    <p className="text-[11px] font-semibold text-rose-600 mt-0.5">{doc.department}</p>
                    <span className="text-[10px] text-slate-400 block">{doc.experience} Experience</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-[11px] text-slate-700 font-semibold bg-rose-50/40 p-2.5 rounded-xl border border-rose-100">
                    {doc.qualification}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>

                <div className="p-2.5 bg-rose-50/70 rounded-xl border border-rose-100 text-[11px] text-rose-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{doc.timing}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenAppointment && onOpenAppointment({ doctorName: doc.name, department: doc.department })}
                className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation with {doc.name.split(' ')[1]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
