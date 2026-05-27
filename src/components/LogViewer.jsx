import React, { useState } from 'react';

export default function LogViewer({ reports, employees }) {
  const [isOpen, setIsOpen] = useState(false);

  const employeeMap = new Map(employees.map(e => [e.id, e.name]));

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-brand-500 underline hover:text-brand-600"
      >
        📋 История всех отчётов
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Все сохранённые отчёты</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            {reports.length === 0 ? (
              <p className="text-sm text-gray-500">Нет записей</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-2">Дата</th>
                    <th className="text-left p-2">Сотрудник</th>
                    <th className="text-left p-2">Часы</th>
                    <th className="text-left p-2">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r.id} className="border-t">
                      <td className="p-2">{new Date(r.date).toLocaleString('ru')}</td>
                      <td className="p-2">{employeeMap.get(r.employeeId) || 'Неизвестно'}</td>
                      <td className="p-2">{r.hours}</td>
                      <td className="p-2 max-w-xs truncate">{r.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
