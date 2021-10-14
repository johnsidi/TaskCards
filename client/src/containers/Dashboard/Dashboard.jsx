import React, { useEffect, useState } from 'react';
import ApiService from '../../ApiService';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList.jsx';
import CreateIndexCard from '../../components/CreateIndexCard/CreateIndexCard.jsx';
import './Dashboard.css';

function Dashboard({ searchString }) {
  const [tasks, setTasks] = useState([]);
  const [cardSize, setCardSize] = useState('216 360');
  const [filteredTasks, setFilteredTasks] = useState([]);

  async function fetchTasks() {
    const tasksList = await ApiService.getTasks();
    setTasks(tasksList);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const createHandler = async (taskMetadata) => {
    const task = await ApiService.createTask(taskMetadata);
    console.log('after mongoose', task);
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteHandler = async (id) => {
    await ApiService.deleteTask(id);
    // console.log('delete handler id', id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  useEffect(() => {
    const results = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchString]);

  return (
    <div className='dashboard'>
      <div className='tasks'>
        {tasks.length && searchString ? (
          <TaskList
            id='list'
            tasks={filteredTasks}
            deleteHandler={deleteHandler}
          />
        ) : (
          <TaskList id='list' tasks={tasks} deleteHandler={deleteHandler} />
        )}
      </div>
      <div className='form'>
        <div className='indexCard'>
          {tasks.length ? (
            <CreateIndexCard tasks={tasks} cardSize={cardSize} />
          ) : null}
          <div className='selectCard'>
            <label for='card-select'>Select card size:</label>
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
              <option value='A7'>A7</option>
              <option value='216 360'>3" x 5"</option>
              <option value='360 123'>T-card size 2 long</option>
            </select>
          </div>
        </div>
        <TaskForm createHandler={createHandler} />
      </div>
    </div>
  );
}

export default Dashboard;
