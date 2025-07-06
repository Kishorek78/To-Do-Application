import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Tasks', href: '/dashboard/tasks' },
  { name: 'Analytics', href: '/dashboard/analytics' },
  { name: 'Profile', href: '/dashboard/profile' },
  { name: 'Settings', href: '/dashboard/settings' },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#181a1b]">
      {/* Top Navigation Bar */}
      <TopNavBar navLinks={navLinks} />
      {/* Main content area */}
      <main className="flex-1">
        <div className="py-4 px-2 sm:px-4 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
