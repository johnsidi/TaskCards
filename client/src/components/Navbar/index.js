import React from 'react';
import search from '../../assets/search.svg';
import './style.css';

const Navbar = () => (
  <div className='navbar'>
    <div className='navbar_search'>
      <img
        className='navbar_search_icon'
        width='30'
        height='30'
        src={search}
        alt='search icon'
      />
      Search
    </div>
  </div>
);

export default Navbar;
