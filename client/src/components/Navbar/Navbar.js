import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import TaskCardsLogo from '../../assets/TaskCards Logo.jpg';
import Login from '../Login/Login';

const Navbar = ({ isAuthenticated }) => {
  return (
    <div className='navbar'>
      <img src={TaskCardsLogo} alt='TaskCards logo' width='50' height='50' />
      TaskCards
      <ul>
        <li>
          <Link to='/'></Link>
        </li>
        {isAuthenticated ? (
          <React.Fragment>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
