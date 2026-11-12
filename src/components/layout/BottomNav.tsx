import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Compass, ListOrdered, Shield, Search } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useReportStore } from '../../store/useReportStore';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { activeRole } = useReportStore();

  const citizenNavItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore', path: '/explore', icon: Compass },
    { label: 'Report', path: '/report', icon: PlusCircle, isPrimary: true },
    { label: 'Track', path: '/track', icon: Search },
    { label: 'Dashboard', path: '/dashboard', icon: Shield },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
      <div className="mx-3 mb-3 bg-white/95 backdrop-blur-lg border border-slate-200/80 rounded-3xl shadow-xl px-2 py-2 flex items-center justify-around">
        {citizenNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.isPrimary) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="relative -top-5 flex flex-col items-center group"
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className="w-13 h-13 rounded-2xl bg-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-900/30 border-4 border-white group-hover:bg-brand-800 transition-all"
                >
                  <PlusCircle className="w-6 h-6 stroke-[2.2]" />
                </motion.div>
                <span className="text-[10px] font-bold text-brand-800 mt-0.5">Report</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-xs font-semibold transition-all relative',
                  isActive
                    ? 'text-brand-700'
                    : 'text-slate-400 hover:text-slate-600'
                )
              }
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-brand-50/80 rounded-2xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <Icon className={cn('w-5 h-5 mb-0.5', isActive ? 'stroke-[2.3]' : 'stroke-[1.8]')} />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

