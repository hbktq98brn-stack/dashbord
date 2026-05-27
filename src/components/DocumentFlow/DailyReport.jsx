import React, { useState } from 'react'

export default function DailyReport({ employees, reports, onSubmit }) {
  const [selectedEmp, setSelectedEmp] = useState('')
  const [comment, setComment] = useState('')
  const [hours, setHours] = useState('')
  const [submittedEmp, setSubmittedEmp] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedEmp || !comment || !hours) return
    onSubmit(Number(selectedEmp), comment, parseFloat(hours))
    setSubmittedEmp(Number(selectedEmp))
    setComment('')
    setHours('')
    setSelectedEmp('')
    setTimeout(() => setSubmittedEmp(null), 2000)
  }

  const today = new Date().toISOString().slice(0, 10)
  const reportStatus = employees.reduce((acc, emp) => {
    acc[emp.id] = reports[emp.id]?.date === today
    return acc
  }, {})

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
    </div>
  )
}
