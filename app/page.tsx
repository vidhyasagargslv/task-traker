'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import TaskCard from '@/components/TaskCard';
import AddTaskModal from '@/components/AddTaskModal';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');

  // Fetch tasks from API
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new task
  const handleAddTask = async (title: string, description: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks(prev => [...prev, newTask]);
      }
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Update task
  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(prev => prev.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const getTaskCount = (status: string) => {
    if (status === 'All') return tasks.length;
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold ml-10">TaskTracker</h1>
        </div>
        <div className="flex-none">
          <button
            className="btn btn-primary mr-10"
            onClick={() => setIsModalOpen(true)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-md:">
        {/* Stats */}
        <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value text-primary">{getTaskCount('All')}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">{getTaskCount('Pending')}</div>
          </div>
          <div className="stat">
            <div className="stat-title">In Progress</div>
            <div className="stat-value text-info">{getTaskCount('In Progress')}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">{getTaskCount('Completed')}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="tabs tabs-boxed mb-6">
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              className={`tab ${filter === status ? 'tab-active' : ''}`}
              onClick={() => setFilter(status as typeof filter)}
            >
              {status} ({getTaskCount(status)})
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-base-content/60 text-lg mb-4">
              {filter === 'All' ? 'No tasks yet!' : `No ${filter.toLowerCase()} tasks`}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Create your first task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}
