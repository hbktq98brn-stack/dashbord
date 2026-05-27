import React, { useState } from 'react';
import TabBar from './components/TabBar';
import DocumentFlow from './components/DocumentFlow/DocumentFlow';
import Projects from './components/Projects';
import EDS from './components/EDS';
import InfoSec from './components/InfoSec';
import GisInfra from './components/GisInfra';
import StatsAnalytics from './components/StatsAnalytics';
import Finance from './components/Finance';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0: return <DocumentFlow />;
      case 1: return <Projects />;
      case 2: return <EDS />;
      case 3: return <InfoSec />;
      case 4: return <GisInfra />;
      case 5: return <StatsAnalytics />;
      case 6: return <Finance />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      <header className="mb-2">
        <h1 className="text-3xl font-light text-gray-800">Управленческий дашборд</h1>
        <p className="text-gray-500">Департамент управления делами и цифровой трансформации</p>
      </header>
      <TabBar active={activeTab} onSelect={setActiveTab} />
      {renderTab()}
    </div>
  );
}
