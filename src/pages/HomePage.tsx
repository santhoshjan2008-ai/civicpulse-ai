import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Shield, Sparkles, MapPin, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { useReportStore } from '../store/useReportStore';
import { PriorityBadge, StatusBadge } from '../components/ui/Badge';
import { formatRelativeTime } from '../utils/cn';

export const HomePage: React.FC = () => {
  const { reports, hotspots } = useReportStore();
  const criticalReports = reports.filter(r => r.priority === 'Critical' && r.status !== 'Resolved').slice(0, 3);
  const recentReports = reports.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
      {/* Mobile-first Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white p-6 sm:p-10 shadow-xl mb-8">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold mb-4 text-brand-100">
            <Sparkles className="w-3.5 h-3.5 text-brand-300 animate-pulse" />
            AI-Powered Civic Response
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Transforming scattered citizen voice into rapid civic action.
          </h1>
          <p className="text-brand-100 text-sm sm:text-base leading-relaxed mb-6 max-w-lg">
            Instant 60-second incident reporting with AI auto-categorization, duplicate consolidation, and explainable priority dispatch.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/report">
              <Button size="lg" className="bg-white text-brand-800 hover:bg-brand-50 shadow-lg font-bold">
                <PlusCircle className="w-5 h-5 mr-1 text-brand-700" />
                Report an Issue
              </Button>
            </Link>
            <Link to="/track">
              <Button size="lg" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Search className="w-4 h-4 mr-1" />
                Track My Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-[-10%] top-[-30%] w-96 h-96 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-[5%] bottom-[-20%] w-72 h-72 rounded-full bg-teal-300/10 blur-2xl pointer-events-none" />
      </div>

      {/* Quick Category Action Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">What needs attention today?</h2>
          <Link to="/report" className="text-xs font-bold text-brand-700 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Waterlogging', icon: '🌊', count: 14, color: 'hover:border-sky-300 bg-sky-50/40' },
            { label: 'Road Damage', icon: '🚧', count: 18, color: 'hover:border-amber-300 bg-amber-50/40' },
            { label: 'Waste/Garbage', icon: '🗑️', count: 19, color: 'hover:border-emerald-300 bg-emerald-50/40' },
            { label: 'Streetlight', icon: '💡', count: 11, color: 'hover:border-yellow-300 bg-yellow-50/40' },
            { label: 'Water Supply', icon: '🚰', count: 9, color: 'hover:border-cyan-300 bg-cyan-50/40' },
            { label: 'Drainage', icon: '🕳️', count: 8, color: 'hover:border-indigo-300 bg-indigo-50/40' },
          ].map((cat) => (
            <Link key={cat.label} to={`/report?category=${encodeURIComponent(cat.label)}`}>
              <Card className={`p-4 text-center border-slate-200/70 hover:shadow-md transition-all ${cat.color} group`}>
                <div className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="text-xs font-bold text-slate-800 truncate">{cat.label}</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">{cat.count} open reports</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Grid: Live Critical Issues & Active Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Critical Hazard Stream */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-base font-bold text-slate-900">Urgent Hazards Requiring Immediate Action</h2>
            </div>
            <Link to="/dashboard" className="text-xs font-bold text-brand-700 hover:underline">
              Control Room &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {criticalReports.map((report) => (
              <Link key={report.id} to={`/reports/${report.id}`}>
                <Card hoverable className="p-4 border-rose-100 hover:border-rose-300 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={report.priority} score={report.priorityScore} />
                      <StatusBadge status={report.status} size="sm" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {formatRelativeTime(report.createdAt)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {report.aiSummary || report.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span className="truncate max-w-[200px] sm:max-w-xs">{report.location.address}</span>
                    </div>
                    {report.duplicateCount > 0 && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        +{report.duplicateCount} merged reports
                      </span>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Hotspot & Recurring Issue Highlights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recurring Problem Clusters</h2>
            <Link to="/dashboard" className="text-xs font-bold text-brand-700 hover:underline">
              View Map
            </Link>
          </div>

          <div className="space-y-3">
            {hotspots.slice(0, 3).map((hotspot) => (
              <Card key={hotspot.id} className="p-4 border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800 truncate">{hotspot.name}</span>
                  <span className="bg-rose-50 text-rose-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-rose-200">
                    Severity {hotspot.severityScore}
                  </span>
                </div>
                <p className="text-[11px] text-brand-700 font-semibold mb-2">
                  {hotspot.ward}
                </p>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 leading-relaxed mb-3">
                  ⚠️ {hotspot.recurringPattern}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{hotspot.reportCount} total incidents</span>
                  <span className="text-rose-600 font-bold">{hotspot.criticalCount} critical</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

