import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { UserRound, Plus, Pencil, Trash2, X, Save, Search, Sparkles } from 'lucide-react';

const emptyDoctor = {
  name: '', 
  qualification: 'MD (Dermatology), DNB, FAM (Germany)', 
  department: 'Laser Dermatology & Aesthetic Medicine', 
  branchId: 'flagship-campus', 
  experience: '12+ Years',
  image: 'https://images.unsplash.com/photo-1594824813566-88855ce783d1?auto=format&fit=crop&w=800&q=80',
  bio: 'Specialist in Fractional CO2 lasers, acne scar revision, and facial aesthetics.', 
  timing: 'Mon - Sat: 09:30 AM - 01:30 PM',
};

const AdminDoctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, branches } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyDoctor });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyDoctor });
    setShowForm(true);
  };

  const openEdit = (doc) => {
    setEditingId(doc.id);
    setForm({ ...doc });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateDoctor(editingId, form);
    } else {
      addDoctor(form);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteDoctor(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <UserRound className="w-5 h-5 text-rose-600" />
            <span>Board-Certified Dermatologists Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage consultant dermatologists, qualifications, fellowships, and OPD consultation hours (Total: {doctors.length})</p>
        </div>
        <button onClick={openAdd} className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm shadow-rose-200">
          <Plus className="w-4 h-4" />
          <span>Add Dermatologist</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by doctor name or dermatology subspecialty..."
          className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Consultant Dermatologist</th>
                <th className="px-5 py-3.5">Specialty</th>
                <th className="px-5 py-3.5">Qualifications</th>
                <th className="px-5 py-3.5">Experience</th>
                <th className="px-5 py-3.5">OPD Timing</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={doc.image} alt={doc.name} className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0" />
                      <div>
                        <div className="font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {doc.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-rose-600">{doc.department}</td>
                  <td className="px-5 py-4 text-slate-600">{doc.qualification}</td>
                  <td className="px-5 py-4 text-slate-700 font-medium">{doc.experience}</td>
                  <td className="px-5 py-4 text-slate-600">{doc.timing}</td>
                  <td className="px-5 py-4 text-right space-x-1.5">
                    <button onClick={() => openEdit(doc)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteConfirm(doc.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Dermatologist Profile' : 'Add New Dermatologist'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Name *</label>
                <input
                  type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dr. Jennifer Vance, MD" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialty Department *</label>
                  <input
                    type="text" required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience *</label>
                  <input
                    type="text" required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualifications & Fellowships *</label>
                <input
                  type="text" required value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">OPD Timing Schedule</label>
                <input
                  type="text" value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Image URL</label>
                <input
                  type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Biography</label>
                <textarea
                  rows="3" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl resize-none"
                ></textarea>
              </div>

              <div className="pt-3 flex space-x-2">
                <button type="button" onClick={() => setShowForm(false)} className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <h4 className="text-sm font-bold text-slate-900">Delete Doctor Profile?</h4>
            <p className="text-xs text-slate-500">Are you sure you want to remove this doctor from the portal?</p>
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

export default AdminDoctors;
