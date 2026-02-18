'use client';

import { useState, useEffect } from 'react';
import { INITIAL_TASKS } from './initial-data';

// BALBOA MEDIA OS TAXONOMY v2.0
// 5 Primary Categories (Work Types)
const CATEGORIES = ['Content', 'Revenue', 'Platform', 'Growth', 'Strategy'] as const;

// 6 Statuses (Operational State)
const STATUSES = ['Backlog', 'Ready', 'In Progress', 'Review', 'Blocked', 'Done'] as const;

// Status colors for visual distinction
const STATUS_COLORS = {
  Backlog: 'bg-gray-700 border-gray-600',
  Ready: 'bg-blue-900 border-blue-700',
  'In Progress': 'bg-yellow-900 border-yellow-700',
  Review: 'bg-purple-900 border-purple-700',
  Blocked: 'bg-red-900 border-red-700',
  Done: 'bg-green-900 border-green-700',
};

const PRIORITY_COLORS = {
  Low: 'bg-blue-100 text-blue-800',
  Med: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

const CATEGORY_COLORS = {
  Content: 'bg-pink-600',
  Revenue: 'bg-green-600',
  Platform: 'bg-blue-600',
  Growth: 'bg-orange-600',
  Strategy: 'bg-purple-600',
};

interface Task {
  id: string;
  title: string;
  description: string;
  category: typeof CATEGORIES[number];
  status: typeof STATUSES[number];
  priority: 'Low' | 'Med' | 'High';
  tags: string[];
  createdDate: string;
  updatedDate: string;
}

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Content' as typeof CATEGORIES[number],
    status: 'Backlog' as typeof STATUSES[number],
    priority: 'Med' as 'Low' | 'Med' | 'High',
    tags: '',
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [filterCategory, setFilterCategory] = useState<typeof CATEGORIES[number] | 'All'>('All');

  // Load from API first, then localStorage, then initial data
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        if (data && data.length > 0) {
          // Migrate old data if needed
          const migrated = migrateTasks(data);
          setTasks(migrated);
          localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
          return;
        }
      } catch (error) {
        console.log('API unavailable');
      }
      
      // Check if we have a stored version
      const savedVersion = localStorage.getItem('kanban-version-v2');
      const currentVersion = '2026-02-17-v3'; // Taxonomy v2
      
      // Only use localStorage if version matches
      if (savedVersion === currentVersion) {
        const saved = localStorage.getItem('kanban-tasks-v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          setTasks(parsed);
          return;
        }
      }
      
      // Use initial data if nothing else available
      const migrated = migrateTasks(INITIAL_TASKS);
      setTasks(migrated);
      localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
      localStorage.setItem('kanban-version-v2', currentVersion);
    };
    
    loadTasks();
  }, []);

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanban-tasks-v2', JSON.stringify(tasks));
      localStorage.setItem('kanban-version-v2', '2026-02-17-v3');
    }
  }, [tasks]);

  // Migration function for old data
  const migrateTasks = (oldTasks: any[]): Task[] => {
    return oldTasks.map(task => {
      // If already has category, keep it
      if (task.category && CATEGORIES.includes(task.category)) {
        return task;
      }
      
      // Map old column/status to new taxonomy
      const oldColumn = task.column || task.status || 'Backlog';
      let status: typeof STATUSES[number] = 'Backlog';
      
      if (oldColumn === 'Planned') status = 'Ready';
      else if (STATUSES.includes(oldColumn)) status = oldColumn;
      else status = 'Backlog';
      
      // Infer category from tags or title
      let category: typeof CATEGORIES[number] = 'Content';
      const tagString = (task.tags || []).join(' ').toLowerCase();
      const titleLower = (task.title || '').toLowerCase();
      const descLower = (task.description || '').toLowerCase();
      const combined = tagString + ' ' + titleLower + ' ' + descLower;
      
      if (combined.includes('poplinks') || combined.includes('affiliate') || combined.includes('sponsor') || combined.includes('funnel') || combined.includes('sales page')) {
        category = 'Revenue';
      } else if (combined.includes('supabase') || combined.includes('vercel') || combined.includes('api') || combined.includes('deploy') || combined.includes('schema') || combined.includes('database') || combined.includes('os board') || combined.includes('balboa') || combined.includes('infrastructure')) {
        category = 'Platform';
      } else if (combined.includes('facebook') || combined.includes('ads') || combined.includes('subscriber') || combined.includes('growth') || combined.includes('conversion') || combined.includes('analytics')) {
        category = 'Growth';
      } else if (combined.includes('strategy') || combined.includes('planning') || combined.includes('roadmap') || combined.includes('research') || combined.includes('learning') || combined.includes('skill')) {
        category = 'Strategy';
      } else {
        category = 'Content'; // Default
      }
      
      // Clean up tags - remove category names and old status names
      const cleanTags = (task.tags || [])
        .filter((t: string) => !CATEGORIES.includes(t as any) && !STATUSES.includes(t as any))
        .filter((t: string) => t.length <= 20) // Max 20 chars
        .slice(0, 3); // Max 3 tags
      
      return {
        ...task,
        category,
        status,
        tags: cleanTags,
      };
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    // Clean tags
    const cleanTags = newTask.tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !CATEGORIES.includes(t as typeof CATEGORIES[number]) && !STATUSES.includes(t as typeof STATUSES[number]))
      .filter((t) => t.length <= 20)
      .slice(0, 3);

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      status: newTask.status,
      priority: newTask.priority,
      tags: cleanTags,
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };

    setTasks([...tasks, task]);
    setNewTask({ 
      title: '', 
      description: '', 
      category: 'Content', 
      status: 'Backlog', 
      priority: 'Med', 
      tags: '' 
    });
    setShowNewTask(false);
  };

  const moveTask = (task: Task, newStatus: typeof STATUSES[number]) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, status: newStatus, updatedDate: new Date().toISOString().split('T')[0] }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task && task.status !== 'Done') {
      moveTask(task, 'Done');
    }
  };

  const restoreFromBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedTasks = JSON.parse(content);
        if (Array.isArray(parsedTasks)) {
          const migrated = migrateTasks(parsedTasks);
          setTasks(migrated);
          localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
          alert('✓ Tasks restored and migrated to v2 taxonomy');
        }
      } catch (error) {
        alert('✗ Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const getTasksByStatus = (status: typeof STATUSES[number]) => {
    return tasks.filter((t) => {
      const statusMatch = t.status === status;
      const categoryMatch = filterCategory === 'All' || t.category === filterCategory;
      return statusMatch && categoryMatch;
    });
  };

  const getCategoryCount = (category: typeof CATEGORIES[number]) => {
    return tasks.filter(t => t.category === category && t.status !== 'Done').length;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">Kanban Board</h1>
            <div className="flex gap-2">
              {tasks.length === 0 && (
                <button
                  onClick={() => {
                    const migrated = migrateTasks(INITIAL_TASKS);
                    setTasks(migrated);
                    localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                >
                  Load Initial Tasks
                </button>
              )}
              {tasks.length > 0 && (
                <>
                  <button
                    onClick={() => {
                      const dataStr = JSON.stringify(tasks, null, 2);
                      const dataBlob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(dataBlob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `kanban-backup-${new Date().toISOString().split('T')[0]}.json`;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm"
                  >
                    💾 Backup
                  </button>
                  <input
                    id="restore-input"
                    type="file"
                    accept=".json"
                    onChange={(e) => e.target.files?.[0] && restoreFromBackup(e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    onClick={() => document.getElementById('restore-input')?.click()}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm"
                  >
                    📂 Restore
                  </button>
                </>
              )}
              <button
                onClick={() => setShowNewTask(!showNewTask)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
              >
                + New Task
              </button>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-4 items-center bg-gray-800 p-4 rounded-lg">
            <span className="text-gray-400 text-sm">Filter by Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat} ({getCategoryCount(cat)} active)
                </option>
              ))}
            </select>
            
            {/* Category Legend */}
            <div className="flex gap-2 ml-4">
              {CATEGORIES.map(cat => (
                <span
                  key={cat}
                  className={`${CATEGORY_COLORS[cat]} text-white text-xs px-2 py-1 rounded`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* New Task Form */}
        {showNewTask && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">New Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  placeholder="Task title..."
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Category *</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Status</label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                >
                  <option value="Low">Low</option>
                  <option value="Med">Med</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Tags (max 3, comma separated)</label>
                <input
                  type="text"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  placeholder="seo, api, deploy"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  rows={3}
                  placeholder="Task description..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={addTask}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowNewTask(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATUSES.map((status) => (
            <div
              key={status}
              className={`${STATUS_COLORS[status]} rounded-lg p-4 min-h-[400px]`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedTask) {
                  moveTask(draggedTask, status);
                  setDraggedTask(null);
                }
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white">{status}</h2>
                <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {getTasksByStatus(status).length}
                </span>
              </div>
              
              <div className="space-y-3">
                {getTasksByStatus(status).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task)}
                    className="bg-gray-800 rounded p-3 cursor-move hover:bg-gray-750 border border-gray-700"
                  >
                    {/* Category Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className={`${CATEGORY_COLORS[task.category]} text-white text-xs px-2 py-0.5 rounded`}>
                        {task.category}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-500 hover:text-red-400 text-sm"
                      >
                        ×
                      </button>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-white font-medium text-sm mb-1">{task.title}</h3>
                    
                    {/* Description */}
                    {task.description && (
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">{task.description}</p>
                    )}
                    
                    {/* Tags */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="text-gray-500 text-xs bg-gray-900 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Priority & Date */}
                    <div className="flex justify-between items-center text-xs">
                      <span className={`${PRIORITY_COLORS[task.priority]} px-2 py-0.5 rounded`}>
                        {task.priority}
                      </span>
                      <span className="text-gray-500">
                        {task.updatedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer Stats */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{tasks.filter(t => t.status !== 'Done').length}</div>
              <div className="text-gray-400 text-sm">Active Tasks</div>
            </div>
            {CATEGORIES.map(cat => (
              <div key={cat}>
                <div className={`text-2xl font-bold ${CATEGORY_COLORS[cat].replace('bg-', 'text-')}`}>
                  {getCategoryCount(cat)}
                </div>
                <div className="text-gray-400 text-sm">{cat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
