import React, { useState } from 'react';

export default function LogViewer({ reports, employees }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState('reports'); // 'reports' или 'actions'

  const employeeMap = new Map(employees.map(e => [e.id, e.name]));

  const actionLogs = JSON.parse(localStorage.getItem('dashboard_action_log') || '[]');

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-brand-500 underline hover:text-brand-600"
      >
        📋 История действий
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[85vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Журнал событий</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab('reports')}
                className={`px-3 py-1 text-sm rounded ${tab === 'reports' ? 'bg-brand-500 text-white' : 'bg-gray-100'}`}
              >
                Отчёты ({reports.length})
              </button>
              <button
                onClick={() => setTab('actions')}
                className={`px-3 py-1 text-sm rounded ${tab === 'actions' ? 'bg-brand-500 text-white' : 'bg-gray-100'}`}
              >
                Действия ({actionLogs.length})
              </button>
            </div>
            {tab === 'reports' && (
              <div>
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
            )}
            {tab === 'actions' && (
              <div>
                {actionLogs.length === 0 ? (
                  <p className="text-sm text-gray-500">Нет записей</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-2">Время</th>
                        <th className="text-left p-2">Пользователь</th>
                        <th className="text-left p-2">Действие</th>
                        <th className="text-left p-2">Детали</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...actionLogs].reverse().map((log, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2 whitespace-nowrap">{new Date(log.timestamp).toLocaleString('ru')}</td>
                          <td className="p-2">{log.user}</td>
                          <td className="p-2">{log.action}</td>
                          <td className="p-2">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
