import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function ModalEditForm({ task, editHandler, visible, toggleModal }) {
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    notes: task.notes,
    startDate: task.startDate,
    dueDate: task.dueDate,
    completionDates: task.completionDates,
    category: task.category,
    repeat: task.repeat,
    estimatedTime: task.estimatedTime,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    toggleModal();
    await editHandler(task._id, editedTask);
    setEditedTask({
      title: editedTask.title,
      notes: editedTask.notes,
      startDate: editedTask.startDate,
      dueDate: editedTask.dueDate,
      category: editedTask.category,
      repeat: editedTask.repeat,
      estimatedTime: editedTask.estimatedTime,
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
              <label>notes</label>
              <textarea
                onChange={(e) => {
                  setEditedTask({ ...editedTask, notes: e.target.value });
                }}
                value={editedTask.notes}
                cols='40'
                rows='3'
              />
              <br />
              <label>Tags (comma separated)</label>
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
                <option value='none'>none</option>
                <option value='daily' selected>
                  daily
                </option>
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
              <label>Estimated time</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setEditedTask({
                    ...editedTask,
                    estimatedTime: e.target.value,
                  });
                }}
                value={editedTask.estimatedTime}
                type='text'
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
