import React, { useState, useEffect } from 'react';
import EmailPulse from './EmailPulse';
import DailyReport from './DailyReport';
import KanbanBoard from './KanbanBoard';
import LoadBalance from './LoadBalance';
import Performance from './Performance';
import Analytics from './Analytics';
import LogViewer from '../LogViewer';
import ReportModal from '../ReportModal';
import { employees as fullEmployees } from '../../data/employees';

// Ключи для localStorage
const STORAGE_TASKS = 'dashboard_kanban_tasks';
const STORAGE_REPORTS = 'dashboard_daily_reports';

// Загрузка из localStorage
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Сохранение в localStorage
function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {}
}

// Имитация писем (как раньше)
const initialEmails = [
  { id: 101, subject: 'Запрос КП от клиента А', assignee: 1, status: 'new', deadline: new Date(Date.now() + 3600000).toISOString(), overdue: false },
  { id: 102, subject: 'Согласование договора', assignee: 2, status: 'in_progress', deadline: new Date(Date.now() - 86400000).toISOString(), overdue: true },
  { id: 103, subject: 'Жалоба пользователя', assignee: 3, status: 'new', deadline: new Date(Date.now() + 7200000).toISOString(), overdue: false },
  { id: 104, subject: 'Внутренний регламент', assignee: 4, status: 'review', deadline: new Date(Date.now() - 172800000).toISOString(), overdue: true }
];

export default function DocumentFlow() {
  const [emails, setEmails] = useState(initialEmails);
  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_TASKS, []));
  const [reports, setReports] = useState(() => loadFromStorage(STORAGE_REPORTS, []));

  // Сохраняем задачи при изменении
  useEffect(() => {
    saveToStorage(STORAGE_TASKS, tasks);
  }, [tasks]);

  // Сохраняем отчёты при изменении
  useEffect(() => {
    saveToStorage(STORAGE_REPORTS, reports);
  }, [reports]);

  // Имитация изменения статусов писем
  useEffect(() => {
    const interval = setInterval(() => {
      setEmails(prev => prev.map(email => {
        if (Math.random() > 0.7) {
          const statuses = ['new', 'in_progress', 'review'];
          const nextIdx = (statuses.indexOf(email.status) + 1) % statuses.length;
          return { ...email, status: statuses[nextIdx], overdue: new Date(email.deadline) < new Date() };
        }
        return email;
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Обработчик нового отчёта (сохраняет и добавляет в список)
  const handleReportSubmit = (employeeId, comment, hours) => {
    const newReport = {
      id: Date.now(),
      employeeId,
      comment,
      hours,
      date: new Date().toISOString()
    };
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
  };

  // Добавление новой задачи
  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    const updated = [...tasks, newTask];
    setTasks(updated);
  };

  // Изменение статуса задачи (колонки)
  const updateTaskStatus = (taskId, newColumn) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, column: newColumn } : t);
    setTasks(updated);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailPulse emails={emails} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoadBalance reports={reports} employees={fullEmployees} />
        <Performance emails={emails} tasks={tasks} employees={fullEmployees} />
      </div>

      <Analytics />
    </div>
  );
}
