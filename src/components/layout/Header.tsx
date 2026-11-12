import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Activity, Shield, User, MapPin, Sparkles, RefreshCw } from 'lucide-react';
import { useReportStore } from '../../store/useReportStore';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { activeRole, setActiveRole, resetToMockData, reports } = useReportStore();
  const navigate = useNavigate();

  const criticalCount = reports.filter((r) => r.priority === 'Critical' && r.status !== 'Resolved').length;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-brand-700 flex items-center justify-center text-white shadow-md shadow-brand-800/20 group-hover:bg-brand-800 transition-colors">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                CivicPulse <span className="text-brand-600 text-xs px-1.5 py-0.5 rounded-full bg-brand-50 border border-brand-200/50 font-semibold">AI</span>
              </span>
              <p className="text-[10px] font-medium text-slate-400 hidden sm:block">Intelligent Civic Action Platform</p>
            </div>
          </Link>

          {/* Location Chip */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/60 rounded-full px-3 py-1">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span className="font-semibold text-slate-800">Bengaluru Metro</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">Ward 111 & Central</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )
            }
          >
            Report Issue
          </NavLink>
          <NavLink
            to="/track"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )
            }
          >
            Track Status
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                'px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5',
                isActive ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )
            }
          >
            <Shield className="w-3.5 h-3.5 text-brand-600" />
            <span>Authority Portal</span>
            {criticalCount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {criticalCount}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Right Action / Role Switcher Demo Control */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Reset Button */}
          <button
            onClick={() => {
              resetToMockData();
              window.location.reload();
            }}
            title="Reset Mock Demo Data"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Interactive Role Switcher Toggle */}
          <div className="flex items-center p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => {
                setActiveRole('citizen');
                navigate('/report');
              }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                activeRole === 'citizen'
                  ? 'bg-white text-brand-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <User className="w-3.5 h-3.5" />
              <span>Citizen</span>
            </button>
            <button
              onClick={() => {
                setActiveRole('authority');
                navigate('/dashboard');
              }}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all',
                activeRole === 'authority'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              )}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Authority</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

