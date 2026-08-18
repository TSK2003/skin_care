import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { MapPin, Plus, Pencil, Trash2, X, Save, Search, Sparkles } from 'lucide-react';

const AdminBranches = () => {
  const { branches, addBranch, updateBranch, deleteBranch } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', city: '', address: '', mobile: '', phone: '', email: '', timings: '', timing: '', image: '', facilities: [], features: [] });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [facilitiesText, setFacilitiesText] = useState('');

  const filtered = branches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()) || (b.city && b.city.toLowerCase().includes(search.toLowerCase())));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      name: '', 
      city: 'Tirunelveli', 
      address: '', 
      mobile: '+91 98401 23456', 
      phone: '+91 98401 23456', 
      email: 'info@dermaluxeskin.org', 
      timing: 'Mon - Sat: 08:30 AM - 08:30 PM (Sun: 09:00 AM - 02:00 PM)', 
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80', 
      facilities: [] 
    }); 
    setFacilitiesText(''); 
    setShowForm(true); 
  };

  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item }); 
    setFacilitiesText((item.features || item.facilities || []).join(', ')); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const facilities = facilitiesText.split(',').map((f) => f.trim()).filter(Boolean);
    const updatedData = { 
      ...form, 
      facilities, 
      features: facilities,
      phone: form.phone || form.mobile,
      timing: form.timing || form.timings
    };
    if (editingId) { 
      updateBranch(editingId, updatedData); 
    } else { 
      addBranch(updatedData); 
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteBranch(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <MapPin className="w-5 h-5 text-rose-600" />
            <span>Dermatology Clinics & Aesthetic Lounges</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage clinic locations, laser suites, and consultation hours (Total: {branches.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-rose-200">
          <Plus className="w-4 h-4" /><span>Add Skin Clinic</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search dermatology clinics and cities..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((branch) => (
          <div key={branch.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="h-44 w-full bg-slate-950 overflow-hidden">
              <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-6 space-y-2 flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-950 font-heading leading-snug">{branch.name}</h3>
                  <span className="text-[11px] text-rose-600 font-semibold">{branch.city}</span>
                </div>
                <div className="flex items-center space-x-1 shrink-0">
                  <button onClick={() => openEdit(branch)} className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(branch.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-600">{branch.address}</p>
              <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                <p>Phone: <span className="font-semibold text-slate-800">{branch.phone || branch.mobile}</span></p>
                <p>Hours: <span className="font-medium text-slate-700">{branch.timing || branch.timings}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Clinic Profile' : 'Add New Skin Clinic'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinic / Lounge Name *</label>
                <input
                  type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. DermaLuxe Flagship Laser Lounge" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Region *</label>
                  <input
                    type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Helpline Phone *</label>
                  <input
                    type="text" required value={form.phone || form.mobile} onChange={(e) => setForm({ ...form, phone: e.target.value, mobile: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Address *</label>
                <input
                  type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text" value={form.timing || form.timings} onChange={(e) => setForm({ ...form, timing: e.target.value, timings: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Features (comma separated)</label>
                <input
                  type="text" value={facilitiesText} onChange={(e) => setFacilitiesText(e.target.value)}
                  placeholder="e.g. Alma Soprano Laser, HydraFacial Suite, VISIA 3D Lab"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer">
                  Save Clinic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <h4 className="text-sm font-bold text-slate-900">Delete Clinic Location?</h4>
            <p className="text-xs text-slate-500">Are you sure you want to remove this clinic?</p>
            <div className="flex space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="w-1/2 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBranches;
