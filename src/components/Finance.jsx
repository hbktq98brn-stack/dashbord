import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { employees } from '../data/employees';

// ---------- МОК-ДАННЫЕ ----------

// 1. Закупки большого объема
const bigPurchases = [
  {
    id: 1,
    name: 'Оказание услуг по сопровождению интерактивных электронных сервисов (БОР-навигатор)',
    responsible: 'Морозов Артур Асхатович',
    mpi: 'Эксплуатация объекта учета БОР-навигатор',
    kbk: '08 04 11405 90019 242',
    vr: '242',
    type: 'Открытый конкурс',
    smp: 'СМП',
    requestKp: '-',
    kp: '-',
    nmck: 2600000,
    izveshchenie: '-',
    publishDate: '-',
    endDate: '-',
    итоги: '-',
    status: 'Контракт заключен',
    contractNumber: '15/14-2024',
    contractPrice: 6500000,
    economy: 0,
    supplier: 'ООО "ИНТЕЛЛЕКТ-РЕСУРС"'
  },
  {
    id: 2,
    name: 'Приобретение прав на ПО системы удаленного мониторинга (Ассистент)',
    responsible: 'Потапенко Елизавета Андреевна',
    mpi: 'Эксплуатация серверного оборудования',
    kbk: '08 04 11405 90019 242',
    vr: '242',
    type: 'Электронный аукцион',
    smp: 'СМП',
    requestKp: '722-01-2@ от 04.03.2026 и др.',
    kp: '27/02 от 12.03.2026',
    nmck: 901833.33,
    izveshchenie: '0173100007726000055',
    publishDate: '13.04.2026',
    endDate: '22.04.2026',
    итоги: '24.04.2026',
    status: 'Контракт исполнен',
    contractNumber: '1/01-2-26',
    contractPrice: 901833.30,
    economy: 0,
    supplier: 'ИП ВАСИЛЬЕВ МАКСИМ СЕРГЕЕВИЧ'
  },
  {
    id: 3,
    name: 'Оказание услуг по активации сертификатов техподдержки ПО ВКС',
    responsible: 'Цаплин Алексей Владимирович',
    mpi: 'Эксплуатация рабочих станций',
    kbk: '08 04 11405 90020 242',
    vr: '242',
    type: 'Электронный аукцион',
    smp: 'СМП',
    requestKp: '740-01-2@ от 04.03.2026 и др.',
    kp: '200 от 05.03.2026',
    nmck: 5126896.28,
    izveshchenie: '0173100007726000052',
    publishDate: '13.04.2026',
    endDate: '23.04.2026',
    итоги: '27.04.2026',
    status: 'Контракт исполнен',
    contractNumber: '2/01-2-26',
    contractPrice: 5126896.28,
    economy: 0,
    supplier: 'ООО "АКТОР ИНФОРМАЦИОННЫЕ СИСТЕМЫ"'
  }
];

// 2. Закупки малого объема
const smallPurchases = [
  {
    id: 1,
    number1C: '26-000238-0001',
    name: 'Передача неисключительных прав Vipnet Client',
    responsible: 'Потапенко Елизавета Андреевна',
    quantity: '38 шт',
    tzDate: '16.02.2026',
    nmck: 395200,
    izveshchenie: '1.00301E+17',
    publishDate: '',
    endDate: '',
    итоги: '',
    supplier: 'АО "КАЛУГА АСТРАЛ"',
    contractDate: '26.05.2026',
    contractNumber: '1.00301E+17',
    contractSum: 395200,
    economy: 0,
    executionDate: '05.06.2026',
    acceptance: '10-7 раб',
    comment: ''
  },
  {
    id: 2,
    number1C: '26-000294-0001',
    name: 'Приобретение ключа активации техподдержки СЗИ (VipNet для Linux)',
    responsible: 'Потапенко Елизавета Андреевна',
    quantity: '15 шт',
    tzDate: '09.02.2026',
    nmck: 76585.50,
    izveshchenie: '',
    publishDate: '',
    endDate: '',
    итоги: '',
    supplier: '',
    contractDate: '',
    contractNumber: '',
    contractSum: '',
    economy: '',
    executionDate: '',
    acceptance: '',
    comment: ''
  },
  {
    id: 3,
    number1C: 'отмена',
    name: 'Приобретение прав на ПО системы защиты информации (лицензии для «Посейдон»)',
    responsible: 'Потапенко Елизавета Андреевна',
    quantity: 'П4',
    tzDate: '',
    nmck: 0,
    izveshchenie: '',
    publishDate: '',
    endDate: '',
    итоги: '',
    supplier: '',
    contractDate: '',
    contractNumber: '',
    contractSum: '',
    economy: '',
    executionDate: '',
    acceptance: '',
    comment: 'Отменено'
  }
];

// 3. Кассовое исполнение
const cashExecution = {
  limitsTotal: 198116200,
  nmckBig: 185321634.44,
  concludedBig: 166276431.67,
  executedBig: 14783965.67,
  nmckSmall: 5149623.50,
  concludedSmall: 1338221,
  executedSmall: 1338221,
  totalNmck: 190471257.94,
  totalConcluded: 167614652.67,
  totalExecuted: 16122186.67
};

// 4. Статус контрактов
const contractsStatus = bigPurchases.map(p => ({
  name: p.name,
  status: p.status
}));

// 5. Согласование документации
const docApproval = bigPurchases.map(p => ({
  name: p.name,
  status: 'Согласовано'
}));

// 6. Нарушения 44-ФЗ (пример)
const violations = [];

// 7. Просрочка поставки
const overdueSupply = [];

// 8. Внесение изменений в план-график
const planChanges = [
  { id: 1, szNumber: '610-01-3', content: 'О направлении плана-графика закупок на 2026 год в части ЦТ ДУДиЦТ' },
  { id: 2, szNumber: '613-01-3', content: 'О направлении скорректированного плана мероприятий Департамента управления делами и цифровой трансформации в части ЦТ на 2026 год.' },
  { id: 3, szNumber: '625-01-3', content: 'О направлении плана-графика закупок на 2026 год в части ЦТ ДУДиЦТ' }
];

// 9. Субсидии (придумаем)
const subsidies = [
  { id: 1, name: 'Субсидия на поддержку кинематографии', recipient: 'ФГУП "Киноконцерн Мосфильм"', amount: 15000000, status: 'Перечислено', date: '15.02.2026' },
  { id: 2, name: 'Субсидия на модернизацию библиотек', recipient: 'Российская государственная библиотека', amount: 8500000, status: 'На подписании', date: '28.02.2026' },
  { id: 3, name: 'Субсидия на цифровую трансформацию театров', recipient: 'Большой театр', amount: 12000000, status: 'План', date: '01.03.2026' },
  { id: 4, name: 'Субсидия на обеспечение деятельности музеев', recipient: 'Государственный Эрмитаж', amount: 20000000, status: 'Перечислено', date: '10.01.2026' }
];

// Цвета
const COLORS = ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981', '#ef4444'];

export default function Finance() {
  const [activeCard, setActiveCard] = useState(null);

  const getStatus = (key) => {
    // упрощённо: для большинства зелёный, для нарушений/просрочек – жёлтый или красный
    if (key === 'violations' && violations.length > 0) return 'yellow';
    if (key === 'overdue' && overdueSupply.length > 0) return 'red';
    return 'green';
  };

  const statusClasses = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50 animate-pulse'
  };

  // Карточки
  const cards = [
    {
      key: 'bigPurchases',
      title: 'Закупки большого объема',
      indicators: (
        <div className="flex gap-1 text-xs">
          <span className="text-gray-500">Σ{bigPurchases.length}</span>
          <span className="text-green-600">Исполнено {bigPurchases.filter(p => p.status === 'Контракт исполнен').length}</span>
        </div>
      ),
      content: 'Контракты > 600 тыс. руб.'
    },
    {
      key: 'smallPurchases',
      title: 'Закупки малого объема',
      indicators: (
        <div className="flex gap-1 text-xs">
          <span className="text-gray-500">Σ{smallPurchases.length}</span>
          <span className="text-red-600">Отмен {smallPurchases.filter(p => p.number1C === 'отмена').length}</span>
        </div>
      ),
      content: 'Закупки до 600 тыс. руб.'
    },
    {
      key: 'cashExecution',
      title: 'Кассовое исполнение',
      indicators: (
        <div className="text-xs text-gray-500">
          Лимиты: {cashExecution.limitsTotal.toLocaleString()} ₽
        </div>
      ),
      content: 'Сводка по бюджету'
    },
    {
      key: 'contractsStatus',
      title: 'Статус контрактов',
      indicators: (
        <div className="text-xs text-gray-500">
          Всего: {contractsStatus.length}
        </div>
      ),
      content: 'Текущее состояние контрактов'
    },
    {
      key: 'docApproval',
      title: 'Согласование документации',
      indicators: (
        <div className="text-xs text-green-600">
          Согласовано {docApproval.length}/{docApproval.length}
        </div>
      ),
      content: 'Статус технических заданий'
    },
    {
      key: 'violations',
      title: 'Нарушение 44-ФЗ',
      indicators: (
        <div className={`text-xs ${violations.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {violations.length > 0 ? '⚠ Обнаружены' : '✓ Отсутствуют'}
        </div>
      ),
      content: 'Контроль соблюдения законодательства'
    },
    {
      key: 'overdue',
      title: 'Просрочка поставки',
      indicators: (
        <div className={`text-xs ${overdueSupply.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {overdueSupply.length > 0 ? `⚠ ${overdueSupply.length} случая` : '✓ Нет'}
        </div>
      ),
      content: 'Контроль сроков исполнения'
    },
    {
      key: 'planChanges',
      title: 'Изменения в план-график',
      indicators: (
        <div className="text-xs text-gray-500">
          Всего {planChanges.length}
        </div>
      ),
      content: 'Служебные записки'
    },
    {
      key: 'subsidies',
      title: 'Субсидии',
      indicators: (
        <div className="text-xs text-gray-500">
          Сумма: {subsidies.reduce((s, sub) => s + sub.amount, 0).toLocaleString()} ₽
        </div>
      ),
      content: 'Перечисление субсидий ПБС'
    }
  ];

  // Рендер модального окна
  const renderModal = () => {
    if (!activeCard) return null;
    switch (activeCard) {
      case 'bigPurchases':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Закупки большого объема</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 border">№</th>
                    <th className="p-2 border">Наименование мероприятия</th>
                    <th className="p-2 border">Ответственное лицо</th>
                    <th className="p-2 border">МПИ</th>
                    <th className="p-2 border">КБК</th>
                    <th className="p-2 border">ВР</th>
                    <th className="p-2 border">Тип закупки</th>
                    <th className="p-2 border">СМП/не СМП</th>
                    <th className="p-2 border">Запрос КП</th>
                    <th className="p-2 border">КП</th>
                    <th className="p-2 border">НМЦК</th>
                    <th className="p-2 border">№ извещения</th>
                    <th className="p-2 border">Дата публикации</th>
                    <th className="p-2 border">Окончание подачи заявок</th>
                    <th className="p-2 border">Подведение итогов</th>
                    <th className="p-2 border">Статус</th>
                    <th className="p-2 border">Номер контракта</th>
                    <th className="p-2 border">Цена контракта</th>
                    <th className="p-2 border">Экономия</th>
                    <th className="p-2 border">Поставщик / Исполнитель</th>
                  </tr>
                </thead>
                <tbody>
                  {bigPurchases.map(p => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2 border">{p.id}</td>
                      <td className="p-2 border max-w-[200px] truncate">{p.name}</td>
                      <td className="p-2 border">{p.responsible}</td>
                      <td className="p-2 border">{p.mpi}</td>
                      <td className="p-2 border">{p.kbk}</td>
                      <td className="p-2 border">{p.vr}</td>
                      <td className="p-2 border">{p.type}</td>
                      <td className="p-2 border">{p.smp}</td>
                      <td className="p-2 border">{p.requestKp}</td>
                      <td className="p-2 border">{p.kp}</td>
                      <td className="p-2 border text-right">{p.nmck.toLocaleString()}</td>
                      <td className="p-2 border">{p.izveshchenie}</td>
                      <td className="p-2 border">{p.publishDate}</td>
                      <td className="p-2 border">{p.endDate}</td>
                      <td className="p-2 border">{p.итоги}</td>
                      <td className="p-2 border">{p.status}</td>
                      <td className="p-2 border">{p.contractNumber}</td>
                      <td className="p-2 border text-right">{p.contractPrice.toLocaleString()}</td>
                      <td className="p-2 border text-right">{p.economy}</td>
                      <td className="p-2 border">{p.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'smallPurchases':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-6xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Закупки малого объема</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 border">№</th>
                    <th className="p-2 border">1С</th>
                    <th className="p-2 border">Наименование</th>
                    <th className="p-2 border">Ответственное лицо</th>
                    <th className="p-2 border">Кол-во</th>
                    <th className="p-2 border">Дата ТЗ</th>
                    <th className="p-2 border">НМЦК</th>
                    <th className="p-2 border">№ извещения</th>
                    <th className="p-2 border">Дата публ.</th>
                    <th className="p-2 border">Окончание подачи</th>
                    <th className="p-2 border">Итоги</th>
                    <th className="p-2 border">Поставщик</th>
                    <th className="p-2 border">Дата контракта</th>
                    <th className="p-2 border">Номер контракта</th>
                    <th className="p-2 border">Сумма контракта</th>
                    <th className="p-2 border">Экономия</th>
                    <th className="p-2 border">Срок исполнения</th>
                    <th className="p-2 border">Приемка/оплата</th>
                    <th className="p-2 border">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {smallPurchases.map(p => (
                    <tr key={p.id} className="border-t">
                      <td className="p-2 border">{p.id}</td>
                      <td className="p-2 border">{p.number1C}</td>
                      <td className="p-2 border max-w-[200px] truncate">{p.name}</td>
                      <td className="p-2 border">{p.responsible}</td>
                      <td className="p-2 border">{p.quantity}</td>
                      <td className="p-2 border">{p.tzDate}</td>
                      <td className="p-2 border text-right">{p.nmck.toLocaleString()}</td>
                      <td className="p-2 border">{p.izveshchenie}</td>
                      <td className="p-2 border">{p.publishDate}</td>
                      <td className="p-2 border">{p.endDate}</td>
                      <td className="p-2 border">{p.итоги}</td>
                      <td className="p-2 border">{p.supplier}</td>
                      <td className="p-2 border">{p.contractDate}</td>
                      <td className="p-2 border">{p.contractNumber}</td>
                      <td className="p-2 border text-right">{p.contractSum.toLocaleString()}</td>
                      <td className="p-2 border text-right">{p.economy}</td>
                      <td className="p-2 border">{p.executionDate}</td>
                      <td className="p-2 border">{p.acceptance}</td>
                      <td className="p-2 border">{p.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cashExecution':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Кассовое исполнение</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Сводка по лимитам и контрактам</h4>
                  <ul className="text-sm space-y-1">
                    <li>Общие лимиты: <span className="font-medium">{cashExecution.limitsTotal.toLocaleString()} ₽</span></li>
                    <li>НМЦК больших закупок: {cashExecution.nmckBig.toLocaleString()} ₽</li>
                    <li>Заключено больших контрактов: {cashExecution.concludedBig.toLocaleString()} ₽</li>
                    <li>Исполнено больших контрактов: {cashExecution.executedBig.toLocaleString()} ₽</li>
                    <li>НМЦК малых закупок: {cashExecution.nmckSmall.toLocaleString()} ₽</li>
                    <li>Заключено малых контрактов: {cashExecution.concludedSmall.toLocaleString()} ₽</li>
                    <li>Исполнено малых контрактов: {cashExecution.executedSmall.toLocaleString()} ₽</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Соотношение заключенных контрактов</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={[
                        { name: 'Большие закупки', value: cashExecution.concludedBig },
                        { name: 'Малые закупки', value: cashExecution.concludedSmall }
                      ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {[COLORS[0], COLORS[1]].map((color, i) => <Cell key={i} fill={color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Общие показатели</h4>
                <ul className="text-sm space-y-1">
                  <li>Общая НМЦК: {cashExecution.totalNmck.toLocaleString()} ₽</li>
                  <li>Заключено всего контрактов: {cashExecution.totalConcluded.toLocaleString()} ₽</li>
                  <li>Исполнено всего контрактов: {cashExecution.totalExecuted.toLocaleString()} ₽</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'contractsStatus':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Статус контрактов</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Наименование контракта</th>
                    <th className="p-2 text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {contractsStatus.map((c, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{c.name}</td>
                      <td className="p-2">{c.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'docApproval':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Согласование документации</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">Название мероприятия</th>
                    <th className="p-2 text-left">Статус согласования ТЗ</th>
                  </tr>
                </thead>
                <tbody>
                  {docApproval.map((d, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="p-2">{d.name}</td>
                      <td className="p-2">{d.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'violations':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Нарушения 44-ФЗ</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              {violations.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Мероприятие</th>
                      <th className="p-2 text-left">Нарушение</th>
                      <th className="p-2 text-left">Штраф</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violations.map((v, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{v.event}</td>
                        <td className="p-2">{v.violation}</td>
                        <td className="p-2">{v.fine}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-green-600">Нарушений не выявлено</p>
              )}
            </div>
          </div>
        );
      case 'overdue':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Просрочка поставки</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              {overdueSupply.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Мероприятие</th>
                      <th className="p-2 text-left">Срок просрочки (дни)</th>
                      <th className="p-2 text-left">Меры</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overdueSupply.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{item.event}</td>
                        <td className="p-2">{item.overdueDays}</td>
                        <td className="p-2">{item.measures}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-green-600">Просрочек нет</p>
              )}
            </div>
          </div>
        );
      case 'planChanges':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Внесение изменений в план-график</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left">№</th>
                    <th className="p-2 text-left">№ служебной записки</th>
                    <th className="p-2 text-left">Содержание</th>
                  </tr>
                </thead>
                <tbody>
                  {planChanges.map(item => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.szNumber}</td>
                      <td className="p-2">{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'subsidies':
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Субсидии</h3>
                <button onClick={() => setActiveCard(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Список субсидий</h4>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left">Наименование</th>
                        <th className="p-2 text-left">Получатель</th>
                        <th className="p-2 text-right">Сумма</th>
                        <th className="p-2 text-left">Статус</th>
                        <th className="p-2 text-left">Дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subsidies.map(s => (
                        <tr key={s.id} className="border-t">
                          <td className="p-2">{s.name}</td>
                          <td className="p-2">{s.recipient}</td>
                          <td className="p-2 text-right">{s.amount.toLocaleString()} ₽</td>
                          <td className="p-2">{s.status}</td>
                          <td className="p-2">{s.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Распределение по статусам</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={[
                        { name: 'Перечислено', value: subsidies.filter(s => s.status === 'Перечислено').reduce((sum, s) => sum + s.amount, 0) },
                        { name: 'На подписании', value: subsidies.filter(s => s.status === 'На подписании').reduce((sum, s) => sum + s.amount, 0) },
                        { name: 'План', value: subsidies.filter(s => s.status === 'План').reduce((sum, s) => sum + s.amount, 0) }
                      ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                        {[COLORS[0], COLORS[1], COLORS[4]].map((color, i) => <Cell key={i} fill={color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
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
