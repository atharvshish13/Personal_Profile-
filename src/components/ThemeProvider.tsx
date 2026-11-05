'use client';
import { createContext, useContext, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };

const storageKey = 'portfolio-theme';
const listeners = new Set<() => void>();
let currentTheme: Theme = 'dark';
let initialized = false;

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

const setCurrentTheme = (theme: Theme, persist: boolean) => {
  currentTheme = theme;
  initialized = true;
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error('Could not save the theme preference', error);
    }
  }
  notifyListeners();
};

const subscribeToTheme = (listener: () => void) => {
  listeners.add(listener);

  if (!initialized) {
    try {
      currentTheme = localStorage.getItem(storageKey) === 'light' ? 'light' : 'dark';
    } catch (error) {
      console.error('Could not read the theme preference', error);
      currentTheme = 'dark';
    }
    initialized = true;
    document.documentElement.setAttribute('data-theme', currentTheme);
    notifyListeners();
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    setCurrentTheme(event.newValue === 'light' ? 'light' : 'dark', false);
  };
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const getThemeSnapshot = () => currentTheme;
const getServerThemeSnapshot = (): Theme => 'dark';

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
