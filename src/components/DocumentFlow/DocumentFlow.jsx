import React, { useState, useEffect } from 'react';
import EmailPulse from './EmailPulse';
import DailyReport from './DailyReport';
import KanbanBoard from './KanbanBoard';
import LoadBalance from './LoadBalance';
import Performance from './Performance';
import Analytics from './Analytics';

const employees = [
  { id: 1, name: 'Анна Иванова' },
  { id: 2, name: 'Пётр Смирнов' },
  { id: 3, name: 'Ольга Орлова' },
  { id: 4, name: 'Дмитрий Соколов' }
];

const initialEmails = [
  { id: 101, subject: 'Запрос КП от клиента А', assignee: 1, status: 'new', deadline: new Date(Date.now() + 3600000).toISOString(), overdue: false },
  { id: 102, subject: 'Согласование договора', assignee: 2, status: 'in_progress', deadline: new Date(Date.now() - 86400000).toISOString(), overdue: true },
  { id: 103, subject: 'Жалоба пользователя', assignee: 3, status: 'new', deadline: new Date(Date.now() + 7200000).toISOString(), overdue: false },
  { id: 104, subject: 'Внутренний регламент', assignee: 4, status: 'review', deadline: new Date(Date.now() - 172800000).toISOString(), overdue: true }
];

const initialTasks = [
  { id: 1, title: 'Подготовить ответ на №102', column: 'in_progress', assignee: 2 },
  { id: 2, title: 'Разобрать КП №101', column: 'new', assignee: 1 },
  { id: 3, title: 'Ответ по жалобе', column: 'review', assignee: 3 }
];

export default function DocumentFlow() {
  const [emails, setEmails] = useState(initialEmails);
  const [tasks, setTasks] = useState(initialTasks);
  const [reports, setReports] = useState({});

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

  const handleReportSubmit = (employeeId, comment, hours) => {
    const today = new Date().toISOString().slice(0, 10);
    setReports(prev => ({ ...prev, [employeeId]: { date: today, comment, hours } }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmailPulse emails={emails} />
        <DailyReport employees={employees} reports={reports} onSubmit={handleReportSubmit} />
      </div>
      <KanbanBoard tasks={tasks} employees={employees} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LoadBalance emails={emails} employees={employees} />
        <Performance employees={employees} emails={emails} />
      </div>
      <Analytics />
    </div>
  );
}
