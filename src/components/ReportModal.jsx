import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ReportModal({ employees, reports, tasks }) {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [period, setPeriod] = useState('day'); // day, week, month, year
  const [showReport, setShowReport] = useState(false);

  const getDateRange = (periodType) => {
    const now = new Date();
    const start = new Date();
    switch (periodType) {
      case 'day': start.setHours(0,0,0,0); break;
      case 'week': start.setDate(now.getDate() - 7); break;
      case 'month': start.setMonth(now.getMonth() - 1); break;
      case 'year': start.setFullYear(now.getFullYear() - 1); break;
      default: start.setHours(0,0,0,0);
    }
    return { start, end: now };
  };

  const handleGenerate = () => {
    if (!selectedEmp) return;
    setShowReport(true);
  };

  const handleClose = () => {
    setShowReport(false);
  };

  const { start, end } = getDateRange(period);
  const empId = Number(selectedEmp);
  const emp = employees.find(e => e.id === empId);

  const filteredReports = reports.filter(r => {
    const d = new Date(r.date);
    return r.employeeId === empId && d >= start && d <= end;
  });

  const filteredTasks = tasks.filter(t => {
    return t.assignee === empId;
  });

  // График часов по дням
  const hoursByDay = {};
  filteredReports.forEach(r => {
    const day = r.date.slice(0, 10);
    hoursByDay[day] = (hoursByDay[day] || 0) + r.hours;
  });
  const hoursChartData = Object.entries(hoursByDay).map(([date, hours]) => ({ date, hours }));

  // Статусы задач
  const taskStatuses = { new: 0, in_progress: 0, review: 0, done: 0 };
  filteredTasks.forEach(t => { taskStatuses[t.column]++; });
  const pieData = Object.entries(taskStatuses).map(([key, value]) => ({ name: key, value }));

  const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'];

  return (
    <div className="inline-block ml-2">
      <div className="flex gap-2 items-center">
        <select value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)} className="border rounded p-1 text-sm">
          <option value="">Сотрудник</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>
          ))}
        </select>
        <select value={period} onChange={e => setPeriod(e.target.value)} className="border rounded p-1 text-sm">
          <option value="day">1 день</option>
          <option value="week">1 неделя</option>
          <option value="month">1 месяц</option>
          <option value="year">1 год</option>
        </select>
        <button onClick={handleGenerate} className="bg-brand-500 text-white px-3 py-1 rounded text-sm">Сформировать</button>
      </div>

      {showReport && emp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[85vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Отчёт: {emp.name} ({period})</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-sm mb-2">Затраченные часы по дням</h4>
                {hoursChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={hoursChartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-gray-400">Нет данных за период</p>
                )}
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Статус задач</h4>
                {filteredTasks.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-gray-400">Нет задач</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Детали отчётов</h4>
              {filteredReports.length > 0 ? (
                <table className="w-full text-xs">
                  <thead><tr className="bg-gray-50"><th className="p-1">Дата</th><th>Часы</th><th>Комментарий</th></tr></thead>
                  <tbody>
                    {filteredReports.map(r => (
                      <tr key={r.id}><td className="p-1">{new Date(r.date).toLocaleString('ru')}</td><td>{r.hours}</td><td>{r.comment}</td></tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-xs text-gray-400">Нет записей</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
