// https://w3collective.com/react-sidebar-navigation-component/
import React, { useState } from 'react';
import './Sidebar.css';
import FilterButton from '../FilterButton/FilterButton';

function Sidebar({ tasks, savedSearchHandler, propertyFilterHandler }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,

    Completed: (task) => task.completed,
    AlreadyStarted: (task) =>
      task.startDate < Date.now() && task.startDate != '',
    'Have Start Date': (task) => task.startDate != '',
    'Have Due Date': (task) => task.dueDate != '',
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      propertyFilterHandler={propertyFilterHandler}
      FILTER_MAP={FILTER_MAP}
    />
  ));

  return (
    <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
      <button className='hamburger' type='button' onClick={showSidebar}>
        <div></div>
      </button>
      <div className='sidebarItems'>
        {filterList}
        {/* <ul onClick={showSidebar}> */}
        <ul>
          <li>
            {/* <a href='' onClick={setFilterString}> */}
            <a href=''>All tasks </a>
          </li>
          <li>
            <a href=''>Active tasks</a>
          </li>
          <li>
            <button
              onClick={() => {
                savedSearchHandler('#TaskCards');
              }}
            >
              Completed tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                savedSearchHandler('#TaskCards');
              }}
            >
              Tag: TaskCards tasks
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
