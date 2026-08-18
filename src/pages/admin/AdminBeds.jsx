import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  BedDouble,
  Plus,
  Search,
  CheckCircle2,
  ArrowRightLeft,
  LogOut,
  UserPlus,
  X,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

const AdminBeds = () => {
  const {
    beds,
    wards,
    admitPatientToBed,
    dischargePatientFromBed,
    updateBedStatus,
    transferPatientBed,
    addBed,
    deleteBed,
    doctors
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modals
  const [admitModalBed, setAdmitModalBed] = useState(null);
  const [transferModalBed, setTransferModalBed] = useState(null);
  const [targetTransferBedId, setTargetTransferBedId] = useState('');
  const [showAddBedModal, setShowAddBedModal] = useState(false);

  // Admission Form
  const [admitForm, setAdmitForm] = useState({
    patientName: '',
    patientId: '',
    attendingDoctor: doctors[0]?.name || 'Dr. Jennifer Vance, MD (Dermatology)',
    surgicalProcedure: 'Fractional CO2 Laser & Subcision Protocol',
    notes: ''
  });

  // New Bed Form
  const [newBedForm, setNewBedForm] = useState({
    bedNumber: '',
    ward: 'LASER_SUITE',
    category: 'VIP Laser Dermatology Suite',
    floor: '2nd Floor',
    wing: 'Laser & Aesthetics Wing',
    dailyRate: 3500,
    equipment: 'Alma Soprano Titanium + Zimmer Cryo-6 Chiller',
    notes: 'US-FDA calibrated laser room with HEPA filtration'
  });

  // Calculate Metrics
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === 'occupied').length;
  const availableBeds = beds.filter((b) => b.status === 'available').length;
  const sanitizingBeds = beds.filter((b) => b.status === 'sanitizing').length;
  const maintenanceBeds = beds.filter((b) => b.status === 'maintenance').length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Filtered Beds
  const filteredBeds = beds.filter((b) => {
    const matchWard = selectedWard === 'ALL' || b.ward === selectedWard || b.category === selectedWard;
    const matchStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
    const matchSearch =
      (b.bedNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.patientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.patientId || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.attendingDoctor || '').toLowerCase().includes(search.toLowerCase());
    return matchWard && matchStatus && matchSearch;
  });

  // Open Admit
  const handleOpenAdmit = (bed) => {
    setAdmitModalBed(bed);
    setAdmitForm({
      patientName: '',
      patientId: `DLX-${Math.floor(90000 + Math.random() * 9999)}`,
      attendingDoctor: doctors[0]?.name || 'Dr. Jennifer Vance, MD (Dermatology)',
      surgicalProcedure: bed.condition || 'HydraFacial Elite MD & Glow Session',
      notes: ''
    });
  };

  const handleConfirmAdmission = (e) => {
    e.preventDefault();
    if (!admitModalBed) return;
    admitPatientToBed(admitModalBed.id, {
      ...admitForm,
      condition: admitForm.surgicalProcedure
    });
    setAdmitModalBed(null);
  };

  const handleOpenTransfer = (bed) => {
    setTransferModalBed(bed);
    setTargetTransferBedId('');
  };

  const handleConfirmTransfer = (e) => {
    e.preventDefault();
    if (!transferModalBed || !targetTransferBedId) return;
    transferPatientBed(transferModalBed.id, targetTransferBedId);
    setTransferModalBed(null);
  };

  const handleAddBedSubmit = (e) => {
    e.preventDefault();
    if (!newBedForm.bedNumber) return;
    addBed({
      ...newBedForm,
      id: `suite-${Date.now()}`,
      status: 'available',
      patientName: null,
      patientId: null,
      admissionDate: null,
      attendingDoctor: null
    });
    setShowAddBedModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-black text-slate-950 flex items-center space-x-2 font-heading">
            <BedDouble className="w-5 h-5 text-rose-600" />
            <span>Laser Treatment Suites & Recovery Lounges Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of VIP laser rooms, HydraFacial suites, and post-procedure bio-oxygen lounges.
          </p>
        </div>
        <button
          onClick={() => setShowAddBedModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-sm shadow-rose-200 transition-all flex items-center space-x-1.5 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Suite / Lounge</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Suites</span>
          <p className="text-2xl font-black text-slate-950 font-heading">{totalBeds}</p>
          <span className="text-[10px] text-rose-600 font-semibold">{occupancyRate}% Utilization</span>
        </div>
        <div className="bg-amber-50/60 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-amber-800 uppercase">In-Session</span>
          <p className="text-2xl font-black text-amber-900 font-heading">{occupiedBeds}</p>
          <span className="text-[10px] text-amber-700 font-medium">Active Treatment</span>
        </div>
        <div className="bg-emerald-50/60 p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-emerald-800 uppercase">Ready / Vacant</span>
          <p className="text-2xl font-black text-emerald-900 font-heading">{availableBeds}</p>
          <span className="text-[10px] text-emerald-700 font-medium">Ready for Patient</span>
        </div>
        <div className="bg-rose-50/60 p-5 rounded-3xl border border-rose-200 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-rose-800 uppercase">Disinfection / Prep</span>
          <p className="text-2xl font-black text-rose-900 font-heading">{sanitizingBeds + maintenanceBeds}</p>
          <span className="text-[10px] text-rose-600 font-medium">UV-C Sanitation</span>
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
            placeholder="Search by suite number, client name, UHID, or dermatologist..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 shadow-2xs"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-rose-500 shadow-2xs"
        >
          <option value="ALL">All Suite Statuses</option>
          <option value="available">Ready / Vacant</option>
          <option value="occupied">In-Session</option>
          <option value="sanitizing">Sanitizing</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'occupied';
          const isAvailable = bed.status === 'available';
          const isSanitizing = bed.status === 'sanitizing';

          return (
            <div
              key={bed.id}
              className={`bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-sm ${
                isOccupied
                  ? 'border-amber-300 bg-amber-50/20 hover:border-amber-500'
                  : isAvailable
                  ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-500'
                  : 'border-rose-300 bg-rose-50/20 hover:border-rose-500'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-slate-950 font-heading">{bed.bedNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isOccupied ? 'bg-amber-100 text-amber-800' : isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {bed.status}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-800">{bed.category || bed.ward}</span>
                  <p className="text-[11px] text-slate-500">{bed.floor} • {bed.wing}</p>
                </div>

                {isOccupied ? (
                  <div className="p-3 bg-white rounded-2xl border border-amber-200 space-y-1 text-xs">
                    <p className="font-bold text-slate-900">{bed.patientName} <span className="text-slate-400 font-normal">({bed.patientId})</span></p>
                    <p className="text-rose-600 font-semibold text-[11px]">{bed.condition}</p>
                    <p className="text-slate-500 text-[11px]">Doctor: {bed.attendingDoctor}</p>
                    <p className="text-slate-400 text-[10px]">Admitted: {bed.admissionDate}</p>
                  </div>
                ) : (
                  <div className="p-3 bg-white rounded-2xl border border-slate-100 space-y-1 text-xs text-slate-500">
                    <p className="text-[11px]">Session Rate: <span className="font-bold text-slate-800">₹{bed.dailyRate}</span></p>
                    <p className="text-[10px] text-slate-400">Sterile Procedural Zone</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                {isAvailable ? (
                  <button
                    onClick={() => handleOpenAdmit(bed)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Check-In Client</span>
                  </button>
                ) : isOccupied ? (
                  <>
                    <button
                      onClick={() => dischargePatientFromBed(bed.id)}
                      className="w-1/2 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Complete</span>
                    </button>
                    <button
                      onClick={() => handleOpenTransfer(bed)}
                      className="w-1/2 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Transfer</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'available')}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Sanitized & Ready</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADMISSION MODAL */}
      {admitModalBed && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-950 font-heading">Check In Client to {admitModalBed.bedNumber}</h3>
                <p className="text-xs text-slate-500">{admitModalBed.category}</p>
              </div>
              <button onClick={() => setAdmitModalBed(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdmission} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={admitForm.patientName}
                  onChange={(e) => setAdmitForm({ ...admitForm, patientName: e.target.value })}
                  placeholder="e.g. Suresh Ramachandran"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">UHID / Client ID</label>
                <input
                  type="text"
                  value={admitForm.patientId}
                  onChange={(e) => setAdmitForm({ ...admitForm, patientId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Treatment / Procedure *</label>
                <input
                  type="text"
                  required
                  value={admitForm.surgicalProcedure}
                  onChange={(e) => setAdmitForm({ ...admitForm, surgicalProcedure: e.target.value })}
                  placeholder="e.g. HydraFacial Elite MD & Glow Session"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Consulting Dermatologist</label>
                <select
                  value={admitForm.attendingDoctor}
                  onChange={(e) => setAdmitForm({ ...admitForm, attendingDoctor: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setAdmitModalBed(null)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer"
                >
                  Confirm Check-In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSFER MODAL */}
      {transferModalBed && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-950 font-heading">Transfer {transferModalBed.patientName}</h3>
                <p className="text-xs text-slate-500">From {transferModalBed.bedNumber}</p>
              </div>
              <button onClick={() => setTransferModalBed(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Destination Suite *</label>
                <select
                  required
                  value={targetTransferBedId}
                  onChange={(e) => setTargetTransferBedId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="">-- Choose Available Suite --</option>
                  {beds.filter((b) => b.status === 'available').map((b) => (
                    <option key={b.id} value={b.id}>{b.bedNumber} ({b.category || b.ward})</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setTransferModalBed(null)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!targetTransferBedId}
                  className="w-1/2 py-2.5 bg-rose-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Complete Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SUITE MODAL */}
      {showAddBedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950 font-heading">Add New Laser Suite / Lounge</h3>
              <button onClick={() => setShowAddBedModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBedSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Suite / Room Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUITE-205 or LOUNGE-402"
                  value={newBedForm.bedNumber}
                  onChange={(e) => setNewBedForm({ ...newBedForm, bedNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Suite Category *</label>
                <select
                  value={newBedForm.ward}
                  onChange={(e) => setNewBedForm({ ...newBedForm, ward: e.target.value, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  <option value="LASER_SUITE">VIP Laser Dermatology Suite</option>
                  <option value="HYDRAFACIAL_LOUNGE">HydraFacial MD & Glow Suite</option>
                  <option value="TRICHOLOGY_OT">Sapphire FUE & Hair Transplant OT</option>
                  <option value="OXYGEN_LOUNGE">Bio-Oxygen Recovery Lounge</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Floor</label>
                  <input
                    type="text"
                    value={newBedForm.floor}
                    onChange={(e) => setNewBedForm({ ...newBedForm, floor: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Session Rate (₹)</label>
                  <input
                    type="number"
                    value={newBedForm.dailyRate}
                    onChange={(e) => setNewBedForm({ ...newBedForm, dailyRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddBedModal(false)}
                  className="w-1/2 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-xl shadow-sm shadow-rose-200 cursor-pointer"
                >
                  Create Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBeds;
