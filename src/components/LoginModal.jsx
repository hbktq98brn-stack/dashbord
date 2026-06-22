import React, { useState } from 'react';
import { employees } from '../data/employees';
import { useAuth } from '../contexts/AuthContext';
import { useLog } from '../hooks/useLog';

export default function LoginModal() {
  const { user, login } = useAuth();
  const [selectedId, setSelectedId] = useState('');
  const [show, setShow] = useState(!user); // показываем, если не залогинен
  const { addLog } = useLog(user);

  const handleLogin = () => {
    if (!selectedId) return;
    const emp = employees.find(e => e.id === Number(selectedId));
    if (emp) {
      login(emp);
      addLog('Вход в систему', `Сотрудник: ${emp.name}`);
      setShow(false);
    }
  };

  const handleSkip = () => {
    setShow(false);
    addLog('Пропуск авторизации', '');
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Вход в дашборд</h2>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="w-full border rounded p-2 text-sm mb-4"
        >
          <option value="">Выберите сотрудника</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
        <div className="flex gap-2 justify-end">
          <button
            onClick={handleSkip}
            className="text-xs text-gray-500 hover:underline"
          >
            Продолжить без авторизации
          </button>
          <button
            onClick={handleLogin}
            className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 text-sm"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}
