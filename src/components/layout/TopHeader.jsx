import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, Clock, HelpCircle, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const TopHeader = ({ onOpenEnquiry }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784',
    email: 'info@dermaluxeskin.org',
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
        
        {/* Left: Skin Concierge & Contact */}
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
          <a
            href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`}
            className="flex items-center space-x-1.5 font-bold text-rose-400 hover:text-rose-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Skin & Laser Concierge Helpline: {hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
          </a>

          <a
            href={`mailto:${hospitalInfo.email || 'info@dermaluxeskin.org'}`}
            className="hidden md:flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{hospitalInfo.email || 'info@dermaluxeskin.org'}</span>
          </a>
        </div>

        {/* Right: OPD, Accreditation & Quick Actions */}
        <div className="flex items-center space-x-3 ml-auto sm:ml-0">
          <div className="hidden lg:flex items-center space-x-1.5 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Clinics: Mon - Sat 8:30 AM - 8:30 PM | Sunday: 9:00 AM - 2:00 PM</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-slate-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>US-FDA Approved & Board-Certified</span>
          </div>

          <button
            onClick={onOpenEnquiry}
            className="flex items-center space-x-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg text-xs transition-colors cursor-pointer border border-slate-700"
          >
            <HelpCircle className="w-3 h-3 text-rose-400" />
            <span>Skin Query / Cost</span>
          </button>

          <Link
            to="/login"
            className="flex items-center space-x-1 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs transition-colors shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Portal Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TopHeader;
