import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { employees } from '../data/employees';

// ---------- МОК-ДАННЫЕ ДЛЯ КАРТОЧЕК ----------

// 1. ЭЦП (10 записей)
const ecpData = [
  { id: 1, fio: 'Ветров Михаил Игоревич', certNumber: 'ECP-2026-001', issuedDate: '12.01.2026', expiryDate: '12.01.2027', installed: true },
  { id: 2, fio: 'Волков Андрей Вячеславович', certNumber: 'ECP-2026-002', issuedDate: '20.02.2026', expiryDate: '20.02.2027', installed: true },
  { id: 3, fio: 'Егорова Полина Герольдовна', certNumber: 'ECP-2026-003', issuedDate: '05.03.2026', expiryDate: '05.03.2027', installed: false },
  { id: 4, fio: 'Илюхина Александра Сергеевна', certNumber: 'ECP-2026-004', issuedDate: '15.04.2026', expiryDate: '15.04.2027', installed: true },
  { id: 5, fio: 'Кондратьев Дмитрий Игоревич', certNumber: 'ECP-2026-005', issuedDate: '01.05.2026', expiryDate: '01.05.2027', installed: true },
  { id: 6, fio: 'Крайнов Вячеслав Сергеевич', certNumber: 'ECP-2026-006', issuedDate: '10.06.2026', expiryDate: '10.06.2027', installed: false },
  { id: 7, fio: 'Красилова Наталия Викторовна', certNumber: 'ECP-2026-007', issuedDate: '22.06.2026', expiryDate: '22.06.2027', installed: true },
  { id: 8, fio: 'Леднев Илья Юрьевич', certNumber: 'ECP-2026-008', issuedDate: '01.07.2026', expiryDate: '01.07.2027', installed: true },
  { id: 9, fio: 'Ломакина Елена Анатольевна', certNumber: 'ECP-2026-009', issuedDate: '15.07.2026', expiryDate: '15.07.2027', installed: false },
  { id: 10, fio: 'Макушин Алексей Юрьевич', certNumber: 'ECP-2026-010', issuedDate: '30.07.2026', expiryDate: '30.07.2027', installed: true },
];

// 2. Учетные записи сотрудников
const accountsData = employees.map((emp, idx) => ({
  id: emp.id,
  fio: emp.name,
  position: emp.position,
  department: 'Департамент управления делами и цифровой трансформации',
  division: idx % 2 === 0 ? 'Отдел информационных технологий' : 'Отдел цифровой трансформации',
  blocked: idx === 2 || idx === 5,
}));

// 3. План переаттестации
const attestationPlan = [
  { no: 1, certNumber: '1846.0255.23 от 11.12.2023', room: '31', objectName: 'ВП', planDate: '10.12.2028', address: 'Гнездниковский пер.', workType: '-' },
  { no: 2, certNumber: '1846.0256.23 от 11.12.2023', room: '39/1', objectName: 'ВП', planDate: '10.12.2028', address: '-', workType: '-' },
  { no: 3, certNumber: '1846.0038.24 от 01.02.2024', room: '39', objectName: 'ВП', planDate: '31.01.2029', address: '-', workType: '-' },
  { no: 4, certNumber: '1846.0123.25 от 15.05.2025', room: '42', objectName: 'Серверная', planDate: '15.05.2030', address: 'ул. Тверская, 7', workType: 'Установка доп. вентиляции' },
];

// 4. Отчет о работе ОИТ
const loadOitTasks = () => {
  try {
    return JSON.parse(localStorage.getItem('oit_tasks') || '[]');
  } catch { return []; }
};

// 5. Антивирусная защита
const avStatusData = employees.map(emp => ({
  fio: emp.name,
  updated: Math.random() > 0.1,
  lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('ru'),
}));

// 6. Резервное копирование
const backupData = [
  { date: '23.06.2026', status: 'Успешно' },
  { date: '22.06.2026', status: 'Успешно' },
  { date: '21.06.2026', status: 'Ошибка' },
  { date: '20.06.2026', status: 'Успешно' },
  { date: '19.06.2026', status: 'Успешно' },
];

// 7. Инциденты ИБ
const incidentsData = [
  { id: 1, date: '15.06.2026', description: 'Попытка несанкционированного доступа к СЭД', status: 'Закрыт', timeToClose: 4 },
  { id: 2, date: '18.06.2026', description: 'Обнаружено вредоносное ПО на АРМ бухгалтера', status: 'Закрыт', timeToClose: 2 },
  { id: 3, date: '21.06.2026', description: 'Подозрительный сетевой трафик', status: 'Открыт', timeToClose: null },
];

// ---------- ТЕМЫ ЗАДАЧ ОИТ ----------
const taskTopics = ['Установка ЭЦП', 'Установка ПО и компонентов', 'Техническая поддержка', 'Обновление антивируса', 'Настройка сети'];

export default function IBIT() {
  const [activeCard, setActiveCard] = useState(null);
  const [oitTasks, setOitTasks] = useState(loadOitTasks);
  const [showOitForm, setShowOitForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('oit_tasks', JSON.stringify(oitTasks));
  }, [oitTasks]);

  // Подсчёт индикаторов
  const ecpTotal = ecpData.length;
  const ecpExpiring7d = ecpData.filter(e => {
    const exp = new Date(e.expiryDate.split('.').reverse().join('-'));
    const now = new Date();
    const diff = (exp - now) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }).length;
  const ecpOverdue = ecpData.filter(e => {
    const exp = new Date(e.expiryDate.split('.').reverse().join('-'));
    return exp < new Date();
  }).length;

  const accountsTotal = accountsData.length;
  const accountsBlocked = accountsData.filter(a => a.blocked).length;

  const attestationTotal = attestationPlan.length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const oitTodayTasks = oitTasks.filter(t => t.date.startsWith(todayStr));
  const oitChartData = taskTopics.map(topic => ({
    name: topic,
    value: oitTodayTasks.filter(t => t.topic === topic).length,
  })).filter(d => d.value > 0);

  const avUpdated = avStatusData.filter(a => a.updated).length;
  const avTotal = avStatusData.length;

  const lastBackup = backupData[0];
  const openIncidents = incidentsData.filter(i => i.status === 'Открыт').length;
  const totalIncidents = incidentsData.length;

  const addOitTask = (task) => setOitTasks(prev => [task, ...prev]);

  // Статус карточки (зелёный/жёлтый/красный)
  const getCardStatus = (key) => {
    switch (key) {
      case 'ecp': return ecpOverdue > 0 ? 'red' : ecpExpiring7d > 0 ? 'yellow' : 'green';
      case 'accounts': return accountsBlocked > 0 ? 'yellow' : 'green';
      case 'attestation': return 'green';
      case 'oitReport': return 'green';
      case 'antivirus': return avUpdated / avTotal >= 0.95 ? 'green' : 'yellow';
      case 'backup': return lastBackup.status === 'Успешно' ? 'green' : 'red';
      case 'incidents': return openIncidents > 0 ? 'red' : 'green';
      default: return 'green';
    }
  };

  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50 animate-pulse',
  };

  // Карточки с индикаторами в стиле «Проектов»
  const cards = [
    {
      key: 'ecp',
      title: 'ЭЦП',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{ecpTotal}</span>
          {ecpExpiring7d > 0 && <span title="Истекает через 7 дней" className="text-yellow-600">⏳{ecpExpiring7d}</span>}
          {ecpOverdue > 0 && <span title="Просрочено" className="text-red-600">✗{ecpOverdue}</span>}
        </div>
      ),
      content: 'Сертификаты ЭЦП',
    },
    {
      key: 'accounts',
      title: 'Учетные записи',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{accountsTotal}</span>
          {accountsBlocked > 0 && <span title="Заблокировано" className="text-red-600">🚫{accountsBlocked}</span>}
        </div>
      ),
      content: 'Управление доступом',
    },
    {
      key: 'attestation',
      title: 'План переаттестации',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{attestationTotal}</span>
        </div>
      ),
      content: 'Аттестация объектов',
    },
    {
      key: 'oitReport',
      title: 'Отчет о работе ОИТ',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span className="text-blue-600">Сегодня: {oitTodayTasks.length}</span>
        </div>
      ),
      content: 'Задачи сотрудников',
    },
    {
      key: 'antivirus',
      title: 'Антивирусная защита',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span className="text-green-600">Обновлено {avUpdated}/{avTotal}</span>
        </div>
      ),
      content: 'Статус обновлений',
    },
    {
      key: 'backup',
      title: 'Резервное копирование',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span className={lastBackup.status === 'Успешно' ? 'text-green-600' : 'text-red-600'}>
            {lastBackup.status === 'Успешно' ? '✓' : '✗'} {lastBackup.status}
          </span>
        </div>
      ),
      content: 'Статус бэкапов',
    },
    {
      key: 'incidents',
      title: 'Инциденты ИБ',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{totalIncidents}</span>
          {openIncidents > 0 && <span title="Открыто" className="text-red-600">❗{openIncidents}</span>}
        </div>
      ),
      content: 'Управление инцидентами',
    },
  ];

  // Модальные окна (содержание без изменений)
  const renderModal = () => {
    if (!activeCard) return null;
    switch (activeCard) {
      case 'ecp':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Сертификаты ЭЦП</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">№</th><th className="p-2 text-left">ФИО</th><th className="p-2 text-left">Номер сертификата</th><th className="p-2 text-left">Дата выдачи</th><th className="p-2 text-left">Дата окончания</th><th className="p-2 text-left">Установлена/обновлена</th></tr></thead>
                <tbody>
                  {ecpData.map(ecp => (
                    <tr key={ecp.id} className="border-t">
                      <td className="p-2">{ecp.id}</td><td className="p-2">{ecp.fio}</td><td className="p-2">{ecp.certNumber}</td>
                      <td className="p-2">{ecp.issuedDate}</td><td className="p-2">{ecp.expiryDate}</td>
                      <td className="p-2"><select value={ecp.installed ? 'Да' : 'Нет'} onChange={() => {}} className="border rounded p-1 text-xs"><option value="Да">Да</option><option value="Нет">Нет</option></select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'accounts':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Учетные записи сотрудников</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">ФИО</th><th className="p-2 text-left">Должность</th><th className="p-2 text-left">Отдел</th><th className="p-2 text-left">Департамент</th><th className="p-2 text-left">Заблокирована</th></tr></thead>
                <tbody>
                  {accountsData.map(acc => (
                    <tr key={acc.id} className="border-t">
                      <td className="p-2">{acc.fio}</td><td className="p-2">{acc.position}</td><td className="p-2">{acc.division}</td><td className="p-2">{acc.department}</td>
                      <td className="p-2"><select value={acc.blocked ? 'Да' : 'Нет'} onChange={() => {}} className="border rounded p-1 text-xs"><option value="Да">Да</option><option value="Нет">Нет</option></select></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'attestation':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">План переаттестации</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">№ п/п</th><th className="p-2 text-left">Аттестат соответствия</th><th className="p-2 text-left">Номер помещения</th><th className="p-2 text-left">Наименование объекта</th><th className="p-2 text-left">Плановая переаттестация</th><th className="p-2 text-left">Адрес</th><th className="p-2 text-left">Тип доработок</th></tr></thead>
                <tbody>
                  {attestationPlan.map(row => (
                    <tr key={row.no} className="border-t">
                      <td className="p-2">{row.no}</td><td className="p-2">{row.certNumber}</td><td className="p-2">{row.room}</td><td className="p-2">{row.objectName}</td>
                      <td className="p-2">{row.planDate}</td><td className="p-2">{row.address}</td><td className="p-2">{row.workType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'oitReport':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Отчет о работе ОИТ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <button onClick={() => setShowOitForm(!showOitForm)} className="mb-4 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 text-sm">
                {showOitForm ? 'Закрыть форму' : '+ Добавить задачу'}
              </button>
              {showOitForm && <OitTaskForm employees={employees} topics={taskTopics} onAdd={addOitTask} />}
              {oitTodayTasks.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Распределение задач сегодня</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={oitChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {oitChartData.map((entry, index) => (
                          <Cell key={index} fill={['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'][index % 5]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Последние задачи</h4>
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50"><th className="p-2 text-left">Сотрудник</th><th className="p-2 text-left">Тема</th><th className="p-2 text-left">Описание</th><th className="p-2 text-left">Часы</th><th className="p-2 text-left">Дата</th></tr></thead>
                  <tbody>
                    {oitTasks.slice(0, 10).map(task => (
                      <tr key={task.id} className="border-t">
                        <td className="p-2">{employees.find(e => e.id === task.employeeId)?.name || '—'}</td>
                        <td className="p-2">{task.topic}</td>
                        <td className="p-2 max-w-xs truncate">{task.description}</td>
                        <td className="p-2">{task.hours}</td>
                        <td className="p-2">{new Date(task.date).toLocaleDateString('ru')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'antivirus':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Антивирусная защита</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">Сотрудник</th><th className="p-2 text-left">Обновлены базы</th><th className="p-2 text-left">Последнее обновление</th></tr></thead>
                <tbody>
                  {avStatusData.map((av, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{av.fio}</td><td className="p-2">{av.updated ? 'Да' : 'Нет'}</td><td className="p-2">{av.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'backup':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Резервное копирование</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">Дата</th><th className="p-2 text-left">Статус</th></tr></thead>
                <tbody>
                  {backupData.map((b, idx) => (
                    <tr key={idx} className="border-t"><td className="p-2">{b.date}</td><td className="p-2">{b.status}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'incidents':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Инциденты ИБ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">Дата</th><th className="p-2 text-left">Описание</th><th className="p-2 text-left">Статус</th><th className="p-2 text-left">Время закрытия (ч)</th></tr></thead>
                <tbody>
                  {incidentsData.map(inc => (
                    <tr key={inc.id} className="border-t">
                      <td className="p-2">{inc.date}</td><td className="p-2">{inc.description}</td><td className="p-2">{inc.status}</td><td className="p-2">{inc.timeToClose ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map(card => {
          const status = getCardStatus(card.key);
          return (
            <div
              key={card.key}
              onClick={() => setActiveCard(card.key)}
              className={`metric-card p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${statusClasses[status]} relative h-48 flex flex-col`}
            >
              {card.indicators}
              <h3 className="text-base font-semibold text-gray-800 mb-2 pr-16">{card.title}</h3>
              <p className="text-xs text-gray-500 flex-1">{card.content}</p>
            </div>
          );
        })}
      </div>
      {renderModal()}
    </div>
  );
}

// Форма добавления задачи ОИТ
function OitTaskForm({ employees, topics, onAdd }) {
  const [employeeId, setEmployeeId] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !description || !hours) return;
    onAdd({
      id: Date.now(),
      employeeId: Number(employeeId),
      topic,
      description,
      hours: parseFloat(hours),
      date: new Date().toISOString(),
    });
    setDescription('');
    setHours('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4 p-4 bg-gray-50 rounded">
      <select value={employeeId} onChange={e => setEmployeeId(e.target.value)} className="w-full border rounded p-2 text-sm">
        <option value="">Сотрудник</option>
        {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
      </select>
      <select value={topic} onChange={e => setTopic(e.target.value)} className="w-full border rounded p-2 text-sm">
        {topics.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Описание задачи" className="w-full border rounded p-2 text-sm" rows={2} />
      <input type="number" step="0.5" value={hours} onChange={e => setHours(e.target.value)} placeholder="Часы" className="w-full border rounded p-2 text-sm" />
      <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 text-sm">Добавить</button>
    </form>
  );
}
