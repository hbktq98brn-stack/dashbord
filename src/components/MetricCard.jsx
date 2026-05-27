import React, { useState, useEffect } from 'react';
import TrendChart from './TrendChart';
import { employees } from '../data/employees';

export default function MetricCard({ metric, onResponsibleChange }) {
  const [responsible, setResponsible] = useState(metric.responsible || null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (metric.status === 'red' && !showAlert) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }
  }, [metric.status]);

  const statusColors = {
    green: 'status-green bg-green-50',
    yellow: 'status-yellow bg-yellow-50',
    red: 'status-red bg-red-50'
  };

  const handleChange = (e) => {
    const empId = Number(e.target.value);
    const emp = employees.find(e => e.id === empId);
    setResponsible(emp);
    if (onResponsibleChange) onResponsibleChange(metric.id, emp);
  };

  return (
    <div className={`metric-card p-4 rounded-xl ${statusColors[metric.status]} relative`}>
      {showAlert && metric.status === 'red' && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
          Требует внимания!
        </div>
      )}
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-700 mb-1 flex-1">{metric.title}</h3>
        <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">{metric.id}</span>
      </div>

      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-bold text-gray-800">
          {typeof metric.value === 'number' ? (metric.value % 1 === 0 ? metric.value : metric.value.toFixed(1)) : metric.value}
        </span>
        <span className="text-xs text-gray-500">{metric.target}</span>
      </div>

      {metric.trend && (
        <div className="mt-2 h-16">
          <TrendChart data={metric.trend} color={metric.status === 'red' ? '#ef4444' : metric.status === 'yellow' ? '#f59e0b' : '#10b981'} />
        </div>
      )}

      <div className="mt-3">
        <label className="text-xs text-gray-500 block mb-1">Ответственный:</label>
        <select
          value={responsible?.id || ''}
          onChange={handleChange}
          className="w-full text-xs border rounded p-1 bg-white"
        >
          <option value="">Не назначен</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name} ({emp.position})</option>
          ))}
        </select>
        {responsible && (
          <p className="text-xs text-gray-600 mt-1">{responsible.name}</p>
        )}
      </div>
    </div>
  );
}
