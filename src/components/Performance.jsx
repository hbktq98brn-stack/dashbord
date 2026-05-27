import React from 'react'

export default function Performance({ employees, emails }) {
  const stats = employees.map(emp => {
    const total = emails.filter(e => e.assignee === emp.id).length
    const overdue = emails.filter(e => e.assignee === emp.id && e.overdue).length
    return {
      name: emp.name,
      total,
      overdue,
      percent: total ? Math.round((overdue / total) * 100) : 0
    }
  })

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Персональная эффективность</h2>
      <div className="space-y-3">
        {stats.map(s => (
          <div key={s.name} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-xs text-gray-400">{s.total} писем / {s.overdue} просрочек</p>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${s.percent > 30 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(100, s.percent)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
