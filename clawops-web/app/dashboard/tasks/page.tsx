'use client';

import { useState } from 'react';
import { CheckSquare, Plus, GripVertical, Clock, Tag } from 'lucide-react';

type Status = 'todo' | 'inprogress' | 'done';
type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: string; title: string; assignee?: string; priority: Priority;
  status: Status; due?: string; tags: string[];
}

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Set up GHL integration', assignee: 'ZeroClaw', priority: 'high', status: 'inprogress', due: 'Today', tags: ['integration'] },
  { id: '2', title: 'Draft launch announcement', assignee: 'Writer-01', priority: 'medium', status: 'todo', due: 'Tomorrow', tags: ['content'] },
  { id: '3', title: 'Competitor research report', assignee: 'Scout', priority: 'high', status: 'inprogress', due: 'Apr 18', tags: ['research'] },
  { id: '4', title: 'Fix API rate limiting', assignee: 'Coder-01', priority: 'high', status: 'todo', tags: ['bug'] },
  { id: '5', title: 'Review analytics dashboard', assignee: 'Pulkit', priority: 'low', status: 'done', tags: ['review'] },
  { id: '6', title: 'Write onboarding email sequence', assignee: 'Writer-01', priority: 'medium', status: 'todo', due: 'Apr 20', tags: ['email'] },
  { id: '7', title: 'Deploy v2.0 to staging', assignee: 'Coder-01', priority: 'medium', status: 'done', tags: ['deploy'] },
];

const PRIORITY_STYLE = {
  high:   { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  low:    { color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
};

const COLUMNS: { id: Status; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'var(--text-tertiary)' },
  { id: 'inprogress', title: 'In Progress', color: 'var(--accent)' },
  { id: 'done', title: 'Done', color: 'var(--system-green)' },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const moveTask = (id: string, to: Status) => setTasks(t => t.map(task => task.id === id ? { ...task, status: to } : task));

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1>Tasks</h1>
          <p>Track and manage work across your AI team.</p>
        </div>
        <button className="btn-primary btn-scale"><Plus size={13} /> New Task</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: col.color, display: 'inline-block' }} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{col.title}</span>
                <span className="badge badge-gray" style={{ marginLeft: 'auto' }}>{colTasks.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colTasks.map(task => {
                  const p = PRIORITY_STYLE[task.priority];
                  return (
                    <div key={task.id} className="card" style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                        <GripVertical size={12} style={{ color: 'var(--text-quaternary)', marginTop: 2, flexShrink: 0, cursor: 'grab' }} />
                        <span style={{ fontSize: 13, lineHeight: 1.4, flex: 1 }}>{task.title}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                        {task.tags.map(tag => (
                          <span key={tag} className="badge badge-gray" style={{ fontSize: 9 }}>
                            <Tag size={8} /> {tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className="badge" style={{ fontSize: 9, background: p.bg, color: p.color }}>{task.priority}</span>
                        {task.assignee && <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{task.assignee}</span>}
                        {task.due && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--text-tertiary)' }}>
                            <Clock size={9} /> {task.due}
                          </span>
                        )}
                      </div>
                      {/* Move buttons */}
                      {col.id !== 'todo' && (
                        <button
                          className="btn-ghost btn-scale"
                          style={{ width: '100%', marginTop: 8, justifyContent: 'center', fontSize: 10, padding: '4px 8px' }}
                          onClick={() => moveTask(task.id, col.id === 'done' ? 'inprogress' : 'todo')}
                        >
                          ← Move to {col.id === 'done' ? 'In Progress' : 'To Do'}
                        </button>
                      )}
                    </div>
                  );
                })}
                {colTasks.length === 0 && (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-quaternary)', fontSize: 12, borderRadius: 'var(--radius-md)', border: '1px dashed var(--separator)' }}>
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
