import React from 'react';
import ReactDOM from 'react-dom';

function ModalEditForm({
  detailedtask,
  setDetailedTask,
  editHandler,
  visible,
  toggleModal,
}) {
  const submitHandler = async (e) => {
    e.preventDefault();
    toggleModal();
    await editHandler(detailedtask._id, detailedtask);
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
                  setDetailedTask({ ...detailedtask, title: e.target.value });
                }}
                value={detailedtask.title}
                cols='40'
                rows='3'
                accessKey='d'
                title='ctrl + alt + n'
              />
              <br />
              <label>notes</label>
              <textarea
                onChange={(e) => {
                  setDetailedTask({ ...detailedtask, notes: e.target.value });
                }}
                value={detailedtask.notes}
                cols='40'
                rows='3'
              />
              <br />
              <label>Tags (comma separated)</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setDetailedTask({
                    ...detailedtask,
                    category: e.target.value,
                  });
                }}
                value={detailedtask.category}
                type='text'
              />
              <br />
              <label>Repeat</label>
              <select
                className='input-form'
                onChange={(e) => {
                  setDetailedTask({ ...detailedtask, repeat: e.target.value });
                }}
                value={detailedtask.repeat}
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
                  setDetailedTask({
                    ...detailedtask,
                    startDate: e.target.value,
                  });
                }}
                value={detailedtask.startDate}
                type='date'
              />
              <br />

              <label>Due Date</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setDetailedTask({ ...detailedtask, dueDate: e.target.value });
                }}
                value={detailedtask.dueDate}
                type='date'
              />
              <br />
              <label>Estimated time</label>
              <input
                className='input-form'
                onChange={(e) => {
                  setDetailedTask({
                    ...detailedtask,
                    estimatedTime: e.target.value,
                  });
                }}
                value={detailedtask.estimatedTime}
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
