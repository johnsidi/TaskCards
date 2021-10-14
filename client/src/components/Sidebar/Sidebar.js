// https://w3collective.com/react-sidebar-navigation-component/
import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
      <button className='hamburger' type='button' onClick={showSidebar}>
        <div></div>
      </button>
      <div className='sidebarItems'>
        <ul onClick={showSidebar}>
          <li>
            <a href=''>All tasks</a>
          </li>
          <li>
            <a href=''>Active tasks</a>
          </li>
          <li>
            <a href=''>Completed tasks</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
