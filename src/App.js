import React,{ useState } from 'react';
import './App.css'
import 'react-datepicker/dist/react-datepicker.css';
import EditUser from './components/user/EditUser';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };
  const isAuthenticated = sessionStorage.getItem('authToken') !== null;
  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}> {/* Apply the dark mode class */}
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    <Router>
     
        
       
     <Routes>
     <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
     <Route path="/device/:id"  element={isAuthenticated ? <EditUser /> : <Navigate to="/" />} />
     <Route path="/" element={<Login />} />
     <Route path="/signUp" element={<SignUp />} />
     
     </Routes>
  </Router>
    
  </div>
   
  );
};

export default App;
