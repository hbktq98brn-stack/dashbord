import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockTrend = [
  { day: 'Пн', просрочек: 3, закрыто: 12 },
  { day: 'Вт', просрочек: 5, закрыто: 8 },
  { day: 'Ср', просрочек: 2, закрыто: 15 },
  { day: 'Чт', просрочек: 4, закрыто: 10 },
  { day: 'Пт', просрочек: 1, закрыто: 14 }
]

export default function Analytics() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Аналитика просрочек и закрытий</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={mockTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="просрочек" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="закрыто" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-400 mt-2">*тренд за текущую неделю (мок)</p>
    </div>
  )
}
