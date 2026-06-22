import React, { useState, useEffect } from 'react';
import SedControl from './SedControl';   // вместо EmailPulse
import DailyReport from './DailyReport';
import KanbanBoard from './KanbanBoard';
import Analytics from './Analytics';
import LogViewer from '../LogViewer';
import ReportModal from '../ReportModal';
import { employees as fullEmployees } from '../../data/employees';

const STORAGE_TASKS = 'dashboard_kanban_tasks';
const STORAGE_REPORTS = 'dashboard_daily_reports';

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function saveToStorage(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
}

const initialEmails = [
  { id: 101, subject: 'Запрос КП от клиента А', assignee: 1, status: 'new', deadline: new Date(Date.now() + 3600000).toISOString(), overdue: false, date: new Date().toISOString() },
  { id: 102, subject: 'Согласование договора', assignee: 2, status: 'in_progress', deadline: new Date(Date.now() - 86400000).toISOString(), overdue: true, date: new Date().toISOString() },
  { id: 103, subject: 'Жалоба пользователя', assignee: 3, status: 'new', deadline: new Date(Date.now() + 7200000).toISOString(), overdue: false, date: new Date().toISOString() },
  { id: 104, subject: 'Внутренний регламент', assignee: 4, status: 'review', deadline: new Date(Date.now() - 172800000).toISOString(), overdue: true, date: new Date().toISOString() }
];

export default function DocumentFlow() {
  const [emails, setEmails] = useState(initialEmails);
  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_TASKS, []));
  const [reports, setReports] = useState(() => loadFromStorage(STORAGE_REPORTS, []));

  useEffect(() => { saveToStorage(STORAGE_TASKS, tasks); }, [tasks]);
  useEffect(() => { saveToStorage(STORAGE_REPORTS, reports); }, [reports]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmails(prev => prev.map(email => {
        if (Math.random() > 0.7) {
          const statuses = ['new', 'in_progress', 'review', 'closed'];
          const nextIdx = (statuses.indexOf(email.status) + 1) % statuses.length;
          return { ...email, status: statuses[nextIdx], overdue: new Date(email.deadline) < new Date() };
        }
        return email;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReportSubmit = (employeeId, comment, hours) => {
    const newReport = { id: Date.now(), employeeId, comment, hours, date: new Date().toISOString() };
    setReports(prev => [newReport, ...prev]);
  };

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTaskStatus = (taskId, newColumn) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, column: newColumn } : t));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SedControl />
        <DailyReport employees={fullEmployees} reports={reports} onSubmit={handleReportSubmit} />
      </div>

      <div className="flex items-center gap-4 justify-end">
        <LogViewer reports={reports} employees={fullEmployees} />
        <ReportModal employees={fullEmployees} reports={reports} tasks={tasks} />
      </div>

      <KanbanBoard
        tasks={tasks}
        employees={fullEmployees}
        onAddTask={addTask}
        onUpdateTask={updateTaskStatus}
      />

      <Analytics emails={emails} />
    </div>
  );
}
