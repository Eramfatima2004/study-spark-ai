import { createContext, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext(null);
const STORAGE_KEY = 'studyspark-sessions';

export function AppProvider({ children }) {
  const [sessions, setSessions] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('studyspark-theme') !== 'light');
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'; localStorage.setItem('studyspark-theme', darkMode ? 'dark' : 'light'); }, [darkMode]);
  const value = useMemo(() => ({ sessions, setSessions, darkMode, setDarkMode }), [sessions, darkMode]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
