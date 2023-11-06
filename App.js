import React from 'react';
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/dept/login';
import Dashboard from './pages/dept/dashboard';
import UserDashboard from './pages/user/dashboard';
import LoginUser from './pages/user/login';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/deptlogin' element={<Login />} />
          <Route path='/deptdashboard' element={<Dashboard />} />
          <Route path='/userdashboard' element={<UserDashboard/>} />
          <Route path='/userlogin' element={<LoginUser />} />


        </Routes>
      </Router>

      <ToastContainer />

    </>
  );
}

export default App;
