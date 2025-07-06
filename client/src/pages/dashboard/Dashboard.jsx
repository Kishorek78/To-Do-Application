import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState([]);

  // Fetch tasks for dashboard overview
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks({ limit: 10, sortBy: 'createdAt', order: 'desc' });
      setTasks(response.data.tasks);
      setRecentTasks(response.data.tasks.slice(0, 5)); // Show only 5 most recent
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate dashboard stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in progress').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Quick action cards with cohesive design
  const quickActions = [
    {
      title: 'Create New Task',
      description: 'Add a new task to your workflow',
      icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      href: '/dashboard/tasks',
      gradient: 'bg-gradient-cyan',
      bgGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#00eaff]',
      hoverGradient: 'hover:from-[#00eaff]/20 hover:to-[#a259ff]/20'
    },
    {
      title: 'View All Tasks',
      description: 'Manage and organize your tasks',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      href: '/dashboard/tasks',
      gradient: 'bg-gradient-gold',
      bgGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#f1c27d]',
      hoverGradient: 'hover:from-[#f1c27d]/20 hover:to-[#bfa06a]/20'
    },
    {
      title: 'Analytics',
      description: 'View your productivity insights',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      href: '/dashboard/analytics',
      gradient: 'bg-gradient-cyan',
      bgGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#00eaff]',
      hoverGradient: 'hover:from-[#00eaff]/20 hover:to-[#a259ff]/20'
    },
    {
      title: 'Settings',
      description: 'Configure your preferences',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
      href: '/dashboard/settings',
      gradient: 'bg-gradient-gold',
      bgGradient: 'bg-gradient-to-br from-[#1a1a1a] to-[#1a1a1a]',
      borderColor: 'border-[#f1c27d]',
      hoverGradient: 'hover:from-[#f1c27d]/20 hover:to-[#bfa06a]/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/5 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/8 blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Welcome Header */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-lg flex items-center justify-center shadow-cyan border border-[#00eaff]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gradient-cyan drop-shadow-lg mb-0.5 tracking-tight">
                Welcome back, <span className="capitalize">{user?.name}</span>!
              </h1>
              <p className="text-xs text-[#b0b8c1] font-medium">
                Here's your productivity overview for today.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Total Tasks</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{totalTasks}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Completed</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{completedTasks}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">In Progress</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{inProgressTasks}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Completion Rate</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{completionRate}%</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-3 sm:mb-4">
          <h2 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2 text-center">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className={`group p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border ${action.borderColor}/20 flex flex-col items-center text-center gap-1.5 hover:shadow-lg transition-all duration-200 touch-manipulation`}
                aria-label={action.title}
              >
                <div className={`h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center rounded-md border ${action.borderColor}/30 ${action.bgGradient} group-hover:scale-105 transition-transform duration-200`}>
                  <svg className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${action.gradient} bg-clip-text text-transparent`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xs font-bold ${action.gradient} bg-clip-text text-transparent`}>{action.title}</h3>
                  <p className="text-xs text-[#b0b8c1]">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm sm:text-base font-bold text-gradient-cyan">Recent Tasks</h2>
            <Link to="/dashboard/tasks" className="text-xs text-[#00eaff] hover:text-[#a259ff] font-medium touch-manipulation" aria-label="View all tasks">
              View All →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 animate-pulse h-16" />
              ))}
            </div>
          ) : recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recentTasks.map((task) => (
                <div key={task._id} className="p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 hover:border-[#00eaff]/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-semibold text-[#00eaff] line-clamp-1 flex-1">{task.title}</h3>
                    <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full font-medium ${
                      task.status === 'completed' 
                        ? 'bg-[#43e97b]/20 text-[#43e97b] border border-[#43e97b]/30'
                        : task.status === 'in progress'
                        ? 'bg-[#00eaff]/20 text-[#00eaff] border border-[#00eaff]/30'
                        : 'bg-[#f1c27d]/20 text-[#f1c27d] border border-[#f1c27d]/30'
                    }`}>{task.status}</span>
                  </div>
                  <p className="text-xs text-[#b0b8c1] line-clamp-1 mb-1">{task.description}</p>
                  <div className="flex items-center justify-between text-xs text-[#b0b8c1]">
                    <span>Priority: {task.priority}</span>
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="h-10 w-10 bg-gradient-to-br from-[#00eaff]/20 to-[#a259ff]/20 rounded-lg flex items-center justify-center mx-auto mb-2 border border-[#00eaff]">
                <svg className="h-5 w-5 text-[#00eaff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xs font-semibold text-[#00eaff] mb-1">No tasks yet</h3>
              <p className="text-xs text-[#b0b8c1] mb-2">Start by creating your first task to boost productivity!</p>
              <Link to="/dashboard/tasks" className="btn-primary inline-flex items-center px-3 py-1.5 text-xs font-medium touch-manipulation" aria-label="Create first task">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create First Task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 