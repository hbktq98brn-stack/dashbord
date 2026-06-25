import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { employees, getEmployeeLabel } from '../data/employees';

// ---------- МОК-ДАННЫЕ ----------

// 1. ЭЦП – Федеральное казначейство и Контур
const ecpFederal = [
  { id: 1, fio: 'Ветров М.И.', certNumber: 'ECP-FK-001', issuedDate: '12.01.2026', expiryDate: '12.01.2027', installed: true },
  { id: 2, fio: 'Волков А.В.', certNumber: 'ECP-FK-002', issuedDate: '20.02.2026', expiryDate: '20.02.2027', installed: true },
  { id: 3, fio: 'Егорова П.Г.', certNumber: 'ECP-FK-003', issuedDate: '05.03.2026', expiryDate: '05.03.2027', installed: false },
  { id: 4, fio: 'Илюхина А.С.', certNumber: 'ECP-FK-004', issuedDate: '15.04.2026', expiryDate: '15.04.2027', installed: true },
  { id: 5, fio: 'Кондратьев Д.И.', certNumber: 'ECP-FK-005', issuedDate: '01.05.2026', expiryDate: '01.05.2027', installed: true },
];

const ecpKontur = [
  { id: 1, fio: 'Крайнов В.С.', certNumber: 'ECP-KON-001', issuedDate: '10.06.2026', expiryDate: '10.06.2027', installed: false },
  { id: 2, fio: 'Красилова Н.В.', certNumber: 'ECP-KON-002', issuedDate: '22.06.2026', expiryDate: '22.06.2027', installed: true },
  { id: 3, fio: 'Леднев И.Ю.', certNumber: 'ECP-KON-003', issuedDate: '01.07.2026', expiryDate: '01.07.2027', installed: true },
  { id: 4, fio: 'Ломакина Е.А.', certNumber: 'ECP-KON-004', issuedDate: '15.07.2026', expiryDate: '15.07.2027', installed: false },
  { id: 5, fio: 'Макушин А.Ю.', certNumber: 'ECP-KON-005', issuedDate: '30.07.2026', expiryDate: '30.07.2027', installed: true },
];

const allEcp = [...ecpFederal, ...ecpKontur];

// 2. Учетные записи сотрудников
const accountsData = employees.filter(e => e.id !== 0).map((emp, idx) => ({
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
  try { return JSON.parse(localStorage.getItem('oit_tasks') || '[]'); } catch { return []; }
};

// 5. Антивирусные базы
const avStatusData = employees.filter(e => e.id !== 0).map(emp => ({
  fio: emp.name,
  installed: Math.random() > 0.2,
  lastUpdate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString('ru'),
}));

// 6. Резервное копирование
const lastBackups = {
  sedDelo: '23.06.2026',
  gisIs: '22.06.2026',
  base1c: '21.06.2026',
};

const backupSystems = [
  { name: 'АИС НЭБ', lastBackup: '22.06.2026' }, { name: 'АИС Статистика', lastBackup: '21.06.2026' },
  { name: 'База данных Лостарт', lastBackup: '20.06.2026' }, { name: 'Госкаталог', lastBackup: '19.06.2026' },
  { name: 'ЕАИС', lastBackup: '18.06.2026' }, { name: 'ЕАС Госуслуги', lastBackup: '17.06.2026' },
  { name: 'АИС ЕГРОКН', lastBackup: '16.06.2026' }, { name: 'Интернет ресурсы о культуре', lastBackup: '15.06.2026' },
  { name: 'Культура.РФ', lastBackup: '14.06.2026' }, { name: 'Бор-навигатор', lastBackup: '13.06.2026' },
  { name: 'ПОС МК РФ', lastBackup: '12.06.2026' }, { name: 'ЕИС ПОГУ', lastBackup: '11.06.2026' },
  { name: 'АИС НОКОУОК', lastBackup: '10.06.2026' }, { name: 'АИС ЕИПСК', lastBackup: '09.06.2026' },
  { name: 'АИС Инвентаризация МК РФ', lastBackup: '08.06.2026' }, { name: 'ИАС УПФД', lastBackup: '07.06.2026' },
  { name: 'АИС ЕИП', lastBackup: '06.06.2026' }, { name: 'СЭД Дело', lastBackup: '05.06.2026' },
  { name: 'ДСП-контур', lastBackup: '04.06.2026' }, { name: 'АИС УПБ', lastBackup: '03.06.2026' },
  { name: 'ГИС ОНЭД', lastBackup: '02.06.2026' }, { name: 'Платформа дополненной реальности', lastBackup: '01.06.2026' },
];

// 7. Инциденты ИБ
const incidentsData = [
  { id: 1, date: '15.06.2026', description: 'Попытка несанкционированного доступа к СЭД', status: 'Закрыт', timeToClose: 4, responsible: null },
  { id: 2, date: '18.06.2026', description: 'Обнаружено вредоносное ПО на АРМ бухгалтера', status: 'Закрыт', timeToClose: 2, responsible: null },
  { id: 3, date: '21.06.2026', description: 'Подозрительный сетевой трафик', status: 'Открыт', timeToClose: null, responsible: null },
];

// 8. Выдача ролей в ИС
const roleSystems = [
  { key: 'esia', title: 'ЕСИА', data: [
    { no: 1, fio: 'Илюхина А.С.', roles: 'Администратор', sz: '123-45' },
    { no: 2, fio: 'Прохоров А.П.', roles: 'Пользователь', sz: '124-45' },
  ]},
  { key: 'budget', title: 'Электронный бюджет', data: [
    { no: 1, fio: 'Кондратьев Д.И.', roles: 'Утверждающий', sz: '201-56' },
  ]},
  { key: 'eisuk', title: 'ЕИСУКС', data: [] },
  { key: 'arm_sreda', title: 'АРМ Среда', data: [
    { no: 1, fio: 'Ветров М.И.', roles: 'Разработчик', sz: '301-78' },
    { no: 2, fio: 'Волков А.В.', roles: 'Разработчик', sz: '302-78' },
  ]},
];

// ---------- ТЕМЫ ЗАДАЧ ОИТ ----------
const taskTopics = ['Установка ЭЦП', 'Установка ПО и компонентов', 'Техническая поддержка', 'Обновление антивируса', 'Настройка сети'];

export default function IBIT() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [oitTasks, setOitTasks] = useState(loadOitTasks);
  const [showOitForm, setShowOitForm] = useState(false);
  const [incidents, setIncidents] = useState(incidentsData);

  // Назначенные ответственные по блокам (ключ – card.key)
  const [blockAssignments, setBlockAssignments] = useState(() => {
    const init = {};
    const keys = ['ecp', 'accounts', 'attestation', 'oitReport', 'antivirus', 'backup', 'incidents', 'roles'];
    keys.forEach(k => { init[k] = null; });
    return init;
  });

  useEffect(() => { localStorage.setItem('oit_tasks', JSON.stringify(oitTasks)); }, [oitTasks]);

  const ecpTotal = allEcp.length;
  const ecpExpiring7d = allEcp.filter(e => {
    const exp = new Date(e.expiryDate.split('.').reverse().join('-'));
    const now = new Date();
    const diff = (exp - now) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }).length;
  const ecpOverdue = allEcp.filter(e => {
    const exp = new Date(e.expiryDate.split('.').reverse().join('-'));
    return exp < new Date();
  }).length;

  const accountsTotal = accountsData.length;
  const accountsBlocked = accountsData.filter(a => a.blocked).length;

  const avInstalled = avStatusData.filter(a => a.installed).length;
  const avTotal = avStatusData.length;

  const openIncidents = incidents.filter(i => i.status === 'Открыт').length;
  const totalIncidents = incidents.length;

  const addOitTask = (task) => setOitTasks(prev => [task, ...prev]);

  const getEmployeeById = (id) => employees.find(e => e.id === id);

  const getCardStatus = (key) => {
    switch (key) {
      case 'ecp': return ecpOverdue > 0 ? 'red' : ecpExpiring7d > 0 ? 'yellow' : 'green';
      case 'accounts': return accountsBlocked > 0 ? 'yellow' : 'green';
      case 'attestation': return 'green';
      case 'oitReport': return 'green';
      case 'antivirus': return avInstalled / avTotal >= 0.95 ? 'green' : 'yellow';
      case 'backup': return 'green';
      case 'incidents': return openIncidents > 0 ? 'red' : 'green';
      case 'roles': return 'green';
      default: return 'green';
    }
  };

  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50 animate-pulse',
  };

  const cards = [
    {
      key: 'ecp', title: 'ЭЦП',
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
      key: 'accounts', title: 'Учетные записи',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{accountsTotal}</span>
          {accountsBlocked > 0 && <span title="Заблокировано" className="text-red-600">🚫{accountsBlocked}</span>}
        </div>
      ),
      content: 'Управление доступом',
    },
    {
      key: 'attestation', title: 'План переаттестации',
      indicators: <span className="absolute top-2 right-2 text-xs text-gray-500">Всего: {attestationPlan.length}</span>,
      content: 'Аттестация объектов',
    },
    {
      key: 'oitReport', title: 'Отчет о работе ОИТ',
      indicators: <span className="absolute top-2 right-2 text-xs text-blue-600">Сегодня: {oitTasks.filter(t => t.date.startsWith(new Date().toISOString().slice(0,10))).length}</span>,
      content: 'Задачи сотрудников',
    },
    {
      key: 'antivirus', title: 'Антивирусные базы',
      indicators: <span className="absolute top-2 right-2 text-xs text-green-600">Установлено {avInstalled}/{avTotal}</span>,
      content: 'Статус антивируса',
    },
    {
      key: 'backup', title: 'Резервное копирование',
      indicators: (
        <div className="absolute top-2 right-2 text-xs text-gray-500">
          РК СЭД: {lastBackups.sedDelo}<br />
          РК ГИС/ИС: {lastBackups.gisIs}<br />
          РК Баз 1С: {lastBackups.base1c}
        </div>
      ),
      content: 'Даты последних резервных копий',
    },
    {
      key: 'incidents', title: 'Инциденты ИБ',
      indicators: (
        <div className="absolute top-2 right-2 flex gap-1 text-xs">
          <span title="Всего" className="text-gray-500">Σ{totalIncidents}</span>
          {openIncidents > 0 && <span title="Открыто" className="text-red-600">❗{openIncidents}</span>}
        </div>
      ),
      content: 'Управление инцидентами',
    },
    {
      key: 'roles', title: 'Выдача ролей в ИС',
      indicators: <span className="absolute top-2 right-2 text-xs text-gray-500">Систем: {roleSystems.length}</span>,
      content: 'Назначение ролей',
    },
  ];

  const handleBlockAssign = (cardKey, employeeId) => {
    setBlockAssignments(prev => ({
      ...prev,
      [cardKey]: employeeId ? Number(employeeId) : null
    }));
  };

  // Рендер модальных окон
  const renderModal = () => {
    if (!activeCard) return null;

    switch (activeCard) {
      case 'ecp':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">ЭЦП</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="flex gap-2 border-b mb-4 pb-2">
                {['Федеральное казначейство', 'Контур'].map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSubTab(idx)}
                    className={`px-4 py-2 text-sm rounded-t-lg transition ${activeSubTab === idx ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {activeSubTab === 0 && (
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50"><th className="p-2 text-left">№</th><th className="p-2 text-left">ФИО</th><th className="p-2 text-left">Номер сертификата</th><th className="p-2 text-left">Дата выдачи</th><th className="p-2 text-left">Дата окончания</th><th className="p-2 text-left">Установлена/обновлена</th></tr></thead>
                  <tbody>
                    {ecpFederal.map(ecp => (
                      <tr key={ecp.id} className="border-t">
                        <td className="p-2">{ecp.id}</td><td className="p-2">{ecp.fio}</td><td className="p-2">{ecp.certNumber}</td>
                        <td className="p-2">{ecp.issuedDate}</td><td className="p-2">{ecp.expiryDate}</td>
                        <td className="p-2"><select value={ecp.installed ? 'Да' : 'Нет'} onChange={() => {}} className="border rounded p-1 text-xs"><option value="Да">Да</option><option value="Нет">Нет</option></select></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeSubTab === 1 && (
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50"><th className="p-2 text-left">№</th><th className="p-2 text-left">ФИО</th><th className="p-2 text-left">Номер сертификата</th><th className="p-2 text-left">Дата выдачи</th><th className="p-2 text-left">Дата окончания</th><th className="p-2 text-left">Установлена/обновлена</th></tr></thead>
                  <tbody>
                    {ecpKontur.map(ecp => (
                      <tr key={ecp.id} className="border-t">
                        <td className="p-2">{ecp.id}</td><td className="p-2">{ecp.fio}</td><td className="p-2">{ecp.certNumber}</td>
                        <td className="p-2">{ecp.issuedDate}</td><td className="p-2">{ecp.expiryDate}</td>
                        <td className="p-2"><select value={ecp.installed ? 'Да' : 'Нет'} onChange={() => {}} className="border rounded p-1 text-xs"><option value="Да">Да</option><option value="Нет">Нет</option></select></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
              <div className="mt-4">
                <h4 className="font-medium mb-2">Распределение задач сегодня</h4>
                {oitTasks.filter(t => t.date.startsWith(new Date().toISOString().slice(0,10))).length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={taskTopics.map(topic => ({
                        name: topic,
                        value: oitTasks.filter(t => t.date.startsWith(new Date().toISOString().slice(0,10)) && t.topic === topic).length
                      })).filter(d => d.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {[0,1,2,3,4].map(i => <Cell key={i} fill={['#3b82f6','#f59e0b','#8b5cf6','#10b981','#ef4444'][i]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-sm text-gray-500">Сегодня ещё нет задач</p>}
              </div>
            </div>
          </div>
        );
      case 'antivirus':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Антивирусные базы</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">Сотрудник</th><th className="p-2 text-left">Антивирус установлен</th><th className="p-2 text-left">Последнее обновление</th></tr></thead>
                <tbody>
                  {avStatusData.map((av, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{av.fio}</td>
                      <td className="p-2">{av.installed ? 'Да' : 'Нет'}</td>
                      <td className="p-2">{av.lastUpdate}</td>
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
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Резервное копирование</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="mb-4 flex gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="font-medium">РК СЭД Дело:</span> {lastBackups.sedDelo}
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="font-medium">РК Баз 1С:</span> {lastBackups.base1c}
                </div>
              </div>
              <details className="mb-4 border rounded">
                <summary className="p-3 bg-gray-50 cursor-pointer font-medium text-sm">
                  РК ГИС/ИС (последние даты)
                </summary>
                <div className="overflow-x-auto p-3">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-100"><th className="p-2 text-left">Информационная система</th><th className="p-2 text-left">Дата последнего резервного копирования</th></tr></thead>
                    <tbody>
                      {backupSystems.map((sys, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{sys.name}</td>
                          <td className="p-2">{sys.lastBackup}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
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
                <thead><tr className="bg-gray-50"><th className="p-2 text-left">Дата</th><th className="p-2 text-left">Описание</th><th className="p-2 text-left">Статус</th><th className="p-2 text-left">Время закрытия (ч)</th><th className="p-2 text-left">Ответственный за устранение</th></tr></thead>
                <tbody>
                  {incidents.map(inc => (
                    <tr key={inc.id} className="border-t">
                      <td className="p-2">{inc.date}</td>
                      <td className="p-2">{inc.description}</td>
                      <td className="p-2">{inc.status}</td>
                      <td className="p-2">{inc.timeToClose ?? '—'}</td>
                      <td className="p-2">
                        <select
                          value={inc.responsible || ''}
                          onChange={e => {
                            const id = Number(e.target.value) || null;
                            setIncidents(prev => prev.map(i => i.id === inc.id ? { ...i, responsible: id } : i));
                          }}
                          className="text-xs border rounded p-1"
                        >
                          <option value="">Не назначен</option>
                          {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{getEmployeeLabel(emp)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'roles':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Выдача ролей в ИС</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="flex gap-2 border-b mb-4 pb-2">
                {roleSystems.map((sys, idx) => (
                  <button
                    key={sys.key}
                    onClick={() => setActiveSubTab(idx)}
                    className={`px-4 py-2 text-sm rounded-t-lg transition ${activeSubTab === idx ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {sys.title}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50"><th className="p-2 text-left">№</th><th className="p-2 text-left">ФИО сотрудника</th><th className="p-2 text-left">Роли</th><th className="p-2 text-left">№ служебной записки</th></tr></thead>
                  <tbody>
                    {roleSystems[activeSubTab].data.length > 0 ? (
                      roleSystems[activeSubTab].data.map(row => (
                        <tr key={row.no} className="border-t">
                          <td className="p-2">{row.no}</td>
                          <td className="p-2">{row.fio}</td>
                          <td className="p-2">{row.roles}</td>
                          <td className="p-2">{row.sz}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="text-center p-4 text-gray-500">Нет выданных ролей</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
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
          const responsible = getEmployeeById(blockAssignments[card.key]);
          return (
            <div
              key={card.key}
              onClick={() => { setActiveCard(card.key); setActiveSubTab(0); }}
              className={`metric-card p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${statusClasses[status]} relative h-48 flex flex-col`}
            >
              {card.indicators}
              <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4 pr-20">{card.title}</h3>
              <p className="text-xs text-gray-500 flex-1">{card.content}</p>

              <div onClick={e => e.stopPropagation()} className="mt-auto">
                <label className="text-xs text-gray-500 block mb-1">Ответственный:</label>
                <select
                  value={blockAssignments[card.key] || ''}
                  onChange={e => handleBlockAssign(card.key, e.target.value)}
                  className="w-full text-xs border rounded p-1 bg-white"
                >
                  <option value="">Не назначен</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{getEmployeeLabel(emp)}</option>
                  ))}
                </select>
                {responsible && (
                  <p className="text-xs text-gray-600 mt-1">{responsible.name}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {renderModal()}
    </div>
  );
}

// Компонент формы добавления задачи ОИТ
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
        {employees.map(emp => <option key={emp.id} value={emp.id}>{getEmployeeLabel(emp)}</option>)}
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
