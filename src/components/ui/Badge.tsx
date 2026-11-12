import React from 'react';
import { cn } from '../../utils/cn';
import { Priority, ReportStatus } from '../../types/report';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Clock, Wrench, ShieldAlert } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  score?: number;
  showIcon?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  score,
  showIcon = true,
  className,
  size = 'md',
}) => {
  const configs = {
    Critical: {
      bg: 'bg-rose-50 border-rose-200 text-rose-700',
      dot: 'bg-rose-500',
      icon: ShieldAlert,
    },
    High: {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
    },
    Medium: {
      bg: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      dot: 'bg-yellow-500',
      icon: Info,
    },
    Low: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
  };

  const config = configs[priority];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-semibold border rounded-full transition-all',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        config.bg,
        className
      )}
    >
      {showIcon ? (
        <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      ) : (
        <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', config.dot)} />
      )}
      <span>{priority}</span>
      {score !== undefined && (
        <span className="font-mono opacity-80 pl-0.5 font-bold">
          {score}
        </span>
      )}
    </span>
  );
};

interface StatusBadgeProps {
  status: ReportStatus;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  size = 'md',
}) => {
  const configs: Record<ReportStatus, { bg: string; dot: string; icon: React.ComponentType<{ className?: string }> }> = {
    Submitted: {
      bg: 'bg-slate-100 border-slate-200 text-slate-700',
      dot: 'bg-slate-400',
      icon: Clock,
    },
    Verified: {
      bg: 'bg-sky-50 border-sky-200 text-sky-700',
      dot: 'bg-sky-500',
      icon: CheckCircle2,
    },
    Assigned: {
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      dot: 'bg-indigo-500',
      icon: AlertCircle,
    },
    'In Progress': {
      bg: 'bg-amber-50 border-amber-200 text-amber-700',
      dot: 'bg-amber-500',
      icon: Wrench,
    },
    Resolved: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
  };

  const config = configs[status] || configs.Submitted;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        config.bg,
        className
      )}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{status}</span>
    </span>
  );
};

