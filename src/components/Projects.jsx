import React, { useState } from 'react';
import MetricCard from './MetricCard';
import { metricsData } from '../data/metrics';

export default function Projects() {
  const [responsibleMap, setResponsibleMap] = useState({});

  const handleResponsibleChange = (metricId, emp) => {
    setResponsibleMap(prev => ({ ...prev, [metricId]: emp }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Проекты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsData.projects.map(metric => (
          <MetricCard
            key={metric.id}
            metric={{ ...metric, responsible: responsibleMap[metric.id] || null }}
            onResponsibleChange={handleResponsibleChange}
          />
        ))}
      </div>
    </div>
  );
}
