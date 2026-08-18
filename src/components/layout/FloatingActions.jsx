import React from 'react';
import { Phone, MessageSquare, Calendar, ChevronUp } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const FloatingActions = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    phone: '+91 98401 23456',
    whatsappNumber: '919840123456'
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello DermaLuxe, I would like to consult a Skin Care Specialist / inquire about HydraFacials, Laser Resurfacing & Glow Treatments."
    );
    window.open(`https://wa.me/${hospitalInfo.whatsappNumber || '919840123456'}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
      
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 bg-white hover:bg-slate-100 text-slate-700 shadow-md rounded-full flex items-center justify-center border border-slate-200 transition-all hover:scale-105 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* WhatsApp Chat */}
      <button
        onClick={handleWhatsApp}
        className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        aria-label="WhatsApp Skin Consultation"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Direct Call */}
      <a
        href={`tel:${hospitalInfo.phone?.replace(/[^0-9+]/g, '') || '+919840123456'}`}
        className="w-12 h-12 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 rounded-full flex items-center justify-center transition-all hover:scale-105"
        aria-label="Call Skin Care Helpline"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Primary Floating Book Appointment CTA */}
      <button
        onClick={onOpenAppointment}
        className="px-5 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-full shadow-xl shadow-rose-200 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer border border-rose-400"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Glow Session</span>
      </button>

    </div>
  );
};

export default FloatingActions;
