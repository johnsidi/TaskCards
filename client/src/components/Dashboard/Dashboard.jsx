import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Logout from '../Logout/Logout';
import Welcome from '../Welcome/Welcome';
import Home from '../Home/Home';

const Dashboard = ({ setIsAuthenticated }) => {
  return (
    <div className='Dashboard'>
      <Routes>
        <Route
          path='/register'
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/logout'
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/tasks' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
