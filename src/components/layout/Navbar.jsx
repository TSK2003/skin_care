import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ChevronRight,
  Calendar,
  UserCheck,
  ShieldCheck,
  Zap,
  Heart,
  Activity
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { branchesList as defaultBranches } from '../../data/branchesData';
import { useAdmin } from '../../context/AdminContext';

const Navbar = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'DermaLuxe',
    tagline: 'Institute of Advanced Dermatology & Laser Aesthetics'
  };
  const servicesList = adminContext?.services || defaultServices;
  const branchesList = adminContext?.branches || defaultBranches;

  const [isSticky, setIsSticky] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServicesDropdownOpen(false);
    setBranchesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`w-full z-40 transition-all duration-200 ${
        isSticky
          ? 'sticky top-0 shadow-md bg-white/95 backdrop-blur-md border-b border-rose-100'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. BRAND LOGO */}
          <Link
            to="/"
            onClick={() => {
              setServicesDropdownOpen(false);
              setBranchesDropdownOpen(false);
              window.scrollTo(0, 0);
            }}
            className="flex items-center space-x-3 group py-1 shrink-0"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:shadow-rose-300 group-hover:scale-105 transition-all">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-950 uppercase font-heading leading-tight">
                  {hospitalInfo.name || 'DERMALUXE'}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider leading-none">
                Skin, Laser & Aesthetic Institute
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 font-medium">
            
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname === '/'
                  ? 'text-rose-600 bg-rose-50 font-bold'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group">
              <Link
                to="/about"
                className={`flex items-center px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  location.pathname.startsWith('/about')
                    ? 'text-rose-600 bg-rose-50 font-bold'
                    : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-rose-600 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block pt-2 w-60 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="bg-white rounded-xl shadow-xl border border-rose-100 py-2">
                  <Link to="/about/overview" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Institute Overview</Link>
                  <Link to="/about/vision-mission" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Vision & Aesthetic Philosophy</Link>
                  <Link to="/about/doctors" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Board-Certified Dermatologists</Link>
                  <Link to="/about/consultant-schedule" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Doctor Consultation Hours</Link>
                  <Link to="/about/management" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Leadership & Medical Board</Link>
                  <Link to="/about/testimonials" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Patient Skin Transformations</Link>
                  <Link to="/about/careers" className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium">Careers at DermaLuxe</Link>
                </div>
              </div>
            </div>

            {/* Treatments & Lasers (Mega / Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-rose-600 bg-rose-50 font-bold'
                    : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>Treatments & Lasers</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-rose-600' : 'text-slate-400'}`} />
              </button>

              {/* Mega Dropdown */}
              {servicesDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[580px] z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-rose-100 p-4 grid grid-cols-2 gap-2">
                    {servicesList.slice(0, 8).map((svc) => (
                      <Link
                        key={svc.id}
                        to={`/services/${svc.slug}`}
                        className="flex items-start p-2.5 rounded-xl hover:bg-rose-50/70 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors leading-snug">
                            {svc.title}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            {svc.shortDesc}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs px-2">
                      <span className="text-[11px] text-slate-500 font-medium">Over 20+ specialized dermatological treatments</span>
                      <Link to="/technologies" className="text-rose-600 font-bold hover:underline flex items-center">
                        View Technologies <ChevronRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            <Link
              to="/technologies"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/technologies')
                  ? 'text-rose-600 bg-rose-50 font-bold'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Advanced Lasers
            </Link>

            {/* Skin Packages */}
            <Link
              to="/health-center/master-health-checkup"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/health-center')
                  ? 'text-rose-600 bg-rose-50 font-bold'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Glow Packages
            </Link>

            {/* Branches Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setBranchesDropdownOpen(true)}
              onMouseLeave={() => setBranchesDropdownOpen(false)}
            >
              <Link
                to="/branches"
                className={`flex items-center px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  location.pathname.startsWith('/branches')
                    ? 'text-rose-600 bg-rose-50 font-bold'
                    : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>Clinics</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-rose-600 group-hover:rotate-180 transition-transform" />
              </Link>
              {branchesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-rose-100 py-2">
                    {branchesList.map((branch) => (
                      <Link
                        key={branch.id}
                        to={`/health-center/${branch.slug || branch.id}`}
                        className="block px-4 py-2 text-xs text-slate-700 hover:bg-rose-50 hover:text-rose-600 font-medium"
                      >
                        <p className="font-semibold text-slate-800">{branch.name}</p>
                        <span className="text-[10px] text-slate-400">{branch.city}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              to="/blog"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'text-rose-600 bg-rose-50 font-bold'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Skin Journal
            </Link>

            {/* Contact */}
            <Link
              to="/contact"
              className={`px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                location.pathname === '/contact'
                  ? 'text-rose-600 bg-rose-50 font-bold'
                  : 'text-slate-700 hover:text-rose-600 hover:bg-rose-50/50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* 3. RIGHT CTAS & PORTAL ACCESS */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* Patient Skin Portal */}
            <Link
              to="/patient/portal"
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-rose-600 px-3 py-2 rounded-lg border border-slate-200 hover:border-rose-300 transition-colors"
              title="View your skin analysis and prescriptions"
            >
              <UserCheck className="w-3.5 h-3.5 text-rose-500" />
              <span>Skin Portal</span>
            </Link>

            {/* Book Dermatologist Appointment Button */}
            <button
              type="button"
              onClick={onOpenAppointment}
              className="flex items-center space-x-2 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs xl:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-rose-200 hover:shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-rose-100" />
              <span>Book Glow Session</span>
            </button>
          </div>

          {/* 4. MOBILE HAMBURGER BUTTON */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="bg-rose-600 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-sm"
            >
              Book Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE FULL SCREEN MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-rose-100 shadow-xl max-h-[85vh] overflow-y-auto px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Home
          </Link>
          
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between py-2 text-sm font-semibold text-slate-800 border-b border-slate-100"
            >
              <span>Treatments & Lasers</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-3 py-2 space-y-2 bg-rose-50/50 rounded-lg mt-1">
                {servicesList.map((svc) => (
                  <Link
                    key={svc.id}
                    to={`/services/${svc.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-medium text-slate-700 hover:text-rose-600 py-1"
                  >
                    {svc.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Advanced Laser Technologies
          </Link>

          <Link
            to="/health-center/master-health-checkup"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Skin & Glow Packages
          </Link>

          <Link
            to="/branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Clinics & Locations
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            About DermaLuxe
          </Link>

          <Link
            to="/about/doctors"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Our Dermatologists
          </Link>

          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Skin Care Journal
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-slate-800 hover:text-rose-600 border-b border-slate-100"
          >
            Contact & Appointments
          </Link>

          <div className="pt-3 flex flex-col gap-2">
            <Link
              to="/patient/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl"
            >
              Patient Skin Portal
            </Link>
            <Link
              to="/admin-panel-login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-medium text-slate-500 hover:text-rose-600"
            >
              Staff & Admin Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
