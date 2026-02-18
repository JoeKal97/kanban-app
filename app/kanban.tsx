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
  details?: string; // Extended details/notes
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
    details: '',
    category: 'Content' as typeof CATEGORIES[number],
    status: 'Backlog' as typeof STATUSES[number],
    priority: 'Med' as 'Low' | 'Med' | 'High',
    tags: '',
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [filterCategory, setFilterCategory] = useState<typeof CATEGORIES[number] | 'All'>('All');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  // Load from API first, then localStorage, then initial data
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        if (data && data.length > 0) {
          const migrated = migrateTasks(data);
          setTasks(migrated);
          localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
          return;
        }
      } catch (error) {
        console.log('API unavailable');
      }
      
      const savedVersion = localStorage.getItem('kanban-version-v2');
      const currentVersion = '2026-02-17-v4'; // Clickable cards version
      
      if (savedVersion === currentVersion) {
        const saved = localStorage.getItem('kanban-tasks-v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          setTasks(parsed);
          return;
        }
      }
      
      const migrated = migrateTasks(INITIAL_TASKS);
      setTasks(migrated);
      localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
      localStorage.setItem('kanban-version-v2', currentVersion);
    };
    
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanban-tasks-v2', JSON.stringify(tasks));
      localStorage.setItem('kanban-version-v2', '2026-02-17-v4');
    }
  }, [tasks]);

  const migrateTasks = (oldTasks: any[]): Task[] => {
    return oldTasks.map(task => {
      if (task.category && CATEGORIES.includes(task.category)) {
        return { ...task, details: task.details || '' };
      }
      
      const oldColumn = task.column || task.status || 'Backlog';
      let status: typeof STATUSES[number] = 'Backlog';
      
      if (oldColumn === 'Planned') status = 'Ready';
      else if (STATUSES.includes(oldColumn)) status = oldColumn;
      else status = 'Backlog';
      
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
        category = 'Content';
      }
      
      const cleanTags = (task.tags || [])
        .filter((t: string) => !CATEGORIES.includes(t as any) && !STATUSES.includes(t as any))
        .filter((t: string) => t.length <= 20)
        .slice(0, 3);
      
      return {
        ...task,
        category,
        status,
        tags: cleanTags,
        details: task.details || task.description || '',
      };
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

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
      details: newTask.details,
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
      details: '',
      category: 'Content', 
      status: 'Backlog', 
      priority: 'Med', 
      tags: '' 
    });
    setShowNewTask(false);
  };

  const updateTask = () => {
    if (!editTask || !editTask.title.trim()) return;

    const cleanTags = editTask.tags
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t && !CATEGORIES.includes(t as any) && !STATUSES.includes(t as any))
      .filter((t) => t.length <= 20)
      .slice(0, 3);

    setTasks(tasks.map(t => 
      t.id === editTask.id 
        ? { 
            ...editTask, 
            tags: cleanTags,
            updatedDate: new Date().toISOString().split('T')[0]
          }
        : t
    ));
    setShowEditTask(false);
    setEditTask(null);
    setSelectedTask(null);
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
          alert('✓ Tasks restored and migrated');
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
                onClick={() => {
                  localStorage.removeItem('kanban-tasks-v2');
                  localStorage.removeItem('kanban-version-v2');
                  const migrated = migrateTasks(INITIAL_TASKS);
                  setTasks(migrated);
                  localStorage.setItem('kanban-tasks-v2', JSON.stringify(migrated));
                  localStorage.setItem('kanban-version-v2', '2026-02-17-v4');
                  alert('✅ Reloaded fresh from server');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
              >
                🔄 Force Reload
              </button>
              <span className="text-gray-400 text-sm flex items-center px-2">
                📋 Managed by GrizBot
              </span>
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
          
          {/* Stats Bar */}
          <div className="p-4 bg-gray-800 rounded-lg">
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

        {/* New Task Form - Hidden (managed by GrizBot) */}
        {showNewTask && (
          <div className="mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">New Task</h2>
            <p className="text-gray-400 mb-4">Task creation is managed by GrizBot. Ask me to add tasks instead.</p>
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
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Short Description (appears on card)</label>
                <input
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  placeholder="Brief summary..."
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-1">Full Details (click card to view)</label>
                <textarea
                  value={newTask.details}
                  onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  rows={4}
                  placeholder="Complete details, notes, subtasks, blockers, etc..."
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
                    onClick={() => setSelectedTask(task)}
                    className="bg-gray-800 rounded p-3 cursor-pointer hover:bg-gray-750 border border-gray-700 hover:border-blue-500 transition-colors"
                  >
                    {/* Category Badge */}
                    <div className="flex justify-between items-start mb-2">
                      <span className={`${CATEGORY_COLORS[task.category]} text-white text-xs px-2 py-0.5 rounded`}>
                        {task.category}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
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
                    
                    {/* Has Details Indicator */}
                    {task.details && task.details.length > 10 && (
                      <div className="text-blue-400 text-xs mb-2 flex items-center gap-1">
                        <span>📄</span> Click for details
                      </div>
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
      </div>

      {/* Task Detail Modal */}
      {selectedTask && !showEditTask && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`${CATEGORY_COLORS[selectedTask.category]} text-white text-sm px-3 py-1 rounded`}>
                  {selectedTask.category}
                </span>
                <span className="ml-2 text-gray-400 text-sm">|</span>
                <span className="ml-2 text-gray-300 text-sm">{selectedTask.status}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditTask({ ...selectedTask });
                    setShowEditTask(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-4">{selectedTask.title}</h2>
            
            {selectedTask.description && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Summary</h3>
                <p className="text-white">{selectedTask.description}</p>
              </div>
            )}
            
            {selectedTask.details && (
              <div className="mb-6">
                <h3 className="text-gray-400 text-sm mb-2">Details</h3>
                <div className="bg-gray-900 p-4 rounded text-gray-300 whitespace-pre-wrap">
                  {selectedTask.details}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <span className="text-gray-400 text-sm">Priority</span>
                <p className={`${PRIORITY_COLORS[selectedTask.priority]} inline-block px-2 py-1 rounded mt-1`}>
                  {selectedTask.priority}
                </p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Created</span>
                <p className="text-white mt-1">{selectedTask.createdDate}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Updated</span>
                <p className="text-white mt-1">{selectedTask.updatedDate}</p>
              </div>
            </div>
            
            {selectedTask.tags.length > 0 && (
              <div className="mb-6">
                <span className="text-gray-400 text-sm">Tags</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTask.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              {STATUSES.filter(s => s !== selectedTask.status).map(status => (
                <button
                  key={status}
                  onClick={() => {
                    moveTask(selectedTask, status);
                    setSelectedTask({ ...selectedTask, status });
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm"
                >
                  Move to {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditTask && editTask && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => { setShowEditTask(false); setEditTask(null); }}
        >
          <div 
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Edit Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Short Description</label>
                <input
                  type="text"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-1">Full Details</label>
                <textarea
                  value={editTask.details}
                  onChange={(e) => setEditTask({ ...editTask, details: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  rows={6}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <select
                    value={editTask.category}
                    onChange={(e) => setEditTask({ ...editTask, category: e.target.value as any })}
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
                    value={editTask.status}
                    onChange={(e) => setEditTask({ ...editTask, status: e.target.value as any })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  >
                    {STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Priority</label>
                  <select
                    value={editTask.priority}
                    onChange={(e) => setEditTask({ ...editTask, priority: e.target.value as any })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Med">Med</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={editTask.tags.join(', ')}
                    onChange={(e) => setEditTask({ ...editTask, tags: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <button
                onClick={updateTask}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => { setShowEditTask(false); setEditTask(null); }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
