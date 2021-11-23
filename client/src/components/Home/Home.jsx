import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

//import ApiService from '../../ApiService';
import apiServiceJWT from '../../ApiServiceJWT';

import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList.jsx';
import CreateIndexCard from '../CreateIndexCard/CreateIndexCard.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import TaskPage from '../TaskPage/TaskPage';

import './Home.css';

function Home({
  tasks,
  setTasks,
  tasksCopy,
  setTasksCopy,
  searchString,
  savedSearchHandler,
  setIsAuthenticated,
}) {
  const [cardSize, setCardSize] = useState('360 123');
  const [searchFilteredTasks, setSearchFilteredTasks] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const userID = localStorage.getItem('userID');

  const createHandler = async (taskMetadata) => {
    const task = await apiServiceJWT.createTask(
      accessToken,
      taskMetadata,
      userID
    );
    //console.log('after mongoose', task);
    setTasks((prevState) => [...prevState, task]);
    setTasksCopy((prevState) => [...prevState, task]);
  };

  const deleteHandler = async (id) => {
    await apiServiceJWT.deleteTask(accessToken, userID, id);
    // console.log('delete handler id', id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    setTasksCopy((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  const completeTaskHandler = async (id, comTask) => {
    let completedTask = {};
    if (comTask.completed === false) {
      completedTask = {
        ...comTask,
        completed: true,
        completionDates: [...comTask.completionDates, new Date()],
      };
    } else {
      completedTask = {
        ...comTask,
        completed: false,
      };
    }
    const withCreatedTasks = tasks.map((task) => {
      if (id === task._id) {
        return {
          ...task,
          completed: completedTask.completed,
          completionDates: completedTask.completionDates,
        };
      }
      return task;
    });

    await apiServiceJWT.updateTask(accessToken, id, completedTask);
    setTasks(withCreatedTasks);
    setTasksCopy(withCreatedTasks);
  };

  const editHandler = async (id, editedTask) => {
    await apiServiceJWT.updateTask(accessToken, id, editedTask);

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
  const propertyFilterHandler = (filterName) => {
    //console.log('tasksCopy', tasksCopy);
    //console.log('filterName', filterName);
    const propertyFilteredTasks = tasksCopy.filter(filterName);
    //console.log('propertyFilteredTasks', propertyFilteredTasks);
    setTasks(propertyFilteredTasks);
  };

  useEffect(() => {
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchString.toLowerCase()) ||
        task.notes.toLowerCase().includes(searchString.toLowerCase()) ||
        task.category.toLowerCase().includes(searchString.toLowerCase()) ||
        task.ticket.toString().includes(searchString.toString()) ||
        task.estimatedTime.toLowerCase().includes(searchString.toLowerCase())
    );
    setSearchFilteredTasks(results);
  }, [searchString]);

  return (
    <div className='home'>
      {/* <Routes>
        <Route path='/home' element={<Home searchString={searchString} />}>
          <Route path=':ticketID' element={<TaskPage />} />
        </Route>
      </Routes> */}
      <Sidebar
        tasks={tasks}
        propertyFilterHandler={propertyFilterHandler}
        savedSearchHandler={savedSearchHandler}
      />
      <div className='tasks'>
        <div className='totalTasks'>
          Total tasks:{' '}
          {tasks.length && searchString
            ? searchFilteredTasks.length
            : tasks.length}
        </div>
        <TaskList
          id='list'
          tasks={tasks.length && searchString ? searchFilteredTasks : tasks}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          completeTaskHandler={completeTaskHandler}
        />
      </div>
      <Outlet />
      <div className='form'>
        <div className='indexCard'>
          {tasks.length ? (
            <CreateIndexCard tasks={tasks} cardSize={cardSize} />
          ) : null}
          <div className='selectCard'>
            <label htmlFor='card-select'>Select card size:</label>
            <br />
            <select
              className='card-select'
              onChange={(e) => {
                setCardSize(e.target.value);
              }}
              value={cardSize}
            >
              <option value=''>--Please choose an option--</option>
              <option value='A4'>A4</option>
              <option value='A7' selected>
                A7
              </option>
              <option value='216 360'>3" x 5"</option>
              <option value='360 123'>T-card size 2 long</option>
              //for printing using Silhouette
              <option value='360 360'>5" x 5" - Silhouette printing"</option>
            </select>
          </div>
        </div>
        <TaskForm createHandler={createHandler} />
      </div>
    </div>
  );
}

export default Home;
