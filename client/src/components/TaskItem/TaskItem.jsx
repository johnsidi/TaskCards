import './TaskItem.css';
import React from 'react';

function TaskItem({ task, deleteHandler }) {
  return (
    <div className='taskContent'>
      <input type='checkbox' id={task._id} className='printCheckbox'></input>
      <div className='title'>
        <h3 id={task._id}>{task.title}</h3>
      </div>
      <div className='taskDelete'>
        <button
          onClick={() => deleteHandler(task._id)}
          className='deleteButton'
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
