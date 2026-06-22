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
    controlPoints: { total: 0, done: 0, risk: 0, overdue: 0 }, // не используется, у него сводка
    type: 'digital_id',
    digitalIdData: {
      organizations: {
        theatres: { connected: 120, scanned: 4500, passages: 3200 },
        museums: { connected: 85, scanned: 2800, passages: 1900 },
        cinema: { connected: 40, scanned: 600, passages: 500 },
        exhibitions: { connected: 30, scanned: 300, passages: 200 },
        galleries: { connected: 25, scanned: 150, passages: 100 },
        libraries: { connected: 200, scanned: 1000, passages: 800 },
        circuses: { connected: 15, scanned: 80, passages: 60 }
      },
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

// Компонент для отображения индикации контрольных точек
const ControlPointsIndicator = ({ total, done, risk, overdue }) => (
  <div className="absolute top-3 right-3 flex gap-2 text-xs">
    <span className="text-gray-500" title="Всего">Σ {total}</span>
    <span className="text-green-600" title="Выполнено">✓ {done}</span>
    <span className="text-yellow-600" title="Под риском">⚠ {risk}</span>
    <span className="text-red-600" title="Просрочено">✗ {overdue}</span>
  </div>
);

export default function Projects() {
  const [projects, setProjects] = useState(projectsData.map(p => ({ ...p, responsible: null })));
  const [selectedProject, setSelectedProject] = useState(null); // для модального окна ДК/сводки
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedProjectsForReport, setSelectedProjectsForReport] = useState([]);
  const [reportText, setReportText] = useState('');

  // Установка ответственного для проекта
  const handleSetResponsible = (projectId, employeeId) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, responsible: employeeId || null } : p));
  };

  // Открыть модалку с дорожной картой или сводкой ИД
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Формирование справки по выбранным проектам
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
        // для Цифрового ИД особая сводка
        text += `Контрольные точки: не применимо\n`;
        text += `Организации подключено: ${p.digitalIdData.organizations.theatres.connected + p.digitalIdData.organizations.museums.connected + ...} (всего)`;
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

  return (
    <div>
      {/* Кнопка формирования отчёта */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowReportModal(true)}
          className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 text-sm"
        >
          Сформировать отчёт по проектам
        </button>
      </div>

      {/* Сетка проектов */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleProjectClick(project)}
          >
            {/* Индикатор контрольных точек (кроме Цифрового ИД, где он не применим) */}
            {project.type !== 'digital_id' && (
              <ControlPointsIndicator
                total={project.controlPoints.total}
                done={project.controlPoints.done}
                risk={project.controlPoints.risk}
                overdue={project.controlPoints.overdue}
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-6">{project.title}</h3>

            {/* Выпадающий список ответственного */}
            <div className="mt-2" onClick={e => e.stopPropagation()}>
              <label className="text-xs text-gray-500">Ответственный:</label>
              <select
                value={project.responsible || ''}
                onChange={e => handleSetResponsible(project.id, Number(e.target.value) || null)}
                className="w-full mt-1 text-xs border rounded p-1"
              >
                <option value="">Не назначен</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            {/* Для Цифрового ИД можно вывести краткую сводку */}
            {project.type === 'digital_id' && (
              <div className="text-xs text-gray-500 mt-2">
                Организаций подключено: {Object.values(project.digitalIdData.organizations).reduce((sum, o) => sum + o.connected, 0)}
                <br />
                Пользователей МАХ: {project.digitalIdData.maxUsersChart[1].value / 1000} тыс.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Модальное окно дорожной карты (для всех кроме digital_id) */}
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
                    <td className="p-2">{point.status}</td>
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
                {/* Подключённые организации */}
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
                      {Object.entries(selectedProject.digitalIdData.organizations).map(([type, data]) => (
                        <tr key={type} className="border-t">
                          <td className="p-2 capitalize">{type}</td>
                          <td className="p-2 text-right">{data.connected}</td>
                          <td className="p-2 text-right">{data.scanned}</td>
                          <td className="p-2 text-right">{data.passages}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Регионы */}
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
                          <td className="p-2">{region.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* График МАХ */}
                <div>
                  <h4 className="font-medium mb-2">Активность в МАХ</h4>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <p>Сейчас: 100 тыс.</p>
                      <p>Цель к 01.10.2026: 500 тыс.</p>
                      <p>Цель к 01.01.2027: 1 млн</p>
                    </div>
                    {/* Здесь можно вставить график (recharts), но пока просто текст */}
                  </div>
                </div>

                {/* Активные пользователи каналов */}
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

      {/* Модальное окно отчёта */}
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
    </div>
  );
}
