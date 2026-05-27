import React from 'react'

const columns = [
  { key: 'new', label: 'Новые', bg: 'bg-blue-50' },
  { key: 'in_progress', label: 'В работе', bg: 'bg-amber-50' },
  { key: 'review', label: 'На проверке', bg: 'bg-purple-50' },
  { key: 'done', label: 'Готово', bg: 'bg-green-50' }
]

export default function KanbanBoard({ tasks, employees }) {
  const getTasksByColumn = (col) => tasks.filter(t => t.column === col)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Канбан задач</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {columns.map(col => (
          <div key={col.key} className={`rounded-xl p-3 ${col.bg}`}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{col.label}</h3>
            <div className="space-y-2">
              {getTasksByColumn(col.key).map(task => (
                <div key={task.id} className="bg-white p-2 rounded shadow-sm text-xs">
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-gray-400">
                    {employees.find(e => e.id === task.assignee)?.name || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
