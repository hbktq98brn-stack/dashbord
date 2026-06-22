import React, { useState } from 'react';
import { employees } from '../data/employees';

// ---------- Мок-данные проектов ----------
const projectsData = [
  {
    id: 1,
    title: 'Портал Культура.РФ',
    controlPoints: { total: 12, done: 8, risk: 2, overdue: 2 },
    roadmap: [
      { no: 1, name: 'Разработка дизайна главной страницы', planDate: '10.01.2026', status: 'Выполнено', comment: 'Утверждён' },
      { no: 2, name: 'Интеграция с ЕСИА', planDate: '20.02.2026', status: 'Под риском', comment: 'Ожидается API' },
      { no: 3, name: 'Тестирование модуля рекомендаций', planDate: '15.03.2026', status: 'В работе', comment: '' },
      { no: 4, name: 'Запуск в промышленную эксплуатацию', planDate: '01.06.2026', status: 'Не начато', comment: '' }
    ],
    type: 'default'
  },
  {
    id: 2,
    title: 'Портал Артефакт',
    controlPoints: { total: 10, done: 6, risk: 1, overdue: 3 },
    roadmap: [
      { no: 1, name: 'Оцифровка экспонатов (этап 1)', planDate: '05.02.2026', status: 'Выполнено', comment: '1200 экспонатов' },
      { no: 2, name: 'Разработка AR-интерфейса', planDate: '01.04.2026', status: 'В работе', comment: '' },
      { no: 3, name: 'Интеграция с Пушкинской картой', planDate: '01.07.2026', status: 'Под риском', comment: 'Задержка согласования' },
      { no: 4, name: 'Запуск веб-версии', planDate: '15.09.2026', status: 'Не начато', comment: '' }
    ],
    type: 'default'
  },
  {
    id: 3,
    title: 'Пушкинская карта',
    controlPoints: { total: 8, done: 5, risk: 0, overdue: 3 },
    roadmap: [
      { no: 1, name: 'Обновление реестра участников', planDate: '20.03.2026', status: 'Выполнено', comment: '' },
      { no: 2, name: 'Интеграция с ГИС ЕЦАП', planDate: '10.04.2026', status: 'В работе', comment: 'Ожидается тех.доработка' },
      { no: 3, name: 'Запуск аналитического дашборда для Минкультуры', planDate: '01.08.2026', status: 'Не начато', comment: '' }
    ],
    type: 'default'
  },
  {
    id: 4,
    title: 'Госкаталог',
    controlPoints: { total: 15, done: 11, risk: 2, overdue: 2 },
    roadmap: [
      { no: 1, name: 'Миграция данных из старой системы', planDate: '01.06.2026', status: 'Выполнено', comment: '' },
      { no: 2, name: 'Разработка нового поискового интерфейса', planDate: '15.07.2026', status: 'Под риском', comment: 'Нехватка ресурсов' },
      { no: 3, name: 'Интеграция с Артефакт', planDate: '01.09.2026', status: 'Не начато', comment: '' }
    ],
    type: 'default'
  },
  {
    id: 5,
    title: 'Цифровой ИД',
    controlPoints: { total: 0, done: 0, risk: 0, overdue: 0 },
    type: 'digital_id',
    digitalIdData: {
      organizations: [
        { type: 'Театры', connected: 120, scanned: 4500, passages: 3200 },
        { type: 'Музеи', connected: 85, scanned: 2800, passages: 1900 },
        { type: 'Кинотеатры', connected: 40, scanned: 600, passages: 500 },
        { type: 'Выставки', connected: 30, scanned: 300, passages: 200 },
        { type: 'Галереи', connected: 25, scanned: 150, passages: 100 },
        { type: 'Библиотеки', connected: 200, scanned: 1000, passages: 800 },
        { type: 'Цирки', connected: 15, scanned: 80, passages: 60 }
      ],
      regions: [
        { name: 'Москва', status: 'Внедрено' },
        { name: 'Санкт-Петербург', status: 'Внедрено' },
        { name: 'Татарстан', status: 'Внедряется' },
        { name: 'Новосибирская обл.', status: 'Риски' },
        { name: 'Краснодарский край', status: 'Внедряется' },
        { name: 'Приморский край', status: 'Не начато' }
      ],
      maxUsersChart: [
        { date: '01.01.2026', value: 50000 },
        { date: '01.06.2026', value: 100000 },
        { date: '01.10.2026', target: 500000 },
        { date: '01.01.2027', target: 1000000 }
      ],
      activeUsers: {
        'PRO.КУЛЬТУРА.РФ': 3200,
        'КУЛЬТУРА.РФ': 12500,
        'Artefact': 870
      }
    }
  },
  {
    id: 6,
    title: 'СЭД Дело',
    controlPoints: { total: 9, done: 7, risk: 1, overdue: 1 },
    roadmap: [
      { no: 1, name: 'Обновление серверной части', planDate: '10.02.2026', status: 'Выполнено', comment: '' },
      { no: 2, name: 'Интеграция с МЭДО 3.0', planDate: '01.05.2026', status: 'Под риском', comment: 'Требуется доп.согласование' },
      { no: 3, name: 'Запуск мобильного приложения', planDate: '01.08.2026', status: 'В работе', comment: '' }
    ],
    type: 'default'
  },
  {
    id: 7,
    title: 'Показатели ВПЦТ',
    controlPoints: { total: 6, done: 4, risk: 0, overdue: 2 },
    roadmap: [
      { no: 1, name: 'Сбор данных по ЦТ (1-й этап)', planDate: '01.04.2026', status: 'Выполнено', comment: '' },
      { no: 2, name: 'Формирование отчёта для Минцифры', planDate: '20.06.2026', status: 'В работе', comment: '' },
      { no: 3, name: 'Утверждение методики расчёта показателей', planDate: '01.09.2026', status: 'Не начато', comment: '' }
    ],
    type: 'default'
  }
];

const ktStatuses = ['Не начато', 'В работе', 'Под риском', 'Просрочено', 'Выполнено'];
const regionStatuses = ['Не начато', 'Внедряется', 'Риски', 'Внедрено'];

const recalcControlPoints = (roadmap) => {
  const total = roadmap.length;
  const done = roadmap.filter(r => r.status === 'Выполнено').length;
  const risk = roadmap.filter(r => r.status === 'Под риском').length;
  const overdue = roadmap.filter(r => r.status === 'Просрочено').length;
  return { total, done, risk, overdue };
};

const getProjectStatus = (project) => {
  if (project.type === 'digital_id') {
    const current = 100000;
    const target = 500000;
    const progress = current / target;
    if (progress >= 1) return 'green';
    if (progress >= 0.5) return 'yellow';
    return 'red';
  }
  const { done, total, risk, overdue } = project.controlPoints;
  if (overdue > 0) return 'red';
  if (risk > 0) return 'yellow';
  if (done === total) return 'green';
  return 'yellow';
};

export default function Projects() {
  const [projects, setProjects] = useState(projectsData.map(p => ({ ...p, responsible: null })));
  const [selectedProject, setSelectedProject] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedProjectsForReport, setSelectedProjectsForReport] = useState([]);
  const [reportText, setReportText] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const handleSetResponsible = (projectId, employeeId) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, responsible: employeeId || null } : p));
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Запрос на изменение статуса КТ (только создаёт запрос)
  const handleKtStatusChangeRequest = (projectId, ktNo, newStatus, oldStatus) => {
    const project = projects.find(p => p.id === projectId);
    setPendingRequests(prev => [...prev, {
      id: Date.now(),
      projectId,
      projectTitle: project.title,
      type: 'kt',
      ktNo,
      oldStatus,
      newStatus,
      requestedAt: new Date().toLocaleString('ru')
    }]);
  };

  // Запрос на изменение статуса региона
  const handleRegionStatusChangeRequest = (projectId, regionIndex, newStatus, oldStatus) => {
    const project = projects.find(p => p.id === projectId);
    const regionName = project.digitalIdData.regions[regionIndex].name;
    setPendingRequests(prev => [...prev, {
      id: Date.now(),
      projectId,
      projectTitle: project.title,
      type: 'region',
      regionIndex,
      regionName,
      oldStatus,
      newStatus,
      requestedAt: new Date().toLocaleString('ru')
    }]);
  };

  // Одобрение запроса (только руководителем)
  const approveRequest = (requestId) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    setProjects(prev => prev.map(p => {
      if (p.id !== request.projectId) return p;
      if (request.type === 'kt') {
        const updatedRoadmap = p.roadmap.map(kt =>
          kt.no === request.ktNo ? { ...kt, status: request.newStatus } : kt
        );
        return { ...p, roadmap: updatedRoadmap, controlPoints: recalcControlPoints(updatedRoadmap) };
      } else if (request.type === 'region' && p.type === 'digital_id') {
        const updatedRegions = p.digitalIdData.regions.map((reg, idx) =>
          idx === request.regionIndex ? { ...reg, status: request.newStatus } : reg
        );
        return { ...p, digitalIdData: { ...p.digitalIdData, regions: updatedRegions } };
      }
      return p;
    }));
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    // Также обновляем выбранный проект, если открыт
    setSelectedProject(prev => {
      if (!prev || prev.id !== request.projectId) return prev;
      if (request.type === 'kt') {
        const updatedRoadmap = prev.roadmap.map(kt =>
          kt.no === request.ktNo ? { ...kt, status: request.newStatus } : kt
        );
        return { ...prev, roadmap: updatedRoadmap, controlPoints: recalcControlPoints(updatedRoadmap) };
      } else if (request.type === 'region' && prev.type === 'digital_id') {
        const updatedRegions = prev.digitalIdData.regions.map((reg, idx) =>
          idx === request.regionIndex ? { ...reg, status: request.newStatus } : reg
        );
        return { ...prev, digitalIdData: { ...prev.digitalIdData, regions: updatedRegions } };
      }
      return prev;
    });
  };

  // Отклонение запроса
  const rejectRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const generateReport = () => {
    const selected = projects.filter(p => selectedProjectsForReport.includes(p.id));
    if (selected.length === 0) {
      setReportText('Выберите хотя бы один проект.');
      return;
    }
    let text = '';
    selected.forEach(p => {
      text += `**${p.title}**\n`;
      if (p.type === 'digital_id') {
        const totalConnected = p.digitalIdData.organizations.reduce((sum, o) => sum + o.connected, 0);
        text += `Контрольные точки: не применимо\n`;
        text += `Организации подключено: ${totalConnected} (всего)\n`;
        text += `Пользователей МАХ: ${p.digitalIdData.maxUsersChart[1].value / 1000} тыс.\n`;
        text += `Регионы:\n`;
        p.digitalIdData.regions.forEach(r => {
          text += `- ${r.name}: ${r.status}\n`;
        });
      } else {
        const { total, done, risk, overdue } = p.controlPoints;
        text += `Контрольных точек: всего ${total}, выполнено ${done}, под риском ${risk}, просрочено ${overdue}\n`;
        text += `Основные этапы:\n`;
        p.roadmap.forEach(r => {
          text += `- ${r.name} (план: ${r.planDate}, статус: ${r.status})\n`;
        });
      }
      text += `Ответственный: ${employees.find(e => e.id === p.responsible)?.name || 'не назначен'}\n\n`;
    });
    setReportText(text);
  };

  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50 animate-pulse'
  };

  // Проверка, есть ли ожидающий запрос для данной КТ или региона
  const hasPendingKt = (projectId, ktNo) =>
    pendingRequests.some(r => r.projectId === projectId && r.type === 'kt' && r.ktNo === ktNo);
  const hasPendingRegion = (projectId, regionIndex) =>
    pendingRequests.some(r => r.projectId === projectId && r.type === 'region' && r.regionIndex === regionIndex);

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        {pendingRequests.length > 0 && (
          <button
            onClick={() => setShowApprovalModal(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm"
          >
            Ожидают подтверждения ({pendingRequests.length})
          </button>
        )}
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 text-sm"
        >
          Сформировать отчёт по проектам
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map(project => {
          const status = getProjectStatus(project);
          const { total, done, risk, overdue } = project.controlPoints;
          const responsible = employees.find(e => e.id === project.responsible);

          return (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className={`metric-card p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${statusClasses[status]} relative h-48 flex flex-col`}
            >
              {project.type !== 'digital_id' && (
                <div className="absolute top-2 right-2 flex gap-1 text-xs">
                  <span title="Всего" className="text-gray-500">Σ{total}</span>
                  <span title="Выполнено" className="text-green-600">✓{done}</span>
                  <span title="Под риском" className="text-yellow-600">⚠{risk}</span>
                  <span title="Просрочено" className="text-red-600">✗{overdue}</span>
                </div>
              )}

              <h3 className="text-base font-semibold text-gray-800 mb-2 pr-16">{project.title}</h3>

              {project.type === 'digital_id' && (
                <div className="text-xs text-gray-500 mb-2 flex-1">
                  Подключено организаций: {project.digitalIdData.organizations.reduce((s, o) => s + o.connected, 0)}
                  <br />
                  Пользователи МАХ: 100 тыс.
                </div>
              )}

              {project.type !== 'digital_id' && <div className="flex-1" />}

              <div onClick={e => e.stopPropagation()} className="mt-auto">
                <label className="text-xs text-gray-500 block mb-1">Ответственный:</label>
                <select
                  value={project.responsible || ''}
                  onChange={e => handleSetResponsible(project.id, Number(e.target.value) || null)}
                  className="w-full text-xs border rounded p-1 bg-white"
                >
                  <option value="">Не назначен</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
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

      {/* Модальное окно дорожной карты (кроме digital_id) */}
      {selectedProject && selectedProject.type !== 'digital_id' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedProject.title} – Дорожная карта</h3>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">№</th>
                  <th className="p-2 text-left">Контрольная точка</th>
                  <th className="p-2 text-left">Плановая дата</th>
                  <th className="p-2 text-left">Статус</th>
                  <th className="p-2 text-left">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.roadmap.map(point => (
                  <tr key={point.no} className="border-t">
                    <td className="p-2">{point.no}</td>
                    <td className="p-2">{point.name}</td>
                    <td className="p-2">{point.planDate}</td>
                    <td className="p-2">
                      <select
                        value={point.status}
                        onChange={e => {
                          if (e.target.value !== point.status) {
                            handleKtStatusChangeRequest(selectedProject.id, point.no, e.target.value, point.status);
                          }
                        }}
                        className="text-xs border rounded p-1"
                      >
                        {ktStatuses.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {hasPendingKt(selectedProject.id, point.no) && (
                        <span className="ml-2 text-xs text-yellow-600">⏳ Ожидает</span>
                      )}
                    </td>
                    <td className="p-2">{point.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Модальное окно сводки для Цифрового ИД */}
      {selectedProject && selectedProject.type === 'digital_id' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Цифровой ИД – Сводка</h3>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            {selectedProject.digitalIdData && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Подключённые организации культуры</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Тип</th>
                        <th className="p-2 text-right">Подключено</th>
                        <th className="p-2 text-right">Сканирований</th>
                        <th className="p-2 text-right">Проходов</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.digitalIdData.organizations.map((org, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{org.type}</td>
                          <td className="p-2 text-right">{org.connected}</td>
                          <td className="p-2 text-right">{org.scanned}</td>
                          <td className="p-2 text-right">{org.passages}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Внедрение по регионам</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Регион</th>
                        <th className="p-2 text-left">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProject.digitalIdData.regions.map((region, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2">{region.name}</td>
                          <td className="p-2">
                            <select
                              value={region.status}
                              onChange={e => {
                                if (e.target.value !== region.status) {
                                  handleRegionStatusChangeRequest(selectedProject.id, idx, e.target.value, region.status);
                                }
                              }}
                              className="text-xs border rounded p-1"
                            >
                              {regionStatuses.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            {hasPendingRegion(selectedProject.id, idx) && (
                              <span className="ml-2 text-xs text-yellow-600">⏳ Ожидает</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Активность в МАХ</h4>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <p>Сейчас: 100 тыс.</p>
                      <p>Цель к 01.10.2026: 500 тыс.</p>
                      <p>Цель к 01.01.2027: 1 млн</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Активные пользователи каналов Минкультуры</h4>
                  <ul className="space-y-1 text-sm">
                    <li>PRO.КУЛЬТУРА.РФ: {selectedProject.digitalIdData.activeUsers['PRO.КУЛЬТУРА.РФ']}</li>
                    <li>КУЛЬТУРА.РФ: {selectedProject.digitalIdData.activeUsers['КУЛЬТУРА.РФ']}</li>
                    <li>Artefact: {selectedProject.digitalIdData.activeUsers['Artefact']}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Модальное окно отчёта по проектам */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Отчёт по проектам</h3>
              <button onClick={() => setShowReportModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2">Выберите проекты:</p>
              <div className="space-y-2">
                {projects.map(project => (
                  <label key={project.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedProjectsForReport.includes(project.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedProjectsForReport(prev => [...prev, project.id]);
                        } else {
                          setSelectedProjectsForReport(prev => prev.filter(id => id !== project.id));
                        }
                      }}
                    />
                    {project.title}
                  </label>
                ))}
              </div>
              <button
                onClick={generateReport}
                className="mt-4 bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 text-sm"
              >
                Сформировать справку
              </button>
            </div>
            {reportText && (
              <div className="mt-4 whitespace-pre-wrap bg-gray-50 p-4 rounded text-sm">
                {reportText}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Модальное окно для утверждения запросов */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Ожидают подтверждения</h3>
              <button onClick={() => setShowApprovalModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-gray-500">Нет ожидающих запросов</p>
            ) : (
              <ul className="space-y-2">
                {pendingRequests.map(req => (
                  <li key={req.id} className="border p-3 rounded text-sm">
                    <div className="font-medium">{req.projectTitle}</div>
                    <div className="text-gray-600">
                      {req.type === 'kt' ? `КТ №${req.ktNo}` : `Регион: ${req.regionName}`}:
                      <span className="text-red-500"> {req.oldStatus}</span> → <span className="text-green-600">{req.newStatus}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Запрошено: {req.requestedAt}</div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => approveRequest(req.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      >
                        Одобрить
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Отклонить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
