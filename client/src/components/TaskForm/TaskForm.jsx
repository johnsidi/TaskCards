import './TaskForm.css';
import React, { useState } from 'react';

function TaskForm({ createHandler }) {
  const [task, setTask] = useState({
    title: '',
    startDate: '',
    dueDate: '',
    completionDate: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await createHandler(task);
    setTask({ title: '', startDate: '', dueDate: '', completionDate: '' });
  };

  return (
    <div className='form'>
      <h3>Create a new task</h3>
      <form onSubmit={submitHandler}>
        <label>Description</label>
        <textarea
          required
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
          value={task.title}
          cols='40'
          rows='3'
        />
        <br />

        <label>Start Date</label>
        <input
          className='input-form'
          onChange={(e) => {
            setTask({ ...task, startDate: e.target.value });
          }}
          value={task.startDate}
          type='date'
        />
        <br />

        <label>Due Date</label>
        <input
          className='input-form'
          onChange={(e) => {
            setTask({ ...task, dueDate: e.target.value });
          }}
          value={task.dueDate}
          type='date'
        />
        <br />

        <button className='button-form' type='submit'>
          Create task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
