import React from 'react';
import PageHero from '../../components/common/PageHero';
import { photoGalleryList } from '../../data/updatesData';

const GalleryPage = () => {
  const images = photoGalleryList || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      <PageHero
        title="Laser Suites & Aesthetic Clinic Gallery"
        subtitle="Explore our Alma Soprano laser suites, HydraFacial MD treatment rooms, VISIA 3D complexion diagnostic labs, and VIP recovery lounges."
        breadcrumb={[{ label: 'Clinic Gallery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 group hover:shadow-xl hover:border-rose-300 transition-all">
              <div className="h-64 overflow-hidden bg-slate-950">
                <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md">{img.category}</span>
                <h3 className="text-xs font-bold text-slate-950 font-heading mt-1.5">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
