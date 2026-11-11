import React from 'react';
import { Card } from '../components/ui/Card';

export const ReportPagePlaceholder: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Citizen Report Phase 1</h2>
        <p className="text-xs text-slate-500 mt-2">Setting up Capture phase...</p>
      </Card>
    </div>
  );
};

export const TrackPagePlaceholder: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Track Reports Phase 4</h2>
        <p className="text-xs text-slate-500 mt-2">Tracking & timeline setup...</p>
      </Card>
    </div>
  );
};

export const DashboardPagePlaceholder: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Authority Dashboard Phase 3</h2>
        <p className="text-xs text-slate-500 mt-2">Map, Hotspots & Priority Queue setup...</p>
      </Card>
    </div>
  );
};

export const ReportDetailPagePlaceholder: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Report Details</h2>
      </Card>
    </div>
  );
};

export const ExplorePagePlaceholder: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card className="p-8 text-center">
        <h2 className="text-lg font-bold text-slate-800">Explore Civic Map</h2>
      </Card>
    </div>
  );
};

