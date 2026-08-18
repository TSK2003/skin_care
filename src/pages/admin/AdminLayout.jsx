import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Building2,
  UserRound,
  Layers3,
  MapPin,
  FileText,
  Cpu,
  CalendarCheck,
  Sparkles,
  Award,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  BedDouble,
  Users
} from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import AdminHospitalInfo from './AdminHospitalInfo';
import AdminDoctors from './AdminDoctors';
import AdminDepartments from './AdminDepartments';
import AdminBranches from './AdminBranches';
import AdminBlog from './AdminBlog';
import AdminTechnologies from './AdminTechnologies';
import AdminAppointments from './AdminAppointments';
import AdminHeroSection from './AdminHeroSection';
import AdminWhyChooseUs from './AdminWhyChooseUs';
import AdminBeds from './AdminBeds';
import AdminStaff from './AdminStaff';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Clinical ERP Dashboard', icon: LayoutDashboard },
  { to: '/admin/beds', label: 'Laser Suites & Recovery Lounges', icon: BedDouble },
  { to: '/admin/staff', label: 'Therapists & Clinic Staff', icon: Users },
  { to: '/admin/appointments', label: 'Consultation Tokens & Queue', icon: CalendarCheck },
  { to: '/admin/doctors', label: 'Dermatologists Directory', icon: UserRound },
  { to: '/admin/departments', label: 'Specialties & Lasers', icon: Layers3 },
  { to: '/admin/branches', label: 'Clinics & Glow Lounges', icon: MapPin },
  { to: '/admin/technologies', label: 'Laser & Energy Devices', icon: Cpu },
  { to: '/admin/blog', label: 'Skin Journal & Articles', icon: FileText },
  { to: '/admin/hospital-info', label: 'Clinic Profile & Concierge', icon: Building2 },
  { to: '/admin/hero-section', label: 'Landing Hero Showcase', icon: Sparkles },
  { to: '/admin/why-choose-us', label: 'Clinical Highlights', icon: Award },
];

const AdminLayout = () => {
  const { isAuthenticated, logout, hospitalInfo } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin-panel-login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin-panel-login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800 font-sans">
      
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-white tracking-wide uppercase font-heading">{hospitalInfo.name || 'DERMALUXE'}</p>
                  <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Clinical ERP Admin</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-md shadow-rose-900/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800 space-y-1">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                <span>View Live Skin Portal</span>
              </span>
            </a>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-sm font-bold text-slate-800 hidden sm:block">
                Dermatology & Aesthetic Medicine Management ERP System
              </h1>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                Laser Suite System Online
              </span>
              <div className="hidden sm:block text-right">
                <p className="font-bold text-slate-900">Dr. Jennifer Vance</p>
                <p className="text-[10px] text-slate-500">Chief Medical Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Subroute Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="beds" element={<AdminBeds />} />
              <Route path="staff" element={<AdminStaff />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="departments" element={<AdminDepartments />} />
              <Route path="branches" element={<AdminBranches />} />
              <Route path="technologies" element={<AdminTechnologies />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="hospital-info" element={<AdminHospitalInfo />} />
              <Route path="hero-section" element={<AdminHeroSection />} />
              <Route path="why-choose-us" element={<AdminWhyChooseUs />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
