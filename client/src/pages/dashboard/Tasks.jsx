import React, { useState, useEffect } from 'react';
import { tasksAPI } from '../../services/api';
import { toast } from 'react-toastify';
import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import TaskFilters from '../../components/TaskFilters';
import ShareTaskModal from '../../components/ShareTaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    search: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    limit: 10
  });

  // Fetch tasks
  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        ...filters
      };
      const response = await tasksAPI.getTasks(params);
      setTasks(response.data.tasks);
      setPagination(prev => ({
        ...prev,
        currentPage: page,
        totalPages: response.data.totalPages,
        totalTasks: response.data.totalTasks
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  // Create task
  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setShowTaskForm(false);
      toast.success('Task created successfully!');
      fetchTasks(); // Refresh to update pagination
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Failed to create task');
    }
  };

  // Update task
  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await tasksAPI.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task._id === taskId ? response.data.task : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!');
      fetchTasks(); // Refresh to update pagination
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Share task
  const handleShareTask = (task) => {
    setSelectedTask(task);
    setShowShareModal(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-cyan rounded-lg flex items-center justify-center shadow-cyan border border-[#00eaff]">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-gradient-cyan drop-shadow-lg mb-0.5 tracking-tight">
                  Task Management
                </h1>
                <p className="text-xs text-[#b0b8c1] font-medium">
                  Organize and track your tasks efficiently
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTaskForm(true)}
              className="btn-primary flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold touch-manipulation"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Task
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Total Tasks</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{pagination.totalTasks}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Completed</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{tasks.filter(t => t.status === 'completed').length}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">In Progress</span>
            <span className="text-base sm:text-lg font-bold text-gradient-cyan">{tasks.filter(t => t.status === 'in progress').length}</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-lg bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00eaff]/20 flex flex-col gap-1 shadow-lg">
            <span className="text-xs text-[#b0b8c1]">Pending</span>
            <span className="text-base sm:text-lg font-bold text-gradient-gold">{tasks.filter(t => t.status === 'pending').length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-3 sm:mb-4">
          <TaskFilters filters={filters} onChange={handleFiltersChange} />
        </div>

        {/* Task List */}
        <div className="mb-3 sm:mb-4">
          <TaskList
            tasks={tasks}
            loading={loading}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onShare={handleShareTask}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowTaskForm(false)}
            task={null}
          />
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <TaskForm
            onSubmit={(taskData) => handleUpdateTask(editingTask._id, taskData)}
            onCancel={() => setEditingTask(null)}
            task={editingTask}
          />
        )}

        {/* Share Task Modal */}
        {showShareModal && selectedTask && (
          <ShareTaskModal
            task={selectedTask}
            onSubmit={async (email) => {
              try {
                await tasksAPI.shareTask(selectedTask._id, email);
                toast.success('Task shared successfully!');
                setShowShareModal(false);
                setSelectedTask(null);
              } catch (error) {
                toast.error('Failed to share task');
              }
            }}
            onCancel={() => {
              setShowShareModal(false);
              setSelectedTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks; 