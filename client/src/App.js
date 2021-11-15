import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import auth from './utils/auth';

import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';

import searchIcon from './assets/search.svg';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [searchString, setSearchString] = useState('');
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className='App'>
      <Navbar isAuthenticated={isAuthenticated} />
      <Dashboard setIsAuthenticated={setIsAuthenticated} />
      {/* <header>
        <div className='appName'>TaskCards</div>
        <div className='navbar_search'>
          <img
            className='navbar_search_icon'
            width='30'
            height='30'
            src={searchIcon}
            alt='search icon'
          />
          <input
            className='search'
            onChange={(e) => setSearchString(e.target.value)}
            type='text'
            placeholder='Search...'
            accessKey='f'
            title='ctrl + alt + f'
          ></input>
        </div>
      </header>
      <Home searchString={searchString} />
      <footer>
        John Sidiropoulos <br /> <br /> Solo project for Codeworks - August 2021
      </footer> */}
    </div>
  );
}

export default App;
