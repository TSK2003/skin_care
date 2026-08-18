import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const aboutMenuItems = [
  { label: 'Institutional Overview', path: '/about/overview' },
  { label: 'Vision & Aesthetic Philosophy', path: '/about/vision-mission' },
  { label: 'Clinical Leadership & Medical Board', path: '/about/management' },
  { label: 'Board-Certified Dermatologists', path: '/about/doctors' },
  { label: 'Doctor Consultation Hours & Slots', path: '/about/consultant-schedule' },
  { label: 'Patient Skin Transformations', path: '/about/testimonials' },
  { label: 'Careers at DermaLuxe', path: '/about/careers' },
];

export const healthCenterMenuItems = [
  { label: 'Flagship Dermatology & Laser Center', path: '/branches' },
  { label: 'City Center Aesthetic & HydraFacial Lounge', path: '/branches' },
  { label: 'Royal Bridal & Glow Diagnostic Packages', path: '/health-center/master-health-checkup' },
];

export const updatesMenuItems = [
  { label: 'Clinical Milestones & News', path: '/updates/news' },
  { label: 'Laser & Facial Harmonization Masterclasses', path: '/updates/international-visit' },
  { label: 'Hyperbaric Oxygen & Post-Laser Healing Suite', path: '/updates/hbot' },
  { label: 'Skin Transformation Video Demonstrations', path: '/updates/videos' },
  { label: 'Treatment Suites & Clinic Photo Gallery', path: '/updates/gallery' },
  { label: 'Patient Satisfaction & Glow Reviews', path: '/updates/patient-satisfaction' },
  { label: 'US-FDA Laser Safety & Sterilization Standards', path: '/updates/infection-control' },
];

const DropdownMenu = ({ items, onClose }) => {
  return (
    <div className="w-72 bg-white shadow-2xl rounded-2xl border border-rose-100 py-2 transform transition-all duration-200">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.path}
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <span>{item.label}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-rose-600" />
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
