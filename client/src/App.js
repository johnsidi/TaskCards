import './App.css';
import React from 'react';
import Navbar from './components/Navbar/index';
import Dashboard from './containers/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <header>
        TaskCards
        {/* <Navbar /> */}
      </header>
      <Dashboard />
      <footer>
        John Sidiropoulos <br /> <br /> Solo project for Codeworks - August 2021
      </footer>
    </div>
  );
}

export default App;
