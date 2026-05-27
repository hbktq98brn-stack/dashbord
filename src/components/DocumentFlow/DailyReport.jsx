import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function DailyReport({ employees, reports, onSubmit }) {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [comment, setComment] = useState('');
  const [hours, setHours] = useState('');
  const [submittedEmp, setSubmittedEmp] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmp || !comment || !hours) return;
    onSubmit(Number(selectedEmp), comment, parseFloat(hours));
    setSubmittedEmp(Number(selectedEmp));
    setComment('');
    setHours('');
    setSelectedEmp('');
    setTimeout(() => setSubmittedEmp(null), 2000);
  };

  // Проверяем, сдал ли сотрудник отчёт сегодня
  const today = new Date().toISOString().slice(0, 10);
  const reportStatus = employees.reduce((acc, emp) => {
    acc[emp.id] = reports.some(r => r.employeeId === emp.id && r.date.startsWith(today));
    return acc;
  }, {});

  // Данные для диаграммы загрузки за сегодня
  const todayLoad = employees
    .map(emp => {
      const total = reports
        .filter(r => r.employeeId === emp.id && r.date.startsWith(today))
        .reduce((sum, r) => sum + (r.hours || 0), 0);
      return { name: emp.name, hours: total };
    })
    .filter(item => item.hours > 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Ежедневный отчёт</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
          value={selectedEmp}
          onChange={e => setSelectedEmp(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        >
          <option value="">Выберите сотрудника</option>
          {employees.map(e => (
            <option key={e.id} value={e.id}>
              {e.name} {reportStatus[e.id] ? '✓' : ''}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Что сделано..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="border rounded-lg p-2 text-sm h-20"
        />
        <input
          type="number"
          step="0.5"
          placeholder="Часы"
          value={hours}
          onChange={e => setHours(e.target.value)}
          className="border rounded-lg p-2 text-sm w-24"
        />
        <button
          type="submit"
          className="bg-brand-500 text-white py-2 px-4 rounded-lg hover:bg-brand-600 text-sm self-start"
        >
          Отправить отчёт
        </button>
        {submittedEmp && (
          <div className="text-xs text-green-600">Отчёт принят</div>
        )}
      </form>
      <div className="mt-4 text-xs text-gray-400">
        Галочка — отчёт сдан сегодня
      </div>

      {/* Диаграмма загрузки за сегодня */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Загрузка за сегодня (часы)
        </h3>
        {todayLoad.length > 0 ? (
          <ResponsiveContainer width="100%" height={Math.max(todayLoad.length * 40, 80)}>
            <BarChart data={todayLoad} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-xs text-gray-400">Сегодня ещё никто не отчитался</p>
        )}
      </div>
    </div>
  );
}
