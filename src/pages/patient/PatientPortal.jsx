import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  FileText, 
  LogOut, 
  Phone, 
  ShieldCheck, 
  AlertCircle,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';

const PatientPortal = ({ onOpenAppointment }) => {
  const navigate = useNavigate();
  const { appointments, hospitalInfo } = useAdmin();

  // Active patient session (demo)
  const patientData = {
    name: 'Karthick S',
    phone: '+91 63807 67265',
    email: 'karthick@example.com',
    age: '28 Yrs',
    bloodGroup: 'O+ Positive',
    uhid: 'UHID-DLX-88492',
    skinType: 'Fitzpatrick III • Combination Skin',
    activeProtocol: 'Fractional CO2 Laser & Barrier Hydration Protocol'
  };

  // Find appointments related to this patient or fallback
  const patientAppointments = appointments.length > 0 ? appointments : [
    {
      appointmentId: 'DLX001',
      token: 'DLX001',
      patientName: 'Karthick S',
      doctorName: 'Dr. Jennifer Vance, MD (Dermatology)',
      department: 'Laser Dermatology & Scar Revision',
      date: '2026-08-19',
      time: '10:30 AM',
      sessionType: 'HydraFacial MD & VISIA Complexion Review',
      fee: 800,
      paymentMethod: 'Instant UPI (Paid)',
      status: 'confirmed',
      branchName: 'DermaLuxe Flagship Institute & Laser Lounge'
    }
  ];

  const [activeSlip, setActiveSlip] = useState(patientAppointments[0] || null);

  // Prescribed Daily Skincare & Post-Laser Regimen
  const prescribedRegimen = [
    { step: 'Step 1 • Morning', name: 'Ceramide Barrier Cleanser', detail: 'Gentle pH 5.5 non-foaming wash with lukewarm water', status: 'Completed AM' },
    { step: 'Step 2 • Morning', name: 'Stabilized Vitamin C 15% + Ferulic', detail: '4 drops on clean face for antioxidant defense', status: 'Completed AM' },
    { step: 'Step 3 • Morning', name: 'Broad-Spectrum Mineral Sunscreen SPF 50+ PA++++', detail: 'Reapply every 3 hours under direct daylight', status: 'Active All Day' },
    { step: 'Step 4 • Night', name: 'Centella Asiatica & Multi-Peptide Barrier Balm', detail: 'Apply generous layer before sleep to seal moisture', status: 'Pending PM' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSlip = (apt) => {
    const text = `
=====================================================
    DERMALUXE INSTITUTE OF ADVANCED DERMATOLOGY
           OFFICIAL CLINICAL CONSULTATION SLIP
=====================================================
TOKEN NUMBER       : ${apt.appointmentId || apt.token}
PATIENT UHID       : ${patientData.uhid}
PATIENT NAME       : ${apt.patientName || patientData.name}
PHONE NUMBER       : ${apt.mobileNumber || patientData.phone}
AGE / SKIN TYPE    : ${patientData.age} / ${patientData.skinType}
-----------------------------------------------------
SPECIALTY DEPT     : ${apt.department}
CONSULTANT DOCTOR  : ${apt.doctorName}
TREATMENT / REASON : ${apt.sessionType || 'Clinical Skin Review'}
APPOINTMENT DATE   : ${apt.date}
TIME SLOT          : ${apt.time || apt.timeSlot}
CAMPUS LOCATION    : ${apt.branchName || 'DermaLuxe Flagship Lounge'}
-----------------------------------------------------
CONSULTATION FEE   : Rs. ${apt.fee || 800} (CONFIRMED)
PAYMENT MODE       : ${apt.paymentMethod || 'UPI / Counter'}
STATUS             : CONFIRMED (PRIORITY CLINICAL QUEUE)
-----------------------------------------------------
CLINIC HELPLINE    : 1800-419-6784
CONCIERGE DESK     : ${hospitalInfo?.phone || '+91 98401 23456'}
=====================================================
Please arrive 10 minutes prior with bare skin for VISIA 3D imaging.
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DermaLuxe-Token-${apt.appointmentId || apt.token}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20 text-slate-800 antialiased">
      {/* Top Patient Header Bar */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-base tracking-tight text-white">
                DermaLuxe<span className="text-rose-400">.Patient</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase rounded-md border border-rose-500/30">
              Skin Health Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white leading-tight">{patientData.name}</p>
              <p className="text-[10px] text-rose-300 font-mono">{patientData.uhid}</p>
            </div>
            
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Return to Main Website"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-slate-950 via-rose-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-rose-900/40 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-xs font-bold border border-rose-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>Verified Patient Account</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Welcome back, {patientData.name}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Active Protocol: <span className="text-white font-semibold">{patientData.activeProtocol}</span>. Your upcoming appointments and daily dermatologist regimens are updated below.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onOpenAppointment && onOpenAppointment()}
                className="px-5 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Follow-Up / Glow Session</span>
              </button>

              <a
                href="tel:1800-419-6784"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4 text-rose-400" />
                <span>Concierge Desk: 1800-419-6784</span>
              </a>
            </div>

          </div>
        </div>

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 7 COLS: Appointments & Slips */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Appointment Tokens List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-950 font-heading">Upcoming Appointments & Token Slips</h2>
                    <p className="text-[11px] text-slate-500">Live tokens for outpatient consultations and laser sessions</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                  {patientAppointments.length} Active
                </span>
              </div>

              <div className="space-y-4">
                {patientAppointments.map((apt, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveSlip(apt)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      activeSlip?.appointmentId === apt.appointmentId || activeSlip?.token === apt.token
                        ? 'border-rose-500 bg-rose-50/20 shadow-md ring-2 ring-rose-500/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 bg-rose-600 text-white font-mono font-extrabold text-xs rounded-md shadow-2xs">
                          {apt.appointmentId || apt.token || `DLX${idx+1}`}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase rounded-md">
                          {apt.status || 'Confirmed'}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {apt.doctorName || 'Lead Dermatologist'}
                      </h3>
                      <p className="text-xs text-rose-600 font-semibold">{apt.department || 'Dermatology'}</p>
                      
                      <div className="flex items-center space-x-3 text-xs text-slate-600 pt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.time || apt.timeSlot || '10:30 AM'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <span className="text-sm font-bold text-slate-950 font-mono">
                        ₹ {apt.fee || 800}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlip(apt);
                        }}
                        className="px-3.5 py-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                      >
                        View Slip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Skin Regimen & Care Protocols */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-950 font-heading">
                    Prescribed Skincare Regimen & Post-Care
                  </h3>
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Dr. Jennifer Vance Prescribed
                </span>
              </div>

              <div className="space-y-3">
                {prescribedRegimen.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-rose-700 uppercase bg-rose-50 px-2 py-0.5 rounded-md">
                          {item.step}
                        </span>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                      </div>
                      <p className="text-slate-500 text-[11px]">{item.detail}</p>
                    </div>

                    <span className="px-2 py-1 bg-white border border-slate-200 text-[10px] font-bold text-slate-700 rounded-md shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Printable Official Slip & Vitals */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* OFFICIAL PRINTABLE CONSULTATION SLIP */}
            {activeSlip && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-500/30 shadow-xl space-y-5 print:p-0 print:border-none print:shadow-none">
                
                <div className="text-center space-y-1 border-b border-slate-200 pb-4">
                  <span className="px-2.5 py-0.5 bg-rose-50 text-rose-800 text-[10px] font-bold uppercase tracking-wider rounded-full border border-rose-200">
                    Official Appointment Token
                  </span>
                  <h3 className="text-base font-extrabold text-slate-950 font-heading">
                    DermaLuxe Institute of Dermatology
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {activeSlip.branchName || 'DermaLuxe Flagship Lounge'}
                  </p>
                </div>

                <div className="bg-slate-950 text-white rounded-2xl p-4 text-center space-y-1 shadow-inner">
                  <span className="text-[10px] text-rose-300 font-bold uppercase tracking-wider block">
                    Your Queue Token Number
                  </span>
                  <span className="text-3xl font-black font-mono tracking-widest text-rose-400">
                    {activeSlip.appointmentId || activeSlip.token || 'DLX001'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Show this slip at the concierge reception
                  </span>
                </div>

                {/* Slip Details Grid */}
                <div className="space-y-2 text-xs divide-y divide-slate-100">
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Patient UHID</span>
                    <span className="font-mono font-bold text-slate-900">{patientData.uhid}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Patient Name</span>
                    <span className="font-bold text-slate-900">{activeSlip.patientName || patientData.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Skin Type</span>
                    <span className="font-bold text-slate-900">{patientData.skinType}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Consulting Doctor</span>
                    <span className="font-bold text-rose-700">{activeSlip.doctorName || 'Dr. Jennifer Vance'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Treatment / Dept</span>
                    <span className="font-bold text-slate-900">{activeSlip.department || 'Laser Dermatology'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Date & Time</span>
                    <span className="font-bold text-slate-900">{activeSlip.date} at {activeSlip.time || activeSlip.timeSlot || '10:30 AM'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400 font-medium">Consultation Fee</span>
                    <span className="font-bold text-emerald-700">₹ {activeSlip.fee || 800} (CONFIRMED)</span>
                  </div>
                </div>

                {/* Slip Action Buttons */}
                <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-3 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>

                  <button
                    onClick={() => handleDownloadSlip(activeSlip)}
                    className="py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>

              </div>
            )}

            {/* VISIA 3D Skin Diagnostics Summary */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  VISIA® 3D Skin Health Score
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-medium">Skin Hydration</p>
                  <p className="text-lg font-black text-rose-600">88%</p>
                  <span className="text-[9px] text-emerald-600 font-bold">+12% vs Baseline</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-medium">Porphyrins / Bacteria</p>
                  <p className="text-lg font-black text-emerald-600">&lt; 8%</p>
                  <span className="text-[9px] text-emerald-600 font-bold">Clear Complexion</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-medium">UV Spot Protection</p>
                  <p className="text-lg font-black text-blue-600">92%</p>
                  <span className="text-[9px] text-slate-500">SPF Shield Active</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-medium">Biological Skin Age</p>
                  <p className="text-lg font-black text-rose-600">24 Yrs</p>
                  <span className="text-[9px] text-emerald-600 font-bold">-4 Yrs Younger</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default PatientPortal;
