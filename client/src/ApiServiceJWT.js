//const BASE_URL = 'http://localhost:3000'; //for the backend

//for deployment
//const BASE_URL = 'https://taskcardscors.herokuapp.com/taskcards.herokuapp.com';
const BASE_URL = 'https://taskcards.herokuapp.com';

const apiServiceJWT = {};

apiServiceJWT.getTasks = async (accessToken, userID) => {
  try {
    console.log('hi from api service');
    const res = await fetch(BASE_URL + '/tasks/' + userID, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null; // I was getting error: Expected to return a value at the end of async arrow function
  }
};

apiServiceJWT.createTask = async (accessToken, taskMetadata, userID) => {
  try {
    const res = await fetch(BASE_URL + '/tasks/' + userID, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify(taskMetadata),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

apiServiceJWT.deleteTask = async (accessToken, userID, id) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${userID}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log('Error', error); // eslint-disable-line no-console
    return null;
  }
};

apiServiceJWT.register = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.login = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.profile = (accessToken) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/me`, {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.logout = (tokenName, userID) => {
  // REMOVE-START
  // delete token from local storage here
  localStorage.removeItem(tokenName);
  localStorage.removeItem(userID);
  // the following request should invalidate the token
  // return fetch(`${BASE_URL}/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${tokenName}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));
  // REMOVE-END
};

export default apiServiceJWT;
