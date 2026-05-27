import React from 'react';

export default function LoadBalance({ reports, employees }) {
  const today = new Date().toISOString().slice(0, 10);

  const hoursToday = employees.map(emp => {
    const total = reports
      .filter(r => r.employeeId === emp.id && r.date.startsWith(today))
      .reduce((sum, r) => sum + (r.hours || 0), 0);
    return { name: emp.name, hours: total };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Загрузка за сегодня (часы)</h2>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {hoursToday.map(item => (
          <div key={item.name} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.name}</span>
            <span className="font-semibold">{item.hours} ч</span>
          </div>
        ))}
      </div>
    </div>
  );
}
