import './App.css';
import React, { useState } from 'react';
import searchIcon from './assets/search.svg';

import Dashboard from './containers/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [searchString, setSearchString] = useState('');

  return (
    <div className='App'>
      <header>
        <Sidebar />
        <div className='appName'>TaskCards</div>
        <div className='navbar_search'>
          <img
            className='navbar_search_icon'
            width='30'
            height='30'
            src={searchIcon}
            alt='search icon'
          />
          <input
            className='search'
            onChange={(e) => setSearchString(e.target.value)}
            type='text'
            placeholder='Search...'
            accessKey='f'
            title='ctrl + alt + f'
          ></input>
        </div>
      </header>
      <Dashboard searchString={searchString} />
      <footer>
        John Sidiropoulos <br /> <br /> Solo project for Codeworks - August 2021
      </footer>
    </div>
  );
}

export default App;
