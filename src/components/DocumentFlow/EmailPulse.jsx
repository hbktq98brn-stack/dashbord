import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { format } from 'date-fns';

export default function EmailPulse({ emails }) {
  const newCount = emails.filter(e => e.status === 'new').length;
  const inProgress = emails.filter(e => e.status === 'in_progress').length;
  const review = emails.filter(e => e.status === 'review').length;
  const overdue = emails.filter(e => e.overdue).length;

  const data = [
    { name: 'Новые', value: newCount, color: '#3b82f6' },
    { name: 'В работе', value: inProgress, color: '#f59e0b' },
    { name: 'На ревью', value: review, color: '#8b5cf6' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Пульт контроля СЭД</h2>
      <div className="flex items-center gap-6">
        <PieChart width={140} height={140}>
          <Pie data={data} innerRadius={45} outerRadius={65} dataKey="value">
            {data.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Новых</span>
            <span className="font-semibold">{newCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">В работе</span>
            <span className="font-semibold">{inProgress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Просрочено</span>
            <span className="font-semibold text-red-500">{overdue}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 max-h-36 overflow-auto space-y-1">
        {emails.filter(e => e.overdue).slice(0, 3).map(e => (
          <div key={e.id} className="text-xs bg-red-50 text-red-700 p-2 rounded">
            #{e.id} {e.subject} – до {format(new Date(e.deadline), 'dd.MM HH:mm')}
          </div>
        ))}
      </div>
    </div>
  );
}
