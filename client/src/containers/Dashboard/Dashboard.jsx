import React, { useEffect, useState } from 'react';
import ApiService from '../../ApiService';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList.jsx';
import CreateIndexCard from '../../components/CreateIndexCard/CreateIndexCard.jsx';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [cardSize, setCardSize] = useState('A4');

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
    console.log('delete handler id', id);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  };

  return (
    <div className='dashboard'>
      <div className='tasks'>
        {tasks.length ? (
          <TaskList id='list' tasks={tasks} deleteHandler={deleteHandler} />
        ) : null}
      </div>

      <div className='form'>
        <div className='indexCard'>
          {tasks.length ? (
            <CreateIndexCard tasks={tasks} cardSize={cardSize} />
          ) : null}
        </div>
        <TaskForm createHandler={createHandler} />
      </div>
    </div>
  );
}

export default Dashboard;
