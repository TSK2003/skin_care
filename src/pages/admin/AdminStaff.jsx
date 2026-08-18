import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const shiftOptions = [
  'Morning Laser Shift (08:30 - 15:30)',
  'Evening Aesthetic Shift (13:30 - 20:30)',
  'Trichology OT Shift (08:00 - 17:00)',
  'General OPD Shift (09:00 - 18:00)',
  'Weekend VIP Glow Shift'
];

const categoryOptions = [
  'Dermatologist',
  'Aesthetic Therapist',
  'Laser Operator / Nurse',
  'Concierge & Front Desk'
];

const emptyStaff = {
  empId: '',
  name: '',
  category: 'Dermatologist',
  role: '',
  department: 'Laser Dermatology & Aesthetic Medicine',
  assignedWard: 'Laser Procedure Suite 1',
  shift: 'Morning Laser Shift (08:30 - 15:30)',
  dutyStatus: 'On Duty',
  phone: '',
  email: '',
  qualification: ''
};

const AdminStaff = () => {
  const {
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    updateStaffDutyStatus,
    updateStaffShift
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDutyStatus, setSelectedDutyStatus] = useState('ALL');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyStaff });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Workforce Metrics
  const totalStaff = staff.length;
  const onDutyCount = staff.filter((s) => s.dutyStatus === 'On Duty').length;
  const offDutyCount = staff.filter((s) => s.dutyStatus === 'Off Duty').length;
  const onLeaveCount = staff.filter((s) => s.dutyStatus === 'On Leave').length;

  // Filtered List
  const filteredStaff = staff.filter((s) => {
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchStatus = selectedDutyStatus === 'ALL' || s.dutyStatus === selectedDutyStatus;
    const matchSearch =
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.empId || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.role || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.department || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.assignedWard || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      ...emptyStaff,
      empId: `DLX-EMP-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return;

    if (editingId) {
      updateStaff(editingId, form);
    } else {
      addStaff({
        ...form,
        id: `staff-${Date.now()}`
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteStaff(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <Users className="w-5 h-5 text-rose-600" />
            <span>Dermatologists, Laser Nurses & Clinic Staff Workforce</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time management of aesthetic therapists, laser operators, trichologists, and duty rosters.
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-rose-200 transition-all flex items-center space-x-1.5 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Workforce KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Clinical Staff</span>
          <p className="text-2xl font-black text-slate-950 font-heading">{totalStaff}</p>
          <span className="text-[10px] text-rose-600 font-semibold">Institute Roster</span>
        </div>
        <div className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 uppercase">On Duty</span>
          <p className="text-2xl font-black text-emerald-900 font-heading">{onDutyCount}</p>
          <span className="text-[10px] text-emerald-700 font-medium">In Treatment Suites</span>
        </div>
        <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Off Duty</span>
          <p className="text-2xl font-black text-slate-800 font-heading">{offDutyCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">Next Shift Scheduled</span>
        </div>
        <div className="bg-amber-50/60 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase">On Leave</span>
          <p className="text-2xl font-black text-amber-900 font-heading">{onLeaveCount}</p>
          <span className="text-[10px] text-amber-700 font-medium">Approved Leave</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, employee ID, role, or treatment suite..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs"
          />
        </div>
        <select
          value={selectedDutyStatus}
          onChange={(e) => setSelectedDutyStatus(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-rose-500 shadow-2xs"
        >
          <option value="ALL">All Duty Statuses</option>
          <option value="On Duty">On Duty</option>
          <option value="Off Duty">Off Duty</option>
          <option value="On Leave">On Leave</option>
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200 font-bold text-slate-700 uppercase text-[10px] tracking-wider">
                <th className="px-5 py-3.5">Emp ID & Name</th>
                <th className="px-5 py-3.5">Role & Category</th>
                <th className="px-5 py-3.5">Specialty & Assigned Unit</th>
                <th className="px-5 py-3.5">Current Shift</th>
                <th className="px-5 py-3.5">Duty Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono text-[10px] text-rose-600 font-bold block">{s.empId}</span>
                    <span className="font-bold text-slate-900">{s.name}</span>
                    {s.qualification && <span className="text-[10px] text-slate-400 block">{s.qualification}</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-800 block">{s.role}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-0.5">{s.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-slate-700 font-medium block">{s.department}</span>
                    <span className="text-[11px] text-rose-600 font-semibold">{s.assignedWard}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-slate-600">{s.shift}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={s.dutyStatus}
                      onChange={(e) => updateStaffDutyStatus(s.id, e.target.value)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border ${
                        s.dutyStatus === 'On Duty'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : s.dutyStatus === 'On Leave'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <option value="On Duty">On Duty</option>
                      <option value="Off Duty">Off Duty</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => openEdit(s)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(s.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* STAFF EDIT/ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">
                {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Employee ID *</label>
                  <input
                    type="text"
                    required
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Claire Moreau"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Aesthetic Physician"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. MD, FAM (France)"
                    value={form.qualification}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specialty Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Suite / Unit</label>
                  <input
                    type="text"
                    value={form.assignedWard}
                    onChange={(e) => setForm({ ...form, assignedWard: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Shift</label>
                <select
                  value={form.shift}
                  onChange={(e) => setForm({ ...form, shift: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  {shiftOptions.map((sh) => (
                    <option key={sh} value={sh}>{sh}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer"
                >
                  Save Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-center">
            <h4 className="text-sm font-bold text-slate-900">Remove Staff Member?</h4>
            <p className="text-xs text-slate-500">Are you sure you want to remove this staff profile from the system?</p>
            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="w-1/2 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="w-1/2 py-2 bg-red-600 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminStaff;
