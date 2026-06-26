import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert, KeyRound, ChevronRight, GraduationCap } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { role: 'Admin', username: 'admin', password: 'admin123' },
  { role: 'Principal', username: 'principal', password: 'principal123' }
];

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemoPrefills, setShowDemoPrefills] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e, customUser = null, customPass = null) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    const uName = customUser || username;
    const uPass = customPass || password;

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uName, password: uPass })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_role', data.role);
        localStorage.setItem('admin_name', data.name);
        navigate('/admin/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrefillAndLogin = (acc) => {
    setUsername(acc.username);
    setPassword(acc.password);
    handleLogin(null, acc.username, acc.password);
  };

  return (
    <div className="pt-0 pb-12 min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">

        {/* Central Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-white text-slate-950 shadow-md">
              <GraduationCap size={32} />
            </div>
            <div className="text-left">
              <h1 className="font-extrabold text-2xl tracking-tight text-white leading-none">VILLZONE</h1>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mt-0.5">International School</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-905 bg-opacity-70 border border-slate-800 backdrop-blur-lg p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-base font-black text-white uppercase tracking-wider">Management Portal</h2>
            <p className="text-[10px] text-slate-500 font-medium">Please enter your credentials to access the central console.</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold text-[11px] rounded-2xl flex items-start gap-2.5">
              <ShieldAlert size={14} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Username ID</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 text-slate-500" size={14} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 text-slate-500" size={14} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 cursor-pointer active:scale-98 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Dev Demo Prefills Accordion */}
          <div className="border-t border-slate-800/80 pt-4">
            <button
              onClick={() => setShowDemoPrefills(!showDemoPrefills)}
              className="w-full flex justify-between items-center text-[10px] font-bold text-slate-500 hover:text-slate-450 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span>Developer Demo Prefills</span>
              <ChevronRight size={12} className={`transition-transform duration-250 ${showDemoPrefills ? 'rotate-90' : ''}`} />
            </button>

            {showDemoPrefills && (
              <div className="grid grid-cols-2 gap-2 mt-3 animate-fadeIn">
                {DEMO_ACCOUNTS.map((acc, i) => (
                  <button
                    key={i}
                    onClick={() => handlePrefillAndLogin(acc)}
                    className="p-2 bg-slate-950/80 border border-slate-850 hover:border-blue-500/40 text-[9px] font-black text-left rounded-xl transition-all flex items-center justify-between text-slate-300 hover:text-white cursor-pointer"
                  >
                    <span>{acc.role}</span>
                    <KeyRound size={10} className="text-slate-600" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
