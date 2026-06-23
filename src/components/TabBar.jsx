import React from 'react';

const tabs = [
  'Документооборот',
  'Проекты',
  'ИБ / ИТ',
  'ГИС и ИТ-инфра',
  'Статистика',
  'Финансы и закупки'
];

export default function TabBar({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1 mb-6 border-b pb-2">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          className={`px-3 py-1.5 text-sm rounded-t-lg transition ${
            active === idx
              ? 'bg-white text-brand-600 shadow-sm font-medium border border-b-0'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onSelect(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
