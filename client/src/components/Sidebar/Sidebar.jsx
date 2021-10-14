// https://w3collective.com/react-sidebar-navigation-component/
import React, { useState } from 'react';
import './Sidebar.css';
import FilterButton from '../FilterButton/FilterButton';

function Sidebar({ tasks, propertyFilterHandler }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,

    Completed: (task) => task.completed,
    'Already Started': (task) =>
      Date.parse(task.startDate) < Date.now() && task.startDate != '',
    'Have Start Date': (task) => task.startDate != '',
    'Have Due Date': (task) => task.dueDate != '',

    // automation: (task) => task.category === 'automation',
    // DIY: (task) => task.category === 'DIY',
    // internet: (task) => task.category === 'internt',
    // JavaScript: (task) => task.category === 'JavaScript',
    // 'job hunting': (task) => task.category === 'job hunting',
    // London: (task) => task.category === 'London',
    // people: (task) => task.category === 'people',
    // programming: (task) => task.category === 'programming',
    // shopping: (task) => task.category === 'shopping',
    // TaskCards: (task) => task.category === 'TaskCards',
    // writing: (task) => task.category === 'writng',
  };

  const taskCategories = new Set();
  
  tasks.forEach((task) => {
    taskCategories.add(task.category);
  });
  taskCategories.forEach(
    (taskCategory) =>
      (FILTER_MAP[
        taskCategory
      ] = task => task.category === taskCategory)
  );

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
      <h2>Filters</h2>
      <div className='sidebarItems'>{filterList}</div>
    </nav>
  );
}

export default Sidebar;
