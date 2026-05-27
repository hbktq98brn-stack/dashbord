import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function TrendChart({ data, color }) {
  const chartData = data.map((val, idx) => ({ name: idx, value: val }));
  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
