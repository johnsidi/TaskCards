import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Logout from '../Logout/Logout';
import Welcome from '../Welcome/Welcome';
import Home from '../Home/Home';
import TaskPage from '../TaskPage/TaskPage';

const Dashboard = ({
  setIsAuthenticated,
  searchString,
  tasks,
  setTasks,
  tasksCopy,
  setTasksCopy,
}) => {
  return (
    <div className='Dashboard'>
      <Routes>
        <Route
          path='/register'
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/profile' element={<Profile />} />
        <Route
          path='/logout'
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path='/tasks' element={<Home searchString={searchString} />} />
        <Route
          path='/home'
          element={
            <Home
              tasks={tasks}
              setTasks={setTasks}
              tasksCopy={tasksCopy}
              setTasksCopy={setTasksCopy}
              searchString={searchString}
            />
          }
        >
          <Route path=':ticketID' element={<TaskPage tasks={tasks} />} />
        </Route>
        {/* <Route path='*' element={<Welcome />} /> */}
        <Route
          path='*'
          element={
            <Welcome />
            // <main style={{ padding: '1rem' }}>
            //   <p>There's nothing here!</p>
            // </main>
          }
        />
        <Route path='/' element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
