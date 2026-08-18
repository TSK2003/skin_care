import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Printer, 
  FileText, 
  CreditCard, 
  Send, 
  MessageSquare, 
  AlertCircle, 
  QrCode, 
  Sparkles,
  Heart
} from 'lucide-react';
import { branchesList as fallbackBranches } from '../../data/branchesData';
import { chiefDoctorsList as fallbackDoctors } from '../../data/doctorsData';
import { servicesList as fallbackServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const AppointmentModal = ({ isOpen, onClose, initialData = {} }) => {
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || fallbackBranches;
  const chiefDoctorsList = adminContext?.doctors || fallbackDoctors;
  const servicesList = adminContext?.services || fallbackServices;
  const appointments = adminContext?.appointments || [];
  const addAppointment = adminContext?.addAppointment;
  const hospitalInfo = adminContext?.hospitalInfo || { 
    name: 'DermaLuxe', 
    fullName: 'DermaLuxe Advanced Institute of Dermatology, Laser Aesthetics & Trichology',
    phone: '+91 98401 23456',
    emergencyNumber: '1800-419-6784'
  };

  // Helper to filter dermatologists based on selected treatment
  const filterDoctorsByDept = (deptName) => {
    if (!deptName) return chiefDoctorsList;
    const lowerDept = deptName.toLowerCase();
    
    const matched = chiefDoctorsList.filter((doc) => {
      const docDept = (doc.department || '').toLowerCase();
      const docBio = (doc.bio || '').toLowerCase();
      return docDept.includes(lowerDept) || lowerDept.includes(docDept) ||
        (lowerDept.includes('laser') && docDept.includes('laser')) ||
        (lowerDept.includes('hydra') && (docDept.includes('aesthetic') || docDept.includes('laser'))) ||
        (lowerDept.includes('hair') && (docDept.includes('trichology') || docDept.includes('hair'))) ||
        (lowerDept.includes('prp') && docDept.includes('trichology')) ||
        (lowerDept.includes('botox') && docDept.includes('aesthetic')) ||
        (lowerDept.includes('filler') && docDept.includes('aesthetic')) ||
        (lowerDept.includes('peel') && (docDept.includes('laser') || docDept.includes('clinical'))) ||
        (lowerDept.includes('scar') && (docDept.includes('dermatosurgery') || docDept.includes('laser')));
    });

    if (matched.length > 0) return matched;
    return chiefDoctorsList;
  };

  // Check if a specific time slot is already booked
  const isSlotBooked = (doctorName, date, slot) => {
    return appointments.some((apt) => {
      const docMatch = (apt.doctorName || '').toLowerCase().trim() === (doctorName || '').toLowerCase().trim();
      const dateMatch = (apt.date || '').trim() === (date || '').trim();
      const timeMatch = (apt.time || apt.timeSlot || '').toLowerCase().trim() === slot.toLowerCase().trim();
      const active = (apt.status || 'confirmed').toLowerCase() !== 'cancelled';
      return docMatch && dateMatch && timeMatch && active;
    });
  };

  // State
  const [isSuccess, setIsSuccess] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);

  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    email: '',
    age: '',
    gender: 'Female',
    department: initialData?.department || (servicesList[0]?.title || 'HydraFacial MD® & Deep Pore Hydro-Dermabrasion'),
    doctorName: initialData?.doctorName || (chiefDoctorsList[0]?.name || 'Dr. Jennifer Vance, MD (Dermatology)'),
    date: initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    sessionType: 'In-Clinic Aesthetic & Dermatology Consultation',
    consultationFee: 800,
    paymentMethod: 'Pay at Clinic Counter / UPI',
    symptomsNotes: '',
    branchName: 'DermaLuxe Skin & Laser Institute (Flagship Campus)'
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
  ];

  // Sync when initialData changes
  useEffect(() => {
    if (isOpen) {
      const dept = initialData?.department || servicesList[0]?.title || 'HydraFacial MD® & Deep Pore Hydro-Dermabrasion';
      const availableDocs = filterDoctorsByDept(dept);
      const doc = initialData?.doctorName || (availableDocs[0]?.name || chiefDoctorsList[0]?.name);
      const date = initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0];

      let availableSlot = '10:00 AM';
      for (const slot of timeSlots) {
        if (!isSlotBooked(doc, date, slot)) {
          availableSlot = slot;
          break;
        }
      }

      setFormData((prev) => ({
        ...prev,
        department: dept,
        doctorName: doc,
        date: date,
        timeSlot: availableSlot,
        patientName: '',
        mobileNumber: '',
        email: '',
        sessionType: 'In-Clinic Aesthetic & Dermatology Consultation',
        consultationFee: 800,
        paymentMethod: 'Pay at Clinic Counter / UPI',
        symptomsNotes: ''
      }));
      setIsSuccess(false);
      setSuccessReceipt(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const currentAvailableDoctors = filterDoctorsByDept(formData.department);

  const handleDepartmentChange = (newDept) => {
    const available = filterDoctorsByDept(newDept);
    const firstDoc = available[0]?.name || chiefDoctorsList[0]?.name;
    
    let availableSlot = '10:00 AM';
    for (const slot of timeSlots) {
      if (!isSlotBooked(firstDoc, formData.date, slot)) {
        availableSlot = slot;
        break;
      }
    }

    setFormData({
      ...formData,
      department: newDept,
      doctorName: firstDoc,
      timeSlot: availableSlot
    });
  };

  const handleDoctorChange = (newDoctor) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(newDoctor, formData.date, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(newDoctor, formData.date, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      doctorName: newDoctor,
      timeSlot: availableSlot
    });
  };

  const handleDateChange = (newDate) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(formData.doctorName, newDate, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(formData.doctorName, newDate, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      date: newDate,
      timeSlot: availableSlot
    });
  };

  // Generate Unique Sequential Token ID (DL001, DL002, ...)
  const generateAppointmentToken = () => {
    const existingCount = appointments.length;
    const lastStored = parseInt(localStorage.getItem('dermaluxe_last_apt_num') || '0', 10);
    const nextNum = Math.max(existingCount, lastStored) + 1;
    localStorage.setItem('dermaluxe_last_apt_num', nextNum.toString());
    const padded = String(nextNum).padStart(3, '0');
    return `DLX${padded}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.patientName.trim() || !formData.mobileNumber.trim()) {
      alert('Please provide your full name and mobile number.');
      return;
    }

    const token = generateAppointmentToken();

    const newAppointment = {
      appointmentId: token,
      token: token,
      patientName: formData.patientName,
      mobileNumber: formData.mobileNumber,
      email: formData.email || 'N/A',
      age: formData.age || 'Adult',
      gender: formData.gender,
      department: formData.department,
      doctorName: formData.doctorName,
      date: formData.date,
      time: formData.timeSlot,
      sessionType: formData.sessionType,
      fee: formData.consultationFee,
      paymentMethod: formData.paymentMethod,
      symptoms: formData.symptomsNotes || 'Skin & Aesthetic Evaluation',
      branchName: formData.branchName,
      status: 'confirmed',
      bookedAt: new Date().toISOString()
    };

    if (addAppointment) {
      addAppointment(newAppointment);
    }

    setSuccessReceipt(newAppointment);
    setIsSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!successReceipt) return;
    const text = `
=====================================================
    DERMALUXE INSTITUTE OF DERMATOLOGY & AESTHETICS
            OFFICIAL CONSULTATION CONFIRMATION SLIP
=====================================================
BOOKING TOKEN      : ${successReceipt.token}
PATIENT NAME       : ${successReceipt.patientName}
PHONE NUMBER       : ${successReceipt.mobileNumber}
EMAIL              : ${successReceipt.email}
AGE / GENDER       : ${successReceipt.age} / ${successReceipt.gender}
-----------------------------------------------------
TREATMENT/SPECIALTY: ${successReceipt.department}
DOCTOR / SPECIALIST: ${successReceipt.doctorName}
SESSION TYPE       : ${successReceipt.sessionType}
APPOINTMENT DATE   : ${successReceipt.date}
TIME SLOT          : ${successReceipt.time}
CLINIC LOCATION    : ${successReceipt.branchName}
-----------------------------------------------------
CONSULTATION FEE   : Rs. ${successReceipt.fee}
PAYMENT MODE       : ${successReceipt.paymentMethod}
STATUS             : CONFIRMED (PRIORITY CLINICAL QUEUE)
-----------------------------------------------------
CONCIERGE HELPLINE : 1800-419-6784
CLINIC DESK        : ${hospitalInfo?.phone || '+91 98401 23456'}
=====================================================
Please arrive 10 minutes before your slot.
Kindly avoid active acids/makeup on the day of consultation.
    `;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `DermaLuxe_Token_${successReceipt.token}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWhatsApp = () => {
    if (!successReceipt) return;
    const text = encodeURIComponent(
      `Hello DermaLuxe, I have booked a Skin Care Appointment. Token #${successReceipt.token} for ${successReceipt.patientName} with ${successReceipt.doctorName} on ${successReceipt.date} at ${successReceipt.time}.`
    );
    window.open(`https://wa.me/919840123456?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-8">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>Center of Excellence in Dermatology & Lasers</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
            {isSuccess ? 'Consultation Token Confirmed' : 'Book Dermatologist / Glow Consultation'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {isSuccess 
              ? 'Your booking is confirmed in our clinical outpatient system.' 
              : 'Consult board-certified dermatologists, laser specialists, and trichologists.'}
          </p>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {isSuccess && successReceipt ? (
            /* SUCCESS CONFIRMATION & PRINT SLIP */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center space-y-2">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-950 font-heading">
                  Consultation Token #{successReceipt.token} Generated!
                </h3>
                <p className="text-xs text-slate-700">
                  Confirmed for <span className="font-bold text-rose-700">{successReceipt.patientName}</span> with <span className="font-bold text-slate-900">{successReceipt.doctorName}</span>.
                </p>
              </div>

              {/* Digital Slip Card */}
              <div className="border border-rose-100 rounded-2xl p-5 bg-rose-50/30 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Token Number</span>
                    <span className="text-2xl font-black text-rose-600 font-mono tracking-tight">{successReceipt.token}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Confirmed & Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-slate-700">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Patient Name</span>
                    <span className="font-bold text-slate-900">{successReceipt.patientName} ({successReceipt.gender}, {successReceipt.age} yrs)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Contact Mobile</span>
                    <span className="font-bold text-slate-900">{successReceipt.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Treatment / Category</span>
                    <span className="font-bold text-slate-900">{successReceipt.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Consultant Doctor</span>
                    <span className="font-bold text-slate-900">{successReceipt.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Date & Time</span>
                    <span className="font-bold text-rose-600">{successReceipt.date} at {successReceipt.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Consultation Fee</span>
                    <span className="font-bold text-slate-900">₹ {successReceipt.fee} ({successReceipt.paymentMethod})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>📍 {successReceipt.branchName}</span>
                  <span>☎ Concierge: 1800-419-6784</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Slip</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Alert</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={onClose}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline cursor-pointer"
                >
                  Close & Return to Website
                </button>
              </div>

            </div>
          ) : (
            /* BOOKING FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Row 1: Treatment & Dermatologist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Treatment / Concern
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Select Dermatologist / Specialist
                  </label>
                  <select
                    value={formData.doctorName}
                    onChange={(e) => handleDoctorChange(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  >
                    {currentAvailableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Clinic Location */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Select Clinic Branch
                </label>
                <select
                  value={formData.branchName}
                  onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                >
                  {branchesList.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name} ({branch.city})
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 3: Patient Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98401 23456"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Email, Age, Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 28"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Date & Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Available Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                  >
                    {timeSlots.map((slot) => {
                      const booked = isSlotBooked(formData.doctorName, formData.date, slot);
                      return (
                        <option key={slot} value={slot} disabled={booked}>
                          {slot} {booked ? '(Booked)' : '(Available)'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Row 6: Skin Concern / Medical History Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Skin / Hair Concern (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="e.g. Hormonal acne, stubborn dark spots on cheeks, hairline thinning, prior treatments tried..."
                  value={formData.symptomsNotes}
                  onChange={(e) => setFormData({ ...formData, symptomsNotes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white transition-colors"
                ></textarea>
              </div>

              {/* Consultation Fee & Security Banner */}
              <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Consultation Fee</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹ {formData.consultationFee} (Pay at Clinic / UPI)</span>
                </div>
                <div className="text-right text-[11px] text-emerald-700 font-semibold flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Instant Confirmation</span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-200 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
                >
                  Confirm Skin Care Consultation Token
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default AppointmentModal;
