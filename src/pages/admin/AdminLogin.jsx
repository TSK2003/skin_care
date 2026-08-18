import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  ShieldCheck, 
  Lock, 
  User, 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Calendar
} from 'lucide-react';

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'patient'
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [patientPhone, setPatientPhone] = useState('+91 63807 67265');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  // If already logged in as admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Admin Manual Login
  const handleAdminSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Use admin / admin123');
      }
      setLoading(false);
    }, 400);
  };

  // 1-Click Instant Demo Admin Login
  const handleInstantAdminLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setLoading(true);
    setTimeout(() => {
      login('admin', 'admin123');
      navigate('/admin/dashboard');
    }, 300);
  };

  // 1-Click Instant Demo Patient Login
  const handleInstantPatientLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/patient/portal');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 flex flex-col justify-between p-4 sm:p-6 text-white antialiased font-sans">
      
      {/* Top Navbar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-rose-900/40 font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-tight uppercase block leading-none">
              DERMALUXE
            </span>
            <span className="text-[10px] text-rose-300 font-semibold tracking-wider uppercase">
              Institute of Dermatology & Laser Aesthetics
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors"
        >
          ← Back to Main Website
        </Link>
      </div>

      {/* Main Login Card Box */}
      <div className="max-w-md w-full mx-auto my-8 bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-900/30 shadow-2xl space-y-6">
        
        {/* Tab Toggle */}
        <div className="flex rounded-2xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-900/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Doctor / Admin</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('patient');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === 'patient'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-900/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Client Portal</span>
          </button>
        </div>

        {/* ADMIN LOGIN */}
        {activeTab === 'admin' ? (
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white font-heading">Clinic Administrator Login</h2>
              <p className="text-xs text-slate-400">Manage treatments, laser suites, doctor schedules & token queues.</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Admin ERP'}</span>
            </button>

            {/* Instant Demo Login Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleInstantAdminLogin}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs rounded-xl border border-rose-900/40 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>1-Click Instant Admin Demo (admin / admin123)</span>
              </button>
            </div>

          </form>
        ) : (
          /* PATIENT LOGIN */
          <form onSubmit={handleInstantPatientLogin} className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white font-heading">Client Skin & Glow Portal</h2>
              <p className="text-xs text-slate-400">View your consultation slips, VISIA skin score, and prescribed regimens.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Registered Mobile Number</label>
              <div className="relative">
                <Smartphone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="+91 98401 23456"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-xs text-rose-300 space-y-1">
              <span className="font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Demo Access Configured</span>
              </span>
              <p className="text-[11px] text-slate-400">
                Click below to instantly access Karthick's demo DermaLuxe patient dashboard and treatment tokens.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-900/40 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{loading ? 'Opening Portal...' : 'Access Client Portal'}</span>
            </button>
          </form>
        )}

      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} DermaLuxe Institute of Dermatology & Laser Aesthetics. Secure Clinical Authentication.
      </div>

    </div>
  );
};

export default AdminLogin;
