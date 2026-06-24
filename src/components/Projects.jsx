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
  },
  // ---------- НОВЫЙ ПРОЕКТ ----------
  {
    id: 8,
    title: 'Оптимизация процессов',
    type: 'optimization',
    controlPoints: { total: 11, done: 0, risk: 0, overdue: 0 },
    subprojects: [
      {
        id: '1',
        name: 'Самостоятельное формирование интерактивного отчета по исполнительской дисциплине',
        unit: 'ед',
        plan: 163200,
        fact: null,
        planDate: '21.12.2026',
        factDate: null,
        responsible: 'Никифоров Н. В.',
        status: 'В работе',
        udPlan: null,
        udProject: '0%',
        roadmap: [
          { no: '1.1', name: 'Ручной ввод данных/клики', unit: 'ручной ввод - клики', plan: 163200, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
          { no: '1.2', name: 'Исполнение проекта', unit: 'усл. ед', plan: 3, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%',
            children: [
              { no: '1.2.1', name: 'Заключение контракта на обновление системы', unit: 'усл. ед', plan: 1, fact: null, planDate: '30.06.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
              { no: '1.2.2', name: 'Внедрение функции выгрузки отчета по исполнительской дисциплине', unit: 'усл. ед', plan: 1, fact: null, planDate: '30.09.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
              { no: '1.2.3', name: 'Направление куратору проекта служебной записки о завершении проекта', unit: 'усл. ед', plan: 1, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' }
            ]
          }
        ]
      },
      {
  id: '2',
  name: 'Самостоятельное предоставление сведений субъектами РФ в сфере культуры в АИС «Статистика»',
  unit: 'ед',
  plan: 14240,
  fact: null,
  planDate: '21.12.2026',
  factDate: null,
  responsible: 'Никифоров Н. В.',
  status: 'В работе',
  udPlan: null,
  udProject: '0%',
  roadmap: [
    { no: '2.1', name: 'Ручной ввод данных/клики', unit: 'ручной ввод - клики', plan: 14240, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
    { no: '2.2', name: 'Исполнение проекта', unit: 'усл. ед', plan: 3, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%',
      children: [
        { no: '2.2.1', name: 'Техническая подготовка алгоритма внесения данных', unit: 'усл. ед', plan: 1, fact: null, planDate: '30.06.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
        { no: '2.2.2', name: 'Внедрение возможности самостоятельного предоставления сведений о посещаемости учреждений культуры в АИС "Статистика"', unit: 'усл. ед', plan: 1, fact: null, planDate: '31.07.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
        { no: '2.2.3', name: 'Направление куратору проекта служебной записки о завершении проекта с оценкой достижения показателей в пересчете на год', unit: 'усл. ед', plan: 1, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' }
      ]
    }
  ]
},
      {
  id: '3',
  name: 'Сокращение количества согласований в документах по основным видам деятельности',
  unit: 'ед',
  plan: 126,
  fact: null,
  planDate: '21.12.2026',
  factDate: null,
  responsible: 'Никифоров Н. В.',
  status: 'В работе',
  udPlan: null,
  udProject: '0%',
  roadmap: [
    { no: '3.1', name: 'Избыточные согласования', unit: 'избыточные согласования', plan: 126, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
    { no: '3.2', name: 'Исполнение проекта', unit: 'усл. ед', plan: 3, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%',
      children: [
        { no: '3.2.1', name: 'Аналитика типов документов по основным видам деятельности', unit: 'усл. ед', plan: 1, fact: null, planDate: '30.06.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
        { no: '3.2.2', name: 'Внедрение нового алгоритма согласования документов по основным видам деятельности', unit: 'усл. ед', plan: 1, fact: null, planDate: '30.09.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' },
        { no: '3.2.3', name: 'Направление куратору проекта служебной записки о завершении проекта с оценкой достижения показателей в пересчете на год', unit: 'усл. ед', plan: 1, fact: null, planDate: '21.12.2026', factDate: null, responsible: 'Никифоров Н. В.', status: 'В работе', udPlan: null, udProject: '0%' }
      ]
    }
  ]
},
      { id: '4', name: 'Составление типовых ответов на массовые обращения граждан', unit: 'ед', plan: 40, fact: null, planDate: '15.11.2026', factDate: null, responsible: 'Макушин А. Ю.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '5', name: 'Предзаполнение регистрационных карточек типовых входящих обращений граждан', unit: 'ед', plan: 1000, fact: null, planDate: '01.10.2026', factDate: null, responsible: 'Илюхина А. С.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '6', name: 'Реализация заявки в отдел административно-хозяйственного обеспечения через внутренний портал', unit: 'ед', plan: 1, fact: null, planDate: '30.09.2026', factDate: null, responsible: 'Крайнов В. С.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '7', name: 'Онлайн бронирование переговорных комнат через внутренний портал', unit: 'ед', plan: 1, fact: null, planDate: '30.06.2026', factDate: null, responsible: 'Леднев И. Ю.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '8', name: 'Сокращение отчетности', unit: 'ед', plan: 50, fact: null, planDate: '31.12.2026', factDate: null, responsible: 'Полякова Е. М.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '9', name: 'Создание шаблона подписанта в системе электронного документооборота', unit: 'ед', plan: 1, fact: null, planDate: '30.09.2026', factDate: null, responsible: 'Серебрякова У. О.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '10', name: 'Автоматическое создание списка рассылки в качестве приложения к документу', unit: 'ед', plan: 1, fact: null, planDate: '30.06.2026', factDate: null, responsible: 'Волков А. В.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] },
      { id: '11', name: 'Создание типовых отчетов для закрытия документов в СЭД', unit: 'ед', plan: 1, fact: null, planDate: '30.09.2026', factDate: null, responsible: 'Морозов А. А.', status: 'В работе', udPlan: null, udProject: '0%', roadmap: [] }
    ]
  }
];

// Статусы КТ и регионов
const ktStatuses = ['Не начато', 'В работе', 'Под риском', 'Просрочено', 'Выполнено'];
const regionStatuses = ['Не начато', 'Внедряется', 'Риски', 'Внедрено'];

// Пересчёт controlPoints
const recalcControlPoints = (roadmap) => {
  const total = roadmap.length;
  const done = roadmap.filter(r => r.status === 'Выполнено').length;
  const risk = roadmap.filter(r => r.status === 'Под риском').length;
  const overdue = roadmap.filter(r => r.status === 'Просрочено').length;
  return { total, done, risk, overdue };
};

// Определение статуса проекта
const getProjectStatus = (project) => {
  if (project.type === 'digital_id') {
    const current = 100000;
    const target = 500000;
    const progress = current / target;
    if (progress >= 1) return 'green';
    if (progress >= 0.5) return 'yellow';
    return 'red';
  }
  if (project.type === 'optimization') {
    const allPoints = project.subprojects.flatMap(sp => sp.roadmap || []);
    if (allPoints.some(p => p.status === 'Просрочено')) return 'red';
    if (allPoints.every(p => p.status === 'Выполнено')) return 'green';
    return 'yellow';
  }
  const { done, total, risk, overdue } = project.controlPoints;
  if (overdue > 0) return 'red';
  if (risk > 0) return 'yellow';
  if (done === total) return 'green';
  return 'yellow';
};
// Компонент модального окна для проекта "Показатели ВПЦТ"
const VpctModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Мероприятия программы',
    'ОКР и эффекты',
    'Сводные результаты',
    'Сводные эффекты',
    'Финансирование',
    'Технологическая зрелость'
  ];

  // ---------- МОК-ДАННЫЕ ----------
  // ... (вставлю все данные из предыдущих сообщений)

  // Мероприятия программы (пример)
  const programEvents = [
    { id: 1, name: 'Разработка и внедрение сервиса "Отслеживание расписаний занятий"', startDate: '01.03.2026', endDate: '30.09.2026', responsible: 'Кондратьев Д. И.', status: 'В работе', planIndicator: 1, factIndicator: 0, percent: 0 },
    { id: 2, name: 'Рефакторинг услуги "Запись на программу дополнительного образования"', startDate: '01.04.2026', endDate: '31.12.2026', responsible: 'Илюхина А. С.', status: 'В работе', planIndicator: 1, factIndicator: 0, percent: 0 },
    { id: 3, name: 'Разработка проактивных уведомлений для услуг', startDate: '01.07.2026', endDate: '30.06.2027', responsible: 'Прохоров А. П.', status: 'Не начато', planIndicator: 0, factIndicator: 0, percent: 0 }
  ];

  // ОКР и эффекты (пример)
  const okrData = [
    { name: 'Цифровая зрелость', goals: [
      { name: 'Уровень удовлетворенности граждан качеством предоставления госуслуг', plan: 4.5, fact: 4.3, unit: 'балла' },
      { name: 'Доля госуслуг, предоставляемых в электронном виде', plan: 95, fact: 85, unit: '%' }
    ]},
    { name: 'Эффективность госуправления', goals: [
      { name: 'Сокращение времени предоставления услуг', plan: 30, fact: 28, unit: '%' },
      { name: 'Снижение издержек на получение госуслуг', plan: 10, fact: 8, unit: '%' }
    ]}
  ];

  // Сводные результаты (пример для госуслуг)
  const summaryResults = {
    newServices: { plan2025_2027: 4, fact2025_2027: 4, plan2026_2028: 0, fact2026_2028: 0, okr: 4 },
    refactoring: { plan2025_2027: 1, fact2025_2027: 1, plan2026_2028: 6, fact2026_2028: 0, okr: 4 },
    online: { plan2025_2027: 1, fact2025_2027: 1, plan2026_2028: 1, fact2026_2028: 0, okr: 1 },
    proactive: { plan2025_2027: 0, fact2025_2027: 0, plan2026_2028: 0, fact2026_2028: 0, okr: 0 },
    notifications: { plan2025_2027: 0, fact2025_2027: 0, plan2026_2028: 0, fact2026_2028: 0, okr: 0 },
    techSolutions: { plan2025_2027: 0, fact2025_2027: 0, plan2026_2028: 5, fact2026_2028: 0, okr: 5 }
  };

  // Детализация рефакторинга (пример)
  const refactoringDetails = [
    { id: '1.2.1', name: 'Запись на программу дополнительного образования', csi: 0, applications: 0, rejections: 0, positive: 0, errors: 0, drafts: 0, avgTime: 0, noVisit: 'Нет', epgu: 'Нет', lir: 'Нет', vitrina: 'Нет', plan2026: true },
    { id: '1.2.2', name: 'Предоставление сведений о наличии объектов культурного наследия', csi: 0, applications: 0, rejections: 0, positive: 0, errors: 0, drafts: 0, avgTime: 0, noVisit: 'Нет', epgu: 'Нет', lir: 'Нет', vitrina: 'Нет', plan2026: true },
    { id: '1.2.3', name: 'Выдача разрешения на передачу музейных предметов', csi: null, applications: null, rejections: null, positive: null, errors: null, drafts: null, avgTime: null, noVisit: 'Нет', epgu: 'Нет', lir: 'Нет', vitrina: 'Нет', plan2026: false },
    { id: '1.2.4', name: 'Получение разрешения на проведение работ по сохранению объекта культурного наследия', csi: 5.0, applications: 339, rejections: 9.4, positive: 38.9, errors: 0, drafts: 26.2, avgTime: 906595.0, noVisit: 'Да', epgu: 'Да', lir: 'Да', vitrina: 'Нет', plan2026: false },
    { id: '1.2.5', name: 'Получение разрешения (открытого листа) на проведение археологических работ', csi: 4.9, applications: 6956, rejections: 20.5, positive: 62.3, errors: 0.3, drafts: 31.4, avgTime: 1310083.0, noVisit: 'Да', epgu: 'Да', lir: 'Да', vitrina: 'Нет', plan2026: false },
    { id: '1.2.6', name: 'Согласование проектной документации на проведение работ по сохранению ОКН', csi: 5.0, applications: 120, rejections: 16.7, positive: 14.2, errors: 0, drafts: 5.2, avgTime: 2214086.0, noVisit: 'Да', epgu: 'Да', lir: 'Да', vitrina: 'Нет', plan2026: false }
  ];

  // Сводные эффекты (данные из III)
  const effectsData = [
    { category: 'Уменьшение издержек внутри ведомства', items: [
      { name: 'Сокращение расходов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение трудозатрат', count2025: 0, value2025: null, economy2025: null, count2026: 2, value2026: 56.1, economy2026: 58262.8 }
    ]},
    { category: 'Увеличение дохода в бюджет', items: [
      { name: 'Рост поступлений за счет налогов и сборов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Рост поступлений за счет штрафов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null }
    ]},
    { category: 'Снижение издержек на получение госуслуг', items: [
      { name: 'Снижение количества обращений', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Сокращение времени оформления услуги', count2025: 12, value2025: 1.2, economy2025: 9636.3, count2026: 3, value2026: 76.0, economy2026: 416040.0 },
      { name: 'Увеличение количества услуг по одному заявлению', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение обращений в ведомства по итогам оказания услуг', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null }
    ]},
    { category: 'Повышение удовлетворенности потребителей', items: [
      { name: 'Сокращение сроков предоставления услуги', count2025: 0, value2025: null, economy2025: null, count2026: 1, value2026: 0.0, economy2026: 10835.4 },
      { name: 'Снижение доли отказов', count2025: 0, value2025: null, economy2025: null, count2026: 1, value2026: 1.0, economy2026: 198.0 },
      { name: 'Повышение общей оценки удовлетворенности', count2025: 11, value2025: 1073.1, economy2025: 3400.6, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение расходов потребителей за счет отказа от платных сервисов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null }
    ]},
    { category: 'Уменьшение административных барьеров', items: [
      { name: 'Снижение количества запросов на одно юр. лицо от контрольно-надзорных органов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение количества очных проверок', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение количества выставленных штрафов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Сокращение количества показателей в отчетных формах для бизнеса', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение частоты отчетности', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение количества очных визитов инспекторов', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null }
    ]},
    { category: 'Снижение ущерба', items: [
      { name: 'Снижение заболеваемости, смертности', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение количества инцидентов ЧП/ЧС', count2025: 0, value2025: null, economy2025: null, count2026: 1, value2026: null, economy2026: 2640.0 },
      { name: 'Снижение случаев мошенничества', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение ущерба от мошенничества', count2025: 1, value2025: null, economy2025: 200000.0, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение экономического ущерба', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение рисков информационной безопасности', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null },
      { name: 'Снижение рисков отказа инфраструктуры', count2025: 0, value2025: null, economy2025: null, count2026: 0, value2026: null, economy2026: null }
    ]}
  ];

  // Финансирование (данные I и II)
  const financeSources = [
    { name: 'Базовые БА, согласованные Минцифры', plan2025: 0, plan2026: 562.17, plan2027: 553.25, plan2028: 553.25, total: 1668.67 },
    { name: 'Базовые БА, не согласованные Минцифры', plan2025: 0, plan2026: 0, plan2027: 0, plan2028: 0, total: 0 },
    { name: 'Дополнительные БА, согласованные подкомиссией', plan2025: 0, plan2026: 0, plan2027: 0, plan2028: 0, total: 0 },
    { name: 'Дополнительные БА, согласованные Минцифры', plan2025: 0, plan2026: 41.0, plan2027: 6.0, plan2028: 6.0, total: 53.0 },
    { name: 'Дополнительные БА, не согласованные Минцифры', plan2025: 0, plan2026: 0, plan2027: 0, plan2028: 0, total: 0 }
  ];
  const totalFinance = { plan2025: 691.60, fact2025: 670.58, plan2026: 603.17, plan2027: 559.25, plan2028: 559.25, total: 1721.67 };

  const financeDirections = [
    { name: 'Создание и развитие ГИС и ИС', fact2024: 199.56, fact2025_foiv: 130.0, fact2025_ned: 0, plan2026_foiv: 198.25, plan2026_ned: 0, delta2026: 13.7, plan2026_2028_foiv: 616.04, plan2026_2028_ned: 0 },
    { name: 'Эксплуатация и поддержка ГИС и ИС', fact2024: 401.25, fact2025_foiv: 82.38, fact2025_ned: 0, plan2026_foiv: 251.56, plan2026_ned: 0, delta2026: -90.7, plan2026_2028_foiv: 70.10, plan2026_2028_ned: 0 },
    { name: 'Инфраструктура (развитие)', fact2024: 0, fact2025_foiv: 0, fact2025_ned: 0, plan2026_foiv: 1.74, plan2026_ned: 0, delta2026: null, plan2026_2028_foiv: 5.22, plan2026_2028_ned: 0 },
    { name: 'Инфраструктура (эксплуатация и поддержка)', fact2024: 60.84, fact2025_foiv: 38.97, fact2025_ned: 0, plan2026_foiv: 241.79, plan2026_ned: 0, delta2026: 28.9, plan2026_2028_foiv: 977.31, plan2026_2028_ned: 0 }
  ];

  // Технологическая зрелость (пример)
  const techMaturity = [
    { domain: 'Импортозамещение', current: 3, target: 5 },
    { domain: 'Искусственный интеллект', current: 2, target: 4 },
    { domain: 'Облачные технологии', current: 4, target: 5 },
    { domain: 'Кибербезопасность', current: 4, target: 5 },
    { domain: 'Большие данные', current: 2, target: 4 }
  ];

  // ====== Рендер табов ======
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <EventsTab />;
      case 1: return <OkrTab />;
      case 2: return <SummaryResultsTab />;
      case 3: return <EffectsTab />;
      case 4: return <FinanceTab />;
      case 5: return <MaturityTab />;
      default: return null;
    }
  };

  // ---------- КОМПОНЕНТЫ ТАБОВ ----------

  const EventsTab = () => (
    <div>
      <h4 className="font-medium mb-4">Мероприятия программы</h4>
      <table className="w-full text-sm border-collapse">
        <thead><tr className="bg-gray-50"><th className="p-2 border">№</th><th className="p-2 border">Наименование</th><th className="p-2 border">Срок начала</th><th className="p-2 border">Срок окончания</th><th className="p-2 border">Ответственный</th><th className="p-2 border">Статус</th><th className="p-2 border">План</th><th className="p-2 border">Факт</th><th className="p-2 border">%</th></tr></thead>
        <tbody>
          {programEvents.map(e => (
            <tr key={e.id} className="border-t">
              <td className="p-2 border">{e.id}</td>
              <td className="p-2 border">{e.name}</td>
              <td className="p-2 border">{e.startDate}</td>
              <td className="p-2 border">{e.endDate}</td>
              <td className="p-2 border">{e.responsible}</td>
              <td className="p-2 border"><span className={`px-2 py-0.5 rounded text-xs font-medium ${e.status === 'В работе' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>{e.status}</span></td>
              <td className="p-2 border text-right">{e.planIndicator}</td>
              <td className="p-2 border text-right">{e.factIndicator}</td>
              <td className="p-2 border text-right">{e.percent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const OkrTab = () => (
    <div>
      <h4 className="font-medium mb-4">ОКР и эффекты</h4>
      {okrData.map((group, idx) => (
        <details key={idx} className="mb-4 border rounded" open>
          <summary className="p-3 bg-gray-50 font-medium text-sm">{group.name}</summary>
          <div className="p-3">
            {group.goals.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm">{g.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">План: {g.plan}{g.unit}</span>
                  <span className="text-sm font-medium">Факт: {g.fact}{g.unit}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${g.fact >= g.plan ? 'bg-green-500' : g.fact / g.plan >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (g.fact / g.plan) * 100)}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{Math.round((g.fact / g.plan) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );

  const SummaryResultsTab = () => (
    <div>
      <h4 className="font-medium mb-4">Сводные результаты (Госуслуги и ЖС)</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h5 className="text-sm font-semibold mb-2">2025-2027</h5>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-50"><th className="p-2 border">Показатель</th><th className="p-2 border">План</th><th className="p-2 border">Факт (31.01.2026)</th><th className="p-2 border">ОКР</th></tr></thead>
            <tbody>
              {Object.entries(summaryResults).map(([key, val]) => (
                <tr key={key} className="border-t">
                  <td className="p-2 border">{key}</td>
                  <td className="p-2 border text-right">{val.plan2025_2027}</td>
                  <td className="p-2 border text-right">{val.fact2025_2027}</td>
                  <td className="p-2 border text-right">{val.okr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5 className="text-sm font-semibold mb-2">2026-2028</h5>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-50"><th className="p-2 border">Показатель</th><th className="p-2 border">План</th><th className="p-2 border">Факт</th><th className="p-2 border">ОКР</th></tr></thead>
            <tbody>
              {Object.entries(summaryResults).map(([key, val]) => (
                <tr key={key} className="border-t">
                  <td className="p-2 border">{key}</td>
                  <td className="p-2 border text-right">{val.plan2026_2028}</td>
                  <td className="p-2 border text-right">{val.fact2026_2028}</td>
                  <td className="p-2 border text-right">{val.okr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <details className="mb-4 border rounded">
        <summary className="p-3 bg-gray-50 font-medium text-sm">Детализация рефакторинга (1.2)</summary>
        <div className="overflow-x-auto p-3">
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-100"><th className="p-2 border">№</th><th className="p-2 border">Наименование</th><th className="p-2 border">CSI</th><th className="p-2 border">Заявлений</th><th className="p-2 border">Отказы,%</th><th className="p-2 border">Положит.,%</th><th className="p-2 border">Ошибки,%</th><th className="p-2 border">Черновики,%</th><th className="p-2 border">Сред. время, с</th><th className="p-2 border">Без визита</th><th className="p-2 border">ЕПГУ</th><th className="p-2 border">ЛиР</th><th className="p-2 border">Витрина</th><th className="p-2 border">КП 2026</th></tr></thead>
            <tbody>
              {refactoringDetails.map(d => (
                <tr key={d.id} className="border-t">
                  <td className="p-2 border">{d.id}</td>
                  <td className="p-2 border">{d.name}</td>
                  <td className="p-2 border text-right">{d.csi ?? '-'}</td>
                  <td className="p-2 border text-right">{d.applications ?? '-'}</td>
                  <td className="p-2 border text-right">{d.rejections ?? '-'}</td>
                  <td className="p-2 border text-right">{d.positive ?? '-'}</td>
                  <td className="p-2 border text-right">{d.errors ?? '-'}</td>
                  <td className="p-2 border text-right">{d.drafts ?? '-'}</td>
                  <td className="p-2 border text-right">{d.avgTime ? Math.round(d.avgTime) : '-'}</td>
                  <td className="p-2 border">{d.noVisit}</td>
                  <td className="p-2 border">{d.epgu}</td>
                  <td className="p-2 border">{d.lir}</td>
                  <td className="p-2 border">{d.vitrina}</td>
                  <td className="p-2 border">{d.plan2026 ? 'Да' : 'Нет'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );

  const EffectsTab = () => (
    <div>
      <h4 className="font-medium mb-4">Сводные эффекты</h4>
      {effectsData.map((cat, idx) => (
        <details key={idx} className="mb-4 border rounded" open>
          <summary className="p-3 bg-gray-50 font-medium text-sm">{cat.category}</summary>
          <div className="overflow-x-auto p-3">
            <table className="w-full text-xs border-collapse">
              <thead><tr className="bg-gray-100">
                <th className="p-2 border">Эффект</th>
                <th className="p-2 border" colSpan={3}>2025-2027</th>
                <th className="p-2 border" colSpan={3}>2026-2028</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="p-2 border"></th>
                <th className="p-2 border">Кол-во</th><th className="p-2 border">Значение</th><th className="p-2 border">Экономия</th>
                <th className="p-2 border">Кол-во</th><th className="p-2 border">Значение</th><th className="p-2 border">Экономия</th>
              </tr></thead>
              <tbody>
                {cat.items.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border text-right">{item.count2025}</td>
                    <td className="p-2 border text-right">{item.value2025 ?? '-'}</td>
                    <td className="p-2 border text-right">{item.economy2025 ? item.economy2025.toLocaleString() : '-'}</td>
                    <td className="p-2 border text-right">{item.count2026}</td>
                    <td className="p-2 border text-right">{item.value2026 ?? '-'}</td>
                    <td className="p-2 border text-right">{item.economy2026 ? item.economy2026.toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </div>
  );

  const FinanceTab = () => (
    <div>
      <h4 className="font-medium mb-4">Финансирование</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h5 className="text-sm font-semibold mb-2">Источники финансирования (млн руб.)</h5>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-50"><th className="p-2 border">Источник</th><th className="p-2 border">2025</th><th className="p-2 border">2026</th><th className="p-2 border">2027</th><th className="p-2 border">2028</th><th className="p-2 border">Итого</th></tr></thead>
            <tbody>
              {financeSources.map((s, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 border">{s.name}</td>
                  <td className="p-2 border text-right">{s.plan2025 > 0 ? s.plan2025.toFixed(2) : '-'}</td>
                  <td className="p-2 border text-right">{s.plan2026 > 0 ? s.plan2026.toFixed(2) : '-'}</td>
                  <td className="p-2 border text-right">{s.plan2027 > 0 ? s.plan2027.toFixed(2) : '-'}</td>
                  <td className="p-2 border text-right">{s.plan2028 > 0 ? s.plan2028.toFixed(2) : '-'}</td>
                  <td className="p-2 border text-right font-medium">{s.total > 0 ? s.total.toFixed(2) : '-'}</td>
                </tr>
              ))}
              <tr className="border-t bg-blue-50 font-medium">
                <td className="p-2 border">Итого</td>
                <td className="p-2 border text-right">{totalFinance.plan2025.toFixed(2)} (факт: {totalFinance.fact2025.toFixed(2)})</td>
                <td className="p-2 border text-right">{totalFinance.plan2026.toFixed(2)}</td>
                <td className="p-2 border text-right">{totalFinance.plan2027.toFixed(2)}</td>
                <td className="p-2 border text-right">{totalFinance.plan2028.toFixed(2)}</td>
                <td className="p-2 border text-right">{totalFinance.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h5 className="text-sm font-semibold mb-2">Объёмы финансирования по направлениям (млн руб.)</h5>
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-gray-50"><th className="p-2 border">Направление</th><th className="p-2 border">2024</th><th className="p-2 border">2025 (ФОИВ/НЭД)</th><th className="p-2 border">2026 (ФОИВ)</th><th className="p-2 border">Δ%, 26/25</th><th className="p-2 border">2026-2028 (ФОИВ)</th></tr></thead>
            <tbody>
              {financeDirections.map((d, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 border">{d.name}</td>
                  <td className="p-2 border text-right">{d.fact2024 ? d.fact2024.toFixed(2) : '-'}</td>
                  <td className="p-2 border text-right">{d.fact2025_foiv ? `${d.fact2025_foiv.toFixed(2)} / ${d.fact2025_ned.toFixed(2)}` : '-'}</td>
                  <td className="p-2 border text-right">{d.plan2026_foiv ? d.plan2026_foiv.toFixed(2) : '-'}</td>
                  <td className={`p-2 border text-right font-medium ${d.delta2026 !== null ? (d.delta2026 >= 0 ? 'text-green-600' : 'text-red-600') : ''}`}>{d.delta2026 !== null ? (d.delta2026 > 0 ? '+' : '') + d.delta2026.toFixed(1) + '%' : '-'}</td>
                  <td className="p-2 border text-right">{d.plan2026_2028_foiv ? d.plan2026_2028_foiv.toFixed(2) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-sm font-semibold mb-2">Кассовое исполнение 2025</h5>
        <div className="flex items-center gap-4">
          <div className="w-64 bg-gray-200 rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(totalFinance.fact2025 / totalFinance.plan2025) * 100}%` }}></div>
          </div>
          <span className="text-sm font-medium">{((totalFinance.fact2025 / totalFinance.plan2025) * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );

  const MaturityTab = () => (
    <div>
      <h4 className="font-medium mb-4">Технологическая зрелость</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <table className="w-full text-sm border-collapse">
            <thead><tr className="bg-gray-50"><th className="p-2 border">Направление</th><th className="p-2 border">Текущий уровень</th><th className="p-2 border">Целевой уровень</th></tr></thead>
            <tbody>
              {techMaturity.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 border">{t.domain}</td>
                  <td className="p-2 border text-center">{t.current}</td>
                  <td className="p-2 border text-center">{t.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h5 className="text-sm font-semibold mb-2">Уровень зрелости</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={techMaturity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis type="category" dataKey="domain" width={150} />
              <Tooltip />
              <Bar dataKey="current" fill="#3b82f6" name="Текущий" />
              <Bar dataKey="target" fill="#10b981" name="Целевой" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[95vh] overflow-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Показатели ВПЦТ</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        {/* Табы */}
        <div className="flex gap-2 border-b mb-4 pb-2 flex-wrap">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm rounded-t-lg transition ${activeTab === idx ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState(projectsData.map(p => ({ ...p, responsible: null })));
  const [selectedProject, setSelectedProject] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedProjectsForReport, setSelectedProjectsForReport] = useState([]);
  const [reportText, setReportText] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedSubProject, setSelectedSubProject] = useState(null);

  const handleSetResponsible = (projectId, employeeId) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, responsible: employeeId || null } : p));
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

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
              {project.type !== 'digital_id' && project.type !== 'optimization' && (
                <div className="absolute top-2 right-2 flex gap-1 text-xs">
                  <span title="Всего" className="text-gray-500">Σ{total}</span>
                  <span title="Выполнено" className="text-green-600">✓{done}</span>
                  <span title="Под риском" className="text-yellow-600">⚠{risk}</span>
                  <span title="Просрочено" className="text-red-600">✗{overdue}</span>
                </div>
              )}
              {project.type === 'optimization' && (
                <div className="absolute top-2 right-2 flex gap-1 text-xs">
                  <span title="Всего подпроектов" className="text-gray-500">Σ{project.subprojects.length}</span>
                  <span title="Выполнено" className="text-green-600">✓{project.controlPoints.done}</span>
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

              {project.type === 'optimization' && (
                <div className="text-xs text-gray-500 mb-2 flex-1">
                  Подпроектов: {project.subprojects.length}
                  <br />
                  Все в работе
                </div>
              )}

              {project.type !== 'digital_id' && project.type !== 'optimization' && <div className="flex-1" />}

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

      {/* Модальное окно дорожной карты (кроме digital_id и optimization) */}
      {selectedProject && selectedProject.type !== 'digital_id' && selectedProject.type !== 'optimization' && (
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

      {/* Модальное окно для "Оптимизация процессов" */}
      {selectedProject && selectedProject.type === 'optimization' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Оптимизация процессов – Подпроекты</h3>
              <button onClick={() => { setSelectedProject(null); setSelectedSubProject(null); }} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="space-y-2">
              {selectedProject.subprojects.map(sp => (
                <div key={sp.id} className="border rounded p-3 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{sp.id}. {sp.name}</p>
                    <p className="text-xs text-gray-500">План: {sp.plan} {sp.unit} | Дата: {sp.planDate} | Ответственный: {sp.responsible}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubProject(sp)}
                    className="ml-4 text-brand-500 text-sm hover:underline"
                  >
                    Дорожная карта
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно дорожной карты для подпроекта */}
      {selectedSubProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedSubProject.name} – Дорожная карта</h3>
              <button onClick={() => setSelectedSubProject(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">№</th>
                  <th className="p-2 text-left">Наименование, ед.изм.</th>
                  <th className="p-2 text-right">План</th>
                  <th className="p-2 text-right">Факт</th>
                  <th className="p-2 text-left">Плановая дата</th>
                  <th className="p-2 text-left">Фактическая дата</th>
                  <th className="p-2 text-left">Ответственный</th>
                  <th className="p-2 text-left">Статус</th>
                  <th className="p-2 text-right">УД (план)</th>
                  <th className="p-2 text-right">УД (проект)</th>
                </tr>
              </thead>
              <tbody>
                {selectedSubProject.roadmap && selectedSubProject.roadmap.length > 0 ? (
                  selectedSubProject.roadmap.map(point => (
                    <React.Fragment key={point.no}>
                      <tr className="border-t">
                        <td className="p-2">{point.no}</td>
                        <td className="p-2">{point.name}, {point.unit}</td>
                        <td className="p-2 text-right">{point.plan}</td>
                        <td className="p-2 text-right">{point.fact ?? '-'}</td>
                        <td className="p-2">{point.planDate}</td>
                        <td className="p-2">{point.factDate ?? '-'}</td>
                        <td className="p-2">{point.responsible}</td>
                        <td className="p-2">
                          <select
                            value={point.status}
                            onChange={e => {
                              // Здесь можно добавить логику подтверждения
                            }}
                            className="text-xs border rounded p-1"
                          >
                            <option value="В работе">В работе</option>
                            <option value="Выполнено">Выполнено</option>
                            <option value="Просрочено">Просрочено</option>
                          </select>
                        </td>
                        <td className="p-2 text-right">{point.udPlan ?? '-'}</td>
                        <td className="p-2 text-right">{point.udProject}</td>
                      </tr>
                      {point.children && point.children.map(child => (
                        <tr key={child.no} className="border-t bg-gray-50">
                          <td className="p-2 pl-6">{child.no}</td>
                          <td className="p-2 pl-6">{child.name}, {child.unit}</td>
                          <td className="p-2 text-right">{child.plan}</td>
                          <td className="p-2 text-right">{child.fact ?? '-'}</td>
                          <td className="p-2">{child.planDate}</td>
                          <td className="p-2">{child.factDate ?? '-'}</td>
                          <td className="p-2">{child.responsible}</td>
                          <td className="p-2">
                            <select
                              value={child.status}
                              onChange={e => {}}
                              className="text-xs border rounded p-1"
                            >
                              <option value="В работе">В работе</option>
                              <option value="Выполнено">Выполнено</option>
                              <option value="Просрочено">Просрочено</option>
                            </select>
                          </td>
                          <td className="p-2 text-right">{child.udPlan ?? '-'}</td>
                          <td className="p-2 text-right">{child.udProject}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="p-4 text-center text-gray-500">Дорожная карта отсутствует</td>
                  </tr>
                )}
              </tbody>
            </table>
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
