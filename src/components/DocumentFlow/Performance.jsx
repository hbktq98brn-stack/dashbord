import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'];

export default function Performance({ emails, tasks, employees }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleEmployee = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedEmployees = employees.filter(e => selectedIds.includes(e.id));

  const getEmployeeStats = (empId) => {
    const empTasks = tasks.filter(t => t.assignee === empId);
    const total = empTasks.length;
    const closed = empTasks.filter(t => t.column === 'done').length;
    const inProgress = empTasks.filter(t => t.column === 'in_progress').length;
    const review = empTasks.filter(t => t.column === 'review').length;
    const newTasks = empTasks.filter(t => t.column === 'new').length;
    const now = new Date();
    const overdue = empTasks.filter(t => {
      if (!t.deadline) return false;
      return new Date(t.deadline) <= now && t.column !== 'done';
    }).length;
    const efficiency = total > 0 ? Math.round((closed / total) * 100) : 100;
    return { total, closed, inProgress, review, newTasks, overdue, efficiency };
  };

  const combined = selectedEmployees.map(emp => ({
    name: emp.name,
    ...getEmployeeStats(emp.id)
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Персональная эффективность</h2>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Выберите сотрудников:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
          {employees.map(emp => (
            <label key={emp.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedIds.includes(emp.id)}
                onChange={() => toggleEmployee(emp.id)}
              />
              {emp.name}
            </label>
          ))}
        </div>
      </div>

      {selectedEmployees.length === 0 && (
        <p className="text-xs text-gray-400">Ни один сотрудник не выбран</p>
      )}

      {combined.length > 0 && (
        <div className="space-y-6">
          {/* Таблица с показателями */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">Сотрудник</th>
                  <th className="p-2 text-center">Всего задач</th>
                  <th className="p-2 text-center">Новых</th>
                  <th className="p-2 text-center">В работе</th>
                  <th className="p-2 text-center">На проверке</th>
                  <th className="p-2 text-center">Готово</th>
                  <th className="p-2 text-center">Просрочено</th>
                  <th className="p-2 text-center">Рейтинг</th>
                </tr>
              </thead>
              <tbody>
                {combined.map(row => (
                  <tr key={row.name} className="border-t">
                    <td className="p-2">{row.name}</td>
                    <td className="p-2 text-center">{row.total}</td>
                    <td className="p-2 text-center">{row.newTasks}</td>
                    <td className="p-2 text-center">{row.inProgress}</td>
                    <td className="p-2 text-center">{row.review}</td>
                    <td className="p-2 text-center">{row.closed}</td>
                    <td className="p-2 text-center text-red-600">{row.overdue}</td>
                    <td className="p-2 text-center font-semibold">{row.efficiency}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* График рейтинга */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={combined}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#3b82f6" name="Рейтинг" />
            </BarChart>
          </ResponsiveContainer>

          {/* Распределение задач по статусам (суммарно) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-2">Распределение задач</h3>
              {combined.length > 0 && (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Новые', value: combined.reduce((sum, r) => sum + r.newTasks, 0) },
                        { name: 'В работе', value: combined.reduce((sum, r) => sum + r.inProgress, 0) },
                        { name: 'На проверке', value: combined.reduce((sum, r) => sum + r.review, 0) },
                        { name: 'Готово', value: combined.reduce((sum, r) => sum + r.closed, 0) },
                        { name: 'Просрочено', value: combined.reduce((sum, r) => sum + r.overdue, 0) }
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {[0,1,2,3,4].map(i => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Загрузка (часы)</h3>
              {/* Здесь можно добавить график часов, если потребуется */}
              <p className="text-xs text-gray-500">Данные из ежедневных отчётов</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
