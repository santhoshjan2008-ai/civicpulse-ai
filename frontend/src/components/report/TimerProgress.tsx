import React, { useEffect, useState } from 'react';
import { Timer, Zap, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TimerProgressProps {
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export const TimerProgress: React.FC<TimerProgressProps> = ({
  currentStep,
  totalSteps,
  isCompleted,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const targetSeconds = 60;
  const progressPercent = Math.min(100, Math.round((secondsElapsed / targetSeconds) * 100));
  const isOverTime = secondsElapsed > targetSeconds;

  const steps = [
    { num: 1, label: 'Evidence & Details' },
    { num: 2, label: 'Category' },
    { num: 3, label: 'Pin Location' },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm mb-6">
      {/* Timer Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs',
              isCompleted
                ? 'bg-emerald-100 text-emerald-800'
                : isOverTime
                ? 'bg-amber-100 text-amber-800'
                : 'bg-brand-100 text-brand-800'
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Timer className="w-4 h-4 text-brand-700 animate-spin-slow" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800">
                {isCompleted ? 'Report Finalized' : '60-Second Fast Report'}
              </span>
              <span className="text-[10px] bg-brand-50 text-brand-700 font-extrabold px-1.5 py-0.2 rounded-full border border-brand-200/50">
                AI Rapid
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {isCompleted
                ? `Completed in ${secondsElapsed} seconds!`
                : `${secondsElapsed}s elapsed • Aim: under 60 seconds`}
            </p>
          </div>
        </div>

        {/* Stopwatch indicator */}
        <div className="text-right">
          <span
            className={cn(
              'text-lg font-mono font-extrabold',
              isCompleted
                ? 'text-emerald-600'
                : isOverTime
                ? 'text-amber-600'
                : 'text-brand-700'
            )}
          >
            00:{secondsElapsed < 10 ? `0${secondsElapsed}` : secondsElapsed}
          </span>
        </div>
      </div>

      {/* Progress track */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
        <div
          className={cn(
            'h-full transition-all duration-300 rounded-full',
            isCompleted
              ? 'bg-emerald-500'
              : isOverTime
              ? 'bg-amber-500'
              : 'bg-gradient-to-r from-brand-600 to-teal-400'
          )}
          style={{ width: isCompleted ? '100%' : `${progressPercent}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-3 gap-2">
        {steps.map((s) => {
          const isActive = currentStep === s.num;
          const isDone = currentStep > s.num || isCompleted;

          return (
            <div
              key={s.num}
              className={cn(
                'flex items-center gap-2 p-2 rounded-2xl border text-xs font-semibold transition-all',
                isActive
                  ? 'bg-brand-50/80 border-brand-300 text-brand-900 shadow-sm'
                  : isDone
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                  : 'bg-slate-50 border-slate-100 text-slate-400'
              )}
            >
              <span
                className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                  isActive
                    ? 'bg-brand-700 text-white'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                )}
              >
                {isDone ? '✓' : s.num}
              </span>
              <span className="truncate text-[11px]">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

