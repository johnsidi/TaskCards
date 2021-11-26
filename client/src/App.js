import './App.css';
import auth from './utils/auth';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';

import apiServiceJWT from '../src/ApiServiceJWT';

import Dashboard from './components/Dashboard/Dashboard';

function App() {
  //const [searchString, setSearchString] = useState('');
  const navigate = useNavigate();

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

  const editHandler = async (id, editedTask) => {
    const task = await apiServiceJWT.updateTask(accessToken, id, editedTask);
    console.log('editedTask from edit handler', editedTask);

    const withEditedTasks = tasks.map((task) => {
      if (id === task._id) {
        return {
          ...task,
          title: editedTask.title,
          notes: editedTask.notes,
          startDate: editedTask.startDate,
          dueDate: editedTask.dueDate,
          category: editedTask.category,
          repeat: editedTask.repeat,
          estimatedTime: editedTask.estimatedTime,
        };
      }
      return task;
    });
    setTasks(withEditedTasks);
    setTasksCopy(withEditedTasks);
  };
  const deleteHandler = async (id) => {
    navigate('/home');

    await apiServiceJWT.deleteTask(accessToken, userID, id);
    // console.log('delete handler id', id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    setTasksCopy((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

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
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </div>
  );
}
export default App;
