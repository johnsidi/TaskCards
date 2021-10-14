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
    console.log('TaskList', tasksList);
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

  const completeTaskHandler = async (id, comTask) => {
    let completedTask = {};
    if (comTask.completed === false) {
      completedTask = {
        ...comTask,
        completed: true,
        completionDate: new Date(),
      };
    } else {
      completedTask = {
        ...comTask,
        completed: false,
        completionDate: '',
      };
    }
    const withCreatedTasks = tasks.map((task) => {
      if (id === task._id) {
        console.log('com date', completedTask.completionDate);
        return {
          ...task,
          completed: completedTask.completed,
          completionDate: completedTask.completionDate,
        };
      }
      return task;
    });
    // console.log('1');
    // console.log('id', id);

    // const withCreatedTasks = tasks.map((task) => {
    //   console.log(2);
    //   // console.log('task.id', task._id);
    //   if (id === task._id) {
    //     // console.log('passed task', task);
    //     console.log('com date', comTask.completionDate);
    //     console.log('complted', comTask.completed);
    //     return {
    //       ...task,
    //       completed: !comTask.completed,
    //       completionDate: comTask.completionDate,
    //     };
    //   }
    //   return task;
    // });

    await ApiService.updateTask(id, completedTask);
    setTasks(withCreatedTasks);
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
        };
      }
      return task;
    });
    setTasks(withEditedTasks);
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
        <div className='totalTasks'>
          Total tasks:{' '}
          {tasks.length && searchString ? filteredTasks.length : tasks.length}
        </div>

        {tasks.length && searchString ? (
          <TaskList
            id='list'
            tasks={filteredTasks}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            completeTaskHandler={completeTaskHandler}
          />
        ) : (
          <TaskList
            id='list'
            tasks={tasks}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            completeTaskHandler={completeTaskHandler}
          />
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
              {/* <option value='360 123'>T-card size 2 long</option> */}
              //for printing using Silhouette
              <option value='360 360'>"5 x 5 - Silhouette printing"</option>
            </select>
          </div>
        </div>
        <TaskForm createHandler={createHandler} />
      </div>
    </div>
  );
}

export default Dashboard;
