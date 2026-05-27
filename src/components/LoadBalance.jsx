import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function LoadBalance({ emails, employees }) {
  const data = employees.map(emp => ({
    name: emp.name.split(' ')[0],
    active: emails.filter(e => e.assignee === emp.id && e.status !== 'closed').length,
    overdue: emails.filter(e => e.assignee === emp.id && e.overdue).length
  }))

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Загрузка сотрудников</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="active" fill="#3b82f6" name="Активных писем" />
          <Bar dataKey="overdue" fill="#ef4444" name="Просрочено" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
