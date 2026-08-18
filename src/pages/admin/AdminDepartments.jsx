import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Layers3, Plus, Pencil, Trash2, X, Save, Search, Sparkles } from 'lucide-react';

const AdminDepartments = () => {
  const { services, addService, updateService, deleteService } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', shortDesc: '', about: '', heroImage: '' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { 
    setEditingId(null); 
    setForm({ 
      title: '', 
      slug: '', 
      shortDesc: '', 
      about: '', 
      heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80' 
    }); 
    setShowForm(true); 
  };
  
  const openEdit = (item) => { 
    setEditingId(item.id); 
    setForm({ ...item }); 
    setShowForm(true); 
  };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingId) { 
      updateService(editingId, { ...form, slug }); 
    } else { 
      addService({ 
        ...form, 
        slug, 
        treatments: [], 
        benefits: [], 
        doctors: [], 
        faqs: [] 
      }); 
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    deleteService(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <Layers3 className="w-5 h-5 text-rose-600" />
            <span>Clinical Dermatology Specialties & Laser Treatments</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage clinical skin procedures, laser therapies, and aesthetic indications (Total: {services.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-rose-200">
          <Plus className="w-4 h-4" />
          <span>Add Specialty / Treatment</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search dermatology specialties and laser procedures..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((svc) => (
          <div key={svc.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3 hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm text-slate-950 font-heading leading-snug">{svc.title}</h3>
                <div className="flex items-center space-x-1">
                  <button onClick={() => openEdit(svc)} className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(svc.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{svc.shortDesc}</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-medium text-rose-600">/services/{svc.slug}</span>
              {svc.treatments && <span>{svc.treatments.length} key steps</span>}
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
                {editingId ? 'Edit Procedure' : 'Add New Procedure / Specialty'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Procedure Title *</label>
                <input
                  type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. HydraFacial Elite MD & Glow Protocol" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
                <input
                  type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="e.g. hydrafacial-md-glow" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary *</label>
                <input
                  type="text" required value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  placeholder="Brief 1-2 sentence description" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Image URL</label>
                <input
                  type="text" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Clinical Overview</label>
                <textarea
                  rows="3" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                ></textarea>
              </div>

              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer">
                  Save Specialty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <h4 className="text-sm font-bold text-slate-900">Delete Procedure?</h4>
            <p className="text-xs text-slate-500">Are you sure you want to remove this procedure?</p>
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

export default AdminDepartments;
