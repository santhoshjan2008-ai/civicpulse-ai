import React from 'react';
import { ReportCategory } from '../../types/report';
import { cn } from '../../utils/cn';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface CategoryPickerProps {
  selectedCategory?: ReportCategory;
  onSelectCategory: (category: ReportCategory) => void;
  suggestedCategory?: ReportCategory;
  error?: string;
}

interface CategoryConfig {
  id: ReportCategory;
  label: string;
  emoji: string;
  desc: string;
  colorScheme: {
    bg: string;
    border: string;
    activeBg: string;
    activeBorder: string;
  };
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'Waterlogging',
    label: 'Waterlogging',
    emoji: '🌊',
    desc: 'Flooding, ponding, deep water on roads',
    colorScheme: {
      bg: 'bg-sky-50/50',
      border: 'border-sky-150',
      activeBg: 'bg-sky-50',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/20',
    },
  },
  {
    id: 'Road Damage',
    label: 'Road Damage',
    emoji: '🚧',
    desc: 'Potholes, broken asphalt, craters, curbs',
    colorScheme: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-150',
      activeBg: 'bg-amber-50',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20',
    },
  },
  {
    id: 'Waste/Garbage',
    label: 'Waste / Garbage',
    emoji: '🗑️',
    desc: 'Overflowing bins, illegal dumps, trash',
    colorScheme: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-150',
      activeBg: 'bg-emerald-50',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20',
    },
  },
  {
    id: 'Streetlight',
    label: 'Streetlight',
    emoji: '💡',
    desc: 'Dark corridors, broken lamps, live wires',
    colorScheme: {
      bg: 'bg-yellow-50/50',
      border: 'border-yellow-150',
      activeBg: 'bg-yellow-50',
      activeBorder: 'border-yellow-500 ring-2 ring-yellow-500/20',
    },
  },
  {
    id: 'Water Supply',
    label: 'Water Supply',
    emoji: '🚰',
    desc: 'Pipe bursts, brown muddy water, leaks',
    colorScheme: {
      bg: 'bg-cyan-50/50',
      border: 'border-cyan-150',
      activeBg: 'bg-cyan-50',
      activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/20',
    },
  },
  {
    id: 'Drainage',
    label: 'Drainage & Sewer',
    emoji: '🕳️',
    desc: 'Open manholes, blocked storm drains, sewage',
    colorScheme: {
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-150',
      activeBg: 'bg-indigo-50',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/20',
    },
  },
  {
    id: 'Other',
    label: 'Other Issue',
    emoji: '📋',
    desc: 'Fallen trees, encroachment, public hazards',
    colorScheme: {
      bg: 'bg-slate-50/50',
      border: 'border-slate-150',
      activeBg: 'bg-slate-100',
      activeBorder: 'border-slate-500 ring-2 ring-slate-500/20',
    },
  },
];

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategory,
  onSelectCategory,
  suggestedCategory,
  error,
}) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
          Select Category
        </label>
        {suggestedCategory && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-200/60 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-brand-600 animate-pulse" />
            AI Suggests: {suggestedCategory}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const isSuggested = suggestedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                'flex items-center p-4 rounded-3xl border text-left transition-all duration-200 relative group cursor-pointer shadow-xs',
                isSelected
                  ? 'bg-brand-50/90 border-brand-600 ring-2 ring-brand-500/20 shadow-md'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-slate-300'
              )}
            >
              {/* Category Emoji Circle */}
              <div
                className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mr-3.5 shrink-0 transition-transform group-hover:scale-105',
                  isSelected ? 'bg-white shadow-sm' : 'bg-slate-50 border border-slate-100'
                )}
              >
                {cat.emoji}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <h4
                    className={cn(
                      'text-sm font-bold truncate',
                      isSelected ? 'text-brand-900' : 'text-slate-900'
                    )}
                  >
                    {cat.label}
                  </h4>
                  {isSuggested && !isSelected && (
                    <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-1.5 py-0.2 rounded-md">
                      AI Match
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{cat.desc}</p>
              </div>

              {/* Selection Checkmark */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all',
                  isSelected
                    ? 'bg-brand-700 text-white shadow-sm'
                    : 'border border-slate-200 text-transparent group-hover:border-slate-300'
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </button>
          );
        })}
      </div>

      {error && <p className="text-xs text-rose-500 font-medium pl-1">{error}</p>}
    </div>
  );
};

