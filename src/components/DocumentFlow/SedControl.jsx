import React, { useState } from 'react';
import { sedAll, sedNew, sedUnread, sedExpiring, sedOverdue } from '../../data/sedDocuments';

const categories = [
  { key: 'all', label: 'ВСЕ', count: sedAll.length, url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557670&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'new', label: 'НОВЫЕ', count: sedNew.length, url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557671&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'unread', label: 'НЕ РАССМОТРЕНО', count: sedUnread.length, url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557672&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'expiring', label: 'СРОК ИСТЕКАЕТ', count: sedExpiring.length, url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557673&card_id=0.3UQL9.&cabinet_id=6998476' },
  { key: 'overdue', label: 'ПРОСРОЧЕНО', count: sedOverdue.length, url: 'http://192.168.10.133/delou/Pages/Cabinet/Folder.aspx?folder_id=1&folders=1|2&isn_request=6557674&card_id=0.3UQL9.&cabinet_id=6998476' },
];

const getData = (key) => {
  switch (key) {
    case 'all': return sedAll;
    case 'new': return sedNew;
    case 'unread': return sedUnread;
    case 'expiring': return sedExpiring;
    case 'overdue': return sedOverdue;
    default: return [];
  }
};

const columnHeaders = ['Вид', 'К', '№ РК', 'Дата рег.', 'Содержание', 'Корр./Подписал', 'Автор резолюции/№ пункта', 'Исполнитель', 'План', 'Текст поручения', 'Дата исп.', 'Файлы'];

export default function SedControl() {
  const [expandedCat, setExpandedCat] = useState(null);

  const toggleCategory = (key) => {
    setExpandedCat(prev => prev === key ? null : key);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Контроль СЭД</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
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
              {cat.label} ({cat.count})
            </a>
            <button
              onClick={() => toggleCategory(cat.key)}
              className="text-xs text-brand-500 mt-1 hover:underline"
            >
              {expandedCat === cat.key ? 'Скрыть документы' : 'Показать документы'}
            </button>
          </div>
        ))}
      </div>

      {expandedCat && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {columnHeaders.map(h => (
                  <th key={h} className="p-2 border text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getData(expandedCat).map((doc, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-2 border">{doc.вид}</td>
                  <td className="p-2 border">{doc.к}</td>
                  <td className="p-2 border">{doc.№_РК}</td>
                  <td className="p-2 border whitespace-nowrap">{doc.дата_рег}</td>
                  <td className="p-2 border max-w-[200px] truncate">{doc.содержание}</td>
                  <td className="p-2 border">{doc.корр}</td>
                  <td className="p-2 border">{doc.автор_резолюции}</td>
                  <td className="p-2 border">{doc.исполнитель}</td>
                  <td className="p-2 border whitespace-nowrap">{doc.план}</td>
                  <td className="p-2 border max-w-[200px] truncate">{doc.текст_поручения}</td>
                  <td className="p-2 border whitespace-nowrap">{doc.дата_исп}</td>
                  <td className="p-2 border">{doc.файлы}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
