import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import auth from './utils/auth';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';
import Home from './components/Home/Home';

import searchIcon from './assets/search.svg';
import apiServiceJWT from '../src/ApiServiceJWT';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  //const [searchString, setSearchString] = useState('');
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [searchString, setSearchString] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('userID');

  async function fetchTasks() {
    console.log('userID from fetchTasks', userID);
    const tasksList = await apiServiceJWT.getTasks(accessToken, userID);
    console.log('TaskList', tasksList);
    setTasks(tasksList);
    //I need this list in order to be able to go to
    //the initial state before filtering
    //I think it is better to have then on memory
    //than doing an API call
    setTasksCopy(tasksList);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='App'>
      <Navbar
        isAuthenticated={isAuthenticated}
        setSearchString={setSearchString}
      />

      <Dashboard
        setIsAuthenticated={setIsAuthenticated}
        searchString={searchString}
        tasks={tasks}
        setTasks={setTasks}
        tasksCopy={tasksCopy}
        setTasksCopy={setTasksCopy}
      />
    </div>
  );
}

export default App;
