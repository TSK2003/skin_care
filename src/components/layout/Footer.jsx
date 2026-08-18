import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  PhoneCall, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    tagline: 'Institute of Advanced Dermatology, Laser & Aesthetic Medicine',
    fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology',
    description: 'DermaLuxe is an internationally accredited Center of Excellence in US-FDA Approved Laser Dermatology, HydraFacial MD®, Fractional CO2 Scar Resurfacing, Facial Harmonization, and Sapphire FUE Hair Restoration.',
    email: 'info@dermaluxeskin.org',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784',
    address: 'No. 45, DermaLuxe Medical Avenue, Near High Court Junction, Palayamkottai, Tirunelveli, Pin: 627002',
  };
  const servicesList = adminContext?.services || defaultServices;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-950">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block uppercase font-heading">
                  {hospitalInfo.name || 'DERMALUXE'}
                </span>
                <span className="text-[10px] font-bold text-rose-400 tracking-wider uppercase block -mt-0.5">
                  {hospitalInfo.tagline || 'Institute of Dermatology & Laser Aesthetics'}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {hospitalInfo.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>US-FDA Approved Aesthetic Technology</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Board-Certified MD Dermatologists</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home Page' },
                { to: '/branches', label: 'Skin Clinics & Lounges' },
                { to: '/technologies', label: 'Laser & Energy Devices' },
                { to: '/health-center/master-health-checkup', label: 'Bridal & Glow Packages' },
                { to: '/blog', label: 'Dermatology Journal' },
                { to: '/about', label: 'About DermaLuxe Institute' },
                { to: '/insurances', label: '0% EMI & Financing' },
                { to: '/contact', label: 'Contact & Appointments' },
                { to: '/admin-panel-login', label: 'Doctor & Staff Admin Login' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Dermatological Procedures */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Aesthetic Procedures
            </h4>
            <ul className="space-y-2">
              {servicesList.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & 24/7 Helpline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 font-heading">
              Concierge & Clinics
            </h4>
            <div className="space-y-2.5">
              <a href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`} className="flex items-center space-x-2 text-rose-400 hover:text-rose-300 font-bold bg-rose-950/40 p-2.5 rounded-xl border border-rose-900/50">
                <PhoneCall className="w-4 h-4 shrink-0 animate-pulse" />
                <span>Concierge: {hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
              </a>

              <div className="flex items-start space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.phone || '+91 98401 23456'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.email || 'info@dermaluxeskin.org'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{hospitalInfo.address}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                <span>Mon - Sat 8:30 AM - 8:30 PM (Sun 9:00 AM - 2:00 PM)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-slate-500 gap-y-2 text-[11px]">
          <div>
            © {new Date().getFullYear()} {hospitalInfo.fullName || `${hospitalInfo.name} Advanced Institute of Dermatology, Laser Aesthetics & Trichology`}. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Laser Safety Charter</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Authentic Injectables Seal</a>
            <Link to="/admin-panel-login" className="hover:text-rose-400 transition-colors">Doctor Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
