import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { AdminProvider } from './context/AdminContext';

// Layout Components
import TopHeader from './components/layout/TopHeader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import AppointmentModal from './components/common/AppointmentModal';
import EnquiryModal from './components/common/EnquiryModal';

// Public Core Pages
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import TechnologiesPage from './pages/TechnologiesPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';
import BranchesPage from './pages/BranchesPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import HomeCarePage from './pages/HomeCarePage';
import InsurancesPage from './pages/InsurancesPage';
import CharitableTrustPage from './pages/CharitableTrustPage';

// About Subpages
import OverviewPage from './pages/about/OverviewPage';
import VisionMissionPage from './pages/about/VisionMissionPage';
import ManagementPage from './pages/about/ManagementPage';
import DoctorsPage from './pages/about/DoctorsPage';
import ConsultantTimePage from './pages/about/ConsultantTimePage';
import TestimonialsPage from './pages/about/TestimonialsPage';
import CareerPage from './pages/about/CareerPage';

// Health Checkup & Satellite Branches
import MasterCheckupPage from './pages/healthCenter/MasterCheckupPage';
import BranchPage from './pages/healthCenter/BranchPage';

// Updates Subpages
import HospitalUpdatesPage from './pages/updates/HospitalUpdatesPage';
import GalleryPage from './pages/updates/GalleryPage';
import HBOTPage from './pages/updates/HBOTPage';
import InfectionControlPage from './pages/updates/InfectionControlPage';
import InternationalVisitPage from './pages/updates/InternationalVisitPage';
import PatientSatisfactionPage from './pages/updates/PatientSatisfactionPage';
import VideosPage from './pages/updates/VideosPage';

// Admin & Patient Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import PatientPortal from './pages/patient/PatientPortal';

// Auto Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper to conditionally show public layout
const PublicLayout = ({ children, onOpenAppointment, onOpenEnquiry }) => {
  const location = useLocation();
  const isStandalone = 
    location.pathname.startsWith('/admin') || 
    location.pathname === '/admin-panel-login' || 
    location.pathname === '/login' ||
    location.pathname.startsWith('/patient');

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800 antialiased selection:bg-rose-600 selection:text-white">
      {/* Top Emergency & Info Header */}
      <TopHeader onOpenEnquiry={onOpenEnquiry} />

      {/* Sticky Main Navbar */}
      <Navbar onOpenAppointment={() => onOpenAppointment()} />

      {/* Dynamic Route View */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenAppointment={() => onOpenAppointment()} />
    </div>
  );
};

function AppContent() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [appointmentInitialData, setAppointmentInitialData] = useState({});

  const handleOpenAppointment = (data = {}) => {
    if (typeof data === 'string') {
      setAppointmentInitialData({ branchId: data });
    } else if (typeof data === 'object' && data !== null) {
      setAppointmentInitialData(data);
    } else {
      setAppointmentInitialData({});
    }
    setAppointmentOpen(true);
  };

  return (
    <>
      <ScrollToTop />
      <PublicLayout
        onOpenAppointment={handleOpenAppointment}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      >
        <Routes>
          {/* Core Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenAppointment={handleOpenAppointment}
                onOpenEnquiry={() => setEnquiryOpen(true)}
              />
            }
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/technologies"
            element={<TechnologiesPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/technologies/:slug"
            element={<TechnologyDetailPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/branches"
            element={<BranchesPage onOpenAppointment={(branchId) => handleOpenAppointment({ branchId })} />}
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route
            path="/contact"
            element={<ContactPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/home-care"
            element={<HomeCarePage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/insurances"
            element={<InsurancesPage onOpenEnquiry={() => setEnquiryOpen(true)} />}
          />
          <Route
            path="/charitable-trust"
            element={<CharitableTrustPage />}
          />

          {/* About Subpages */}
          <Route
            path="/about"
            element={<AboutUsPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/overview"
            element={<OverviewPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/vision-mission"
            element={<VisionMissionPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/management"
            element={<ManagementPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/doctors"
            element={<DoctorsPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/consultant-schedule"
            element={<ConsultantTimePage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/testimonials"
            element={<TestimonialsPage />}
          />
          <Route
            path="/about/careers"
            element={<CareerPage />}
          />

          {/* Health Assessment Packages & Satellite Branches */}
          <Route
            path="/health-center/master-health-checkup"
            element={<MasterCheckupPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/health-center/:branchId"
            element={<BranchPage onOpenAppointment={handleOpenAppointment} />}
          />

          {/* News & Updates Subpages */}
          <Route path="/updates/news" element={<HospitalUpdatesPage />} />
          <Route path="/updates/gallery" element={<GalleryPage />} />
          <Route path="/updates/hbot" element={<HBOTPage onOpenAppointment={handleOpenAppointment} />} />
          <Route path="/updates/infection-control" element={<InfectionControlPage />} />
          <Route path="/updates/international-visit" element={<InternationalVisitPage />} />
          <Route path="/updates/patient-satisfaction" element={<PatientSatisfactionPage />} />
          <Route path="/updates/videos" element={<VideosPage />} />

          {/* Unified Auth & Portals */}
          <Route path="/admin-panel-login" element={<AdminLogin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/patient/portal" element={<PatientPortal onOpenAppointment={handleOpenAppointment} />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenAppointment={handleOpenAppointment}
                onOpenEnquiry={() => setEnquiryOpen(true)}
              />
            }
          />
        </Routes>
      </PublicLayout>

      {/* Global Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => {
          setAppointmentOpen(false);
          setAppointmentInitialData({});
        }}
        initialData={appointmentInitialData}
      />

      {/* Global Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;
