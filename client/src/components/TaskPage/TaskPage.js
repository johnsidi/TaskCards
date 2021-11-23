import { useParams } from 'react-router-dom';

import './TaskPage.css';
import moment from 'moment';
import React from 'react';
import ModalEditForm from '../../components/ModalEditForm/ModalEditForm';
import useModal from '../../useModal';
import { Link } from 'react-router-dom';

function TaskPage({
  tasks,
  taskIndex,
  deleteHandler,
  editHandler,
  completeTaskHandler,
}) {
  const { toggleModal, visible } = useModal();
  let params = useParams();
  let taskTicket = params.ticketID;
  console.log('taskTicket', taskTicket);
  console.log('tasks', tasks);
  // console.log('atask.ticket', tasks[0].ticket);
  let task = tasks.filter((atask) => atask.ticket == taskTicket)[0];
  console.log('task1', task);
  return (
    <div className='taskContent'>
      <h2>Task ticket: {params.ticketID}</h2>

      {/* <input
        type='checkbox'
        checked={task.completed === true ? 'checked' : ''}
        id={task._id}
        onClick={() => {
          completeTaskHandler(task._id, task);
          // console.log('task', task);
        }}
        className='doneCheckbox'
      ></input>
      <span class='checkmark'></span> */}
      <div className='title'>
        <h3 id={task._id}>{task.ticket + ' - ' + task.title}</h3>
      </div>
      <div>
        {task.notes ? (
          <p>
            <b>Notes:</b> {task.notes}
          </p>
        ) : (
          ''
        )}
        {task.category ? (
          <p>
            <b>Tags:</b> {task.category}
          </p>
        ) : (
          ''
        )}
        <p>
          <b>Creation date:</b> {moment(task.createdAt).format('YYYY-MM-DD')}
        </p>
        {task.repeat ? (
          <p>
            <b>Repeat:</b> {task.repeat}
          </p>
        ) : (
          ''
        )}
        {task.dueDate ? (
          <p>
            <b>Due date:</b> {task.dueDate}
          </p>
        ) : (
          ''
        )}
        {task.startDate ? (
          <p>
            <b>Start date:</b> {task.startDate}
          </p>
        ) : (
          ''
        )}
        {task.estimatedTime ? (
          <p>
            <b>Estimated time:</b> {task.estimatedTime}
          </p>
        ) : (
          ''
        )}
        {task.completionDates[0] ? (
          <p>
            <b>Completed:</b>{' '}
            {task.completionDates.map(
              (completionDate) =>
                moment(new Date(completionDate)).format('YYYY-MM-DD') + ' / '
            )}
          </p>
        ) : (
          ''
        )}
      </div>
      {/* <div className='taskDelete'>
        <button
          onClick={() => deleteHandler(task._id)}
          className='deleteButton'
        >
          <svg
            className='trashIcon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 50 50'
            width='30'
            hight='30'
            fill='#000000'
            display='block'
          >
            <path
              d='M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z'
              fill='#000000'
            />
          </svg>
        </button>
      </div>
      <div className='taskEdit'>
        <button onClick={toggleModal} className='editButton'>
          <svg
            className='editIcon'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 50 50'
            width='30'
            hight='30'
            fill='#000000'
            //for removing little grey line below the icon
            display='block'
          >
            <path
              d='M 42.90625 2.90625 C 41.851563 2.90625 40.796875 3.296875 40 4.09375 L 39.15625 4.90625 C 38.953125 4.800781 38.722656 4.769531 38.5 4.8125 C 38.308594 4.855469 38.136719 4.953125 38 5.09375 L 6.59375 36.5 C 6.496094 36.597656 6.421875 36.714844 6.375 36.84375 L 3.0625 45.65625 C 2.929688 46.019531 3.019531 46.429688 3.296875 46.703125 C 3.570313 46.980469 3.980469 47.070313 4.34375 46.9375 L 13.15625 43.625 C 13.285156 43.578125 13.402344 43.503906 13.5 43.40625 L 44.90625 12 C 45.242188 11.652344 45.285156 11.113281 45 10.71875 L 45.8125 9.90625 C 47.40625 8.3125 47.40625 5.6875 45.8125 4.09375 C 45.015625 3.296875 43.960938 2.90625 42.90625 2.90625 Z M 42.90625 4.90625 C 43.453125 4.90625 44.003906 5.097656 44.40625 5.5 C 45.214844 6.308594 45.214844 7.691406 44.40625 8.5 L 43.625 9.3125 L 40.625 6.3125 L 41.40625 5.5 C 41.808594 5.097656 42.359375 4.90625 42.90625 4.90625 Z M 38.6875 7.1875 L 42.8125 11.3125 L 40.0625 14.03125 L 35.96875 9.9375 Z M 34.53125 11.34375 L 38.65625 15.46875 L 12.75 41.34375 L 12 40.5625 L 12 39 C 12 38.449219 11.550781 38 11 38 L 9.4375 38 L 8.65625 37.25 Z M 7.65625 39.09375 L 8.28125 39.71875 C 8.472656 39.90625 8.734375 40.007813 9 40 L 10 40 L 10 41 C 9.992188 41.265625 10.09375 41.527344 10.28125 41.71875 L 10.90625 42.34375 L 7.09375 43.78125 L 6.21875 42.90625 Z'
              fill='#000000'
            />
          </svg>
        </button>
        <ModalEditForm
          task={task}
          visible={visible}
          editHandler={editHandler}
          toggleModal={toggleModal}
        />
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
      </label> */}
    </div>
  );
}

export default TaskPage;