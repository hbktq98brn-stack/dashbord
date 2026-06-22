import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import TabBar from './components/TabBar';
import DocumentFlow from './components/DocumentFlow/DocumentFlow';
import Projects from './components/Projects';
import EDS from './components/EDS';
import InfoSec from './components/InfoSec';
import GisInfra from './components/GisInfra';
import StatsAnalytics from './components/StatsAnalytics';
import Finance from './components/Finance';
import { useLog } from './hooks/useLog';

function AppContent() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const { addLog } = useLog(user);

  const handleTabChange = (idx) => {
    setActiveTab(idx);
    const tabNames = ['Документооборот', 'Проекты', 'ЭП/МЧД', 'ИБ', 'ГИС', 'Статистика', 'Финансы'];
    addLog('Переход по вкладке', tabNames[idx]);
  };

  const handleLoginAs = () => {
    // Откроется модальное окно при следующем обновлении, либо можно сделать logout и снова логин
    logout();
    // перезагрузить, чтобы показать окно входа
    window.location.reload();
  };

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
      <header className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-light text-gray-800">Управленческий дашборд</h1>
          <p className="text-gray-500">Департамент управления делами и цифровой трансформации</p>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={handleLoginAs}
                className="text-xs bg-white border px-3 py-1 rounded hover:bg-gray-50"
              >
                Сменить пользователя
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginAs}
              className="text-xs bg-white border px-3 py-1 rounded hover:bg-gray-50"
            >
              Войти
            </button>
          )}
        </div>
      </header>
      <LoginModal />
      <TabBar active={activeTab} onSelect={handleTabChange} />
      {renderTab()}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
