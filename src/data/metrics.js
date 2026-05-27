export const metricsData = {
  projects: [
    { id: '2.1', title: 'Доля выполненных показателей ВПЦТ', value: 87, target: '≥95%', status: 'red', trend: [82, 84, 85, 87, 89, 87] },
    { id: '2.2', title: 'Своевременность внедрения госуслуг на ЕПГУ', value: 100, target: '100%', status: 'green', trend: null },
    { id: '2.3', title: 'Регионы с "Цифровым ID"', value: 63, target: '85+', status: 'yellow', trend: [58, 60, 61, 62, 63, 63] },
    { id: '2.4', title: 'Активность "Цифрового ID"', value: 0.4, target: '≥0.5', status: 'yellow', trend: null },
    { id: '2.5', title: 'Исполнение поручений по оптимизации', value: 92, target: '100%', status: 'yellow', trend: null },
    { id: '2.6', title: 'Отменено дублирующих отчётов', value: 12, target: '20% в год', status: 'green', trend: null },
    { id: '2.7', title: 'Статус СН ЦТ', value: 'На согласовании', target: '≤30 дней', status: 'yellow', trend: null },
    { id: '2.8', title: 'Проекты ИИ с паспортами', value: 75, target: '100%', status: 'red', trend: null },
    { id: '2.9', title: 'Ошибки в ГИС ЦАП', value: 3, target: '≤5%', status: 'green', trend: null },
    { id: '2.10', title: 'Отклонение миграции на ГосТех', value: -5, target: '0 дней', status: 'red', trend: null }
  ],
  eds: [
    { id: '3.1', title: 'ЭП выпущено ≤3 дней', value: 88, target: '≥90%', status: 'yellow', trend: [85, 86, 87, 88, 88, 88] },
    { id: '3.2', title: 'Сертификаты с истечением', value: 4, target: 'Автоувед.', status: 'yellow', trend: null },
    { id: '3.3', title: 'Отказы УЦ', value: 8, target: '<10%', status: 'green', trend: null },
    { id: '3.4', title: 'Время устранения отказа', value: 1.5, target: '≤2 дня', status: 'green', trend: null },
    { id: '3.5', title: 'МЧД без доработки', value: 82, target: '≥85%', status: 'yellow', trend: null },
    { id: '3.6', title: 'Отправка оригиналов в УЦ', value: 2, target: '≤3 дней', status: 'green', trend: null },
    { id: '3.7', title: '"Потерянные" сертификаты', value: 0, target: '0', status: 'green', trend: null },
    { id: '3.8', title: 'Ответ на обращение по ЭП', value: 1.2, target: '≤1 дня', status: 'yellow', trend: null }
  ],
  infosec: [
    { id: '4.1', title: 'План мероприятий ИБ', value: 80, target: 'Отст. ≤15%', status: 'yellow', trend: [75, 77, 78, 80, 80, 80] },
    { id: '4.2', title: 'Норм. документы ИБ', value: '12/5/8', target: '100%', status: 'yellow', trend: null },
    { id: '4.3', title: 'ГИС с актуальной док.', value: 60, target: '100%', status: 'red', trend: null },
    { id: '4.4', title: 'Просрочка ответа ФСТЭК', value: 0, target: '0', status: 'green', trend: null },
    { id: '4.5', title: 'Неудалённые учётки', value: 1, target: '0', status: 'red', trend: null },
    { id: '4.6', title: 'АРМ с парольной политикой', value: 98, target: '100%', status: 'yellow', trend: null },
    { id: '4.7', title: 'План переаттестации', value: 'Утверждён', target: 'До 1 дек', status: 'green', trend: null },
    { id: '4.8', title: 'Пентесты/сканирования', value: 2, target: '≥2 в год', status: 'green', trend: null },
    { id: '4.9', title: 'Закрытие инцидентов (ч)', value: 18, target: '≤24', status: 'green', trend: null },
    { id: '4.10', title: 'Нарушения СКЗИ', value: 2, target: '0', status: 'yellow', trend: null }
  ],
  gis: [
    { id: '5.1', title: 'Актуальность ФГИС КИ', value: 95, target: '100%', status: 'yellow', trend: null },
    { id: '5.2', title: 'Доступность ГИС', value: 99.7, target: '≥99.5%', status: 'green', trend: null },
    { id: '5.3', title: 'Простои по вине ТП', value: 1, target: '≤2', status: 'green', trend: null },
    { id: '5.4', title: 'SLA техподдержки', value: 93, target: '≥95%', status: 'yellow', trend: [90, 91, 92, 93, 93, 93] },
    { id: '5.5', title: 'Дубли учёток ГАИС', value: 0, target: '0', status: 'green', trend: null },
    { id: '5.6', title: 'Выдача доступов', value: 1, target: '≤2 дня', status: 'green', trend: null },
    { id: '5.7', title: 'Документация на ГИС', value: 85, target: '100%', status: 'yellow', trend: null },
    { id: '5.8', title: 'Антивирусные базы', value: 99, target: '≥98%', status: 'green', trend: null },
    { id: '5.9', title: 'Подключение сотрудника', value: 2.5, target: '≤2 дня', status: 'yellow', trend: null },
    { id: '5.10', title: 'Резервное копирование', value: 99, target: '100%', status: 'yellow', trend: null }
  ],
  stats: [
    { id: '6.1', title: 'Расхождение данных культуры', value: 3.2, target: '≤5%', status: 'green', trend: null },
    { id: '6.2', title: 'Сдача статотчётов', value: 100, target: '100%', status: 'green', trend: null },
    { id: '6.3', title: 'Корректировки от регионов', value: 7, target: 'Снижение', status: 'yellow', trend: null },
    { id: '6.4', title: 'Открытые данные обновлены', value: 78, target: '≥80%', status: 'yellow', trend: null },
    { id: '6.5', title: 'Ответ Минэкономразвития', value: 2, target: '≤3 дня', status: 'green', trend: null },
    { id: '6.6', title: 'Заявки ГИС ЦАП', value: 95, target: '≥90%', status: 'green', trend: null },
    { id: '6.7', title: 'График статданных', value: 'Утверждён', target: 'До 1 дек', status: 'green', trend: null },
    { id: '6.8', title: 'Верификация нацпроектов (дни)', value: 4, target: '≤5', status: 'green', trend: null }
  ],
  finance: [
    { id: '7.1', title: 'Кассовое исполнение', value: 92, target: '90-110%', status: 'green', trend: [85, 88, 90, 92, 93, 92] },
    { id: '7.2', title: 'Контракты в срок', value: 97, target: '≥95%', status: 'green', trend: null },
    { id: '7.3', title: 'Согласование документации', value: 11, target: '≤10 дней', status: 'red', trend: null },
    { id: '7.4', title: 'Нарушения 44-ФЗ', value: 0, target: '0', status: 'green', trend: null },
    { id: '7.5', title: 'Просрочка приёмки', value: 4, target: '<5%', status: 'green', trend: null },
    { id: '7.6', title: 'Изменения плана-графика', value: 1, target: '0', status: 'yellow', trend: null },
    { id: '7.7', title: 'Субсидии перечислены', value: 100, target: '100%', status: 'green', trend: null },
    { id: '7.8', title: 'Претензии по контрактам', value: 0, target: '0', status: 'green', trend: null },
    { id: '7.9', title: 'KPI ГИВЦ (просрочка)', value: 0, target: '0', status: 'green', trend: null },
    { id: '7.10', title: 'Закрытые контракты', value: 88, target: '100%', status: 'yellow', trend: null }
  ]
};
