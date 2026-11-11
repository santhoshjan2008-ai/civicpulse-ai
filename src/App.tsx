import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import {
  ReportPagePlaceholder,
  TrackPagePlaceholder,
  DashboardPagePlaceholder,
  ReportDetailPagePlaceholder,
  ExplorePagePlaceholder,
} from './pages/Placeholders';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPagePlaceholder />} />
          <Route path="/track" element={<TrackPagePlaceholder />} />
          <Route path="/dashboard" element={<DashboardPagePlaceholder />} />
          <Route path="/reports/:id" element={<ReportDetailPagePlaceholder />} />
          <Route path="/explore" element={<ExplorePagePlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

