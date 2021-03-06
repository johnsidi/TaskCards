import './TaskItem.css';
import React from 'react';
import ModalEditForm from '../../components/ModalEditForm/ModalEditForm';
import useModal from '../../useModal';
import { Link } from 'react-router-dom';

function TaskItem({
  task,

  completeTaskHandler,
}) {
  return (
    <div className='taskContent'>
      <input
        type='checkbox'
        checked={task.completed === true ? 'checked' : ''}
        id={task._id}
        onClick={() => {
          completeTaskHandler(task._id, task);
          // console.log('task', task);
        }}
        className='doneCheckbox'
      ></input>
      <span class='checkmark'></span>
      <div className='title'>
        <h3 id={task._id}>
          <Link to={`/home/${task.ticket}`} key={task.ticket}>
            {task.ticket}
          </Link>
          {' - ' + task.title}
        </h3>
      </div>

      <label className='buttonContainer'>
        <svg
          className='printIcon'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 70 70'
          width='50'
          hight='50'
          fill='#000000'
        >
          <path d='M 11 2 L 11 15 L 5 15 C 3.3550302 15 2 16.35503 2 18 L 2 36 C 2 37.64497 3.3550302 39 5 39 L 11 39 L 11 48 L 39 48 L 39 39 L 45 39 C 46.64497 39 48 37.64497 48 36 L 48 18 C 48 16.35503 46.64497 15 45 15 L 39 15 L 39 2 L 11 2 z M 13 4 L 37 4 L 37 15 L 13 15 L 13 4 z M 5 17 L 11.832031 17 A 1.0001 1.0001 0 0 0 12.158203 17 L 37.832031 17 A 1.0001 1.0001 0 0 0 38.158203 17 L 45 17 C 45.56503 17 46 17.43497 46 18 L 46 36 C 46 36.56503 45.56503 37 45 37 L 39 37 L 39 28 L 38 28 L 11 28 L 11 37 L 5 37 C 4.4349698 37 4 36.56503 4 36 L 4 18 C 4 17.43497 4.4349698 17 5 17 z M 41 20 A 2 2 0 0 0 39 22 A 2 2 0 0 0 41 24 A 2 2 0 0 0 43 22 A 2 2 0 0 0 41 20 z M 13 30 L 37 30 L 37 37.832031 A 1.0001 1.0001 0 0 0 37 38.158203 L 37 46 L 13 46 L 13 38.167969 A 1.0001 1.0001 0 0 0 13 37.841797 L 13 30 z M 17 33 A 1.0001 1.0001 0 1 0 17 35 L 33 35 A 1.0001 1.0001 0 1 0 33 33 L 17 33 z M 17 37 A 1.0001 1.0001 0 1 0 17 39 L 29 39 A 1.0001 1.0001 0 1 0 29 37 L 17 37 z M 17 41 A 1.0001 1.0001 0 1 0 17 43 L 33 43 A 1.0001 1.0001 0 1 0 33 41 L 17 41 z' />
          fill='#000000'
        </svg>
        <input type='checkbox' id={task._id} className='printCheckbox'></input>
        <span className='checkmark'></span>
      </label>
    </div>
  );
}

export default TaskItem;
