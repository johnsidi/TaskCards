import React from 'react';
import auth from '../../utils/auth';
import apiServiceJWT from '../../ApiServiceJWT';
import { useNavigate, Link, Outlet } from 'react-router-dom';

const Logout = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    removeToken();
    handleAuth();
  };

  const removeToken = () => {
    apiServiceJWT.logout('accessToken', 'userID');
  };

  const handleAuth = () => {
    props.setIsAuthenticated(false);
    auth.logout(() => navigate('/'));
  };

  return (
    <div>
      <h2>Are you sure you want to log out?</h2>
      <Link to='/'>
        <button className='confirm-btn'>No</button>
      </Link>
      <button className='confirm-btn' onClick={() => handleClick()}>
        Yes
      </button>
    </div>
  );
};

export default Logout;
