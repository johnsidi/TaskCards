import TaskItem from '../TaskItem/TaskItem';
import React from 'react';

import './TaskList.css';

function TaskList({ tasks, deleteHandler }) {
  //without the return it does not work!
  //const sortedTasks = tasks.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt); });
  const sortedTasks = tasks.sort((a, b) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  //console.log('sortedTasks', sortedTasks);

  return sortedTasks.map((task) => (
      <TaskItem key={task._id} task={task} deleteHandler={deleteHandler} />
  ));
}

export default TaskList;
