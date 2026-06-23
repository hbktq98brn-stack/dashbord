import React, { useState } from 'react';

// ---------- МОК-ДАННЫЕ ДЛЯ КАРТОЧЕК ----------

// 1. Указы Президента России
const ukazy = [
  { id: 1, number: 'Указ Президента РФ от 07.05.2024 № 309', title: 'О национальных целях развития Российской Федерации на период до 2030 года и на перспективу до 2036 года' },
  { id: 2, number: 'Указ Президента РФ от 21.07.2020 № 474', title: 'О национальных целях развития Российской Федерации на период до 2030 года' },
  { id: 3, number: 'Указ Президента РФ от 09.05.2017 № 203', title: 'О Стратегии развития информационного общества в Российской Федерации на 2017-2030 годы' },
];

// 2. Постановления Правительства РФ
const postanovleniya = [
  { id: 1, number: 'Постановление Правительства РФ от 10.10.2020 № 1646', title: 'Об утверждении Положения о федеральной государственной информационной системе "Единая информационная система управления кадровым составом государственной гражданской службы Российской Федерации"' },
  { id: 2, number: 'Постановление Правительства РФ от 24.05.2010 № 365', title: 'О координации мероприятий по использованию информационно-коммуникационных технологий в деятельности государственных органов' },
  { id: 3, number: 'Постановление Правительства РФ от 06.07.2015 № 676', title: 'О требованиях к порядку создания, развития, ввода в эксплуатацию, эксплуатации и вывода из эксплуатации государственных информационных систем' },
];

// 3. Распоряжения Правительства РФ
const rasporyazheniya = [
  { id: 1, number: 'Распоряжение Правительства РФ от 22.10.2021 № 2998-р', title: 'Об утверждении стратегического направления в области цифровой трансформации государственного управления' },
  { id: 2, number: 'Распоряжение Правительства РФ от 28.07.2017 № 1632-р', title: 'Об утверждении программы "Цифровая экономика Российской Федерации"' },
  { id: 3, number: 'Распоряжение Правительства РФ от 06.11.2021 № 3144-р', title: 'Об утверждении стратегического направления в области цифровой трансформации культуры' },
];

// 4. Приказы Минкультуры России
const prikazyMin = [
  { id: 1, number: 'Приказ Минкультуры России от 15.03.2022 № 361', title: 'Об утверждении порядка ведения государственного каталога Музейного фонда Российской Федерации' },
  { id: 2, number: 'Приказ Минкультуры России от 20.05.2021 № 1005', title: 'Об утверждении административного регламента предоставления государственной услуги по выдаче прокатных удостоверений на фильмы' },
  { id: 3, number: 'Приказ Минкультуры России от 01.12.2020 № 1619', title: 'Об утверждении порядка доступа к информационным системам Минкультуры России' },
  { id: 4, number: 'Приказ Минкультуры России от 10.08.2023 № 1240', title: 'Об утверждении правил предоставления субсидий на поддержку кинематографии' },
  { id: 5, number: 'Приказ Минкультуры России от 05.06.2024 № 456', title: 'Об утверждении положения об обработке персональных данных' },
  // Приняты НПА (5 штук), в разработке (4 штуки), на согласовании (2 штуки) – индикаторы
  // Мы просто имитируем эти цифры, а реальные документы пусть будут статичны.
];

const prikazyIndicator = { accepted: 5, inProgress: 4, onApproval: 2 };

// 5. Распоряжения Минкультуры России
const rasporyazheniyaMin = [
  { id: 1, number: 'Распоряжение Минкультуры России от 12.02.2024 № 01-02/34', title: 'О создании рабочей группы по цифровой трансформации библиотек' },
  { id: 2, number: 'Распоряжение Минкультуры России от 18.11.2023 № 05-11/89', title: 'Об организации перехода на электронный документооборот с подведомственными учреждениями' },
  { id: 3, number: 'Распоряжение Минкультуры России от 03.07.2023 № 14-03/56', title: 'Об утверждении графика переаттестации государственных информационных систем' },
];
const raspMinIndicator = { accepted: 5, inProgress: 4, onApproval: 2 }; // аналогічно

// 6. Документы ПДТР (Проектно-директивные технические решения)
const pdtrDocs = [
  { id: 1, number: 'ПДТР-2024-01', title: 'Требования к интеграции СЭД с порталом Госуслуг' },
  { id: 2, number: 'ПДТР-2024-02', title: 'Архитектура защищенной сети передачи данных Минкультуры' },
];

// 7. Документы ГУСП (Главное управление специальной связи)
const guspDocs = [
  { id: 1, number: 'ГУСП-2023-05', title: 'Требования к криптографической защите каналов связи' },
  { id: 2, number: 'ГУСП-2024-03', title: 'Инструкция по использованию СКЗИ при работе с ГосТех' },
];

// 8. Документы ФСТЭК
const fsteсDocs = [
  { id: 1, number: 'Приказ ФСТЭК России от 11.02.2013 № 17', title: 'Об утверждении требований о защите информации, не составляющей государственную тайну, содержащейся в государственных информационных системах' },
  { id: 2, number: 'Приказ ФСТЭК России от 14.03.2014 № 21', title: 'Об утверждении состава и содержания организационных и технических мер по обеспечению безопасности персональных данных' },
];

// 9. Инструкции
const instructionsList = [
  { id: 1, title: 'Выдача/переоформление ЭЦП' },
  { id: 2, title: 'Оформление доступа в ЭБ' },
  { id: 3, title: 'Оформление доступа Континент' },
  { id: 4, title: 'Оформление доступа АРМ Среда' },
];

// ---------- КОМПОНЕНТ ----------
export default function NormativeDocs() {
  const [activeCard, setActiveCard] = useState(null);

  // Статус для цветовой полосы (зелёный, если нет индикаторов риска)
  const getStatus = (key) => {
    // для всех карточек по умолчанию зелёный, кроме инструкций – тоже зелёный
    return 'green';
  };

  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50',
  };

  // Карточки
  const cards = [
    {
      key: 'ukazy',
      title: 'Указы Президента России',
      indicators: <span className="text-xs text-gray-500">Документов: {ukazy.length}</span>,
      content: 'Основополагающие указы',
    },
    {
      key: 'postanovleniya',
      title: 'Постановления Правительства РФ',
      indicators: <span className="text-xs text-gray-500">Документов: {postanovleniya.length}</span>,
      content: 'Правительственные постановления',
    },
    {
      key: 'rasporyazheniya',
      title: 'Распоряжения Правительства РФ',
      indicators: <span className="text-xs text-gray-500">Документов: {rasporyazheniya.length}</span>,
      content: 'Распоряжения Правительства',
    },
    {
      key: 'prikazyMin',
      title: 'Приказы Минкультуры России',
      indicators: (
        <div className="flex gap-1 text-xs">
          <span className="text-green-600">✓{prikazyIndicator.accepted}</span>
          <span className="text-yellow-600">⚙{prikazyIndicator.inProgress}</span>
          <span className="text-purple-600">✍{prikazyIndicator.onApproval}</span>
        </div>
      ),
      content: 'Ведомственные приказы',
    },
    {
      key: 'rasporyazheniyaMin',
      title: 'Распоряжения Минкультуры РФ',
      indicators: (
        <div className="flex gap-1 text-xs">
          <span className="text-green-600">✓{raspMinIndicator.accepted}</span>
          <span className="text-yellow-600">⚙{raspMinIndicator.inProgress}</span>
          <span className="text-purple-600">✍{raspMinIndicator.onApproval}</span>
        </div>
      ),
      content: 'Ведомственные распоряжения',
    },
    {
      key: 'pdtr',
      title: 'Документы ПДТР',
      indicators: <span className="text-xs text-gray-500">Документов: {pdtrDocs.length}</span>,
      content: 'Проектно-директивные тех. решения',
    },
    {
      key: 'gusp',
      title: 'Документы ГУСП',
      indicators: <span className="text-xs text-gray-500">Документов: {guspDocs.length}</span>,
      content: 'Главное управление спец. связи',
    },
    {
      key: 'fsteс',
      title: 'Документы ФСТЭК',
      indicators: <span className="text-xs text-gray-500">Документов: {fsteсDocs.length}</span>,
      content: 'Федеральная служба по тех. и экспортному контролю',
    },
    {
      key: 'instructions',
      title: 'Инструкции',
      indicators: <span className="text-xs text-gray-500">Всего: {instructionsList.length}</span>,
      content: 'Внутренние инструкции',
    },
  ];

  // Модальные окна
  const renderModal = () => {
    if (!activeCard) return null;
    switch (activeCard) {
      case 'ukazy':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Указы Президента России</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {ukazy.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'postanovleniya':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Постановления Правительства РФ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {postanovleniya.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'rasporyazheniya':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Распоряжения Правительства РФ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {rasporyazheniya.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'prikazyMin':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Приказы Минкультуры России</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {prikazyMin.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'rasporyazheniyaMin':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Распоряжения Минкультуры РФ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {rasporyazheniyaMin.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'pdtr':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Документы ПДТР</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {pdtrDocs.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'gusp':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Документы ГУСП</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {guspDocs.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'fsteс':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Документы ФСТЭК</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {fsteсDocs.map(doc => (
                  <li key={doc.id} className="border p-3 rounded">
                    <p className="font-medium">{doc.number}</p>
                    <p className="text-sm text-gray-600">{doc.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'instructions':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Инструкции</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <ul className="space-y-2">
                {instructionsList.map(instr => (
                  <li key={instr.id} className="border p-3 rounded">
                    <p className="font-medium">{instr.title}</p>
                  </li>
                ))}
              </ul>
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
          const status = getStatus(card.key);
          return (
            <div
              key={card.key}
              onClick={() => setActiveCard(card.key)}
              className={`metric-card p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${statusClasses[status]} relative h-48 flex flex-col`}
            >
              <div className="absolute top-2 right-2 flex gap-1 flex-wrap z-10">
                {card.indicators}
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4 pr-20">{card.title}</h3>
              <p className="text-xs text-gray-500 flex-1">{card.content}</p>
            </div>
          );
        })}
      </div>
      {renderModal()}
    </div>
  );
}
