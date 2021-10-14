import React, { useEffect, useState } from 'react';
import ApiService from '../../ApiService';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskList from '../../components/TaskList/TaskList.jsx';
import IndexCard3by5 from '../../components/IndexCard3-5/IndexCard3-5';
import './Dashboard.css';

function Dashboard() {
  const [tasks, setTasks] = useState([]);

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
        <TaskForm createHandler={createHandler} />
        <div className='indexCard'>
          {tasks.length ? <IndexCard3by5 tasks={tasks} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
