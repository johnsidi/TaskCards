import './App.css';
import React from 'react';

import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <header>TaskCards</header>
      <Dashboard />
      <footer>
        Sidiropoulos Ioannis <br /> <br /> Solo project for Codeworks - August
        2021
      </footer>
    </div>
  );
}

export default App;
