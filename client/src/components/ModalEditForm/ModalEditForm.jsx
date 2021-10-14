import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function ModalEditForm({ task, editHandler, visible, toggleModal }) {
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    startDate: task.startDate,
    dueDate: task.dueDate,
    completionDates: task.completionDates,
    category: task.category,
    repeat: task.repeat,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    toggleModal();
    await editHandler(task._id, editedTask);
    setEditedTask({
      title: editedTask.title,
      startDate: editedTask.startDate,
      dueDate: editedTask.dueDate,
      category: editedTask.category,
      repeat: editedTask.repeat,
    });
  };

  return visible
    ? ReactDOM.createPortal(
        <div className='modal'>
          <div className='modal-pop' role='dialog' aria-modal='true'>
            <h3>Edit task</h3>
            <form onSubmit={submitHandler}>
              <label>Description</label>
              <textarea
                required
                onChange={(e) => {
                  setEditedTask({ ...editedTask, title: e.target.value });
                }}
                value={editedTask.title}
                cols='40'
                rows='3'
                accessKey='d'
                title='ctrl + alt + n'
              />
              <br />
              <label>Category</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setEditedTask({
                    ...editedTask,
                    category: e.target.value,
                  });
                }}
                value={editedTask.category}
                type='text'
              />
              <br />
              <label>Repeat</label>
              <select
                className='input-form'
                onChange={(e) => {
                  setEditedTask({ ...editedTask, repeat: e.target.value });
                }}
                value={editedTask.repeat}
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
                  setEditedTask({ ...editedTask, startDate: e.target.value });
                }}
                value={editedTask.startDate}
                type='date'
              />
              <br />

              <label>Due Date</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setEditedTask({ ...editedTask, dueDate: e.target.value });
                }}
                value={editedTask.dueDate}
                type='date'
              />
              <br />

              <button
                className='button-form'
                type='submit'
                accessKey='c'
                title='ctrl + alt + c'
              >
                Submit changes
              </button>
            </form>
            <button type='button' onClick={toggleModal}>
              Cancel
            </button>
          </div>
          <div className='modal-overlay'></div>
        </div>,
        document.body
      )
    : null;
}
export default ModalEditForm;
