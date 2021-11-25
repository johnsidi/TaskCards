import './TaskForm.css';
import React, { useState } from 'react';

function TaskForm({ createHandler }) {
  const [task, setTask] = useState({
    title: '',
    notes: '',
    startDate: '',
    dueDate: '',
    completed: false,
    completionDates: [],
    category: '',
    repeat: '',
    estimatedTime: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await createHandler(task);
    setTask({
      title: '',
      notes: '',
      startDate: '',
      dueDate: '',
      completionDates: [],
      completed: false,
      category: '',
      repeat: '',
      estimatedTime: '',
    });
  };

  return (
    <div className='form'>
      <h3>Create a New Task</h3>
      <form onSubmit={submitHandler} autocomplete='on'>
        <label>Description</label>
        <textarea
          required
          onChange={(e) => {
            setTask({ ...task, title: e.target.value });
          }}
          value={task.title}
          cols='40'
          rows='3'
          accessKey='d'
          title='ctrl + alt + n'
        />
        <br />
        <label>Notes - Next Actions</label>
        <textarea
          onChange={(e) => {
            setTask({ ...task, notes: e.target.value });
          }}
          value={task.notes}
          cols='40'
          rows='3'
        />
        <br />
        <label>Tags (comma separated)</label>
        <input
          className='input-form'
          onChange={(e) => {
            setTask({ ...task, category: e.target.value });
          }}
          value={task.category}
          type='text'
        />
        <br />
        <label>Repeat</label>
        <select
          className='input-form'
          onChange={(e) => {
            setTask({ ...task, repeat: e.target.value });
          }}
          value={task.repeat}
          type='text'
        >
          <option value=''>--Please choose an option--</option>
          <option value='none' selected>
            none
          </option>
          <option value='daily'>daily</option>
          <option value='weekly'>weekly</option>
          <option value='monthly'>monthly</option>
          <option value='annually'>annually</option>
        </select>
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

        <label>Estimated time</label>
        <input
          className='input-form'
          onChange={(e) => {
            setTask({ ...task, estimatedTime: e.target.value });
          }}
          value={task.estimatedTime}
          type='text'
        />
        <br />
        <button
          className='button-form'
          type='submit'
          accessKey='c'
          title='ctrl + alt + c'
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
