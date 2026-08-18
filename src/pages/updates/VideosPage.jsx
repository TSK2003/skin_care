import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Play, Sparkles } from 'lucide-react';

const VideosPage = () => {
  const videoCards = [
    {
      title: 'HydraFacial Elite MD: Step-by-Step 6-Phase Vortex Glow Extraction',
      duration: '4:15 min',
      category: 'Medical Facials',
      thumb: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Fractional CO2 Laser Resurfacing for Deep Acne Pits & Scars',
      duration: '5:30 min',
      category: 'Laser Dermatology',
      thumb: 'https://images.unsplash.com/photo-1512290900672-1f41d9962a6b?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Sapphire FUE Hair Grafting & Autologous GFC Bio-Infusion',
      duration: '6:45 min',
      category: 'Trichology',
      thumb: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Clinical Demonstration & Procedure Videos"
        subtitle="Watch real dermatological workflows, laser skin resurfacing demonstrations, and hair restoration procedures."
        breadcrumb={[{ label: 'Videos' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoCards.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl hover:border-rose-300 transition-all">
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-14 h-14 bg-rose-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2.5 right-2.5 bg-slate-950/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {vid.duration}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">{vid.category}</span>
                <h3 className="text-xs font-bold text-slate-950 font-heading mt-1.5 leading-snug">{vid.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
