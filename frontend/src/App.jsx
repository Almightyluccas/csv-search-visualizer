import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CompanyPage from './pages/CompanyPage';
import DataVisualizationPage from './pages/DataVisualizationPage';
import HomePage from './pages/HomePage';
import TablePage from './pages/TablePage';
import UserProfilePage from './pages/UserProfilePage';
import NavBar from "./components/NavBar";


function App() {
  const [darkMode, setDarkMode] = useState(true);

  const handleDarkModeToggle = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <Router>
        <NavBar darkMode={darkMode} handleDarkModeToggle={handleDarkModeToggle}/>
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode}/>}/>
          <Route path="/visualization" element={<DataVisualizationPage darkMode={darkMode}/>}/>
          <Route path="/table" element={<TablePage darkMode={darkMode}/>}/>
          <Route path="/company" element={<CompanyPage darkMode={darkMode}/>}/>
          <Route path="/profile" element={<UserProfilePage darkMode={darkMode}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
