import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  PhoneCall, 
  Mail, 
  Clock, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';

const ContactPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784',
    email: 'info@dermaluxeskin.org',
    address: 'No. 45, DermaLuxe Medical Avenue, Near High Court Junction, Palayamkottai, Tirunelveli, Pin: 627002',
  };

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-10">
      
      <PageHero
        title="Contact & Skin Concierge Helpline"
        subtitle="Connect with our aesthetic counseling desk, schedule dermatologist consultations, or ask questions about laser treatments."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Clinical Concierge Desk</span>
              <h3 className="text-xl font-bold text-slate-950 mt-1 font-heading">Direct Contact Lines</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              {/* Emergency Hotline */}
              <a
                href={`tel:${hospitalInfo.emergencyNumber || '1800-419-6784'}`}
                className="flex items-start space-x-3 p-4 bg-rose-50 text-rose-900 rounded-2xl border border-rose-200 font-bold hover:bg-rose-100 transition-colors"
              >
                <PhoneCall className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 animate-pulse" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-rose-700 font-bold">
                    Skin & Laser Concierge Helpline
                  </span>
                  <span className="text-sm font-black">{hospitalInfo.emergencyNumber || '1800-419-6784'}</span>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Phone className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Appointment Desk</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.phone || '+91 98401 23456'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Mail className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email Desk</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.email || 'info@dermaluxeskin.org'}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Flagship Campus Address</span>
                  <span className="font-medium text-slate-800 leading-snug">
                    {hospitalInfo.address}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <Clock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Working Hours</span>
                  <span className="font-medium text-slate-800">
                    Mon - Sat: 08:30 AM - 08:30 PM (Sun: 09:00 AM - 02:00 PM)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment()}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Priority Appointment</span>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Message Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Online Communication</span>
              <h3 className="text-xl font-bold text-slate-950 mt-1 font-heading">Send Us an Inquiry</h3>
            </div>

            {formSent ? (
              <div className="p-8 text-center space-y-3 bg-rose-50 rounded-2xl border border-rose-200">
                <CheckCircle2 className="w-10 h-10 text-rose-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900 font-heading">Message Dispatched</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you! Our skin counseling team has received your message and will respond within 30 minutes.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-5 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
                >
                  Send Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deepika Sundaram"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Question or Skin Concern</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your skin or hair concern, preferred treatments, or appointment time..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-200 transition-all flex items-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default ContactPage;
