import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

export default function Analytics({ emails }) {
  const chartData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = date.toISOString().slice(0, 10);
      const dayEmails = emails.filter(e => e.date && e.date.startsWith(dateStr));
      days.push({
        day: format(date, 'dd.MM'),
        просрочек: dayEmails.filter(e => e.overdue).length,
        закрыто: dayEmails.filter(e => e.status === 'closed').length,
      });
    }
    return days;
  }, [emails]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Аналитика просрочек и закрытий</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="просрочек" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="закрыто" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-2">*на основе данных СЭД за последние 7 дней</p>
    </div>
  );
}
