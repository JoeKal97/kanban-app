'use client';

import { useState, useEffect } from 'react';
import { INITIAL_TASKS } from './initial-data';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Med' | 'High';
  tags: string[];
  column: 'Backlog' | 'Planned' | 'In Progress' | 'Blocked' | 'Review' | 'Done';
  createdDate: string;
  updatedDate: string;
}

const COLUMNS = ['Backlog', 'Planned', 'In Progress', 'Blocked', 'Review', 'Done'] as const;
const PRIORITY_COLORS = {
  Low: 'bg-blue-100 text-blue-800',
  Med: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

export default function Kanban() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNewTask, setShowNewTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Med' as 'Low' | 'Med' | 'High',
    tags: '',
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Load from API first, then localStorage, then initial data
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        if (data && data.length > 0) {
          setTasks(data);
          localStorage.setItem('kanban-tasks', JSON.stringify(data));
          return;
        }
      } catch (error) {
        console.log('API unavailable');
      }
      
      // Try localStorage
      const saved = localStorage.getItem('kanban-tasks');
      if (saved) {
        setTasks(JSON.parse(saved));
        return;
      }
      
      // Use initial data if nothing else available
      setTasks(INITIAL_TASKS as Task[]);
      localStorage.setItem('kanban-tasks', JSON.stringify(INITIAL_TASKS));
    };
    
    loadTasks();
  }, []);

  // Sync to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      tags: newTask.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t),
      column: 'Backlog',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'Med', tags: '' });
    setShowNewTask(false);
  };

  const moveTask = (task: Task, newColumn: typeof COLUMNS[number]) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, column: newColumn, updatedDate: new Date().toISOString().split('T')[0] }
          : t
      )
    );
  };

  const deleteTask = (id: string) => {
    // Never delete, just move to Done if not already
    const task = tasks.find((t) => t.id === id);
    if (task && task.column !== 'Done') {
      moveTask(task, 'Done');
    }
  };

  const getTasksByColumn = (column: typeof COLUMNS[number]) => {
    return tasks.filter((t) => t.column === column);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Kanban Board</h1>
          <div className="flex gap-2">
            {tasks.length === 0 && (
              <button
                onClick={() => {
                  setTasks(INITIAL_TASKS as Task[]);
                  localStorage.setItem('kanban-tasks', JSON.stringify(INITIAL_TASKS));
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Load Initial Tasks
              </button>
            )}
            <button
              onClick={() => setShowNewTask(!showNewTask)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-6 gap-3 mb-8">
          {COLUMNS.map((column) => (
            <div key={column} className="bg-blue-900 rounded-lg p-4 text-center border border-blue-700">
              <p className="text-blue-300 text-sm font-medium">{column}</p>
              <p className="text-white text-3xl font-bold">{getTasksByColumn(column).length}</p>
            </div>
          ))}
        </div>

        {showNewTask && (
          <div className="bg-gray-800 p-6 rounded mb-8 border border-gray-700">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-3 border border-gray-600"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded mb-3 border border-gray-600"
              rows={2}
            />
            <div className="flex gap-4 mb-4">
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value as 'Low' | 'Med' | 'High' })
                }
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
              >
                <option>Low</option>
                <option>Med</option>
                <option>High</option>
              </select>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newTask.tags}
                onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addTask}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowNewTask(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-6 gap-4">
          {COLUMNS.map((column) => (
            <div key={column} className="bg-gray-800 rounded-lg p-4 min-h-96">
              <h2 className="text-white font-semibold mb-4 sticky top-0">{column}</h2>
              <div className="space-y-3">
                {getTasksByColumn(column).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTask(task)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => draggedTask && moveTask(draggedTask, column)}
                    className="bg-gray-700 p-3 rounded cursor-move hover:bg-gray-600 border-l-4 border-blue-500"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium text-sm">{task.title}</h3>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-400 text-xs"
                      >
                        ×
                      </button>
                    </div>
                    {task.description && (
                      <p className="text-gray-300 text-xs mb-2">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${PRIORITY_COLORS[task.priority]}`}>
                        {task.priority}
                      </span>
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Created: {task.createdDate}
                      <br />
                      Updated: {task.updatedDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
