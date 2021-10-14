import TaskItem from '../TaskItem/TaskItem';
import React from 'react';

import './TaskList.css';

function TaskList({ tasks, deleteHandler }) {
  return tasks.map((task) => (
    <TaskItem key={task._id} task={task} deleteHandler={deleteHandler} />
  ));
}

export default TaskList;