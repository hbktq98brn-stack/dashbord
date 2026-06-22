import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { sedAll, sedNew, sedUnread, sedExpiring, sedOverdue } from '../../data/sedDocuments';
import { employees } from '../../data/employees'; // список всех сотрудников

// Цвета категорий
const categoryColors = {
  all: '#3b82f6',
  new: '#10b981',
  unread: '#f59e0b',
  expiring: '#8b5cf6',
  overdue: '#ef4444',
};

// Массив категорий с ключами и ссылками (сами данные теперь будут фильтроваться)
const categories = [
  { key: 'all', label: 'ВСЕ', url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557670&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'new', label: 'НОВЫЕ', url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557671&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'unread', label: 'НЕ РАССМОТРЕНО', url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557672&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'expiring', label: 'СРОК ИСТЕКАЕТ', url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557673&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'overdue', label: 'ПРОСРОЧЕНО', url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557674&card_id=0.3UQL9.&cabinet_id=6998476' },
];

// Заглушка для таблицы «Исполнительский контроль»
const controlReportMock = [
  {
    num: '26-41708',
    date: '17.06.2026',
    content: 'О направлении на согласование проекта постановления Правительства РФ',
    execComment: 'Проект подготовлен, отправлен на согласование',
    finalComment: 'Утверждён, замечания устранены',
    link: 'Письмо от 16.06.2026 № 22184-ВИ/Д12и',
  },
  {
    num: '26-43070',
    date: '22.06.2026',
    content: 'О согласовании описаний целевых состояний по мерам поддержки',
    execComment: 'Проведена ВКС, замечания внесены',
    finalComment: 'Согласовано',
    link: 'Письмо от 19.06.2026 № Д09и-19836',
  },
];

// Вспомогательная функция получения данных по ключу
const getCategoryData = (key) => {
  switch (key) {
    case 'all': return sedAll;
    case 'new': return sedNew;
    case 'unread': return sedUnread;
    case 'expiring': return sedExpiring;
    case 'overdue': return sedOverdue;
    default: return [];
  }
};

// Фильтрация массива документов по сотруднику (по полю исполнитель)
const filterByEmployee = (docs, employeeName) => {
  if (!employeeName) return docs; // "Все сотрудники"
  return docs.filter(doc => doc["исполнитель"].includes(employeeName));
};

const columnHeaders = ['Вид', 'К', '№ РК', 'Дата рег.', 'Содержание', 'Корр./Подписал', 'Автор резолюции/№ пункта', 'Исполнитель', 'План', 'Текст поручения', 'Дата исп.', 'Файлы'];

export default function SedControl() {
  // Состояния
  const [expandedCat, setExpandedCat] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(''); // пустая строка = "Все сотрудники"
  const [showControlModal, setShowControlModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [controlReport, setControlReport] = useState(null);

  // Получаем отфильтрованные по сотруднику данные для всех категорий
  const filteredData = useMemo(() => {
    const empName = selectedEmployee;
    return {
      all: filterByEmployee(sedAll, empName),
      new: filterByEmployee(sedNew, empName),
      unread: filterByEmployee(sedUnread, empName),
      expiring: filterByEmployee(sedExpiring, empName),
      overdue: filterByEmployee(sedOverdue, empName),
    };
  }, [selectedEmployee]);

  // Общее количество документов сотрудника (для нагрузки)
  const totalDocs = useMemo(() => {
    let sum = 0;
    for (const key in filteredData) {
      sum += filteredData[key].length;
    }
    return sum;
  }, [filteredData]);

  // Уровень нагрузки на основе общего числа документов
  const workloadLevel = useMemo(() => {
    if (totalDocs === 0) return 'Нет данных';
    if (totalDocs <= 5) return 'Низкая нагрузка';
    if (totalDocs <= 10) return 'Средняя нагрузка';
    return 'Высокая нагрузка';
  }, [totalDocs]);

  // Данные для круговой диаграммы (исключая "Все")
  const pieData = useMemo(() => {
    return categories
      .filter(c => c.key !== 'all')
      .map(c => ({
        name: c.label,
        value: filteredData[c.key]?.length || 0,
        color: categoryColors[c.key],
      }));
  }, [filteredData]);

  // Переключение раскрытия категории
  const toggleCategory = (key) => {
    setExpandedCat(prev => prev === key ? null : key);
  };

  // Обработчик загрузки файла в «Исполнительском контроле»
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFile(file);
    setControlReport(null);
  };

  // Генерация отчета (используем мок)
  const generateControlReport = () => {
    // В реальности здесь был бы парсинг Excel, показываем мок
    setControlReport(controlReportMock);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Заголовок и выбор сотрудника */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-lg font-semibold text-gray-700">Контроль СЭД</h2>
        <div className="flex items-center gap-3">
          <select
            value={selectedEmployee}
            onChange={e => setSelectedEmployee(e.target.value)}
            className="border rounded-lg p-2 text-sm bg-white"
          >
            <option value="">Все сотрудники</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
          {/* Кнопка "Исполнительский контроль" */}
          <button
            onClick={() => setShowControlModal(true)}
            className="text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Исполнительский контроль
          </button>
        </div>
      </div>

      {/* Индикатор нагрузки */}
      {selectedEmployee && (
        <div className="mb-4 text-sm text-gray-600">
          Нагрузка сотрудника: <span className="font-medium">{workloadLevel}</span> (документов: {totalDocs})
        </div>
      )}

      {/* Диаграмма и кнопки категорий */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Круговая диаграмма */}
        <div className="flex-shrink-0 flex justify-center">
          <PieChart width={180} height={180}>
            <Pie
              data={pieData}
              innerRadius={55}
              outerRadius={85}
              dataKey="value"
              paddingAngle={2}
            >
              {pieData.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Кнопки категорий */}
        <div className="flex-1 flex flex-wrap gap-2 content-start">
          {categories.map(cat => {
            const count = filteredData[cat.key]?.length || 0;
            return (
              <div key={cat.key} className="flex flex-col items-start">
                <a
                  href={cat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    expandedCat === cat.key
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label} ({count})
                </a>
                <button
                  onClick={() => toggleCategory(cat.key)}
                  className="text-xs text-brand-500 mt-1 hover:underline"
                >
                  {expandedCat === cat.key ? 'Скрыть документы' : 'Показать документы'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Таблица документов (раскрывается) */}
      {expandedCat && (
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {columnHeaders.map(h => (
                  <th key={h} className="p-2 border text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData[expandedCat]?.length > 0 ? (
                filteredData[expandedCat].map((doc, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{doc["вид"]}</td>
                    <td className="p-2 border">{doc["к"]}</td>
                    <td className="p-2 border">{doc["№_РК"]}</td>
                    <td className="p-2 border whitespace-nowrap">{doc["дата_рег"]}</td>
                    <td className="p-2 border max-w-[200px] truncate">{doc["содержание"]}</td>
                    <td className="p-2 border">{doc["корр"]}</td>
                    <td className="p-2 border">{doc["автор_резолюции"]}</td>
                    <td className="p-2 border">{doc["исполнитель"]}</td>
                    <td className="p-2 border whitespace-nowrap">{doc["план"]}</td>
                    <td className="p-2 border max-w-[200px] truncate">{doc["текст_поручения"]}</td>
                    <td className="p-2 border whitespace-nowrap">{doc["дата_исп"]}</td>
                    <td className="p-2 border">{doc["файлы"]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="text-center p-4 text-gray-500">Нет документов</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно "Исполнительский контроль" */}
      {showControlModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Исполнительский контроль</h3>
              <button onClick={() => setShowControlModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf"
                  onChange={handleFileUpload}
                  className="text-sm border rounded p-2"
                />
                <button
                  onClick={generateControlReport}
                  className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 text-sm"
                >
                  Создать отчет
                </button>
              </div>

              {uploadedFile && !controlReport && (
                <p className="text-sm text-gray-500">Файл {uploadedFile.name} загружен. Нажмите "Создать отчет".</p>
              )}

              {controlReport && (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 border text-left">№ документа</th>
                        <th className="p-2 border text-left">Дата</th>
                        <th className="p-2 border text-left">Содержание</th>
                        <th className="p-2 border text-left">Комментарий исполнителя</th>
                        <th className="p-2 border text-left">Итоговый комментарий</th>
                        <th className="p-2 border text-left">Ссылка (письмо)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controlReport.map((row, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-2 border">{row.num}</td>
                          <td className="p-2 border">{row.date}</td>
                          <td className="p-2 border">{row.content}</td>
                          <td className="p-2 border">{row.execComment}</td>
                          <td className="p-2 border">{row.finalComment}</td>
                          <td className="p-2 border">{row.link}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
