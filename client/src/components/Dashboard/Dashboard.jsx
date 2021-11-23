import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Logout from '../Logout/Logout';
import Welcome from '../Welcome/Welcome';
import Home from '../Home/Home';
import TaskDetails from '../TaskDetails/TaskDetails';

const Dashboard = ({
  setIsAuthenticated,
  searchString,
  tasks,
  setTasks,
  tasksCopy,
  setTasksCopy,
  editHandler,
  deleteHandler,
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
              editHandler={editHandler}
            />
          }
        >
          <Route
            index
            element={
              <main style={{ padding: '1rem' }}>
                <p>
                  You can click on a task ID link to see more info about the
                  task.
                </p>
              </main>
            }
          />
          <Route
            path=':ticketID'
            element={
              <TaskDetails
                tasks={tasks}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
              />
            }
          />
        </Route>

        <Route path='*' element={<Welcome />} />
        <Route path='/' element={<Welcome />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
