import React, { useState } from 'react';
import auth from '../../utils/auth';
import apiServiceJWT from '../../ApiServiceJWT';
import { useNavigate, useLocation } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Check the session branch to see how to handle redirects
    // REMOVE-START
    e.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    const res = await apiServiceJWT.login(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken, userID } = res;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userID', userID);
      props.setIsAuthenticated(true);
      // console.log('hi');
      // return <Navigate to='/profile' />;

      // auth.login(() => {
      //   console.log('hi');
      //   return <Navigate to='/profile' replace />;
      // });

      // let location = useLocation();
      // auth.login(() => <Navigate to='/profile' state={{ from: location }} />);
      //auth.login(() => navigate('/profile')); //violates rules of hooks
      navigate('/home');
    }
    // REMOVE-END
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div>
      <h2>Login</h2>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name@mail.com'
          name='email'
          value={state.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='supersecretthingy'
          name='password'
          value={state.password}
          onChange={handleChange}
        />
        <button className='form-submit' type='submit' disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Login;
