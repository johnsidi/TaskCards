import React, { useEffect, useState } from 'react';
import ApiService from '../../ApiService';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList.jsx';
import CreateIndexCard from '../../components/CreateIndexCard/CreateIndexCard.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';

import './Dashboard.css';

function Dashboard({ searchString, savedSearchHandler, filterString }) {
  const [tasks, setTasks] = useState([]);
  const [cardSize, setCardSize] = useState('360 123');
  const [searchFilteredTasks, setSearchFilteredTasks] = useState([]);
  const [tasksCopy, setTasksCopy] = useState([]);

  async function fetchTasks() {
    const tasksList = await ApiService.getTasks();
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

  const createHandler = async (taskMetadata) => {
    const task = await ApiService.createTask(taskMetadata);
    console.log('after mongoose', task);
    setTasks((prevState) => [...prevState, task]);
    setTasksCopy((prevState) => [...prevState, task]);
  };

  const deleteHandler = async (id) => {
    await ApiService.deleteTask(id);
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

    await ApiService.updateTask(id, completedTask);
    setTasks(withCreatedTasks);
    setTasksCopy(withCreatedTasks);
  };

  const editHandler = async (id, editedTask) => {
    const task = await ApiService.updateTask(id, editedTask);

    const withEditedTasks = tasks.map((task) => {
      if (id === task._id) {
        return {
          ...task,
          title: editedTask.title,
          startDate: editedTask.startDate,
          dueDate: editedTask.dueDate,
          category: editedTask.category,
          repeat: editedTask.repeat,
        };
      }
      return task;
    });
    setTasks(withEditedTasks);
    setTasksCopy(withEditedTasks);
  };
  const propertyFilterHandler = (filterName) => {
    //console.log('tasksCopy', tasksCopy);
    console.log('filterName', filterName);
    const propertyFilteredTasks = tasksCopy.filter(filterName);
    console.log('propertyFilteredTasks', propertyFilteredTasks);
    setTasks(propertyFilteredTasks);
  };

  useEffect(() => {
    const results = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchString.toLowerCase()) ||
        task.category.toLowerCase().includes(searchString.toLowerCase()) ||
        task.ticket.toString().includes(searchString.toString())
    );
    setSearchFilteredTasks(results);
  }, [searchString]);

  return (
    <div className='dashboard'>
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

export default Dashboard;
