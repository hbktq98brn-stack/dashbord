import { useCallback } from 'react';

export function useLog(user) {
  const addLog = useCallback((action, details = '') => {
    const logs = JSON.parse(localStorage.getItem('dashboard_action_log') || '[]');
    logs.push({
      timestamp: new Date().toISOString(),
      user: user ? user.name : 'Не авторизован',
      employeeId: user ? user.id : null,
      action,
      details
    });
    localStorage.setItem('dashboard_action_log', JSON.stringify(logs));
  }, [user]);

  return { addLog };
}
