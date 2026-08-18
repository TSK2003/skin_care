import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Building2, Save, RotateCcw, Sparkles } from 'lucide-react';

const AdminHospitalInfo = () => {
  const { hospitalInfo, updateHospitalInfo } = useAdmin();
  const [form, setForm] = useState({ ...hospitalInfo });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateHospitalInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
          <Building2 className="w-5 h-5 text-rose-600" />
          <span>Clinic Profile & Skin Concierge Helpline Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Edit global clinic branding, aesthetic counseling helpline details, and flagship campus address.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { key: 'name', label: 'Clinic Brand Name', placeholder: 'DERMALUXE' },
            { key: 'tagline', label: 'Tagline', placeholder: 'Advanced Institute of Dermatology, Laser Aesthetics & Trichology' },
            { key: 'fullName', label: 'Full Official Entity Name', placeholder: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology' },
            { key: 'email', label: 'Primary Contact Email', placeholder: 'info@dermaluxeskin.org' },
            { key: 'phone', label: 'Appointment Desk Phone', placeholder: '+91 98401 23456' },
            { key: 'emergencyNumber', label: 'Concierge Helpline', placeholder: '1800-419-6784' },
            { key: 'whatsappNumber', label: 'WhatsApp Helpline Number', placeholder: '919840123456' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block font-bold text-slate-700 mb-1">{f.label}</label>
              <input
                type="text"
                value={form[f.key] || ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-rose-500 focus:bg-white"
              />
            </div>
          ))}
        </div>

        <div className="text-xs">
          <label className="block font-bold text-slate-700 mb-1">Flagship Campus Address</label>
          <textarea
            rows={2}
            value={form.address || ''}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Main institute street address, landmark, city, and pincode..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
          />
        </div>

        <div className="text-xs">
          <label className="block font-bold text-slate-700 mb-1">About / Overview Paragraph</label>
          <textarea
            rows={3}
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Official institutional overview displayed in footer and about sections..."
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-rose-500 focus:bg-white resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setForm({ ...hospitalInfo })}
            className="px-3.5 py-2 text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Saved</span>
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer shadow-md shadow-rose-200 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? 'Saved Successfully' : 'Save Clinic Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHospitalInfo;
