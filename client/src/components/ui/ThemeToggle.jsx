import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../../app/AppProvider';
export function ThemeToggle() { const { darkMode, setDarkMode } = useContext(AppContext); return <button className="icon-button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle color theme">{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button>; }
