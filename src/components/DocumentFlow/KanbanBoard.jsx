import React, { useState } from 'react';

const columns = [
  { key: 'new', label: 'Новые', bg: 'bg-blue-50' },
  { key: 'in_progress', label: 'В работе', bg: 'bg-amber-50' },
  { key: 'review', label: 'На проверке', bg: 'bg-purple-50' },
  { key: 'done', label: 'Готово', bg: 'bg-green-50' }
];

export default function KanbanBoard({ tasks, employees, onAddTask, onUpdateTask }) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');

  const handleAdd = () => {
    if (!newTaskTitle.trim()) return;
    onAddTask({
      title: newTaskTitle.trim(),
      column: 'new',
      assignee: newTaskAssignee ? Number(newTaskAssignee) : null
    });
    setNewTaskTitle('');
    setNewTaskAssignee('');
  };

  const moveTask = (taskId, direction) => {
    const currentTask = tasks.find(t => t.id === taskId);
    if (!currentTask) return;
    const currentIdx = columns.findIndex(c => c.key === currentTask.column);
    const newIdx = direction === 'left' ? currentIdx - 1 : currentIdx + 1;
    if (newIdx < 0 || newIdx >= columns.length) return;
    onUpdateTask(taskId, columns[newIdx].key);
  };

  const getTasksByColumn = (col) => tasks.filter(t => t.column === col);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Канбан задач</h2>

      {/* Форма добавления задачи */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Название задачи"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          className="border rounded p-2 text-sm flex-1 min-w-[200px]"
        />
        <select
          value={newTaskAssignee}
          onChange={e => setNewTaskAssignee(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">Без ответственного</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 text-sm"
        >
          Добавить
        </button>
      </div>

      {/* Доска с колонками */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {columns.map(col => (
          <div key={col.key} className={`rounded-xl p-3 ${col.bg}`}>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{col.label}</h3>
            <div className="space-y-2">
              {getTasksByColumn(col.key).map(task => (
                <div key={task.id} className="bg-white p-2 rounded shadow-sm text-xs relative">
                  <p className="font-semibold">{task.title}</p>
                  <p className="text-gray-400">
                    {employees.find(e => e.id === task.assignee)?.name || 'Не назначен'}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <button
                      className="text-xs text-gray-500 hover:text-blue-600"
                      onClick={() => moveTask(task.id, 'left')}
                      title="Переместить влево"
                    >
                      ◀
                    </button>
                    <button
                      className="text-xs text-gray-500 hover:text-blue-600"
                      onClick={() => moveTask(task.id, 'right')}
                      title="Переместить вправо"
                    >
                      ▶
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
