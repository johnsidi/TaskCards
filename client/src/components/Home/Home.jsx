import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

//import ApiService from '../../ApiService';
import apiServiceJWT from '../../ApiServiceJWT';

import TaskForm from '../TaskForm/TaskForm';
import TaskList from '../TaskList/TaskList.jsx';
import CreateIndexCard from '../CreateIndexCard/CreateIndexCard.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

import './Home.css';

function Home({
  tasks,
  setTasks,
  tasksCopy,
  setTasksCopy,
  searchString,
  savedSearchHandler,
  editHandler,
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

  const propertyFilterHandler = (filterName) => {
    const propertyFilteredTasks = tasksCopy.filter(filterName);
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
      <Sidebar
        tasks={tasks}
        propertyFilterHandler={propertyFilterHandler}
        savedSearchHandler={savedSearchHandler}
      />
      <div className='tasks'>
        <Outlet />

        <div className='totalTasks'>
          Total tasks:{' '}
          {tasks.length && searchString
            ? searchFilteredTasks.length
            : tasks.length}
        </div>
        <TaskList
          id='list'
          tasks={tasks.length && searchString ? searchFilteredTasks : tasks}
          completeTaskHandler={completeTaskHandler}
        />
      </div>

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
