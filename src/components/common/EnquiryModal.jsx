import React, { useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'HydraFacial MD & Glow Package Cost',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-100">
        <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 p-5 text-white flex justify-between items-center border-b border-rose-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 bg-rose-900/80 text-rose-300 rounded text-[10px] font-bold uppercase tracking-wider mb-0.5">
                Skin & Laser Enquiry
              </span>
              <h3 className="text-base font-bold font-heading">Treatment Pricing & Quick Query</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">Enquiry Successfully Received</h4>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
              Thank you! Our Senior Skin Care Concierge will reach out to you within 30 minutes at <span className="font-bold text-rose-600">{formData.phone}</span> with custom treatment plans and doctor availability.
            </p>
            <button
              onClick={handleReset}
              className="mt-3 px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors cursor-pointer shadow-md shadow-rose-200"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98401 23456"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white text-xs"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Treatment or Query Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white text-xs"
              >
                <option value="HydraFacial MD & Glow Package Cost">HydraFacial MD & Glow Package Cost</option>
                <option value="Fractional CO2 Laser Acne Scar Revision">Fractional CO2 Laser Acne Scar Revision</option>
                <option value="Alma Soprano Titanium Laser Hair Removal">Alma Soprano Titanium Laser Hair Removal</option>
                <option value="Q-Switched Laser & Melasma Pigmentation">Q-Switched Laser & Melasma Pigmentation</option>
                <option value="GFC & PRP Hair Regrowth Therapy">GFC & PRP Hair Regrowth Therapy</option>
                <option value="Botox, Dermal Fillers & Face Lifting">Botox, Dermal Fillers & Face Lifting</option>
                <option value="0% Interest EMI & Package Financing">0% Interest EMI & Package Financing</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Describe Your Concern / Question</label>
              <textarea
                rows="3"
                placeholder="Mention skin/hair concern, previous treatments, or preferred appointment days..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white resize-none text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 text-xs font-semibold hover:text-slate-900 cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md shadow-rose-200 transition-all cursor-pointer"
              >
                <span>Request Price & Callback</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
