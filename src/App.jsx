import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/index';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/context';

function App() {

  const [themeMode, setThemeMode] = useState('dark');

  const lightTheme = () => setThemeMode('light');
  const darkTheme = () => setThemeMode('dark');

  // themeMode === 'dark' ? darkTheme() : lightTheme()
  console.log(themeMode);


  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
  }, [themeMode])

  return (
    <>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;