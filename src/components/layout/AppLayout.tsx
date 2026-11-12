import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ToastContainer, ToastMessage } from '../ui/Toast';

export const AppLayout: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleDismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] selection:bg-brand-100 selection:text-brand-900">
      <Header />
      <main className="flex-1 pb-24 md:pb-12">
        <Outlet />
      </main>
      <BottomNav />
      <ToastContainer toasts={toasts} onDismiss={handleDismiss} />
    </div>
  );
};

