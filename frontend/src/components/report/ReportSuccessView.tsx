import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Search, ArrowRight, Share2, PlusCircle, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import confetti from 'canvas-confetti';
import { Report } from '../../types/report';
import { PriorityBadge } from '../ui/Badge';

interface ReportSuccessViewProps {
  report: Report;
  onReset: () => void;
}

export const ReportSuccessView: React.FC<ReportSuccessViewProps> = ({
  report,
  onReset,
}) => {
  useEffect(() => {
    // Launch celebratory confetti on success mount
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0D5C54', '#14B8A6', '#10B981', '#38BDF8'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-10">
      <Card className="p-6 sm:p-8 text-center border-emerald-100 shadow-xl overflow-hidden relative">
        {/* Decorative background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Animated checkmark circle */}
          <div className="w-18 h-18 rounded-3xl bg-emerald-50 border-4 border-white shadow-lg mx-auto flex items-center justify-center text-emerald-600 mb-5 animate-bounce-short">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Report Successfully Logged
          </span>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
            Action Dispatched
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            Your civic report has been securely registered in the municipal queue and assigned for priority assessment.
          </p>

          {/* Ticket ID Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 text-left">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200/60">
              <span className="text-xs text-slate-400 font-semibold uppercase">Tracking ID</span>
              <span className="text-base font-mono font-extrabold text-brand-800">
                {report.id}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-slate-800">{report.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-medium text-slate-800 truncate max-w-[220px]">
                  {report.location.address}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400">Initial Priority:</span>
                <PriorityBadge priority={report.priority} score={report.priorityScore} size="sm" />
              </div>
            </div>
          </div>

          {/* Next Steps Card */}
          <div className="bg-brand-50/60 border border-brand-100 rounded-2xl p-4 text-left mb-6">
            <h4 className="text-xs font-bold text-brand-900 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              What happens next?
            </h4>
            <ul className="text-[11px] text-brand-950/80 space-y-1.5 leading-relaxed">
              <li className="flex items-start gap-1.5">
                <span className="text-brand-600 font-bold">•</span>
                AI verifies duplicate reports in this 150m radius and boosts urgency.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brand-600 font-bold">•</span>
                Dispatched to the zonal rapid field response unit.
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brand-600 font-bold">•</span>
                You will be able to monitor the repair status in real-time.
              </li>
            </ul>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={`/track?id=${report.id}`} className="flex-1">
              <Button size="lg" className="w-full shadow-md font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Track this report
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={onReset}
              leftIcon={<PlusCircle className="w-4 h-4 text-slate-600" />}
              className="font-bold"
            >
              Report Another
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

