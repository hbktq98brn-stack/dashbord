import React from 'react';

export default function Performance({ emails, tasks, employees }) {
  const stats = employees.map(emp => {
    // Письма (мок)
    const empEmails = emails.filter(e => e.assignee === emp.id);
    const overdueEmails = empEmails.filter(e => e.overdue).length;

    // Задачи
    const empTasks = tasks.filter(t => t.assignee === emp.id);
    const totalTasks = empTasks.length;
    const closedTasks = empTasks.filter(t => t.column === 'done').length;
    const pendingTasks = totalTasks - closedTasks;

    // Просроченные задачи (если у задачи есть deadline и он < сейчас, а статус не done)
    const now = new Date();
    const overdueTasks = empTasks.filter(t => t.deadline && new Date(t.deadline) < now && t.column !== 'done').length;

    // Эффективность = % закрытых задач от общего числа задач, если задач нет – 100%
    const efficiency = totalTasks > 0 ? Math.round((closedTasks / totalTasks) * 100) : 100;

    return {
      name: emp.name,
      totalEmails: empEmails.length,
      overdueEmails,
      totalTasks,
      closedTasks,
      pendingTasks,
      overdueTasks,
      efficiency
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Персональная эффективность</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {stats.map(s => (
          <div key={s.name} className="border-b pb-2">
            <div className="flex justify-between text-sm font-medium">
              <span>{s.name}</span>
              <span className={`${s.efficiency >= 80 ? 'text-green-600' : s.efficiency >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {s.efficiency}%
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1 space-y-1">
              <div>📧 Письма: {s.totalEmails} (просрочено: {s.overdueEmails})</div>
              <div>📋 Задачи: всего {s.totalTasks} | закрыто {s.closedTasks} | открыто {s.pendingTasks} | просрочено {s.overdueTasks}</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className={`h-2 rounded-full ${s.efficiency >= 80 ? 'bg-green-500' : s.efficiency >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${s.efficiency}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
