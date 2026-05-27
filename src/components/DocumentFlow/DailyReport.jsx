import React, { useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function DailyReport({ employees, reports, onSubmit }) {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [comment, setComment] = useState('');
  const [hours, setHours] = useState('');
  const [submittedEmp, setSubmittedEmp] = useState(null);

  // AI-состояния
  const [showAiModal, setShowAiModal] = useState(false);      // окно с ключом и результатом
  const [apiKeyInput, setApiKeyInput] = useState('');         // поле ввода ключа
  const [aiSummary, setAiSummary] = useState('');             // текст сводки
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmp || !comment || !hours) return;
    onSubmit(Number(selectedEmp), comment, parseFloat(hours));
    setSubmittedEmp(Number(selectedEmp));
    setComment('');
    setHours('');
    setSelectedEmp('');
    setTimeout(() => setSubmittedEmp(null), 2000);
  };

  const today = new Date().toISOString().slice(0, 10);
  const reportStatus = employees.reduce((acc, emp) => {
    acc[emp.id] = reports.some(r => r.employeeId === emp.id && r.date.startsWith(today));
    return acc;
  }, {});

  const todayLoad = employees
    .map(emp => {
      const total = reports
        .filter(r => r.employeeId === emp.id && r.date.startsWith(today))
        .reduce((sum, r) => sum + (r.hours || 0), 0);
      return { name: emp.name, hours: total };
    })
    .filter(item => item.hours > 0);

  // Генерация AI-сводки
  const generateAiSummary = useCallback(async () => {
    if (!apiKeyInput.trim()) {
      setAiError('Введите API-ключ OpenRouter');
      return;
    }

    const todayReports = reports.filter(r => r.date.startsWith(today));
    if (todayReports.length === 0) {
      setAiSummary('Сегодня ещё нет отчётов.');
      setAiError('');
      return;
    }

    const reportText = todayReports.map(r => {
      const emp = employees.find(e => e.id === r.employeeId);
      return `${emp ? emp.name : 'Сотрудник'}: ${r.hours}ч — ${r.comment}`;
    }).join('\n');

    const prompt = `Ты — руководитель отдела. Проанализируй следующие ежедневные отчёты сотрудников за сегодня и составь краткую общую сводку. Выдели ключевые задачи, прогресс, возможные проблемы. Вот отчёты:\n${reportText}\n\nДай ответ на русском языке.`;

    setIsAiLoading(true);
    setAiError('');
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeyInput.trim()}`
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-001',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.5
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Ошибка API (${res.status})`);
      }

      const data = await res.json();
      const summary = data.choices?.[0]?.message?.content || 'Пустой ответ от модели.';
      setAiSummary(summary);
    } catch (error) {
      setAiError(`Ошибка: ${error.message}`);
      setAiSummary('');
    } finally {
      setIsAiLoading(false);
    }
  }, [apiKeyInput, reports, today, employees]);

  // Открыть модальное окно (сбрасываем предыдущие результаты)
  const openAiModal = () => {
    setShowAiModal(true);
    setAiSummary('');
    setAiError('');
    // не сбрасываем ключ, чтобы можно было скопировать
  };

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

      {/* Кнопка AI-сводки */}
      <div className="mt-4">
        <button
          onClick={openAiModal}
          className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          🧠 AI-сводка за сегодня
        </button>
        <span className="text-xs text-gray-400 ml-2">требуется ключ OpenRouter</span>
      </div>

      {/* Диаграмма загрузки */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">
          Загрузка за сегодня (часы)
        </h3>
        {todayLoad.length > 0 ? (
          <ResponsiveContainer width="100%" height={Math.max(todayLoad.length * 40, 80)}>
            <BarChart data={todayLoad} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-xs text-gray-400">Сегодня ещё никто не отчитался</p>
        )}
      </div>

      {/* Модальное окно AI */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">AI-сводка за сегодня</h3>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {/* Поле ввода ключа */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API-ключ OpenRouter
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={e => setApiKeyInput(e.target.value)}
                  placeholder="sk-or-..."
                  className="flex-1 border rounded p-2 text-sm"
                />
                <button
                  onClick={generateAiSummary}
                  disabled={isAiLoading}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 text-sm"
                >
                  {isAiLoading ? 'Генерация...' : 'Сгенерировать'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Ключ не сохраняется. Получить: openrouter.ai/keys
              </p>
            </div>

            {/* Ошибка */}
            {aiError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-sm">
                {aiError}
              </div>
            )}

            {/* Результат */}
            {aiSummary && (
              <div className="prose max-w-none text-sm whitespace-pre-wrap bg-gray-50 p-4 rounded">
                {aiSummary}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
