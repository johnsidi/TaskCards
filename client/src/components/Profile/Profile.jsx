import React, { useEffect, useState } from 'react';
import apiServiceJWT from '../../ApiServiceJWT';
const initialState = {
  firstName: '',
  lastName: '',
};

const Profile = () => {
  const [state, setState] = useState(initialState);

  const firstName = state.firstName || 'Missing';
  const lastName = state.lastName || 'No.';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken) => {
      const userInfo = await apiServiceJWT.profile(accessToken);
      if (userInfo) {
        const { firstName, lastName } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            firstName,
            lastName,
          };
        });
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile(accessToken);
  }, []);

  return (
    <div>
      <h2>My Profile</h2>
      <h3>
        Welcome back, {firstName} {lastName}! <br />
        >. View your tasks or create new{' '}
        <a href='http://taskcards.netlify.app/#/home'>here</a>
        View your tasks or create new{' '}
        <a href='http://localhost:3001/#/home'>here</a>
      </h3>
    </div>
  );
};

export default Profile;
