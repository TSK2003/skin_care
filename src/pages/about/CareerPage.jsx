import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Briefcase, Send, CheckCircle2, Sparkles } from 'lucide-react';

const CareerPage = () => {
  const jobs = [
    {
      title: 'Consultant Dermatologist & Laser Physician (MD / DNB)',
      department: 'Laser Dermatology & Aesthetic Medicine',
      experience: '3+ Years Post-MD',
      type: 'Full-Time',
      description: 'Seeking board-certified MD dermatologists skilled in Fractional CO2 lasers, Soprano Titanium hair reduction, and medical peeling protocols.'
    },
    {
      title: 'Senior Trichologist & Hair Transplant Surgeon',
      department: 'Trichology & Hair Restoration Unit',
      experience: '4+ Years in FUE / GFC',
      type: 'Full-Time',
      description: 'Looking for specialists experienced in Sapphire FUE micro-grafting, GFC bio-injections, and complex scalp trichology.'
    },
    {
      title: 'Certified Aesthetic Nurse / Laser Operator (B.Sc Nursing)',
      department: 'Laser Procedure & HydraFacial Suites',
      experience: '2+ Years in Aesthetics',
      type: 'Full-Time',
      description: 'Role for scrub and laser safety nurses trained in patient prep, Zimmer cryo-chilling, and HydraFacial vortex maintenance.'
    },
    {
      title: 'VIP Patient Skin Concierge & Counselor',
      department: 'Front Desk & Patient Experience',
      experience: '2+ Years',
      type: 'Full-Time',
      description: 'Managing patient appointment flows, aesthetic treatment package counseling, and 0% EMI processing.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-12 pb-16">
      <PageHero
        title="Careers at DermaLuxe"
        subtitle="Join our premier Institute of Clinical Dermatology & Laser Aesthetics. Work alongside leading fellowship-trained dermatologists."
        breadcrumb={[{ label: 'About', path: '/about' }, { label: 'Careers' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-lg hover:border-rose-300 transition-all">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">
                    {job.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{job.experience}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-950 font-heading mt-2">{job.title}</h3>
                <p className="text-xs text-rose-600 font-semibold">{job.department}</p>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{job.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">careers@dermaluxeskin.org</span>
                <a
                  href="mailto:careers@dermaluxeskin.org"
                  className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
