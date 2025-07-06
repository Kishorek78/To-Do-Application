import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
    averageCompletionTime: 0,
    productivityScore: 0,
    weeklyTrends: [],
    priorityDistribution: {},
    recentActivity: []
  });

  // Fetch tasks for analytics
  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks({ limit: 1000 }); // Get all tasks for analytics
      calculateAnalytics(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load analytics data');
    }
  };

  // Calculate analytics from tasks data
  const calculateAnalytics = (tasksData) => {
    const total = tasksData.length;
    const completed = tasksData.filter(t => t.status === 'completed').length;
    const inProgress = tasksData.filter(t => t.status === 'in progress').length;
    const pending = tasksData.filter(t => t.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Calculate priority distribution
    const priorityDistribution = {
      high: tasksData.filter(t => t.priority === 'high').length,
      medium: tasksData.filter(t => t.priority === 'medium').length,
      low: tasksData.filter(t => t.priority === 'low').length
    };

    // Calculate productivity score (based on completion rate and task variety)
    const productivityScore = Math.min(100, completionRate + (completed * 2) + (inProgress * 1.5));

    // Generate weekly trends (mock data for now)
    const weeklyTrends = [
      { week: 'Week 1', completed: Math.floor(Math.random() * 20) + 5, total: 25 },
      { week: 'Week 2', completed: Math.floor(Math.random() * 20) + 5, total: 25 },
      { week: 'Week 3', completed: Math.floor(Math.random() * 20) + 5, total: 25 },
      { week: 'Week 4', completed: Math.floor(Math.random() * 20) + 5, total: 25 }
    ];

    // Recent activity (last 5 tasks)
    const recentActivity = tasksData
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);

    setAnalytics({
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: inProgress,
      pendingTasks: pending,
      completionRate,
      averageCompletionTime: Math.floor(Math.random() * 3) + 1, // Mock data
      productivityScore: Math.round(productivityScore),
      weeklyTrends,
      priorityDistribution,
      recentActivity
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Bokeh Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-[#00eaff]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-36 h-36 sm:w-72 sm:h-72 rounded-full bg-[#a259ff]/5 blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-10 right-10 w-24 h-24 sm:w-40 sm:h-40 rounded-full bg-[#f1c27d]/8 blur-2xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-lg flex items-center justify-center shadow-cyan border border-[#00eaff]">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gradient-cyan drop-shadow-lg mb-0.5 tracking-tight">
                Analytics Dashboard
              </h1>
              <p className="text-xs text-[#b0b8c1] font-medium">
                Track your productivity and performance insights
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Total Tasks</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{analytics.totalTasks}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Completion Rate</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{analytics.completionRate}%</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Productivity Score</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{analytics.productivityScore}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Avg. Completion</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{analytics.averageCompletionTime}d</span>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Weekly Trends */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h3 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Weekly Trends
            </h3>
            <div className="space-y-2">
              {analytics.weeklyTrends.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-[#0a0a0a]/60 border border-[#00eaff]/10">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#00eaff] text-xs">{week.week}</h4>
                    <p className="text-xs text-[#b0b8c1]">{week.completed} of {week.total} tasks completed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-cyan rounded-full transition-all duration-500"
                        style={{ width: `${(week.completed / week.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#00eaff]">
                      {Math.round((week.completed / week.total) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="p-3 sm:p-4 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
            <h3 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Priority Distribution</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">High</span>
                <span className="text-xs font-bold text-gradient-gold">{analytics.priorityDistribution.high}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">Medium</span>
                <span className="text-xs font-bold text-gradient-cyan">{analytics.priorityDistribution.medium}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#b0b8c1]">Low</span>
                <span className="text-xs font-bold text-gradient-gold">{analytics.priorityDistribution.low}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-2">
          <h3 className="text-sm sm:text-base font-bold text-gradient-cyan mb-2">Recent Activity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {analytics.recentActivity.map((task, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-semibold text-[#00eaff] line-clamp-1 flex-1">{task.title}</h4>
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
                  <span>{new Date(task.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 