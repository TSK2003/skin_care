export const initialWardsList = [
  {
    id: "laser-suite-a",
    name: "Executive Laser & Light Therapy Suites",
    type: "Aesthetic Laser Suite",
    floor: "2nd Floor - Laser & Energy Wing",
    totalBeds: 6,
    occupiedBeds: 4,
    nurseInCharge: "Senior Laser Nurse Priya, RN, CLSO",
    description: "Equipped with Soprano Titanium, Fractional CO2, Q-Switched Nd:YAG lasers, Zimmer Cryo skin chillers, and eye-safety shielding."
  },
  {
    id: "facial-lounge",
    name: "VIP HydraFacial & Med-Spa Radiance Lounge",
    type: "Hydro-Dermabrasion Lounge",
    floor: "1st Floor - Rejuvenation Wing",
    totalBeds: 8,
    occupiedBeds: 5,
    nurseInCharge: "Lead Aesthetician Soundarya, CIDESCO",
    description: "Luxurious private facial pods featuring HydraFacial MD Elite systems, lymphatic drainage, and customized medical LED phototherapy."
  },
  {
    id: "dermatosurgery-ot",
    name: "Minor Dermatosurgery & Hair Transplant OT",
    type: "Sterile Cleanroom Suite",
    floor: "3rd Floor - Surgical Wing",
    totalBeds: 4,
    occupiedBeds: 2,
    nurseInCharge: "Surgical Incharge Karthik, RN",
    description: "HEPA-filtered sterile cleanroom equipped with Ellman RF units, Sapphire FUE transplant stations, and shadowless surgical lamps."
  },
  {
    id: "recovery-suite",
    name: "Post-Procedure Recovery & Oxygen Lounge",
    type: "Post-Aesthetic Recovery Bay",
    floor: "2nd Floor - Wellness Wing",
    totalBeds: 6,
    occupiedBeds: 3,
    nurseInCharge: "Nurse Supervisor Rekha, RN",
    description: "Serene relaxation lounge with reclining zero-gravity memory foam loungers, collagen sheet masks, and hyperbaric oxygen recovery."
  }
];

export const initialBedsList = [
  {
    id: "bed-laser-101",
    wardId: "laser-suite-a",
    wardName: "Executive Laser & Light Therapy Suites",
    bedNumber: "LSR-101",
    status: "occupied",
    patientName: "K. Sneha (Age 28)",
    patientId: "DERM-84210",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Jennifer Vance, MD (Dermatology)",
    rehabSupport: "Fractional CO2 Laser Post-Acne Scar Remodeling - Session 2",
    notes: "Session complete. Cold Cryo soothing mask applied. Erythema minimal."
  },
  {
    id: "bed-laser-102",
    wardId: "laser-suite-a",
    wardName: "Executive Laser & Light Therapy Suites",
    bedNumber: "LSR-102",
    status: "occupied",
    patientName: "M. Deepika (Age 32)",
    patientId: "DERM-84215",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Arvind Subramanian, MD (Dermatology)",
    rehabSupport: "Alma Soprano Titanium Full Body Laser Hair Reduction",
    notes: "Painless mode SHR. ICE Plus tip functional. Skin calm and clear."
  },
  {
    id: "bed-laser-103",
    wardId: "laser-suite-a",
    wardName: "Executive Laser & Light Therapy Suites",
    bedNumber: "LSR-103",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Q-Switched Nd:YAG Melasma Station",
    notes: "Sterilized and prepped for evening Hollywood Carbon Peel session."
  },
  {
    id: "bed-face-201",
    wardId: "facial-lounge",
    wardName: "VIP HydraFacial & Med-Spa Radiance Lounge",
    bedNumber: "HYD-201",
    status: "occupied",
    patientName: "Mrs. Ananya Krishnan (Age 34)",
    patientId: "DERM-84190",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Sophia Bennett, MD (Dermatology)",
    rehabSupport: "Platinum HydraFacial MD + Britenol Peptide Booster",
    notes: "Red LED phototherapy in progress. Excellent cellular hydration."
  },
  {
    id: "bed-face-202",
    wardId: "facial-lounge",
    wardName: "VIP HydraFacial & Med-Spa Radiance Lounge",
    bedNumber: "HYD-202",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "HydraFacial Elite MD Station",
    notes: "Sanitized & ready for next bridal glow appointment."
  },
  {
    id: "bed-surg-301",
    wardId: "dermatosurgery-ot",
    wardName: "Minor Dermatosurgery & Hair Transplant OT",
    bedNumber: "DS-301",
    status: "occupied",
    patientName: "R. Vignesh (Age 31)",
    patientId: "DERM-84175",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Marcus Lin, MD (FISHRS)",
    rehabSupport: "Sapphire FUE Hair Transplant - 2,500 Micro-Grafts",
    notes: "Recipient site channel creation complete. Patient vitals stable."
  },
  {
    id: "bed-surg-302",
    wardId: "dermatosurgery-ot",
    wardName: "Minor Dermatosurgery & Hair Transplant OT",
    bedNumber: "DS-302",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Ellman Radiofrequency Dermatosurgery Bed",
    notes: "Sanitized and prepped for afternoon RF mole excision."
  },
  {
    id: "bed-rec-401",
    wardId: "recovery-suite",
    wardName: "Post-Procedure Recovery & Oxygen Lounge",
    bedNumber: "REC-401",
    status: "occupied",
    patientName: "S. Priya (Age 42)",
    patientId: "DERM-84160",
    admittedDate: "2026-08-18",
    attendingDoctor: "Dr. Sophia Bennett, MD (Dermatology)",
    rehabSupport: "Post Ultraformer 7D HIFU & Dermal Filler Recovery",
    notes: "Cold ice compress applied. Post-care SPF cream provided."
  },
  {
    id: "bed-rec-402",
    wardId: "recovery-suite",
    wardName: "Post-Procedure Recovery & Oxygen Lounge",
    bedNumber: "REC-402",
    status: "available",
    patientName: "",
    patientId: "",
    admittedDate: "",
    attendingDoctor: "",
    rehabSupport: "Zero-Gravity Aesthetic Recovery Lounger",
    notes: "Available for post-peel relaxing session."
  }
];
