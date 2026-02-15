'use client';

import { useEffect } from 'react';
import { INITIAL_TASKS } from '../initial-data';

export default function SeedPage() {
  useEffect(() => {
    // Populate localStorage with initial tasks
    localStorage.setItem('kanban-tasks', JSON.stringify(INITIAL_TASKS));
    
    // Redirect to main board
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Loading Tasks...</h1>
        <p className="text-gray-400">Populating Kanban board with initial tasks...</p>
      </div>
    </div>
  );
}
