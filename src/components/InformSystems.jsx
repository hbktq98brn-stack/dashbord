import React, { useState } from 'react';

// Мок-данные для каждой системы
const systemsData = [
  {
    key: 'neb',
    title: 'АИС НЭБ',
    fullName: 'Приказ №231 от 24.01.2015 г. О вводе в промышленную эксплуатацию информационной системы «Национальная электронная библиотека»',
    documents: {
      tz: ['Техническое задание на разработку НЭБ (2014)', 'Технические требования на доработку поиска (2023)'],
      passport: ['Паспорт информационной системы НЭБ v.2.1'],
      businessProcess: ['Описание бизнес-процесса обработки электронных копий'],
      эксплуатация: ['Руководство администратора', 'Инструкция по резервному копированию'],
      приемка: ['Акт приёмочных испытаний от 20.01.2015', 'Протокол замечаний']
    }
  },
  {
    key: 'statistika',
    title: 'АИС Статистика',
    fullName: 'Приказ №642 от 21.03.2016 г. О вводе в промышленную эксплуатацию Автоматизированной информационной системы сбора статистической отчетности',
    documents: {
      tz: ['ТЗ на разработку АИС "Статистика" (2015)'],
      passport: ['Паспорт АИС "Статистика"'],
      businessProcess: ['Описание бизнес-процесса сбора статотчетности'],
      эксплуатация: ['Инструкция пользователя', 'Регламент обновления'],
      приемка: ['Акт ввода в эксплуатацию от 21.03.2016']
    }
  },
  {
    key: 'lostart',
    title: 'База данных Лостарт',
    fullName: 'Приказ №2904 от 23.12.2016 г. О вводе в эксплуатацию информационной системы «ЛостАрт»',
    documents: {
      tz: ['Техническое задание на ЛостАрт (2016)'],
      passport: ['Паспорт ИС ЛостАрт'],
      businessProcess: ['Описание бизнес-процесса поиска утраченных ценностей'],
      эксплуатация: ['Руководство по эксплуатации'],
      приемка: ['Акт приёмки от 23.12.2016']
    }
  },
  {
    key: 'goscatalog',
    title: 'Госкаталог',
    fullName: 'Приказ №960 от 04.10.2011 г. О порядке и сроках ввода в эксплуатацию Федеральной государственной информационной системы «Государственный каталог Музейного фонда Российской Федерации»',
    documents: {
      tz: ['Техническое задание на Госкаталог (2010)'],
      passport: ['Паспорт ФГИС Госкаталог'],
      businessProcess: ['Описание бизнес-процесса учета музейных предметов'],
      эксплуатация: ['Руководство администратора Госкаталога'],
      приемка: ['Акт ввода в промышленную эксплуатацию от 04.10.2011']
    }
  },
  {
    key: 'eais',
    title: 'ЕАИС',
    fullName: 'Акт от 03.04.2013 г. Акт ввода в промышленную эксплуатацию единой федеральной автоматизированной информационной системы сведений о показах фильмов в кинозалах',
    documents: {
      tz: ['Техническое задание на ЕАИС (2011)'],
      passport: ['Паспорт ЕАИС'],
      businessProcess: ['Описание бизнес-процесса сбора данных о показах'],
      эксплуатация: ['Инструкция по работе с ЕАИС'],
      приемка: ['Акт ввода в эксплуатацию от 03.04.2013']
    }
  },
  {
    key: 'eas_gosuslugi',
    title: 'ЕАС Госуслуги',
    fullName: 'Приказ №636 от 21.03.2016 г. О вводе в промышленную эксплуатацию Единой информационной системы поддержки оказания государственных услуг Минкультуры России',
    documents: {
      tz: ['ТЗ на ЕАС Госуслуги (2015)'],
      passport: ['Паспорт ЕАС Госуслуги'],
      businessProcess: ['Описание бизнес-процесса оказания госуслуг'],
      эксплуатация: ['Регламент работы с ЕАС Госуслуги'],
      приемка: ['Акт ввода в эксплуатацию от 21.03.2016']
    }
  },
  {
    key: 'egrokn',
    title: 'ЕГРОКН',
    fullName: 'Приказ №2508 от 30.12.2014 г. О порядке и сроке ввода в промышленную эксплуатацию федеральной автоматизированной информационной системы «Единый государственный реестр объектов культурного наследия (памятников истории и культуры) народов Российской Федерации» (первая очередь)',
    documents: {
      tz: ['Техническое задание на ЕГРОКН (2013)'],
      passport: ['Паспорт ФАИС ЕГРОКН'],
      businessProcess: ['Описание бизнес-процесса ведения реестра объектов культурного наследия'],
      эксплуатация: ['Руководство оператора', 'Инструкция по внесению данных'],
      приемка: ['Акт ввода в промышленную эксплуатацию от 30.12.2014']
    }
  },
  {
    key: 'internet_resources',
    title: 'Интернет ресурсы о культуре',
    fullName: 'Приказ №1255 от 27.06.2017 г. О вводе в промышленную эксплуатацию автоматизированной информационной системы «Интернет ресурсы о культуре»',
    documents: {
      tz: ['Техническое задание на АИС "Интернет ресурсы о культуре" (2016)'],
      passport: ['Паспорт АИС "Интернет ресурсы о культуре"'],
      businessProcess: ['Описание бизнес-процесса агрегации контента'],
      эксплуатация: ['Инструкция по модерации'],
      приемка: ['Акт ввода в эксплуатацию от 27.06.2017']
    }
  },
  {
    key: 'kultura_rf',
    title: 'Культура.РФ',
    fullName: 'Приказ №632 от 21.03.2016 г. О вводе в промышленную эксплуатацию Единого интернет-портала для популяризации культурного наследия и традиций России (Культура.рф)',
    documents: {
      tz: ['Техническое задание на портал Культура.РФ (2014)'],
      passport: ['Паспорт портала Культура.РФ'],
      businessProcess: ['Описание бизнес-процесса публикации материалов'],
      эксплуатация: ['Руководство редактора', 'Регламент наполнения контента'],
      приемка: ['Акт ввода в эксплуатацию от 21.03.2016']
    }
  }
];

export default function InformSystems() {
  const [activeSystem, setActiveSystem] = useState(null);

  // Все карточки зелёные (можно добавить индикаторы по наличию документов, но необязательно)
  const getStatus = () => 'green';
  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50'
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {systemsData.map(system => {
          const status = getStatus();
          return (
            <div
              key={system.key}
              onClick={() => setActiveSystem(system)}
              className={`metric-card p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${statusClasses[status]} relative h-48 flex flex-col`}
            >
              <div className="absolute top-2 right-2 text-xs text-gray-500">
                Документов: {Object.values(system.documents).flat().length}
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4 pr-16">{system.title}</h3>
              <p className="text-xs text-gray-500 flex-1">{system.fullName}</p>
            </div>
          );
        })}
      </div>

      {activeSystem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{activeSystem.title} – Документы</h3>
              <button onClick={() => setActiveSystem(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="mb-4 p-3 border rounded bg-blue-50">
              <p className="text-sm font-medium">Основание:</p>
              <p className="text-sm">{activeSystem.fullName}</p>
            </div>
            {/* Аккордеон разделов */}
            {[
              { key: 'tz', label: 'Техническое задание на разработку / Технические требования' },
              { key: 'passport', label: 'Паспорт информационной системы' },
              { key: 'businessProcess', label: 'Описание бизнес-процесса системы' },
              { key: 'эксплуатация', label: 'Эксплуатационные документы' },
              { key: 'приемка', label: 'Приемочные документы' }
            ].map(section => (
              <details key={section.key} className="mb-2 border rounded">
                <summary className="p-3 bg-gray-50 cursor-pointer font-medium text-sm">
                  {section.label} ({activeSystem.documents[section.key]?.length || 0})
                </summary>
                <ul className="p-3 space-y-1 text-sm">
                  {activeSystem.documents[section.key]?.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500">📄</span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
