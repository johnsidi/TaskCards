import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';
import TaskCardsLogo from '../../assets/TaskCards Logo.jpg';
import Login from '../Login/Login';
import searchIcon from '../../assets/search.svg';

const Navbar = ({ isAuthenticated, setSearchString }) => {
  return (
    <div className='navbar'>
      <img src={TaskCardsLogo} alt='TaskCards logo' width='50' height='50' />
      <ul>
        <li>
          <Link to='/'>TaskCards</Link>
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
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
