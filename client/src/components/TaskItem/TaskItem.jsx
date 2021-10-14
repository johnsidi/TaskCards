import './TaskItem.css';
import React from 'react';

function TaskItem({ task }) {
  return (
    <div className='taskContent'>
      <input type='checkbox' id={task._id} className='printCheckbox'></input>
      <div className='title'>
        <h3>{task.title}</h3>
      </div>
    </div>
  );
}

export default TaskItem;
